<?php

namespace App\Mail;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactReplyMail extends Mailable
{
    use Queueable, SerializesModels;

    public $originalMessage;
    public $replyBody;

    public function __construct(Message $originalMessage, string $replyBody)
    {
        $this->originalMessage = $originalMessage;
        $this->replyBody = $replyBody;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Re: ' . $this->originalMessage->subject,
        );
    }

    /**
    * Get the message content definition.
    */
    public function content(): Content
    {
        // UBAH DARI 'markdown:' MENJADI 'view:'
        return new Content(
            view: 'emails.contact-reply', // Kita akan buat file ini
        );
    }
}