const fs = require("fs");
const countries = JSON.parse(
  fs.readFileSync("./countries.json", { encoding: "utf-8" })
);

const countriesPerRegion = countries.reduce((accumulator, country) => {
  const region = country.region;
  const subregion = country.subregion;
  if (!subregion) {
    return accumulator;
  }
  if (!accumulator[region]) {
    accumulator[region] = {};
  }
  accumulator[region][subregion] = (accumulator[region][subregion] || 0) + 1;
  return accumulator;
}, []);

console.log(countriesPerRegion);
