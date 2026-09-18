<?php

namespace App\Http\Controllers;

use App\Models\Podcast;
use Illuminate\Http\Request;

class PodcastController extends Controller
{
    /**
     * Public index - fetch active podcasts ordered by sort_order and created_at.
     */
    public function index()
    {
        $podcasts = Podcast::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $podcasts,
        ]);
    }

    /**
     * Admin index - fetch all podcasts.
     */
    public function adminIndex()
    {
        $podcasts = Podcast::orderBy('sort_order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $podcasts,
        ]);
    }

    /**
     * Create a new podcast from YouTube URL.
     */
    public function store(Request $request)
    {
        $request->validate([
            'youtube_url' => 'required|string',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        $videoId = $this->extractVideoId($request->youtube_url);

        if (!$videoId) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid YouTube URL. Please provide a valid YouTube video link or Shorts URL.',
            ], 422);
        }

        $podcast = Podcast::create([
            'title' => $request->title ?: 'Podcast Episode',
            'youtube_url' => $request->youtube_url,
            'video_id' => $videoId,
            'description' => $request->description,
            'sort_order' => $request->sort_order ?? 0,
            'is_active' => $request->has('is_active') ? $request->boolean('is_active') : true,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Podcast added successfully!',
            'data' => $podcast,
        ], 201);
    }

    /**
     * Update an existing podcast.
     */
    public function update(Request $request, $id)
    {
        $podcast = Podcast::find($id);

        if (!$podcast) {
            return response()->json([
                'success' => false,
                'message' => 'Podcast not found.',
            ], 404);
        }

        $request->validate([
            'youtube_url' => 'sometimes|required|string',
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->has('youtube_url') && $request->youtube_url !== $podcast->youtube_url) {
            $videoId = $this->extractVideoId($request->youtube_url);
            if (!$videoId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid YouTube URL.',
                ], 422);
            }
            $podcast->youtube_url = $request->youtube_url;
            $podcast->video_id = $videoId;
        }

        if ($request->has('title')) {
            $podcast->title = $request->title;
        }
        if ($request->has('description')) {
            $podcast->description = $request->description;
        }
        if ($request->has('sort_order')) {
            $podcast->sort_order = $request->sort_order;
        }
        if ($request->has('is_active')) {
            $podcast->is_active = $request->boolean('is_active');
        }

        $podcast->save();

        return response()->json([
            'success' => true,
            'message' => 'Podcast updated successfully!',
            'data' => $podcast,
        ]);
    }

    /**
     * Delete a podcast.
     */
    public function destroy($id)
    {
        $podcast = Podcast::find($id);

        if (!$podcast) {
            return response()->json([
                'success' => false,
                'message' => 'Podcast not found.',
            ], 404);
        }

        $podcast->delete();

        return response()->json([
            'success' => true,
            'message' => 'Podcast deleted successfully.',
        ]);
    }

    /**
     * Helper to extract YouTube video ID from various YouTube URL formats.
     */
    private function extractVideoId($url)
    {
        $pattern = '/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/';
        if (preg_match($pattern, trim($url), $matches)) {
            return $matches[1];
        }

        if (preg_match('/^[a-zA-Z0-9_-]{11}$/', trim($url))) {
            return trim($url);
        }

        return null;
    }
}
