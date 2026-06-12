export default function Marquee({ items, reverse = false, dark = true }) {
  const trackClass = reverse ? 'marquee-track-rev' : 'marquee-track'

  return (
    <div className={`overflow-hidden select-none ${dark ? 'bg-forest-900 border-y border-forest-800' : 'bg-earth-50 border-y border-earth-200'} py-6`}>
      <div className={`${trackClass} flex whitespace-nowrap w-max`}>
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`inline-block shrink-0 px-5 text-4xl md:text-5xl font-black tracking-tight uppercase leading-none ${
              item === '·'
                ? dark ? 'text-forest-400' : 'text-earth-400'
                : dark ? 'text-white'       : 'text-forest-950'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
