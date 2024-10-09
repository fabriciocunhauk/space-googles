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
          container: "flex flex-wrap items-center justify-around w-full h-full",
        }}
      >
        <div className="text-primary">
          <p className="text-secondary text-3xl font-Barlow-Condensed font-light leading-8">
            SO, YOU WANT TO TRAVEL TO
          </p>
          <h1 className="text-9xl font-Bellefair leading-normal">SPACE</h1>
          <p className="text-secondary text-left font-Barlow w-96 leading-6">
            Let’s face it; if you want to go to space, you might as well
            genuinely go to outer space and not hover kind of on the edge of it.
            Well sit back, and relax because we’ll give you a truly out of this
            world experience!
          </p>
        </div>
        <Button href="/planets">EXPLORE</Button>
      </Container>
    </main>
  );
}
