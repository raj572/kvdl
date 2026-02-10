<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Mail\PasswordResetMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller
{
    /**
     * Send password reset link to email
     */
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['We could not find a user with that email address.']
            ]);
        }

        // Generate reset token
        $token = Str::random(64);

        // Delete any existing tokens for this email
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        // Store new token
        DB::table('password_reset_tokens')->insert([
            'email' => $request->email,
            'token' => Hash::make($token),
            'created_at' => now()
        ]);

        // Send email with reset link
        $resetUrl = env('FRONTEND_URL', 'http://localhost:5173') . '/reset-password/' . $token . '?email=' . urlencode($request->email);
        
        Mail::to($request->email)->send(new PasswordResetMail($resetUrl, $user->name ?? 'User'));

        return response()->json([
            'success' => true,
            'message' => 'Password reset link has been sent to your email address.'
        ]);
    }

    /**
     * Reset password using token
     */
    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|min:8|confirmed'
        ]);

        // Find token record
        $tokenRecord = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->first();

        if (!$tokenRecord) {
            throw ValidationException::withMessages([
                'token' => ['Invalid or expired password reset token.']
            ]);
        }

        // Check if token is expired (60 minutes)
        if (now()->diffInMinutes($tokenRecord->created_at) > 60) {
            DB::table('password_reset_tokens')->where('email', $request->email)->delete();
            throw ValidationException::withMessages([
                'token' => ['Password reset token has expired.']
            ]);
        }

        // Verify token
        if (!Hash::check($request->token, $tokenRecord->token)) {
            throw ValidationException::withMessages([
                'token' => ['Invalid password reset token.']
            ]);
        }

        // Find user and update password
        $user = User::where('email', $request->email)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['User not found.']
            ]);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        // Delete the used token
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json([
            'success' => true,
            'message' => 'Password has been reset successfully. You can now login with your new password.'
        ]);
    }
}
