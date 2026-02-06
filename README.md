# 🧗 ClimbTest - Progressive Web App

Test de autoevaluación para escaladores basado en el cuestionario de rendimiento en escalada.

## 📋 Características

- ✅ **30 preguntas** organizadas en 3 categorías: Mental, Técnica y Táctica, Físico
- 📊 **Análisis visual** con gráficos interactivos
- 📈 **Seguimiento temporal** de tu progreso
- 💾 **Almacenamiento local** - tus datos permanecen en tu dispositivo
- 📱 **Instalable** como app en Android/iOS
- 🔒 **Funciona offline** - no necesita conexión a internet
- 📥 **Exportación de datos** en formato JSON

## 🚀 Instalación

### Opción 1: GitHub Pages (Recomendada)

1. Crea un repositorio en GitHub llamado `climbtest`
2. Sube todos los archivos de este proyecto
3. Ve a Settings → Pages
4. Selecciona la rama `main` como source
5. Guarda y espera unos minutos
6. Tu app estará disponible en: `https://tu-usuario.github.io/climbtest`

### Opción 2: Servidor Local

```bash
# Usando Python
python3 -m http.server 8000

# O usando Node.js
npx http-server
```

Luego abre `http://localhost:8000` en tu navegador.

## 📱 Instalar como App en Android

1. Abre la web en Chrome
2. Toca el menú (⋮) 
3. Selecciona "Añadir a pantalla de inicio" o "Instalar app"
4. Confirma la instalación
5. ¡Listo! La app aparecerá en tu pantalla de inicio

## 📖 Cómo usar

### Realizar un Test

1. Ve a la pestaña **"Nuevo Test"**
2. Responde las 30 preguntas según tu experiencia reciente:
   - **0** = Casi siempre
   - **1** = A menudo
   - **2** = Más o menos la mitad de las veces
   - **3** = De vez en cuando
   - **4** = Raramente
   - **5** = Nunca
3. Pulsa **"Calcular Resultados"**

### Interpretar Resultados

- **Puntuaciones BAJAS** = Problemas frecuentes en esa área
- **Puntuaciones ALTAS** = Buen rendimiento en esa área
- Cada categoría tiene un máximo de **50 puntos**

**Ejemplo:**
- Mental: 15/50 → Área prioritaria de mejora
- Técnica: 35/50 → Buen nivel
- Físico: 40/50 → Fortaleza

### Ver Histórico

1. Ve a la pestaña **"Histórico"**
2. Visualiza la evolución de tus puntuaciones en el tiempo
3. Compara diferentes evaluaciones
4. Elimina registros antiguos si lo deseas

### Exportar Datos

1. Ve a **"Histórico"**
2. Pulsa **"📥 Exportar Datos"**
3. Se descargará un archivo JSON con todo tu histórico
4. Guarda este archivo como backup

## 🗂️ Estructura del Proyecto

```
climbtest/
├── index.html          # Página principal
├── styles.css          # Estilos de la aplicación
├── app.js             # Lógica principal
├── questions.js       # 30 preguntas del test
├── manifest.json      # Configuración PWA
├── sw.js             # Service Worker (offline)
├── icon-192.png      # Icono pequeño
├── icon-512.png      # Icono grande
└── README.md         # Esta documentación
```

## 💾 Almacenamiento de Datos

- Los datos se guardan en **localStorage** del navegador
- Permanecen en tu dispositivo (privacidad total)
- No se envían a ningún servidor
- Se mantienen incluso si cierras la app

**⚠️ Importante:** Si borras los datos del navegador o desinstalas la app, perderás el histórico. Usa la función de exportación regularmente.

## 🔧 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary: #2c5282;        /* Color principal */
    --primary-dark: #1a365d;   /* Color oscuro */
    --secondary: #4299e1;      /* Color secundario */
}
```

### Modificar Preguntas

Edita el array `QUESTIONS` en `questions.js`.

## 🌐 Navegadores Compatibles

- ✅ Chrome/Edge (Android/Desktop)
- ✅ Safari (iOS/macOS)
- ✅ Firefox (Android/Desktop)
- ✅ Samsung Internet

## 📚 Referencia del Test

Este test está basado en metodologías de evaluación del rendimiento en escalada deportiva, organizando las dificultades en tres categorías principales:

- **Mental**: Ansiedad, visualización, gestión del miedo
- **Técnica y Táctica**: Uso de pies, lectura de vías, eficiencia
- **Físico**: Resistencia, fuerza, recuperación

## 🐛 Solución de Problemas

**La app no se instala:**
- Verifica que estés usando HTTPS (GitHub Pages lo proporciona)
- Comprueba que el manifest.json esté accesible

**Los datos no se guardan:**
- Verifica que el navegador permita localStorage
- No uses modo incógnito

**Los gráficos no se muestran:**
- Verifica que Chart.js se haya cargado correctamente
- Comprueba la consola del navegador (F12)

## 📄 Licencia

Este proyecto es de código abierto. Siéntete libre de modificarlo y adaptarlo a tus necesidades.

## 👨‍💻 Desarrollador

Creado para seguimiento personal de progreso en escalada.

---

¡Buena escalada! 🧗‍♂️🧗‍♀️
