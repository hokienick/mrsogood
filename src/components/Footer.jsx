'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ink text-chalk py-14 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-chalk/10">
          <Link href="/" className="display text-2xl text-chalk">
            mr.<span className="text-coral">so</span>good
          </Link>
          <div className="flex flex-wrap gap-6">
            {[['Work', '/work'], ['Pricing', '/pricing'], ['Get a Mockup', '/#contact']].map(([label, href]) => (
              <Link key={label} href={href} className="nav-link font-body text-base text-chalk/65 hover:text-chalk transition-colors cursor-pointer">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <p className="font-body text-base text-chalk/70 mt-6">© {new Date().getFullYear()} Mr. So Good. All rights reserved.</p>
      </div>
    </footer>
  )
}
