<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index()
    {
        return Inertia::render('ActivityList', [
            // Samakan paginasi menjadi 10 untuk konsistensi
            'activities' => Activity::latest()->paginate(10)
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('activities', 'public');
        }

        Activity::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'start_date' => $validatedData['start_date'],
            'end_date' => $validatedData['end_date'],
            'image_path' => $imagePath,
        ]);

        // Gunakan redirect()->route() untuk konsistensi
        return redirect()->route('admin.activities.index');
    }

    public function update(Request $request, Activity $activity)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
        ]);

        $imagePath = $activity->image_path;
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('activities', 'public');
        }

        $activity->update([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'start_date' => $validatedData['start_date'],
            'end_date' => $validatedData['end_date'],
            'image_path' => $imagePath,
        ]);

        // Gunakan redirect()->route() untuk konsistensi
        return redirect()->route('admin.activities.index');
    }

    public function destroy(Activity $activity)
    {
        // Hapus gambar dari storage jika ada
        if ($activity->image_path) {
            Storage::disk('public')->delete($activity->image_path);
        }

        $activity->delete();

        // Gunakan redirect()->route() untuk konsistensi
        return redirect()->route('admin.activities.index');
    }
}