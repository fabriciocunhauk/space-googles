import type { PlanetName } from "./constants";

export type PlanetMission = {
  name: string;
  year: string;
  description: string;
};

export type PlanetContent = {
  name: string;
  tagline: string;
  quickFacts: {
    distanceFromSun: string;
    yearLength: string;
    numberOfMoons: number;
  };
  technicalSpecs: {
    composition: string;
    gravity: string;
    temp: string;
    atmosphere: string;
  };
  overview: string[];
  atmosphereGeology: string;
  explorationHistory: string;
  missions: PlanetMission[];
};

export const PLANET_CONTENT: Record<PlanetName, PlanetContent> = {
  mercury: {
    name: "Mercury",
    tagline: "The swift, scarred innermost world",
    quickFacts: {
      distanceFromSun: "57.9 million km",
      yearLength: "88",
      numberOfMoons: 0,
    },
    technicalSpecs: {
      composition: "Rocky, with an oversized iron core making up roughly 55% of its volume",
      gravity: "3.7 m/s²",
      temp: "-180°C to 430°C",
      atmosphere: "Almost none — a trace exosphere of oxygen, sodium and helium",
    },
    overview: [
      "Mercury is the closest planet to the Sun and the smallest in the solar system, barely larger than Earth's Moon. Named after the fleet-footed Roman messenger god, it earns the title honestly — it completes an orbit in just 88 Earth days, moving faster around the Sun than any other planet. Yet a single day on Mercury, from sunrise to sunrise, lasts roughly 176 Earth days, because its slow three-times-per-two-orbits rotation means the Sun crawls unusually slowly across its sky.",
      "Its surface looks deceptively like the Moon's: a heavily cratered, grey landscape built up over billions of years of impacts with almost nothing to erode or resurface it. But Mercury has its own signature feature the Moon lacks — long, cliff-like ridges called 'rupes' that formed as the planet's iron core cooled and shrank, wrinkling the crust like a drying apple.",
    ],
    atmosphereGeology:
      "With virtually no atmosphere to hold in heat or block radiation, Mercury experiences the most extreme temperature swings of any planet: surface temperatures soar past 430°C in direct sunlight and plunge to -180°C at night or inside permanently shadowed polar craters. Remarkably, those shadowed craters near the poles are cold enough to harbor water ice, confirmed by radar and later by NASA's MESSENGER spacecraft — ice surviving within a stone's throw of the hottest place in the solar system.",
    explorationHistory:
      "Mercury's proximity to the Sun makes it one of the hardest planets to reach — spacecraft need a huge amount of fuel to slow down enough to be captured by its weak gravity rather than swinging past. Only three missions have ever visited: two American and one joint European-Japanese, spaced decades apart, which is why Mercury remains one of the least-explored rocky worlds close to home.",
    missions: [
      { name: "Mariner 10", year: "1974", description: "The first spacecraft to visit Mercury, using a gravity assist off Venus to reach it and mapping about 45% of the surface across three flybys." },
      { name: "MESSENGER", year: "2011", description: "The first spacecraft to orbit Mercury, spending four years mapping its entire surface and confirming water ice in shadowed polar craters." },
      { name: "BepiColombo", year: "2025", description: "A joint ESA/JAXA mission that arrives in Mercury orbit to study its magnetic field, core structure and exosphere in unprecedented detail." },
    ],
  },

  venus: {
    name: "Venus",
    tagline: "Earth's toxic, blistering twin",
    quickFacts: {
      distanceFromSun: "108.2 million km",
      yearLength: "225",
      numberOfMoons: 0,
    },
    technicalSpecs: {
      composition: "Rocky, nearly identical in size and mass to Earth",
      gravity: "8.87 m/s²",
      temp: "~464°C (surface)",
      atmosphere: "Thick — 96.5% carbon dioxide with sulfuric acid clouds",
    },
    overview: [
      "Venus is often called Earth's twin because the two planets are almost the same size and made of similar rocky material — but the resemblance ends there. A runaway greenhouse effect has turned Venus into the hottest planet in the solar system, hotter even than Mercury despite being twice as far from the Sun. Its thick carbon dioxide atmosphere traps heat so effectively that surface temperatures reach around 464°C, hot enough to melt lead.",
      "Venus also rotates backwards compared to most planets, and does so extremely slowly — a single day on Venus (243 Earth days) is longer than its year (225 Earth days). Combined with its retrograde spin, this means the Sun would appear to rise in the west and set in the east, if you could see it at all through the perpetual cloud cover.",
    ],
    atmosphereGeology:
      "The Venusian atmosphere is crushing — surface pressure is about 92 times that of Earth, equivalent to the pressure nearly a kilometer underwater. Dense clouds of sulfuric acid droplets blanket the planet and reflect sunlight so effectively that Venus is the brightest natural object in Earth's night sky after the Moon. Beneath those clouds lies a volcanic landscape of vast lava plains, thousands of volcanoes, and highland regions like Maxwell Montes, the tallest mountain on Venus, higher than Mount Everest.",
    explorationHistory:
      "Venus's crushing pressure and heat have made it one of the most punishing places to land a spacecraft — early Soviet probes were destroyed within hours of touchdown. Even so, it was the first planet any spacecraft ever landed on, and radar mapping missions later pierced its cloud cover to reveal a surface no telescope could ever see directly.",
    missions: [
      { name: "Venera 7", year: "1970", description: "The first spacecraft to transmit data from the surface of another planet, surviving just 23 minutes in the crushing heat and pressure." },
      { name: "Magellan", year: "1990", description: "Used radar to map 98% of the Venusian surface through its opaque clouds, revealing volcanoes, ridges and impact craters in detail." },
      { name: "Akatsuki", year: "2015", description: "A JAXA orbiter currently studying Venus's atmospheric dynamics, including its super-rotating winds that circle the planet in just four Earth days." },
    ],
  },

  earth: {
    name: "Earth",
    tagline: "Our fragile home",
    quickFacts: {
      distanceFromSun: "149.6 million km",
      yearLength: "365.25",
      numberOfMoons: 1,
    },
    technicalSpecs: {
      composition: "Rocky, with an iron-nickel core, silicate mantle and crust",
      gravity: "9.81 m/s²",
      temp: "~15°C (average)",
      atmosphere: "Nitrogen (78%) and oxygen (21%)",
    },
    overview: [
      "Earth is, as far as we know, the only place in the universe where life exists — a fact made possible by a rare combination of circumstances: liquid water covering most of the surface, a magnetic field that shields the atmosphere from solar wind, and an orbit sitting squarely in the Sun's habitable zone. Roughly 71% of the surface is ocean, giving Earth its recognizable blue appearance from space.",
      "Earth's single large Moon is unusually massive relative to its parent planet compared to other moon-planet pairs in the solar system, and it plays an outsized role in Earth's habitability — stabilizing the planet's axial tilt over millions of years, which in turn keeps the climate relatively stable enough for complex life to evolve.",
    ],
    atmosphereGeology:
      "Earth's atmosphere is a thin, life-sustaining layer of mostly nitrogen and oxygen, held in place by gravity and protected from being stripped away by the solar wind thanks to a magnetic field generated deep within the planet's molten iron core. Geologically, Earth is the only planet in the solar system known to have active plate tectonics — its crust is broken into moving plates that recycle rock, build mountain ranges, and drive the carbon cycle that helps regulate long-term climate.",
    explorationHistory:
      "Earth is, naturally, the best-studied planet by an enormous margin, monitored continuously by thousands of satellites tracking weather, climate, ice sheets and vegetation. It's also humanity's launch pad for everything else in this catalogue — every spacecraft that has ever visited another world first had to escape Earth's gravity well.",
    missions: [
      { name: "Apollo 11", year: "1969", description: "The first crewed mission to land humans on another world, launching from Earth and putting Neil Armstrong and Buzz Aldrin on the Moon." },
      { name: "International Space Station", year: "1998", description: "A continuously inhabited orbital laboratory circling Earth roughly every 90 minutes, hosting crews from multiple space agencies since the year 2000." },
    ],
  },

  mars: {
    name: "Mars",
    tagline: "The rust-red frontier",
    quickFacts: {
      distanceFromSun: "227.9 million km",
      yearLength: "687",
      numberOfMoons: 2,
    },
    technicalSpecs: {
      composition: "Rocky, iron-oxide-rich surface (the source of its red color)",
      gravity: "3.72 m/s²",
      temp: "-65°C (average)",
      atmosphere: "Thin — 95% carbon dioxide, under 1% of Earth's surface pressure",
    },
    overview: [
      "Mars is the most Earth-like of the rocky planets in terms of geography, with polar ice caps, seasons, canyons and dust storms that can occasionally engulf the entire planet. Its rust-red color comes from iron oxide — essentially rust — coating its dusty surface. Mars is home to Olympus Mons, the largest volcano in the solar system at roughly three times the height of Mount Everest, and Valles Marineris, a canyon system long enough to stretch across the continental United States.",
      "The planet's two small moons, Phobos and Deimos, are irregularly shaped and thought to be captured asteroids rather than bodies that formed alongside Mars. Phobos orbits so close and fast that it rises and sets twice a day as seen from the Martian surface, and it's slowly spiraling inward — in tens of millions of years it will either crash into Mars or break apart into a ring.",
    ],
    atmosphereGeology:
      "Mars's atmosphere is a hundred times thinner than Earth's, too thin to support liquid water on the surface today — any exposed water instantly boils or freezes. But evidence from rovers and orbiters shows Mars once had rivers, lakes, and possibly an ocean billions of years ago, before it lost most of its atmosphere to space as its magnetic field faded. That ancient wet history is exactly why Mars remains the solar system's leading candidate in the search for evidence of past microbial life.",
    explorationHistory:
      "Mars has been visited by more spacecraft than any planet besides Earth, though it has also destroyed more missions than any other world — roughly half of all Mars missions ever attempted have failed, a track record that's earned it the nickname 'the planet that eats spacecraft.' Despite that, it's now the most thoroughly mapped and roved planet after Earth.",
    missions: [
      { name: "Viking 1", year: "1976", description: "The first spacecraft to successfully land on and operate from the Martian surface, returning the first close-up color images of Mars." },
      { name: "Curiosity", year: "2012", description: "A car-sized rover still active today, confirming ancient lakebeds and organic molecules inside Gale Crater." },
      { name: "Perseverance", year: "2021", description: "Currently caching soil samples for eventual return to Earth while its companion helicopter, Ingenuity, proved powered flight is possible on Mars." },
    ],
  },

  jupiter: {
    name: "Jupiter",
    tagline: "King of the planets",
    quickFacts: {
      distanceFromSun: "778.5 million km",
      yearLength: "4,333",
      numberOfMoons: 95,
    },
    technicalSpecs: {
      composition: "Gas giant — mostly hydrogen and helium around a dense core",
      gravity: "24.79 m/s²",
      temp: "-110°C (cloud tops)",
      atmosphere: "Hydrogen and helium, banded by fast-moving storm systems",
    },
    overview: [
      "Jupiter is by far the largest planet in the solar system — more than twice as massive as every other planet combined — and its gravity has shaped the solar system's architecture, flinging comets and asteroids out of the inner planets' path over billions of years. It rotates faster than any other planet, completing a full spin in under ten hours, which whips its atmosphere into the distinctive colored bands visible through even a small telescope.",
      "Its most famous feature, the Great Red Spot, is a storm larger than Earth that has raged for at least 190 years and possibly much longer. Jupiter also hosts the four large Galilean moons — Io, Europa, Ganymede and Callisto — discovered by Galileo Galilei in 1610, a discovery that helped prove not everything in the sky orbits Earth.",
    ],
    atmosphereGeology:
      "Beneath its swirling cloud tops, Jupiter has no solid surface to speak of — the atmosphere gradually compresses into a scalding ocean of liquid metallic hydrogen thousands of kilometers deep, surrounding a dense core of rock, ice and metal several times Earth's mass. That metallic hydrogen layer, an exotic state of matter created only under extreme pressure, generates the strongest magnetic field of any planet in the solar system, trapping intense radiation belts that make close exploration hazardous for spacecraft electronics.",
    explorationHistory:
      "Jupiter's enormous gravity has made it a favorite waypoint for missions heading to the outer solar system, which use a close flyby to gain a 'gravity assist' — a free speed boost — on their way to Saturn, Uranus, Neptune and beyond. It's also been the destination of two dedicated orbiter missions built to survive its brutal radiation environment.",
    missions: [
      { name: "Pioneer 10", year: "1973", description: "The first spacecraft to fly past Jupiter and the first to travel through the asteroid belt successfully." },
      { name: "Galileo", year: "1995", description: "The first mission to orbit Jupiter, and the first to drop a probe directly into a gas giant's atmosphere." },
      { name: "Juno", year: "2016", description: "An ongoing polar-orbiting mission mapping Jupiter's deep interior, magnetic field and the structure of the Great Red Spot." },
    ],
  },

  saturn: {
    name: "Saturn",
    tagline: "Lord of the rings",
    quickFacts: {
      distanceFromSun: "1.43 billion km",
      yearLength: "10,759",
      numberOfMoons: 146,
    },
    technicalSpecs: {
      composition: "Gas giant, the least dense planet in the solar system",
      gravity: "10.44 m/s²",
      temp: "-140°C (cloud tops)",
      atmosphere: "Hydrogen and helium",
    },
    overview: [
      "Saturn is instantly recognizable for its spectacular ring system — billions of chunks of ice and rock, ranging from dust grains to house-sized boulders, spread across a disk that spans hundreds of thousands of kilometers but is remarkably thin, in places barely 10 meters thick. Every gas giant has rings, but none rival Saturn's in brightness or scale.",
      "Saturn is so light for its size that it's the only planet in the solar system less dense than water — if you could find an ocean big enough, Saturn would float. With well over 140 confirmed moons, it hosts one of the most varied moon systems anywhere, including Titan, the only moon in the solar system with a thick atmosphere, and Enceladus, an icy moon spraying water-ice geysers from a hidden subsurface ocean.",
    ],
    atmosphereGeology:
      "Like Jupiter, Saturn has no solid surface — its hydrogen and helium atmosphere deepens into a layer of liquid metallic hydrogen surrounding a rock-and-ice core roughly Earth-sized but many times more massive. Powerful winds near the equator reach up to 1,800 km/h, and a persistent hexagonal jet-stream pattern swirls at its north pole, a six-sided storm system unlike anything else observed on another planet.",
    explorationHistory:
      "Saturn's distance and the complexity of navigating its rings made it a far harder target than Jupiter, reached by only a handful of missions. The most transformative of these carried a probe that achieved something no spacecraft had done before or since — landing on a moon in the outer solar system.",
    missions: [
      { name: "Pioneer 11", year: "1979", description: "The first spacecraft to fly past Saturn, discovering its F-ring and confirming a hazardous radiation belt around the planet." },
      { name: "Cassini-Huygens", year: "1997", description: "A 13-year orbital mission that deployed the Huygens probe to land on Titan and discovered active geysers on Enceladus." },
    ],
  },

  uranus: {
    name: "Uranus",
    tagline: "The tilted ice giant",
    quickFacts: {
      distanceFromSun: "2.87 billion km",
      yearLength: "30,687",
      numberOfMoons: 28,
    },
    technicalSpecs: {
      composition: "Ice giant — water, ammonia and methane ices over a rocky core",
      gravity: "8.69 m/s²",
      temp: "-195°C",
      atmosphere: "Hydrogen, helium and methane (gives its blue-green tint)",
    },
    overview: [
      "Uranus is the solar system's most unusual planet in one striking respect: it rotates almost completely on its side, tilted at 98 degrees relative to its orbit, likely the result of a colossal collision early in its history. This sideways spin means each pole gets roughly 42 years of continuous sunlight followed by 42 years of darkness as the planet slowly circles the Sun.",
      "Classified as an 'ice giant' rather than a gas giant like Jupiter and Saturn, Uranus is made largely of water, ammonia and methane ices surrounding a small rocky core. Methane in its upper atmosphere absorbs red light and reflects blue-green light back into space, giving Uranus its pale cyan color — a subtler, colder-looking counterpart to Neptune's deeper blue.",
    ],
    atmosphereGeology:
      "Uranus holds the record for the coldest planetary atmosphere in the solar system, dipping to around -224°C in its upper layers despite not being the most distant planet from the Sun — a puzzle scientists still don't fully understand, since Uranus radiates almost no internal heat compared to the other giant planets. It has a faint ring system, discovered in 1977 when it briefly blocked the light of a background star, and a set of 13 known rings far dimmer than Saturn's.",
    explorationHistory:
      "Uranus's extreme distance and dim brightness meant it wasn't even recognized as a planet until 1781, and to date it has been visited by only a single spacecraft on a brief flyby — no dedicated orbiter mission has ever been sent, making it one of the least-understood planets up close.",
    missions: [
      { name: "Voyager 2", year: "1986", description: "The only spacecraft ever to visit Uranus, discovering 10 new moons and confirming its extreme axial tilt and faint ring system during a single flyby." },
    ],
  },

  neptune: {
    name: "Neptune",
    tagline: "The windswept outer giant",
    quickFacts: {
      distanceFromSun: "4.5 billion km",
      yearLength: "60,190",
      numberOfMoons: 16,
    },
    technicalSpecs: {
      composition: "Ice giant, similar composition to Uranus",
      gravity: "11.15 m/s²",
      temp: "-201°C",
      atmosphere: "Hydrogen, helium and methane",
    },
    overview: [
      "Neptune is the most distant planet in the solar system, orbiting the Sun at over four and a half billion kilometers — so far that sunlight takes about four hours to reach it, compared to roughly eight minutes for Earth. Despite that distance, Neptune is dynamically the stormiest planet known, with the fastest winds recorded anywhere in the solar system, reaching speeds of up to 2,100 km/h.",
      "Neptune's deep blue color, even more vivid than Uranus's, comes from methane in its atmosphere absorbing red light. Its largest moon, Triton, is unusual among large moons for orbiting backwards relative to Neptune's rotation, strong evidence that Triton wasn't born alongside Neptune but was instead captured from the Kuiper Belt — the same distant region of icy bodies that includes Pluto.",
    ],
    atmosphereGeology:
      "Neptune's atmosphere shows dark storm systems similar to Jupiter's Great Red Spot, including a feature nicknamed the Great Dark Spot observed by Voyager 2 in 1989 that had vanished by the time the Hubble Space Telescope looked again just a few years later — a reminder that these giant storms can form and dissipate on surprisingly short timescales. Beneath the visible atmosphere lies a hot, dense fluid mantle of water, ammonia and methane surrounding a rocky core roughly Earth's size.",
    explorationHistory:
      "Neptune was the first planet discovered through mathematical prediction rather than direct observation — astronomers calculated its position from irregularities in Uranus's orbit before ever pointing a telescope at it. Like Uranus, it has been visited by only one spacecraft, making a single flyby that remains our only close-up look at the planet to date.",
    missions: [
      { name: "Voyager 2", year: "1989", description: "The only spacecraft ever to visit Neptune, capturing the first close-up images of the Great Dark Spot and discovering geysers on its moon Triton." },
    ],
  },

  pluto: {
    name: "Pluto",
    tagline: "The beloved dwarf planet",
    quickFacts: {
      distanceFromSun: "5.9 billion km",
      yearLength: "90,560",
      numberOfMoons: 5,
    },
    technicalSpecs: {
      composition: "Rock and ice, a dwarf planet in the Kuiper Belt",
      gravity: "0.62 m/s²",
      temp: "-229°C",
      atmosphere: "Thin nitrogen and methane, which freezes and thickens as Pluto's orbit varies",
    },
    overview: [
      "Pluto was considered the ninth planet from its discovery in 1930 until 2006, when the International Astronomical Union reclassified it as a dwarf planet after the discovery of similarly sized objects in the same distant region, the Kuiper Belt. Despite the reclassification, Pluto remains one of the most beloved and scientifically interesting bodies in the outer solar system.",
      "Pluto's largest moon, Charon, is so massive relative to Pluto — about half its diameter — that the two don't quite orbit a point inside Pluto at all; they orbit a shared center of gravity in the space between them, making the pair function more like a double dwarf-planet system than a planet-and-moon.",
    ],
    atmosphereGeology:
      "NASA's New Horizons flyby in 2015 revealed a far more active world than expected: towering water-ice mountains, nitrogen-ice glaciers, and a striking heart-shaped plain called Sputnik Planitia, a basin of frozen nitrogen so large it's thought to gently reshape Pluto's rotation over time. Pluto's thin atmosphere isn't constant — as it moves away from the Sun on its 248-year, sharply elliptical orbit, its atmosphere gradually freezes onto the surface, only to sublimate back into a haze as it swings closer again.",
    explorationHistory:
      "Because it sits nearly six billion kilometers away, Pluto was the last of the traditionally recognized planets to be visited by a spacecraft, and remains explored by just a single, brief flyby — every image and measurement we have of its surface came from a few intense days in July 2015.",
    missions: [
      { name: "New Horizons", year: "2015", description: "The first and only spacecraft to visit Pluto, revealing its heart-shaped nitrogen glacier and mountain ranges made of water ice during a fast flyby after a nine-year journey." },
    ],
  },

  moon: {
    name: "Moon",
    tagline: "Earth's constant companion",
    quickFacts: {
      distanceFromSun: "384,400 km from Earth",
      yearLength: "27.3",
      numberOfMoons: 0,
    },
    technicalSpecs: {
      composition: "Rocky, with a small iron core, likely formed from a giant impact with early Earth",
      gravity: "1.62 m/s²",
      temp: "-173°C to 127°C",
      atmosphere: "Essentially none — a trace exosphere too thin to breathe or retain heat",
    },
    overview: [
      "The Moon is Earth's only natural satellite and the fifth-largest moon in the solar system, unusually large relative to its parent planet compared to most other moon-planet pairs. The leading theory for its origin is the giant-impact hypothesis: roughly 4.5 billion years ago, a Mars-sized body collided with the young Earth, and debris from that collision coalesced into the Moon.",
      "The Moon is tidally locked to Earth, meaning the same face — the 'near side' — always points toward us, while the 'far side' remained completely unseen by human eyes until Soviet spacecraft photographed it in 1959. Its gravitational pull is also responsible for Earth's ocean tides and has gradually slowed Earth's rotation over billions of years, lengthening our day.",
    ],
    atmosphereGeology:
      "With no meaningful atmosphere to trap heat or block radiation, the Moon experiences brutal temperature swings between scorching lunar day and freezing lunar night. Its surface is dominated by two terrains: bright, heavily cratered highlands, and darker, smoother 'maria' — ancient basaltic lava plains that early astronomers mistook for seas. Permanently shadowed craters near the lunar poles are cold enough to trap water ice, a resource future missions hope to use for fuel and life support.",
    explorationHistory:
      "The Moon is the only body beyond Earth that humans have physically visited, and the target of the most intense period of space exploration in history during the 1960s and '70s. After decades of quieter robotic exploration, it's now the focus of a renewed international push to establish a longer-term human presence.",
    missions: [
      { name: "Apollo 11", year: "1969", description: "The first crewed Moon landing, putting Neil Armstrong and Buzz Aldrin on the lunar surface for humanity's first steps on another world." },
      { name: "Artemis Program", year: "2022", description: "NASA's ongoing effort to return astronauts to the Moon, beginning with the uncrewed Artemis I test flight and building toward a sustained lunar presence." },
    ],
  },

  europa: {
    name: "Europa",
    tagline: "The ocean moon of Jupiter",
    quickFacts: {
      distanceFromSun: "778.5 million km (orbits Jupiter every 3.5 days)",
      yearLength: "3.5",
      numberOfMoons: 0,
    },
    technicalSpecs: {
      composition: "Icy shell over a suspected saltwater ocean, with a rocky mantle and iron core",
      gravity: "1.31 m/s²",
      temp: "-160°C (average surface)",
      atmosphere: "Extremely thin oxygen atmosphere generated by radiation splitting surface ice",
    },
    overview: [
      "Europa is the smallest of Jupiter's four large Galilean moons, but scientifically it's one of the most important objects in the solar system: beneath its smooth, icy crust, scientists believe there is a global saltwater ocean containing roughly twice as much liquid water as all of Earth's oceans combined. That hidden ocean is kept liquid not by sunlight — far too weak at Jupiter's distance — but by tidal heating, as Jupiter's immense gravity flexes and warms Europa's interior with every orbit.",
      "Europa's surface is famously smooth by planetary standards, crisscrossed with long reddish-brown cracks called lineae, thought to form as the icy shell shifts over the ocean below. Very few impact craters are visible, suggesting the surface is geologically young and constantly renewed — strong indirect evidence of an active, possibly life-friendly, environment underneath.",
    ],
    atmosphereGeology:
      "Because Europa orbits deep inside Jupiter's radiation belts, its icy surface is constantly bombarded by charged particles, which split water molecules in the ice and produce a razor-thin oxygen atmosphere — far too sparse to breathe, but a tantalizing sign of ongoing chemistry. Some observations suggest plumes of water vapor occasionally erupt through cracks in the ice, similar to the geysers seen on Saturn's moon Enceladus, potentially offering a way to sample the subsurface ocean without ever drilling through the ice.",
    explorationHistory:
      "No spacecraft has ever landed on or orbited Europa directly; everything known about its hidden ocean comes from flybys and gravity measurements taken by missions built primarily to study Jupiter itself. That's beginning to change with a mission purpose-built to study Europa's habitability up close.",
    missions: [
      { name: "Galileo", year: "1995", description: "During its Jupiter orbital mission, Galileo's flybys of Europa provided the first strong evidence of a subsurface saltwater ocean." },
      { name: "Europa Clipper", year: "2024", description: "A NASA mission launched to perform dozens of close flybys of Europa, studying its ice shell, ocean and potential habitability in detail." },
    ],
  },

  titan: {
    name: "Titan",
    tagline: "Saturn's atmospheric moon",
    quickFacts: {
      distanceFromSun: "1.43 billion km (orbits Saturn every 15.9 days)",
      yearLength: "15.9",
      numberOfMoons: 0,
    },
    technicalSpecs: {
      composition: "Rock and ice core beneath a thick nitrogen atmosphere and hydrocarbon surface lakes",
      gravity: "1.35 m/s²",
      temp: "-179°C",
      atmosphere: "Thick nitrogen (95%) with methane — the only moon with a substantial atmosphere",
    },
    overview: [
      "Titan is Saturn's largest moon and the second-largest moon in the solar system, bigger than the planet Mercury. It's the only moon known to have a dense atmosphere, so thick that surface pressure is about 1.5 times that of Earth — thick enough that a person could theoretically glide with strapped-on wings in Titan's low gravity and dense air, if they could survive the cold.",
      "Even more remarkably, Titan is the only place in the solar system besides Earth known to have stable liquid on its surface — but instead of water, Titan's lakes, rivers and seas are made of liquid methane and ethane, kept liquid by temperatures around -179°C. This gives Titan an entire weather cycle, complete with hydrocarbon rain, rivers carving channels, and seasonal cloud formation, all running on chemistry entirely different from Earth's water cycle.",
    ],
    atmosphereGeology:
      "Beneath its hazy orange nitrogen atmosphere, Titan's surface is surprisingly Earth-like in shape if not in substance: dune fields of hydrocarbon-coated ice grains, river deltas, and the largest liquid sea, Kraken Mare, that's bigger than the Caspian Sea. Scientists also suspect Titan hides a subsurface liquid-water ocean beneath its icy crust, making it, alongside Europa and Enceladus, one of the leading candidates in the search for life beyond Earth.",
    explorationHistory:
      "Titan's thick atmosphere long hid its surface from telescopes, and it took a purpose-built descent probe to finally see through the haze — achieving the only landing ever made on a moon in the outer solar system. A follow-up mission is now being developed to explore Titan's surface directly using an entirely new mode of travel.",
    missions: [
      { name: "Cassini-Huygens", year: "2004", description: "The Huygens probe descended through Titan's atmosphere and landed in 2005, sending back the first images from the surface of an outer solar system moon." },
      { name: "Dragonfly", year: "2028", description: "A planned NASA rotorcraft mission that will fly between multiple sites on Titan, studying its prebiotic chemistry and potential habitability." },
    ],
  },
};
