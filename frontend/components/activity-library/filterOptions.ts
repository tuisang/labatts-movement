// Single source of truth for the fixed value sets used by both the public
// filter sidebar and the coach upload form, so uploaded videos always match
// values the filters know how to find.

export const AGE_GROUP_OPTIONS = [
  "Ages 4-7",
  "Ages 5-8",
  "Ages 10+",
  "Ages 12+",
  "Ages 16+",
];

export const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced"] as const;

export const SETTING_OPTIONS = ["Indoor", "Outdoor"] as const;

export const EQUIPMENT_OPTIONS = [
  "Plyo Box",
  "Cones",
  "Agility Ladder",
  "Soccer Ball",
  "Starting Blocks",
  "None",
];
