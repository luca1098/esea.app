export type Event = {
  from: number;
  to: number;
  id: string;
  boatId: string;
  skipperId: string;
  serviceSlug: string;
  clienteId: string;
  people?: number;
  note?: number;
};
