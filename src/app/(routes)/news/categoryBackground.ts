export type NewsCategory =
  | "iss-crew"
  | "launch-rockets"
  | "mars"
  | "moon"
  | "outer-planets"
  | "icy-moons"
  | "commercial-spaceflight"
  | "solar-system";

export type CategoryBackground = {
  title: string;
  body: string[];
  cta: { label: string; href: string };
};

export const CATEGORY_BACKGROUND: Record<NewsCategory, CategoryBackground> = {
  "iss-crew": {
    title: "The ISS & Life in Orbit",
    body: [
      "The International Space Station has been continuously staffed since November 2000, making it the longest-running human outpost off Earth. It orbits roughly 400km up, circling the planet every 90 minutes at about 28,000 km/h — meaning the crew sees a sunrise or sunset every 45 minutes.",
      "Crew members typically rotate every 5-6 months, arriving and departing on Soyuz or Crew Dragon spacecraft. Their days are tightly scheduled around scientific experiments in microgravity, station maintenance, and roughly 2.5 hours of mandatory daily exercise to counteract the bone and muscle loss that comes from living without gravity.",
    ],
    cta: { label: "Track the ISS Crew Live", href: "/crew" },
  },
  "launch-rockets": {
    title: "How Orbital Launches Work",
    body: [
      "Getting to orbit isn't just about going up — a rocket has to accelerate sideways to roughly 28,000 km/h to avoid falling back down, which is why launches burn most of their fuel gaining horizontal speed rather than altitude. Multi-stage rockets shed empty fuel tanks and engines as they climb, since carrying dead weight into orbit wastes enormous amounts of propellant.",
      "Launch dates slip constantly, and it's rarely the rocket's fault: upper-level wind shear, lightning risk, ships or aircraft straying into the safety zone downrange, and last-minute technical holds during the countdown are all common causes. A 'static fire' — briefly igniting the engines while the rocket stays clamped to the pad — is a standard pre-launch test to catch problems before committing to flight.",
    ],
    cta: { label: "View Upcoming Launches", href: "/launch" },
  },
  mars: {
    title: "Why Mars Matters",
    body: [
      "Mars is the most extensively explored planet after Earth, and the leading candidate in the search for past microbial life, because orbiters and rovers have found clear evidence it once had rivers, lakes, and possibly an ocean billions of years ago. Today its atmosphere is too thin — under 1% of Earth's pressure — for liquid water to survive on the surface.",
      "Current missions like Perseverance are caching rock samples for an eventual return to Earth, while orbiters continue mapping subsurface ice that could one day support a crewed mission. Mars remains a brutal destination for spacecraft: roughly half of all Mars missions ever attempted have failed during launch, cruise, or landing.",
    ],
    cta: { label: "Explore Mars", href: "/planets/mars" },
  },
  moon: {
    title: "The Moon, Then and Now",
    body: [
      "The Moon is the only body beyond Earth humans have physically visited, across six Apollo landings between 1969 and 1972. After decades of mostly robotic exploration, it's now the focus of a renewed international effort — led by NASA's Artemis program — aimed at establishing a longer-term human presence, partly as a stepping stone toward Mars.",
      "Interest has also grown around the Moon's permanently shadowed polar craters, which are cold enough to trap water ice. That ice is a major target for future missions, since it could in theory be split into drinking water, breathable oxygen, and rocket fuel without needing to ship it from Earth.",
    ],
    cta: { label: "Explore the Moon", href: "/planets/moon" },
  },
  "outer-planets": {
    title: "The Gas & Ice Giants",
    body: [
      "Jupiter and Saturn are gas giants built almost entirely from hydrogen and helium with no solid surface to land on; Uranus and Neptune are 'ice giants,' made largely of water, ammonia and methane ices around a small rocky core. All four dwarf the rocky inner planets — Jupiter alone is more massive than every other planet in the solar system combined.",
      "Despite their size, the outer giants are far less explored than Mars, since their distance makes every mission a multi-year journey. Jupiter and Saturn have each had a dedicated orbiter; Uranus and Neptune have only ever been visited once each, by Voyager 2 flybys in the 1980s.",
    ],
    cta: { label: "Explore the Solar System", href: "/planets" },
  },
  "icy-moons": {
    title: "Ocean Worlds",
    body: [
      "Some of the most promising places to look for life aren't planets at all, but icy moons. Europa (Jupiter) and Titan (Saturn) are both thought to hide liquid oceans or lakes — Europa's beneath an icy shell kept warm by tidal flexing from Jupiter's gravity, and Titan's on the surface itself, in the form of liquid methane and ethane rather than water.",
      "Because sunlight is far too weak this far from the Sun to keep water liquid on its own, tidal heating from a giant planet's gravity does the job instead — the same mechanism that drives volcanic activity on Jupiter's moon Io. Dedicated missions are now in progress or planned to study these worlds up close.",
    ],
    cta: { label: "Explore the Solar System", href: "/planets" },
  },
  "commercial-spaceflight": {
    title: "The Rise of Commercial Spaceflight",
    body: [
      "Over the past two decades, private companies have taken over an increasing share of orbital launches once handled exclusively by national space agencies. Reusable rockets — boosters that land themselves and fly again — have been the single biggest driver, cutting launch costs enough to make much more frequent flights economically viable.",
      "This shift has also opened the door to crewed commercial missions, private space stations in development, and a rapidly growing number of satellite constellations providing global internet coverage — a scale of orbital traffic that didn't exist a generation ago.",
    ],
    cta: { label: "View Upcoming Launches", href: "/launch" },
  },
  "solar-system": {
    title: "Mapping Our Solar System",
    body: [
      "Our solar system contains eight planets, five recognized dwarf planets including Pluto, and well over 200 moons, along with countless asteroids and comets left over from its formation roughly 4.6 billion years ago. Every world in it formed from the same swirling disk of gas and dust around the young Sun, which is why terrestrial planets cluster near the Sun and gas giants dominate the outer solar system.",
      "Spacecraft have now visited every planet at least once, but exploration remains wildly uneven — Mars and the Moon have been mapped in exhaustive detail, while Uranus and Neptune have each been seen up close for only a few days total, during single flybys decades ago.",
    ],
    cta: { label: "Explore the Solar System", href: "/planets" },
  },
};

export function classifyCategory(title: string, summary: string): NewsCategory {
  const text = `${title} ${summary}`.toLowerCase();

  if (text.includes("iss") || text.includes("international space station") || text.includes("astronaut") || text.includes("crew")) {
    return "iss-crew";
  }
  if (text.includes("europa") || text.includes("titan") || text.includes("enceladus")) {
    return "icy-moons";
  }
  if (text.includes("mars")) return "mars";
  if (text.includes("moon") || text.includes("lunar") || text.includes("artemis")) return "moon";
  if (text.includes("jupiter") || text.includes("saturn") || text.includes("uranus") || text.includes("neptune")) {
    return "outer-planets";
  }
  if (text.includes("spacex") || text.includes("starship") || text.includes("blue origin") || text.includes("commercial")) {
    return "commercial-spaceflight";
  }
  if (text.includes("launch") || text.includes("rocket") || text.includes("falcon") || text.includes("atlas") || text.includes("ariane")) {
    return "launch-rockets";
  }
  return "solar-system";
}
