import { team } from '../data/team'
import TeamCard from '../components/TeamCard'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'
import { ArrowRight } from 'lucide-react'

export default function People() {
  const director   = team.find(m => m.isDirector)
  const volunteers = team.filter(m => !m.isDirector && m.role === 'Volunteer Researcher')
  const members    = team.filter(m => !m.isDirector && m.role !== 'Volunteer Researcher')

  return (
    <div className="pt-[6rem] md:pt-[8rem]">
      <PageHeader
        label="GSAL Team"
        title="People"
        subtitle="Researchers, and students advancing geospatial knowledge."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">
        {/* Leadership */}
        <section>
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Leadership</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            {director && <TeamCard member={director} featured />}
          </ScrollReveal>
        </section>

        {/* Current Team */}
        <section>
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Current Team</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {members.map((m, i) => (
              <ScrollReveal key={m.id} delay={i * 0.07}>
                <TeamCard member={m} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Volunteer Researchers */}
        {volunteers.length > 0 && (
          <section>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-forest-600">Volunteer Researchers</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {volunteers.map((m, i) => (
                <ScrollReveal key={m.id} delay={i * 0.07}>
                  <TeamCard member={m} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Join us */}
        <ScrollReveal>
          <section className="bg-forest-950 rounded-2xl p-10 md:p-14 text-center">
            <span className="text-xs text-forest-400 font-bold uppercase tracking-widest">Opportunities</span>
            <h3 className="text-3xl md:text-4xl font-black text-white mt-3">Join Our Lab</h3>
            <p className="text-forest-300 mt-4 max-w-xl mx-auto leading-relaxed text-sm">
              We welcome motivated students and researchers interested in GIS, remote sensing,
              GeoAI, and spatial data analytics. Open positions for MS and PhD candidates.
            </p>
            <a href="mailto:adeel.ahmad@uog.edu.pk"
              className="inline-flex items-center gap-2 mt-8 px-8 py-3.5 bg-forest-400 hover:bg-forest-300 text-forest-950 font-bold rounded-full transition-all text-sm uppercase tracking-wide">
              Apply Now <ArrowRight size={14} />
            </a>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}