import Button from "./components/Button";
import Container from "./components/Container";

const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

const getImageOfTheDay = async () => {
  const imageOfTheDay = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`
  )
    .then((response) => response.json())
    .then((data) => data.url);

  return imageOfTheDay;
};

export default async function Home() {
  const imageOfTheDay = await getImageOfTheDay();

  return (
    <main
      className="h-full"
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
            "flex flex-wrap items-center justify-between w-full h-full",
        }}
      >
        <div className="text-primary">
          <p className="text-secondary text-3xl font-Barlow-Condensed font-light leading-8">
            SO, YOU WANT TO TRAVEL TO
          </p>

          <h1 className="text-9xl font-Bellefair leading-normal">SPACE</h1>

          <p className="text-secondary text-left font-Barlow w-[500px]">
            The solar system has eight planets: Mercury, Venus, Earth, Mars,
            Jupiter, Saturn, Uranus, and Neptune. There are five officially
            recognized dwarf planets in our solar system: Ceres, Pluto, Haumea,
            Makemake, and Eris.
          </p>
        </div>
        <Button href="/planets">EXPLORE</Button>
      </Container>
    </main>
  );
}
