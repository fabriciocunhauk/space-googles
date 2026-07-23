export const PLANET_LIST = [
  "earth",
  "mars",
  "mercury",
  "venus",
  "saturn",
  "uranus",
  "jupiter",
  "neptune",
  "pluto",
  "moon",
  "europa",
  "titan",
] as const;

export type PlanetName = (typeof PLANET_LIST)[number];

export const PLANET_IMAGES: Record<PlanetName, string> = {
  earth: "/assets/planets/earth.webp",
  mars: "/assets/planets/mars.webp",
  mercury: "/assets/planets/mercury.webp",
  venus: "/assets/planets/venus.webp",
  saturn: "/assets/planets/saturn.webp",
  uranus: "/assets/planets/uranus.webp",
  jupiter: "/assets/planets/jupiter.webp",
  neptune: "/assets/planets/neptune.webp",
  pluto: "/assets/planets/pluto.webp",
  moon: "/assets/planets/moon.webp",
  europa: "/assets/planets/europa.webp",
  titan: "/assets/planets/titan.webp",
};
