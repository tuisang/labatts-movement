export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  pricePerDay: number;
  category: string;
  available: boolean;
}

export const equipmentCatalog: EquipmentItem[] = [
  {
    id: "plyo-box-24",
    name: '24" Plyo Box',
    description: "Adjustable-height plyometric box for jump training and step-ups.",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600",
    pricePerDay: 500,
    category: "Plyometrics",
    available: true,
  },
  {
    id: "agility-ladder-set",
    name: "Agility Ladder Set",
    description: "20ft agility ladder with carrying bag for footwork and speed drills.",
    imageUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600",
    pricePerDay: 300,
    category: "Agility",
    available: true,
  },
  {
    id: "weighted-vest-10kg",
    name: "Weighted Vest (10kg)",
    description: "Adjustable weighted vest for resistance training and conditioning.",
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600",
    pricePerDay: 400,
    category: "Strength",
    available: true,
  },
  {
    id: "starting-blocks",
    name: "Starting Blocks",
    description: "Adjustable track starting blocks for sprint training.",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=600",
    pricePerDay: 600,
    category: "Sprinting",
    available: false,
  },
];
