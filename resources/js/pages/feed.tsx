import { Head, useForm } from '@inertiajs/react';
import { Post } from "@/types";
import CreatePost from "@/components/create-post";
import AppLayout from "@/layouts/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Heart, MessageCircle, Send, MoreHorizontal, Bookmark } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

interface Props {
  posts: Post[]
}

const breadcrumbs = [
    {
        title: 'Feed',
        href: '/feed',
    },
];

export default function Feed({ posts }: Props) {
  const { post, data, setData, processing, reset } = useForm({
    comment: ''
  })

  const handleLike = (postId: number) => {
    post(`/posts/${postId}/like`, {
      preserveScroll: true,
    });
  };

  const handleComment = (e: React.FormEvent, postId: number) => {
    e.preventDefault();
    post(`/posts/${postId}/comment`, {
      preserveScroll: true,
      onSuccess: () => reset('comment'),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Feed" />
      
      <div className="max-w-xl mx-auto py-8 px-4 space-y-8">
        {/* Create Post Section */}
        <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4">
            <CreatePost />
          </CardContent>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((p) => (
            <Card key={p.id} className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
              {/* Post Header */}
              <CardHeader className="flex flex-row items-center justify-between p-4 space-y-0">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9 ring-2 ring-primary/10">
                    <AvatarImage src={p.user.avatar || `https://avatar.iran.liara.run/username?username=${p.user.name}`} />
                    <AvatarFallback>{p.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-none hover:underline cursor-pointer">
                      {p.user.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">
                      {/* Assuming created_at exists or just use a placeholder */}
                      {p.user.created_at ? formatDistanceToNow(new Date(p.user.created_at)) + ' ago' : 'Recently'}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </CardHeader>

              {/* Post Image */}
              <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden">
                <img
                  src={`/storage/${p.image}`}
                  alt={p.caption}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Post Actions */}
              <CardContent className="p-4 pb-2">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => handleLike(p.id)}
                      className="group flex items-center transition-all active:scale-125"
                    >
                      <Heart className={`h-6 w-6 transition-colors ${p.likes_count > 0 ? "fill-red-500 text-red-500" : "text-foreground group-hover:text-red-500"}`} />
                    </button>
                    <button className="hover:text-muted-foreground transition-colors">
                      <MessageCircle className="h-6 w-6" />
                    </button>
                    <button className="hover:text-muted-foreground transition-colors">
                      <Send className="h-6 w-6" />
                    </button>
                  </div>
                  <button className="hover:text-muted-foreground transition-colors">
                    <Bookmark className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold">{p.likes_count.toLocaleString()} likes</p>
                  <div className="text-sm">
                    <span className="font-semibold mr-2">{p.user.name}</span>
                    <span className="text-muted-foreground leading-relaxed">{p.caption}</span>
                  </div>
                </div>

                {/* Comments Section */}
                {p.comments.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <Separator className="bg-muted/50" />
                    <button className="text-xs text-muted-foreground font-medium hover:text-foreground transition-colors py-1">
                      View all {p.comments.length} comments
                    </button>
                    <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                      {p.comments.slice(-3).map((c) => (
                        <div key={c.id} className="text-sm flex items-start space-x-2">
                          <span className="font-semibold text-[13px]">User</span>
                          <span className="text-muted-foreground text-[13px]">{c.content}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Comment Input */}
              <CardFooter className="p-4 pt-0 border-t border-muted/30 mt-2">
                <form
                  onSubmit={(e) => handleComment(e, p.id)}
                  className="w-full flex items-center space-x-2 mt-4"
                >
                  <Input 
                    placeholder="Add a comment..." 
                    className="border-none bg-transparent focus-visible:ring-0 px-0 h-auto text-sm"
                    value={data.comment}
                    onChange={e => setData('comment', e.target.value)}
                  />
                  <Button 
                    type="submit" 
                    variant="ghost" 
                    size="sm" 
                    disabled={!data.comment.trim() || processing}
                    className="text-primary font-semibold hover:bg-transparent hover:text-primary/80 disabled:opacity-50"
                  >
                    Post
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ))}

          {posts.length === 0 && (
            <div className="text-center py-20 bg-card rounded-xl border border-dashed">
              <p className="text-muted-foreground">No posts yet. Start by sharing your first moment!</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}