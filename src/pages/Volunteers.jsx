import { team } from '../data/team'
import TeamCard from '../components/TeamCard'
import ScrollReveal from '../components/ScrollReveal'
import { PageHeader } from './Research'

export default function Volunteers() {
  const volunteers = team.filter(m => m.isVolunteer)

  return (
    <div className="pt-[6rem] md:pt-[8rem]">
      <PageHeader
        label="GSAL Team"
        title="Volunteer Researchers"
        subtitle="Volunteers contributing to GSAL's research and outreach."
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {volunteers.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {volunteers.map((m, i) => (
              <ScrollReveal key={m.id} delay={i * 0.07}>
                <TeamCard member={m} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No volunteer researchers yet.</p>
        )}
      </div>
    </div>
  )
}