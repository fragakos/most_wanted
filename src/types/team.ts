export type TeamMember = {
  id: string;
  name: string;
  alias: string;
  crime: string[];
  status: string;
  reward: string;
  details: string[];
  lastSeen: string;
  imageUrl: string;
  warning: string;
} | null;
