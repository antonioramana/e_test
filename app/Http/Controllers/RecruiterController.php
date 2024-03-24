<?php

namespace App\Http\Controllers;

use App\Models\Recruiter;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\UserController;
use Inertia\Inertia;


class RecruiterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $recruiters = Recruiter::with('user', 'department')->get();
       
        return Inertia::render('Recruiter/Index', [
            'recruiters' => $recruiters,
        ]);
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
            'department_id' => 'required|exists:departments,id',
            'job_title' => 'required|max:255',
        ]);
        $recruiter = new Recruiter();
        $recruiter->user_id = $user->id;
        $recruiter->department_id = $request->input('department_id');
        $recruiter->job_title = $request->input('job_title');
        $recruiter->save();

        return response()->json($recruiter, 201);
       
    }

    /**
     * Display the specified resource.
     */
    public function show(Recruiter $recruiter)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Recruiter $recruiter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'department_id' => 'required|exists:departments,id',
            'job_title' => 'required|max:255',
        ]);

        $recruiter = Recruiter::find($id);
        if (!$recruiter) {
            return response()->json(['message' => 'Recruiter not found'], 404);
        }

        $recruiter->department_id = $request->input('department_id');
        $recruiter->job_title = $request->input('job_title');
        $recruiter->save();

        return response()->json($recruiter);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $recruiter = Recruiter::find($id);
        if (!$recruiter) {
            return response()->json(['message' => 'Recruiter not found'], 404);
        }

        $recruiter->delete();

        return response()->json(['message' => 'Recruiter deleted'], 200);
    }
}
