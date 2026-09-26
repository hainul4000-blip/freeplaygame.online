import type { Game } from '@/types';
import { GAMES } from '@/data/games';
import { GameCard } from './GameCard';

interface GameGridProps {
  onClaim: (game: Game) => void;
}

export function GameGrid({ onClaim }: GameGridProps) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Available <span className="text-neon-cyan text-glow-cyan">Reward Games</span>
          </h2>
          <p className="mt-1 text-sm text-white/50">Select a game below to claim your daily VIP rewards</p>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-green-400/30 bg-green-400/5 px-3 py-1.5 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
          </span>
          <span className="font-mono text-xs text-green-400">12 GAMES ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {GAMES.map((game, index) => (
          <GameCard key={game.id} game={game} onClaim={onClaim} index={index} />
        ))}
      </div>
    </section>
  );
}
