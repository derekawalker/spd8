import { citiesOptions } from "../../../../saltproject-react/src/utils/data/cities";

const saltProjectPrefs = { city: "all" };

// Put the object into storage
localStorage.setItem("saltProjectPrefs", JSON.stringify(saltProjectPrefs));

// Retrieve the object from storage
const retrievedObject = localStorage.getItem("saltProjectPrefs");

console.log("retrievedObject: ", JSON.parse(retrievedObject));
