<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\AdminToken;
use Illuminate\Support\Facades\Auth;

class SuperAdminTokenAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated.'
            ], 401);
        }

        $tokenHash = hash('sha256', $token);

        $adminToken = AdminToken::where('token_hash', $tokenHash)
            ->where('expires_at', '>', now())
            ->first();

        if (!$adminToken) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid or expired token.'
            ], 401);
        }

        $admin = $adminToken->admin;

        if (!$admin || !$admin->is_super_admin) {
            return response()->json([
                'success' => false,
                'message' => 'Forbidden. Super-Admin access required.'
            ], 403);
        }

        Auth::guard('admin')->setUser($admin);

        return $next($request);
    }
}
