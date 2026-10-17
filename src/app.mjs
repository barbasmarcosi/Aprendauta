import { PHASES, createSequence, getExercise, checkAnswer, getSummary } from './engine.mjs';
import { diagnosePracticeAnswer } from './diagnostics.mjs';

const host = document.querySelector('#app');
const main = document.querySelector('#content');
let state = makeSession();

function makeSession(form = 'A') {
  return { form, exercises: createSequence(form), index: 0, attempts: 0, hintsShown: 0, submitted: false, correct: false, message: '', feedback: null, showAlternative: false, draft: '', records: [] };
}
function element(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}
function button(label, secondary, onClick) {
  const el = element('button', secondary ? 'secondary' : 'primary', label);
  el.type = 'button';
  el.addEventListener('click', onClick);
  return el;
}
function resetView() { host.replaceChildren(); }
function goTop() { main.focus({ preventScroll: true }); window.scrollTo(0, 0); }
/** Relaciona imagen, texto y concepto; solo se renderiza durante práctica. */
function renderVisual(visual) {
  const figure = element('figure', 'learning-visual');
  figure.setAttribute('aria-label', visual.alt);
  const intro = element('p', 'visual-heading', 'Pensalo de otra manera');
  const surface = element('div', visual.type === 'grid' ? 'hundred-grid' : visual.type === 'bar' ? 'percent-bar' : 'fraction-strip');
  surface.setAttribute('aria-hidden', 'true');
  if (visual.type === 'bar') {
    const discount = element('span', 'filled');
    discount.style.width = visual.numerator + '%';
    const rest = element('span', 'empty');
    rest.style.width = (visual.denominator - visual.numerator) + '%';
    surface.append(discount, rest);
  } else {
    for (let i = 0; i < visual.denominator; i++) {
      surface.append(element('span', i < visual.numerator ? 'filled' : 'empty'));
    }
  }
  const legend = element('figcaption', '', visual.caption);
  figure.append(intro, surface, legend);
  return figure;
}
function renderReasoning(exercise) {
  const section = element('section', 'reasoning-steps');
  section.append(element('h2', '', 'Entendé el procedimiento'));
  const steps = element('ol');
  for (const step of exercise.steps) steps.append(element('li', '', step));
  section.append(steps, element('p', 'reflection', exercise.reflection));
  return section;
}

function finishQuestion(exercise, isCorrect) {
  state.records.push({ id: exercise.id, phase: exercise.phase, correct: isCorrect,
    attempts: state.attempts, hintsUsed: state.hintsShown });
  state.submitted = true;
  state.correct = isCorrect;
  state.message = '';
  state.feedback = null;
  state.showAlternative = false;
  state.draft = '';
  showQuestion();
  goTop();
}

function welcome() {
  resetView();
  const section = element('section', 'welcome');
  const copy = element('div', 'hero-copy');
  copy.append(
    element('p', 'eyebrow', 'APRENDÉ CON CURIOSIDAD, NO DE MEMORIA'),
    element('h1', '', 'Las respuestas importan. Tu forma de pensar, más.'),
    element('p', 'lead', 'Una experiencia cortita para descubrir cómo funcionan los porcentajes. Lo más importante: poder resolver problemas por tu cuenta.'),
    button('Empezar a explorar →', false, () => { showQuestion(); goTop(); }),
    button('Para revisión: alternar formularios ' + (state.form === 'A' ? 'A → B' : 'B → A'), true, () => { state = makeSession(state.form === 'A' ? 'B' : 'A'); welcome(); }),
    element('p', 'care-note', '9 actividades · A tu ritmo · Sin cuentas ni datos guardados')
  );
  const art = element('div', 'hero-art');
  art.setAttribute('aria-hidden', 'true');
  art.append(element('span', 'art-spark', '✳'), element('span', 'art-percent', '%'));
  const card = element('div', 'art-card');
  card.append(element('span', 'art-kicker', 'TU RECORRIDO'), element('strong', '', 'Intentá.'),
    element('strong', '', 'Descubrí.'), element('strong', '', 'Resolvé.'), element('small', '', 'Cada idea cuenta.'));
  art.append(card);
  section.append(copy, art);
  const grid = element('section', 'how-grid');
  grid.setAttribute('aria-label', 'Cómo funciona');
  for (const [number, title, description] of [
    ['01', 'Descubrí tu punto de partida', 'Tres preguntas sin pistas. No es un examen.'],
    ['02', 'Aprendé con pistas', 'Probá estrategias y pedí ayuda si hace falta.'],
    ['03', 'Hacelo por tu cuenta', 'Terminá con desafíos nuevos sin ayuda automática.']
  ]) {
    const item = element('article');
    item.append(element('span', 'step-index', number), element('h2', '', title), element('p', '', description));
    grid.append(item);
  }
  host.append(section, grid, element('p', 'demonstrator-note',
    'Prototipo de investigación para revisión con personas adultas. Formularios A/B sin equivalencia validada. No apto todavía para uso infantil.'));
}

function showQuestion() {
  const exercise = getExercise(state.index, state.exercises);
  if (!exercise) { showSummary(); return; }
  resetView();
  const stage = PHASES.find(p => p.id === exercise.phase);
  const phaseNumber = PHASES.findIndex(p => p.id === stage.id);
  const layout = element('section', 'activity-layout');
  const journey = element('aside', 'journey');
  journey.setAttribute('aria-label', 'Etapas del recorrido');
  journey.append(element('p', 'eyebrow', 'TU RUTA DE APRENDIZAJE'), element('h2', '', 'Un paso a la vez.'));
  const list = element('ol', 'journey-list');
  PHASES.forEach((p, i) => {
    const item = element('li', i === phaseNumber ? 'active' : i < phaseNumber ? 'complete' : '');
    item.append(element('span', 'journey-number', i < phaseNumber ? '✓' : String(i + 1).padStart(2, '0')),
      element('span', 'journey-name', p.name));
    list.append(item);
  });
  journey.append(list, element('p', 'journey-reminder', 'No es una carrera. Tomate el tiempo de pensar.'));
  const workspace = element('div', 'workspace');
  const heading = element('div', 'workspace-top');
  heading.append(element('span', 'tag', 'Etapa ' + (phaseNumber + 1) + ' de 3'),
    element('span', 'question-count', 'Actividad ' + (state.index + 1) + ' de ' + state.exercises.length));
  const track = element('div', 'progress-track');
  track.setAttribute('role', 'progressbar');
  track.setAttribute('aria-label', 'Progreso del recorrido');
  track.setAttribute('aria-valuemin', '0');
  track.setAttribute('aria-valuemax', String(state.exercises.length));
  track.setAttribute('aria-valuenow', String(state.index));
  const progress = element('div');
  progress.style.width = (state.index / state.exercises.length * 100) + '%';
  track.append(progress);
  const card = element('article', 'question-card');
  card.append(element('p', 'eyebrow', stage.name), element('h1', '', exercise.prompt),
    element('p', 'phase-description', stage.description));
  if (state.submitted) {
    const result = element('div', 'result-message');
    result.setAttribute('role', 'status');
    result.append(element('strong', '', exercise.phase === 'practice' ?
      (state.correct ? '¡Bien razonado!' : 'Seguí explorando') : 'Respuesta registrada'),
      element('p', '', exercise.phase === 'practice' ? exercise.explanation :
        'Revisaremos las soluciones al final. Durante esta etapa no mostramos respuestas ni pistas.'));
    if (exercise.phase === 'practice') result.append(renderReasoning(exercise));
    card.append(result, button(state.index === state.exercises.length - 1 ? 'Ver mi recorrido →' : 'Continuar →', false, next));
  } else {
    const form = element('form');
    form.noValidate = true;
    const label = element('label', '', 'Tu respuesta' + (exercise.unit ? ' (' + exercise.unit + ')' : ''));
    label.htmlFor = 'answer';
    const inputGroup = element('div', 'answer-field');
    const input = element('input');
    input.id = 'answer';
    input.name = 'answer';
    input.type = 'text';
    input.inputMode = 'decimal';
    input.autocomplete = 'off';
    input.spellcheck = false;
    input.maxLength = 30;
    input.placeholder = 'Escribí un número';
    input.value = state.draft;
    input.addEventListener('input', () => { state.draft = input.value; });
    input.setAttribute('aria-describedby', 'answer-helper answer-feedback');
    inputGroup.append(input, element('span', '', exercise.unit));
    const feedback = element('p', 'feedback', state.message);
    feedback.id = 'answer-feedback';
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    const actions = element('div', 'answer-actions');
    const submit = button('Comprobar respuesta →', false, () => {});
    submit.type = 'submit';
    actions.append(submit);
    if (exercise.phase === 'practice' && state.hintsShown < exercise.hints.length) {
      actions.append(button('Necesito una pista', true, () => {
        state.hintsShown++;
        showQuestion();
        document.querySelector('#answer')?.focus();
      }));
    }
    if (exercise.phase === 'practice' && exercise.visual) card.append(renderVisual(exercise.visual));
    form.append(label, inputGroup);
    const helper = element('p', 'helper', 'Podés usar coma decimal. No uses puntos de miles.');
    helper.id = 'answer-helper';
    form.append(helper, feedback);
    if (exercise.phase === 'practice' && state.feedback) {
      const insight = element('section', 'diagnostic-support');
      insight.setAttribute('aria-label', 'Ayuda para revisar una posible confusión');
      insight.append(element('p', 'support-eyebrow', 'Una pista a partir de tu respuesta'),
        element('h2', '', state.feedback.title),
        element('p', '', state.feedback.message),
        element('p', 'support-prompt', state.feedback.prompt));
      if (state.showAlternative) {
        const alternate = element('div', 'alternate-strategy');
        alternate.append(element('strong', '', 'Otra forma de pensarlo'), element('p', '', state.feedback.alternative));
        insight.append(alternate);
      } else {
        insight.append(button('Explorar otra estrategia', true, () => {
          state.showAlternative = true;
          showQuestion();
          document.querySelector('#answer')?.focus();
        }));
      }
      form.append(insight);
    }
    if (state.hintsShown > 0 && exercise.hints) {
      const panel = element('div', 'hint-panel');
      exercise.hints.slice(0, state.hintsShown).forEach((hint, i) => panel.append(element('p', '', 'Pista ' + (i + 1) + '. ' + hint)));
      form.append(panel);
    }
    form.append(actions);
    form.addEventListener('submit', event => {
      event.preventDefault();
      const assessment = checkAnswer(exercise, input.value);
      if (!assessment.valid) {
        feedback.textContent = assessment.message;
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }
      state.draft = input.value;
      state.attempts++;
      if (exercise.phase === 'practice' && !assessment.correct && state.attempts < 2) {
        state.feedback = diagnosePracticeAnswer(exercise, assessment);
        state.showAlternative = false;
        state.message = 'Todavía no. Revisá la idea que aparece abajo y volvé a intentar.';
        showQuestion();
        document.querySelector('#answer')?.focus();
        return;
      }
      finishQuestion(exercise, assessment.correct);
    });
    card.append(form);
  }
  workspace.append(heading, track, card,
    element('p', 'learning-tip', exercise.phase === 'transfer' ?
      'Ahora resolvés sin pistas: lo valioso es lo que podés hacer por tu cuenta.' :
      'No importa ir rápido. Importa descubrir por qué funciona tu respuesta.'));
  layout.append(journey, workspace);
  host.append(layout);
}
function next() {
  state.index++;
  state.attempts = 0;
  state.hintsShown = 0;
  state.submitted = false;
  state.correct = false;
  state.message = '';
  state.feedback = null;
  state.showAlternative = false;
  state.draft = '';
  showQuestion();
  goTop();
}
function showSummary() {
  resetView();
  const summary = getSummary(state.records);
  const root = element('section', 'summary');
  root.append(element('p', 'eyebrow', 'FIN DEL RECORRIDO · COMIENZO DE TU CURIOSIDAD'),
    element('h1', '', 'Lo valioso es seguir aprendiendo.'),
    element('p', 'lead', 'Completaste nueve desafíos. Los formularios inicial y final evalúan las mismas habilidades con diferentes problemas, pero su equivalencia aún no está validada.'));
  const stats = element('div', 'score-grid');
  for (const [title, score, explanation] of [
    ['Punto de partida', summary.diagnosis, 'Respuestas iniciales sin pistas'],
    ['Práctica acompañada', summary.practice, 'Con la posibilidad de pedir ayuda'],
    ['Desafíos independientes', summary.transfer, 'Primer intento, sin pistas ni IA']
  ]) {
    const card = element('div', 'score-card');
    card.append(element('span', '', title), element('strong', '', score.correct + ' / ' + score.total),
      element('p', '', explanation));
    stats.append(card);
  }
  root.append(stats);
  const solutions = element('div', 'solutions');
  solutions.append(element('h2', '', 'Explorá las soluciones finales'), element('p', '', 'Una respuesta es más útil si entendés por qué.'));
  state.exercises.filter(x => x.phase === 'transfer').forEach(exercise => {
    const details = element('details');
    details.append(element('summary', '', exercise.prompt), element('p', '', exercise.explanation));
    solutions.append(details);
  });
  root.append(solutions,
    element('p', 'disclaimer', 'Importante: una sesión corta con problemas emparejados por diseño NO demuestra mejora, retención, equivalencia psicométrica ni impacto causal. No es una evaluación escolar.'),
    button('Volver a empezar ↗', false, () => { state = makeSession(state.form); welcome(); goTop(); }));
  host.append(root);
  goTop();
}

welcome();
