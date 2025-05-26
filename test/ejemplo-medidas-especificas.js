const { BP3D } = require("../dist/BinPacking.js");
const { Bin, Item, Packer } = BP3D;

// Función para mostrar resultados de manera más legible
function mostrarResultadosEmpaquetado(contenedores) {
  contenedores.forEach((bin, index) => {
    console.log(`\nContenedor ${index + 1}: ${bin.name}`);
    console.log("----------------------------------------");
    console.log(
      `Dimensiones: ${bin.getWidth()}cm × ${bin.getHeight()}cm × ${bin.getDepth()}cm`
    );
    console.log(`Peso máximo: ${bin.getMaxWeight()}kg`);
    console.log(`Items empaquetados: ${bin.items.length}`);

    if (bin.items.length > 0) {
      console.log("\nDistribución de items:");
      bin.items.forEach((item) => {
        console.log(
          `- ${
            item.name
          } (${item.getWidth()}cm × ${item.getHeight()}cm × ${item.getDepth()}cm, peso: ${item.getWeight()}kg):`
        );
        console.log(
          `  Posición: [${item.getPosition()[0]}cm, ${
            item.getPosition()[1]
          }cm, ${item.getPosition()[2]}cm]`
        );
      });
      console.log(`\nPeso total empacado: ${bin.getPackedWeight()}kg`);
    }
  });
}

// Ejemplo práctico de empaquetamiento sin pesos
console.log("Demostración de Empaquetamiento 3D (Medidas Específicas)\n");

// 1. Definir contenedores con las medidas especificadas
const contenedores = [
  new Bin("Contenedor Pequeño", 35, 20, 20), // 35 × 20 × 20, peso máximo 50kg
  new Bin("Contenedor Mediano", 50, 45, 50), // 50 × 45 × 50, peso máximo 100kg
  new Bin("Contenedor Grande", 70, 45, 40), // 70 × 45 × 40, peso máximo 150kg
];

// 2. Definir items con las medidas especificadas
const items = [
  new Item("Item 1", 10, 25, 10), // 10 × 25 × 10, peso 5kg
  new Item("Item 2", 40, 20, 40), // 40 × 20 × 40, peso 15kg
  new Item("Item 3", 45, 25, 40), // 45 × 25 × 40, peso 20kg
  new Item("Item 4", 10, 15, 10), // 10 × 15 × 10, peso 3kg
  new Item("Item 5", 40, 15, 40), // 40 × 15 × 40, peso 12kg
  new Item("Item 6", 25, 40, 30), // 25 × 40 × 30, peso 18kg
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
      `- ${
        item.name
      } (${item.getWidth()}cm × ${item.getHeight()}cm × ${item.getDepth()}cm)`
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
  const volumenContenedor = contenedor.getVolume();
  const volumenEmpacado = contenedor.getPackedVolume();
  const porcentajeVolumen = (volumenEmpacado / volumenContenedor) * 100;

  console.log(`\nContenedor ${index + 1} (${contenedor.name}):`);
  console.log(`Volumen del contenedor: ${volumenContenedor.toFixed(2)}cm³`);
  console.log(`Volumen empacado: ${volumenEmpacado.toFixed(2)}cm³`);
  console.log(
    `Porcentaje de espacio utilizado: ${porcentajeVolumen.toFixed(2)}%`
  );
});
