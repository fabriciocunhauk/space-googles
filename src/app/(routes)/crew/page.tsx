import background from "/public/assets/crew/background-crew-desktop.jpg";
import Container from "@/app/components/Container";
import Card from "@/app/components/Card";
import IssLocationMap from "@/app/components/IssLocationMap";

type PeopleProps = {
  number: number;
  people: { craft: string; name: string }[];
};

const getData = async () => {
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
  const { numberOfPeopleInSpace, people } = await getData();

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
            "flex justify-center md:justify-between flex-wrap p-5 w-full pt-48",
        }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-[20px] font-light lg:text-[28px]">
            NUMBER OF PEOPLE IN SPACE
          </h1>

          <span className="text-[250px]">{numberOfPeopleInSpace}</span>
        </div>
        <div className="flex flex-col gap-4 w-96 h-[700px] overflow-hidden">
          <h1 className="text-[20px] font-light text-center lg:text-[28px]">
            02 MEET YOUR CREW
          </h1>
          <div className="flex flex-col gap-4 overflow-y-scroll">
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

        <div className="w-full space-y-6">
          <h1 className="text-[20px] font-light lg:text-[28px]">
            ISS LOCATION
          </h1>

          <IssLocationMap />
        </div>
      </Container>
    </main>
  );
}
