import background from "/public/assets/crew/background-crew-desktop.jpg";
import NewsList from "@/app/components/NewsList";

export default async function News() {
  return (
    <section
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex justify-center text-white h-screen pt-52"
    >
      <NewsList />
    </section>
  );
}
