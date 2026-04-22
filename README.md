# Trivia Transformaciones Lineales - Documentación Modular v2.0

## 📁 Estructura de Archivos Modular

```
proyecto/
├── trivia-transformaciones-lineales_V2.html  # Archivo principal HTML
├── style.css                                  # Estilos CSS
├── questions.js                               # Banco de preguntas (45 preguntas)
├── utils.js                                   # Funciones de utilidad reutilizables
└── README.md                                  # Documentación
```

## 📋 Descripción de Cada Módulo

### `trivia-transformaciones-lineales_V2.html`
**Archivo principal - Lógica del juego**

Contiene:
- ✅ Estructura HTML de 4 pantallas (inicio, reglas, juego, resultados)
- ✅ Lógica principal del flujo del juego
- ✅ Variables globales del estado
- ✅ Funciones core: `startGame()`, `loadQuestion()`, `selectAnswer()`, `nextQuestion()`, `showResults()`
- ✅ Sistema de timer inteligente (1.5 minutos/pregunta)
- ✅ Carga de módulos externos: `<script src="questions.js">` y `<script src="utils.js">`

### `questions.js`
**Banco de preguntas - 45 preguntas estructuradas**

Clasificación en 6 bloques temáticos:

| Bloque | Tema | # Preguntas | Tópicos |
|--------|------|-------------|--------|
| 1 | Verificación de Linealidad | 12 | T(u+v), T(αu), propiedades |
| 2 | Clasificación | 6 | Isomorfismo, Mono, Epi, Auto |
| 3 | Núcleo e Imagen | 4 | ker(T), Im(T), Teorema Dimensión |
| 4 | Matrices Asociadas | 2 | Construcción y aplicación |
| 5 | NO Linealidad | 2 | Detección de no lineales |
| 6 | Composición | 1 | T ∘ S |
| **TOTAL** | | **45** | Cobertura completa |

**Características:**
- Variable global: `const allQuestions = [...]`
- Cada pregunta tiene: `question`, `options[]`, `correct`, `explanation`
- Se seleccionan 15 preguntas aleatorias por partida
- Nunca hay dos partidas idénticas

### `style.css`
**Estilos - Diseño responsivo y animaciones**

Componentes principales:
- 🎨 Variables CSS (colores, tamaños, tipografías)
- 📱 Diseño responsive (mobile, tablet, desktop)
- ⏱️ Timer visual con estados (normal → warning → danger)
- 📊 Barra de progreso enumerada (1, 2, 3...)
- ✨ Animaciones suaves y transiciones
- 🌈 Gradientes y estilos modernos

### `utils.js`
**Utilidades - Funciones reutilizables**

Categorías de funciones:

**Navegación (2 funciones):**
```javascript
showStart()      // Muestra pantalla de inicio
showRules()      // Muestra pantalla de reglas
```

**Array (1 función):**
```javascript
shuffleArray()   // Mezcla aleatoria de preguntas
```

**Tiempo (1 función):**
```javascript
formatTime()     // Convierte segundos → MM:SS
```

**Tracker/Progreso (2 funciones):**
```javascript
buildProgressTracker()   // Crea items numerados
updateProgressTracker()  // Actualiza a ✔️ o ✗
```

**Validación (3 funciones):**
```javascript
isGameReady()        // ¿Hay preguntas cargadas?
hasAnswered()        // ¿Se respondió?
isLastQuestion()     // ¿Es la última?
```

---

## 🎮 Características del Producto Final

### ⏱️ Timer Inteligente (1.5 minutos)
- 🟢 0:31 - 1:30 → Verde (normal)
- 🟡 0:11 - 0:30 → Amarillo (advertencia)
- 🔴 0:01 - 0:10 → Rojo con pulso (peligro)
- Respuesta automática incorrecta si expira

### 📊 Barra de Progreso Enumerada
- Ubicada al lado izquierdo (desktop) o arriba (mobile)
- Muestra números: 1, 2, 3, ..., 15
- ✔️ Verde = respuesta correcta
- ✗ Rojo = respuesta incorrecta
- Azul = pregunta actual

### 📈 Sistema de Puntuación
- 1 punto por respuesta correcta
- Máximo: 15 puntos
- Porcentaje de precisión
- Estadísticas de tiempo

### 📝 Retroalimentación
- Respuesta correcta/incorrecta inmediata
- Explicación detallada de cada pregunta
- Respuesta correcta destacada

---

## 🔧 Cómo Extender el Proyecto

### ➕ Agregar Nuevas Preguntas
**Archivo:** `questions.js`

```javascript
{
    question: "Tu pregunta aquí con símbolos matemáticos",
    options: [
        "Opción incorrecta 1",
        "Opción correcta ✓",
        "Opción incorrecta 2",
        "Opción incorrecta 3"
    ],
    correct: 1,  // Índice (0-3) de la respuesta correcta
    explanation: "Explicación detallada del procedimiento y respuesta"
}
```

### ➕ Agregar Nuevas Funciones Utilitarias
**Archivo:** `utils.js`

```javascript
// Agregar al final del archivo
function miNuevaFuncion() {
    // Tu lógica aquí
}
```

### ⚙️ Cambiar el Tiempo por Pregunta
**Archivo:** `trivia-transformaciones-lineales_V2.html` (línea ~475)

```javascript
const TIME_PER_QUESTION = 90;  // Cambiar valor en segundos
// 60 = 1 minuto
// 90 = 1.5 minutos (actual)
// 120 = 2 minutos
```

### ⚙️ Cambiar Cantidad de Preguntas
**Archivo:** `trivia-transformaciones-lineales_V2.html` (línea ~473)

```javascript
const QUESTIONS_PER_GAME = 15;  // Cambiar número
```

### 🎨 Personalizar Colores
**Archivo:** `style.css` (líneas 6-17)

```css
:root {
    --primary: #6366f1;           /* Azul púrpura principal */
    --primary-light: #818cf8;
    --primary-dark: #4f46e5;
    --secondary: #ec4899;
    --success: #10b981;           /* Verde */
    --error: #ef4444;             /* Rojo */
    --warning: #f59e0b;           /* Naranja */
    --bg: #f8fafc;
    --bg-secondary: #f1f5f9;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --border: #e2e8f0;
}
```

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Total de preguntas | 45 |
| Preguntas por partida | 15 (aleatorias) |
| Tiempo por pregunta | 90 segundos |
| Tiempo máximo total | ~22.5 minutos |
| Puntuación máxima | 15 puntos |
| Bloques temáticos | 6 |

---

## 📚 Contenidos Educativos Cubiertos

✅ Definición de transformaciones lineales  
✅ Verificación de linealidad (aditividad y homogeneidad)  
✅ Cálculo de núcleo e imagen  
✅ Teorema de la dimensión  
✅ Matrices asociadas  
✅ Clasificación (isomorfismo, monomorfismo, epimorfismo, automorfismo)  
✅ Composición de transformaciones  
✅ Detección de NO linealidad  

---

## 💡 Mejoras Futuras Recomendadas

1. **Modularización avanzada**
   - Crear `game.js` para lógica compleja
   - Crear `timer.js` para gestión del timer
   - Crear `results.js` para cálculos de estadísticas

2. **Funcionalidades**
   - Guardar histórico de partidas
   - Estadísticas por tema/bloque
   - Modo dificultad adaptativa
   - Explicaciones multimedia (gráficos, videos)

3. **Experiencia**
   - Tema oscuro
   - Múltiples idiomas
   - Certificados descargables

4. **Integración**
   - API REST para guardar resultados
   - Integración con LMS (Moodle, Canvas, Blackboard)
   - Sincronización con Google Classroom

---

## 🎓 Grupo 5 - Contenido Educativo

**Asignatura:** Cálculo II / Álgebra Lineal  
**Tema:** Transformaciones Lineales  
**Nivel:** Principiante a Intermedio

---

**Versión:** 2.0 (Modularizada)  
**Última actualización:** 21 de abril de 2026  
**Estado:** ✅ Producción

## 📊 Temas Cubiertos en el Trivia

### Conceptos Fundamentales
- Definición formal de transformación lineal
- Propiedades de linealidad: T(u+v) = T(u) + T(v), T(cv) = cT(v)

### Núcleo e Imagen
- Cálculo del núcleo (kernel) de una transformación
- Determinación de la imagen (rango) de T
- Relación entre vectores mapeados a cero

### Representación Matricial
- Matriz asociada a una transformación
- Vectores columna = transformación aplicada a vectores base
- Operaciones entre transformaciones (composición)

### Propiedades Avanzadas
- Inyectividad: condición ker(T) = {0}
- Sobreyectividad: Im(T) = W
- Teorema de Nulidad: dim(ker(T)) + dim(Im(T)) = dim(V)
- Isomorfismos y transformaciones invertibles

---

## 🚀 Cómo Usar la Aplicación

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet (opcional, ya que es una aplicación local)

### Pasos para Ejecutar

1. **Abrir el archivo HTML**:
   - Haz doble clic en `trivia-transformaciones-lineales.html`
   - O arrastra el archivo al navegador
   - O copia la ruta en la barra de direcciones del navegador

2. **Desde el menú principal**:
   - Click en "Ver Reglas" para leer las instrucciones
   - Click en "Comenzar Trivia" para iniciar

3. **Durante el juego**:
   - Selecciona una opción de respuesta
   - Lee la retroalimentación inmediata
   - Haz click en "Siguiente Pregunta" para continuar

4. **Al finalizar**:
   - Revisa tu puntuación final y estadísticas
   - "Intentar de Nuevo" para jugar nuevamente
   - "Menú Principal" para volver al inicio

---

## 📈 Interpretación de Resultados

| Puntuación | Interpretación |
|-----------|-----------------|
| 100% | 🌟 Dominas perfectamente los temas |
| 80-99% | 🎉 Excelente conocimiento |
| 60-79% | ✓ Buen trabajo, repasa conceptos |
| 40-59% | ⚠️ Necesitas estudiar más |
| <40% | 📚 Enfócate en conceptos básicos |

---

## 🎯 Evidencia de Alineación

### Relación Contenido-Implementación

#### 1. Definición de Transformaciones Lineales
- **Pregunta 1**: "¿Cuál es la definición correcta?"
- **Pregunta 8**: "¿Cuál NO es una transformación lineal?"
- **Explicación**: Verifica comprensión de T(0)=0 y linealidad

#### 2. Núcleo e Imagen
- **Preguntas 2, 3, 11, 14**: Cálculo y comprensión del núcleo e imagen
- **Explicación**: Aplicación de definiciones con ejemplos concretos

#### 3. Representación Matricial
- **Pregunta 4, 13**: Matriz asociada y su construcción
- **Explicación**: Vectores columna = T(vectores base)

#### 4. Propiedades Avanzadas
- **Preguntas 5-7, 12**: Teorema de Nulidad, inyectividad, sobreyectividad, isomorfismo
- **Explicación**: Conexión entre conceptos fundamentales

#### 5. Composición y Operaciones
- **Pregunta 9**: Composición de transformaciones
- **Explicación**: Aplicación de propiedades algebraicas

---

## 💡 Retroalimentación Pedagógica

Cada pregunta incluye:
- ✓ Confirmación instantánea si es correcta
- ✗ Explicación del concepto si es incorrecta
- 📐 Fundamento matemático detrás de la respuesta
- 🔄 Incentivo para reintentar y mejorar

---

## 🎨 Características Técnicas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño responsivo y animaciones suaves
- **JavaScript Puro**: Sin dependencias externas
- **Compatibilidad**: Funciona en todos los navegadores modernos
- **Responsive**: Adaptable a móviles, tablets y desktops

---

## 📱 Responsividad

La aplicación se adapta automáticamente a:
- 💻 Escritorios (1920px+)
- 💻 Laptops (1024-1920px)
- 📱 Tablets (600-1024px)
- 📱 Móviles (<600px)

---

## 🎓 Objetivos Cumplidos

✅ **10+ ítems interactivos**: 15 preguntas exhaustivas
✅ **Retroalimentación inmediata**: Explicaciones tras cada respuesta
✅ **Conceptos aplicados**: Ejemplos prácticos en ℝ², ℝ³
✅ **Dinámica lúdica**: Interfaz moderna, sistema de puntos, progreso visual
✅ **Reglas definidas**: Pantalla dedicada con instrucciones claras
✅ **Interfaz intuitiva**: Diseño limpio y navegación simple
✅ **Relación contenido-código**: Evidencia clara de implementación

---

## 📝 Notas de Uso

- No se requiere instalación
- No necesita conexión a internet
- Todos los datos se almacenan localmente
- Puedes jugar múltiples veces sin pérdida de datos
- El trivia es completamente anónimo

---

## 👨‍🎓 Información Académica

**Tema**: Transformaciones Lineales
**Curso**: Cálculo II / Álgebra Lineal
**Grupo**: 5
**Duración Aproximada**: 10-15 minutos por sesión
**Nivel**: Universitario (primeros semestres)

---

**¡Disfruta aprendiendo sobre transformaciones lineales!** 🚀
