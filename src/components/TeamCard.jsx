import { Mail, Phone} from 'lucide-react'

function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GithubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function Avatar({ photo, name, position, zoom, className = '' }) {
  const initials = name.split(' ').filter(w => w.length > 2).slice(-2).map(w => w[0]).join('')
  return (
    <div className={`relative overflow-hidden rounded-full bg-forest-800 ${className}`}>
      <img
        src={photo} alt={name}
        className="w-full h-full object-cover"
        style={{
          objectPosition: position || 'center',
          transform: zoom ? `scale(${zoom})` : 'none',
        }}
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
      />
      <div
        className="absolute inset-0 items-center justify-center text-white font-black text-xl bg-forest-800 hidden"
        aria-hidden
      >
        {initials}
      </div>
    </div>
  )
}

export default function TeamCard({ member, featured = false }) {
  if (featured) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-48 bg-forest-50 flex items-center justify-center p-8">
          <Avatar photo={member.photo} name={member.name} position={member.photoPosition} className="w-28 h-28 md:w-32 md:h-32" />
        </div>
        <div className="flex-1 p-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-forest-600 bg-forest-50 px-3 py-1 rounded-full mb-3">
            Lab Director
          </span>
          <h3 className="text-2xl font-bold text-gray-900">
            <a href="https://adeelpu.github.io/" target="_blank" rel="noopener noreferrer" className="hover:text-forest-600 transition-colors">
              {member.name}
            </a>
          </h3>
          {member.title && <p className="text-gray-500 text-xs font-normal mt-1">{member.title}</p>}
          <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-xl">{member.bio}</p>
          <div className="flex gap-2 mt-5">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-forest-600 hover:text-forest-700 hover:bg-forest-50 transition-all"
                aria-label="LinkedIn">
                <LinkedInIcon size={15} />
              </a>
            )}
            
            
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-forest-600 hover:text-forest-700 hover:bg-forest-50 transition-all"
                aria-label="GitHub">
                <GithubIcon size={15} />
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-forest-600 hover:text-forest-700 hover:bg-forest-50 transition-all"
                aria-label="Email">
                <Mail size={15} />
              </a>
            )}
            {member.phone && (
              <a href={`tel:${member.phone}`}
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-forest-600 hover:text-forest-700 hover:bg-forest-50 transition-all"
                aria-label="Phone">
                <Phone size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <Avatar photo={member.photo} name={member.name} position={member.photoPosition} className="w-20 h-20 mx-auto" />
      <div className="mt-4 text-center flex-1">
        <h3 className="font-bold text-gray-900 text-base leading-snug">{member.name}</h3>
        <p className="text-gray-500 text-xs font-normal mt-1">{member.role}</p>
        <p className="text-gray-400 text-xs mt-2 leading-relaxed">{member.bio}</p>
      </div>
      <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-forest-500 hover:text-forest-600 hover:bg-forest-50 transition-all"
            aria-label="LinkedIn">
            <LinkedInIcon size={13} />
          </a>
        )}
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-forest-500 hover:text-forest-600 hover:bg-forest-50 transition-all"
            aria-label="GitHub">
            <GithubIcon size={13} />
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-forest-500 hover:text-forest-600 hover:bg-forest-50 transition-all"
            aria-label="Email">
            <Mail size={13} />
          </a>
        )}
        {member.phone && (
          <a href={`tel:${member.phone}`}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-forest-500 hover:text-forest-600 hover:bg-forest-50 transition-all"
            aria-label="Phone">
            <Phone size={13} />
          </a>
        )}
      </div>
    </div>
  )
}