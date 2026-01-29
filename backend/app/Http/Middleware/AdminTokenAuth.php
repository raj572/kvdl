<?php

namespace App\Http\Middleware;

use App\Models\AdminToken;
use Closure;
use Illuminate\Http\Request;

class AdminTokenAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $header = $request->header('Authorization', '');
        if (!preg_match('/^Bearer\s+(.+)$/i', $header, $matches)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $token = trim($matches[1]);
        if ($token === '') {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        $tokenHash = hash('sha256', $token);
        $storedToken = AdminToken::with('user')
            ->where('token_hash', $tokenHash)
            ->first();

        if (
            !$storedToken ||
            ($storedToken->expires_at && $storedToken->expires_at->isPast()) ||
            !$storedToken->user ||
            !$storedToken->user->is_admin
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        return $next($request);
    }
}
