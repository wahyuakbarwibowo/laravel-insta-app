import { useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { useState, useRef } from 'react';

export default function CreatePost() {
  const { data, setData, post, processing, errors, reset } = useForm({
    caption: '',
    image: null as File | null
  });

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    setData('image', file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }

  function removeImage() {
    setData('image', null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    post('/posts', {
      onSuccess: () => {
        reset();
        setPreview(null);
      },
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-semibold tracking-tight">Create New Post</h2>
      </div>
      
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="caption" className="sr-only">Caption</Label>
          <Textarea
            id="caption"
            placeholder="Write a caption..."
            value={data.caption}
            onChange={(e) => setData('caption', e.target.value)}
            className="resize-none min-h-[80px] bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/20"
          />
          {errors.caption && <p className="text-sm text-destructive font-medium">{errors.caption}</p>}
        </div>

        <div className="space-y-2">
          {!preview ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors group"
            >
              <ImagePlus className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors mb-2" />
              <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">Click to upload an image</p>
              <Input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden border border-muted">
              <img src={preview} alt="Preview" className="w-full h-auto max-h-[300px] object-cover" />
              <button 
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-colors"
                title="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
          {errors.image && <p className="text-sm text-destructive font-medium">{errors.image}</p>}
        </div>

        <Button 
          type="submit" 
          className="w-full font-semibold shadow-sm transition-all" 
          disabled={processing || !data.image}
        >
          {processing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            'Post'
          )}
        </Button>
      </form>
    </div>
  );
}
