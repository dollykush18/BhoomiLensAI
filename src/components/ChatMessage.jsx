export default function ChatMessage({ sender, text, propertyCards }) {
  const isAssistant = sender === 'assistant'

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-xl rounded-2xl px-4 py-3 ${isAssistant ? 'bg-slate-100 text-slate-800' : 'bg-forest-700 text-white'}`}>
        <p className="text-sm leading-6">{text}</p>
        {propertyCards?.length > 0 && (
          <div className="mt-4 grid gap-3">
            {propertyCards.map((property) => (
              <div key={property.id} className="rounded-2xl bg-white p-3 text-slate-800 shadow-sm">
                <div className="mb-2 flex gap-3">
                  <img src={property.image} alt={property.title} className="h-16 w-20 rounded-xl object-cover" />
                  <div>
                    <div className="font-semibold">{property.title}</div>
                    <div className="text-xs text-slate-500">{property.location}</div>
                    <div className="mt-1 text-sm font-semibold text-forest-700">₹{property.price.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
