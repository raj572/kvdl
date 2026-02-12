<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\AdminToken;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AdminAuthController extends Controller
{
    /**
     * Handle admin login.
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            ActivityLogService::log(null, 'login_failed', ['email' => $request->email]);

            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials.'
            ], 401);
        }

        // Generate Token
        $token = Str::random(64);
        $tokenHash = hash('sha256', $token);
        $expiresAt = now()->addDays(7); // 7 days expiration

        AdminToken::create([
            'admin_id' => $admin->id,
            'token_hash' => $tokenHash,
            'expires_at' => $expiresAt
        ]);

        ActivityLogService::log($admin->id, 'login_success');

        return response()->json([
            'success' => true,
            'token' => $token,
            'expires_at' => $expiresAt,
            'admin' => [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
            ]
        ], 200);
    }

    /**
     * Get current authenticated admin.
     */
    public function me()
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            return response()->json(['success' => false, 'message' => 'Unauthenticated'], 401);
        }

        return response()->json([
            'success' => true,
            'data' => $admin
        ], 200);
    }

    /**
     * Logout admin.
     */
    public function logout(Request $request)
    {
        $admin = Auth::guard('admin')->user();
        $token = $request->bearerToken();

        if ($token) {
            $tokenHash = hash('sha256', $token);
            AdminToken::where('token_hash', $tokenHash)->delete();
        }

        if ($admin) {
            ActivityLogService::log($admin->id, 'logout');
        }

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully'
        ], 200);
    }
}
