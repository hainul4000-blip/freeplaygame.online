import { useState } from 'react';
import { Send, Shield, FileText, Lock } from 'lucide-react';

type LegalModal = 'privacy' | 'terms' | 'dmca' | 'disclaimer' | null;

export function Footer() {
  const [modal, setModal] = useState<LegalModal>(null);

  const legalContent: Record<Exclude<LegalModal, null>, { title: string; body: string }> = {
    privacy: {
      title: 'Privacy Policy',
      body: 'freeplaygame.online respects your privacy. We do not collect personally identifiable information beyond what you voluntarily provide (such as your in-game ID or nickname). We use third-party tracking services (Histats) to collect anonymous traffic statistics. AdBlueMedia verification may collect data as outlined in their respective privacy policy. We do not sell or share your data with unauthorized third parties.',
    },
    terms: {
      title: 'Terms of Service',
      body: 'By accessing freeplaygame.online, you agree to use this platform for entertainment purposes only. All promo codes and rewards are distributed on a first-come, first-served basis and are subject to availability. We reserve the right to modify, suspend, or discontinue any part of the service at any time. Abuse of the reward system may result in restricted access.',
    },
    dmca: {
      title: 'DMCA Notice',
      body: 'freeplaygame.online complies with the Digital Millennium Copyright Act (DMCA). If you believe that any content on this site infringes your copyright, please submit a DMCA notice with: (1) identification of the copyrighted work, (2) identification of the allegedly infringing material, (3) your contact information, and (4) a good faith statement. We will respond to valid notices promptly.',
    },
    disclaimer: {
      title: 'Disclaimer',
      body: 'freeplaygame.online is an independent reward index and is not affiliated with or endorsed by Meta or any third-party game developers. All product names, logos, and brands are property of their respective owners. All rewards and promo codes are provided on an "as is" basis without warranties of any kind. Use of this site is at your own risk.',
    },
  };

  return (
    <>
      <footer className="relative border-t border-cyber-border bg-cyber-deep/60 mt-12">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          {/* Top section */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="font-mono text-sm font-bold text-white">
                  freeplaygame<span className="text-neon-cyan">.online</span>
                </span>
              </div>
              <p className="mt-3 text-sm text-white/50">
                Your daily destination for VIP gaming rewards, promo codes, and strategy guides for top sweepstakes games.
              </p>
            </div>

            {/* Legal links */}
            <div>
              <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-neon-purple/70">Legal</h4>
              <div className="flex flex-col gap-2">
                {(['privacy', 'terms', 'dmca', 'disclaimer'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setModal(key)}
                    className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-neon-cyan"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    {key === 'privacy' && 'Privacy Policy'}
                    {key === 'terms' && 'Terms of Service'}
                    {key === 'dmca' && 'DMCA'}
                    {key === 'disclaimer' && 'Disclaimer'}
                  </button>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <h4 className="mb-3 font-mono text-xs font-bold uppercase tracking-wider text-neon-purple/70">Support</h4>
              <a
                href="https://t.me/RemoteTaskHelp"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple px-4 py-2.5 text-sm font-bold text-white"
              >
                <Send className="h-4 w-4" />
                Telegram Support
              </a>
              <p className="mt-3 font-mono text-[10px] text-white/30">
                Response time: usually within 1 hour
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />

          {/* Compliance statement */}
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-cyber-border bg-cyber-surface/40 p-4">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
            <p className="text-xs leading-relaxed text-white/40">
              freeplaygame.online is an independent reward index and is not affiliated with or
              endorsed by Meta or any third-party game developers. All trademarks and game names
              belong to their respective owners.
            </p>
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p className="font-mono text-xs text-white/30">
              &copy; {new Date().getFullYear()} freeplaygame.online - All rights reserved
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="font-mono text-[10px] text-white/30">All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/70 animate-overlayIn"
          onClick={() => setModal(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl border border-neon-purple/30 bg-gradient-to-b from-cyber-surface to-cyber-deep shadow-2xl animate-modalIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-cyber-border px-5 py-4">
              <h3 className="text-lg font-bold text-white">{legalContent[modal].title}</h3>
              <button
                onClick={() => setModal(null)}
                className="text-white/50 transition-colors hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-5 py-5">
              <p className="text-sm leading-relaxed text-white/60">{legalContent[modal].body}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
