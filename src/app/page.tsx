import { Button } from "./components/Button";
import Container from "./components/Container";
import { fetchMarsWeather } from "./api/fetchMarsWeather";

const NASA_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

const fetchImageOfTheDay = async () => {
  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`
    );
    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Failed to fetch image of the day:", error);
    return "/assets/home/background-home-desktop.jpg";
  }
};

export default async function Home() {
  const imageOfTheDay = await fetchImageOfTheDay();
  const marsWeather = await fetchMarsWeather();

  return (
    <main
      className="relative flex items-center justify-center min-h-screen overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(11, 13, 23, 0.5), rgba(11, 13, 23, 0.5)), url(${imageOfTheDay})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nebula-blue/20 blur-[120px] rounded-full" />
      
      <Container
        classes={{
          container:
            "flex flex-col lg:flex-row items-center justify-between w-full mt-32 sm:mt-0 z-10",
        }}
      >
        <div className="text-center lg:text-left space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="text-nebula-blue text-lg md:text-2xl font-Barlow-Condensed tracking-[4.75px] uppercase">
            SO, YOU WANT TO TRAVEL TO
          </p>

          <h1 className="text-7xl md:text-[150px] font-Bellefair leading-tight text-white text-glow">
            SPACE
          </h1>

          <p className="text-nebula-blue font-Barlow max-w-[450px] text-base md:text-lg leading-relaxed opacity-80">
            The solar system has eight planets: Mercury, Venus, Earth, Mars,
            Jupiter, Saturn, Uranus, and Neptune. There are five officially
            recognized dwarf planets in our solar system: Ceres, Pluto, Haumea,
            Makemake, and Eris.
          </p>
        </div>

        <div className="relative group mt-20 lg:mt-0">
          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-700 blur-xl" />
          
          <div className="relative z-10 bg-white hover:bg-opacity-90 transition-all duration-500 p-12 md:p-20 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_80px_rgba(255,255,255,0.5)]">
            <Button href="/planets" classes={{ link: "text-2xl md:text-3xl font-Bellefair text-black tracking-[2px]" }}>
              EXPLORE
            </Button>
          </div>
        </div>
      </Container>

      {/* Mars Weather Widget */}
      <div className="absolute bottom-10 left-10 hidden md:block animate-in fade-in slide-in-from-left-10 duration-1000 delay-500">
        <div className="glass p-6 rounded-3xl border-l-4 border-accent-gold space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-gold" />
            <h3 className="font-Barlow-Condensed tracking-widest text-xs uppercase text-nebula-blue">Mars Weather Report</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] text-white/50 uppercase">Sol</p>
              <p className="font-Bellefair text-xl">{marsWeather.sol}</p>
            </div>
            <div>
              <p className="text-[10px] text-white/50 uppercase">Temp</p>
              <p className="font-Bellefair text-xl">{marsWeather.temp}°C</p>
            </div>
          </div>
          <p className="text-[10px] text-nebula-blue italic">Season: {marsWeather.season}</p>
        </div>
      </div>
    </main>
  );
}
