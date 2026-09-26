import { useEffect, useState } from 'react';
import { X, Trophy } from 'lucide-react';
import { generateFakeUser, generateGameName } from '@/data/games';

interface ToastData {
  user: string;
  game: string;
  secondsAgo: number;
}

export function SocialProofToast() {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const showToast = () => {
      const data: ToastData = {
        user: generateFakeUser(),
        game: generateGameName(),
        secondsAgo: Math.floor(Math.random() * 15) + 3,
      };
      setToast(data);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 5000);

      // Schedule next toast at random interval 8-15s
      const nextDelay = Math.floor(Math.random() * 7000) + 8000;
      timeoutId = setTimeout(showToast, nextDelay);
    };

    // Initial delay
    timeoutId = setTimeout(showToast, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-30 max-w-xs transition-all duration-500 ${
        visible ? 'animate-slideInLeft' : 'animate-slideOutLeft'
      }`}
    >
      <div className="flex items-center gap-3 rounded-xl border border-neon-purple/30 bg-cyber-surface/95 p-3 shadow-2xl backdrop-blur-md">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan">
          <Trophy className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-white">
            <span className="font-bold text-neon-cyan">{toast.user}</span> just unlocked
          </p>
          <p className="truncate text-xs text-white/70">
            <span className="font-bold text-neon-gold">{toast.game}</span> VIP Code
          </p>
          <p className="font-mono text-[10px] text-white/40">- {toast.secondsAgo}s ago</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 text-white/30 transition-colors hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
