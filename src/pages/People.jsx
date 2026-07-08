import { team } from '../data/team'
import TeamCard from '../components/TeamCard'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'
import { ArrowRight } from 'lucide-react'

export default function People() {
  const director   = team.find(m => m.isDirector)
  const volunteers = team.filter(m => !m.isDirector && m.role === 'Volunteer Researcher')
  const interns    = team.filter(m => !m.isDirector && m.isIntern)
  const members    = team.filter(m => !m.isDirector && m.role !== 'Volunteer Researcher' && !m.isIntern && !m.isContributor)
  const contributors = team.filter(m => !m.isDirector && m.isContributor)

  return (
    <div>
      <PageHeader
        label=""
        title="People"
        subtitle="Researchers advancing geospatial knowledge."
      />

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-20">
        {/* Leadership */}
        <section>
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-bold uppercase tracking-widest text-forest-600">Leadership</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            {director && <TeamCard member={director} featured />}
          </ScrollReveal>
        </section>

        {/* Current Team */}
        <section>
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-8">
              <span className="text-sm font-bold uppercase tracking-widest text-forest-600">Current Team</span>
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

        {/* Summer Interns */}
        {interns.length > 0 && (
          <section>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-bold uppercase tracking-widest text-forest-600">Summer Interns</span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {interns.map((m, i) => (
                <ScrollReveal key={m.id} delay={i * 0.07}>
                  <TeamCard member={m} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

        {/* Volunteer Researchers */}
        {volunteers.length > 0 && (
          <section>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-bold uppercase tracking-widest text-forest-600">Volunteer Researchers</span>
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
          {/* Contributors */}
{contributors.length > 0 && (
  <section>
    <ScrollReveal>
      <div className="flex items-center gap-4 mb-8">
        <span className="text-sm font-bold uppercase tracking-widest text-forest-600">Contributors</span>
        <div className="flex-1 h-px bg-gray-100" />
      </div>
    </ScrollReveal>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {contributors.map((m, i) => (
        <ScrollReveal key={m.id} delay={i * 0.07}>
          <TeamCard member={m} />
        </ScrollReveal>
      ))}
    </div>
  </section>
)}

        
      </div>
    </div>
  )
}
