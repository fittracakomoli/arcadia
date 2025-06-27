<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\ContactReplyMail;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class MessageController extends Controller
{
    public function index()
    {
        return Inertia::render('Message', [
            'messages' => Message::latest()->paginate(15)
        ]);
    }

    public function update(Request $request, Message $message)
    {
        $request->validate(['is_read' => 'required|boolean']);
        $message->update(['is_read' => $request->is_read]);
        return back();
    }

    public function reply(Request $request, Message $message)
    {
        $request->validate(['reply_body' => 'required|string']);

        Mail::to($message->email)->send(new ContactReplyMail($message, $request->reply_body));

        // Tandai sebagai sudah dibaca setelah dibalas
        $message->update(['is_read' => true]);

        return back()->with('success', 'Email balasan berhasil dikirim.');
    }

    public function destroy(Message $message)
    {
        $message->delete();
        return back();
    }
}