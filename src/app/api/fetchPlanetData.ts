export async function fetchPlanetData(planetName: string) {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow",
  };

  const planetInfo = await fetch(
    `https://planets-17f2.onrender.com/planets/getPlanet?name=${planetName}`,
    requestOptions
  )
    .then((res) => res.json())
    .then((data) => data);

  return planetInfo;
}