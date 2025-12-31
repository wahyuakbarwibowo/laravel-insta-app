<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;

class LikeController extends Controller
{
    public function store(Post $post)
    {
        $post->likes()->firstOrCreate([
            'user_id' => auth()->id(),
            'post_id' => $post->id,
        ]);

        return back();
    }
}