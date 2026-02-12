<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Initiate email change.
     */
    public function updateEmail(Request $request)
    {
        $admin = Auth::guard('admin')->user();

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:admins,email',
            'current_password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        if (!Hash::check($request->current_password, $admin->password)) {
            ActivityLogService::log($admin->id, 'email_change_failed_password');
            return response()->json(['success' => false, 'message' => 'Incorrect password.'], 401);
        }

        $newEmail = $request->email;
        $verificationToken = Str::random(64);

        // Store verification details in Cache for 30 minutes
        Cache::put('admin_email_change_' . $admin->id, [
            'new_email' => $newEmail,
            'token' => $verificationToken
        ], now()->addMinutes(30));

        ActivityLogService::log($admin->id, 'email_change_requested', ['new_email' => $newEmail]);

        try {
            Mail::raw("Verify New Admin Email: " . url("/admin/verify-email/{$verificationToken}"), function ($message) use ($newEmail) {
                $message->to($newEmail);
                $message->subject('Verify New Email Address');
            });
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Could not send verification email.'], 500);
        }

        return response()->json(['success' => true, 'message' => 'Verification link sent to new email.'], 200);
    }

    /**
     * Verify and update email.
     */
    public function verifyEmail(Request $request, $token)
    {
        $admin = Auth::guard('admin')->user();
        $cachedData = Cache::get('admin_email_change_' . $admin->id);

        if (!$cachedData || $cachedData['token'] !== $token) {
            return response()->json(['success' => false, 'message' => 'Invalid or expired token.'], 400);
        }

        $oldEmail = $admin->email;
        $admin->email = $cachedData['new_email'];
        $admin->save();

        Cache::forget('admin_email_change_' . $admin->id);

        // Invalidate old password reset tokens
        DB::table('admin_password_resets')->where('email', $oldEmail)->delete();

        ActivityLogService::log($admin->id, 'email_change_success', ['old_email' => $oldEmail, 'new_email' => $admin->email]);

        return response()->json(['success' => true, 'message' => 'Email updated successfully.'], 200);
    }
}
