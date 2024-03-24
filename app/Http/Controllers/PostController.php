<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('candidates.user')->get();
       // return response()->json($posts);
       return Inertia::render('Post/Index', [
        'posts' => $posts,
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
        $request->validate([
            'name' => 'required|unique:posts|max:255',
            'description' => 'required|max:255',
            // 'is_available' => 'required|boolean',
            // 'nb_allowed' => 'required|numeric',
        ]);
        $post = new Post();
        $post->name = $request->input('name');
        $post->description = $request->input('description');
        $post->save();

        redirect(route('levels.index'));
        //return response()->json($post, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post = Post::find($id);
        $post->load('candidates');
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }
        return response()->json($post);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|unique:posts|max:255',
            'description' => 'required|max:255',
            'is_available' => 'required|boolean',
            'nb_allowed' => 'required|numeric',
        ]);
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $post->name = $request->input('name');
        $post->description = $request->input('description');
        $post->is_available = $request->input('is_available');
        $post->nb_allowed = $request->input('nb_allowed');
        $post->save();

        return response()->json($post);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted'], 200);
    }
}
