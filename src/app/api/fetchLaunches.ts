export const fetchLaunches = async () => {
  const response = await fetch(
    "https://api.spacexdata.com/v5/launches/query",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          upcoming: true,
        },
        options: {
          populate: [
            {
              path: "rocket",
              select: {
                name: 1,
              },
            },
            {
              path: "launchpad",
              select: {
                name: 1,
                full_name: 1,
              },
            },
          ],
          sort: {
            date_utc: "asc",
          },
          limit: 20,
        },
      }),
    }
  );
  const data = await response.json();

  return data.docs;
};