import { useState } from 'react';
import { Check, Copy, Github, Globe, Linkedin, Mail, MapPin, Send, type LucideIcon } from 'lucide-react';
import { useContent } from '../../store/ContentProvider';
import { Reveal } from '../fx/Reveal';
import { ContactForm } from '../forms/ContactForm';

interface Channel {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  action?: () => void;
  actionLabel?: string;
  disabled?: boolean;
}

export function Contact() {
  const { content } = useContent();
  const { settings } = content;
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(settings.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  const channels: Channel[] = [
    {
      label: 'Email',
      value: settings.email,
      href: `mailto:${settings.email}`,
      icon: Mail,
      action: copyEmail,
      actionLabel: copied ? 'Copied' : 'Copy',
    },
    {
      label: 'GitHub',
      value: settings.github.replace('https://', ''),
      href: settings.github,
      icon: Github,
    },
    ...(settings.linkedin
      ? [
          {
            label: 'LinkedIn',
            value: settings.linkedin.replace('https://www.', '').replace('https://', ''),
            href: settings.linkedin,
            icon: Linkedin,
          },
        ]
      : [
          {
            label: 'LinkedIn',
            value: 'Profile link coming soon',
            href: '',
            icon: Linkedin,
            disabled: true,
          },
        ]),
    {
      label: 'Portfolio',
      value: settings.portfolio.replace('https://', ''),
      href: settings.portfolio,
      icon: Globe,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/[0.05] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/[0.12] blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-electric-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-grid-faint bg-[length:80px_80px] opacity-20 mask-fade-b" />
      </div>

      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-gradient-to-r from-violet-400 to-electric-400" aria-hidden />
                06 · Contact
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
                Have an idea? <span className="text-gradient">Let's build it together.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-slate-400">
                I'm open to AI engineering roles and a limited set of freelance projects. If you are working on something
                where retrieval, models or data quality matter, I'd like to hear about it.
              </p>
            </Reveal>

            <div className="mt-9 space-y-2.5">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={channel.label}
                    className={
                      channel.disabled
                        ? 'flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] px-3.5 py-2.5 opacity-60'
                        : 'group relative flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2.5 transition hover:border-white/[0.15] hover:bg-white/[0.045]'
                    }
                  >
                    {channel.disabled ? null : (
                      <a
                        href={channel.href}
                        target={channel.href.startsWith('http') ? '_blank' : undefined}
                        rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="absolute inset-0 rounded-xl focus-visible:outline-offset-4"
                        aria-label={`${channel.label}: ${channel.value}`}
                      />
                    )}
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition group-hover:border-violet-400/30 group-hover:text-white">
                      <Icon className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500">
                        {channel.label}
                      </span>
                      <span className="block truncate text-[13px] text-slate-200">{channel.value}</span>
                    </span>
                    {channel.disabled ? (
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-600">Soon</span>
                    ) : channel.action ? (
                      <button
                        type="button"
                        onClick={channel.action}
                        className="relative z-10 inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1 text-[10px] text-slate-300 transition hover:border-white/25 hover:text-white"
                        aria-label={copied ? 'Email copied' : 'Copy email address'}
                      >
                        {copied ? <Check className="h-3 w-3 text-emerald-400" aria-hidden /> : <Copy className="h-3 w-3" aria-hidden />}
                        {channel.actionLabel}
                      </button>
                    ) : (
                      <Send className="h-3.5 w-3.5 text-slate-600 transition group-hover:text-violet-300" aria-hidden />
                    )}
                  </div>
                );
              })}
            </div>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.06] pt-6 text-[11.5px] text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-electric-300" aria-hidden />
                  {settings.location} · IST (UTC+5:30)
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
                  {settings.availability}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
