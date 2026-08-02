"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { OWNER } from '@/lib/data'

export default function ContactSection() {
  const [form, setForm] = useState({ name:'', email:'', message:'' })
  const [status, setStatus] = useState<'idle'|'sent'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:${OWNER.email}?subject=${encodeURIComponent(`Portfolio Contact from ${form.name}`)}&body=${encodeURIComponent(form.message)}`
    setStatus('sent')
  }

  return (
    <section id="contact" className="section-padding max-w-4xl mx-auto">
      <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }} transition={{ duration:0.5 }} className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Get In <span className="gradient-text">Touch</span></h2>
        <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-400 rounded mx-auto mb-4" />
        <p className="text-slate-400">Open to collaborations, internships, and interesting projects</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }}
          className="space-y-5">
          {[
            { icon:'✉️', label:'Email', value:OWNER.email, href:`mailto:${OWNER.email}` },
            { icon:'📍', label:'Location', value:OWNER.location, href:'#' },
            { icon:'💼', label:'LinkedIn', value:'durgesh-dutt-s-4ba74924b', href:OWNER.linkedin },
            { icon:'💻', label:'GitHub', value:'@OxDurgeshxO', href:OWNER.github },
          ].map(item => (
            <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 glass p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all group">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-slate-400 text-xs">{item.label}</div>
                <div className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">{item.value}</div>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.form onSubmit={handleSubmit}
          initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }} transition={{ duration:0.6 }}
          className="glass rounded-2xl p-6 border border-white/5 space-y-4">
          {status === 'sent' ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-green-400 font-semibold">Email client opened!</p>
              <p className="text-slate-400 text-sm mt-2">Thanks for reaching out.</p>
            </div>
          ) : (
            <>
              {['name','email'].map(field => (
                <input key={field} type={field === 'email' ? 'email' : 'text'}
                  placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                  value={(form as any)[field]}
                  onChange={e => setForm({...form, [field]:e.target.value})}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all text-sm" />
              ))}
              <textarea placeholder="Your message..." rows={4} required
                value={form.message} onChange={e => setForm({...form, message:e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all text-sm resize-none" />
              <button type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold hover:opacity-90 transition-all">
                Send Message ✉️
              </button>
            </>
          )}
        </motion.form>
      </div>
    </section>
  )
}
