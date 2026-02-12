<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Services\ActivityLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:admins,email',
            'token' => 'required',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        $record = DB::table('admin_password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$record) {
            return response()->json(['success' => false, 'message' => 'Invalid token.'], 400);
        }

        // Check expiration (30 minutes)
        if (Carbon::parse($record->created_at)->addMinutes(30)->isPast()) {
            DB::table('admin_password_resets')->where('email', $request->email)->delete();
            return response()->json(['success' => false, 'message' => 'Token expired.'], 400);
        }

        $admin = Admin::where('email', $request->email)->first();
        $admin->password = Hash::make($request->password);
        $admin->save();

        // Invalidate token
        DB::table('admin_password_resets')->where('email', $request->email)->delete();

        ActivityLogService::log($admin->id, 'password_reset_success');

        return response()->json(['success' => true, 'message' => 'Password reset successfully.'], 200);
    }
}
