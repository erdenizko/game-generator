export interface SlotItem {
    id: string;
    name: string;
    imageKey: string;
    probability: number;
    revenue?: number;
    minimumCount: number;
    diagonalPrize: boolean;
  }