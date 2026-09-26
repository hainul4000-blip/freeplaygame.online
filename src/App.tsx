import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { GameGrid } from '@/components/GameGrid';
import { RewardModal } from '@/components/RewardModal';
import { SocialProofToast } from '@/components/SocialProofToast';
import { Footer } from '@/components/Footer';
import type { Game } from '@/types';

function App() {
  const [activeGame, setActiveGame] = useState<Game | null>(null);

  const handleClaim = (game: Game) => {
    setActiveGame(game);
  };

  const handleCloseModal = () => {
    setActiveGame(null);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <GameGrid onClaim={handleClaim} />
      </main>
      <Footer />

      <SocialProofToast />

      {activeGame && <RewardModal game={activeGame} onClose={handleCloseModal} />}
    </div>
  );
}

export default App;
