import { PlanType } from '@/core/types/plan';

type ConfigProps = {
  label: string;
};
export const planConfig: Record<PlanType, ConfigProps> = {
  SILVER: {
    label: 'Silver',
  },
  BASE: {
    label: 'Base',
  },
  VIP: {
    label: 'Vip',
  },
};
