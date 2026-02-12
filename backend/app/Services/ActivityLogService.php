<?php

namespace App\Services;

use App\Models\ActivityLog;
use Illuminate\Support\Facades\Request;

class ActivityLogService
{
    /**
     * Log an admin activity.
     *
     * @param int|null $adminId
     * @param string $action
     * @param array|null $details
     * @return void
     */
    public static function log(?int $adminId, string $action, ?array $details = [])
    {
        ActivityLog::create([
            'admin_id' => $adminId,
            'action' => $action,
            'ip_address' => Request::ip(),
            'user_agent' => Request::userAgent(),
            'details' => $details,
        ]);
    }
}
