<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\AdminToken;
use Illuminate\Support\Facades\Auth;

class AdminTokenAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
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

        // Extend token expiration (rolling session) - Optional but good for UX
        // $adminToken->update(['expires_at' => now()->addDays(7)]);

        // Log the admin in via the 'admin' guard
        // Note: Since we are using 'session' driver in auth.php but this is stateless token auth,
        // we manually set the user on the request or use Auth::login if session is active.
        // For purely stateless, we just enable the user resolution.

        Auth::guard('admin')->setUser($adminToken->admin);

        return $next($request);
    }
}
