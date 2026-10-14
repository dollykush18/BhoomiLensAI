import { useState } from 'react'
import ChatMessage from '../components/ChatMessage'
import { getDemoChatReply } from '../services/chatService'

const suggestedQuestions = [
  'Find a 2 BHK in Jhansi under ₹40 lakh.',
  'Show me houses with parking.',
  'Compare these two properties.',
  'What is the estimated price of this house?',
  'Show me similar properties.',
]

export default function AIChat() {
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'I can help you narrow down listings using budget, area and amenity preferences. Demo mode is active.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAsk = async (question) => {
    const text = question || input.trim()
    if (!text) return

    setMessages((prev) => [...prev, { sender: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const result = await getDemoChatReply(text)
      setMessages((prev) => [...prev, { sender: 'assistant', text: result.reply, propertyCards: result.matches || [] }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      <div className="mb-6">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">AI property assistant</div>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">Smart property guidance</h1>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
        <div className="space-y-4 rounded-3xl bg-slate-50 p-4">
          {messages.map((message, index) => (
            <ChatMessage key={`${message.sender}-${index}`} sender={message.sender} text={message.text} propertyCards={message.propertyCards} />
          ))}
          {loading && <div className="text-sm text-slate-500">Searching matching properties...</div>}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {suggestedQuestions.map((question) => (
            <button key={question} onClick={() => handleAsk(question)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700">{question}</button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none" placeholder="Ask: Find 2 BHK in Jhansi under ₹40 lakh" />
          <button onClick={() => handleAsk()} className="rounded-full bg-forest-700 px-5 py-3 text-sm font-semibold text-white">Send</button>
        </div>
      </div>
    </div>
  )
}
