import { MessageCircle, SendHorizonal, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { getDemoChatReply } from '../services/chatService'
import { useAppContext } from '../context/AppContext'
import ChatMessage from './ChatMessage'

export default function Chatbot() {
  const { properties } = useAppContext()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'assistant',
      text: 'Hi! I can help you find properties, compare options, or explain price estimates. Demo mode is active.',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const askAssistant = async () => {
    const trimmed = input.trim()
    if (!trimmed) return

    const newMessages = [...messages, { sender: 'user', text: trimmed }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const result = await getDemoChatReply(trimmed)
      const replyCards = result.matches?.slice(0, 2) || []
      setMessages([...newMessages, { sender: 'assistant', text: result.reply, propertyCards: replyCards }])
    } catch (error) {
      setMessages([...newMessages, { sender: 'assistant', text: 'Sorry, the demo assistant could not respond right now.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-[360px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-forest-700 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">BhoomiLensAI Assistant</span>
            </div>
            <button type="button" onClick={() => setOpen(false)}><X className="h-4 w-4" /></button>
          </div>

          <div className="flex max-h-[440px] flex-col gap-3 bg-slate-50 p-3">
            <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-forest-700">
              <Sparkles className="h-3 w-3" /> Demo AI
            </div>
            <div className="space-y-3 overflow-y-auto pr-1">
              {messages.map((message, index) => (
                <ChatMessage key={`${message.sender}-${index}`} sender={message.sender} text={message.text} propertyCards={message.propertyCards} />
              ))}
              {loading && <div className="text-sm text-slate-500">Assistant is searching...</div>}
            </div>

            <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                placeholder="Ask about a property, budget or location"
                className="w-full resize-none border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Uses demo data</div>
                <button type="button" onClick={askAssistant} className="inline-flex items-center gap-1 rounded-full bg-forest-700 px-3 py-2 text-xs font-semibold text-white">
                  <SendHorizonal className="h-3 w-3" /> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="flex items-center gap-3 rounded-full bg-forest-700 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-forest-600">
          <MessageCircle className="h-5 w-5" />
          Ask AI
        </button>
      )}
    </div>
  )
}
