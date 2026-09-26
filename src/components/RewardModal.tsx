import { useEffect, useState } from 'react';
import { X, User, Gift, Zap, Lock, Terminal, CheckCircle2, Clock, ChevronLeft } from 'lucide-react';
import type { Game, RewardOption, ModalStep } from '@/types';
import { REWARD_OPTIONS, generateCodePrefix } from '@/data/games';

interface RewardModalProps {
  game: Game;
  onClose: () => void;
}

const STEP_FLOW: { id: ModalStep; label: string }[] = [
  { id: 'personalize', label: 'ID' },
  { id: 'reward', label: 'Reward' },
  { id: 'terminal', label: 'Sync' },
  { id: 'reveal', label: 'Code' },
  { id: 'verify', label: 'Unlock' },
];

export function RewardModal({ game, onClose }: RewardModalProps) {
  const [step, setStep] = useState<ModalStep>('personalize');
  const [playerId, setPlayerId] = useState('');
  const [playerIdError, setPlayerIdError] = useState('');
  const [selectedReward, setSelectedReward] = useState<RewardOption | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [terminalDone, setTerminalDone] = useState(false);
  const [countdown, setCountdown] = useState(300);
  const [codePrefix] = useState(() => generateCodePrefix(game.id));
  const [unlocking, setUnlocking] = useState(false);

  const stepIndex = STEP_FLOW.findIndex((s) => s.id === step);

  // Terminal animation
  useEffect(() => {
    if (step !== 'terminal') return;
    setTerminalLines([]);
    setTerminalDone(false);

    const lines = [
      '> Connecting to Official Database...',
      `> Searching active promo pool for User: ${playerId}...`,
      `> Game: ${game.name} | Reward Pool: ${game.activeCodes} codes`,
      '> Validating eligibility...',
      '> Assigning unused code from verified pool...',
      '> SUCCESS: 1 Unused Code Assigned!',
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setTerminalLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setTerminalDone(true);
          setStep('reveal');
        }, 1200);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [step, playerId, game]);

  // Countdown timer
  useEffect(() => {
    if (step !== 'reveal' && step !== 'verify') return;
    setCountdown(300);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) return 300;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleGuestId = () => {
    const guestId = `Guest_${Math.floor(10000 + Math.random() * 90000)}`;
    setPlayerId(guestId);
    setPlayerIdError('');
  };

  const handlePersonalizeNext = () => {
    if (!playerId.trim()) {
      setPlayerIdError('Please enter your In-Game ID or use Guest ID');
      return;
    }
    setStep('reward');
  };

  const handleRewardSelect = (reward: RewardOption) => {
    setSelectedReward(reward);
    setStep('terminal');
  };

  const handleUnlock = () => {
    setUnlocking(true);
    try {
      if (typeof (window as any)._gu === 'function') {
        (window as any)._gu();
      }
    } catch {
      // Locker script handles its own flow
    }
    // Keep the button in a loading state; the locker takes over the UX
  };

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop bg-black/70 animate-overlayIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border border-neon-purple/30 bg-gradient-to-b from-cyber-surface to-cyber-deep shadow-2xl animate-modalIn max-h-[90vh] overflow-y-auto modal-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-cyber-border bg-cyber-surface/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            {stepIndex > 0 && step !== 'terminal' && (
              <button
                onClick={() => setStep(STEP_FLOW[stepIndex - 1].id)}
                className="rounded-lg border border-cyber-border bg-cyber-deep/60 p-1.5 text-white/60 transition-colors hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <h3 className="text-sm font-bold text-white">{game.name} VIP Rewards</h3>
              <p className="font-mono text-[10px] text-neon-purple/70">Step {stepIndex + 1} of {STEP_FLOW.length}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-cyber-border bg-cyber-deep/60 p-1.5 text-white/60 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-5 pt-4">
          <div className="flex items-center justify-between">
            {STEP_FLOW.map((s, i) => (
              <div key={s.id} className="flex flex-1 items-center">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold transition-all ${
                    i <= stepIndex
                      ? 'border-neon-purple bg-neon-purple/20 text-neon-purple'
                      : 'border-cyber-border bg-cyber-deep/60 text-white/30'
                  }`}
                >
                  {i < stepIndex ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
                </div>
                {i < STEP_FLOW.length - 1 && (
                  <div className={`mx-1 h-0.5 flex-1 rounded-full transition-all ${i < stepIndex ? 'progress-gradient' : 'bg-cyber-border'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-1 flex justify-between">
            {STEP_FLOW.map((s) => (
              <span key={s.id} className="font-mono text-[8px] uppercase text-white/40">{s.label}</span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="px-5 py-6">
          {/* Step 1: Personalization */}
          {step === 'personalize' && (
            <div className="animate-fadeInUp">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-neon-cyan/30 bg-neon-cyan/10">
                  <User className="h-7 w-7 text-neon-cyan" />
                </div>
                <h4 className="text-lg font-bold text-white">Enter Your In-Game ID</h4>
                <p className="mt-1 text-sm text-white/50">We'll search the active promo pool for your account</p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={playerId}
                    onChange={(e) => {
                      setPlayerId(e.target.value);
                      setPlayerIdError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handlePersonalizeNext()}
                    placeholder="e.g. Player_12345"
                    autoFocus
                    className="w-full rounded-xl border border-cyber-border bg-cyber-deep/60 px-4 py-3 font-mono text-sm text-white placeholder-white/30 outline-none transition-all focus:border-neon-purple/50 focus:ring-2 focus:ring-neon-purple/20"
                  />
                  {playerIdError && <p className="mt-1.5 text-xs text-red-400">{playerIdError}</p>}
                </div>

                <button
                  onClick={handleGuestId}
                  className="w-full rounded-xl border border-neon-cyan/30 bg-neon-cyan/5 py-2.5 font-mono text-xs text-neon-cyan transition-all hover:bg-neon-cyan/10"
                >
                  Use Guest ID Instead
                </button>

                <button
                  onClick={handlePersonalizeNext}
                  className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan py-3 font-bold text-white"
                >
                  Continue to Rewards
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Reward Choice */}
          {step === 'reward' && (
            <div className="animate-fadeInUp">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-neon-gold/30 bg-neon-gold/10">
                  <Gift className="h-7 w-7 text-neon-gold" />
                </div>
                <h4 className="text-lg font-bold text-white">Choose Your Reward</h4>
                <p className="mt-1 text-sm text-white/50">Select one reward type for {game.name}</p>
              </div>

              <div className="space-y-3">
                {REWARD_OPTIONS.map((reward) => {
                  const Icon = reward.icon === 'gift' ? Gift : Zap;
                  return (
                    <button
                      key={reward.id}
                      onClick={() => handleRewardSelect(reward)}
                      className="group flex w-full items-center gap-4 rounded-xl border border-cyber-border bg-cyber-deep/60 p-4 text-left transition-all hover:border-neon-purple/50 hover:bg-neon-purple/5"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyber-border bg-cyber-surface/60 group-hover:border-neon-purple/40 group-hover:animate-glowPulse">
                        <Icon className="h-6 w-6 text-neon-gold" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-white">{reward.label}</p>
                        <p className="mt-0.5 text-xs text-white/50">{reward.description}</p>
                      </div>
                      <ChevronLeft className="h-5 w-5 rotate-180 text-white/30 group-hover:text-neon-purple" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Terminal Sync */}
          {step === 'terminal' && (
            <div className="animate-fadeInUp">
              <div className="mb-4 flex items-center gap-2">
                <Terminal className="h-5 w-5 text-neon-cyan" />
                <h4 className="text-sm font-bold text-white">Live Terminal Sync</h4>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-xs text-green-400">
                  <span className="h-2 w-2 animate-blink rounded-full bg-green-400" />
                  CONNECTING
                </span>
              </div>

              <div className="terminal-scanlines rounded-xl border border-neon-cyan/20 bg-black/60 p-4 font-mono text-xs leading-relaxed min-h-[200px]">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.startsWith('> SUCCESS')
                        ? 'text-green-400 text-glow-cyan'
                        : line.startsWith('>')
                        ? 'text-neon-cyan/80'
                        : 'text-white/60'
                    }
                  >
                    {line}
                  </div>
                ))}
                <span className="inline-block h-3.5 w-2 animate-blink bg-neon-cyan align-middle" />
              </div>
            </div>
          )}

          {/* Step 4: Partial Code Reveal */}
          {step === 'reveal' && (
            <div className="animate-fadeInUp">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-neon-gold/30 bg-neon-gold/10 animate-glowGold">
                  <CheckCircle2 className="h-7 w-7 text-neon-gold" />
                </div>
                <h4 className="text-lg font-bold text-white">Your Code is Ready!</h4>
                <p className="mt-1 text-sm text-white/50">Code assigned for <span className="text-neon-cyan font-mono">{playerId}</span></p>
              </div>

              {/* Voucher Card */}
              <div className="mb-4 rounded-xl border border-neon-gold/30 bg-gradient-to-b from-neon-gold/5 to-transparent p-5 animate-glowGold">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-neon-gold/70">{game.name} VIP Code</span>
                  <span className="font-mono text-[10px] text-white/40">{selectedReward?.value}</span>
                </div>
                <div className="flex items-center justify-center gap-2 rounded-lg border border-cyber-border bg-black/40 py-4">
                  <span className="font-mono text-xl font-bold tracking-widest text-neon-gold text-glow-gold sm:text-2xl">
                    {codePrefix}-
                  </span>
                  <span className="font-mono text-xl font-bold tracking-widest text-white/30 locked-code sm:text-2xl">
                    XXXX
                  </span>
                  <Lock className="h-5 w-5 text-neon-purple" />
                </div>
              </div>

              {/* Countdown */}
              <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-400/5 py-2.5">
                <Clock className="h-4 w-4 text-red-400" />
                <span className="font-mono text-sm font-bold text-red-400 tabular-nums">
                  Code expires in {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={() => setStep('verify')}
                className="btn-glow-gold flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-gold to-amber-500 py-3 font-bold text-black"
              >
                <Lock className="h-4 w-4" />
                Reveal Final 4 Digits
              </button>
            </div>
          )}

          {/* Step 5: Human Verification */}
          {step === 'verify' && (
            <div className="animate-fadeInUp">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-neon-purple/30 bg-neon-purple/10 animate-glowPulse">
                  <Lock className="h-7 w-7 text-neon-purple" />
                </div>
                <h4 className="text-lg font-bold text-white">Human Verification Required</h4>
                <p className="mt-2 text-sm text-white/60">
                  Complete 1 quick sponsor verification to reveal the final 4 digits & strategy PDF
                </p>
              </div>

              {/* Voucher preview */}
              <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-cyber-border bg-black/40 py-3">
                <span className="font-mono text-lg font-bold tracking-widest text-neon-gold/60">
                  {codePrefix}-
                </span>
                <span className="font-mono text-lg font-bold tracking-widest text-white/20 locked-code">
                  XXXX
                </span>
                <Lock className="h-4 w-4 text-neon-purple/60" />
              </div>

              {/* Countdown */}
              <div className="mb-4 flex items-center justify-center gap-2 rounded-xl border border-red-400/30 bg-red-400/5 py-2">
                <Clock className="h-4 w-4 text-red-400" />
                <span className="font-mono text-xs font-bold text-red-400 tabular-nums">
                  Expires in {minutes}:{seconds.toString().padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={handleUnlock}
                disabled={unlocking}
                className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple py-3.5 font-bold text-white animate-glowPulse disabled:opacity-60"
                style={{ backgroundSize: '200% 100%' }}
              >
                {unlocking ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Opening Verification...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Unlock Final 4 Digits Now
                  </>
                )}
              </button>

              <p className="mt-3 text-center font-mono text-[10px] text-white/30">
                <Shield className="inline h-3 w-3 mr-1" /> Secure verification powered by AdBlueMedia
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Shield({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
