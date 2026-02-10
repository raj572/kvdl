<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Log;

class BlogController extends Controller
{
    /**
     * Display a listing of blogs.
     */
    public function index()
    {
        try {
            $blogs = Blog::orderBy('created_at', 'desc')->get();

            return response()->json([
                'success' => true,
                'data' => $blogs
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve blogs',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified blog.
     */
    public function show(Blog $blog)
    {
        return response()->json([
            'success' => true,
            'data' => $blog
        ], 200);
    }

    /**
     * Store a newly created blog in storage.
     */
    public function store(Request $request)
    {
        Log::info('Blog Store Request:', $request->all());
        Log::info('Has Cover Image:', ['has_file' => $request->hasFile('cover_image')]);
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'cover_image' => 'nullable|file|mimes:jpeg,png,jpg,webp|max:2048', // File upload validation
            'video_file' => 'nullable|file|mimes:mp4,mov,ogg|max:10240', // 10MB limit
            'video_type' => 'nullable|in:youtube,instagram,upload',
            'video_url' => 'nullable|string',
            'status' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Handle Cover Image Upload
            $coverUrl = null;
            if ($request->hasFile('cover_image')) {
                $destinationPath = public_path('uploads/blogs/images');
                Log::info('Upload Destination:', ['path' => $destinationPath]);

                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }

                $file = $request->file('cover_image');
                $originalName = $file->getClientOriginalName();
                $sanitizedName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);
                $filename = time() . '_' . $sanitizedName;
                $file->move($destinationPath, $filename);
                $coverUrl = '/uploads/blogs/images/' . $filename;
            } elseif ($request->filled('coverUrl')) {
                 $coverUrl = $request->coverUrl; // Fallback for URL input
            }

            // Handle Video Logic
            $finalVideoUrl = null;
            if ($request->video_type === 'upload' && $request->hasFile('video_file')) {
                $destinationPath = public_path('uploads/blogs/videos');
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }

                $file = $request->file('video_file');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->move($destinationPath, $filename);
                $finalVideoUrl = '/uploads/blogs/videos/' . $filename;
            } elseif ($request->video_type === 'youtube' || $request->video_type === 'instagram') {
                $finalVideoUrl = $request->video_url; // Use provided YouTube or Instagram URL
            }

            $blog = Blog::create([
                'title' => $request->title,
                'author' => $request->author ?? 'Admin',
                'excerpt' => $request->excerpt,
                'content' => $request->content,
                'cover_url' => $coverUrl,
                'status' => $request->status ?? 'published',
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
                'meta_keywords' => $request->meta_keywords,
                'video_type' => $request->video_type,
                'video_url' => $finalVideoUrl,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Blog created successfully.',
                'data' => $blog
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create blog',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified blog in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        Log::info('Blog Update Request:', $request->all());
        Log::info('Update Has Cover Image:', ['has_file' => $request->hasFile('cover_image')]);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'cover_image' => 'nullable|file|mimes:jpeg,png,jpg,webp|max:2048',
            'video_file' => 'nullable|file|mimes:mp4,mov,ogg|max:10240',
            'video_type' => 'nullable|in:youtube,instagram,upload',
            'video_url' => 'nullable|string',
            'status' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $coverUrl = $blog->cover_url;
            if ($request->hasFile('cover_image')) {
                // Delete old image if exists
                if ($coverUrl && file_exists(public_path($coverUrl))) {
                    @unlink(public_path($coverUrl));
                }

                $destinationPath = public_path('uploads/blogs/images');
                Log::info('Update Upload Destination:', ['path' => $destinationPath]);

                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }

                $file = $request->file('cover_image');
                $originalName = $file->getClientOriginalName();
                $sanitizedName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);
                $filename = time() . '_' . $sanitizedName;
                $file->move($destinationPath, $filename);
                $coverUrl = '/uploads/blogs/images/' . $filename;
            } elseif ($request->filled('coverUrl')) {
                 $coverUrl = $request->coverUrl;
            }

            $finalVideoUrl = $blog->video_url;
            if ($request->video_type === 'upload' && $request->hasFile('video_file')) {
                // Delete old video if exists and was uploaded
                if ($blog->video_type === 'upload' && $finalVideoUrl && file_exists(public_path($finalVideoUrl))) {
                    @unlink(public_path($finalVideoUrl));
                }

                $destinationPath = public_path('uploads/blogs/videos');
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }

                $file = $request->file('video_file');
                $originalName = $file->getClientOriginalName();
                $sanitizedName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);
                $filename = time() . '_' . $sanitizedName;
                $file->move($destinationPath, $filename);
                $finalVideoUrl = '/uploads/blogs/videos/' . $filename;
            } elseif ($request->video_type === 'youtube' || $request->video_type === 'instagram') {
                $finalVideoUrl = $request->video_url; // Use provided YouTube or Instagram URL
            }

            $blog->update([
                'title' => $request->title,
                'author' => $request->author ?? 'Admin',
                'excerpt' => $request->excerpt,
                'content' => $request->content,
                'cover_url' => $coverUrl,
                'status' => $request->status ?? 'published',
                'meta_title' => $request->meta_title,
                'meta_description' => $request->meta_description,
                'meta_keywords' => $request->meta_keywords,
                'video_type' => $request->video_type,
                'video_url' => $finalVideoUrl,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Blog updated successfully.',
                'data' => $blog
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update blog',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified blog from storage.
     */
    public function destroy(Blog $blog)
    {
        try {
            $blog->delete();

            return response()->json([
                'success' => true,
                'message' => 'Blog deleted successfully.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete blog',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload media for blog content.
     */
    public function uploadMedia(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|file|mimes:jpeg,png,jpg,webp,gif|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid image file',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            if ($request->hasFile('image')) {
                $destinationPath = public_path('uploads/blogs/content_images');
                if (!file_exists($destinationPath)) {
                    mkdir($destinationPath, 0777, true);
                }

                $file = $request->file('image');
                $originalName = $file->getClientOriginalName();
                $sanitizedName = preg_replace('/[^a-zA-Z0-9._-]/', '_', $originalName);
                $filename = time() . '_' . $sanitizedName;
                $file->move($destinationPath, $filename);
                $url = '/uploads/blogs/content_images/' . $filename;

                return response()->json([
                    'success' => true,
                    'url' => $url
                ], 200);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
