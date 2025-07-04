<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Illuminate\Http\Request;
use App\Models\OrganizationSetting;

class HandleInertiaRequests extends Middleware
{
    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $settings = OrganizationSetting::firstOrCreate([]);

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user()
            ],
            // 2. Tambahkan baris ini untuk membagikan settingsAdd commentMore actions
            'settings' => $settings->only('logo_horizontal_path', 'email', 'address'),
        ]);
    }
}
