const NASA_KEY = "DEMO_KEY";

async function test() {
  const fetch = (await import('node-fetch')).default;
  
  console.log("Testing NEO...");
  const today = new Date().toISOString().split("T")[0];
  const neoRes = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_KEY}`);
  console.log("NEO Status:", neoRes.status);

  console.log("Testing DONKI...");
  const spaceRes = await fetch(`https://api.nasa.gov/DONKI/FLR?startDate=${today}&api_key=${NASA_KEY}`);
  console.log("DONKI Status:", spaceRes.status);

  console.log("Testing EPIC...");
  const epicRes = await fetch(`https://api.nasa.gov/EPIC/api/natural/images?api_key=${NASA_KEY}`);
  console.log("EPIC Status:", epicRes.status);
  const epicData = await epicRes.json();
  console.log("EPIC Data Length:", epicData.length);
}

test();
