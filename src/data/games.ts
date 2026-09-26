import type { Game, RewardOption } from '@/types';

export const GAMES: Game[] = [
  { id: 'fire-kirin', name: 'Fire Kirin', tag: 'Most Popular', description: 'Unlock daily VIP codes for Fire Kirin sweepstakes. Free credits, boosters, and exclusive fish hunting rewards.', icon: 'fish', image: 'https://i.postimg.cc/P5HRMsq6/fire-kirin.png', activeCodes: 127 },
  { id: 'orion-stars', name: 'Orion Stars', tag: 'Hot Rewards', description: 'Claim Orion Stars promo codes with instant credit drops and VIP casino reward passes updated every 24 hours.', icon: 'star', image: 'https://i.postimg.cc/tCWcPC9M/orion-stars.png', activeCodes: 94 },
  { id: 'juwa-777', name: 'Juwa 777', tag: 'High Conversion', description: 'Juwa 777 reward passes with daily bonus codes. High-yield credits and exclusive spin multipliers.', icon: 'dice', image: 'https://i.postimg.cc/65nPR5Bb/juwa-777.png', activeCodes: 156 },
  { id: 'game-vault', name: 'Game Vault', tag: 'Daily Update', description: 'Game Vault daily promo codes refreshed every 12 hours. Free credit passes and VIP access tokens.', icon: 'vault', image: 'https://i.postimg.cc/K8bH5SYp/game-vault.png', activeCodes: 82 },
  { id: 'golden-dragon', name: 'Golden Dragon', tag: 'Verified', description: 'Verified Golden Dragon sweepstakes codes with guaranteed reward drops and exclusive golden VIP passes.', icon: 'dragon', image: 'https://i.postimg.cc/pLv6BbdS/golden-dragon.png', activeCodes: 63 },
  { id: 'ultra-monster', name: 'Ultra Monster', tag: 'Exclusive', description: 'Exclusive Ultra Monster reward codes. Limited daily VIP passes with high-value credit bundles.', icon: 'monster', image: 'https://i.postimg.cc/3JmqpJ3P/ultra-monster.png', activeCodes: 71 },
  { id: 'vblink', name: 'Vblink', tag: 'Instant Access', description: 'Vblink instant-access promo codes with immediate credit delivery and daily VIP booster rewards.', icon: 'bolt', image: 'https://i.postimg.cc/CLk2DLw3/vblink.png', activeCodes: 109 },
  { id: 'panda-master', name: 'Panda Master', tag: 'Trending', description: 'Panda Master trending reward codes. Daily free credits, spin bonuses, and exclusive VIP panda passes.', icon: 'panda', image: 'https://i.postimg.cc/VLnhMLz2/panda-master.png', activeCodes: 88 },
  { id: 'cash-machine', name: 'Cash Machine', tag: 'Bonus Added', description: 'Cash Machine sweepstakes codes with bonus rewards added daily. Free credit passes and multipliers.', icon: 'cash', image: 'https://i.postimg.cc/J4ZFJ41w/cash-machine.png', activeCodes: 45 },
  { id: 'milky-ways', name: 'Milky Ways', tag: 'VIP Pass', description: 'Milky Ways VIP reward passes with exclusive galaxy-tier codes and daily credit boosters.', icon: 'galaxy', image: 'https://i.postimg.cc/MKVLRKzr/milky-ways.png', activeCodes: 52 },
  { id: 'gameroom', name: 'Gameroom', tag: 'Active Code', description: 'Gameroom active promo codes with real-time reward verification and daily VIP credit drops.', icon: 'gamepad', image: 'https://i.postimg.cc/htn50WGy/gameroom.png', activeCodes: 67 },
  { id: 'casino-night', name: 'Casino Night', tag: 'New Bonus', description: 'Casino Night newly added bonus codes. Fresh daily rewards with exclusive VIP night-owl passes.', icon: 'casino', image: 'https://i.postimg.cc/BQHzDQqf/casino-night.png', activeCodes: 38 },
];

export const REWARD_OPTIONS: RewardOption[] = [
  {
    id: 'credits-1000',
    type: 'credits',
    label: '1,000 Free Credits Pass',
    icon: 'gift',
    description: 'Instantly redeemable credit bundle for your in-game account. No deposit required.',
    value: '1,000 Credits',
  },
  {
    id: 'vip-booster',
    type: 'booster',
    label: 'VIP Daily Booster',
    icon: 'zap',
    description: 'Exclusive VIP booster that multiplies your daily rewards for 24 hours. Limited availability.',
    value: 'VIP Booster x2',
  },
];

const FIRST_NAMES = ['Dave', 'Sarah', 'Mike', 'Ash', 'Jenny', 'Carl', 'Lisa', 'Tom', 'Ricky', 'Nina', 'Jake', 'Emma', 'Ryan', 'Luna', 'Devin', 'Kate', 'Max', 'Eve', 'Leo', 'Mia'];
const SUFFIXES = ['92', '77', '_X', '101', '_pro', '420', '88', '_gg', '23', '_vip', '007', '_yt', '99', '_live', '45', '_tk'];

export function generateFakeUser(): string {
  const name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
  return `${name}${suffix}`;
}

export function generateCodePrefix(gameId: string): string {
  const prefixMap: Record<string, string> = {
    'fire-kirin': 'FK',
    'orion-stars': 'OS',
    'juwa-777': 'JW',
    'game-vault': 'GV',
    'golden-dragon': 'GD',
    'ultra-monster': 'UM',
    'vblink': 'VB',
    'panda-master': 'PM',
    'cash-machine': 'CM',
    'milky-ways': 'MW',
    'gameroom': 'GR',
    'casino-night': 'CN',
  };
  const prefix = prefixMap[gameId] || 'XX';
  const year = new Date().getFullYear().toString().slice(-2);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${year}-${random}`;
}

export function generateGameName(): string {
  return GAMES[Math.floor(Math.random() * GAMES.length)].name;
}
