<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'caption' => 'required',
            'image' => 'required|image'
        ]);

        $path = $request->file('image')->store('posts', 'public');

        Post::create([
            'user_id' => auth()->id(),
            'caption' => $request->caption,
            'image' => $path,
        ]);

        return back();
    }
}