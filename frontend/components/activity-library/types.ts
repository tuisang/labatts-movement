export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface VideoCardData {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  duration: string;
  difficulty: Difficulty;
  ageGroup: string;
  coach: string;
  views: string;
}

export const videoLibraryData: VideoCardData[] = [
  {
    id: "explosive-vertical-power",
    title: "Explosive Vertical Power",
    description:
      "Master the mechanics of high-impact vertical jumps with specialized plyometric drills.",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDA7TkZYFW36MLa8t75pCAm0ZErLzD47sgAxP3k-tGL6mukrHFDcfOBm6bf9ae-Nv0DBK71KVerXF5RboCuuJJw3zHeNsnTkiOZMo05OD7m6eltdEVABHs0QfMbgYNRx9SX494vt2kKHZZM8lfsrOLRQgoRaQtdN-UI5aE2_bu7J2AT8-m7oxDEfdIpkGWpHkF9Lp04_AyOOHpJk7PJusnYCXuZZjMFcsc0pRAY5DoH2UEdwkFW3AW",
    duration: "12:45",
    difficulty: "Intermediate",
    ageGroup: "Ages 12+",
    coach: "Coach Marcus",
    views: "12k Views",
  },
  {
    id: "balance-coordination-games",
    title: "Balance & Coordination Games",
    description:
      "Engaging school-ready activities focused on fundamental movement patterns.",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDA7TkZYFW36MLa8t75pCAm0ZErLzD47sgAxP3k-tGL6mukrHFDcfOBm6bf9ae-Nv0DBK71KVerXF5RboCuuJJw3zHeNsnTkiOZMo05OD7m6eltdEVABHs0QfMbgYNRx9SX494vt2kKHZZM8lfsrOLRQgoRaQtdN-UI5aE2_bu7J2AT8-m7oxDEfdIpkGWpHkF9Lp04_AyOOHpJk7PJusnYCXuZZjMFcsc0pRAY5DoH2UEdwkFW3AW",
    duration: "08:20",
    difficulty: "Beginner",
    ageGroup: "Ages 5-8",
    coach: "Coach Sarah",
    views: "4.5k Views",
  },
  {
    id: "elite-agility-patterns",
    title: "Elite Agility Patterns",
    description:
      "High-velocity lateral movement drills and reaction-based agility training.",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDA7TkZYFW36MLa8t75pCAm0ZErLzD47sgAxP3k-tGL6mukrHFDcfOBm6bf9ae-Nv0DBK71KVerXF5RboCuuJJw3zHeNsnTkiOZMo05OD7m6eltdEVABHs0QfMbgYNRx9SX494vt2kKHZZM8lfsrOLRQgoRaQtdN-UI5aE2_bu7J2AT8-m7oxDEfdIpkGWpHkF9Lp04_AyOOHpJk7PJusnYCXuZZjMFcsc0pRAY5DoH2UEdwkFW3AW",
    duration: "15:10",
    difficulty: "Advanced",
    ageGroup: "Ages 16+",
    coach: "Coach David",
    views: "22k Views",
  },
  {
    id: "close-control-dribbling",
    title: "Close-Control Dribbling",
    description:
      "Focus on ball manipulation, body positioning, and micro-touches to beat defenders.",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDA7TkZYFW36MLa8t75pCAm0ZErLzD47sgAxP3k-tGL6mukrHFDcfOBm6bf9ae-Nv0DBK71KVerXF5RboCuuJJw3zHeNsnTkiOZMo05OD7m6eltdEVABHs0QfMbgYNRx9SX494vt2kKHZZM8lfsrOLRQgoRaQtdN-UI5aE2_bu7J2AT8-m7oxDEfdIpkGWpHkF9Lp04_AyOOHpJk7PJusnYCXuZZjMFcsc0pRAY5DoH2UEdwkFW3AW",
    duration: "10:05",
    difficulty: "Intermediate",
    ageGroup: "Ages 10+",
    coach: "Coach Elena",
    views: "8.9k Views",
  },
  {
    id: "active-classroom-breaks",
    title: "Active Classroom Breaks",
    description:
      "Short, high-engagement movement breaks designed to boost focus and classroom energy.",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDA7TkZYFW36MLa8t75pCAm0ZErLzD47sgAxP3k-tGL6mukrHFDcfOBm6bf9ae-Nv0DBK71KVerXF5RboCuuJJw3zHeNsnTkiOZMo05OD7m6eltdEVABHs0QfMbgYNRx9SX494vt2kKHZZM8lfsrOLRQgoRaQtdN-UI5aE2_bu7J2AT8-m7oxDEfdIpkGWpHkF9Lp04_AyOOHpJk7PJusnYCXuZZjMFcsc0pRAY5DoH2UEdwkFW3AW",
    duration: "06:45",
    difficulty: "Beginner",
    ageGroup: "Ages 4-7",
    coach: "Coach Sam",
    views: "3.1k Views",
  },
  {
    id: "sprint-mechanics-starts",
    title: "Sprint Mechanics & Starts",
    description:
      "Breakdown of elite acceleration techniques, from block clearance to peak velocity transitions.",
    thumbnailUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDA7TkZYFW36MLa8t75pCAm0ZErLzD47sgAxP3k-tGL6mukrHFDcfOBm6bf9ae-Nv0DBK71KVerXF5RboCuuJJw3zHeNsnTkiOZMo05OD7m6eltdEVABHs0QfMbgYNRx9SX494vt2kKHZZM8lfsrOLRQgoRaQtdN-UI5aE2_bu7J2AT8-m7oxDEfdIpkGWpHkF9Lp04_AyOOHpJk7PJusnYCXuZZjMFcsc0pRAY5DoH2UEdwkFW3AW",
    duration: "18:30",
    difficulty: "Advanced",
    ageGroup: "Ages 16+",
    coach: "Coach Andre",
    views: "31k Views",
  },
];

export const difficultyBadgeClasses: Record<Difficulty, string> = {
  Beginner: "bg-tertiary",
  Intermediate: "bg-primary",
  Advanced: "bg-error",
};
