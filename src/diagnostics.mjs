/**
 * Diagnostic support for a synthetic, teacher-review-only demonstration.
 * A number can suggest multiple strategies: rules report possible confusion,
 * never a fact about the student. Nothing is stored or inferred across sessions.
 * Rules are deliberately scoped to authored practice items, not assessments.
 */
import { checkAnswer } from './engine.mjs';

export const PRACTICE_PATTERNS = Object.freeze({
  "p1": [
    {
      "code": "rate-as-quantity",
      "observed": 20,
      "title": "¿Porcentaje o cantidad de libros?",
      "message": "Ese número coincide con el porcentaje del enunciado, pero te piden una cantidad de libros.",
      "prompt": "Si 20 de cada 100 es una quinta parte, ¿cómo encontrarías una quinta parte del total de libros?",
      "alternative": "Imaginá repartir todos los libros en cinco grupos del mismo tamaño. Un grupo representa el 20 %."
    },
    {
      "code": "whole-as-part",
      "observed": 150,
      "title": "¿El total o una parte?",
      "message": "Esa respuesta coincide con todos los libros. Acá te piden solo una parte.",
      "prompt": "¿Debería haber tantas historietas como libros en total?",
      "alternative": "Dibujá una barra que represente los 150 libros y dividila en cinco partes iguales."
    },
    {
      "code": "percent-as-multiplier",
      "observed": 3000,
      "title": "¿Qué significa el símbolo %?",
      "message": "Quizás multiplicaste por 20 como si fuera una cantidad entera.",
      "prompt": "¿Qué operación convierte «20 de cada 100» en un factor aplicable al total?",
      "alternative": "Antes de multiplicar, expresá 20 % como fracción sobre 100 o como una quinta parte."
    },
    {
      "code": "rate-as-decimal",
      "observed": 0.2,
      "title": "¿Proporción o cantidad?",
      "message": "Ese valor representa la proporción 20 %, no necesariamente la cantidad solicitada.",
      "prompt": "¿Cómo usarías esa proporción con el total de 150 libros?",
      "alternative": "El 0,2 dice qué parte corresponde a cada libro del total; ahora aplicalo a la cantidad total."
    }
  ],
  "p2": [
    {
      "code": "fraction-as-decimal",
      "observed": 0.6,
      "title": "¿Decimal o porcentaje?",
      "message": "Ese valor expresa la fracción en forma decimal. La pregunta pide un porcentaje.",
      "prompt": "Si tu resultado decimal es 0,6, ¿cómo lo escribirías «de cada 100»?",
      "alternative": "Una proporción decimal representa partes de una unidad; para expresar «de cada 100», multiplicá por 100."
    },
    {
      "code": "complement-instead-of-part",
      "observed": 40,
      "title": "¿Qué grupo estamos contando?",
      "message": "Ese porcentaje podría representar a quienes no van en bicicleta.",
      "prompt": "De los cinco bloques, ¿cuántos describen a las personas que sí van en bicicleta?",
      "alternative": "Señalá tres de cinco bloques y comparalos con los dos restantes: ¿cuál es la parte pedida?"
    },
    {
      "code": "numerator-alone",
      "observed": 3,
      "title": "¿Cantidad de personas o porcentaje?",
      "message": "Esa respuesta coincide con la cantidad mencionada, pero falta expresarla respecto del total.",
      "prompt": "¿Qué papel cumplen las cinco personas al transformar tres de cinco en porcentaje?",
      "alternative": "La proporción tiene dos partes: casos que cumplen la condición y total de casos."
    }
  ],
  "p3": [
    {
      "code": "discount-not-final-price",
      "observed": 80,
      "title": "¿Descuento o precio final?",
      "message": "Esa cantidad coincide con el descuento. Te piden cuánto se paga después de descontarlo.",
      "prompt": "Si el descuento se quita del precio original, ¿qué operación te falta?",
      "alternative": "Visualizá el precio completo como una barra: una sección es la rebaja y la otra es lo que se paga."
    },
    {
      "code": "original-price",
      "observed": 400,
      "title": "¿Antes o después del descuento?",
      "message": "Ese valor es el precio de partida, antes de aplicar el descuento.",
      "prompt": "¿El precio a pagar debería ser igual, menor o mayor que el original?",
      "alternative": "Un descuento reduce el total: comenzá por el 100 % y retirale el porcentaje rebajado."
    },
    {
      "code": "added-discount",
      "observed": 480,
      "title": "¿Rebaja o aumento?",
      "message": "Ese resultado podría aparecer si se suma la rebaja en lugar de restarla.",
      "prompt": "Cuando una tienda ofrece un descuento, ¿el precio final aumenta o disminuye?",
      "alternative": "El precio original representa el 100 %. Si se quita el 20 %, queda una porción menor."
    },
    {
      "code": "subtracting-percent-points",
      "observed": 380,
      "title": "¿Pesos o porcentaje?",
      "message": "Quizás restaste el número 20 directamente, sin calcular qué representa el 20 % del precio.",
      "prompt": "¿20 % equivale siempre a 20 pesos, o depende del precio de partida?",
      "alternative": "La rebaja es una fracción del precio: primero calculá esa parte y después restala."
    },
    {
      "code": "rate-not-amount",
      "observed": 20,
      "title": "¿Tasa o precio?",
      "message": "Ese número es el porcentaje anunciado, no el precio final.",
      "prompt": "¿Qué importe representa el 20 % de un precio de $400?",
      "alternative": "Para obtener el dinero descontado, aplicá la tasa al precio; luego averiguá cuánto queda."
    }
  ]
});

const EPS = 1e-8;

/**
 * Returns null for correct/invalid/assessment attempts. Returns an authored
 * hypothesis or a neutral prompt if an incorrect answer matches no pattern.
 */
export function diagnosePracticeAnswer(exercise, assessment) {
  if (exercise?.phase !== 'practice' || !assessment?.valid || assessment.correct) return null;
  const rule = (PRACTICE_PATTERNS[exercise.id] || []).find(item => Math.abs(item.observed - assessment.value) < EPS);
  if (rule) return { ...rule, kind: 'possible-pattern' };
  return {
    kind: 'unclassified', code: 'other', title: 'Probemos otra estrategia',
    message: 'Con ese resultado no podemos saber qué paso te llevó a la respuesta.',
    prompt: '¿Qué representa tu número? ¿Es el total, una parte o el valor final pedido?',
    alternative: 'Volvé al enunciado, identificá el total y escribí qué parte necesitás hallar. Después compará el tamaño esperado de tu respuesta.'
  };
}

/** Verify authored examples during test/build, not during learner interaction. */
export function validatePracticePatterns(exercises) {
  for (const exercise of exercises.filter(item => item.phase === 'practice')) {
    const rules = PRACTICE_PATTERNS[exercise.id] || [];
    if (rules.length === 0) throw new Error(`No patterns for ${exercise.id}`);
    const codes = new Set();
    const values = new Set();
    for (const rule of rules) {
      if (!Number.isFinite(rule.observed)) throw new Error(`Invalid observed value: ${exercise.id}`);
      if (codes.has(rule.code) || values.has(rule.observed)) throw new Error(`Duplicate pattern: ${exercise.id}`);
      codes.add(rule.code);
      values.add(rule.observed);
      if (checkAnswer(exercise, String(rule.observed)).correct) throw new Error(`Pattern matches correct answer: ${exercise.id}`);
      if (!rule.title || !rule.message || !rule.prompt || !rule.alternative) throw new Error(`Incomplete pattern: ${exercise.id}`);
    }
  }
  return true;
}
