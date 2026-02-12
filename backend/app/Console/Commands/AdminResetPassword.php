<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Admin;
use App\Models\AdminToken;
use App\Services\ActivityLogService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminResetPassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:reset-password {email : The email of the admin} {password : The new password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset admin password manually';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        $password = $this->argument('password');

        $admin = \App\Models\Admin::where('email', $email)->first();

        if (!$admin) {
            $this->error("Admin with email {$email} not found.");
            return;
        }

        $admin->password = \Illuminate\Support\Facades\Hash::make($password);
        $admin->save();

        // Invalidate tokens
        \App\Models\AdminToken::where('admin_id', $admin->id)->delete();
        \Illuminate\Support\Facades\DB::table('admin_password_resets')->where('email', $email)->delete();

        $this->info("Password for {$email} has been reset successfully.");
        \App\Services\ActivityLogService::log($admin->id, 'password_reset_cli');
    }
}
