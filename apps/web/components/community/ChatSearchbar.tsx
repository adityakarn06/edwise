'use client'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function ChatSearchBar ({ search }: { search?: string }) {
  const router = useRouter()
  const [text, setText] = useState(search || '')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (!text.trim()) {
      router.push('/best-videos')
    } else {
      router.push(`/videos?search=${encodeURIComponent(text.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='relative flex items-center w-full'>
      <input
        value={text}
        placeholder='Search groups...'
        onChange={e => setText(e.target.value)}
        className='w-full py-2 px-4 sm:py-2 sm:px-6 text-xs sm:text-sm bg-transparent border border-white/40 rounded-full focus:outline-none focus:ring focus:ring-primary-500'
      />
      <button
        type="submit"
        className="absolute right-3 sm:right-6 text-gray-400 hover:text-gray-600"
        aria-label="Search"
      >
        <Search
          className='h-4 w-4 sm:h-5 sm:w-5 text-gray-400'
        />
      </button>
    </form>
  )
}