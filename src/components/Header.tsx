import { useEffect, useState } from 'react';
import { Zap, Send } from 'lucide-react';

export function Header() {
  const [codeCount, setCodeCount] = useState(1842);
  const [time, setTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      setTime(`${h}:${m}:${s}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-cyber-border/60 bg-cyber-bg/80 backdrop-blur-xl">
      <div className="fixed inset-x-0 top-0 z-40 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan animate-glowPulse">
              <Zap className="h-5 w-5 text-white" fill="white" />
            </div>
            <div>
              <h1 className="font-mono text-sm font-bold tracking-tight text-white sm:text-base">
                freeplaygame<span className="text-neon-cyan">.online</span>
              </h1>
              <p className="hidden font-mono text-[10px] text-neon-purple/80 sm:block">VIP Rewards & Strategy Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden items-center gap-2 rounded-full border border-neon-purple/30 bg-cyber-surface/60 px-4 py-1.5 md:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="font-mono text-xs text-green-400">SYSTEM ONLINE</span>
              <span className="font-mono text-xs text-white/40">{time}</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-neon-gold/30 bg-cyber-surface/60 px-3 py-1.5 sm:px-4">
              <Zap className="h-3.5 w-3.5 text-neon-gold" fill="currentColor" />
              <span className="font-mono text-xs font-bold text-neon-gold tabular-nums sm:text-sm">
                {codeCount.toLocaleString()} <span className="hidden text-glow-gold sm:inline">Codes Unlocked Today</span>
                <span className="sm:hidden">Unlocked</span>
              </span>
            </div>

            <a
              href="https://t.me/RemoteTaskHelp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple px-4 py-2 text-xs font-bold text-white transition-all btn-glow sm:text-sm"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Telegram Support</span>
              <span className="sm:hidden">Help</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
