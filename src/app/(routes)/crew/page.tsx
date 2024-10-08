import background from "/public/assets/crew/background-crew-desktop.jpg";
import Container from "@/app/components/Container";
import Card from "@/app/components/Card";
import IssLocationMap from "@/app/components/IssLocationMap";

type PeopleProps = {
  number: number;
  people: { craft: string; name: string }[];
};

const getNumberOfPeopleInSpace = async () => {
  const dataNumberOfPeopleInSpace: PeopleProps = await fetch(
    "http://api.open-notify.org/astros.json"
  )
    .then((response) => response.json())
    .then((data) => data);

  const numberOfPeopleInSpace = dataNumberOfPeopleInSpace.number;
  const people = dataNumberOfPeopleInSpace.people;

  return {
    numberOfPeopleInSpace,
    people,
  };
};

export default async function Crew() {
  const { numberOfPeopleInSpace, people } = await getNumberOfPeopleInSpace();

  return (
    <main
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="text-white min-h-full"
    >
      <Container
        classes={{
          container:
            "grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-10 w-full pt-48",
        }}
      >
        <IssLocationMap />

        <div className="flex flex-col gap-4 h-[700px] overflow-hidden">
          <h1 className="text-4xl font-light text-center md:text-left ">
            {numberOfPeopleInSpace} PEOPLE IN SPACE
          </h1>
          <div className="flex flex-col gap-4 overflow-y-scroll px-4">
            {people.map(({ craft, name }) => {
              return (
                <Card
                  key={name}
                  classes={{
                    card: "cursor-pointer bg-opacity-20 hover:bg-opacity-100 text-white hover:text-black hover:scale-105 transition-all duration-300 px-4",
                  }}
                >
                  <p>CRAFT: {craft}</p>
                  <p>CREW MEMBER: {name}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </main>
  );
}
