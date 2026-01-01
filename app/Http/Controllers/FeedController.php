<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedController extends Controller
{
    public function index()
    {
        return Inertia::render('feed', [
            'posts' => Post::with('user')
                ->withCount('likes')
                ->with('comments')
                ->latest()
                ->get()
        ]);
    }
}
