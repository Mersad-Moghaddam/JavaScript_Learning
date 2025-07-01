/**
 * Gas Station API (In-memory, no HTTP server)
 * 
 * Features:
 * - Manage gas stations (CRUD)
 * - Manage fuels and prices per station
 * - Simulate fuel purchase
 * 
 * Usage:
 *   const api = require('./gas_station_api');
 *   api.addStation({ ... });
 *   api.listStations();
 *   api.purchaseFuel(stationId, fuelType, liters);
 */

// In-memory data store
const stations = [];
let stationIdCounter = 1;

/**
 * List all gas stations.
 * @returns {Array} Array of station objects.
 */
function listStations() {
  return stations.map(s => ({ ...s, fuels: undefined }));
}

/**
 * Add a new gas station.
 * @param {Object} station - { name: string, location: string, fuels: [{type, pricePerLiter}] }
 * @returns {Object} The created station with id.
 */
function addStation(station) {
  const newStation = {
    id: stationIdCounter++,
    name: station.name,
    location: station.location,
    fuels: (station.fuels || []).map(f => ({ type: f.type, pricePerLiter: f.pricePerLiter }))
  };
  stations.push(newStation);
  return { ...newStation, fuels: undefined };
}

/**
 * Update station info.
 * @param {number} id - Station ID.
 * @param {Object} updates - { name?, location? }
 * @returns {Object|null} Updated station or null if not found.
 */
function updateStation(id, updates) {
  const station = stations.find(s => s.id === id);
  if (!station) return null;
  if (updates.name) station.name = updates.name;
  if (updates.location) station.location = updates.location;
  return { ...station, fuels: undefined };
}

/**
 * Delete a station.
 * @param {number} id - Station ID.
 * @returns {boolean} True if deleted, false if not found.
 */
function deleteStation(id) {
  const idx = stations.findIndex(s => s.id === id);
  if (idx === -1) return false;
  stations.splice(idx, 1);
  return true;
}

/**
 * List fuels and prices for a station.
 * @param {number} id - Station ID.
 * @returns {Array|null} Array of fuels or null if not found.
 */
function listFuels(id) {
  const station = stations.find(s => s.id === id);
  if (!station) return null;
  return station.fuels.map(f => ({ ...f }));
}

/**
 * Update fuel price for a station.
 * @param {number} id - Station ID.
 * @param {string} fuelType - Fuel type (e.g., "Diesel").
 * @param {number} newPrice - New price per liter.
 * @returns {boolean} True if updated, false if not found.
 */
function updateFuelPrice(id, fuelType, newPrice) {
  const station = stations.find(s => s.id === id);
  if (!station) return false;
  const fuel = station.fuels.find(f => f.type === fuelType);
  if (!fuel) return false;
  fuel.pricePerLiter = newPrice;
  return true;
}

/**
 * Simulate purchasing fuel.
 * @param {number} id - Station ID.
 * @param {string} fuelType - Fuel type.
 * @param {number} liters - Amount in liters.
 * @returns {Object} { totalCost, pricePerLiter } or error message.
 */
function purchaseFuel(id, fuelType, liters) {
  const station = stations.find(s => s.id === id);
  if (!station) return { error: "Station not found" };
  const fuel = station.fuels.find(f => f.type === fuelType);
  if (!fuel) return { error: "Fuel type not found" };
  if (liters <= 0) return { error: "Invalid liters amount" };
  const totalCost = +(fuel.pricePerLiter * liters).toFixed(2);
  return { totalCost, pricePerLiter: fuel.pricePerLiter };
}

// Example usage (uncomment to test)
/*
const s1 = addStation({
  name: "Main St Station",
  location: "123 Main St",
  fuels: [
    { type: "Diesel", pricePerLiter: 1.99 },
    { type: "Unleaded", pricePerLiter: 2.19 }
  ]
});
console.log("Stations:", listStations());
console.log("Fuels:", listFuels(s1.id));
updateFuelPrice(s1.id, "Diesel", 2.09);
console.log("Fuels after price update:", listFuels(s1.id));
console.log("Purchase:", purchaseFuel(s1.id, "Diesel", 20));
deleteStation(s1.id);
console.log("Stations after delete:", listStations());
*/

// Export API
module.exports = {
  listStations,
  addStation,
  updateStation,
  deleteStation,
  listFuels,
  updateFuelPrice,
  purchaseFuel
};

// CLI Interface
if (require.main === module) {
  const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function mainMenu() {
    console.log("\n--- Gas Station API CLI ---");
    console.log("1. List stations");
    console.log("2. Add station");
    console.log("3. Update station");
    console.log("4. Delete station");
    console.log("5. List fuels for station");
    console.log("6. Update fuel price");
    console.log("7. Purchase fuel");
    console.log("8. Exit");
    rl.question("Choose an option: ", answer => {
      switch (answer.trim()) {
        case "1": return cliListStations();
        case "2": return cliAddStation();
        case "3": return cliUpdateStation();
        case "4": return cliDeleteStation();
        case "5": return cliListFuels();
        case "6": return cliUpdateFuelPrice();
        case "7": return cliPurchaseFuel();
        case "8": rl.close(); break;
        default: console.log("Invalid option."); mainMenu();
      }
    });
  }

  function cliListStations() {
    const stations = listStations();
    if (stations.length === 0) {
      console.log("No stations found.");
    } else {
      stations.forEach(s => {
        console.log(`ID: ${s.id}, Name: ${s.name}, Location: ${s.location}`);
      });
    }
    mainMenu();
  }

  function cliAddStation() {
    rl.question("Station name: ", name => {
      rl.question("Location: ", location => {
        rl.question("Fuels (comma separated, e.g. Diesel:1.99,Unleaded:2.19): ", fuelsInput => {
          const fuels = fuelsInput.split(",").map(f => {
            const [type, price] = f.split(":");
            return { type: type.trim(), pricePerLiter: parseFloat(price) };
          }).filter(f => f.type && !isNaN(f.pricePerLiter));
          const station = addStation({ name, location, fuels });
          console.log("Added station:", station);
          mainMenu();
        });
      });
    });
  }

  function cliUpdateStation() {
    rl.question("Station ID to update: ", id => {
      rl.question("New name (leave blank to keep): ", name => {
        rl.question("New location (leave blank to keep): ", location => {
          const updates = {};
          if (name.trim()) updates.name = name.trim();
          if (location.trim()) updates.location = location.trim();
          const updated = updateStation(parseInt(id), updates);
          if (updated) {
            console.log("Updated station:", updated);
          } else {
            console.log("Station not found.");
          }
          mainMenu();
        });
      });
    });
  }

  function cliDeleteStation() {
    rl.question("Station ID to delete: ", id => {
      const ok = deleteStation(parseInt(id));
      console.log(ok ? "Deleted." : "Station not found.");
      mainMenu();
    });
  }

  function cliListFuels() {
    rl.question("Station ID: ", id => {
      const fuels = listFuels(parseInt(id));
      if (!fuels) {
        console.log("Station not found.");
      } else if (fuels.length === 0) {
        console.log("No fuels found for this station.");
      } else {
        fuels.forEach(f => {
          console.log(`Type: ${f.type}, Price per liter: $${f.pricePerLiter}`);
        });
      }
      mainMenu();
    });
  }

  function cliUpdateFuelPrice() {
    rl.question("Station ID: ", id => {
      rl.question("Fuel type: ", type => {
        rl.question("New price per liter: ", price => {
          const ok = updateFuelPrice(parseInt(id), type.trim(), parseFloat(price));
          console.log(ok ? "Fuel price updated." : "Station or fuel type not found.");
          mainMenu();
        });
      });
    });
  }

  function cliPurchaseFuel() {
    rl.question("Station ID: ", id => {
      rl.question("Fuel type: ", type => {
        rl.question("Liters: ", liters => {
          const res = purchaseFuel(parseInt(id), type.trim(), parseFloat(liters));
          if (res.error) {
            console.log("Error:", res.error);
          } else {
            console.log(`Total cost: $${res.totalCost} ($${res.pricePerLiter}/liter)`);
          }
          mainMenu();
        });
      });
    });
  }

  rl.on('close', () => {
    console.log("Goodbye!");
    process.exit(0);
  });

  mainMenu();
}
