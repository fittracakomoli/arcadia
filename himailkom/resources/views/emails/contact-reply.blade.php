{{-- filepath: resources/views/emails/contact-reply-custom.blade.php --}}
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Balasan untuk Pesan Anda</title>
    <style>
        /* CSS ini mungkin tidak berfungsi di semua klien email, 
           itulah mengapa CSS inline lebih diutamakan. */
        body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                    
                    <!-- Header Email -->
                    <tr>
                        <td align="center" style="background-color: #003366; padding: 20px;">
                            {{-- Ganti dengan logo Anda jika ada --}}
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px;">{{ config('app.name') }}</h1>
                        </td>
                    </tr>

                    <!-- Konten Utama -->
                    <tr>
                        <td style="padding: 30px 20px;">
                            <h2 style="color: #333333; margin-top: 0;">Balasan untuk Pesan Anda</h2>
                            <p style="color: #555555; line-height: 1.6;">
                                {{-- Ini adalah isi balasan dari admin --}}
                                {!! nl2br(e($replyBody)) !!}
                            </p>
                            <p style="color: #555555; line-height: 1.6;">
                                Terima kasih,<br>
                                Tim {{ config('app.name') }}
                            </p>
                        </td>
                    </tr>

                    <!-- Garis Pemisah -->
                    <tr>
                        <td style="padding: 0 20px;">
                            <hr style="border: 0; border-top: 1px solid #dddddd;">
                        </td>
                    </tr>

                    <!-- Kutipan Pesan Asli -->
                    <tr>
                        <td style="padding: 20px; background-color: #f9f9f9;">
                            <p style="color: #777777; font-size: 14px; margin: 0;">
                                <strong>Pesan Asli Anda:</strong><br>
                                <strong style="color: #555;">Dari:</strong> {{ $originalMessage->name }}<br>
                                <strong style="color: #555;">Subjek:</strong> {{ $originalMessage->subject }}
                            </p>
                            <p style="color: #777777; font-size: 14px; line-height: 1.5; border-left: 3px solid #dddddd; padding-left: 10px; margin-top: 10px;">
                                {!! nl2br(e($originalMessage->body)) !!}
                            </p>
                        </td>
                    </tr>

                    <!-- Footer Email -->
                    <tr>
                        <td align="center" style="padding: 20px; font-size: 12px; color: #999999;">
                            &copy; {{ date('Y') }} {{ config('app.name') }}. Semua Hak Cipta Dilindungi.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>