export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-forest-700">Contact</div>
      <h1 className="mt-3 text-4xl font-bold text-slate-900">Get in touch</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="text-slate-500">Email</div><div className="mt-2 font-semibold text-slate-900">hello@bhoomilens.ai</div></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="text-slate-500">Phone</div><div className="mt-2 font-semibold text-slate-900">+91 98765 43210</div></div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="text-slate-500">Office</div><div className="mt-2 font-semibold text-slate-900">Jhansi, Uttar Pradesh</div></div>
      </div>
    </div>
  )
}
