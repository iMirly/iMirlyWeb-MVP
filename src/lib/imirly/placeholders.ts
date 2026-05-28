// Image placeholder utility - generates colored SVG data URIs for missing images
export function getPlaceholderImage(label: string, color: string = "#6C5CE7"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="${color}" opacity="0.15"/>
    <rect x="150" y="90" width="100" height="80" rx="8" fill="${color}" opacity="0.3"/>
    <circle cx="200" cy="200" r="30" fill="${color}" opacity="0.3"/>
    <text x="200" y="250" font-family="Inter,sans-serif" font-size="14" fill="${color}" text-anchor="middle" opacity="0.6">${label}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Category colors for placeholders
export const CATEGORY_COLORS: Record<string, string> = {
  hogar: "#8B5CF6",
  belleza: "#EC4899",
  clases: "#F59E0B",
  deporte: "#10B981",
  mascotas: "#F97316",
  cuidado: "#3B82F6",
  otros: "#6B7280",
};

// Subcategory colors
export const SUBCATEGORY_COLORS: Record<string, string> = {
  fontaneria: "#8B5CF6", electricista: "#8B5CF6", limpieza: "#8B5CF6", jardineria: "#8B5CF6", pintura: "#8B5CF6", reformas: "#8B5CF6",
  peluqueria: "#EC4899", unas: "#EC4899", facial: "#EC4899", masajes: "#EC4899",
  idiomas: "#F59E0B", musica: "#F59E0B",
  yoga: "#10B981", padel: "#10B981",
  paseador: "#F97316", peluqueria_mascotas: "#F97316",
  ninos: "#3B82F6", ancianos: "#3B82F6",
  informatica: "#6B7280", foto: "#6B7280",
};
