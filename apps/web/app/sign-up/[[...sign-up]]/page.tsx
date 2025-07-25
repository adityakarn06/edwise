import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex h-screen w-screen items-center justify-center bg-black/90 text-white'>
        <SignUp />
    </div>
  )
}
    