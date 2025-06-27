<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrganizationSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OrganizationSettingController extends Controller
{
    public function index()
    {
        // Ambil pengaturan pertama, atau buat baru jika tidak ada.
        // Ini memastikan selalu ada data untuk di-render.
        $settings = OrganizationSetting::firstOrCreate([]);

        return Inertia::render('Organization', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $settings = OrganizationSetting::firstOrFail();

        $validated = $request->validate([
            'organization_name' => 'nullable|string|max:255',
            'cabinet_name' => 'nullable|string|max:255',
            'period' => 'nullable|string|max:255',
            'logo_horizontal' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:4096',
            'logo_vertical' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:4096',
            'logo_full' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:4096',
            'cover_photo' => 'nullable|image|mimes:jpeg,png,jpg|max:4096',
            'headline' => 'nullable|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'definition' => 'nullable|string',
            'video_profile_link' => 'nullable|string|max:255',
            'vision' => 'nullable|string',
            'mission' => 'nullable|array',
            'mission.*' => 'required|string', // Validasi setiap item di dalam array misi
            'name_philosophy' => 'nullable|string',
            'logo_philosophy' => 'nullable|array', // Ubah ini
            'logo_philosophy.*.title' => 'sometimes|required|string|max:255', // Tambahkan ini
            'logo_philosophy.*.description' => 'sometimes|required|string',
            'address' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'contacts' => 'nullable|array',
            'contacts.*.title' => 'required|string|max:255', // Validasi nested array
            'contacts.*.name' => 'required|string|max:255',
            'contacts.*.phone_number' => 'required|string|max:20',
            'google_maps_link' => 'nullable|url',
        ]);

        // Handle upload logo
        if ($request->hasFile('logo_horizontal')) {
            if ($settings->logo_horizontal_path) Storage::disk('public')->delete($settings->logo_horizontal_path);
            $validated['logo_horizontal_path'] = $request->file('logo_horizontal')->store('settings', 'public');
        }
    
        // Handle upload logo vertikal
        if ($request->hasFile('logo_vertical')) {
            if ($settings->logo_vertical_path) Storage::disk('public')->delete($settings->logo_vertical_path);
            $validated['logo_vertical_path'] = $request->file('logo_vertical')->store('settings', 'public');
        }
    
        // Handle upload logo full
        if ($request->hasFile('logo_full')) {
            if ($settings->logo_full_path) Storage::disk('public')->delete($settings->logo_full_path);
            $validated['logo_full_path'] = $request->file('logo_full')->store('settings', 'public');
        }

        // Handle upload foto sampul
        if ($request->hasFile('cover_photo')) {
            if ($settings->cover_photo_path) {
                Storage::disk('public')->delete($settings->cover_photo_path);
            }
            $validated['cover_photo_path'] = $request->file('cover_photo')->store('settings', 'public');
        }

        $settings->update($validated);

        return back()->with('success', 'Pengaturan organisasi berhasil diperbarui.');
    }
}