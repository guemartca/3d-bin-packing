const { BP3D } = require("../dist/BinPacking.js");
const { Bin, Item, Packer } = BP3D;

// Función para mostrar resultados de manera más legible
function mostrarResultadosEmpaquetado(contenedores) {
  contenedores.forEach((bin, index) => {
    console.log(`\nContenedor ${index + 1}: ${bin.name}`);
    console.log("----------------------------------------");
    console.log(
      `Dimensiones: ${bin.width / 100000}m × ${bin.height / 100000}m × ${
        bin.depth / 100000
      }m`
    );
    console.log(`Items empaquetados: ${bin.items.length}`);

    if (bin.items.length > 0) {
      console.log("\nDistribución de items:");
      bin.items.forEach((item) => {
        console.log(
          `- ${item.name} (${item.width / 100000}m × ${
            item.height / 100000
          }m × ${item.depth / 100000}m):`
        );
        console.log(
          `  Posición: [${item.position[0] / 100000}m, ${
            item.position[1] / 100000
          }m, ${item.position[2] / 100000}m]`
        );
      });
    }
  });
}

// Ejemplo práctico de empaquetamiento sin pesos
console.log("Demostración de Empaquetamiento 3D (Medidas Específicas)\n");

// 1. Definir contenedores con las medidas especificadas
const contenedores = [
  new Bin("Contenedor Pequeño", 35, 20, 20), // 35 × 20 × 20
  new Bin("Contenedor Mediano", 50, 45, 50), // 50 × 45 × 50
  new Bin("Contenedor Grande", 70, 45, 40), // 70 × 45 × 40
];

// 2. Definir items con las medidas especificadas
const items = [
  new Item("Item 1", 10, 25, 10), // 10 × 25 × 10
  new Item("Item 2", 40, 20, 40), // 40 × 20 × 40
  new Item("Item 3", 45, 25, 40), // 45 × 25 × 40
  new Item("Item 4", 10, 15, 10), // 10 × 15 × 10
  new Item("Item 5", 40, 15, 40), // 40 × 15 × 40
  new Item("Item 6", 25, 40, 30), // 25 × 40 × 30

  // Agregando duplicados para probar mejor la optimización
  // new Item("Item 1B", 10, 25, 10), // 10 × 25 × 10
  // new Item("Item 4B", 10, 15, 10), // 10 × 15 × 10
  // new Item("Item 6B", 25, 40, 30), // 25 × 40 × 30
];

// 3. Crear el empaquetador y agregar los contenedores
const packer = new Packer();
contenedores.forEach((bin) => packer.addBin(bin));

// 4. Agregar todos los items para empaquetar
items.forEach((item) => packer.addItem(item));

// 5. Ejecutar el algoritmo de empaquetamiento
console.log("Iniciando proceso de empaquetamiento...\n");
packer.pack();

// 6. Mostrar resultados
console.log("Resultados del empaquetamiento:");
mostrarResultadosEmpaquetado(contenedores);

// 7. Mostrar items que no se pudieron empaquetar
if (packer.unfitItems.length > 0) {
  console.log("\nItems que no se pudieron empaquetar:");
  packer.unfitItems.forEach((item) => {
    console.log(
      `- ${item.name} (${item.width / 100000}m × ${item.height / 100000}m × ${
        item.depth / 100000
      }m)`
    );
  });
}

// 8. Mostrar estadísticas
let totalItemsEmpacados = contenedores.reduce(
  (sum, bin) => sum + bin.items.length,
  0
);
let porcentajeEmpacado = (totalItemsEmpacados / items.length) * 100;

console.log("\nEstadísticas:");
console.log(`Total de items: ${items.length}`);
console.log(`Items empacados: ${totalItemsEmpacados}`);
console.log(`Items sin empacar: ${packer.unfitItems.length}`);
console.log(`Porcentaje empacado: ${porcentajeEmpacado.toFixed(2)}%`);

// 9. Calcular y mostrar el uso del espacio para cada contenedor
console.log("\nUso del espacio por contenedor:");
contenedores.forEach((contenedor, index) => {
  const volumenContenedor =
    (contenedor.width / 100000) *
    (contenedor.height / 100000) *
    (contenedor.depth / 100000);
  const volumenEmpacado = contenedor.items.reduce((total, item) => {
    return (
      total +
      (item.width / 100000) * (item.height / 100000) * (item.depth / 100000)
    );
  }, 0);
  const porcentajeVolumen = (volumenEmpacado / volumenContenedor) * 100;

  console.log(`\nContenedor ${index + 1} (${contenedor.name}):`);
  console.log(`Volumen del contenedor: ${volumenContenedor.toFixed(2)}m³`);
  console.log(`Volumen empacado: ${volumenEmpacado.toFixed(2)}m³`);
  console.log(
    `Porcentaje de espacio utilizado: ${porcentajeVolumen.toFixed(2)}%`
  );
});
