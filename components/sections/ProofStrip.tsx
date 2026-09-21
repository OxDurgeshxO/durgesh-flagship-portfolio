import React from 'react'
import Link from 'next/link'
import { FolderGit2, Code2, Globe, Github, FileDown, Mail, ArrowUpRight } from 'lucide-react'
import { OWNER } from '@/lib/data'

interface ProofItem {
  icon: typeof FolderGit2
  label: string
  value: string
  href?: string
  external?: boolean
}

const PROOF_ITEMS: ProofItem[] = [
  {
    icon: FolderGit2,
    label: 'Shipped Projects',
    value: '12+ Flagship & OSS',
    href: '#projects',
  },
  {
    icon: Code2,
    label: 'Main Technologies',
    value: 'Next.js &middot; TS &middot; PyTorch',
  },
  {
    icon: Globe,
    label: 'Live Deployments',
    value: '5 Verified Production',
    href: '#featured-projects',
  },
  {
    icon: Github,
    label: 'GitHub Profile',
    value: '@OxDurgeshxO',
    href: OWNER.github,
    external: true,
  },
  {
    icon: FileDown,
    label: 'Resume Download',
    value: 'Verified ATS & PDF',
    href: '/resume.pdf',
    external: true,
  },
  {
    icon: Mail,
    label: 'Contact Method',
    value: 'Direct Email & Form',
    href: '#contact',
  },
]

export default function ProofStrip() {
  return (
    <section aria-label="Professional Proof & Quick Signals" className="relative z-20 -mt-8 sm:-mt-12 px-4 sm:px-6 max-w-7xl mx-auto mb-16">
      <div className="glass rounded-2xl border border-white/10 p-4 sm:p-6 shadow-2xl shadow-black/40 backdrop-blur-xl bg-[#0c0c14]/85">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {PROOF_ITEMS.map((item, idx) => {
            const Icon = item.icon
            const content = (
              <div className="flex flex-col gap-1.5 pt-3 sm:pt-0 sm:px-3 first:px-0">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-mono tracking-wider uppercase">
                  <Icon className="size-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                <div className="text-white text-xs sm:text-sm font-semibold tracking-tight flex items-center gap-1 group">
                  <span dangerouslySetInnerHTML={{ __html: item.value }} />
                  {item.href && (
                    <ArrowUpRight className="size-3 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  )}
                </div>
              </div>
            )

            if (!item.href) {
              return <div key={idx}>{content}</div>
            }

            if (item.external) {
              return (
                <a
                  key={idx}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  download={item.href.endsWith('.pdf') ? 'Durgesh_Dutt_Sinha_Resume.pdf' : undefined}
                  className="block hover:opacity-85 transition-opacity focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg outline-none"
                >
                  {content}
                </a>
              )
            }

            return (
              <a
                key={idx}
                href={item.href}
                className="block hover:opacity-85 transition-opacity focus-visible:ring-2 focus-visible:ring-purple-400 rounded-lg outline-none"
              >
                {content}
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}