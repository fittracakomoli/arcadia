<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Underbow;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UnderbowController extends Controller
{
    public function index()
    {
        return Inertia::render('UnderbowList', [
            'underbows' => Underbow::latest()->paginate(10),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
            'social_media' => 'nullable|array',
            'social_media.*.platform' => 'required_with:social_media|string',
            'social_media.*.url' => 'required_with:social_media|url',
        ]);

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('underbow_logos', 'public');
        }

        Underbow::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'logo_path' => $logoPath,
            'social_media' => $validated['social_media'],
        ]);

        return redirect()->route('admin.underbow.index')->with('success', 'Underbow berhasil ditambahkan.');
    }

    public function update(Request $request, Underbow $underbow)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:4096',
            'social_media' => 'nullable|array',
            'social_media.*.platform' => 'required_with:social_media|string',
            'social_media.*.url' => 'required_with:social_media|url',
        ]);

        $logoPath = $underbow->logo_path;
        if ($request->hasFile('logo')) {
            if ($logoPath) {
                Storage::disk('public')->delete($logoPath);
            }
            $logoPath = $request->file('logo')->store('underbow_logos', 'public');
        }

        $underbow->update([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'logo_path' => $logoPath,
            'social_media' => $validated['social_media'],
        ]);

        return redirect()->route('admin.underbow.index')->with('success', 'Underbow berhasil diperbarui.');
    }

    public function destroy(Underbow $underbow)
    {
        if ($underbow->logo_path) {
            Storage::disk('public')->delete($underbow->logo_path);
        }
        $underbow->delete();

        return redirect()->route('admin.underbow.index')->with('success', 'Underbow berhasil dihapus.');
    }
}