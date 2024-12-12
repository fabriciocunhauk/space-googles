import { Button } from "./components/Button";
import Container from "./components/Container";

const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

const fetchImageOfTheDay = async () => {
  const response = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`
  );
  const data = await response.json();
  return data.url;
};

export default async function Home() {
  const imageOfTheDay = await fetchImageOfTheDay();

  return (
    <main
      className="flex items-center justify-center h-full"
      style={{
        backgroundImage: `url(${imageOfTheDay})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container
        classes={{
          container:
            "flex flex-col md:flex-row items-center justify-between w-full mt-32 sm:mt-0",
        }}
      >
        <div className="text-center md:text-left">
          <p className="text-gray-300 text-2xl md:text-3xl font-Barlow-Condensed font-light leading-8">
            SO, YOU WANT TO TRAVEL TO
          </p>

          <h1 className="text-6xl md:text-9xl font-Bellefair leading-normal text-white">
            SPACE
          </h1>

          <p className="text-gray-300 font-Barlow max-w-[500px] text-base">
            The solar system has eight planets: Mercury, Venus, Earth, Mars,
            Jupiter, Saturn, Uranus, and Neptune. There are five officially
            recognized dwarf planets in our solar system: Ceres, Pluto, Haumea,
            Makemake, and Eris.
          </p>
        </div>

        <div className="bg-white hover:bg-opacity-5 bg-opacity-0 ease-in-out duration-500 p-10 rounded-full">
          <Button href="/planets" classes={{ link: "text-3xl" }}>
            EXPLORE
          </Button>
        </div>
      </Container>
    </main>
  );
}
