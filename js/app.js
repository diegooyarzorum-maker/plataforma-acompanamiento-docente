document.addEventListener('DOMContentLoaded', () => {
  const demoButtons = document.querySelectorAll('[data-demo-message]');
  if (demoButtons.length) {

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.hidden = true;
  document.body.appendChild(toast);

  let timer;
  demoButtons.forEach((button) => {
    button.addEventListener('click', () => {
      clearTimeout(timer);
      toast.textContent = button.dataset.demoMessage;
      toast.hidden = false;
      timer = setTimeout(() => { toast.hidden = true; }, 3800);
    });
  }); }

  const quickCheck = document.querySelector('[data-single-question]');
  if (quickCheck) quickCheck.addEventListener('submit', (event) => {
    event.preventDefault(); const value = new FormData(quickCheck).get('check');
    const correct = quickCheck.dataset.correct || 'b';
    quickCheck.querySelector('.inline-feedback').textContent = !value ? 'Selecciona una alternativa antes de revisar.' : value === correct ? (quickCheck.dataset.success || '¡Correcto! Aplicaste el criterio central de esta unidad.') : (quickCheck.dataset.retry || 'Aún no. Vuelve a comparar las características de cada enfoque.');
  });

  const quiz = document.querySelector('#ecep-quiz'); if (!quiz) return;
  const questionSets = { bio: [
    ['Comprensión conceptual','¿Qué distingue al modelo biopsicosocial?',['Explica el desempeño solo desde el diagnóstico.','Comprende el funcionamiento como interacción entre factores individuales y contextuales.','Considera que todos requieren los mismos apoyos.','Reemplaza la observación pedagógica por información clínica.'],1],
    ['Comprensión conceptual','¿Cuál afirmación es coherente con este modelo?',['Las características individuales dejan de ser relevantes.','Toda dificultad se origina en el ambiente.','Una característica puede expresarse distinto según las condiciones de participación.','Los apoyos dependen solo del diagnóstico.'],2],
    ['Interpretación','Una estudiante participa más cuando anticipa la rutina con imágenes. ¿Qué permite interpretar?',['La respuesta depende también de los apoyos disponibles.','No necesita nuevos desafíos.','La dificultad desapareció definitivamente.','Las imágenes deben reemplazar toda instrucción oral.'],0],
    ['Interpretación','Un informe dice “no completa tareas porque presenta DEA”. ¿Qué falta?',['Una calificación más baja.','Información sobre contexto, demandas y apoyos usados.','Confirmar que la dificultad es permanente.','Comparar solo con el promedio.'],1],
    ['Aplicación','Valentina responde mejor a instrucciones orales y visuales. ¿Qué acción es coherente?',['Mantener solo instrucciones escritas.','Reducir todos los objetivos.','Combinar formatos y observar qué favorece autonomía y comprensión.','Separarla del trabajo grupal.'],2],
    ['Aplicación','Un estudiante resuelve con material concreto, pero se bloquea ante símbolos. ¿Qué harías?',['Concluir que no comprende matemática.','Planificar una transición entre representaciones y registrar su respuesta.','Eliminar los problemas.','Repetir ejercicios sin cambios.'],1],
    ['Aplicación','Una estudiante aporta por escrito, pero no habla en debates. ¿Qué análisis es más completo?',['No tiene ideas.','Solo es timidez.','Explorar factores personales, dinámica grupal y alternativas de comunicación.','Evaluar solo oralmente.'],2],
    ['Decisión pedagógica','Ante baja participación, ¿qué decisión refleja mejor el modelo?',['Asignar una etiqueta y mantener la planificación.','Cambiar todas las metas sin evidencia.','Ofrecer apoyos, observar la respuesta y ajustar la enseñanza.','Esperar que se adapte sola.'],2]
  ], evolution: [
    ['Comprensión conceptual','¿Qué caracteriza al enfoque homogeneizador?',['Reconoce múltiples formas de aprender.','Espera que el grupo avance de una manera uniforme.','Elimina las barreras del entorno.','Prioriza la participación en el aula común.'],1],
    ['Comprensión conceptual','¿Qué cambio representa el enfoque inclusivo?',['Traslada al estudiante a un espacio separado.','Busca que la persona se adapte sin modificar la escuela.','Transforma culturas, políticas y prácticas para responder a la diversidad.','Clasifica para enseñar según el déficit.'],2],
    ['Interpretación','Una escuela agrupa permanentemente al alumnado según diagnóstico y ofrece un currículo reducido. ¿Qué enfoque predomina?',['Déficit y categorización.','Inclusión.','Diversidad.','Diseño universal.'],0],
    ['Interpretación','Un estudiante asiste al aula común, pero debe realizar exactamente las mismas tareas sin apoyos. ¿Qué tensión se observa?',['Participación plena.','Presencia física sin transformación de las condiciones.','Eliminación de barreras.','Diversificación de la enseñanza.'],1],
    ['Aplicación','Un equipo afirma que Emilia debe “estar preparada” antes de participar con su curso. ¿Qué revisión corresponde?',['Mantenerla fuera hasta que alcance el promedio.','Preguntar qué apoyos y cambios permitirían su participación ahora.','Reducir sus oportunidades de interacción.','Aplicar una prueba para justificar la separación.'],1],
    ['Aplicación','La clase contempla distintas formas de acceder, participar y demostrar lo aprendido. ¿Qué enfoque expresa mejor?',['Homogeneizador.','Déficit.','Normalización entendida como asimilación.','Diversidad e inclusión.'],3],
    ['Aplicación','Un profesor detecta que una actividad excluye a quienes requieren más tiempo. ¿Qué acción refleja evolución hacia la inclusión?',['Atribuir el problema a los estudiantes.','Ofrecer tiempo flexible y revisar la demanda de la tarea.','Retirar a quienes no terminan.','Mantener la actividad para asegurar igualdad.'],1],
    ['Decisión pedagógica','¿Qué decisión es más coherente con una educación inclusiva?',['Diseñar primero para un estudiante promedio y adaptar al final.','Separar apoyos de la planificación del curso.','Planificar desde la diversidad y ajustar apoyos según evidencias de participación.','Usar el diagnóstico como único criterio para decidir.'],2]
  ], inclusion: [
    ['Comprensión conceptual','¿Qué es una barrera para el aprendizaje y la participación?',['Una condición fija del estudiante.','Una dificultad que surge de la interacción con condiciones del contexto.','Un diagnóstico que determina el rendimiento.','Una conducta que debe corregirse antes de participar.'],1],
    ['Comprensión conceptual','¿Qué describe mejor una necesidad de apoyo?',['Una etiqueta permanente.','Una razón para reducir siempre los objetivos.','El apoyo requerido para acceder, aprender o participar en una situación.','Una característica exclusiva de estudiantes con diagnóstico.'],2],
    ['Interpretación','La plataforma de lectura no admite lector de pantalla. ¿Dónde se ubica principalmente la barrera?',['En la capacidad del estudiante.','En el recurso tecnológico y su diseño.','En la familia.','En el objetivo de aprendizaje.'],1],
    ['Interpretación','Una familia migrante no comprende las comunicaciones escolares porque solo se envían con lenguaje técnico. ¿Qué análisis corresponde?',['Falta de interés familiar.','Una barrera comunicacional y cultural que la escuela puede modificar.','Una necesidad de diagnóstico.','Un problema ajeno a la enseñanza.'],1],
    ['Aplicación','Algunos estudiantes requieren más tiempo para organizar una respuesta escrita. ¿Qué estrategia diversificada es pertinente?',['Bajar la expectativa de aprendizaje.','Ofrecer tiempo flexible y apoyos para planificar, manteniendo el objetivo.','Excluir la producción escrita.','Evaluar solamente rapidez.'],1],
    ['Aplicación','En una actividad oral, una estudiante comunica mejor sus ideas mediante imágenes y palabras clave. ¿Qué harías?',['Aceptar distintas formas de expresión alineadas con el objetivo.','Exigir solo exposición oral.','Reemplazar el objetivo por uno más fácil.','Pedir que observe sin participar.'],0],
    ['Aplicación','El curso estudia relatos de distintas comunidades. ¿Qué acción fortalece inclusión y multiculturalidad?',['Presentar una cultura como norma.','Evitar diferencias para prevenir conflictos.','Incorporar voces diversas y revisar estereotipos con participación del grupo.','Asignar a estudiantes migrantes la tarea de representar a toda su cultura.'],2],
    ['Decisión pedagógica','Ante baja participación de varios estudiantes, ¿qué debería hacer primero el equipo?',['Derivarlos individualmente.','Revisar las barreras de la actividad, recoger sus perspectivas y diversificar apoyos.','Mantener la actividad para comparar resultados.','Reducir el currículo del grupo.'],1]
  ]};
  const questions = questionSets[quiz.dataset.quiz || 'bio'];
  const letters=['A','B','C','D'];
  quiz.innerHTML=questions.map((x,i)=>`<fieldset class="quiz-question"><legend><span>${i+1} de 8 · ${x[0]}</span>${x[1]}</legend>${x[2].map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}"><span><strong>${letters[j]}</strong>${o}</span></label>`).join('')}</fieldset>`).join('')+'<p class="quiz-error" role="alert" tabindex="-1" hidden>Responde todas las preguntas antes de finalizar.</p><button class="button green-button quiz-submit">Ver mi resultado</button>';
  quiz.addEventListener('submit',(event)=>{event.preventDefault();const data=new FormData(quiz);if(questions.some((_,i)=>!data.has(`q${i}`))){const e=quiz.querySelector('.quiz-error');e.hidden=false;e.focus();return;}let total=0;const stats={};questions.forEach((x,i)=>{const ok=Number(data.get(`q${i}`))===x[3];total+=ok;stats[x[0]]??={correct:0,total:0};stats[x[0]].total++;stats[x[0]].correct+=ok;});const sorted=Object.entries(stats).sort((a,b)=>b[1].correct/b[1].total-a[1].correct/a[1].total);document.querySelector('#result-percent').textContent=`${Math.round(total/8*100)}%`;document.querySelector('#result-score').textContent=`${total} de 8`;document.querySelector('#result-strength').textContent=sorted[0][0].toLowerCase();document.querySelector('#result-improve').textContent=sorted.at(-1)[0].toLowerCase();document.querySelector('#skill-breakdown').innerHTML=Object.entries(stats).map(([n,v])=>{const p=Math.round(v.correct/v.total*100);return `<article><div><strong>${n}</strong><span>${v.correct}/${v.total} · ${p}%</span></div><div class="mini-progress green" role="progressbar" aria-label="${n}: ${p} por ciento"><span style="width:${p}%"></span></div></article>`}).join('');const result=document.querySelector('#resultado');result.hidden=false;result.scrollIntoView({behavior:'smooth'});result.querySelector('h2').focus({preventScroll:true});});
  document.querySelector('#retry-quiz').addEventListener('click',()=>{quiz.reset();document.querySelector('#resultado').hidden=true;quiz.querySelector('.quiz-error').hidden=true;document.querySelector('#practica').scrollIntoView({behavior:'smooth'});});
});
