import { Head, useForm } from '@inertiajs/react'
import { Post } from "@/types";
import CreatePost from "@/components/create-post";
import LogoutButton from "@/components/ui/logout-button";

interface Props {
  posts: Post[]
}

export default function Feed({ posts }: Props) {
  const { post, data, setData } = useForm({
    comment: ''
  })
  
  return (
    <>
      <Head title="Feed" />
      <div className="max-w-xl mx-auto">
        <LogoutButton />
        <CreatePost />
        {posts.map((p) => (
          <div key={p.id} className="border p-3 mb-4">
            <b>{p.user.name}</b>

            <img
              src={`/storage/${p.image}`}
              className="my-2 w-full rounded"
            />

            <p>{p.caption}</p>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                post(`/posts/${p.id}/like`)
              }}
            >
              <button type="submit">
                ❤️ {p.likes_count}
              </button>
            </form>
            {p.comments.length <= 0 ? '' : p.comments.map((c) => (
              <p>{c.content}</p>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                post(`/posts/${p.id}/comment`)
              }}>
              <label htmlFor="comment">Beri komentar</label>
              <input placeholder="Isi komentar" type="text" value={data.comment} onChange={e => setData('comment', e.target.value)} />
            </form>
          </div>
        ))}
      </div>
    </>

  )
}