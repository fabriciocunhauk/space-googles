import background from "/public/assets/crew/background-crew-desktop.jpg";
import Container from "@/app/components/Container";
import Card from "@/app/components/Card";

// const crewData = [
//   {
//     id: 1,
//     image: douglas,
//     crew_title: "COMMANDER",
//     name: "DOUGLAS HURLEY",
//     body: "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.",
//   },
//   {
//     id: 2,
//     image: mark,
//     crew_title: "MISSION SPECIALIST",
//     name: "MARK SHUTTLEWORTH",
//     body: "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.",
//   },
//   {
//     id: 3,
//     image: victor,
//     crew_title: "PILOT",
//     name: "VICTOR GLOVER",
//     body: "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer. ",
//   },
//   {
//     id: 4,
//     image: anousheh,
//     crew_title: "FLIGHT ENGINEER",
//     name: "ANOUSHEH ANSARI",
//     body: "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space. ",
//   },
// ];
type PeopleProps = {
  number: number;
  people: { craft: string; name: string }[];
};

type ISSPositionProps = {
  iss_position: { longitude: string; latitude: string };
};

const getData = async () => {
  const dataNumberOfPeopleInSpace: PeopleProps = await fetch(
    "http://api.open-notify.org/astros.json"
  )
    .then((response) => response.json())
    .then((data) => data);

  const dataISScurrentLocation: ISSPositionProps = await fetch(
    "http://api.open-notify.org/iss-now.json"
  )
    .then((response) => response.json())
    .then((data) => data);

  const { iss_position: ISScurrentLocation } = dataISScurrentLocation;

  const { longitude, latitude } = ISScurrentLocation;

  const numberOfPeopleInSpace = dataNumberOfPeopleInSpace.number;
  const people = dataNumberOfPeopleInSpace.people;

  return {
    longitude,
    latitude,
    numberOfPeopleInSpace,
    people,
  };
};

export default async function Crew() {
  const { longitude, latitude, numberOfPeopleInSpace, people } =
    await getData();

  return (
    <section
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="text-white"
    >
      <Container
        className="flex justify-between p-5 w-full overflow-hidden  pt-40"
        size="md"
      >
        <div className="flex flex-col gap-4 w-96">
          <h1 className="text-[20px] font-light text-center lg:text-[28px]">
            02 MEET YOUR CREW
          </h1>
          <div className="flex flex-col gap-4 overflow-y-scroll p-5 h-2/3">
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
        <div className="flex flex-col items-center">
          <h1 className="text-[20px] font-light lg:text-[28px]">
            NUMBER OF PEOPLE IN SPACE
          </h1>

          <span className="text-[250px]">{numberOfPeopleInSpace}</span>
        </div>
      </Container>
    </section>
  );
}
