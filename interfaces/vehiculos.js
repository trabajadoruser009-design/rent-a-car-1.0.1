const vehiculos = [
  {
    nombreClave: "pickup_reference_1",
    descripcionClave: "pickup_description_1",
    tipo: "Pickup",
    tipoClave: "pickup",
    ubicacion: "León",
    ubicacionClave: "leon",
    imagen: "../assets/ruleta/WhatsApp Image 2026-10-07 at 2.35.33 PM.jpeg",
  },
  {
    nombreClave: "suv_reference_1",
    descripcionClave: "suv_description_1",
    tipo: "SUV",
    tipoClave: "suv",
    ubicacion: "Managua",
    ubicacionClave: "managua",
    imagen: "../assets/ruleta/WhatsApp Image 2026-10-07 at 2.35.39 PM.jpeg",
  },
  {
    nombreClave: "pickup_reference_2",
    descripcionClave: "pickup_description_2",
    tipo: "Pickup",
    tipoClave: "pickup",
    ubicacion: "Managua",
    ubicacionClave: "managua",
    imagen: "../assets/ruleta/WhatsApp Image 2026-10-07 at 2.35.37 PM.jpeg",
  },
  {
    nombreClave: "suv_compact_1",
    descripcionClave: "suv_description_3",
    tipo: "SUV",
    tipoClave: "suv",
    ubicacion: "León",
    ubicacionClave: "leon",
    imagen: "../assets/ruleta/WhatsApp Image 2026-10-07 at 2.35.38 PM (1).jpeg",
  },
  {
    nombreClave: "pickup_reference_3",
    descripcionClave: "pickup_description_3",
    tipo: "Pickup",
    tipoClave: "pickup",
    ubicacion: "Granada",
    ubicacionClave: "granada",
    imagen: "../assets/ruleta/WhatsApp Image 2026-10-07 at 2.35.42 PM.jpeg",
  },
  {
    nombreClave: "suv_reference_2",
    descripcionClave: "suv_description_2",
    tipo: "SUV",
    tipoClave: "suv",
    ubicacion: "Granada",
    ubicacionClave: "granada",
    imagen: "../assets/ruleta/WhatsApp Image 2026-10-07 at 2.35.44 PM.jpeg",
  },
  {
    nombreClave: "pickup_reference_4",
    descripcionClave: "pickup_description_4",
    tipo: "Pickup",
    tipoClave: "pickup",
    ubicacion: "León",
    ubicacionClave: "leon",
    imagen: "../assets/ruleta/WhatsApp Image 2026-10-07 at 2.35.35 PM (1).jpeg",
  },
  {
    nombreClave: "suv_compact_2",
    descripcionClave: "suv_description_4",
    tipo: "SUV",
    tipoClave: "suv",
    ubicacion: "Managua",
    ubicacionClave: "managua",
    imagen: "../assets/ruleta/WhatsApp Image 2026-10-07 at 2.35.46 PM.jpeg",
  },
];

const listaVehiculos = document.querySelector("#lista-vehiculos");
const cantidadResultados = document.querySelector("#cantidad-resultados");
const sinResultados = document.querySelector("#sin-resultados");
const filtrosVehiculos = document.querySelector("#filtros-vehiculos");
const ubicacion = document.querySelector("#ubicacion");
const fechaEntrega = document.querySelector("#fecha-entrega");
const fechaDevolucion = document.querySelector("#fecha-devolucion");
const tipoVehiculo = document.querySelector("#tipo-vehiculo");
const ordenVehiculos = document.querySelector("#orden-vehiculos");

if (
  !listaVehiculos ||
  !cantidadResultados ||
  !sinResultados ||
  !filtrosVehiculos ||
  !ubicacion ||
  !fechaEntrega ||
  !fechaDevolucion ||
  !tipoVehiculo ||
  !ordenVehiculos
) {
  throw new Error("No se encontraron todos los elementos necesarios para mostrar el catálogo.");
}

const tituloPrincipal = document.querySelector("#titulo-principal");
if (!tituloPrincipal) {
  throw new Error("No se encontró el título principal de la interfaz de vehículos.");
}

function reproducirAnimacionEntrada() {
  tituloPrincipal.classList.remove("animacion-entrada");
  void tituloPrincipal.offsetWidth;
  tituloPrincipal.classList.add("animacion-entrada");
}

reproducirAnimacionEntrada();
window.addEventListener("pageshow", (evento) => {
  if (evento.persisted) reproducirAnimacionEntrada();
});

function configurarDesplegable(select, etiquetaId) {
  const selector = document.createElement("div");
  selector.className = "selector-filtro";

  const valorSeleccionado = document.createElement("span");
  valorSeleccionado.className = "selector-valor";

  const disparador = document.createElement("button");
  disparador.className = "selector-trigger";
  disparador.type = "button";
  disparador.setAttribute("aria-haspopup", "listbox");
  disparador.setAttribute("aria-expanded", "false");
  valorSeleccionado.id = `${select.id}-valor`;
  disparador.setAttribute("aria-labelledby", `${etiquetaId} ${valorSeleccionado.id}`);

  const flecha = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  flecha.classList.add("selector-chevron");
  flecha.setAttribute("viewBox", "0 0 24 24");
  flecha.setAttribute("aria-hidden", "true");
  const trazoFlecha = document.createElementNS("http://www.w3.org/2000/svg", "path");
  trazoFlecha.setAttribute("d", "m6 9 6 6 6-6");
  flecha.append(trazoFlecha);
  disparador.append(valorSeleccionado, flecha);

  const menu = document.createElement("div");
  menu.className = "selector-menu";
  menu.id = `${select.id}-opciones`;
  menu.setAttribute("role", "listbox");
  menu.setAttribute("aria-labelledby", etiquetaId);
  menu.setAttribute("aria-hidden", "true");
  disparador.setAttribute("aria-controls", menu.id);

  const opciones = Array.from(select.options, (opcion, indice) => {
    const botonOpcion = document.createElement("button");
    botonOpcion.className = "selector-opcion";
    botonOpcion.type = "button";
    botonOpcion.setAttribute("role", "option");
    botonOpcion.tabIndex = -1;
    botonOpcion.dataset.value = opcion.value;
    botonOpcion.id = `${select.id}-opcion-${indice}`;
    botonOpcion.setAttribute("aria-selected", "false");
    botonOpcion.dataset.active = "false";
    botonOpcion.textContent = opcion.textContent;
    botonOpcion.dataset.index = String(indice);

    const marca = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    marca.classList.add("selector-check");
    marca.setAttribute("viewBox", "0 0 24 24");
    marca.setAttribute("aria-hidden", "true");
    const trazoMarca = document.createElementNS("http://www.w3.org/2000/svg", "path");
    trazoMarca.setAttribute("d", "m5 12 4 4L19 6");
    trazoMarca.setAttribute("fill", "none");
    trazoMarca.setAttribute("stroke", "currentColor");
    trazoMarca.setAttribute("stroke-linecap", "round");
    trazoMarca.setAttribute("stroke-linejoin", "round");
    trazoMarca.setAttribute("stroke-width", "2.5");
    marca.append(trazoMarca);
    botonOpcion.append(marca);
    menu.append(botonOpcion);
    return botonOpcion;
  });

  selector.append(disparador, menu);
  select.after(selector);
  select.classList.add("selector-nativo");
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");

  function sincronizarSeleccion() {
    const opcionSeleccionada = select.selectedOptions[0];
    valorSeleccionado.textContent = opcionSeleccionada.textContent;
    opciones.forEach((opcion) => {
      opcion.setAttribute("aria-selected", String(opcion.dataset.value === select.value));
    });
  }

  function sincronizarTextosOpciones() {
    opciones.forEach((opcion, indice) => {
      const icono = opcion.querySelector(".selector-check");
      opcion.textContent = select.options[indice].textContent;
      opcion.append(icono);
    });
    sincronizarSeleccion();
  }

  function cerrar({ devolverFoco = false } = {}) {
    selector.classList.remove("is-abierto");
    disparador.setAttribute("aria-expanded", "false");
    disparador.removeAttribute("aria-activedescendant");
    menu.setAttribute("aria-hidden", "true");
    if (devolverFoco) disparador.focus();
  }

  let indiceActivo = Math.max(0, select.selectedIndex);

  function actualizarOpcionActiva(indice) {
    indiceActivo = indice;
    opciones.forEach((opcion, posicion) => {
      opcion.dataset.active = String(posicion === indiceActivo);
    });
    disparador.setAttribute("aria-activedescendant", opciones[indiceActivo].id);
  }

  function abrir(indiceInicial = select.selectedIndex) {
    document.querySelectorAll(".selector-filtro.is-abierto").forEach((abierto) => {
      if (abierto !== selector) {
        abierto.classList.remove("is-abierto");
        abierto.querySelector(".selector-trigger").setAttribute("aria-expanded", "false");
        abierto.querySelector(".selector-menu").setAttribute("aria-hidden", "true");
      }
    });
    selector.classList.add("is-abierto");
    disparador.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    actualizarOpcionActiva(Math.max(0, indiceInicial));
  }

  function seleccionar(opcion) {
    select.value = opcion.dataset.value;
    sincronizarSeleccion();
    select.dispatchEvent(new Event("change", { bubbles: true }));
    cerrar({ devolverFoco: true });
  }

  disparador.addEventListener("click", () => {
    if (selector.classList.contains("is-abierto")) {
      cerrar();
    } else {
      abrir();
    }
  });

  opciones.forEach((opcion, indice) => {
    opcion.addEventListener("click", () => seleccionar(opcion));
    opcion.addEventListener("pointermove", () => actualizarOpcionActiva(indice));
  });

  disparador.addEventListener("keydown", (evento) => {
    const abierto = selector.classList.contains("is-abierto");
    if (evento.key === "Escape" && abierto) {
      evento.preventDefault();
      cerrar({ devolverFoco: true });
    } else if (evento.key === "ArrowDown" || evento.key === "ArrowUp") {
      evento.preventDefault();
      if (!abierto) {
        abrir(evento.key === "ArrowUp" ? opciones.length - 1 : 0);
      } else {
        const avance = evento.key === "ArrowDown" ? 1 : -1;
        actualizarOpcionActiva((indiceActivo + avance + opciones.length) % opciones.length);
      }
    } else if ((evento.key === "Home" || evento.key === "End") && abierto) {
      evento.preventDefault();
      actualizarOpcionActiva(evento.key === "Home" ? 0 : opciones.length - 1);
    } else if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      if (abierto) seleccionar(opciones[indiceActivo]);
      else abrir();
    }
  });

  document.addEventListener("pointerdown", (evento) => {
    if (!selector.contains(evento.target)) cerrar();
  });

  select.addEventListener("change", sincronizarSeleccion);
  document.addEventListener("aa-language-change", sincronizarTextosOpciones);
  sincronizarSeleccion();
}

configurarDesplegable(ubicacion, "ubicacion-etiqueta");
configurarDesplegable(tipoVehiculo, "tipo-vehiculo-etiqueta");
configurarDesplegable(ordenVehiculos, "orden-etiqueta");

function crearTarjeta(vehiculo) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-vehiculo";

  const imagen = document.createElement("img");
  imagen.className = "imagen-vehiculo";
  imagen.src = vehiculo.imagen;
  imagen.alt = `${window.AARentCarI18n.t("vehicles_heading")}: ${window.AARentCarI18n.t(vehiculo.tipoClave)}`;
  imagen.loading = "eager";
  imagen.addEventListener("error", () => {
    imagen.alt = `${vehiculo.nombre}: imagen no disponible`;
    imagen.removeAttribute("src");
  }, { once: true });

  const detalles = document.createElement("div");
  detalles.className = "detalles-vehiculo";

  const etiqueta = document.createElement("p");
  etiqueta.className = "etiqueta-vehiculo";
  etiqueta.textContent = window.AARentCarI18n.t(vehiculo.tipoClave);

  const titulo = document.createElement("h3");
  titulo.textContent = window.AARentCarI18n.t(vehiculo.nombreClave);

  const descripcion = document.createElement("p");
  descripcion.textContent = window.AARentCarI18n.t(vehiculo.descripcionClave);

  detalles.append(etiqueta, titulo, descripcion);

  const oferta = document.createElement("div");
  oferta.className = "oferta-vehiculo";
  const tarifa = document.createElement("span");
  tarifa.textContent = `${window.AARentCarI18n.t("sample_location")}: ${window.AARentCarI18n.t(vehiculo.ubicacionClave)}`;

  const consulta = document.createElement("a");
  consulta.className = "boton-consulta";
  const datosConsulta = [
    `${window.AARentCarI18n.t("inquiry_message")} ${window.AARentCarI18n.t("inquiry_vehicle")}: ${window.AARentCarI18n.t(vehiculo.nombreClave)}.`,
    ubicacion.value && `${window.AARentCarI18n.t("delivery_place")}: ${window.AARentCarI18n.t(({ León: "leon", Managua: "managua", Granada: "granada" })[ubicacion.value])}.`,
    fechaEntrega.value && `Fecha de entrega: ${fechaEntrega.value}.`,
    fechaDevolucion.value && `Fecha de devolución: ${fechaDevolucion.value}.`,
  ].filter(Boolean).join(" ");
  consulta.href = `https://wa.me/50585338738?text=${encodeURIComponent(datosConsulta)}`;
  consulta.target = "_blank";
  consulta.rel = "noopener noreferrer";
  consulta.textContent = window.AARentCarI18n.t("whatsapp_inquiry");

  oferta.append(tarifa, consulta);
  tarjeta.append(imagen, detalles, oferta);
  return tarjeta;
}

function actualizarCatalogo() {
  const filtrados = vehiculos
    .filter((vehiculo) =>
      !tipoVehiculo.value || vehiculo.tipo.toLocaleLowerCase("es") === tipoVehiculo.value
    )
    .filter((vehiculo) => !ubicacion.value || vehiculo.ubicacion === ubicacion.value)
    .sort((primero, segundo) => {
      if (ordenVehiculos.value === "type") {
        return primero.tipo.localeCompare(segundo.tipo, "es");
      }
      return vehiculos.indexOf(primero) - vehiculos.indexOf(segundo);
    });

  listaVehiculos.replaceChildren(...filtrados.map(crearTarjeta));
  cantidadResultados.textContent = `${filtrados.length} ${window.AARentCarI18n.t(filtrados.length === 1 ? "count_vehicle" : "count_vehicles")}`;
  sinResultados.hidden = filtrados.length > 0;
}

filtrosVehiculos.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (fechaEntrega.value && fechaDevolucion.value && fechaDevolucion.value < fechaEntrega.value) {
    fechaDevolucion.setCustomValidity(window.AARentCarI18n.t("return_validation"));
    fechaDevolucion.reportValidity();
    return;
  }

  fechaDevolucion.setCustomValidity("");
  actualizarCatalogo();
});

ordenVehiculos.addEventListener("change", actualizarCatalogo);
fechaEntrega.addEventListener("change", () => fechaDevolucion.setCustomValidity(""));
fechaDevolucion.addEventListener("change", () => fechaDevolucion.setCustomValidity(""));
document.addEventListener("aa-language-change", actualizarCatalogo);
actualizarCatalogo();
