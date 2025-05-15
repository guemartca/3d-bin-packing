const BP3D = require("../dist/BP3D.js");
const { Item, Bin, Packer } = BP3D;
const assert = require("assert");

// Función helper para imprimir resultados
function printResults(bin, packer) {
  console.log("\nResultados del empaquetado:");
  console.log("------------------------");
  console.log(`Contenedor: ${bin.name}`);
  console.log(`Dimensiones: ${bin.width}x${bin.height}x${bin.depth}`);
  console.log(`Peso máximo: ${bin.weight}`);
  console.log("\nItems empaquetados:");
  bin.items.forEach((item) => {
    console.log(
      `- ${item.name}: ${item.width}x${item.height}x${item.depth} en posición [${item.position[0]},${item.position[1]},${item.position[2]}]`
    );
  });

  if (packer.unfitItems.length > 0) {
    console.log("\nItems que no cupieron:");
    packer.unfitItems.forEach((item) => {
      console.log(`- ${item.name}: ${item.width}x${item.height}x${item.depth}`);
    });
  }
}

// Caso de prueba 1: Items que deberían caber perfectamente
console.log("\nCaso de prueba 1: Items que caben perfectamente");
{
  let bin = new Bin("Contenedor Regular", 100, 100, 100, 1000);
  let items = [
    new Item("Item 1", 50, 50, 50, 100),
    new Item("Item 2", 50, 50, 50, 100),
    new Item("Item 3", 50, 50, 50, 100),
    new Item("Item 4", 50, 50, 50, 100),
  ];

  let packer = new Packer();
  packer.addBin(bin);
  items.forEach((item) => packer.addItem(item));
  packer.pack();

  printResults(bin, packer);
  assert.strictEqual(bin.items.length, 4, "Deberían caber los 4 items");
  assert.strictEqual(
    packer.unfitItems.length,
    0,
    "No deberían quedar items sin empacar"
  );
}

// Caso de prueba 2: Items que exceden el peso
console.log("\nCaso de prueba 2: Items que exceden el peso");
{
  let bin = new Bin("Contenedor Ligero", 100, 100, 100, 100);
  let items = [
    new Item("Item Pesado 1", 20, 20, 20, 60),
    new Item("Item Pesado 2", 20, 20, 20, 60),
  ];

  let packer = new Packer();
  packer.addBin(bin);
  items.forEach((item) => packer.addItem(item));
  packer.pack();

  printResults(bin, packer);
  assert.strictEqual(
    bin.items.length,
    1,
    "Solo debería caber 1 item por el peso"
  );
}

// Caso de prueba 3: Items de diferentes tamaños
console.log("\nCaso de prueba 3: Items de diferentes tamaños");
{
  let bin = new Bin("Contenedor Mixto", 100, 100, 100, 1000);
  let items = [
    new Item("Item Grande", 60, 60, 60, 100),
    new Item("Item Mediano", 40, 40, 40, 50),
    new Item("Item Pequeño 1", 20, 20, 20, 10),
    new Item("Item Pequeño 2", 20, 20, 20, 10),
  ];

  let packer = new Packer();
  packer.addBin(bin);
  items.forEach((item) => packer.addItem(item));
  packer.pack();

  printResults(bin, packer);
}

console.log("\nTodas las pruebas completadas exitosamente!");
