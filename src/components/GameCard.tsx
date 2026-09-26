import type { Game } from '@/types';
import { GAME_ICONS } from './GameIcons';

interface GameCardProps {
  game: Game;
  onClaim: (game: Game) => void;
  index: number;
}

export function GameCard({ game, onClaim, index }: GameCardProps) {
  const Icon = GAME_ICONS[game.id] ?? GAME_ICONS.default;
  const tagColors: Record<string, string> = {
    'Most Popular': 'text-neon-gold border-neon-gold/40 bg-neon-gold/10',
    'Hot Rewards': 'text-red-400 border-red-400/40 bg-red-400/10',
    'High Conversion': 'text-neon-cyan border-neon-cyan/40 bg-neon-cyan/10',
    'Daily Update': 'text-green-400 border-green-400/40 bg-green-400/10',
    'Verified': 'text-blue-400 border-blue-400/40 bg-blue-400/10',
    'Exclusive': 'text-neon-purple border-neon-purple/40 bg-neon-purple/10',
    'Instant Access': 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    'Trending': 'text-pink-400 border-pink-400/40 bg-pink-400/10',
    'Bonus Added': 'text-orange-400 border-orange-400/40 bg-orange-400/10',
    'VIP Pass': 'text-violet-400 border-violet-400/40 bg-violet-400/10',
    'Active Code': 'text-teal-400 border-teal-400/40 bg-teal-400/10',
    'New Bonus': 'text-lime-400 border-lime-400/40 bg-lime-400/10',
  };

  return (
    <div
      className="group card-3d neon-backlight relative rounded-2xl border border-cyber-border bg-gradient-to-b from-cyber-surface/80 to-cyber-deep/80 p-5 animate-fadeInUp"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Status Badge */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-green-400">
            Active Today
          </span>
        </div>
        <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-bold ${tagColors[game.tag] ?? tagColors['Active Code']}`}>
          {game.tag}
        </span>
      </div>

      {/* Game Artwork */}
      <div className="relative mb-4 overflow-hidden rounded-xl border border-cyber-border">
        <img
          src={game.image}
          alt={`${game.name} game artwork`}
          loading="lazy"
          className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-110 sm:h-36"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-deep/90 via-cyber-deep/20 to-transparent" />
        <div className="absolute bottom-2 left-2 flex h-9 w-9 items-center justify-center rounded-lg border border-neon-purple/40 bg-cyber-deep/80 backdrop-blur-sm group-hover:animate-glowPulse">
          <Icon className="h-5 w-5 text-neon-cyan" />
        </div>
      </div>

      {/* Title */}
      <div className="mb-3">
        <h3 className="text-lg font-bold text-white group-hover:text-glow-purple">{game.name}</h3>
        <p className="font-mono text-[10px] text-neon-purple/70">{game.activeCodes} codes available</p>
      </div>

      {/* Description */}
      <p className="mb-5 text-sm leading-relaxed text-white/50">{game.description}</p>

      {/* CTA Button */}
      <button
        onClick={() => onClaim(game)}
        className="btn-glow flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan py-3 font-bold text-white transition-all"
      >
        <i className="fa-solid fa-gift text-sm" />
        Claim Rewards
      </button>
    </div>
  );
}
