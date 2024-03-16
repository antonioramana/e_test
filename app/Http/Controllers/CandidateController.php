<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;

class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $candidates = Candidate::with('user', 'post')->get();
        return response()->json($candidates);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = UserController::store($request);
        if (!$user) {
            return response()->json(['message' => 'User registration failed'], 400);
        }
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'status' => 'required|in:admitted,pending,failed',
            'gender' => 'required|in:masculine,feminine',
        ]);
        $candidate = new Candidate();
        $candidate->user_id = $user->id;
        $candidate->post_id = $request->input('post_id');
        $candidate->status = $request->input('status');
        $candidate->gender = $request->input('gender');
        $candidate->save();

        return response()->json($candidate, 201);
       
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Candidate $candidate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'status' => 'required|in:admitted,pending,failed',
            'gender' => 'required|in:masculine,feminine',
        ]);

        $candidate = Candidate::find($id);
        if (!$candidate) {
            return response()->json(['message' => 'Candidate not found'], 404);
        }

        $candidate->post_id = $request->input('post_id');
        $candidate->status = $request->input('status');
        $candidate->gender = $request->input('gender');
        $candidate->save();

        return response()->json($candidate);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $candidate = Candidate::find($id);
        if (!$candidate) {
            return response()->json(['message' => 'Candidate not found'], 404);
        }

        $candidate->delete();

        return response()->json(['message' => 'Candidate deleted'], 200);
    }
}
