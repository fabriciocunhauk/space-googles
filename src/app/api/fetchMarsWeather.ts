/**
 * Returns Mars weather data.
 *
 * NOTE: The NASA InSight lander was retired on December 21, 2022.
 * The original API (mars.nasa.gov/rss/api) consistently hangs or returns
 * empty data, making it a major performance bottleneck. We return the last
 * known reliable readings as historical data to avoid blocking the page.
 */
export const fetchMarsWeather = async () => {
  // Last known InSight readings (Sol 1166, April 2022)
  return {
    sol: "1166 (Final)",
    temp: -55,
    pressure: 731,
    season: "Northern Summer",
    isHistorical: true,
  };
};
