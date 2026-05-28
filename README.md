<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=rect&color=0:6c5ce7,100:3f51b5&height=180&section=header&text=iMirly%20Web%20MVP&fontSize=60&fontColor=fff&fontAlignY=40&desc=Demo%20Web%20del%20Marketplace%20de%20Servicios&descAlignY=70&descSize=18" width="100%"/>
</div>

<br>

<div align="center">
  <a href="https://imirly.github.io/iMirlyWeb-MVP/" target="_blank">
    <img src="https://img.shields.io/badge/Ver_Demo-6c5ce7?style=for-the-badge&logo=google-chrome&logoColor=white"/>
  </a>
  <a href="https://github.com/iMirly/iMirlyWeb-MVP" target="_blank">
    <img src="https://img.shields.io/badge/Código-3f51b5?style=for-the-badge&logo=github&logoColor=white"/>
  </a>
</div>

<br>

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=1000&color=6c5ce7&center=true&vCenter=true&width=600&lines=SPA+estática+con+Vite+%2B+React+19;Diseño+mobile-first+con+Tailwind+CSS;Chat+en+tiempo+real+simulado;Sistema+de+presupuestos+y+pagos;Desplegada+en+GitHub+Pages"/>
</div>

# 🚀 Sobre el Proyecto

**iMirly Web MVP** es una **demo web estática** del marketplace de servicios profesionales iMirly. Reproduce la experiencia de la app móvil en un entorno web, permitiendo navegar por categorías, visualizar anuncios, simular chats con presupuestos y gestionar un monedero virtual.

✨ Características principales:

- **Onboarding interactivo** con 3 slides explicativas
- **Autenticación simulada** (login/register con persistencia en localStorage)
- **Catálogo de servicios** organizado por categorías y subcategorías
- **Buscador en tiempo real** de anuncios
- **Chat con presupuestos dinámicos** (enviar, aceptar, rechazar, aprobar)
- **Sistema de favoritos** con persistencia
- **Publicación de anuncios** con formulario completo
- **Monedero virtual** con recargas y historial de transacciones
- **Diseño responsive** que simula un marco de móvil en desktop

# 🧠 Contexto del Proyecto

Este proyecto surge como **versión web de demostración** del TFC (Trabajo Fin de Ciclo) **iMirly**, desarrollado en el ciclo de **DAM (Desarrollo de Aplicaciones Multiplataforma)** en **NDT NewDigitalTalent · Granada**.

El objetivo era crear una **demo funcional y desplegable** que permitiera:

- Mostrar la interfaz y flujos de la app sin necesidad de compilar Android
- Compartir fácilmente mediante un enlace web
- Validar la experiencia de usuario con stakeholders

La app original nativa está desarrollada en **Kotlin + Jetpack Compose** con backend en **Java + Spring Boot**. Esta versión web es una **recreación frontend** que mantiene la estética y funcionalidades clave.

# 🖼️ Diseño del Proyecto

El diseño visual se adapta directamente del sistema de diseño de la app nativa:

- 🎨 **Paleta de colores** en OKLCH (morado `#6C5CE7`, verde éxito, rojo destructivo)
- 📐 **Tipografías** Inter (cuerpo) y Plus Jakarta Sans (títulos)
- 📱 **Mobile-first** con marco simulado en desktop (`max-w-[420px]`)
- ✨ **Gradientes y sombras** consistentes con la identidad de marca

> El objetivo fue mantener fidelidad visual al 100% con la app nativa.

# 🛠️ Tecnologías

<p align="center">
  <img src="https://img.shields.io/badge/React_19-6c5ce7?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3f51b5?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-6c5ce7?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-3f51b5?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/Lucide_Icons-6c5ce7?style=for-the-badge&logo=lucide&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub_Pages-3f51b5?style=for-the-badge&logo=github&logoColor=white"/>
</p>

**Frontend:** React 19 + TypeScript (JSX, hooks, Context API)  
**Estilos:** Tailwind CSS v4 (utility-first, OKLCH, custom variants)  
**Build:** Vite (rápido, HMR, optimizado para static sites)  
**Estado:** Context API + useReducer (sin Redux, ligero y suficiente para MVP)  
**Persistencia:** localStorage (usuario, favoritos, conversaciones, saldo)  
**Deploy:** GitHub Pages (SPA con hash routing)

# 🧩 Arquitectura del Proyecto

```bash
imirly-web/
│
├── index.html                 # Punto de entrada HTML
├── vite.config.ts             # Configuración de Vite
├── package.json               # Dependencias
├── tsconfig.json              # Configuración TypeScript
│
├── public/
│   └── 404.html               # Fallback SPA para GitHub Pages
│
├── src/
│   ├── main.tsx               # Montaje de React (createRoot)
│   ├── App.tsx                # Componente raíz (Provider + Frame)
│   ├── styles.css             # Tailwind + tema de colores OKLCH
│   │
│   ├── components/
│   │   ├── imirly/
│   │   │   ├── MobileFrame.tsx      # Marco de teléfono simulado
│   │   │   └── screens/
│   │   │       ├── AppFlow.tsx      # Gestor de flujo (onboarding → app)
│   │   │       ├── AuthScreens.tsx  # Onboarding, Login, Register
│   │   │       └── MainApp.tsx      # App principal (5 pestañas + navegación)
│   │   └── ui/                      # 45 componentes Shadcn/UI
│   │       ├── button.tsx, card.tsx, dialog.tsx, input.tsx...
│   │
│   ├── lib/
│   │   ├── imirly/
│   │   │   ├── data.ts        # Datos demo (categorías, anuncios, chats)
│   │   │   └── store.tsx      # Estado global (Context API + localStorage)
│   │   └── utils.ts           # Helper cn() (clsx + tailwind-merge)
│   │
│   ├── hooks/
│   │   └── use-mobile.tsx     # Hook para detectar viewport móvil
│   │
│   └── assets/
│       └── imirly/            # Imágenes de categorías, subcategorías, logo
│
└── .github/
    └── workflows/
        └── deploy.yml         # CI/CD para GitHub Pages
```

# 📱 Funcionalidades

### 🏠 Home
- Header personalizado con gradiente de marca
- Buscador en tiempo real (filtra por título y descripción)
- Grid de categorías con imágenes de fondo
- Scroll horizontal de anuncios en tendencia

### 🔍 Categorías y Subcategorías
- Navegación jerárquica: Categoría → Subcategoría → Lista de anuncios
- Tarjetas con imagen, título, ciudad, proveedor y precio/hora

### ❤️ Favoritos
- Guardar/quitar anuncios con el icono de corazón
- Persistencia en localStorage
- Lista compacta con miniatura y precio

### 💬 Chat con Presupuestos
- Conversaciones 1-a-1 con proveedores
- **Burbujas de texto** normales
- **Tarjetas de presupuesto** con precio, horas y descripción
- Estados del presupuesto: `pendiente` → `aceptado` → `aprobado` → `finalizado`
- Simulación de envío/recepción entre cliente y proveedor

### ➕ Publicar Anuncio
- Formulario completo: título, descripción, precio, ciudad
- Selector de categoría y subcategoría en cascada
- Publicación inmediata en el catálogo

### 👤 Perfil y Monedero
- Visualización de saldo disponible
- Recargas rápidas (+20€, +50€, +100€)
- Historial de transacciones con colores (verde/negativo)
- Acceso a favoritos, configuración, ayuda

# 🚀 Cómo usar

### Ver la demo online

<p align="center">
  <a href="https://imirly.github.io/iMirlyWeb-MVP/">
    <img src="https://img.shields.io/badge/🌐_Abrir_Demo-6c5ce7?style=for-the-badge&labelColor=3f51b5"/>
  </a>
</p>

### Ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/iMirly/iMirlyWeb-MVP.git

# Entrar al directorio
cd iMirlyWeb-MVP

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```

### Desplegar en GitHub Pages

1. Ve a **Settings → Pages → Source** y selecciona **GitHub Actions**
2. Haz push a la rama `main`
3. El workflow `.github/workflows/deploy.yml` compila y despliega automáticamente

# 📚 Lo que aprendí con este proyecto

- **Conversión de SSR a SPA estática**: Adaptar un proyecto TanStack Start (con servidor) a Vite + React puro para GitHub Pages
- **Hash-based routing**: Solución para SPA en hosting estático sin servidor
- **Context API + localStorage**: Gestión de estado global sin librerías externas
- **Tailwind CSS v4**: Nuevas features como `@theme inline` y colores OKLCH
- **CI/CD con GitHub Actions**: Automatización de build y deploy

# 🔗 Repositorios Relacionados

<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <h3>iMirly (App Nativa)</h3>
        <p>Kotlin + Jetpack Compose + Java Spring Boot</p>
        <a href="https://github.com/iMirly/iMirly">
          <img src="https://img.shields.io/badge/Ver_repositorio-6c5ce7?style=for-the-badge&logo=github&logoColor=white"/>
        </a>
      </td>
      <td align="center" width="50%">
        <h3>iMirlyAppBackend</h3>
        <p>API REST + Admin Panel</p>
        <a href="https://github.com/iMirly/iMirlyAppBackend">
          <img src="https://img.shields.io/badge/Ver_repositorio-3f51b5?style=for-the-badge&logo=github&logoColor=white"/>
        </a>
      </td>
    </tr>
  </table>
</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:6c5ce7,100:3f51b5&height=100&section=footer" width="100%"/>
</div>

<div align="center">
  <sub>NDT NewDigitalTalent · Granada · 2025</sub>
</div>
