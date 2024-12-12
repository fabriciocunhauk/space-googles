import background from "/public/assets/crew/background-crew-desktop.jpg";
import Container from "@/app/components/Container";
import Card from "@/app/components/Card";
import IssLocationMap from "@/app/components/IssLocationMap";
import { fetchNumberOfPeopleInSpace } from "@/app/api/fetchNumberOfPeopleInSpace";

export default async function Crew() {
  const { numberOfPeopleInSpace, people } = await fetchNumberOfPeopleInSpace();

  return (
    <main
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="flex items-center justify-center text-white lg:h-full"
    >
      <Container
        classes={{
          container:
            "grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-10 w-full pt-48",
        }}
      >
        <IssLocationMap />

        <div className="flex flex-col gap-4 max-h-[700px] overflow-hidden">
          <h1 className="text-4xl font-light text-center md:text-left">
            {numberOfPeopleInSpace} PEOPLE IN SPACE
          </h1>

          <div className="flex flex-col gap-4 overflow-y-scroll px-4">
            {people.map(({ craft, name }) => (
              <Card
                key={name}
                classes={{
                  card: "cursor-pointer bg-opacity-20 hover:bg-opacity-100 text-white hover:text-black hover:scale-105 transition-all duration-300 px-4 w-full",
                }}
              >
                <p>CRAFT: {craft}</p>
                <p>CREW MEMBER: {name}</p>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
