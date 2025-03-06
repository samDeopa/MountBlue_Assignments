const fs = require("fs");
const countries = JSON.parse(
  fs.readFileSync("./countries.json", { encoding: "utf-8" })
);

const getCountriesForCurrency = (currency) => {
  return countries.reduce((accumulator, country) => {
    if (!country.currencies) {
      return accumulator;
    }
    const currencies = Object.keys(country.currencies);
    const ind = currencies.find(
      (curr) => curr.toLowerCase() === currency.toLowerCase()
    );

    if (ind) {
      accumulator.push(country.name.common);
    }
    return accumulator;
  }, []);
};
console.log(getCountriesForCurrency("USD"));
