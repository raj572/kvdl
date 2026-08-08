
export const galleryImages = [
  // Completed Projects
  // KVDL-Anantshilp
  ...Array.from({ length: 7 }, (_, i) => ({
    src: `/images/Completed Projects/KVDL-Anantshilp/${i + 1}.webp`,
    description: "KVDL Anantshilp",
    category: "Completed"
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    src: `/images/Completed Projects/KVDL-Anantshilp/fp-${i + 1}.webp`,
    description: "KVDL Anantshilp - Floor Plan",
    category: "Completed"
  })),

  // KVDL-Anantsrishti
  ...[3, 4, 6, 7, 9, 10, 11, 12, 13, 14, 16, 17].map(n => ({
    src: `/images/Completed Projects/KVDL-Anantsrishti/${n}.webp`,
    description: "KVDL Anantsrishti",
    category: "Completed"
  })),
  ...[1, 2].map(n => ({
    src: `/images/Completed Projects/KVDL-Anantsrishti/fp${n}.webp`,
    description: "KVDL Anantsrishti - Floor Plan",
    category: "Completed"
  })),

  // KVDL-Anantvaibhav
  ...Array.from({ length: 7 }, (_, i) => ({
    src: `/images/Completed Projects/KVDL-Anantvaibhav/${i + 1}.webp`,
    description: "KVDL Anantvaibhav",
    category: "Completed"
  })),

  // KVDL-Dhruv Project
  { src: "/images/Completed Projects/KVDL-Dhruv Project/1.webp", description: "KVDL Dhruv Project", category: "Completed" },
  ...[4, 5, 6, 7, 8].map(n => ({
    src: `/images/Completed Projects/KVDL-Dhruv Project/${n}.webp`,
    description: "KVDL Dhruv Project",
    category: "Completed"
  })),
  { src: "/images/Completed Projects/KVDL-Dhruv Project/fp6.webp", description: "KVDL Dhruv Project - Floor Plan", category: "Completed" },

  // KVDL-The Prestige Avenue
  { src: "/images/Completed Projects/KVDL-The Prestige Avenue/1.webp", description: "KVDL The Prestige Avenue", category: "Completed" },
  ...Array.from({ length: 8 }, (_, i) => ({
    src: `/images/Completed Projects/KVDL-The Prestige Avenue/${i + 2}.webp`,
    description: "KVDL The Prestige Avenue",
    category: "Completed"
  })),
  { src: "/images/Completed Projects/KVDL-The Prestige Avenue/fp-1.webp", description: "KVDL The Prestige Avenue - Floor Plan", category: "Completed" },

  // KVDL-WhiteField
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(n => ({
    src: `/images/Completed Projects/KVDL-WhiteField/${n}.webp`,
    description: "KVDL WhiteField",
    category: "Completed"
  })),
  { src: "/images/Completed Projects/KVDL-WhiteField/3718 Salehittal Sus_BIRDS-R.jpg.webp", description: "KVDL WhiteField - Aerial View", category: "Completed" },
  { src: "/images/Completed Projects/KVDL-WhiteField/Club House.jpg.webp", description: "KVDL WhiteField - Club House", category: "Completed" },
  ...Array.from({ length: 8 }, (_, i) => ({
    src: `/images/Completed Projects/KVDL-WhiteField/fp-${i + 1}.webp`,
    description: "KVDL WhiteField - Floor Plan",
    category: "Completed"
  })),


];
