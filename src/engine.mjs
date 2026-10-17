/**
 * Aprendauta — unidad v1 de porcentajes.
 * Datos sintéticos, sin dependencias externas ni persistencia.
 * Los formularios A/B son candidatos emparejados POR DISEÑO, NO psicométricamente validados.
 */
const base = [
  { skill: 'equivalencias', unit: '%' },
  { skill: 'porcentaje-de-cantidad', unit: '' },
  { skill: 'descuento', unit: '$' },
];

// El mismo tipo de operación, pero diferentes enunciados y cantidades.
// La equivalencia pedagógica y de dificultad precisa revisión con docentes.
export const ASSESSMENT_FORMS = {
  A: [
    { id: 'a-equivalencias', prompt: 'De 8 canteros de una huerta, 6 tienen flores. ¿Qué porcentaje de los canteros tiene flores?', expected: 75, explanation: '6 ÷ 8 = 0,75. En 100 partes, serían 75: es el 75 %.' },
    { id: 'a-cantidad', prompt: 'Un club tiene 160 pelotas. El 25 % son de vóley. ¿Cuántas pelotas de vóley tiene?', expected: 40, explanation: '25 % es la cuarta parte. 160 ÷ 4 = 40 pelotas.' },
    { id: 'a-descuento', prompt: 'Una mochila cuesta $750. Con un descuento del 20 %, ¿cuál es el precio final?', expected: 600, explanation: 'El 20 % de 750 es 150. El precio final es 750 − 150 = 600.' },
  ],
  B: [
    { id: 'b-equivalencias', prompt: 'De 12 estaciones de un circuito, 9 están listas. ¿Qué porcentaje de las estaciones está listo?', expected: 75, explanation: '9 ÷ 12 = 0,75. Eso corresponde a 75 de cada 100, o 75 %.' },
    { id: 'b-cantidad', prompt: 'En una escuela hay 240 cuadernos. El 25 % tiene tapa verde. ¿Cuántos cuadernos tienen tapa verde?', expected: 60, explanation: 'Una cuarta parte equivale a 25 %. 240 ÷ 4 = 60 cuadernos.' },
    { id: 'b-descuento', prompt: 'Un juego cuesta $650. Con un descuento del 20 %, ¿cuál es el precio final?', expected: 520, explanation: 'El 20 % de 650 es 130. El precio final es 650 − 130 = 520.' },
  ],
};

const guided = [
  {
    id: 'p1', skill: 'porcentaje-de-cantidad', phase: 'practice', unit: 'libros',
    prompt: 'Una biblioteca prestó 150 libros. El 20 % son historietas. ¿Cuántas historietas prestó?', expected: 30,
    hints: ['El 20 % representa 20 de cada 100: equivale a una quinta parte.', 'Para encontrar una quinta parte, dividí 150 entre 5.'],
    visual: { type: 'grid', numerator: 20, denominator: 100, caption: 'Un 20 % es 20 de cada 100 partes iguales.', alt: 'Cuadrícula de 100 casilleros: 20 marcados y 80 sin marcar.' },
    steps: ['Identificá el total: 150 libros.', 'Interpretá 20 % como una quinta parte.', 'Dividí 150 entre 5: se prestaron 30 historietas.'],
    explanation: 'El 20 % de 150 = 150 ÷ 5 = 30 historietas.',
    reflection: '¿Por qué no tendría sentido que el resultado fuera mayor que 150?'
  },
  {
    id: 'p2', skill: 'equivalencias', phase: 'practice', unit: '%',
    prompt: 'En un grupo, 3 de cada 5 personas van en bicicleta. ¿Qué porcentaje representa?', expected: 60,
    hints: ['Pensá en 5 partes iguales; 3 son las que buscamos.', 'Convertí 3/5 en una cantidad de cada 100. Podés multiplicar numerador y denominador por 20.'],
    visual: { type: 'fraction', numerator: 3, denominator: 5, caption: 'Tres de cinco partes iguales representan la proporción 3/5.', alt: 'Cinco bloques iguales; tres resaltados y dos sin resaltar.' },
    steps: ['Representá la situación: 3 de cada 5 es 3/5.', 'Pasá el denominador a 100: 3/5 = 60/100.', '60 de cada 100 equivale al 60 %.'],
    explanation: '3 ÷ 5 = 0,6 y 0,6 × 100 = 60 %.',
    reflection: '¿Cómo cambiaría el porcentaje si fueran 4 de cada 5?'
  },
  {
    id: 'p3', skill: 'descuento', phase: 'practice', unit: '$',
    prompt: 'Un juego cuesta $400 y tiene un descuento del 20 %. ¿Cuánto pagás finalmente?', expected: 320,
    hints: ['El descuento es una parte que se resta del precio original.', 'Calculá una quinta parte de $400 y restala de $400.'],
    visual: { type: 'bar', numerator: 20, denominator: 100, caption: 'El precio original es el total: el descuento se resta, no es el precio a pagar.', alt: 'Barra del 100 %: 20 % como descuento y 80 % restante.' },
    steps: ['Empezá con el precio original: $400 (100 %).', 'El 20 % de $400 es $80 de descuento.', 'Restá el descuento: $400 − $80 = $320.'],
    explanation: '20 % de $400 = $80. Precio final: $400 − $80 = $320.',
    reflection: 'Si el precio final es $320, ¿por qué $80 no es lo que pagás?'
  },
];

export function createSequence(startForm = 'A') {
  if (!Object.hasOwn(ASSESSMENT_FORMS, startForm)) throw new RangeError('Formulario no disponible');
  const finalForm = startForm === 'A' ? 'B' : 'A';
  const toExercise = (form, phase) => ASSESSMENT_FORMS[form].map((item, i) => ({
    ...base[i], ...item, id: `${phase}-${item.id}`, phase,
    // No ayudas, visuales, pistas ni explicación paso a paso antes de enviar.
  }));
  return [...toExercise(startForm, 'diagnosis'), ...guided, ...toExercise(finalForm, 'transfer')];
}

export const EXERCISES = createSequence();

export const PHASES = Object.freeze([
  { id: 'diagnosis', name: 'Punto de partida', description: 'Tres desafíos sin pistas para explorar lo que ya sabés.' },
  { id: 'practice', name: 'Aprendé y practicá', description: 'Probá tus estrategias; podés pedir pistas y ver representaciones.' },
  { id: 'transfer', name: 'Lo resolvés vos', description: 'Tres problemas similares pero nuevos, sin pistas ni ayudas.' },
]);

export function parseNumericAnswer(input) {
  if (typeof input !== 'string') return null;
  const cleaned = input.trim().replace(/^\$\s*/, '').replace(/\s*%$/, '').trim();
  // Rechazamos puntos de miles ambiguos en español argentino.
  if (/^[+-]?[1-9]\d{0,2}\.\d{3}$/.test(cleaned)) return null;
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
export function getExercise(index, exercises = EXERCISES) { return exercises[index] ?? null; }
export function isIndependentPhase(phase) { return phase === 'diagnosis' || phase === 'transfer'; }

 
// La autopercepción no equivale a un diagnóstico ni a una medida de capacidad.
export const CONFIDENCE_LEVELS = Object.freeze([
  { id: 'low', label: 'Baja' },
  { id: 'medium', label: 'Media' },
  { id: 'high', label: 'Alta' },
]);
export const SKILL_NAMES = Object.freeze({
  'equivalencias': 'Fracciones y porcentajes',
  'porcentaje-de-cantidad': 'Porcentaje de una cantidad',
  'descuento': 'Descuentos y precio final',
});
export function confidenceLabel(id) {
  return CONFIDENCE_LEVELS.find(level => level.id === id)?.label ?? 'No indicada';
}
/** Fotografías por competencia, no puntajes de progreso ni diagnósticos. */
export function getSkillReview(records, exercises) {
  const independent = exercises.filter(item => isIndependentPhase(item.phase));
  const byId = new Map(records.map(record => [record.id, record]));
  const seen = new Set();
  return independent.filter(item => !seen.has(item.skill) && seen.add(item.skill)).map(item => {
    const byPhase = phase => {
      const match = independent.find(candidate => candidate.skill === item.skill && candidate.phase === phase);
      const record = match && byId.get(match.id);
      return record ? { correct: Boolean(record.correct), confidence: confidenceLabel(record.confidence) } : null;
    };
    return { skill: item.skill, name: SKILL_NAMES[item.skill] ?? item.skill,
      diagnosis: byPhase('diagnosis'), transfer: byPhase('transfer') };
  });
}
