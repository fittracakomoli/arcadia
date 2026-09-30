<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\News;
use App\Models\Member;
use App\Models\Activity;
use App\Models\Agenda;
use App\Models\Gallery;
use App\Models\Message;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'admins' => User::count(),
            'news' => News::count(),
            'members' => Member::count(),
            'activities' => Activity::count(),
            'agendas' => Agenda::count(),
            'photos' => Gallery::count(),
            'messages' => Message::count(),
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats
        ]);
    }
}