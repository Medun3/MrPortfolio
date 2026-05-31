import { useEffect, useState } from "react"

const sectionLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
]

const SectionDots = () => {
  const [activeHref, setActiveHref] = useState(sectionLinks[0].href)

  useEffect(() => {
    const sections = sectionLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)

    if (!sections.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveHref(`#${visibleEntry.target.id}`)
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleAnchorClick = (event, href) => {
    event.preventDefault()

    const section = document.querySelector(href)
    if (!section) return

    setActiveHref(href)
    section.scrollIntoView({ behavior: "smooth", block: "start" })
    window.history.pushState(null, "", href)
  }

  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-5 mix-blend-difference">
      {sectionLinks.map((link) => {
        const isActive = activeHref === link.href

        return (
          <a
            key={link.href}
            href={link.href}
            onClick={(event) => handleAnchorClick(event, link.href)}
            aria-label={`Go to ${link.label}`}
            aria-current={isActive ? "true" : undefined}
            className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${
              isActive
                ? "scale-125 bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.22)]"
                : "bg-transparent hover:bg-white/70"
            }`}
          ></a>
        )
      })}
    </div>
  )
}

export default SectionDots
