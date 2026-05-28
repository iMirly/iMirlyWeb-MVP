import cat_hogar from "@/assets/imirly/cat_hogar.jpg";
import cat_belleza from "@/assets/imirly/cat_belleza.jpg";
import cat_clases from "@/assets/imirly/cat_clases.jpg";
import cat_deporte from "@/assets/imirly/cat_deporte.jpg";
import cat_mascotas from "@/assets/imirly/cat_mascotas.jpg";
import cat_cuidado from "@/assets/imirly/cat_cuidado.jpg";
import cat_otros from "@/assets/imirly/cat_otros.jpg";

import sub_fontaneria from "@/assets/imirly/sub_hogar_fontaneria.jpg";
import sub_electricista from "@/assets/imirly/sub_hogar_electricista.jpg";
import sub_limpieza from "@/assets/imirly/sub_hogar_limpieza.jpg";
import sub_jardineria from "@/assets/imirly/sub_hogar_jardineria.jpg";
import sub_pintura from "@/assets/imirly/sub_hogar_pintura.jpg";
import sub_reformas from "@/assets/imirly/sub_hogar_reformas.jpg";
import sub_peluqueria from "@/assets/imirly/sub_belleza_peluqueria.jpg";
import sub_unas from "@/assets/imirly/sub_belleza_unas.jpg";
import sub_facial from "@/assets/imirly/sub_belleza_facial.jpg";
import sub_masajes from "@/assets/imirly/sub_belleza_masajes.jpg";
import sub_idiomas from "@/assets/imirly/sub_clases_idiomas.jpg";
import sub_musica from "@/assets/imirly/sub_clases_musica.jpg";
import sub_yoga from "@/assets/imirly/sub_deporte_yoga.jpg";
import sub_padel from "@/assets/imirly/sub_deporte_padel.jpg";
import sub_paseador from "@/assets/imirly/sub_mascotas_paseador.jpg";
import sub_pelumasc from "@/assets/imirly/sub_mascotas_peluqueria.jpg";
import sub_ninos from "@/assets/imirly/sub_cuidados_ninos.jpg";
import sub_ancianos from "@/assets/imirly/sub_cuidados_ancianos.jpg";
import sub_info from "@/assets/imirly/sub_otros_informatica.jpg";
import sub_foto from "@/assets/imirly/sub_otros_foto.jpg";

export type Category = {
  id: string;
  nombre: string;
  image: string;
  subcategorias: Subcategory[];
};

export type Subcategory = { id: string; nombre: string; image: string };

export type Anuncio = {
  id: string;
  titulo: string;
  descripcion: string;
  precioHora: number;
  rating: number;
  reviews: number;
  ciudad: string;
  proveedor: string;
  avatar: string;
  image: string;
  subcategoriaId: string;
  categoriaId: string;
};

export const CATEGORIES: Category[] = [
  {
    id: "hogar", nombre: "Hogar", image: cat_hogar,
    subcategorias: [
      { id: "fontaneria", nombre: "Fontanería", image: sub_fontaneria },
      { id: "electricista", nombre: "Electricista", image: sub_electricista },
      { id: "limpieza", nombre: "Limpieza", image: sub_limpieza },
      { id: "jardineria", nombre: "Jardinería", image: sub_jardineria },
      { id: "pintura", nombre: "Pintura", image: sub_pintura },
      { id: "reformas", nombre: "Reformas", image: sub_reformas },
    ],
  },
  {
    id: "belleza", nombre: "Belleza", image: cat_belleza,
    subcategorias: [
      { id: "peluqueria", nombre: "Peluquería", image: sub_peluqueria },
      { id: "unas", nombre: "Uñas", image: sub_unas },
      { id: "facial", nombre: "Tratamientos faciales", image: sub_facial },
      { id: "masajes", nombre: "Masajes", image: sub_masajes },
    ],
  },
  {
    id: "clases", nombre: "Clases", image: cat_clases,
    subcategorias: [
      { id: "idiomas", nombre: "Idiomas", image: sub_idiomas },
      { id: "musica", nombre: "Música", image: sub_musica },
    ],
  },
  {
    id: "deporte", nombre: "Deporte", image: cat_deporte,
    subcategorias: [
      { id: "yoga", nombre: "Yoga", image: sub_yoga },
      { id: "padel", nombre: "Pádel", image: sub_padel },
    ],
  },
  {
    id: "mascotas", nombre: "Mascotas", image: cat_mascotas,
    subcategorias: [
      { id: "paseador", nombre: "Paseador", image: sub_paseador },
      { id: "peluqueria_mascotas", nombre: "Peluquería", image: sub_pelumasc },
    ],
  },
  {
    id: "cuidado", nombre: "Cuidado", image: cat_cuidado,
    subcategorias: [
      { id: "ninos", nombre: "Niños", image: sub_ninos },
      { id: "ancianos", nombre: "Ancianos", image: sub_ancianos },
    ],
  },
  {
    id: "otros", nombre: "Otros", image: cat_otros,
    subcategorias: [
      { id: "informatica", nombre: "Informática", image: sub_info },
      { id: "foto", nombre: "Fotografía", image: sub_foto },
    ],
  },
];

const initials = (name: string) =>
  name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();

const avatar = (name: string, color: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' rx='40' fill='${color}'/><text x='50%' y='54%' font-family='Inter,sans-serif' font-size='30' font-weight='700' fill='white' text-anchor='middle' dominant-baseline='middle'>${initials(name)}</text></svg>`,
  )}`;

export const ANUNCIOS: Anuncio[] = [
  { id: "a1", titulo: "Fontanero profesional 24h", descripcion: "Reparaciones urgentes de fugas, calderas y desatascos. Más de 10 años de experiencia.", precioHora: 28, rating: 4.9, reviews: 128, ciudad: "Madrid", proveedor: "Carlos Méndez", avatar: avatar("Carlos Méndez", "#6C5CE7"), image: sub_fontaneria, subcategoriaId: "fontaneria", categoriaId: "hogar" },
  { id: "a2", titulo: "Electricista certificado", descripcion: "Instalaciones, cuadros eléctricos y averías. Boletín oficial incluido.", precioHora: 32, rating: 4.8, reviews: 91, ciudad: "Barcelona", proveedor: "Laura Ortiz", avatar: avatar("Laura Ortiz", "#2ECC71"), image: sub_electricista, subcategoriaId: "electricista", categoriaId: "hogar" },
  { id: "a3", titulo: "Limpieza profunda del hogar", descripcion: "Limpiezas a fondo, cristales y mantenimiento semanal con productos ecológicos.", precioHora: 15, rating: 4.7, reviews: 203, ciudad: "Valencia", proveedor: "Marina López", avatar: avatar("Marina López", "#FFB800"), image: sub_limpieza, subcategoriaId: "limpieza", categoriaId: "hogar" },
  { id: "a4", titulo: "Jardinero y poda de árboles", descripcion: "Diseño y mantenimiento de jardines, riego automático y podas en altura.", precioHora: 22, rating: 4.6, reviews: 54, ciudad: "Sevilla", proveedor: "Iván Ruiz", avatar: avatar("Iván Ruiz", "#10b981"), image: sub_jardineria, subcategoriaId: "jardineria", categoriaId: "hogar" },
  { id: "a5", titulo: "Pintura interior y decoración", descripcion: "Pintura a brocha y rodillo, gotelé y estuco veneciano. Presupuesto sin compromiso.", precioHora: 20, rating: 4.9, reviews: 76, ciudad: "Madrid", proveedor: "Sergio Vidal", avatar: avatar("Sergio Vidal", "#f97316"), image: sub_pintura, subcategoriaId: "pintura", categoriaId: "hogar" },
  { id: "a6", titulo: "Reformas integrales", descripcion: "Cocinas, baños y obra completa llave en mano. Plazos garantizados.", precioHora: 45, rating: 5.0, reviews: 42, ciudad: "Bilbao", proveedor: "Reformas Norte", avatar: avatar("Reformas Norte", "#6C5CE7"), image: sub_reformas, subcategoriaId: "reformas", categoriaId: "hogar" },
  { id: "a7", titulo: "Peluquería a domicilio", descripcion: "Corte, color y peinado en tu casa. Productos profesionales sin sulfatos.", precioHora: 35, rating: 4.9, reviews: 187, ciudad: "Madrid", proveedor: "Nuria Salas", avatar: avatar("Nuria Salas", "#ec4899"), image: sub_peluqueria, subcategoriaId: "peluqueria", categoriaId: "belleza" },
  { id: "a8", titulo: "Manicura y pedicura semipermanente", descripcion: "Diseños personalizados, esmaltado en gel y nail art.", precioHora: 25, rating: 4.8, reviews: 144, ciudad: "Barcelona", proveedor: "Alba Pérez", avatar: avatar("Alba Pérez", "#6C5CE7"), image: sub_unas, subcategoriaId: "unas", categoriaId: "belleza" },
  { id: "a9", titulo: "Tratamientos faciales premium", descripcion: "Limpiezas, hidratación profunda y antiedad. Esteticista colegiada.", precioHora: 40, rating: 4.9, reviews: 88, ciudad: "Valencia", proveedor: "Sara Gil", avatar: avatar("Sara Gil", "#FFB800"), image: sub_facial, subcategoriaId: "facial", categoriaId: "belleza" },
  { id: "a10", titulo: "Masaje relajante y deportivo", descripcion: "Quiromasaje, descontracturante y drenaje linfático. Diplomado.", precioHora: 38, rating: 4.7, reviews: 65, ciudad: "Málaga", proveedor: "David Romero", avatar: avatar("David Romero", "#2ECC71"), image: sub_masajes, subcategoriaId: "masajes", categoriaId: "belleza" },
  { id: "a11", titulo: "Clases de inglés C1/C2", descripcion: "Preparación Cambridge y conversación con profesora nativa.", precioHora: 18, rating: 4.9, reviews: 96, ciudad: "Madrid", proveedor: "Emily Walker", avatar: avatar("Emily Walker", "#6C5CE7"), image: sub_idiomas, subcategoriaId: "idiomas", categoriaId: "clases" },
  { id: "a12", titulo: "Clases de guitarra y piano", descripcion: "Iniciación y nivel avanzado, online o presencial.", precioHora: 22, rating: 4.8, reviews: 41, ciudad: "Barcelona", proveedor: "Hugo Navarro", avatar: avatar("Hugo Navarro", "#f59e0b"), image: sub_musica, subcategoriaId: "musica", categoriaId: "clases" },
  { id: "a13", titulo: "Yoga personalizado", descripcion: "Vinyasa, hatha y meditación. Sesiones 1 a 1 a domicilio.", precioHora: 30, rating: 5.0, reviews: 73, ciudad: "Valencia", proveedor: "Patricia León", avatar: avatar("Patricia León", "#2ECC71"), image: sub_yoga, subcategoriaId: "yoga", categoriaId: "deporte" },
  { id: "a14", titulo: "Clases de pádel", descripcion: "Técnica y táctica para todos los niveles. Material incluido.", precioHora: 25, rating: 4.7, reviews: 58, ciudad: "Madrid", proveedor: "Marcos Soler", avatar: avatar("Marcos Soler", "#6C5CE7"), image: sub_padel, subcategoriaId: "padel", categoriaId: "deporte" },
  { id: "a15", titulo: "Paseador de perros de confianza", descripcion: "Paseos individuales o en grupo, recogida y entrega.", precioHora: 12, rating: 4.9, reviews: 212, ciudad: "Madrid", proveedor: "Lucía Fernández", avatar: avatar("Lucía Fernández", "#FFB800"), image: sub_paseador, subcategoriaId: "paseador", categoriaId: "mascotas" },
  { id: "a16", titulo: "Peluquería canina a domicilio", descripcion: "Baño, corte y arreglo de razas. Sin estrés para tu mascota.", precioHora: 28, rating: 4.8, reviews: 87, ciudad: "Sevilla", proveedor: "Andrea Cano", avatar: avatar("Andrea Cano", "#ec4899"), image: sub_pelumasc, subcategoriaId: "peluqueria_mascotas", categoriaId: "mascotas" },
  { id: "a17", titulo: "Canguro con experiencia", descripcion: "Cuidado de niños de 0 a 12 años. Apoyo escolar opcional.", precioHora: 14, rating: 4.9, reviews: 156, ciudad: "Madrid", proveedor: "Elena Marín", avatar: avatar("Elena Marín", "#6C5CE7"), image: sub_ninos, subcategoriaId: "ninos", categoriaId: "cuidado" },
  { id: "a18", titulo: "Cuidado de personas mayores", descripcion: "Acompañamiento, aseo y movilidad. Auxiliar de enfermería.", precioHora: 16, rating: 5.0, reviews: 64, ciudad: "Bilbao", proveedor: "Roberto Sanz", avatar: avatar("Roberto Sanz", "#2ECC71"), image: sub_ancianos, subcategoriaId: "ancianos", categoriaId: "cuidado" },
  { id: "a19", titulo: "Reparación de ordenadores", descripcion: "Mac y PC, software y hardware. Diagnóstico gratuito.", precioHora: 30, rating: 4.8, reviews: 102, ciudad: "Madrid", proveedor: "Daniel Vargas", avatar: avatar("Daniel Vargas", "#6C5CE7"), image: sub_info, subcategoriaId: "informatica", categoriaId: "otros" },
  { id: "a20", titulo: "Fotografía de eventos", descripcion: "Bodas, bautizos y books profesionales. Edición incluida.", precioHora: 60, rating: 4.9, reviews: 38, ciudad: "Barcelona", proveedor: "Clara Solano", avatar: avatar("Clara Solano", "#FFB800"), image: sub_foto, subcategoriaId: "foto", categoriaId: "otros" },
];

export type BudgetState = "pendiente" | "aceptado" | "rechazado" | "finalizado" | "aprobado";

export type ChatMessage =
  | { id: string; type: "text"; from: "me" | "them"; text: string; time: string }
  | { id: string; type: "budget"; from: "me" | "them"; precio: number; horas: number; descripcion: string; state: BudgetState; time: string };

export type Conversation = {
  id: string;
  anuncioId: string;
  proveedor: string;
  avatar: string;
  titulo: string;
  lastTime: string;
  unread: number;
  messages: ChatMessage[];
};

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "c1", anuncioId: "a1", proveedor: "Carlos Méndez", avatar: ANUNCIOS[0].avatar,
    titulo: "Fontanero profesional 24h", lastTime: "10:42", unread: 1,
    messages: [
      { id: "m1", type: "text", from: "them", text: "¡Hola! Soy Carlos, ¿en qué puedo ayudarte?", time: "10:30" },
      { id: "m2", type: "text", from: "me", text: "Hola, tengo una fuga bajo el fregadero. ¿Podrías venir hoy?", time: "10:35" },
      { id: "m3", type: "budget", from: "them", precio: 60, horas: 2, descripcion: "Revisión y reparación de fuga bajo fregadero", state: "pendiente", time: "10:42" },
    ],
  },
  {
    id: "c2", anuncioId: "a7", proveedor: "Nuria Salas", avatar: ANUNCIOS[6].avatar,
    titulo: "Peluquería a domicilio", lastTime: "Ayer", unread: 0,
    messages: [
      { id: "m1", type: "text", from: "them", text: "Disponible este sábado por la mañana 💇", time: "Ayer" },
    ],
  },
  {
    id: "c3", anuncioId: "a15", proveedor: "Lucía Fernández", avatar: ANUNCIOS[14].avatar,
    titulo: "Paseador de perros", lastTime: "Lun", unread: 0,
    messages: [
      { id: "m1", type: "text", from: "me", text: "¿Pasea por las tardes?", time: "Lun" },
      { id: "m2", type: "text", from: "them", text: "Sí, de 17 a 20h 🐶", time: "Lun" },
    ],
  },
];

export const ONBOARDING = [
  { title: "Encuentra profesionales de confianza", text: "Miles de proveedores verificados cerca de ti, listos para ayudarte." },
  { title: "Negocia en el chat", text: "Recibe presupuestos, acepta o rechaza ofertas, todo en una conversación." },
  { title: "Paga seguro con tu monedero", text: "Tu dinero se libera al profesional solo cuando apruebas el trabajo." },
];