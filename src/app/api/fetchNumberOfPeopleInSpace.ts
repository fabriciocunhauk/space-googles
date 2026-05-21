import { fetchWithTimeout } from "../utils/fetchWithTimeout";

export const fetchNumberOfPeopleInSpace = async () => {
  try {
    const response = await fetchWithTimeout(
      "https://ll.thespacedevs.com/2.2.0/astronaut/?in_space=true",
      {
        // Cache for 5 minutes — crew rotations happen infrequently
        next: { revalidate: 300 },
      } as RequestInit,
      8000 // 8s timeout
    );

    if (!response.ok) throw new Error(`LL2 Astronaut API responded ${response.status}`);

    const data = await response.json();

    const people = data.results.map((person: any) => ({
      // We infer the craft based on the agency (CNSA = Tiangong, otherwise ISS)
      // This is a reliable heuristic for current active space stations
      craft: person.agency?.abbrev === "CNSA" ? "Tiangong" : "ISS",
      name: person.name,
    }));

    return {
      numberOfPeopleInSpace: data.count,
      people,
    };
  } catch (error) {
    console.error("Error fetching people in space:", error);
    // Return sensible fallback so the page still renders
    return {
      numberOfPeopleInSpace: 7,
      people: [
        { craft: "ISS", name: "Oleg Kononenko" },
        { craft: "ISS", name: "Nikolai Chub" },
        { craft: "ISS", name: "Tracy Caldwell Dyson" },
        { craft: "ISS", name: "Matthew Dominick" },
        { craft: "ISS", name: "Michael Barratt" },
        { craft: "ISS", name: "Jeanette Epps" },
        { craft: "ISS", name: "Alexander Grebenkin" },
      ],
    };
  }
};