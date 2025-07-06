<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        // Ambil anggota, kelompokkan berdasarkan divisi
        $members = Member::orderBy('division')->orderBy('name')->get()->groupBy('division');
        return Inertia::render('Member', [
            'members' => $members
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'division' => 'required|string|max:255',
            'period' => 'required|string|max:4',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'social_media' => 'nullable|array'
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('members', 'public');
        }

        Member::create([
            'name' => $validated['name'],
            'position' => $validated['position'],
            'division' => $validated['division'],
            'period' => $validated['period'],
            'photo_path' => $photoPath,
            'social_media' => $validated['social_media'],
        ]);

        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil ditambahkan.');
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'division' => 'required|string|max:255',
            'period' => 'required|string|max:4',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:4096',
            'social_media' => 'nullable|array'
        ]);

        $photoPath = $member->photo_path;
        if ($request->hasFile('photo')) {
            if ($photoPath) {
                Storage::disk('public')->delete($photoPath);
            }
            $photoPath = $request->file('photo')->store('members', 'public');
        }

        $member->update([
            'name' => $validated['name'],
            'position' => $validated['position'],
            'division' => $validated['division'],
            'period' => $validated['period'],
            'photo_path' => $photoPath,
            'social_media' => $validated['social_media'],
        ]);

        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil diperbarui.');
    }

    public function destroy(Member $member)
    {
        if ($member->photo_path) {
            Storage::disk('public')->delete($member->photo_path);
        }
        $member->delete();
        return redirect()->route('admin.members.index')->with('success', 'Anggota berhasil dihapus.');
    }
}