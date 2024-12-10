// Archivo unificado de datos.js
let data = []; // Aquí cargaremos los datos

// Elementos de lista
const filtrosContenedor = document.getElementById("filtros-contenedor");
const resultList = document.getElementById("result-list");

// Cargar datos desde el archivo JSON
fetch("data/data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al cargar el archivo JSON: " + response.statusText);
    }
    return response.json();
  })
  .then((jsonData) => {
    data = jsonData;
    console.log(data); // Verifica que los datos se cargaron correctamente
    generarFiltros();
    renderResults(data);
  })
  .catch((error) => {
    console.error("Error al cargar el archivo JSON:", error);
  });


// Generar filtros dinámicamente
function generarFiltros() {
  const filtros = [
    { id: "estadoCasoFiltro", label: "Estado del Caso", key: "ESTADO_CASO" },
    { id: "modalidadFiltro", label: "Modalidad", key: "MODALIDAD" },
    { id: "medioEmpleoFiltro", label: "Medio Empleado", key: "MEDIO_EMPLEADO" },
    { id: "diaFiltro", label: "Día", key: "DIA" },
    { id: "mesFiltro", label: "Mes", key: "MES" },
    { id: "anoFiltro", label: "Año", key: "AÑO" },
    { id: "situacionPersonaFiltro", label: "Situación de Persona", key: "SITUACION_PERSONA" },
    { id: "estadoCivilFiltro", label: "Estado Civil", key: "ESTADO_CIVIL" },
    { id: "antecedente1Filtro", label: "Antecedente 1", key: "ANTECEDENTE_1" },
    { id: "antecedente2Filtro", label: "Antecedente 2", key: "ANTECEDENTE_2" },
    { id: "penal2Filtro", label: "Penal 2", key: "PENAL_2" },
    { id: "delincuenteFiltro", label: "Delincuente", key: "DELINCUENTE" },
    { id: "tiposFiltro", label: "Tipos", key: "TIPOS" },
    { id: "establecimientoPenitenciarioFiltro", label: "Establecimiento Penitenciario", key: "ESTABLECIMIENTO_PENITENCIARIO" },
    { id: "sexoFiltro", label: "Sexo", key: "SEXO" },
    { id: "paisNatalFiltro", label: "País Natal", key: "PAIS_NATAL" },
    { id: "conoHechoFiltro", label: "Cono del Hecho", key: "CONO_HECHO" },
    { id: "zonaHechoFiltro", label: "Zona del Hecho", key: "ZONA_HECHO" },
    { id: "nroPresuntosAutoresFiltro", label: "Número de Presuntos Autores", key: "NRO_PRESUNTOS_AUTORES" }
  ];

  filtrosContenedor.innerHTML = filtros
    .map(
      (filtro) => `
        <label class="block mb-2">
          <span class="text-gray-700">${filtro.label}:</span>
          <select id="${filtro.id}" class="w-full p-2 border rounded">
            <option value="">Todos</option>
          </select>
        </label>
      `
    )
    .join("");

  filtrosContenedor.innerHTML += `
    <button id="resetFilters" class="mt-6 mb-2 bg-blue-500 text-white px-4 py-0 rounded shadow">
      Restablecer Filtros
    </button>
  `;

  // Poblamos las opciones después de crear los filtros
  filtros.forEach((filtro) => {
    const uniqueValues = new Set(data.map((item) => item[filtro.key]).filter(Boolean));
    fillSelectOptions(document.getElementById(filtro.id), uniqueValues);
  });

  // Añadir eventos
  document.getElementById("resetFilters").addEventListener("click", resetFilters);
  filtros.forEach((filtro) =>
    document.getElementById(filtro.id).addEventListener("change", filterResults)
  );
}

// Llenar las opciones del select
function fillSelectOptions(select, options) {
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });
}

// Renderizar resultados
function renderResults(filteredData) {
  resultList.innerHTML = "";
  if (filteredData.length === 0) {
    resultList.innerHTML = "<p class='text-gray-500'>No se encontraron resultados.</p>";
    return;
  }

  filteredData.forEach((item) => {
    const li = renderData(item);
    resultList.appendChild(li);
  });
}

// Generar un elemento de lista para un caso
function renderData(item) {
  const li = document.createElement("li");
  li.className = "p-4 bg-white shadow rounded-lg mb-4";

  // Título del caso
  const title = document.createElement("h3");
  title.className = "text-lg font-bold";
  title.textContent = `Caso #${item.NRO_CASO} - Denuncia: ${item.NRO_DENUNCIA || "No especificada"}`;

  // Estado del caso
  const estado = document.createElement("span");
  estado.className = `inline-block px-3 py-1 rounded-full text-white text-sm font-semibold ${getEstadoColor(
    item.ESTADO_CASO
  )}`;
  estado.textContent = item.ESTADO_CASO || "Estado desconocido";

  // Descripción del caso
  const description = document.createElement("p");
  description.className = "text-gray-600 mt-2";
  description.innerHTML = `
    <strong>Modalidad:</strong> ${item.MODALIDAD} | <strong>Medio:</strong> ${item.MEDIO_EMPLEADO} <br>
    <strong>Día:</strong> ${item.DIA} | <strong>Año:</strong> ${item.AÑO} <br>
    <strong>Situación Persona:</strong> ${item.SITUACION_PERSONA || "No especificado"} <br>
    <strong>Estado Civil:</strong> ${item.ESTADO_CIVIL || "No especificado"} <br>
    <strong>Antecedente 1:</strong> ${item.ANTECEDENTE_1 || "No especificado"} <br>
    <strong>Antecedente 2:</strong> ${item.ANTECEDENTE_2 || "No especificado"} <br>
    <strong>Penal 2:</strong> ${item.PENAL_2 || "No especificado"} <br>
    <strong>Delincuente:</strong> ${item.DELINCUENTE || "No especificado"} <br>
    <strong>Tipo:</strong> ${item.TIPOS || "No especificado"} <br>
    <strong>Establecimiento Penitenciario:</strong> ${item.ESTABLECIMIENTO_PENITENCIARIO || "No especificado"} <br>
    <strong>Sexo:</strong> ${item.SEXO || "No especificado"} <br>
    <strong>País Natal:</strong> ${item.PAIS_NATAL || "No especificado"} <br>
    <strong>Cono del Hecho:</strong> ${item.CONO_HECHO || "No especificado"} <br>
    <strong>Zona del Hecho:</strong> ${item.ZONA_HECHO || "No especificado"} <br>
    <strong>Nro de Presuntos Autores:</strong> ${item.NRO_PRESUNTOS_AUTORES || "No especificado"}
  `;

  // Agregar los elementos al contenedor
  li.appendChild(title);
  li.appendChild(estado);
  li.appendChild(description);
  return li;
}

// Función para obtener la clase de color según el estado del caso
function getEstadoColor(estado) {
  switch (estado) {
    case "PENDIENTE":
      return "bg-yellow-500";
    case "RESUELTO":
      return "bg-gray-500";
    default:
      return "bg-red-500";
  }
}

function filterResults() {
  // Obtener todos los filtros seleccionados
  const filtros = [
    { id: "estadoCasoFiltro", key: "ESTADO_CASO" },
    { id: "modalidadFiltro", key: "MODALIDAD" },
    { id: "medioEmpleoFiltro", key: "MEDIO_EMPLEADO" },
    { id: "diaFiltro", key: "DIA" },
    { id: "mesFiltro", key: "MES" },
    { id: "anoFiltro", key: "AÑO" },
    { id: "situacionPersonaFiltro", key: "SITUACION_PERSONA" },
    { id: "estadoCivilFiltro", key: "ESTADO_CIVIL" },
    { id: "antecedente1Filtro", key: "ANTECEDENTE_1" },
    { id: "antecedente2Filtro", key: "ANTECEDENTE_2" },
    { id: "penal2Filtro", key: "PENAL_2" },
    { id: "delincuenteFiltro", key: "DELINCUENTE" },
    { id: "tiposFiltro", key: "TIPOS" },
    { id: "establecimientoPenitenciarioFiltro", key: "ESTABLECIMIENTO_PENITENCIARIO" },
    { id: "sexoFiltro", key: "SEXO" },
    { id: "paisNatalFiltro", key: "PAIS_NATAL" },
    { id: "conoHechoFiltro", key: "CONO_HECHO" },
    { id: "zonaHechoFiltro", key: "ZONA_HECHO" },
    { id: "nroPresuntosAutoresFiltro", key: "NRO_PRESUNTOS_AUTORES" }
  ];

  // Filtrar los datos según los filtros seleccionados
  const filteredData = data.filter(item => {
    return filtros.every(filtro => {
      const selectElement = document.getElementById(filtro.id);
      const selectedValue = selectElement.value;
      if (!selectedValue) return true; // Si no se selecciona un valor, no se filtra
      return item[filtro.key] === selectedValue;
    });
  });

  // Renderizar los resultados filtrados
  renderResults(filteredData);
}


// Restablecer filtros
function resetFilters() {
  document.querySelectorAll('select').forEach(select => select.value = '');
  renderResults(data);
}
