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

// NOTE: thumbnailUrl values below are free Unsplash stock photos (not Unsplash+/premium),
// reused from elsewhere in this project since they're already verified to load correctly.
// Swap these for real Labatts Movement footage via Cloudinary as soon as it's available —
// same open item as the Rarewoods Crew photography swap.
export const videoLibraryData: VideoCardData[] = [
  {
    id: "explosive-vertical-power",
    title: "Explosive Vertical Power",
    description:
      "Master the mechanics of high-impact vertical jumps with specialized plyometric drills.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800",
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
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800",
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
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800",
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
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800",
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
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=800",
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
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800",
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
