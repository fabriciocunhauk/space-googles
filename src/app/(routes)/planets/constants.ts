import type { PlanetData } from "./types";

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

export const FALLBACK_PLANET_DATA: Partial<Record<PlanetName, PlanetData>> = {
  moon: {
    name: "Moon",
    tagline: "Earth's natural satellite",
    picture: "/assets/planets/moon.webp",
    description:
      "See our planet as you've never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you're there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
    distanceFromSun: "384,400 km",
    yearLength: "27.3",
    numberOfMoons: 0,
  },
  europa: {
    name: "Europa",
    tagline: "One of Jupiter's moons",
    picture: "/assets/planets/europa.webp",
    description:
      "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover's dream. With an icy surface, it's perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
    distanceFromSun: "628,300,000 km",
    yearLength: "3.5",
    numberOfMoons: 0,
  },
  titan: {
    name: "Titan",
    tagline: "Saturn's largest moon",
    picture: "/assets/planets/titan.webp",
    description:
      "The only moon known to have a dense atmosphere, and the only object in space, other than Earth, where clear evidence of stable bodies of surface liquid has been found. Titan is a holiday for adventurers.",
    distanceFromSun: "1,400,000,000 km",
    yearLength: "15.9",
    numberOfMoons: 0,
  },
  pluto: {
    name: "Pluto",
    tagline: "The beloved dwarf planet",
    picture: "/assets/planets/pluto.webp",
    description:
      "Pluto is a complex world with mountains, valleys, plains, craters, and apparently even glaciers. It was long considered our ninth planet, but is now classified as a dwarf planet. It remains a fan favorite and a mysterious destination in the Kuiper Belt.",
    distanceFromSun: "5.9 billion km",
    yearLength: "248 years",
    numberOfMoons: 5,
  },
};
