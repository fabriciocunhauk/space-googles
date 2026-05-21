import { fetchWithTimeout } from "../utils/fetchWithTimeout";

type PeopleProps = {
  number: number;
  people: { craft: string; name: string }[];
};

export const fetchNumberOfPeopleInSpace = async () => {
  try {
    const response = await fetchWithTimeout(
      // Note: open-notify does not reliably support HTTPS — use HTTP for server-side fetches
      "http://api.open-notify.org/astros.json",
      {
        // Cache for 5 minutes — crew rotations happen infrequently
        next: { revalidate: 300 },
      } as RequestInit,
      8000 // 8s timeout — open-notify can be slow
    );

    if (!response.ok) throw new Error(`astros.json responded ${response.status}`);

    const data: PeopleProps = await response.json();

    return {
      numberOfPeopleInSpace: data.number,
      people: data.people,
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