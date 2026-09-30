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
        $underbows = Underbow::latest()->get();
        $news = News::latest()->take(3)->get();
        $gallery = Gallery::latest()->take(12)->get();

        return Inertia::render('Home', [
            'latestNews' => $news->select('title', 'category', 'image_path', 'slug'),
            'galleries' => $gallery->select('category', 'image_path'),
            'settings' => $settings->except('id', 'logo_vertical_path', 'vision', 'mission', 'name_philosophy', 'logo_philosophy', 'contacts', 'google_maps_link', 'created_at', 'updated_at'),
            'underbows' => $underbows->select('logo_path', 'name'),
        ]);
    }

    public function about()
    {
        $settings = OrganizationSetting::firstOrCreate([]);

        return Inertia::render('About', [
            'settings' => $settings->except('id', 'cover_photo_path', 'headline', 'tagline', 'video_profile_link', 'phone', 'contacts', 'google_maps_link', 'created_at', 'updated_at'),
        ]);
    }

    public function structure()
    {
        $currentPeriod = date('Y'); // Mengambil tahun saat ini, misal: "2025"
        $allMembers = Member::where('period', $currentPeriod)
                            ->select('id', 'name', 'position', 'division', 'photo_path') // Menghindari kolom yang tidak perlu
                            ->orderBy('id', 'asc') // Urutan awal dari database
                            ->get()
                            ->groupBy('division');

        // Definisikan grup untuk Pengurus Harian
        $pengurusHarianKeys = ['BPH', 'Sekretaris', 'Bendahara', 'PSDO'];
        
        // Pisahkan data menjadi dua grup besar MENGGUNAKAN DATA YANG SUDAH DIURUTKAN
        $pengurusHarian = $allMembers->filter(fn($v, $k) => in_array($k, $pengurusHarianKeys));
        $divisi = $allMembers->filter(fn($v, $k) => !in_array($k, $pengurusHarianKeys));

        return Inertia::render('Structure', [
            'pengurusHarian' => $pengurusHarian,
            'divisi' => $divisi,
        ]);
    }

    public function underbow()
    {
        $settings = OrganizationSetting::firstOrCreate([]);
        $underbows = Underbow::latest()->get();

        return Inertia::render('Underbow', [
            'settings' => $settings->only('organization_name', 'logo_horizontal_path', 'email', 'address'),
            'underbows' => $underbows->select('logo_path', 'name','description', 'social_media'),
        ]);
    }

    public function activity()
    {
        // Ambil program kerja yang akan datang sebagai featured
        $featuredActivity = Activity::where('start_date', '>=', now())
                                  ->select('name', 'description', 'start_date', 'end_date', 'image_path')
                                  ->orderBy('start_date', 'asc')
                                  ->first();

        // Jika tidak ada proker yang akan datang, ambil yang terakhir dilaksanakan
        if (!$featuredActivity) {
            $featuredActivity = Activity::select('name', 'description', 'start_date', 'end_date', 'image_path')->orderBy('start_date', 'desc')->first();
        }

        return Inertia::render('Activity', [
            'featuredActivity' => $featuredActivity,
            'allActivities' => Activity::select('name', 'description', 'start_date', 'end_date', 'image_path')->orderBy('start_date', 'asc')->get(),
            'agendas' => Agenda::latest()->select('name', 'description', 'image_path')->get(),
        ]);
    }

    /**
     * Menampilkan halaman daftar berita dengan filter dan paginasi.
     */
    public function newsIndex(Request $request)
    {
        $query = News::query()
            ->select('title', 'slug', 'content', 'category', 'image_path', 'published_at')
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
            'settings' => $settings->only('organization_name', 'logo_horizontal_path', 'address', 'email', 'phone', 'contacts', 'google_maps_link'),
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