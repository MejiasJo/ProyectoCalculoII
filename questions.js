// Banco de preguntas - Trivia Transformaciones Lineales
const allQuestions = [
    // ── BLOQUE 1: Verificación de linealidad (estilo Semana 10) ──
    {
        question: "Sea T: ℝ → ℝ definida por T(x) = 5x. Verifica T(u + v): si u = 2, v = 3, ¿cuál es T(u + v)?",
        options: [
            "T(2 + 3) = 5(5) = 25",
            "T(2 + 3) = 5 + 3 = 8",
            "T(2 + 3) = 2 + 3 = 5",
            "T(2 + 3) = 5·2 + 5·3 = 25, y T(u)+T(v) = 10+15 = 25 ✓"
        ],
        correct: 3,
        explanation: "T(u + v) = T(5) = 5·5 = 25. Por otro lado, T(u) + T(v) = T(2) + T(3) = 10 + 15 = 25. Como ambos resultados son iguales (25 = 25), se cumple la primera condición de linealidad."
    },
    {
        question: "Sea T: ℝ → ℝ con T(x) = 5x. Para verificar T(α·u) = α·T(u), si α = 4 y u = 3, ¿qué obtienes?",
        options: [
            "T(4·3) = T(12) = 60; y α·T(u) = 4·T(3) = 4·15 = 60 ✓",
            "T(4·3) = 4 + 3 = 7; α·T(u) = 4·3 = 12",
            "T(4·3) = T(12) = 12; α·T(u) = 4·5 = 20",
            "T(4·3) = 4·3·5 = 60; α·T(u) = 5·4·3 = 30"
        ],
        correct: 0,
        explanation: "T(α·u) = T(4·3) = T(12) = 5·12 = 60. Por otro lado, α·T(u) = 4·T(3) = 4·(5·3) = 4·15 = 60. Como 60 = 60, se cumple la segunda condición. Por lo tanto, T(x) = 5x ES una transformación lineal."
    },
    {
        question: "Sea T: ℝ² → ℝ² definida por T(x, y) = (2x, 3y). ¿Cuál es T(1, 0) + T(0, 1)?",
        options: [
            "(2, 0) + (0, 3) = (2, 3)",
            "(1, 0) + (0, 1) = (1, 1)",
            "(2, 3) + (2, 3) = (4, 6)",
            "(0, 0)"
        ],
        correct: 0,
        explanation: "T(1, 0) = (2·1, 3·0) = (2, 0). T(0, 1) = (2·0, 3·1) = (0, 3). Entonces T(1,0) + T(0,1) = (2,0) + (0,3) = (2, 3). Esto también coincide con T(1+0, 0+1) = T(1,1) = (2, 3), verificando aditividad."
    },
    {
        question: "T: ℝ² → ℝ² está dada por T(x, y) = (x + y, x − y). ¿Cuál es T(3, 1)?",
        options: [
            "(4, 2)",
            "(3, 1)",
            "(2, 4)",
            "(4, −2)"
        ],
        correct: 0,
        explanation: "Aplicamos la fórmula: T(3, 1) = (3 + 1, 3 − 1) = (4, 2). La primera componente suma las entradas y la segunda las resta. Ahora podemos construir la matriz: columna 1 = T(1,0) = (1,1), columna 2 = T(0,1) = (1,−1)."
    },
    {
        question: "Para T(x, y) = (x + y, x − y), ¿cuál es la matriz asociada [A]?",
        options: [
            "A = [[1, 0], [0, 1]]",
            "A = [[1, 1], [1, −1]]",
            "A = [[1, −1], [1, 1]]",
            "A = [[2, 0], [0, −2]]"
        ],
        correct: 1,
        explanation: "La matriz se construye aplicando T a los vectores base: T(1,0) = (1+0, 1−0) = (1,1) → primera columna. T(0,1) = (0+1, 0−1) = (1,−1) → segunda columna. Entonces A = [[1,1],[1,−1]]. Verifica: A·(3,1)ᵀ = (4,2) ✓"
    },
    {
        question: "Sea T: ℝ² → ℝ² con T(x, y) = (x + y, x − y). Para verificar T(α·u), con α = 2 y u = (1, 3), ¿cuál es T(2·(1,3))?",
        options: [
            "T(2, 6) = (8, −4)",
            "T(2, 6) = (2, 6)",
            "T(2, 6) = (4, −2)",
            "T(2, 6) = (6, 2)"
        ],
        correct: 0,
        explanation: "2·u = 2·(1,3) = (2,6). Entonces T(2,6) = (2+6, 2−6) = (8, −4). Por otro lado, α·T(u) = 2·T(1,3) = 2·(1+3, 1−3) = 2·(4,−2) = (8, −4). ¡Coinciden! Se cumple T(α·u) = α·T(u)."
    },
    {
        question: "Sea T: ℝ² → ℝ dada por T(x, y) = 2x − y. ¿Qué vectores (x, y) pertenecen al núcleo ker(T)?",
        options: [
            "Solo el origen (0, 0)",
            "Todos los (x, y) con x = 0",
            "Todos los (x, y) donde 2x = y, es decir Gen{(1, 2)}",
            "Todos los (x, y) con y = 0"
        ],
        correct: 2,
        explanation: "El ker(T) son los vectores que T lleva al 0. Resolvemos: 2x − y = 0 ⟹ y = 2x. Entonces los vectores tienen forma (x, 2x) = x·(1, 2). El núcleo es Gen{(1, 2)}, una línea que pasa por el origen. Dim(ker) = 1."
    },
    {
        question: "Para T(x, y) = 2x − y con dominio ℝ², ¿cuál es la imagen Im(T)?",
        options: [
            "Im(T) = {0}",
            "Im(T) = ℝ (todo escalar real es alcanzable)",
            "Im(T) = ℝ²",
            "Im(T) = Gen{(1, 2)}"
        ],
        correct: 1,
        explanation: "Im(T) es el conjunto de valores que T puede producir. Para cualquier escalar k ∈ ℝ, necesitamos (x, y) con 2x − y = k. Tomando x = k, y = k: 2k − k = k ✓. Por lo tanto T es sobreyectiva sobre ℝ, es decir Im(T) = ℝ. Además, por el Teorema de la Dimensión: dim(ker) + dim(Im) = 2 ⟹ 1 + 1 = 2 ✓"
    },
    {
        question: "Sea T: ℝ² → ℝ² dada por T(x, y) = (x + 1, y). Evalúa T(0, 0). ¿Qué concluyes sobre T?",
        options: [
            "T(0,0) = (0, 0), por lo tanto T podría ser lineal",
            "T(0,0) = (1, 0) ≠ (0, 0), por lo tanto T NO es lineal",
            "T(0,0) = (1, 1), T es lineal solo para vectores positivos",
            "T(0,0) = (0, 1), T es lineal pues la segunda componente se preserva"
        ],
        correct: 1,
        explanation: "T(0, 0) = (0+1, 0) = (1, 0). Una condición NECESARIA de linealidad es que T(0) = 0. Como T(0,0) = (1,0) ≠ (0,0), T no puede ser lineal. Esta es la prueba más rápida: si T no lleva el origen al origen, NO es transformación lineal."
    },
    {
        question: "Sea T: ℝ³ → ℝ² dada por T(x, y, z) = (x + y, y + z). Calcula T(1, 2, 3).",
        options: [
            "(3, 5)",
            "(1, 3)",
            "(6, 6)",
            "(2, 4)"
        ],
        correct: 0,
        explanation: "Aplicamos la fórmula: primera componente = x + y = 1 + 2 = 3. Segunda componente = y + z = 2 + 3 = 5. Entonces T(1, 2, 3) = (3, 5). La transformación toma un vector de ℝ³ y produce un vector de ℝ²."
    },
    {
        question: "Para T(x, y, z) = (x + y, y + z), ¿cuál es el ker(T)? Resuelve el sistema: x+y=0, y+z=0.",
        options: [
            "ker(T) = {(0,0,0)}",
            "ker(T) = Gen{(1, −1, 1)}",
            "ker(T) = Gen{(1, 0, 0)}",
            "ker(T) = ℝ³"
        ],
        correct: 1,
        explanation: "Sistema: x + y = 0 ⟹ x = −y. Y + z = 0 ⟹ z = −y. Tomando y = t libre: (x,y,z) = (−t, t, −t) = t·(−1, 1, −1). O equivalentemente Gen{(1,−1,1)}. Dim(ker) = 1 y Dim(Im) = 2. Verificamos: 1 + 2 = 3 = dim(ℝ³) ✓ (Teorema de la dimensión)"
    },
    {
        question: "Sea T: ℝ³ → ℝ² con T(x,y,z) = (x+y, y+z). ¿Cuál es la matriz A asociada a T?",
        options: [
            "A = [[1,1,0],[0,1,1]]",
            "A = [[1,0,1],[0,1,0]]",
            "A = [[1,1,1],[0,0,0]]",
            "A = [[1,0,0],[0,1,1]]"
        ],
        correct: 0,
        explanation: "Calculamos T en los vectores base de ℝ³: T(1,0,0) = (1,0) → col 1. T(0,1,0) = (1,1) → col 2. T(0,0,1) = (0,1) → col 3. Entonces A = [[1,1,0],[0,1,1]]. Verifica: A·(1,2,3)ᵀ = (1·1+1·2+0·3, 0·1+1·2+1·3) = (3,5) ✓"
    },
    {
        question: "Sea T: ℝ² → ℝ² con T(x, y) = (3x, 3y). ¿Es T lineal? Verifica T(u + v) con u=(1,0), v=(0,1).",
        options: [
            "T(1,1) = (3,3); T(1,0)+T(0,1) = (3,0)+(0,3) = (3,3) ✓ Sí es lineal",
            "T(1,1) = (3,3); T(1,0)+T(0,1) = (1,0)+(0,1) = (1,1) ✗ No es lineal",
            "T(1,1) = (1,1); T(1,0)+T(0,1) = (3,0)+(0,3) = (3,3) ✗ No es lineal",
            "T(1,1) = (6,6); T(1,0)+T(0,1) = (3,3) ✗ No es lineal"
        ],
        correct: 0,
        explanation: "T(u+v) = T(1,1) = (3·1, 3·1) = (3,3). T(u)+T(v) = T(1,0)+T(0,1) = (3,0)+(0,3) = (3,3). Como (3,3) = (3,3), se cumple aditividad. Además T(α·u) = T(α,0) = (3α,0) = α·(3,0) = α·T(u) ✓. T(x,y)=3(x,y) es una dilatación, que SÍ es transformación lineal."
    },
    {
        question: "Sea T: ℝ² → ℝ² dada por T(x, y) = (x − y, x − y). ¿Cuál es la imagen Im(T)?",
        options: [
            "Im(T) = ℝ²",
            "Im(T) = Gen{(1, 1)}, una línea diagonal",
            "Im(T) = {(0, 0)}",
            "Im(T) = Gen{(1, 0)}"
        ],
        correct: 1,
        explanation: "T(x,y) = (x−y, x−y). Observa que ambas componentes son iguales: si llamamos k = x−y, entonces T produce vectores de la forma (k, k) = k·(1,1). Por lo tanto Im(T) = Gen{(1,1)}, que es la recta diagonal y = x. La dimensión de la imagen es 1."
    },
    {
        question: "Sea T: ℝ² → ℝ² con T(x, y) = (x − y, x − y). Usando el Teorema de la Dimensión, ¿cuánto vale dim(ker(T))?",
        options: [
            "dim(ker) = 0, T es inyectiva",
            "dim(ker) = 2, T lleva todo a cero",
            "dim(ker) = 1, pues dim(ker) + dim(Im) = dim(dominio) ⟹ dim(ker) + 1 = 2",
            "dim(ker) = 3, no se puede aplicar el teorema"
        ],
        correct: 2,
        explanation: "Ya vimos que Im(T) = Gen{(1,1)}, entonces dim(Im) = 1. El Teorema de la Dimensión dice: dim(ker) + dim(Im) = dim(dominio). Aquí: dim(ker) + 1 = 2 ⟹ dim(ker) = 1. Comprobamos: ker(T) son los (x,y) con x−y=0, es decir y=x, o sea Gen{(1,1)}. Efectivamente dim(ker) = 1 ✓"
    },

    // ── BLOQUE 2: Clasificación (isomorfismo, monomorfismo, epimorfismo) ──
    {
        question: "T: M²ˣ² → P₃(x), con dim(dominio) = 4 e dim(codominio) = 4. Si T es biyectiva, ¿cómo se clasifica?",
        options: [
            "Es un epimorfismo (solo sobreyectiva)",
            "Es un monomorfismo (solo inyectiva)",
            "Es un isomorfismo y los conjuntos son isomorfos",
            "No se puede clasificar porque los espacios son distintos"
        ],
        correct: 2,
        explanation: "dim(M²ˣ²) = 4 = dim(P₃(x)). Cuando una transformación lineal biyectiva existe entre dos espacios de igual dimensión, T es un ISOMORFISMO y los conjuntos son isomorfos. Esto significa que M²ˣ² y P₃(x) son estructuralmente equivalentes."
    },
    {
        question: "T: ℝ² → M²ˣ³, con dim(dominio) = 2 y dim(codominio) = 6. Si T es inyectiva, ¿cómo se clasifica?",
        options: [
            "Isomorfismo, pues toda inyectiva entre espacios distintos es isomorfismo",
            "Epimorfismo, pues llega a todo M²ˣ³",
            "Monomorfismo, pues es inyectiva (dim dominio < dim codominio)",
            "Automorfismo, pues actúa entre matrices"
        ],
        correct: 2,
        explanation: "dim(ℝ²) = 2 < 6 = dim(M²ˣ³). Una transformación inyectiva entre espacios donde dim(dominio) < dim(codominio) es un MONOMORFISMO. No puede ser sobreyectiva (la imagen solo puede tener dim ≤ 2, no puede llenar todo ℝ⁶), así que tampoco es isomorfismo."
    },
    {
        question: "T: ℝ² → ℝ², dim = 2 = dim = 2. Si T es biyectiva, ¿cómo se clasifica?",
        options: [
            "Solo monomorfismo",
            "Solo epimorfismo",
            "Isomorfismo, endomorfismo y automorfismo a la vez",
            "Solo isomorfismo"
        ],
        correct: 2,
        explanation: "T: ℝ² → ℝ² actúa de un espacio en sí mismo → es un ENDOMORFISMO. Si además es biyectiva, es un ISOMORFISMO. Un endomorfismo biyectivo se llama AUTOMORFISMO. Los tres términos se aplican simultáneamente. Además, ℝ² y ℝ² son trivialmente isomorfos (el mismo espacio)."
    },
    {
        question: "T: P₅(x) → M²ˣ², con dim(dominio) = 6 y dim(codominio) = 4. Si T es sobreyectiva, ¿cómo se clasifica?",
        options: [
            "Monomorfismo, pues parte de un espacio de mayor dimensión",
            "Isomorfismo, pues toda sobreyectiva lo es",
            "Epimorfismo, pues es sobreyectiva (dim dominio > dim codominio)",
            "Automorfismo, pues actúa sobre polinomios"
        ],
        correct: 2,
        explanation: "dim(P₅(x)) = 6 > 4 = dim(M²ˣ²). Una transformación sobreyectiva con dim(dominio) > dim(codominio) es un EPIMORFISMO. No puede ser inyectiva (por el Teorema de la Dimensión: dim(ker) = 6 − 4 = 2 ≠ 0), así que el núcleo no es trivial."
    },
    {
        question: "T: P₃(x) = {0} → P₂(x), donde el dominio es solo el polinomio cero (dim = 1). Si T es inyectiva, ¿qué clasificación recibe?",
        options: [
            "Epimorfismo, pues llega a P₂(x)",
            "Monomorfismo, pues es inyectiva con dim dominio < dim codominio",
            "Isomorfismo, pues toda lineal en {0} lo es",
            "Automorfismo, pues actúa sobre polinomios"
        ],
        correct: 1,
        explanation: "dim({0}) = 1 < 3 = dim(P₂(x)). T inyectiva con dim(dominio) < dim(codominio) → MONOMORFISMO. La imagen de T es solo un subespacio de dimensión ≤ 1 dentro de P₂(x), por lo que no puede ser sobreyectiva."
    },
    {
        question: "T: M²ˣ¹ → ℝ², dim = 2 = dim = 2. Si es biyectiva, ¿son M²ˣ¹ y ℝ² isomorfos?",
        options: [
            "No, porque M²ˣ¹ tiene matrices y ℝ² tiene vectores",
            "Sí, porque tienen la misma dimensión y existe un isomorfismo entre ellos",
            "Solo si los escalares son los mismos",
            "No se puede determinar sin conocer la fórmula de T"
        ],
        correct: 1,
        explanation: "dim(M²ˣ¹) = 2 = dim(ℝ²). Como existe una transformación lineal biyectiva (isomorfismo) entre ellos, M²ˣ¹ y ℝ² son ISOMORFOS. Dos espacios vectoriales sobre el mismo campo son isomorfos si y solo si tienen la misma dimensión finita."
    },

    // ── BLOQUE 3: Núcleo e imagen (cálculo) ──
    {
        question: "Sea T: ℝ² → ℝ² dada por T(x, y) = (2x, 0). ¿Cuál es el ker(T)?",
        options: [
            "ker(T) = Gen{(1, 0)}",
            "ker(T) = Gen{(0, 1)} — todos los (0, y)",
            "ker(T) = {(0, 0)}",
            "ker(T) = ℝ²"
        ],
        correct: 1,
        explanation: "Resolvemos T(x, y) = (0, 0): (2x, 0) = (0, 0) ⟹ 2x = 0 ⟹ x = 0. y queda libre. Por lo tanto ker(T) = {(0, y) : y ∈ ℝ} = Gen{(0, 1)}. Dim(ker) = 1 y dim(Im) = 1. Verificamos: 1 + 1 = 2 ✓"
    },
    {
        question: "T: ℝ² → ℝ² con T(x, y) = (2x, 0). ¿Es T inyectiva, sobreyectiva, o ninguna?",
        options: [
            "Inyectiva, pues ker(T) = {(0,0)}",
            "Sobreyectiva, pues Im(T) = ℝ²",
            "Ninguna: ker(T) ≠ {0} y Im(T) ≠ ℝ²",
            "Biyectiva, pues actúa de ℝ² en ℝ²"
        ],
        correct: 2,
        explanation: "ker(T) = Gen{(0,1)} ≠ {0} ⟹ NO es inyectiva. Im(T) = {(2x,0) : x∈ℝ} = Gen{(1,0)} ≠ ℝ² ⟹ NO es sobreyectiva. T no es ni monomorfismo ni epimorfismo ni isomorfismo."
    },
    {
        question: "T: ℝ³ → ℝ² con T(x,y,z) = (x+y+z, x+y+z). ¿Cuál es la Im(T)?",
        options: [
            "Im(T) = ℝ²",
            "Im(T) = Gen{(1,1)}, una recta en ℝ²",
            "Im(T) = {(0,0)}",
            "Im(T) = Gen{(1,0), (0,1)}"
        ],
        correct: 1,
        explanation: "T produce (k, k) donde k = x+y+z. Todos los resultados son múltiplos del vector (1,1). Entonces Im(T) = Gen{(1,1)}, una recta. Dim(Im) = 1. Por el Teorema: dim(ker) = 3 − 1 = 2. El ker son los (x,y,z) con x+y+z = 0, un plano en ℝ³."
    },
    {
        question: "Para T: ℝ² → ℝ² definida por T(x, y) = (y, x) (intercambia componentes), ¿cuál es ker(T)?",
        options: [
            "ker(T) = Gen{(1, −1)}",
            "ker(T) = {(0, 0)} únicamente",
            "ker(T) = Gen{(1, 1)}",
            "ker(T) = ℝ²"
        ],
        correct: 1,
        explanation: "Resolvemos T(x,y) = (0,0): (y, x) = (0,0) ⟹ y = 0 y x = 0. Solo el vector cero. Entonces ker(T) = {(0,0)} y T es INYECTIVA. Como dim(Im) = 2 − 0 = 2 = dim(ℝ²), también es sobreyectiva. T es un ISOMORFISMO (automorfismo de ℝ²)."
    },

    // ── BLOQUE 4: Representación matricial ──
    {
        question: "Sea T: ℝ² → ℝ³ con T(x, y) = (x, x+y, y). ¿Cuál es la matriz A asociada?",
        options: [
            "A = [[1,0],[1,1],[0,1]]",
            "A = [[1,1],[0,1],[1,0]]",
            "A = [[1,0,0],[0,1,1]]",
            "A = [[1,1,0],[0,1,1],[0,0,1]]"
        ],
        correct: 0,
        explanation: "Aplicamos T a los vectores base: T(1,0) = (1,1,0) → primera columna. T(0,1) = (0,1,1) → segunda columna. Entonces A = [[1,0],[1,1],[0,1]] (matriz 3×2). Verifica: A·(2,3)ᵀ = (2, 2+3, 3) = (2,5,3). Comprueba: T(2,3) = (2, 2+3, 3) = (2,5,3) ✓"
    },
    {
        question: "La matriz A = [[1,1,0],[0,1,1]] representa T: ℝ³ → ℝ². ¿Cuánto vale T(2, −1, 3)?",
        options: [
            "(1, 2)",
            "(2, −1)",
            "(3, 2)",
            "(−1, 3)"
        ],
        correct: 0,
        explanation: "Multiplicamos A·(2,−1,3)ᵀ: fila 1: 1·2 + 1·(−1) + 0·3 = 2−1 = 1. Fila 2: 0·2 + 1·(−1) + 1·3 = −1+3 = 2. Resultado: (1, 2). También podemos verificar directamente: T(x,y,z) = (x+y, y+z) ⟹ T(2,−1,3) = (2+(−1), −1+3) = (1, 2) ✓"
    },

    // ── BLOQUE 5: Detección de NO linealidad ──
    {
        question: "T: ℝ² → ℝ² definida por T(x, y) = (x², y). ¿Es T una transformación lineal?",
        options: [
            "Sí, porque cada componente depende de las entradas",
            "No, porque T(2u) ≠ 2T(u): T(2·1,0) = T(2,0) = (4,0) ≠ 2·T(1,0) = 2·(1,0) = (2,0)",
            "Sí, porque T(0,0) = (0,0)",
            "No, porque T no es cuadrada"
        ],
        correct: 1,
        explanation: "Verificamos homogeneidad: T(2·(1,0)) = T(2,0) = (4, 0). Pero 2·T(1,0) = 2·(1,0) = (2,0). Como (4,0) ≠ (2,0), falla T(αu) = αT(u). La función x² NO es lineal. Solo funciones de la forma ax+by son lineales en ℝ²."
    },
    {
        question: "T: ℝ → ℝ dada por T(x) = x + 3. ¿Es T lineal?",
        options: [
            "Sí, porque es una función de x",
            "Sí, porque T(2) = 5 y T(3) = 6",
            "No, porque T(0) = 3 ≠ 0. La condición T(0) = 0 no se cumple",
            "Depende del valor de x"
        ],
        correct: 2,
        explanation: "T(0) = 0 + 3 = 3 ≠ 0. Una condición necesaria de linealidad es T(0) = 0. Como no se cumple, T(x) = x + 3 NO es lineal. Más aún: T(u+v) = (u+v)+3, pero T(u)+T(v) = (u+3)+(v+3) = u+v+6 ≠ u+v+3. Tampoco cumple aditividad."
    },

    // ── BLOQUE 6: Composición ──
    {
        question: "Sean T(x, y) = (x + y, 0) y S(x) = (x, 2x). ¿Cuál es (T ∘ S)(3)?",
        options: [
            "(T ∘ S)(3) = (9, 0)",
            "(T ∘ S)(3) = (3, 6)",
            "(T ∘ S)(3) = (6, 0)",
            "(T ∘ S)(3) = (3, 0)"
        ],
        correct: 0,
        explanation: "Primero S(3) = (3, 2·3) = (3, 6). Luego T(3, 6) = (3+6, 0) = (9, 0). Por lo tanto (T∘S)(3) = (9, 0). Verifica la fórmula general: (T∘S)(x) = T(x, 2x) = (x+2x, 0) = (3x, 0). Con x=3: (9, 0) ✓"
    }
];
