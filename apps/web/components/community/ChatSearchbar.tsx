'use client'
import { useState } from 'react'
import { Search } from 'lucide-react'

interface ChatSearchBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
}

export default function ChatSearchBar({ 
  searchValue, 
  onSearchChange, 
  placeholder = "Search groups..." 
}: ChatSearchBarProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className='relative flex items-center w-full'>
      <input
        value={searchValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        className='w-full py-2 px-4 sm:py-2 sm:px-6 text-xs sm:text-sm bg-transparent border border-white/40 rounded-full focus:outline-none focus:ring focus:ring-primary-500 text-white placeholder:text-white/60'
      />
      <div className="absolute right-3 sm:right-6 text-gray-400">
        <Search className='h-4 w-4 sm:h-5 sm:w-5 text-gray-400' />
      </div>
    </div>
  )
}