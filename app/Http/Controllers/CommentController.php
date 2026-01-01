<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class CommentController extends Controller 
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'comment' => 'required',
        ]);

        $post->comments()->create([
            'user_id' => auth()->id(),
            'content' => $request->comment,
            'post_id' => $post->id,
        ]);

        return back();
    }
}