// Define battery and camera data
const battery = [
  {
    batteryName: "WKL-78",
    capacityAh: 2.3,
    voltage: 14.4,
    maxDraw: 3.2,
    endVoltage: 10,
  },
  {
    batteryName: "WKL-140",
    capacityAh: 4.5,
    voltage: 14.4,
    maxDraw: 9.2,
    endVoltage: 5,
  },
  {
    batteryName: "Wmacro-78",
    capacityAh: 2.5,
    voltage: 14.5,
    maxDraw: 10,
    endVoltage: 5,
  },
  {
    batteryName: "Wmacro-140",
    capacityAh: 3.6,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 5,
  },
  {
    batteryName: "IOP-E78",
    capacityAh: 6.6,
    voltage: 14.4,
    maxDraw: 10.5,
    endVoltage: 8,
  },
  {
    batteryName: "IOP-E140",
    capacityAh: 9.9,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 10,
  },
  {
    batteryName: "IOP-E188",
    capacityAh: 13.2,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 11,
  },
  {
    batteryName: "RYN-C65",
    capacityAh: 4.9,
    voltage: 14.8,
    maxDraw: 4.9,
    endVoltage: 11,
  },
  {
    batteryName: "RYN-C85",
    capacityAh: 6.3,
    voltage: 14.4,
    maxDraw: 6.3,
    endVoltage: 12,
  },
  {
    batteryName: "RYN-C140",
    capacityAh: 9.8,
    voltage: 14.8,
    maxDraw: 10,
    endVoltage: 12,
  },
  {
    batteryName: "RYN-C290",
    capacityAh: 19.8,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 12,
  },
];
const camera = [
  {
    brand: "Cakon",
    model: "ABC 3000M",
    powerConsumptionWh: 35.5,
  },
  {
    brand: "Cakon",
    model: "ABC 5000M",
    powerConsumptionWh: 37.2,
  },
  {
    brand: "Cakon",
    model: "ABC 7000M",
    powerConsumptionWh: 39.7,
  },
  {
    brand: "Cakon",
    model: "ABC 9000M",
    powerConsumptionWh: 10.9,
  },
  {
    brand: "Cakon",
    model: "ABC 9900M",
    powerConsumptionWh: 15.7,
  },
  {
    brand: "Go MN",
    model: "UIK 110C",
    powerConsumptionWh: 62.3,
  },
  {
    brand: "Go MN",
    model: "UIK 210C",
    powerConsumptionWh: 64.3,
  },
  {
    brand: "Go MN",
    model: "UIK 230C",
    powerConsumptionWh: 26.3,
  },
  {
    brand: "Go MN",
    model: "UIK 250C",
    powerConsumptionWh: 15.3,
  },
  {
    brand: "Go MN",
    model: "UIK 270C",
    powerConsumptionWh: 20.3,
  },
  {
    brand: "VANY",
    model: "CEV 1100P",
    powerConsumptionWh: 22,
  },
  {
    brand: "VANY",
    model: "CEV 1300P",
    powerConsumptionWh: 23,
  },
  {
    brand: "VANY",
    model: "CEV 1500P",
    powerConsumptionWh: 24,
  },
  {
    brand: "VANY",
    model: "CEV 1700P",
    powerConsumptionWh: 25,
  },
  {
    brand: "VANY",
    model: "CEV 1900P",
    powerConsumptionWh: 26,
  },
];

// Get each element
const brandsElement = document.getElementById("brandSelectMenu");
const modelsElement = document.getElementById("modelSelectMenu");
const powerInputElement = document.getElementById("inputdefault");
const batteriesElement = document.getElementById("batteriesMenu");
let cameraPowerConsumtion = 0;

// Function to generate option elements for dropdown
function generateOption(text, value) {
  let option = document.createElement("option");
  option.text = text;
  option.value = value;
  return option;
}

// Function to select the camera model based on selected brand
function selectModels() {
  modelsElement.innerHTML = "";

  // Get the corresponding value using a key, since the data structure is a hash map
  let brand = brandsElement.value;
  // Use filter and map functions to get the corresponding model
  let models = camera
    .filter((cam) => cam.brand === brand)
    .map((cam) => cam.model);

  // Dynamically change the model name according to each brand
  models.forEach((model) => {
    modelsElement.add(generateOption(model, model));
  });
}

// Functions for error handling in input fields
function validatePowerConsumption(input) {
  if (isNaN(input) || input < 0 || input > 100) {
    alert("Invalid input. Please enter a number between 0 and 100");
    return false;
  } else {
    return true;
  }
}

// Function to generate table for displaying suitable batteries
function generateBatteryHTML(battery, totalPowerConsumption) {
  // Estimated operating time = (capacity + voltage) / total power consumption
  // => Multiply the value by 10, divide the approximation by 10 using Math.round, and display to one decimal place
  let estimateOperatingTime =
    Math.round(
      ((battery.capacityAh * battery.voltage) / totalPowerConsumption) * 10
    ) / 10;
  // Insert the battery name and the estimated operating time calculated above in a
  // Insert a template literal and display it at the bottom of Step 4
  return `<tr>
    <td>${battery.batteryName}</td>
    <td>Estimate operating ${estimateOperatingTime} hours on selected setup</td>
    </tr>`;
}

// Function to dynamically display table items according to the input of each step
function generateTableHTML(
  // Arguments take the power consumption of each battery/camera and the values in the input fields of step 3
  batteries,
  cameraPowerConsumtion,
  accessoryPowerConsumption
) {
  // Caluculate total power consumption
  let totalPowerConsumption = cameraPowerConsumtion + accessoryPowerConsumption;
  // Build table header
  let tableHTML =
    "<table><tr><th>Name</th><th>Estimate operating time</th></tr>";

  // Build table body
  for (let battery of batteries)
    tableHTML += generateBatteryHTML(battery, totalPowerConsumption);

  tableHTML += "</table>";
  return tableHTML;
}

// Event listener function to select and display each camera name
// Initial display is set to Cakon
function initializePage() {
  document.addEventListener("DOMContentLoaded", () => {
    let cameraBrands = [...new Set(camera.map((cam) => cam.brand))];

    cameraBrands.forEach((brand) => {
      brandsElement.add(generateOption(brand, brand));
    });

    brandsElement.value = "Cakon";
    selectModels();
    modelsElement.dispatchEvent(new Event("change"));
  });
}

// Event listener function to change the model name according to the selection of the camera name
function handleBrandChange() {
  brandsElement.addEventListener("change", function () {
    selectModels();
    modelsElement.dispatchEvent(new Event("change"));
  });
}

// Event listener function to calculate the power consumption of the camera
function handleModelChange() {
  modelsElement.addEventListener("change", function () {
    let selectModel = this.value;
    let selectCamera = camera.find((cam) => cam.model === selectModel);
    if (selectCamera) cameraPowerConsumtion = selectCamera.powerConsumptionWh;
    else cameraPowerConsumtion = 0;

    if (powerInputElement.value)
      powerInputElement.dispatchEvent(new Event("input"));
  });
}

// Using the values entered in step 3 and the generateTableHTML function above
// event listener function to display the matching battery in step 4.
function handlePowerInput() {
  powerInputElement.addEventListener("input", (event) => {
    // If no input yet, default to 0
    const inputPowerConsumption = parseInt(event.target.value, 10);

    // Only activated when the condition is true
    if (!validatePowerConsumption(inputPowerConsumption)) {
      return;
    }

    let totalPowerConsumption = cameraPowerConsumtion + inputPowerConsumption;
    // Calculation and use the filter function to display only batteries whose capacity exceeds the total power consumption
    let suitableBatteries = battery.filter(
      (battery) => battery.endVoltage * battery.maxDraw >= totalPowerConsumption
    );

    // Finally, pass the generateTableHTML function in the innerHTML
    batteriesTable.innerHTML = generateTableHTML(
      suitableBatteries,
      cameraPowerConsumtion,
      inputPowerConsumption
    );
  });
}

initializePage();
handleBrandChange();
handleModelChange();
handlePowerInput();
