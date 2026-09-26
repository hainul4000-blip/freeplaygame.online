import { Sparkles, ShieldCheck, Clock, TrendingUp } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-8 sm:pt-20 sm:pb-12">
      <div className="cyber-grid-bg" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon-purple/40 bg-cyber-surface/60 px-4 py-2 animate-fadeInUp">
            <Sparkles className="h-4 w-4 text-neon-gold" />
            <span className="font-mono text-xs text-white/80">12 GAMES ACTIVE - DAILY CODES VERIFIED</span>
          </div>

          <h2
            className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl animate-fadeInUp"
            style={{ animationDelay: '0.1s' }}
          >
            Unlock <span className="text-glow-purple text-neon-purple">VIP Gaming Rewards</span>
            <br className="hidden sm:block" />
            <span className="text-glow-cyan text-neon-cyan">Every Single Day</span>
          </h2>

          <p
            className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg animate-fadeInUp"
            style={{ animationDelay: '0.2s' }}
          >
            Daily promo codes, VIP strategy guides, and downloadable reward passes for the hottest
            sweepstakes games. Claim your free credits before they expire.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fadeInUp"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex items-center gap-2 rounded-xl border border-cyber-border bg-cyber-surface/50 px-4 py-2">
              <ShieldCheck className="h-5 w-5 text-neon-cyan" />
              <span className="text-sm text-white/70">Verified Codes</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-cyber-border bg-cyber-surface/50 px-4 py-2">
              <Clock className="h-5 w-5 text-neon-gold" />
              <span className="text-sm text-white/70">Updated Daily</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-cyber-border bg-cyber-surface/50 px-4 py-2">
              <TrendingUp className="h-5 w-5 text-neon-purple" />
              <span className="text-sm text-white/70">12 Games Supported</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
