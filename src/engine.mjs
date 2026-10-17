/**
 * Aprendauta · first synthetic demonstration unit.
 * Entirely deterministic, dependency-free and deliberately stateless.
 * No user identity, profiling, telemetry, generative AI or persistence.
 */
export const EXERCISES = Object.freeze([
  {
    id: 'd1', phase: 'diagnosis', skill: 'equivalencias',
    prompt: 'Una botella está llena hasta la cuarta parte. ¿Qué porcentaje de la botella está lleno?',
    expected: 25, unit: '%',
    explanation: 'Una cuarta parte equivale a 1 ÷ 4 = 0,25 = 25 %.'
  },
  {
    id: 'd2', phase: 'diagnosis', skill: 'porcentaje-de-cantidad',
    prompt: '¿Cuánto es el 30 % de 200?',
    expected: 60, unit: '',
    explanation: '30 % equivale a 0,30. Entonces 0,30 × 200 = 60.'
  },
  {
    id: 'p1', phase: 'practice', skill: 'porcentaje-de-cantidad',
    prompt: 'Una biblioteca presta 150 libros en una semana. El 20 % son historietas. ¿Cuántas historietas prestó?',
    expected: 30, unit: 'libros',
    hints: ['20 % representa una quinta parte de un total.', 'Para encontrar una quinta parte, dividí 150 entre 5.'],
    explanation: '20 % de 150 = 150 ÷ 5 = 30 historietas.'
  },
  {
    id: 'p2', phase: 'practice', skill: 'equivalencias',
    prompt: 'En un grupo, 3 de cada 5 personas viajan en bicicleta. ¿Qué porcentaje representa?',
    expected: 60, unit: '%',
    hints: ['Expresá la proporción como fracción: 3/5.', 'La fracción 3/5 equivale a 0,6. Para pasar a porcentaje, multiplicá por 100.'],
    explanation: '3 ÷ 5 = 0,6; 0,6 × 100 = 60 %.'
  },
  {
    id: 'p3', phase: 'practice', skill: 'descuento',
    prompt: 'Un juego cuesta $750 y tiene un descuento del 20 %. ¿Cuánto pagás finalmente?',
    expected: 600, unit: '$',
    hints: ['Primero calculá el 20 % de $750.', 'Restá el descuento al precio original. 20 % es una quinta parte.'],
    explanation: 'El descuento es $150; el precio final es $750 − $150 = $600.'
  },
  {
    id: 't1', phase: 'transfer', skill: 'descuento',
    prompt: 'Un libro cuesta $20.000. En una feria hacen un 15 % de descuento. ¿Cuál es el precio final? Escribí el número sin separador de miles.',
    expected: 17000, unit: '$',
    explanation: '15 % de $20.000 = $3.000. Se paga $20.000 − $3.000 = $17.000.'
  },
  {
    id: 't2', phase: 'transfer', skill: 'equivalencias',
    prompt: 'De 24 tareas de un proyecto, se completaron 18. ¿Qué porcentaje está terminado?',
    expected: 75, unit: '%',
    explanation: '18 ÷ 24 = 0,75 = 75 %.'
  },
  {
    id: 't3', phase: 'transfer', skill: 'variacion',
    prompt: 'Un taller reparaba 40 bicicletas por semana. Ahora repara 50. ¿En qué porcentaje aumentó la cantidad respecto de antes?',
    expected: 25, unit: '%',
    explanation: 'El aumento es 10. Tomando como base 40: 10 ÷ 40 × 100 = 25 %.'
  }
]);

export const PHASES = Object.freeze([
  { id: 'diagnosis', name: 'Punto de partida', description: 'Dos desafíos sin pistas para conocer tu punto de partida.' },
  { id: 'practice', name: 'Aprendé y practicá', description: 'Probá tus ideas; si lo necesitás, pedí pistas.' },
  { id: 'transfer', name: 'Lo resolvés vos', description: 'Tres problemas nuevos: sin pistas ni ayuda automática.' }
]);

export function parseNumericAnswer(input) {
  if (typeof input !== 'string') return null;
  const cleaned = input.trim().replace(/^\$\s*/, '').replace(/\s*%$/, '').trim();
  // Reject ambiguous groups such as 20.000 (decimal vs thousands in es-AR).
  if (/^[+-]?[1-9]\d{0,2}\.\d{3}$/.test(cleaned)) return null;
  // Deliberately reject other separators, exponents and expressions.
  if (!/^[+-]?(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(cleaned)) return null;
  const number = Number(cleaned.replace(',', '.'));
  return Number.isFinite(number) ? number : null;
}

export function checkAnswer(exercise, rawValue) {
  const value = parseNumericAnswer(rawValue);
  if (value === null) return { valid: false, correct: false, message: 'Escribí un número, por ejemplo 25 o 12,5. Sin puntos de miles.' };
  return { valid: true, correct: Math.abs(value - exercise.expected) < 1e-8, value };
}

export function getSummary(records) {
  const group = (phase) => {
    const matching = records.filter(record => record.phase === phase);
    return { correct: matching.filter(record => record.correct).length, total: matching.length };
  };
  return { diagnosis: group('diagnosis'), practice: group('practice'), transfer: group('transfer') };
}

export function getExercise(index) {
  return EXERCISES[index] ?? null;
}
