<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ForgotPasswordController extends Controller
{
    public function sendResetLink(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:admins,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'message' => 'Email not found.'], 404);
        }

        $email = $request->email;
        $token = Str::random(64);

        DB::table('admin_password_resets')->updateOrInsert(
            ['email' => $email],
            [
                'email' => $email,
                'token' => $token, // Store plain token (or hash if stricter security needed, but standard laravel uses table)
                'created_at' => Carbon::now()
            ]
        );

        $admin = Admin::where('email', $email)->first();
        ActivityLogService::log($admin->id, 'password_reset_requested');

        // Send Email
        // In a real app, use a Mailable. specific to instructions "Mail templates"
        // keeping it simple or dispatching a job.
        // For now, we'll simulate sending or just log it if mail isn't set up.
        // To be production ready, we MUST send a real email.

        try {
            Mail::raw("Your Admin Password Reset Link: " . url("/admin/reset-password/{$token}?email={$email}"), function ($message) use ($email) {
                $message->to($email);
                $message->subject('Admin Password Reset Request');
            });
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Could not send email.'], 500);
        }

        return response()->json(['success' => true, 'message' => 'Reset link sent to your email.'], 200);
    }
}
