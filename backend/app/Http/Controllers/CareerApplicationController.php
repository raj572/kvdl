<?php

namespace App\Http\Controllers;

use App\Models\CareerApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Throwable;

class CareerApplicationController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'full_name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'position' => 'required|string|max:255',
                'cover_letter' => 'nullable|string',
                'resume' => 'required|file|mimes:pdf,doc,docx|max:10240', // Max 10MB
            ]);

            if ($request->hasFile('resume')) {
                // Store file in storage/app/public/resumes
                $path = $request->file('resume')->store('resumes', 'public');
                
                $application = CareerApplication::create([
                    'full_name' => $validated['full_name'],
                    'email' => $validated['email'],
                    'phone' => $validated['phone'],
                    'position' => $validated['position'],
                    'cover_letter' => $validated['cover_letter'] ?? null,
                    'resume_path' => $path,
                    'status' => 'new',
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Application submitted successfully',
                    'data' => $application
                ], 201);
            }

            return response()->json([
                'success' => false,
                'message' => 'Resume file is required'
            ], 422);

        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit application',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $applications = CareerApplication::orderBy('created_at', 'desc')->get();
            return response()->json([
                'success' => true,
                'data' => $applications
            ]);
        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch applications',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $application = CareerApplication::findOrFail($id);
            
            $validated = $request->validate([
                'status' => 'required|in:new,reviewed,contacted,rejected',
            ]);

            $application->update([
                'status' => $validated['status']
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Status updated successfully',
                'data' => $application
            ]);

        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Download the resume.
     */
    public function downloadResume($id)
    {
        try {
            $application = CareerApplication::findOrFail($id);
            
            if (Storage::disk('public')->exists($application->resume_path)) {
                return Storage::disk('public')->download($application->resume_path);
            }
            
            return response()->json([
                'success' => false,
                'message' => 'File not found'
            ], 404);

        } catch (Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Download failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
