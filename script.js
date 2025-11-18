const colores = [
  { nombre: "Negro", valor: 0, color: "#000000", mult: 1 },
  { nombre: "Marrón", valor: 1, color: "#8B4513", mult: 10 },
  { nombre: "Rojo", valor: 2, color: "#FF0000", mult: 100 },
  { nombre: "Naranja", valor: 3, color: "#FFA500", mult: 1000 },
  { nombre: "Amarillo", valor: 4, color: "#FFFF00", mult: 10000 },
  { nombre: "Verde", valor: 5, color: "#008000", mult: 100000 },
  { nombre: "Azul", valor: 6, color: "#0000FF", mult: 1000000 },
  { nombre: "Violeta", valor: 7, color: "#800080", mult: 10000000 },
  { nombre: "Gris", valor: 8, color: "#808080", mult: 100000000 },
  { nombre: "Blanco", valor: 9, color: "#FFFFFF", mult: 1000000000, textColor: "#000" }
];

const multiplicadores = [
  ...colores,
  { nombre: "Dorado", mult: 0.1, color: "#d4af37", textColor: "#000" },
  { nombre: "Plateado", mult: 0.01, color: "#c0c0c0", textColor: "#000" }
];

// Referencias
const banda1 = document.getElementById("banda1");
const banda2 = document.getElementById("banda2");
const multi = document.getElementById("multi");
const tol = document.getElementById("tol");

const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const bTol = document.getElementById("bTol");
const resultado = document.getElementById("resultado");

// llenar select
function llenarSelect(select, lista) {
  const defaultOpt = document.createElement("option");
  defaultOpt.textContent = "-- Seleccionar --";
  defaultOpt.value = "";
  select.appendChild(defaultOpt);

  lista.forEach(c => {
    const opt = document.createElement("option");
    opt.textContent = c.nombre;
    opt.value = c.nombre;
    opt.style.backgroundColor = c.color;
    opt.style.color = c.textColor || "white";
    select.appendChild(opt);
  });
}

llenarSelect(banda1, colores);
llenarSelect(banda2, colores);
llenarSelect(multi, multiplicadores);

// cambiar colores automatico
banda1.addEventListener("change", () => actualizarColor(b1, banda1, colores));
banda2.addEventListener("change", () => actualizarColor(b2, banda2, colores));
multi.addEventListener("change", () => actualizarColor(b3, multi, multiplicadores));
tol.addEventListener("change", () => {
  if (tol.value === "gold") bTol.style.backgroundColor = "#d4af37";
  else if (tol.value === "silver") bTol.style.backgroundColor = "#c0c0c0";
  else bTol.style.backgroundColor = "transparent";
});

function actualizarColor(bandaElem, selectElem, lista) {
  const colorSel = lista.find(c => c.nombre === selectElem.value);
  bandaElem.style.backgroundColor = colorSel ? colorSel.color : "transparent";
}

// calcular
function calcular() {
  const c1 = colores.find(c => c.nombre === banda1.value);
  const c2 = colores.find(c => c.nombre === banda2.value);
  const m = multiplicadores.find(c => c.nombre === multi.value);
  const t = tol.value;

  if (!c1 || !c2 || !m || !t) {
    resultado.innerHTML = "<p style='color:red;'> Completa todos los campos para calcular.</p>";
    return;
  }

  const valor = ((c1.valor * 10) + c2.valor) * m.mult;
  const tolPorc = t === "gold" ? 5 : 10;
  const tolDecimal = tolPorc / 100;

  const min = valor * (1 - tolDecimal);
  const max = valor * (1 + tolDecimal);

  resultado.innerHTML = `
    <p><strong>Valor:</strong> ${formatear(valor)} (±${tolPorc}%)</p>
    <p><strong>Mínimo:</strong> ${formatear(min)}</p>
    <p><strong>Máximo:</strong> ${formatear(max)}</p>
  `;
}

function formatear(valor) {
  if (valor >= 1e6) return (valor / 1e6).toFixed(2) + " MΩ";
  if (valor >= 1e3) return (valor / 1e3).toFixed(2) + " kΩ";
  return valor + " Ω";
}

document.getElementById("btnCalcular").addEventListener("click", calcular);


