<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    /**
     * Display a listing of contacts.
     */
    public function index()
    {
        try {
            $contacts = Contact::orderBy('created_at', 'desc')->get();
            
            return response()->json([
                'success' => true,
                'data' => $contacts
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve contacts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created contact in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
            'propertyType' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Create the contact
            $contact = Contact::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'subject' => $request->subject,
                'message' => $request->message,
                'property_type' => $request->propertyType,
                'status' => 'new'
            ]);

            // Send email notification to admin
            try {
                \Mail::to('kvdl@lazfort.com')->send(new \App\Mail\ContactFormMail([
                    'name' => $contact->name,
                    'email' => $contact->email,
                    'phone' => $contact->phone,
                    'subject' => $contact->subject,
                    'message' => $contact->message,
                    'property_type' => $contact->property_type,
                    'submitted_at' => $contact->created_at->format('F j, Y g:i A')
                ]));
            } catch (\Exception $mailError) {
                // Log email error but don't fail the request
                \Log::error('Failed to send contact form email: ' . $mailError->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Thank you! Your message has been sent successfully.',
                'data' => $contact
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit contact form',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
