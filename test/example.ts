const { BP3D } = require("../dist/BinPacking.js");
const { Bin, Item, Packer } = BP3D;

// Función auxiliar para imprimir resultados
function printResults(packer, mode) {
  console.log(`\n=== Resultados del modo: ${mode} ===`);
  packer.bins.forEach((bin) => {
    console.log(`\nBin: ${bin.name}`);
    console.log(
      "Dimensiones:",
      `${bin.getWidth()}x${bin.getHeight()}x${bin.getDepth()}`
    );
    console.log("Peso máximo:", bin.getMaxWeight());

    console.log("\nItems que caben:");
    bin.items.forEach((item) => {
      console.log(
        `- ${
          item.name
        }: ${item.getWidth()}x${item.getHeight()}x${item.getDepth()}, peso: ${
          item.weight
        }`
      );
    });

    console.log("\nItems que no caben:");
    bin.unfittedItems.forEach((item) => {
      console.log(
        `- ${
          item.name
        }: ${item.getWidth()}x${item.getHeight()}x${item.getDepth()}, peso: ${
          item.weight
        }`
      );
    });
  });
}

// Crear bins
const bins = [
  new Bin("Contenedor Pequeño", 35, 20, 20, 0),
  new Bin("Contenedor Mediano", 50, 45, 50, 0),
  new Bin("Contenedor Grande", 70, 45, 40, 0),
];

// Crear items
const items = [
  new Item("Item 1", 10, 25, 10, 0),
  new Item("Item 2", 40, 20, 40, 0),
  new Item("Item 3", 45, 25, 40, 0),
  new Item("Item 4", 10, 15, 10, 0),
  new Item("Item 5", 40, 15, 40, 0),
  new Item("Item 6", 25, 40, 30, 0),
];

// Caso 1: distributeItems = true
// Distribuye los items en todos los bins posibles
console.log("\n=== CASO 1: Distribuir items en todos los bins posibles ===");
const packer1 = new Packer();
bins.forEach((bin) => packer1.addBin(bin));
items.forEach((item) => packer1.addItem(item));
packer1.pack(true); // distributeItems=true
printResults(packer1, "Distribuir items en todos los bins");

// Caso 2: distributeItems = false
// Intenta poner todos los items en cada bin
console.log("\n=== CASO 2: Intentar poner todos los items en cada bin ===");
const packer2 = new Packer();
bins.forEach((bin) => packer2.addBin(bin));
items.forEach((item) => packer2.addItem(item));
packer2.pack(false); // distributeItems=false
printResults(packer2, "Intentar poner todos los items en cada bin");
