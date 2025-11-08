/**
 * Script para generar imágenes placeholder por defecto (PNG)
 * Ejecutar con: node scripts/generate-default-images.js
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Crear el directorio si no existe
const defaultsDir = path.join(__dirname, "..", "assets", "images", "defaults");
if (!fs.existsSync(defaultsDir)) {
  fs.mkdirSync(defaultsDir, { recursive: true });
}

// Configuración para cada tipo de entidad
const entityConfigs = {
  heroe: {
    icon: "👤",
    color: "#3498DB",
    title: "Héroe",
  },
  hechizo: {
    icon: "✨",
    color: "#9B59B6",
    title: "Hechizo",
  },
  edificio: {
    icon: "🏛️",
    color: "#E67E22",
    title: "Edificio",
  },
  ayuntamiento: {
    icon: "🏰",
    color: "#E74C3C",
    title: "Ayuntamiento",
  },
  tropa: {
    icon: "⚔️",
    color: "#2ECC71",
    title: "Tropa",
  },
  animal: {
    icon: "🐾",
    color: "#F39C12",
    title: "Animal",
  },
};

// Función para convertir color hex a RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Generar PNG para cada entidad
async function generateImages() {
  const size = 512;

  for (const [key, config] of Object.entries(entityConfigs)) {
    const rgb = hexToRgb(config.color);
    const lightRgb = {
      r: Math.min(255, rgb.r + 30),
      g: Math.min(255, rgb.g + 30),
      b: Math.min(255, rgb.b + 30),
    };

    // Crear SVG
    const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${key}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${config.color};stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:${
        config.color
      };stop-opacity:0.05" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad-${key})" rx="64"/>
  <text x="${size / 2}" y="${
      size / 2 - 40
    }" font-family="Arial, sans-serif" font-size="180" fill="${
      config.color
    }" text-anchor="middle" dominant-baseline="central" opacity="0.9">${
      config.icon
    }</text>
  <text x="${size / 2}" y="${
      size / 2 + 100
    }" font-family="Arial, sans-serif" font-size="42" fill="${
      config.color
    }" text-anchor="middle" dominant-baseline="central" font-weight="bold" opacity="0.7">${
      config.title
    }</text>
</svg>`;

    // Convertir SVG a PNG
    const pngPath = path.join(defaultsDir, `${key}-default.png`);
    await sharp(Buffer.from(svg)).resize(size, size).png().toFile(pngPath);

    console.log(`✓ Generado: ${key}-default.png`);
  }

  console.log("\n✅ Todas las imágenes PNG generadas exitosamente!");
  console.log(`📁 Ubicación: ${defaultsDir}`);
}

// Ejecutar
generateImages().catch(console.error);
