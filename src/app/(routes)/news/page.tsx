import background from "/public/assets/crew/background-crew-desktop.jpg";
import Container from "@/app/components/Container";
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
      className="text-white h-screen"
    >
      <Container
        classes={{
          container: "flex justify-between p-5 w-full overflow-hidden  pt-40",
        }}
        size="md"
      >
        <div className="flex flex-col gap-4 w-96">
          <NewsList />
        </div>
      </Container>
    </section>
  );
}
