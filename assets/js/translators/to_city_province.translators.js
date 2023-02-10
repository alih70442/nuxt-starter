function to_city_province(cities) {
  for (const city of cities) {
    city.title = `${city.province?.title} - ${city.title}`;
  }
  return cities;
}

export default to_city_province;
