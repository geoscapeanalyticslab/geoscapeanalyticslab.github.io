import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { blogs } from '../data/blogs'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'

const CATS = ['All', 'Forest Mapping', 'GeoAI', 'Urban Analysis', 'Water Resources']

function BlogCard({ blog, index }) {
  const date = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <ScrollReveal delay={index * 0.07}>
      <article className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group">
        {/* Image / placeholder */}
        <div className="h-44 bg-forest-950 overflow-hidden relative">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
            onError={e => e.target.classList.add('hidden')} />
          <span className="absolute top-3 left-3 bg-white/95 text-forest-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {blog.category}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1.5"><Calendar size={11} />{date}</span>
            <span className="flex items-center gap-1.5"><Clock size={11} />{blog.readTime}</span>
          </div>

          <h3 className="font-black text-gray-900 text-base leading-snug group-hover:text-forest-800 transition-colors cursor-pointer flex-1">
            {blog.title}
          </h3>

          <p className="text-gray-400 text-sm mt-3 leading-relaxed line-clamp-2">{blog.excerpt}</p>

          <div className="flex flex-wrap gap-1.5 mt-4">
            {blog.tags.map(t => (
              <span key={t} className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">{blog.author}</span>
            <button className="text-xs font-bold text-forest-700 hover:text-forest-500 transition-colors flex items-center gap-1 group/btn">
              Read More <ArrowRight size={11} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </article>
    </ScrollReveal>
  )
}

export default function Blogs() {
  return (
    <div>
      <PageHeader
        label="Lab Blog"
        title="Blogs"
        subtitle=""
      />

      {/* ── Blog posts hidden for now — will upload soon. Keeping the code below for later. ──
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {blogs.map((b, i) => <BlogCard key={b.id} blog={b} index={i} />)}
        </div>
      </section>
      */}

      {/* Coming soon placeholder */}
      <section className="max-w-3xl mx-auto px-6 py-28 text-center">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Coming Soon</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mt-3">Articles On the Way</h2>
          <p className="text-gray-500 mt-5 max-w-lg mx-auto leading-relaxed">
            Our latest articles are on the way — findings, tutorials, and updates from GSAL's
            research will be published here soon. Check back shortly.
          </p>
        </ScrollReveal>
      </section>

      {/* Contribute CTA */}
      <section className="bg-gray-50 border-t border-gray-100 py-16 text-center">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Contribute</span>
          <h3 className="text-3xl font-black text-gray-900 mt-3">Want to Write a Post?</h3>
          <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm leading-relaxed">
            GSAL team members and collaborators are welcome to share research summaries,
            tutorials, or field reports.
          </p>
          <a href="mailto:adeel.ahmad@uog.edu.pk"
            className="inline-flex items-center gap-2 mt-7 px-7 py-3.5 bg-forest-900 hover:bg-forest-800 text-white font-bold rounded-full transition-all text-sm uppercase tracking-wide">
            Submit a Post <ArrowRight size={14} />
          </a>
        </ScrollReveal>
      </section>
    </div>
  )
}