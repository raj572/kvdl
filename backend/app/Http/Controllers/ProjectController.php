<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index(Request $request)
    {
        $query = Project::query();

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $projects = $query->orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $projects
        ]);
    }

    /**
     * Display the specified project.
     */
    public function show($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project
        ]);
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:completed,ongoing',
            'reraid' => 'nullable|string',
            'location' => 'nullable|string',
            'pincode' => 'nullable|string',
            'rating' => 'nullable|string',
            'description' => 'nullable|string',
            'image_file' => 'nullable|image|max:5120', // Main cover file (max 5MB)
            'gallery_files.*' => 'nullable|image|max:5120', // Gallery images (max 5MB each)
            'amneties' => 'nullable|string', // JSON string from frontend
            'highlights' => 'nullable|string', // JSON string from frontend
            'brochure_file' => 'nullable|file|mimes:pdf|max:10240', // PDF brochure (max 10MB)
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422);
        }

        $projectData = $request->only([
            'title', 'type', 'reraid', 'location', 'pincode', 'rating', 'description'
        ]);

        // Process Amenities & Highlights JSON strings
        if ($request->has('amneties')) {
            $projectData['amneties'] = json_decode($request->amneties, true);
        }
        if ($request->has('highlights')) {
            $projectData['highlights'] = json_decode($request->highlights, true);
        }

        // Handle Main Image Upload
        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('projects', 'public');
            $projectData['image'] = '/storage/' . $path;
        }

        // Handle Brochure Upload
        if ($request->hasFile('brochure_file')) {
            $path = $request->file('brochure_file')->store('projects/brochures', 'public');
            $projectData['brochure'] = '/storage/' . $path;
        }

        // Handle Gallery Images Upload
        $galleryPaths = [];
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $galleryPaths[] = '/storage/' . $path;
            }
        }
        $projectData['images'] = $galleryPaths;

        $project = Project::create($projectData);

        return response()->json([
            'success' => true,
            'message' => 'Project created successfully.',
            'data' => $project
        ], 201);
    }

    /**
     * Update the specified project in storage.
     */
    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:completed,ongoing',
            'reraid' => 'nullable|string',
            'location' => 'nullable|string',
            'pincode' => 'nullable|string',
            'rating' => 'nullable|string',
            'description' => 'nullable|string',
            'image_file' => 'nullable|image|max:5120',
            'gallery_files.*' => 'nullable|image|max:5120',
            'amneties' => 'nullable|string',
            'highlights' => 'nullable|string',
            'existing_gallery' => 'nullable|string', // JSON array of gallery URLs to keep
            'brochure_file' => 'nullable|file|mimes:pdf|max:10240', // PDF brochure
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422);
        }

        $projectData = $request->only([
            'title', 'type', 'reraid', 'location', 'pincode', 'rating', 'description'
        ]);

        // Process Amenities & Highlights JSON strings
        if ($request->has('amneties')) {
            $projectData['amneties'] = json_decode($request->amneties, true);
        }
        if ($request->has('highlights')) {
            $projectData['highlights'] = json_decode($request->highlights, true);
        }

        // Handle Main Image Upload
        if ($request->hasFile('image_file')) {
            // Delete old main image if exists
            if ($project->image) {
                $oldPath = str_replace('/storage/', '', $project->image);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image_file')->store('projects', 'public');
            $projectData['image'] = '/storage/' . $path;
        }

        // Handle Brochure Upload
        if ($request->hasFile('brochure_file')) {
            if ($project->brochure) {
                $oldPath = str_replace('/storage/', '', $project->brochure);
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('brochure_file')->store('projects/brochures', 'public');
            $projectData['brochure'] = '/storage/' . $path;
        }

        // Handle Gallery Images
        $existingGallery = [];
        if ($request->has('existing_gallery')) {
            $existingGallery = json_decode($request->existing_gallery, true) ?? [];
        }

        $newGalleryPaths = [];
        if ($request->hasFile('gallery_files')) {
            foreach ($request->file('gallery_files') as $file) {
                $path = $file->store('projects/gallery', 'public');
                $newGalleryPaths[] = '/storage/' . $path;
            }
        }

        // Merge existing and new gallery images
        $projectData['images'] = array_merge($existingGallery, $newGalleryPaths);

        $project->update($projectData);

        return response()->json([
            'success' => true,
            'message' => 'Project updated successfully.',
            'data' => $project
        ]);
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy($id)
    {
        $project = Project::find($id);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found.'
            ], 404);
        }

        // Delete main image file
        if ($project->image) {
            $path = str_replace('/storage/', '', $project->image);
            Storage::disk('public')->delete($path);
        }

        // Delete gallery files
        if ($project->images && is_array($project->images)) {
            foreach ($project->images as $img) {
                $path = str_replace('/storage/', '', $img);
                Storage::disk('public')->delete($path);
            }
        }

        $project->delete();

        return response()->json([
            'success' => true,
            'message' => 'Project deleted successfully.'
        ]);
    }
}
