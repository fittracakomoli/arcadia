<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AgendaController extends Controller
{
    public function index()
    {
        return Inertia::render('AgendaList', [
            'agendas' => Agenda::latest()->paginate(12)
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
        ]);

        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('agendas', 'public');
        }

        Agenda::create($validated);
        return back()->with('success', 'Agenda berhasil ditambahkan.');
    }

    public function update(Request $request, Agenda $agenda)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:4096',
        ]);

        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($agenda->image_path) {
                Storage::disk('public')->delete($agenda->image_path);
            }
            $validated['image_path'] = $request->file('image')->store('agendas', 'public');
        }

        $agenda->update($validated);
        return back()->with('success', 'Agenda berhasil diperbarui.');
    }

    public function destroy(Agenda $agenda)
    {
        if ($agenda->image_path) {
            Storage::disk('public')->delete($agenda->image_path);
        }
        $agenda->delete();
        return back()->with('success', 'Agenda berhasil dihapus.');
    }
}