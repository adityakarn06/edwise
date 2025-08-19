import React, { useState } from 'react'
import { Send } from 'lucide-react'

type Props = {}

export default function Feedback(props: Props) {
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Add backend functionality
    console.log('Feedback submitted:', { feedback, email })
    setFeedback('')
    setEmail('')
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-medium text-white mb-2">Feedback</h2>
        <p className="text-gray-400 text-sm">Help us improve your experience</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email (optional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-2">
            Your feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 bg-white/10 border border-white/15 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all resize-none"
            placeholder="Tell us what you think..."
          />
        </div>

        <button
          type="submit"
          disabled={!feedback.trim()}
          className="w-full bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <Send className="h-4 w-4" />
          Send Feedback
        </button>
      </form>
    </div>
  )
}