export type GameTag =
  | 'Most Popular'
  | 'Hot Rewards'
  | 'High Conversion'
  | 'Daily Update'
  | 'Verified'
  | 'Exclusive'
  | 'Instant Access'
  | 'Trending'
  | 'Bonus Added'
  | 'VIP Pass'
  | 'Active Code'
  | 'New Bonus';

export interface Game {
  id: string;
  name: string;
  tag: GameTag;
  description: string;
  icon: string;
  image: string;
  activeCodes: number;
}

export type RewardType = 'credits' | 'booster';

export interface RewardOption {
  id: string;
  type: RewardType;
  label: string;
  icon: string;
  description: string;
  value: string;
}

export type ModalStep = 'personalize' | 'reward' | 'terminal' | 'reveal' | 'verify';
