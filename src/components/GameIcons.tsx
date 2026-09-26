import { Fish, Star, Dices, Vault, Flame, Ghost, Zap, PawPrint, Banknote, Coins, Orbit, Gamepad2, Spade, Gamepad } from 'lucide-react';
import type { ComponentType } from 'react';

export const GAME_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  'fire-kirin': Flame,
  'orion-stars': Star,
  'juwa-777': Dices,
  'game-vault': Vault,
  'golden-dragon': Coins,
  'ultra-monster': Ghost,
  'vblink': Zap,
  'panda-master': PawPrint,
  'cash-machine': Banknote,
  'milky-ways': Orbit,
  'gameroom': Gamepad2,
  'casino-night': Spade,
  default: Gamepad,
};
