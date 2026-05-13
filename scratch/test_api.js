
async function test() {
  const planetName = "earth";
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const res = await fetch(
    `https://planets-17f2.onrender.com/planets/getPlanet?name=${planetName}`,
    requestOptions
  );
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

test();
