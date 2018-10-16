import cities from "./cities";

let slimCities = cities.map(city => city.id)
console.log(slimCities.slice(5));


/**
fs.writeFile('newcities.js', 'Hello Node.js', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
*/
