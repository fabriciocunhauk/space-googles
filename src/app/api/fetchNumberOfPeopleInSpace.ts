type PeopleProps = {
  number: number;
  people: { craft: string; name: string }[];
};

export const fetchNumberOfPeopleInSpace = async () => {
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