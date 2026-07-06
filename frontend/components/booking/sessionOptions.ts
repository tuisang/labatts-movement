export interface SessionOption {
  id: string;
  name: string;
  duration: string;
  price: number;
}

export const sessionOptions: SessionOption[] = [
  { id: "explosive-vertical-power", name: "Explosive Vertical Power", duration: "60 min", price: 2500 },
  { id: "elite-agility-patterns", name: "Elite Agility Patterns", duration: "60 min", price: 2500 },
  { id: "sprint-mechanics-starts", name: "Sprint Mechanics & Starts", duration: "45 min", price: 2000 },
  { id: "balance-coordination", name: "Balance & Coordination (Kids)", duration: "45 min", price: 1500 },
  { id: "custom-consultation", name: "Custom Training Consultation", duration: "30 min", price: 1000 },
];
