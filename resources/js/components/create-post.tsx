import { useForm } from '@inertiajs/react'

export default function CreatePost() {
  const { data, setData, post, processing, errors } = useForm({
    caption: '',
    image: null as File | null
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    post('/posts')
  }

  return (
    <form onSubmit={submit} className="mb-4">
      <label>Caption</label>
      <input
        type="text"
        placeholder="Caption"
        value={data.caption}
        onChange={(e) => setData('caption', e.target.value)}
      />

      <label htmlFor="">file</label>
      <input
        type="file"
        onChange={(e) =>
          setData('image', e.target.files?.[0] || null)
        }
      />

      <button disabled={processing}>Post</button>

      {errors.caption && <div>{errors.caption}</div>}
    </form>
  )
}
