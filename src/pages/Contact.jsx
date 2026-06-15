import { useState } from 'react'
import { MapPin, Mail, Clock, ExternalLink, ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls = `w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900
  focus:outline-none focus:border-forest-400 focus:ring-2 focus:ring-forest-100 transition-all placeholder:text-gray-300`

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    const sub  = encodeURIComponent(form.subject || 'GSAL Inquiry')
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)
    window.location.href = `mailto:adeel.geog@pu.edu.pk?subject=${sub}&body=${body}`
    setSent(true)
  }

  return (
    <div>
      <PageHeader
        label="Get in Touch"
        title="Contact Us"
        subtitle="Research collaborations, student applications, and general inquiries."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-5 gap-14">
        {/* Info */}
        <aside className="md:col-span-2 space-y-8">
          <ScrollReveal>
            <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Location</span>
            <div className="mt-4 space-y-5">
              {[
                {
                  icon: MapPin,
                  title: 'Address',
                  body: (
                    <>
                      GeoScape Analytics Lab (GSAL)<br />
                      Lahore, Punjab, Pakistan
                      <br />
                      <span className="font-mono text-xs text-earth-600 mt-1 inline-block">
                        31°29′38.8″N  74°17′55.3″E
                      </span>
                    </>
                  ),
                },
                {
                  icon: Mail,
                  title: 'Email',
                  body: (
                    <a href="mailto:adeel.geog@pu.edu.pk"
                      className="text-forest-700 hover:text-forest-500 transition-colors">
                      adeel.geog@pu.edu.pk
                    </a>
                  ),
                },
                {
                  icon: Clock,
                  title: 'Office Hours',
                  body: 'Monday – Friday: 9:00 AM – 5:00 PM PKT',
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-600 shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">{title}</p>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="https://www.google.com/maps?q=31.4941,74.2987" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-6 text-xs font-bold text-forest-700 hover:text-forest-500 transition-colors">
              <ExternalLink size={12} /> Open in Google Maps
            </a>

            {/* Map placeholder */}
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 h-44 flex flex-col items-center justify-center text-gray-300 gap-2">
              <MapPin size={24} />
              <span className="text-xs">31°29′N  74°17′E</span>
            </div>
          </ScrollReveal>
        </aside>

        {/* Form */}
        <div className="md:col-span-3">
          <ScrollReveal delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Message</span>
            <h2 className="text-3xl font-black text-gray-900 mt-2 mb-8">Send a Message</h2>

            {sent ? (
              <div className="bg-forest-50 border border-forest-200 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-4">
                  <Mail size={22} className="text-forest-700" />
                </div>
                <h3 className="font-black text-forest-900 text-xl">Message Ready</h3>
                <p className="text-forest-700 text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                  Your email client should have opened with the message pre-filled. Send it from there.
                </p>
                <button onClick={() => setSent(false)}
                  className="mt-6 text-xs font-bold text-forest-600 underline underline-offset-2">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" required>
                    <input type="text" required value={form.name} onChange={set('name')}
                      placeholder="Dr. Jane Smith" className={inputCls} />
                  </Field>
                  <Field label="Email" required>
                    <input type="email" required value={form.email} onChange={set('email')}
                      placeholder="jane@university.edu" className={inputCls} />
                  </Field>
                </div>
                <Field label="Subject">
                  <input type="text" value={form.subject} onChange={set('subject')}
                    placeholder="Research collaboration / PhD application / Other"
                    className={inputCls} />
                </Field>
                <Field label="Message" required>
                  <textarea required rows={6} value={form.message} onChange={set('message')}
                    placeholder="Tell us about your inquiry, research interest, or collaboration proposal…"
                    className={`${inputCls} resize-none`} />
                </Field>
                <button type="submit"
                  className="w-full py-3.5 bg-forest-900 hover:bg-forest-800 text-white font-bold rounded-xl transition-all text-sm uppercase tracking-wide flex items-center justify-center gap-2">
                  Send Message <ArrowRight size={14} />
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Opens your email client · No data stored on our servers
                </p>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
