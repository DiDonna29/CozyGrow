# 🌿 CozyGrow Calendar

**CozyGrow Calendar** es una aplicación de gestión de tareas y simulación de cultivos diseñada para entusiastas de los juegos de granja relajantes (estilo "cozy games"). Permite a los usuarios organizar su día a día real mientras ven crecer sus cultivos digitales en un entorno visualmente reconfortante.

## 🚀 Proceso de la Aplicación

La aplicación funciona como una SPA (Single Page Application) reactiva que sincroniza el tiempo real (simulado mediante un botón de "Dormir") con el progreso de los cultivos.

1.  **Selección de Estación**: El usuario puede navegar por el catálogo de semillas de cada estación.
2.  **Gestión de Tareas**: Un tablero central permite anotar pendientes diarios.
3.  **Ciclo de Cultivo**: Al "Plantar", se inicia un contador. Cada vez que el usuario hace clic en "Siguiente Día", el reloj interno avanza y los cultivos progresan visualmente.
4.  **Cosecha**: Una vez alcanzado el 100%, el cultivo se vuelve recolectable, simulando la recompensa por la constancia.

## 🛠️ Instalación y Configuración

La aplicación es compatible con los principales gestores de paquetes de Node.js.

### Requisitos previos
- Node.js 18.x o superior.

### Instalación con NPM
```bash
npm install
npm run dev
```

### Instalación con Yarn
```bash
yarn install
yarn dev
```

### Instalación con PNPM
```bash
pnpm install
pnpm dev
```

### Construcción para Producción
```bash
# Genera la carpeta .next optimizada
npm run build 
# o yarn build / pnpm build
```

## 🧠 Lógica del Sistema

- **Estado Relacional**: Los cultivos están vinculados estrictamente a su estación. El sistema filtra automáticamente las recomendaciones según el clima actual.
- **Persistencia**: Se utiliza `localStorage` para guardar el estado de la granja, el idioma y las tareas, permitiendo que el progreso no se pierda al cerrar el navegador.
- **Tematización Dinámica**: Implementa un sistema de variables CSS (HSL) que cambian drásticamente entre el modo "Día Soleado" y "Noche de Cabaña", afectando no solo colores sino también sombras y opacidades para mejorar la inmersión.
- **Responsividad Crítica**: Se han aplicado reglas de `overflow-hidden` y `break-words` para garantizar que en dispositivos móviles los números de días y nombres de cultivos no rompan la estética.

## 🔮 Futuro Escalable

Esta aplicación ha sido estructurada siguiendo las mejores prácticas de Next.js para permitir una expansión sencilla:

1.  **Integración con Firebase**: Actualmente el estado es local. El siguiente paso es conectar `Firebase Firestore` para sincronización en la nube y `Firebase Auth` para cuentas de usuario.
2.  **Economía de Granja**: Implementar un sistema de "Oro" real donde las cosechas se vendan para comprar semillas más raras.
3.  **Sistema GenAI**: Integrar Genkit para generar "Consejos de Granja" personalizados basados en el clima real del usuario o para crear descripciones de cultivos únicas.
4.  **Clima Dinámico**: Conexión con APIs de clima real para afectar el tiempo de crecimiento de los cultivos.

---
*Hecho con 🧡 para granjeros digitales.*
