<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use App\Models\Agenda;
use App\Models\Member;
use App\Models\Gallery;
use App\Models\Message;
use App\Models\Activity;
use App\Models\Underbow;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\OrganizationSetting;

class PageController extends Controller
{

    public function home()
    {
        $settings = OrganizationSetting::firstOrCreate([]);

        return Inertia::render('Home', [
            // Ambil 3 berita terbaru
            'latestNews' => News::latest()->take(3)->get(),
            // Ambil 12 foto galeri terbaru
            'galleries' => Gallery::latest()->take(12)->get(),
            'settings' => $settings,
            'underbows' => Underbow::latest()->get(),
        ]);
    }

    public function about()
    {
        $settings = OrganizationSetting::firstOrCreate([]);

        return Inertia::render('About', [
            'settings' => $settings,
        ]);
    }

    public function structure()
    {
        $settings = OrganizationSetting::firstOrCreate([]);
        $currentPeriod = date('Y'); // Mengambil tahun saat ini, misal: "2025"
        $allMembers = Member::where('period', $currentPeriod)
                            ->orderBy('id', 'asc') // Urutan awal dari database
                            ->get()
                            ->groupBy('division');

        // --- LOGIKA PENGURUTAN KUSTOM BARU ---
        $sortedMembers = $allMembers->map(function ($membersInDivision, $divisionName) {
            $order = [];

            // Tentukan urutan prioritas jabatan untuk setiap grup
            switch ($divisionName) {
                case 'PSDO':
                    $order = ['Kepala Biro' => 1, 'Sekretaris Biro' => 2];
                    break;
                case 'Ekonomi Kreatif':
                    $order = ['Kepala Divisi' => 1, 'Bendahara Divisi' => 2, 'Sekretaris Divisi' => 3];
                    break;
                // Untuk semua divisi lain yang mengikuti pola standar
                case 'Internal':
                case 'Eksternal':
                case 'Sosial Masyarakat':
                case 'Komunikasi Informasi':
                    $order = ['Kepala Divisi' => 1, 'Wakil Kepala Divisi' => 2, 'Sekretaris Divisi' => 3];
                    break;
                default:
                    // Untuk 'BPH', 'Sekretaris', 'Bendahara', biarkan urutan default dari database
                    return $membersInDivision;
            }

            // Urutkan anggota dalam divisi ini
            return $membersInDivision->sortBy([
                // Pertama, urutkan berdasarkan prioritas jabatan yang telah ditentukan.
                // Jabatan yang tidak ada di peta '$order' akan mendapat prioritas 99 (paling bawah).
                function ($member) use ($order) {
                    return $order[$member->position] ?? 99;
                },
                // Kedua, jika prioritasnya sama (misal: semua 'Anggota'), urutkan berdasarkan nama A-Z.
                'name',
            ]);
        });
        // --- AKHIR LOGIKA PENGURUTAN ---


        // Definisikan grup untuk Pengurus Harian
        $pengurusHarianKeys = ['BPH', 'Sekretaris', 'Bendahara', 'PSDO'];
        
        // Pisahkan data menjadi dua grup besar MENGGUNAKAN DATA YANG SUDAH DIURUTKAN
        $pengurusHarian = $sortedMembers->filter(fn($v, $k) => in_array($k, $pengurusHarianKeys));
        $divisi = $sortedMembers->filter(fn($v, $k) => !in_array($k, $pengurusHarianKeys));

        return Inertia::render('Structure', [
            'pengurusHarian' => $pengurusHarian,
            'divisi' => $divisi,
            'settings' => $settings,
        ]);
    }

    public function underbow()
    {
        $settings = OrganizationSetting::firstOrCreate([]);

        return Inertia::render('Underbow', [
            'settings' => $settings,
            'underbows' => Underbow::latest()->get(),
        ]);
    }

    public function activity()
    {
        // Ambil program kerja yang akan datang sebagai featured
        $featuredActivity = Activity::where('start_date', '>=', now())
                                  ->orderBy('start_date', 'asc')
                                  ->first();

        // Jika tidak ada proker yang akan datang, ambil yang terakhir dilaksanakan
        if (!$featuredActivity) {
            $featuredActivity = Activity::orderBy('start_date', 'desc')->first();
        }

        return Inertia::render('Activity', [
            'featuredActivity' => $featuredActivity,
            'allActivities' => Activity::orderBy('start_date', 'asc')->get(), // Ambil semua, urutkan dari terbaru
            'agendas' => Agenda::latest()->get(),
        ]);
    }

    /**
     * Menampilkan halaman daftar berita dengan filter dan paginasi.
     */
    public function newsIndex(Request $request)
    {
        $settings = OrganizationSetting::firstOrCreate([]);
        $query = News::query()
            ->with('user:id,name') // Ambil nama penulis
            ->whereNotNull('published_at');

        // Logika Pencarian
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', '%' . $search . '%')
                  ->orWhere('category', 'like', '%' . $search . '%');
            });
        }

        // Logika Pengurutan
        $sortBy = $request->input('sort', 'newest');
        switch ($sortBy) {
            case 'oldest':
                $query->orderBy('published_at', 'asc');
                break;
            case 'az':
                $query->orderBy('title', 'asc');
                break;
            case 'za':
                $query->orderBy('title', 'desc');
                break;
            default: // 'newest'
                $query->orderBy('published_at', 'desc');
                break;
        }

        $news = $query->paginate(6)->withQueryString();

        // Buat ringkasan (excerpt) untuk setiap berita
        $news->getCollection()->transform(function ($item) {
            $item->excerpt = Str::limit(strip_tags($item->content), 120);
            return $item;
        });

        return Inertia::render('News', [
            'newsData' => $news,
            'filters' => $request->only(['search', 'sort']),
            'settings' => $settings,
        ]);
    }

    /**
     * Menampilkan halaman detail satu berita.
     */
    public function newsShow(News $news)
    {
        $news->load('user:id,name');
        // Anda perlu membuat halaman 'NewsDetail.jsx' untuk ini
        return Inertia::render('ReadNews', [
            'news' => $news
        ]);
    }

    public function contact()
    {
        $settings = OrganizationSetting::firstOrCreate([]);

        return Inertia::render('Contact', [
            'settings' => $settings,
        ]);
    }

    /**
     * Menyimpan pesan dari formulir kontak.
     */
    public function sendContactMessage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        Message::create($validated);

        return back()->with('success', 'Pesan Anda telah berhasil terkirim. Terima kasih!');
    }
}