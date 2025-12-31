<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;

class LikeController extends Controller
{
    public function like(Post $post)
    {
        $post->likes()->firstOrCreate([
            'user_id' => auth()->id(),
            'post_id' => $post->id,
        ]);

        return back();
    }
}