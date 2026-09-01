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

  const pilotCodeElements=document.querySelectorAll('[data-pilot-code]');
  if(pilotCodeElements.length){let pilotCode=localStorage.getItem('ecepPilotCode');if(!pilotCode){const random=globalThis.crypto?.getRandomValues?crypto.getRandomValues(new Uint32Array(1))[0].toString(36):Math.random().toString(36).slice(2);pilotCode=`DEA-${random.slice(0,6).toUpperCase()}`;localStorage.setItem('ecepPilotCode',pilotCode);}pilotCodeElements.forEach(element=>{element.textContent=pilotCode;});}
  const pilotForm=document.querySelector('[data-pilot-form]');
  if(pilotForm)pilotForm.addEventListener('submit',(event)=>{event.preventDefault();const data=new FormData(pilotForm);const code=document.querySelector('[data-pilot-code]').textContent;const labels={experiencia:'Experiencia',conocimiento:'Conocimiento ECEP',claridad:'Claridad',navegacion:'Navegación',utilidad:'Utilidad',preguntas:'Pertinencia de preguntas',resultado:'Resultado y desglose',mas_util:'Lo más útil',mejorar:'A mejorar',agregaria:'Agregaría',tiempo:'Tiempo utilizado'};const lines=[`EVALUACIÓN PILOTO ECEP · ${code}`,'',...Object.entries(labels).map(([key,label])=>`${label}: ${data.get(key)||'Sin respuesta'}`),'','Datos de demostración · Sin información personal'];document.querySelector('[data-pilot-output]').value=lines.join('\n');const summary=document.querySelector('[data-pilot-summary]');summary.hidden=false;summary.scrollIntoView({behavior:'smooth'});summary.querySelector('h2').focus({preventScroll:true});});
  const copyPilot=document.querySelector('[data-copy-pilot]');
  if(copyPilot)copyPilot.addEventListener('click',async()=>{const output=document.querySelector('[data-pilot-output]');const status=document.querySelector('[data-copy-status]');try{await navigator.clipboard.writeText(output.value);status.textContent='Respuestas copiadas. Ya puedes compartirlas por el canal acordado.';}catch{output.select();status.textContent='Seleccionamos el texto. Usa Ctrl+C para copiarlo.';}});

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
  ], regulations: [
    ['Comprensión conceptual','¿Qué instrumento reconoce el derecho a un sistema de educación inclusivo en todos los niveles?',['Decreto 170.','Convención sobre los Derechos de las Personas con Discapacidad.','Decreto 67.','Reglamento interno.'],1],
    ['Comprensión conceptual','¿Cuál es el propósito central del Decreto 170?',['Regular toda evaluación escolar.','Fijar criterios para identificar estudiantes con NEE beneficiarios de subvención de educación especial.','Prohibir la selección escolar.','Definir adecuaciones curriculares.'],1],
    ['Interpretación','Un equipo necesita decidir cómo diversificar y, si es necesario, adecuar el currículo en educación básica. ¿Qué norma es directamente pertinente?',['Decreto 83 de 2015.','Ley 20.845 exclusivamente.','Decreto 170 exclusivamente.','PNCE 2024–2030 exclusivamente.'],0],
    ['Interpretación','Una escuela usa una única prueba y no permite ajustes coherentes con la enseñanza. ¿Qué norma orienta especialmente la evaluación para favorecer el progreso?',['Ley 20.422.','Decreto 67 de 2018.','Ley 20.845.','Convención, artículo sobre accesibilidad física únicamente.'],1],
    ['Aplicación','Antes de decidir una adecuación curricular individual, ¿qué corresponde según el Decreto 83?',['Aplicarla automáticamente por diagnóstico.','Implementar diversificación y evaluar si resulta insuficiente.','Eliminar objetivos básicos.','Esperar una calificación insuficiente.'],1],
    ['Aplicación','Una escuela niega matrícula por discapacidad. ¿Qué marco resulta vulnerado de manera directa?',['Solo su calendario escolar.','Igualdad de oportunidades, no discriminación e inclusión.','Únicamente las reglas de calificación.','Solo la planificación de aula.'],1],
    ['Aplicación','Ante conflictos reiterados, el equipo propone únicamente sanciones. ¿Qué aporta la PNCE 2024–2030?',['Un enfoque formativo, participativo, de cuidado colectivo e inclusión.','Un procedimiento para diagnosticar DEA.','Criterios de promoción anual.','Una tabla de adecuaciones curriculares.'],0],
    ['Decisión pedagógica','¿Cuál uso de la normativa es profesionalmente más adecuado?',['Memorizar números sin analizar la situación.','Aplicar una norma aislada aunque contradiga derechos.','Identificar el derecho o proceso implicado, articular normas pertinentes y justificar la decisión pedagógica.','Usar siempre el Decreto 170 para cualquier necesidad.'],2]
  ], decree83: [
    ['Comprensión conceptual','¿Qué debe ocurrir antes de considerar una adecuación curricular individual?',['Asignar un diagnóstico.','Implementar estrategias diversificadas y evaluar su efecto.','Reducir los objetivos del estudiante.','Separar al estudiante del curso.'],1],
    ['Comprensión conceptual','¿Cuál alternativa corresponde a una adecuación de acceso?',['Graduar la complejidad de un objetivo.','Eliminar un aprendizaje básico imprescindible.','Modificar el formato de presentación o respuesta sin cambiar el objetivo.','Cambiar el nivel educativo del objetivo.'],2],
    ['Interpretación','Una estudiante demuestra el mismo aprendizaje usando teclado en vez de escritura manual. ¿Qué tipo de decisión es?',['Adecuación de acceso.','Adecuación a un objetivo.','Eliminación de un objetivo.','Promoción automática.'],0],
    ['Interpretación','Tras apoyos diversificados, un estudiante mantiene un desfase significativo y el equipo gradúa la complejidad de un OA. ¿Qué representa?',['Una estrategia general para todo el curso.','Una adecuación curricular a los objetivos de aprendizaje.','Una eximición sin evaluación.','Una adecuación exclusivamente física.'],1],
    ['Aplicación','Un curso presenta dificultades para comprender instrucciones extensas. ¿Cuál es la primera respuesta más coherente?',['Crear de inmediato un plan individual para cada estudiante.','Diversificar las instrucciones con ejemplos, segmentos y apoyos visuales.','Eliminar el objetivo para todo el curso.','Solicitar diagnóstico antes de modificar la clase.'],1],
    ['Aplicación','Un estudiante comprende contenidos, pero no accede a un texto impreso por baja visión. ¿Qué medida mantiene el objetivo?',['Texto ampliado o formato digital accesible.','Eliminar la lectura del currículo.','Sustituir el objetivo por uno de nivel inferior.','Calificar solo la asistencia.'],0],
    ['Aplicación','¿Qué evidencia justifica mejor una adecuación curricular individual?',['La preferencia aislada de un adulto.','El diagnóstico por sí solo.','Evaluación amplia de necesidades y respuesta insuficiente a la diversificación implementada.','Una única calificación baja.'],2],
    ['Decisión pedagógica','¿Qué decisión respeta mejor el Decreto 83?',['Eliminar primero objetivos para evitar frustración.','Usar adecuaciones idénticas para una misma categoría diagnóstica.','Seleccionar el ajuste menos significativo que permita participación y progreso, monitorearlo y revisarlo.','Mantener una adecuación sin evaluar sus resultados.'],2]
  ], integration: [
    ['Comprensión conceptual','¿Qué idea resume mejor el modelo biopsicosocial?',['La dificultad pertenece exclusivamente al estudiante.','El funcionamiento surge de la interacción entre características personales y contexto.','El contexto explica por sí solo todo desempeño.','El diagnóstico determina la respuesta educativa.'],1,'Unidad 1'],
    ['Interpretación','Una estudiante mejora al recibir anticipación visual. ¿Qué interpretación es más completa?',['La respuesta evidencia interacción entre sus características y el apoyo.','La dificultad desapareció.','Solo necesita imágenes.','El objetivo debe reducirse.'],0,'Unidad 1'],
    ['Decisión pedagógica','¿Qué harías ante un desempeño que cambia según el formato de instrucción?',['Mantener un único formato.','Observar condiciones, diversificar apoyos y evaluar la respuesta.','Derivar antes de modificar.','Calificar el déficit.'],1,'Unidad 1'],
    ['Comprensión conceptual','¿Qué distingue inclusión de integración asimilacionista?',['La inclusión exige que el estudiante se adapte.','La inclusión transforma condiciones para asegurar participación y aprendizaje.','La integración siempre elimina barreras.','No existe diferencia pedagógica.'],1,'Unidad 2'],
    ['Interpretación','Un estudiante está en aula común, pero sin apoyos y con exigencia uniforme. ¿Qué refleja?',['Inclusión plena.','Presencia física sin transformación suficiente.','Diversificación universal.','Adecuación de acceso.'],1,'Unidad 2'],
    ['Aplicación','¿Qué acción expresa evolución hacia un enfoque inclusivo?',['Agrupar permanentemente por diagnóstico.','Diseñar desde la diversidad y revisar barreras.','Esperar preparación previa para participar.','Reducir expectativas por categoría.'],1,'Unidad 2'],
    ['Comprensión conceptual','¿Qué es una barrera para el aprendizaje y la participación?',['Una condición fija individual.','Una dificultad producida en la interacción con condiciones del contexto.','Un sinónimo de diagnóstico.','Una falta de esfuerzo.'],1,'Unidad 3'],
    ['Interpretación','Una comunicación técnica excluye a familias que no dominan ese registro. ¿Qué barrera predomina?',['Comunicacional y cultural.','Motora.','Diagnóstica.','Curricular individual.'],0,'Unidad 3'],
    ['Aplicación','¿Qué respuesta conserva el objetivo y amplía la participación?',['Una única forma de demostrar aprendizaje.','Alternativas de expresión alineadas con el propósito.','Eliminar el contenido complejo.','Separar a quienes requieren apoyo.'],1,'Unidad 3'],
    ['Comprensión conceptual','¿Qué norma regula especialmente evaluación, calificación y promoción?',['Decreto 170.','Decreto 67 de 2018.','Ley 20.845.','PNCE 2024–2030.'],1,'Unidad 4'],
    ['Interpretación','¿Qué norma consulta directamente un equipo para identificar beneficiarios de subvención de educación especial?',['Decreto 170.','Decreto 83 de 2015.','Decreto 67.','Ley 20.845.'],0,'Unidad 4'],
    ['Decisión pedagógica','¿Cómo debe usarse la normativa ante un caso complejo?',['Elegir un número de memoria.','Articular derechos, norma específica y evidencia pedagógica.','Aplicar siempre una sola norma.','Priorizar procedimientos sobre derechos.'],1,'Unidad 4'],
    ['Comprensión conceptual','¿Cuál es la secuencia correcta del Decreto 83?',['Adecuar, diagnosticar y luego diversificar.','Diversificar, evaluar la respuesta y adecuar si es necesario.','Eliminar objetivos y observar.','Calificar y luego apoyar.'],1,'Unidad 5'],
    ['Interpretación','Usar teclado manteniendo el objetivo de producción escrita corresponde a:',['Adecuación de acceso.','Eliminación del objetivo.','Promoción especial.','Adecuación por temporalización.'],0,'Unidad 5'],
    ['Aplicación','¿Qué sustenta una adecuación a los OA?',['Solo el diagnóstico.','Evaluación amplia, evidencia de apoyos previos insuficientes y monitoreo.','Una preferencia del docente.','Una prueba aislada.'],1,'Unidad 5']
  ], assessment: [
    ['Comprensión conceptual','¿Qué caracteriza una evaluación integral?',['Utiliza una sola prueba estandarizada.','Articula diversas fuentes, profesionales y contextos para orientar apoyos.','Busca únicamente confirmar un diagnóstico.','Se realiza sin participación de la familia.'],1],
    ['Comprensión conceptual','¿Cuál es su propósito educativo central?',['Clasificar al estudiante.','Justificar una calificación.','Identificar fortalezas, necesidades de apoyo y una respuesta educativa pertinente.','Comparar exclusivamente con el promedio.'],2],
    ['Interpretación','Un informe contiene puntajes, pero no describe desempeño en aula, contexto ni apoyos probados. ¿Qué falta?',['Más etiquetas clínicas.','Una comprensión contextual y funcional del aprendizaje.','Eliminar la entrevista familiar.','Una calificación final.'],1],
    ['Interpretación','La familia informa que el estudiante resuelve tareas cotidianas que no logra mostrar en una prueba. ¿Cómo usar ese antecedente?',['Descartarlo por no ser escolar.','Integrarlo como evidencia relevante y contrastarlo con otras fuentes.','Reemplazar toda evaluación profesional.','Usarlo solo si confirma el déficit.'],1],
    ['Aplicación','¿Qué conjunto entrega evidencia más completa?',['Una prueba aislada.','Observación, producciones, entrevistas, evaluación curricular y antecedentes pertinentes.','Solo promedio de notas.','Solo diagnóstico médico.'],1],
    ['Aplicación','Un estudiante progresa al recibir apoyos visuales. ¿Qué debe registrar el equipo?',['Solo que respondió bien.','Condiciones, tipo de apoyo, nivel de autonomía y cambios en participación y aprendizaje.','Únicamente la fecha.','La categoría diagnóstica.'],1],
    ['Aplicación','¿Cómo deben comunicarse los resultados a la familia?',['Con tecnicismos y puntajes exclusivamente.','De manera comprensible, incluyendo fortalezas, necesidades, apoyos y acciones del establecimiento.','Solo mediante el diagnóstico.','Sin mencionar el contexto escolar.'],1],
    ['Decisión pedagógica','Tras evaluar, ¿qué decisión es más pertinente?',['Aplicar el mismo apoyo a estudiantes con igual diagnóstico.','Planificar apoyos vinculados con la evidencia, responsables y seguimiento.','Archivar el informe sin modificar la enseñanza.','Esperar la reevaluación para actuar.'],1]
  ], psychoeducational: [
    ['Comprensión conceptual','¿Qué distingue la evaluación curricular de una medición aislada?',['Describe únicamente un puntaje.','Analiza el desempeño respecto del currículo, las tareas y condiciones de enseñanza.','Confirma por sí sola un diagnóstico.','Excluye la observación del aula.'],1],
    ['Comprensión conceptual','¿Qué significa triangular evidencia?',['Repetir tres veces la misma prueba.','Contrastar información de distintas fuentes, métodos y momentos.','Promediar todas las calificaciones.','Elegir el resultado más bajo.'],1],
    ['Interpretación','Un estudiante falla en una prueba descontextualizada, pero aplica la habilidad en tareas de aula con apoyos. ¿Qué corresponde concluir?',['No posee la habilidad.','La evidencia es divergente y deben analizarse las demandas y apoyos antes de concluir.','La prueba debe ignorarse siempre.','Debe reducirse el objetivo.'],1],
    ['Interpretación','Dos tareas evalúan comprensión, pero una exige mucha escritura. El desempeño cambia. ¿Qué variable debe examinarse?',['La demanda de respuesta escrita como posible interferencia.','Solo la motivación.','El diagnóstico médico.','La asistencia anual.'],0],
    ['Aplicación','¿Qué procedimiento es más pertinente para conocer estrategias lectoras?',['Solo registrar velocidad.','Combinar lectura, preguntas, verbalización de estrategias y análisis de errores.','Aplicar una encuesta familiar únicamente.','Revisar la nota final.'],1],
    ['Aplicación','Antes de aplicar un instrumento, el profesional debe verificar principalmente:',['Que sea el más corto.','Su propósito, pertinencia, condiciones de aplicación y límites interpretativos.','Que produzca un diagnóstico.','Que todos obtengan resultados comparables sin ajustes.'],1],
    ['Aplicación','¿Qué redacción interpreta evidencia con mayor rigor?',['No puede aprender fracciones.','En tareas simbólicas sin apoyo comete errores de equivalencia; con representación visual identifica relaciones y explica su estrategia.','Tiene bajo rendimiento general.','Su diagnóstico explica los errores.'],1],
    ['Decisión pedagógica','La evidencia muestra una barrera de formato, no del objetivo. ¿Qué decisión corresponde?',['Modificar inmediatamente el OA.','Ajustar el acceso o la respuesta y volver a recoger evidencia del mismo aprendizaje.','Suspender la evaluación.','Mantener el formato para comparar.'],1]
  ], deaIdentification: [
    ['Comprensión conceptual','¿Qué rasgo es necesario considerar al evaluar una posible DEA?',['Una dificultad aislada en cualquier asignatura.','Dificultad significativa y persistente en lectura, lectura-escritura o matemática pese a medidas pedagógicas pertinentes.','Una calificación insuficiente.','La preferencia por apoyos visuales.'],1],
    ['Comprensión conceptual','¿Por qué es necesario el diagnóstico diferencial?',['Para encontrar más etiquetas.','Para examinar si el desempeño se explica mejor por factores sensoriales, intelectuales, emocionales, ambientales o de enseñanza.','Para reemplazar la evaluación curricular.','Para excluir a la familia.'],1],
    ['Interpretación','Un curso completo presenta bajo desempeño tras meses sin enseñanza sistemática de lectura. ¿Qué interpretación es prioritaria?',['Todos presentan DEA.','Debe revisarse la oportunidad y calidad de enseñanza antes de atribuir dificultades específicas individuales.','Se confirma una dificultad crónica.','Basta una prueba estandarizada.'],1],
    ['Interpretación','Una estudiante mejora rápidamente con enseñanza explícita y práctica guiada. ¿Qué indica esta respuesta?',['Confirma necesariamente DEA.','La dificultad era inmodificable.','La respuesta al apoyo es evidencia relevante que obliga a revisar hipótesis antes de diagnosticar.','Debe suspenderse el apoyo.'],2],
    ['Aplicación','¿Qué antecedente demuestra mejor persistencia?',['Una prueba baja.','Registros longitudinales de progreso bajo medidas pedagógicas pertinentes y monitoreadas.','La opinión aislada de un adulto.','Una ausencia escolar.'],1],
    ['Aplicación','Antes de derivar, el equipo detecta dificultades lectoras. ¿Qué acción corresponde?',['Esperar sin intervenir.','Implementar enseñanza diversificada, apoyo focalizado y monitoreo continuo, documentando la respuesta.','Asignar diagnóstico provisorio.','Reducir los objetivos.'],1],
    ['Aplicación','En la evaluación aparecen dificultades y antecedentes de visión no corregida. ¿Qué procede?',['Ignorar el antecedente.','Concluir DEA por los puntajes.','Asegurar evaluación de salud y analizar cuánto explica el acceso visual antes de concluir.','Aplicar más tareas impresas.'],2],
    ['Decisión pedagógica','¿Cuál decisión es más rigurosa ante evidencia todavía ambigua?',['Confirmar DEA para acceder rápido a recursos.','Mantener apoyos, ampliar evidencia interdisciplinaria y contrastar explicaciones alternativas.','Retirar apoyos hasta tener diagnóstico.','Usar solo el resultado más bajo.'],1]
  ], supportPlanning: [
    ['Comprensión conceptual','¿Qué función cumple un Plan de Apoyo Individual (PAI)?',['Registrar solo el diagnóstico.','Organizar apoyos, responsables y ajustes derivados de la evaluación integral.','Reemplazar la planificación del curso.','Modificar siempre los OA.'],1],
    ['Comprensión conceptual','¿Cuándo corresponde elaborar un PACI?',['Para todo estudiante que recibe apoyo.','Cuando la evaluación determina adecuaciones curriculares individuales que deben registrarse y monitorearse.','Ante cualquier estrategia diversificada del curso.','Solo por solicitud familiar.'],1],
    ['Interpretación','Un plan dice “mejorar lectura” sin acción, responsable ni indicador. ¿Cuál es su principal debilidad?',['Tiene demasiada información.','No permite implementar ni evaluar el apoyo.','Debe incluir un diagnóstico nuevo.','Necesita reducir objetivos.'],1],
    ['Interpretación','El apoyo mejora precisión, pero el estudiante sigue dependiendo totalmente del adulto. ¿Qué debe analizarse?',['Solo mantenerlo.','Eficacia y también autonomía, intensidad y posibilidad de retirar ayudas gradualmente.','Cambiar el diagnóstico.','Aumentar todas las ayudas.'],1],
    ['Aplicación','¿Cuál objetivo de apoyo es más observable?',['Fortalecer comprensión.','En ocho semanas, identificará ideas centrales usando organizador visual con ayuda gradualmente decreciente en 4 de 5 textos.','Mejorar mucho.','Trabajar lectura semanalmente.'],1],
    ['Aplicación','¿Qué indicador informa mejor sobre participación?',['Cantidad de sesiones realizadas.','Frecuencia y autonomía con que inicia, sostiene y completa la tarea en aula.','Horas contratadas del profesional.','Número de documentos archivados.'],1],
    ['Aplicación','Un apoyo no produce progreso tras el periodo acordado. ¿Qué corresponde?',['Mantenerlo indefinidamente.','Revisar fidelidad de implementación, barreras, intensidad y evidencia; luego ajustar la hipótesis o acción.','Responsabilizar al estudiante.','Cerrar el plan.'],1],
    ['Decisión pedagógica','¿Qué organización favorece más la inclusión?',['Apoyos desconectados del aula y del OA.','Planificación colaborativa, apoyos en contextos pertinentes y responsabilidades compartidas.','Intervención exclusiva del especialista.','Decisiones sin estudiante ni familia.'],1]
  ], collaboration: [
    ['Comprensión conceptual','¿Qué caracteriza un trabajo colaborativo efectivo?',['Repartir tareas sin propósito común.','Construir objetivos compartidos, roles complementarios y decisiones basadas en evidencia.','Derivar todas las decisiones al especialista.','Realizar reuniones frecuentes sin seguimiento.'],1],
    ['Comprensión conceptual','¿Cómo debe comunicarse un resultado de evaluación a la familia?',['Solo con términos técnicos.','De forma comprensible, respetuosa y orientada a fortalezas, necesidades, apoyos y acciones.','Únicamente mediante puntajes.','Sin permitir preguntas.'],1],
    ['Interpretación','Docente y especialista trabajan con el mismo estudiante, pero usan objetivos y apoyos distintos sin comunicarse. ¿Qué problema existe?',['Exceso de inclusión.','Fragmentación que dificulta coherencia y seguimiento.','Demasiada participación familiar.','Falta de diagnóstico médico.'],1],
    ['Interpretación','En una reunión se informa un plan ya decidido y se pide a la familia firmar. ¿Qué falta?',['Más formularios.','Participación auténtica en la comprensión y toma de decisiones.','Una prueba adicional.','Reducir la duración de la reunión.'],1],
    ['Aplicación','¿Qué agenda favorece una reunión de equipo útil?',['Revisar etiquetas y distribuir documentos.','Analizar evidencia, priorizar una necesidad, acordar acciones, responsables, indicadores y fecha de revisión.','Conversar sin registrar acuerdos.','Planificar apoyos fuera del aula únicamente.'],1],
    ['Aplicación','Un estudiante señala que un apoyo lo hace sentirse expuesto. ¿Qué corresponde?',['Ignorarlo porque el apoyo funciona.','Incorporar su perspectiva y rediseñar una alternativa efectiva y menos estigmatizante.','Retirar todo apoyo de inmediato.','Informar solo a la familia.'],1],
    ['Aplicación','¿Qué comunicación protege mejor la confidencialidad?',['Compartir el diagnóstico con todo el personal.','Entregar a cada participante solo la información pertinente para su rol, por canales resguardados.','Comentar el caso en espacios comunes.','Usar grupos abiertos de mensajería.'],1],
    ['Decisión pedagógica','Ante desacuerdo entre familia y escuela, ¿qué acción es más adecuada?',['Imponer la decisión profesional.','Escuchar perspectivas, volver a la evidencia y derechos, explicitar acuerdos y definir revisión conjunta.','Suspender apoyos.','Evitar futuras reuniones.'],1]
  ], readingProcesses: [
    ['Comprensión conceptual','¿Qué describe mejor la decodificación?',['Comprender las intenciones del autor.','Relacionar representaciones escritas y sonidos para reconocer palabras.','Leer siempre con máxima velocidad.','Recordar todos los detalles.'],1],
    ['Comprensión conceptual','¿Qué caracteriza la fluidez lectora?',['Solo la cantidad de palabras por minuto.','Precisión, ritmo y expresión que favorecen la comprensión.','Comprensión oral sin lectura.','Conocimiento previo del tema.'],1],
    ['Interpretación','Una estudiante comprende bien el texto escuchado, pero al leerlo sola se detiene y pierde el sentido. ¿Qué hipótesis merece examinarse primero?',['Carece de comprensión oral.','La decodificación o fluidez consume recursos necesarios para comprender.','No posee conocimientos generales.','El texto debe eliminarse.'],1],
    ['Interpretación','Un estudiante lee con precisión y ritmo, responde preguntas literales, pero falla en inferencias. ¿Qué proceso requiere mayor análisis?',['Solo la velocidad.','Comprensión, vocabulario y uso de pistas para inferir.','Trazado de letras.','Reconocimiento visual de palabras.'],1],
    ['Aplicación','¿Qué procedimiento permite distinguir mejor entre dificultad de decodificación y comprensión?',['Aplicar solo lectura en voz alta.','Comparar comprensión del mismo nivel de contenido al leer y al escuchar, junto con precisión y fluidez.','Preguntar si le gusta leer.','Contar únicamente errores ortográficos.'],1],
    ['Aplicación','Una lectora silabea palabras nuevas. ¿Qué apoyo es más coherente?',['Pedirle leer más rápido.','Enseñar correspondencias grafema-fonema, segmentación y combinación con práctica guiada acumulativa.','Entregar solo preguntas literales.','Evitar toda lectura oral.'],1],
    ['Aplicación','Un lector preciso no detecta que una oración contradice el párrafo anterior. ¿Qué conviene enseñar?',['Aumentar palabras por minuto.','Monitorear la comprensión, releer y explicar cómo las ideas se conectan.','Copiar el texto completo.','Memorizar palabras aisladas.'],1],
    ['Decisión pedagógica','Ante errores lectores heterogéneos, ¿qué decisión es más rigurosa?',['Aplicar el mismo entrenamiento de velocidad a todos.','Analizar el patrón por proceso, probar apoyos focalizados y monitorear la respuesta.','Concluir DEA con una observación.','Reducir permanentemente el nivel de los textos.'],1]
  ], decodingFluency: [
    ['Comprensión conceptual','¿Qué componente no puede faltar al analizar fluidez?',['Solo cantidad de palabras por minuto.','Precisión, ritmo y prosodia vinculados con la comprensión.','Caligrafía y ortografía.','Preferencia por leer en silencio.'],1],
    ['Comprensión conceptual','¿Qué indica automatización en lectura?',['Reconocer palabras con menor esfuerzo atencional y conservar recursos para comprender.','Leer cualquier texto a máxima velocidad.','Memorizar un texto después de oírlo.','Evitar palabras desconocidas.'],0],
    ['Interpretación','Un estudiante sustituye palabras por otras que comienzan igual y falla especialmente en pseudopalabras. ¿Qué patrón debe examinarse?',['Inferencias narrativas.','Decodificación y combinación fonológica.','Prosodia exclusivamente.','Motricidad de escritura.'],1],
    ['Interpretación','Una estudiante lee con precisión, pero fragmenta cada oración e ignora puntos y comas. ¿Qué aspecto está más comprometido?',['Reconocimiento de letras.','Prosodia y agrupación en frases.','Comprensión oral.','Ortografía reglada.'],1],
    ['Aplicación','¿Qué apoyo es más pertinente ante dificultades persistentes para combinar sonidos?',['Lecturas cronometradas sin enseñanza.','Modelado explícito, combinación guiada y práctica acumulativa con retroalimentación.','Solo textos más breves.','Memorización de definiciones.'],1],
    ['Aplicación','¿Cómo practicar fluidez sin convertirla en una carrera?',['Premiar únicamente al más rápido.','Usar lectura modelada y repetida con propósito, observando precisión, fraseo y comprensión.','Eliminar toda repetición.','Cronometrar textos cada día sin retroalimentación.'],1],
    ['Aplicación','Tras cuatro semanas aumenta la velocidad, pero también los errores y disminuye la comprensión. ¿Qué corresponde?',['Mantener el entrenamiento porque aumentó la velocidad.','Reajustar el apoyo priorizando precisión y sentido, y analizar cualitativamente los errores.','Elevar la dificultad del texto.','Concluir que la intervención fue exitosa.'],1],
    ['Decisión pedagógica','Dos estudiantes leen lentamente, pero uno decodifica con errores y otro lee preciso con pausas inadecuadas. ¿Qué decisión es más pertinente?',['Aplicar el mismo ejercicio cronometrado.','Diseñar apoyos diferenciados según el patrón y monitorear la respuesta de cada uno.','Reducir los objetivos a ambos.','Evaluar únicamente comprensión oral.'],1]
  ], readingComprehension: [
    ['Comprensión conceptual','¿Qué caracteriza una inferencia lectora?',['Repetir una oración literalmente.','Relacionar pistas del texto y conocimientos pertinentes para construir información implícita.','Pronunciar todas las palabras.','Leer a mayor velocidad.'],1],
    ['Comprensión conceptual','¿Qué significa monitorear la comprensión?',['Memorizar cada detalle.','Comprobar si lo leído tiene sentido y reparar la comprensión cuando es necesario.','Responder solo preguntas literales.','Subrayar todo el texto.'],1],
    ['Interpretación','Un lector preciso desconoce varias palabras centrales y mejora al enseñárselas. ¿Qué indica el patrón?',['La velocidad era la única dificultad.','El vocabulario limitaba la construcción del significado.','Debe reducirse el objetivo lector.','Presenta necesariamente una DEA.'],1],
    ['Interpretación','Una estudiante sostiene una interpretación aunque una oración posterior la contradice. ¿Qué proceso requiere apoyo?',['Decodificación de pseudopalabras.','Monitoreo y ajuste de la comprensión.','Caligrafía.','Conciencia silábica.'],1],
    ['Aplicación','¿Qué práctica favorece el aprendizaje de vocabulario para comprender?',['Copiar definiciones aisladas una vez.','Explicar palabras en contexto, conectarlas con ejemplos y reutilizarlas al interpretar el texto.','Omitir toda palabra difícil.','Evaluar solo pronunciación.'],1],
    ['Aplicación','Para enseñar inferencias sobre la motivación de un personaje, ¿qué corresponde?',['Pedir que adivinen sin justificar.','Modelar cómo combinar pistas textuales y conocimientos, y exigir evidencia para la respuesta.','Aumentar la velocidad de lectura.','Entregar la interpretación final para memorizar.'],1],
    ['Aplicación','Un estudiante se da cuenta de que perdió el sentido. ¿Qué estrategia debe aprender a usar?',['Continuar sin detenerse.','Releer el segmento, identificar el quiebre y ajustar su interpretación.','Copiar el párrafo.','Cambiar inmediatamente de texto.'],1],
    ['Decisión pedagógica','Dos lectores precisos fallan: uno desconoce vocabulario y otro no genera inferencias. ¿Qué decisión es más rigurosa?',['Aplicar a ambos más lectura cronometrada.','Diferenciar apoyos según el proceso y comprobar la respuesta con nuevas evidencias.','Reducir las preguntas a literales.','Concluir que ambos tienen la misma dificultad.'],1]
  ], writingProduction: [
    ['Comprensión conceptual','¿Qué diferencia la transcripción de la composición?',['La transcripción convierte lenguaje en forma escrita; la composición genera, organiza y comunica ideas.','La transcripción solo corresponde a caligrafía.','La composición consiste únicamente en corregir tildes.','No existe diferencia entre ambas.'],0],
    ['Comprensión conceptual','¿Qué implica revisar un texto?',['Copiarlo nuevamente sin cambios.','Evaluar y mejorar contenido, organización, claridad y convenciones según el propósito.','Buscar únicamente faltas ortográficas.','Cambiar todas las palabras.'],1],
    ['Interpretación','Una estudiante relata oralmente ideas complejas, pero escribe muy poco y mejora al dictar. ¿Qué debe examinarse?',['Solo generación de ideas.','La interferencia de la transcripción en la composición.','Únicamente comprensión lectora.','Falta de propósito comunicativo.'],1],
    ['Interpretación','Un estudiante escribe extensamente y con ortografía funcional, pero sus ideas aparecen desordenadas. ¿Qué proceso requiere mayor apoyo?',['Correspondencia grafema-fonema.','Planificación y organización textual.','Trazado de letras.','Velocidad lectora.'],1],
    ['Aplicación','¿Qué apoyo favorece la planificación de un texto argumentativo?',['Corregir cada palabra mientras escribe.','Definir propósito y destinatario, generar razones y organizarlas antes de redactar.','Copiar un texto modelo completo.','Reducir la cantidad de ideas posibles.'],1],
    ['Aplicación','¿Cómo enseñar una revisión sustantiva?',['Pedir que busque solo tildes.','Modelar cómo releer según propósito, detectar un problema de contenido u organización y realizar un cambio.','Entregar la versión corregida.','Evaluar únicamente limpieza.'],1],
    ['Aplicación','Un estudiante pierde ideas porque se detiene ante cada duda ortográfica. ¿Qué respuesta es más pertinente?',['Exigir ortografía perfecta en el primer borrador.','Separar momentos de composición y corrección, junto con enseñanza ortográfica focalizada.','Eliminar toda revisión.','Pedir textos más cortos permanentemente.'],1],
    ['Decisión pedagógica','Ante una producción breve, ¿qué decisión permite intervenir con mayor rigor?',['Aplicar ejercicios de caligrafía a todos.','Comparar modalidades, analizar el proceso y probar apoyos específicos antes de concluir.','Asignar una calificación y esperar.','Reducir el objetivo de escritura.'],1]
  ], literacyIntervention: [
    ['Comprensión conceptual','¿Qué convierte una actividad en una intervención monitoreable?',['Que sea entretenida.','Su vínculo con línea base, objetivo observable, procedimiento, intensidad e indicador.','Que ocurra fuera del aula.','Que utilice muchas fichas.'],1],
    ['Comprensión conceptual','¿Qué es la fidelidad de implementación?',['El grado en que el apoyo se realiza con la dosis y el procedimiento planificados.','La confianza del estudiante en el docente.','La cantidad de evaluaciones aplicadas.','El diagnóstico inicial.'],0],
    ['Interpretación','No hay progreso, pero solo se realizó un tercio de las sesiones y cambió el método. ¿Qué corresponde concluir?',['El estudiante no responde.','La baja fidelidad impide juzgar todavía la eficacia del plan.','Debe confirmarse DEA.','El objetivo era demasiado alto necesariamente.'],1],
    ['Interpretación','Un estudiante usa una estrategia con ayuda en apoyo individual, pero no en aula. ¿Qué falta analizar?',['Solo precisión.','Generalización, autonomía y condiciones para usarla.','El número de palabras por minuto.','La ortografía natural.'],1],
    ['Aplicación','¿Cuál indicador informa mejor el progreso en decodificación?',['Número de sesiones asistidas.','Precisión y tipo de errores en listas equivalentes recogidas periódicamente.','Cantidad de fichas completadas.','Opinión general al final del semestre.'],1],
    ['Aplicación','Una intervención tiene alta fidelidad y progreso mínimo. ¿Qué acción es pertinente?',['Repetirla sin límite.','Revisar la hipótesis, ajustar método o intensidad y ampliar evidencia si corresponde.','Responsabilizar al estudiante.','Suspender todo apoyo.'],1],
    ['Aplicación','El desempeño mejora, pero depende de indicaciones constantes. ¿Qué ajuste favorece autonomía?',['Aumentar las indicaciones para siempre.','Planificar retiro gradual de ayudas y práctica en contextos variados.','Reducir el objetivo.','Evaluar solo en la sesión de apoyo.'],1],
    ['Decisión pedagógica','¿Qué secuencia refleja mejor una toma de decisiones rigurosa?',['Diagnóstico, actividad y calificación.','Línea base, hipótesis, intervención explícita, monitoreo de fidelidad y progreso, ajuste.','Prueba única y derivación.','Apoyo genérico y espera.'],1]
  ], literacyIntegration: [
    ['Comprensión conceptual','¿Qué relación describe mejor la lectura competente?',['La velocidad explica toda comprensión.','Decodificación y lenguaje se coordinan para construir significado.','La comprensión reemplaza el reconocimiento de palabras.','La lectura oral es el único indicador.'],1,'Unidad 1'],
    ['Interpretación','Comprende al escuchar, pero pierde el sentido al leer con muchas pausas. ¿Qué hipótesis se examina primero?',['Comprensión oral insuficiente.','Decodificación o fluidez como cuello de botella.','Falta de ideas.','Ortografía reglada.'],1,'Unidad 1'],
    ['Aplicación','¿Qué evaluación distingue mejor procesos lectores?',['Solo palabras por minuto.','Comparar precisión, fluidez, comprensión oral y comprensión al leer.','Una nota global.','Preferencia de textos.'],1,'Unidad 1'],
    ['Comprensión conceptual','La fluidez integra principalmente:',['Precisión, ritmo y prosodia al servicio del significado.','Velocidad máxima y memoria.','Ortografía y caligrafía.','Solo reconocimiento visual.'],0,'Unidad 2'],
    ['Interpretación','Lee preciso, pero palabra por palabra e ignorando puntuación. ¿Qué requiere apoyo?',['Correspondencia grafema-fonema.','Prosodia y agrupación en frases.','Vocabulario oral.','Planificación escrita.'],1,'Unidad 2'],
    ['Aplicación','Ante fallas en pseudopalabras, ¿qué apoyo es más coherente?',['Cronometrar sin enseñar.','Enseñanza explícita de correspondencias y combinación con práctica acumulativa.','Solo preguntas literales.','Memorizar el texto.'],1,'Unidad 2'],
    ['Comprensión conceptual','Monitorear la comprensión significa:',['Recordar cada detalle.','Comprobar el sentido y reparar cuando se pierde.','Pronunciar más rápido.','Subrayar todo.'],1,'Unidad 3'],
    ['Interpretación','Lee fluido y recupera datos, pero no explica motivaciones. ¿Qué se analiza?',['Solo velocidad.','Inferencias, vocabulario y uso de pistas.','Caligrafía.','Reconocimiento de letras.'],1,'Unidad 3'],
    ['Aplicación','¿Cómo enseñar una inferencia?',['Pedir una adivinanza.','Modelar la relación entre pistas y conocimientos, y justificar con evidencia.','Entregar la respuesta.','Repetir el texto sin propósito.'],1,'Unidad 3'],
    ['Comprensión conceptual','¿Qué pertenece a la composición escrita?',['Solo trazado de letras.','Planificar, textualizar y revisar según un propósito.','Decodificar pseudopalabras.','Leer con prosodia.'],1,'Unidad 4'],
    ['Interpretación','Relata ideas complejas, pero al escribir produce poco y mejora al dictar. ¿Qué sugiere?',['No tiene ideas.','La transcripción interfiere con la composición.','Falta comprensión oral.','Debe reducirse el objetivo.'],1,'Unidad 4'],
    ['Aplicación','¿Qué revisión debe priorizarse antes de las tildes?',['Contenido, propósito y organización global.','Velocidad de copia.','Cantidad de borradores.','Limpieza de la hoja.'],0,'Unidad 4'],
    ['Comprensión conceptual','¿Qué permite juzgar una intervención?',['Sesiones realizadas solamente.','Línea base, indicador de progreso y fidelidad de implementación.','Diagnóstico por sí solo.','Cantidad de fichas.'],1,'Unidad 5'],
    ['Interpretación','No hay progreso y solo se implementó un tercio del plan. ¿Qué corresponde?',['Declarar falta de respuesta.','Corregir la fidelidad antes de juzgar eficacia.','Suspender apoyos.','Cambiar diagnóstico.'],1,'Unidad 5'],
    ['Decisión pedagógica','¿Qué secuencia integra mejor el módulo?',['Manifestación, etiqueta y actividad.','Patrón, hipótesis, objetivo, enseñanza explícita, monitoreo y ajuste.','Prueba aislada y derivación.','Velocidad, calificación y repetición.'],1,'Unidad 5']
  ], mathProcesses: [
    ['Comprensión conceptual','¿Qué describe mejor el sentido numérico?',['Memorizar algoritmos.','Comprender cantidades, magnitudes, orden, composición y relaciones numéricas.','Copiar símbolos con precisión.','Resolver solo problemas verbales.'],1],
    ['Comprensión conceptual','¿Qué función cumplen las representaciones?',['Decorar la actividad.','Hacer visibles relaciones y conectar situaciones con lenguaje matemático.','Reemplazar permanentemente los símbolos.','Reducir el objetivo.'],1],
    ['Interpretación','Resuelve una resta presentada como operación, pero suma en el problema “se retiraron 8”. ¿Qué proceso debe analizarse?',['Cálculo de la resta exclusivamente.','Representación y modelación de la relación descrita.','Escritura de números.','Memoria de hechos multiplicativos.'],1],
    ['Interpretación','Forma 52 con bloques, pero dice que 52 es menor que 48 porque 2 es menor que 8. ¿Qué vínculo falta consolidar?',['Conteo oral.','Valor posicional entre cantidad, lenguaje y símbolo.','Geometría.','Velocidad de cálculo.'],1],
    ['Aplicación','¿Cómo favorecer el tránsito entre representaciones?',['Usar material sin explicarlo.','Pedir construir, dibujar, simbolizar y explicar cómo cada forma representa la misma relación.','Pasar directamente al algoritmo.','Mantener siempre una sola modalidad.'],1],
    ['Aplicación','Un estudiante obtiene 91 para 48 + 32. ¿Qué acción aporta mejor evidencia?',['Marcar incorrecto.','Pedir estimar, representar decenas y unidades y explicar cada paso.','Entregar más ejercicios iguales.','Cambiar de contenido.'],1],
    ['Aplicación','Una estudiante calcula correctamente, pero no comprueba si el resultado es razonable. ¿Qué enseñar?',['Solo rapidez.','Estimación y comparación del resultado con la situación inicial.','Caligrafía numérica.','Memorización de signos.'],1],
    ['Decisión pedagógica','Ante un error matemático persistente, ¿qué decisión es más rigurosa?',['Asignar inmediatamente una etiqueta.','Comparar tareas, representaciones y apoyos, analizar el procedimiento y monitorear la respuesta.','Repetir el algoritmo sin cambios.','Reducir todas las metas.'],1]
  ], numberSense: [
    ['Comprensión conceptual','¿Qué evidencia mejor sentido numérico?',['Recitar números sin error.','Representar, comparar, descomponer y explicar relaciones entre cantidades.','Copiar numerales.','Resolver siempre con un algoritmo.'],1],
    ['Comprensión conceptual','¿Qué expresa el valor posicional?',['La forma del dígito.','El valor que adquiere un dígito según su posición en agrupaciones de base diez.','El orden de escritura solamente.','La cantidad de operaciones.'],1],
    ['Interpretación','Cuenta una colección correctamente, pero al moverla cree que cambió la cantidad. ¿Qué concepto requiere análisis?',['Conservación de cantidad.','Ortografía numérica.','Multiplicación.','Lectura de gráficos.'],0],
    ['Interpretación','Forma 406 con material, pero escribe 46. ¿Qué vínculo falta consolidar?',['Conteo uno a uno.','Función posicional del cero entre agrupación y notación.','Estimación de resultados.','Geometría espacial.'],1],
    ['Aplicación','¿Cómo enseñar comparación de 209 y 89 con comprensión?',['Memorizar una regla aislada.','Representar y comparar desde la posición de mayor valor, justificando la magnitud.','Contar de uno en uno hasta 209.','Copiar el signo mayor que.'],1],
    ['Aplicación','Un estudiante descompone 53 solo como 50 + 3. ¿Qué actividad amplía flexibilidad?',['Repetir esa descomposición.','Buscar y justificar otras equivalencias, como 40 + 13 o 25 + 28.','Memorizar 53.','Pasar a números menores.'],1],
    ['Aplicación','¿Qué favorece una estimación significativa?',['Adivinar antes de mirar.','Usar referentes, comparar magnitudes y explicar un rango razonable.','Contar siempre exactamente.','Aceptar cualquier aproximación.'],1],
    ['Decisión pedagógica','Ante errores posicionales persistentes, ¿qué decisión es más rigurosa?',['Practicar algoritmos sin representación.','Comparar cantidad, material, tabla posicional, lenguaje y símbolo, y monitorear la transferencia.','Reducir el ámbito numérico permanentemente.','Concluir DEA por un error.'],1]
  ], calculationOperations: [
    ['Comprensión conceptual','¿Qué diferencia una estrategia de un algoritmo?',['La estrategia es una elección flexible basada en relaciones; el algoritmo es un procedimiento convencional.','La estrategia siempre es mental y el algoritmo siempre incorrecto.','No existe diferencia.','El algoritmo no usa valor posicional.'],0],
    ['Comprensión conceptual','¿Qué favorece la automatización comprensiva de hechos?',['Repetición sin relaciones.','Construir hechos nuevos desde dobles, complementos, familias y propiedades.','Evitar toda práctica.','Usar solo calculadora.'],1],
    ['Interpretación','En 402 − 185 resta siempre el dígito menor del mayor. ¿Qué revela?',['Comprensión sólida de la resta.','Una regla mecánica que ignora desagrupación y valor posicional.','Dificultad de lectura.','Problema de estimación únicamente.'],1],
    ['Interpretación','Resuelve 99 + 36 como 100 + 36 − 1. ¿Cómo se interpreta?',['Error porque no usó algoritmo vertical.','Estrategia válida de compensación basada en equivalencia.','Adivinación.','Dificultad posicional.'],1],
    ['Aplicación','No recuerda 6 × 8, pero sabe 3 × 8. ¿Qué apoyo es pertinente?',['Memorizar sin explicación.','Duplicar 3 × 8 y explicar la relación multiplicativa.','Cambiar de tabla.','Sumar 6 + 8.'],1],
    ['Aplicación','¿Cómo enseñar la desagrupación en una resta?',['Decir “se pide prestado”.','Conectar material base diez, notación expandida y cada paso del algoritmo.','Practicar columnas sin material.','Invertir los dígitos.'],1],
    ['Aplicación','Un resultado de suma supera ampliamente una estimación razonable. ¿Qué debe hacer el estudiante?',['Aceptar el algoritmo.','Revisar el procedimiento usando estimación y operación inversa.','Borrar la estimación.','Repetir el resultado.'],1],
    ['Decisión pedagógica','Ante errores de cálculo heterogéneos, ¿qué decisión es más rigurosa?',['Aplicar la misma ficha.','Analizar significado, hechos, estrategia, valor posicional y control para focalizar el apoyo.','Entrenar solo velocidad.','Reducir el objetivo.'],1]
  ], problemSolving: [
    ['Comprensión conceptual','¿Qué distingue un problema de un ejercicio rutinario?',['El problema siempre tiene texto.','Exige construir una estrategia sin recibir directamente el procedimiento.','Usa números mayores.','Debe resolverse mentalmente.'],1],
    ['Comprensión conceptual','¿Qué función cumple modelar un problema?',['Subrayar palabras clave.','Representar las cantidades y relaciones para vincular la situación con lenguaje matemático.','Ejecutar el algoritmo.','Copiar el enunciado.'],1],
    ['Interpretación','Calcula bien, pero combina todos los números aunque uno sea irrelevante. ¿Dónde aparece el quiebre?',['En cálculo.','En comprensión y representación de la situación.','En hechos numéricos.','En escritura de dígitos.'],1],
    ['Interpretación','Resuelve correctamente al escuchar el enunciado segmentado, pero no al leerlo solo. ¿Qué debe analizarse?',['Solo capacidad matemática general.','La demanda lectora como interferencia y el razonamiento bajo ambas condiciones.','El algoritmo.','La memoria de tablas.'],1],
    ['Aplicación','Ante “Ana tiene 7 más que Luis”, ¿qué evita el uso mecánico de palabras clave?',['Sumar al ver “más”.','Construir una representación de ambas cantidades, la diferencia y la incógnita.','Borrar la palabra.','Practicar sumas.'],1],
    ['Aplicación','¿Cómo enseñar comprobación contextual?',['Repetir el cálculo.','Comparar la respuesta con una estimación, la pregunta y las condiciones de la situación.','Aceptar cualquier número.','Usar siempre calculadora.'],1],
    ['Aplicación','Un estudiante inicia operaciones sin explicar qué busca. ¿Qué apoyo es pertinente?',['Entregar la operación.','Pedir reformular la pregunta, identificar datos necesarios y anticipar un plan.','Aumentar la cantidad de ejercicios.','Corregir al final.'],1],
    ['Decisión pedagógica','Ante bajo desempeño en problemas, ¿qué decisión es más rigurosa?',['Entrenar cálculo a todos.','Evaluar por separado comprensión, representación, planificación, cálculo y comprobación para focalizar apoyo.','Reducir el lenguaje siempre.','Concluir DEA con una prueba.'],1]
  ], mathIntervention: [
    ['Comprensión conceptual','¿Qué debe incluir una línea base matemática útil?',['Solo porcentaje total.','Procedimientos, errores, representaciones, explicaciones y respuesta a apoyos.','Solo diagnóstico.','Cantidad de sesiones.'],1],
    ['Comprensión conceptual','¿Qué evidencia fidelidad de implementación?',['Que el apoyo se realizó con frecuencia, duración y procedimiento planificados.','Que el estudiante asistió.','Que se completaron fichas.','Que el resultado final fue bajo.'],0],
    ['Interpretación','Compara con material, pero no con numerales; nunca se enseñó el puente simbólico. ¿Qué indica?',['Falta de capacidad general.','La intervención no abordó explícitamente la transferencia entre representaciones.','Debe retirarse el material.','Se confirma DEA.'],1],
    ['Interpretación','Se planificaron cuatro sesiones, se realizó una y no hay medida de desempeño. ¿Qué procede?',['Concluir falta de respuesta.','Corregir fidelidad y establecer un indicador antes de juzgar eficacia.','Cambiar diagnóstico.','Suspender el apoyo.'],1],
    ['Aplicación','¿Cuál indicador mide mejor progreso en valor posicional?',['Fichas completadas.','Precisión y explicación al representar números equivalentes en tareas periódicas.','Asistencia.','Tiempo sentado.'],1],
    ['Aplicación','Progresa con bloques, pero depende del adulto para elegirlos. ¿Qué ajuste corresponde?',['Mantener todas las indicaciones.','Enseñar cuándo elegir la representación y retirar ayudas gradualmente.','Eliminar el material.','Reducir los números.'],1],
    ['Aplicación','No hay progreso pese a alta fidelidad. ¿Qué decisión es pertinente?',['Repetir indefinidamente.','Revisar hipótesis, método, intensidad y ampliar evidencia.','Responsabilizar al estudiante.','Retirar apoyos.'],1],
    ['Decisión pedagógica','¿Qué secuencia integra evaluación e intervención?',['Prueba, etiqueta y ficha.','Línea base, hipótesis, objetivo, enseñanza explícita, monitoreo de fidelidad y progreso, ajuste.','Actividad y calificación.','Derivación y espera.'],1]
  ], mathIntegration: [
    ['Comprensión conceptual','¿Qué procesos deben distinguirse ante un error matemático?',['Solo cálculo y memoria.','Sentido numérico, representación, cálculo y resolución.','Lectura y escritura únicamente.','Rapidez y atención.'],1,'Unidad 1'],
    ['Interpretación','Resuelve con bloques, pero falla al registrar símbolos. ¿Qué se analiza?',['Capacidad general.','Conexión entre representaciones y notación.','Solo conteo.','Comprensión verbal.'],1,'Unidad 1'],
    ['Aplicación','¿Qué procedimiento aporta más evidencia?',['Marcar correcto o incorrecto.','Pedir explicar, representar, resolver y comprobar bajo condiciones comparables.','Cronometrar.','Repetir la tarea.'],1,'Unidad 1'],
    ['Comprensión conceptual','El valor posicional expresa:',['La forma del numeral.','El valor del dígito según su posición en agrupaciones de base diez.','La velocidad de lectura.','El orden de copia.'],1,'Unidad 2'],
    ['Interpretación','Forma 304, pero escribe 34. ¿Qué vínculo falta?',['Conteo oral.','Función posicional del cero entre agrupación y notación.','Estimación.','Operación inversa.'],1,'Unidad 2'],
    ['Aplicación','¿Cómo ampliar flexibilidad con 53?',['Usar solo 50 + 3.','Construir y justificar descomposiciones equivalentes.','Memorizarlo.','Copiarlo.'],1,'Unidad 2'],
    ['Comprensión conceptual','Una estrategia de cálculo es:',['Un procedimiento flexible elegido desde relaciones numéricas.','Un algoritmo obligatorio.','Una adivinanza.','Una tabla memorizada.'],0,'Unidad 3'],
    ['Interpretación','Resuelve 99 + 36 como 100 + 36 − 1. ¿Qué usa?',['Un error.','Compensación y equivalencia.','Conteo uno a uno.','Algoritmo vertical.'],1,'Unidad 3'],
    ['Aplicación','¿Cómo comprobar 402 − 185?',['Aceptar el algoritmo.','Estimar y usar relación inversa, revisando valor posicional.','Repetir el resultado.','Contar dígitos.'],1,'Unidad 3'],
    ['Comprensión conceptual','Modelar un problema significa:',['Buscar palabra clave.','Representar cantidades y relaciones para vincular situación y lenguaje matemático.','Ejecutar cálculo.','Copiar datos.'],1,'Unidad 4'],
    ['Interpretación','Calcula bien, pero usa todos los datos. ¿Dónde está el quiebre?',['Hechos numéricos.','Comprensión y representación de la situación.','Algoritmo.','Valor posicional.'],1,'Unidad 4'],
    ['Aplicación','¿Qué evita decidir por “más”?',['Sumar siempre.','Representar cantidades, relación e incógnita antes de operar.','Subrayar la palabra.','Eliminar el texto.'],1,'Unidad 4'],
    ['Comprensión conceptual','¿Qué permite juzgar una intervención?',['Fichas completadas.','Línea base, indicador de progreso y fidelidad.','Diagnóstico.','Asistencia solamente.'],1,'Unidad 5'],
    ['Interpretación','No hay progreso y se realizó un cuarto del plan. ¿Qué procede?',['Concluir falta de respuesta.','Corregir fidelidad antes de juzgar eficacia.','Retirar apoyo.','Cambiar objetivo sin evidencia.'],1,'Unidad 5'],
    ['Decisión pedagógica','¿Qué secuencia integra mejor el módulo?',['Respuesta, etiqueta y ficha.','Patrón, proceso, hipótesis, enseñanza explícita, monitoreo y ajuste.','Prueba y derivación.','Algoritmo y repetición.'],1,'Unidad 5']
  ], diversifiedDesign: [
    ['Comprensión conceptual','¿Qué caracteriza la diversificación?',['Crear un currículo distinto para cada estudiante.','Anticipar diversidad y ofrecer alternativas manteniendo propósitos y expectativas.','Reducir siempre los objetivos.','Aplicar adecuaciones individuales primero.'],1],
    ['Comprensión conceptual','¿Qué debe definirse antes de variar una modalidad?',['La tecnología disponible.','El aprendizaje o constructo central que debe conservarse.','El diagnóstico.','La opción preferida del docente.'],1],
    ['Interpretación','El objetivo es explicar causalidad y se permite respuesta oral o escrita con igual criterio. ¿Qué ocurre?',['Se reduce el objetivo.','Se diversifica la expresión manteniendo el constructo.','Se elimina la evaluación.','Se aplica PACI.'],1],
    ['Interpretación','El objetivo es escribir un texto y se reemplaza por completo por un audio. ¿Cuál es el problema?',['Ninguno.','La alternativa elimina una parte central del aprendizaje evaluado.','El audio siempre es más difícil.','Falta una nota.'],1],
    ['Aplicación','Un texto extenso bloquea Ciencias y decodificar no es el objetivo. ¿Qué apoyo corresponde?',['Reducir el contenido científico.','Ofrecer acceso segmentado, audio y diagramas, manteniendo las relaciones científicas.','Eximir al estudiante.','Evaluar lectura.'],1],
    ['Aplicación','¿Qué opción favorece participación sin bajar expectativas?',['Una tarea paralela más fácil.','Elección entre apoyos y formas pertinentes de trabajo con criterios comunes.','Menos contenido automáticamente.','Observación pasiva.'],1],
    ['Aplicación','Una opción mejora desempeño, pero genera dependencia total. ¿Qué debe revisarse?',['Solo mantenerla.','Eficacia, autonomía y posibilidad de retirar ayudas gradualmente.','El diagnóstico.','La calificación.'],1],
    ['Decisión pedagógica','¿Qué secuencia es coherente con el Decreto 83?',['Adecuar OA antes de enseñar.','Diversificar, evaluar respuesta y considerar adecuaciones si es insuficiente.','Separar primero.','Usar diagnóstico como única decisión.'],1]
  ], explicitTeaching: [
    ['Comprensión conceptual','¿Qué caracteriza el modelado cognitivo?',['Mostrar solo la respuesta.','Hacer visible el razonamiento, las decisiones y la comprobación mediante pensamiento en voz alta.','Entregar una pauta.','Repetir la instrucción.'],1],
    ['Comprensión conceptual','¿Cuál es el propósito del andamiaje?',['Mantener ayuda permanente.','Permitir realizar un proceso y transferir gradualmente la responsabilidad.','Simplificar siempre el objetivo.','Evitar errores.'],1],
    ['Interpretación','Resuelve solo con una pauta y no decide qué pasos usar. ¿Qué ocurre?',['Autonomía consolidada.','Dependencia del andamio y falta de desvanecimiento.','Dificultad del objetivo.','Falta de evaluación.'],1],
    ['Interpretación','El adulto entrega respuesta tras cada pausa breve. ¿Qué problema genera?',['Demasiada práctica.','No ofrece tiempo ni evidencia del nivel de ayuda necesario.','Exceso de autonomía.','Poca explicación final.'],1],
    ['Aplicación','¿Cuál es la secuencia de responsabilidad gradual?',['Trabajo independiente y luego explicación.','Modelado, práctica guiada, cooperación estructurada e independencia.','Evaluación, modelo y tarea.','Pista permanente.'],1],
    ['Aplicación','¿Qué pista preserva mejor el razonamiento del estudiante?',['Entregar el primer paso completo.','Preguntar “¿qué necesitas averiguar primero y por qué?”.','Resolver el ejemplo.','Señalar la respuesta.'],1],
    ['Aplicación','Un estudiante ya ejecuta una estrategia con precisión. ¿Qué sigue?',['Mantener todas las ayudas.','Reducir apoyos y comprobar uso autónomo en tareas variadas.','Cambiar inmediatamente el objetivo.','Evitar nuevos contextos.'],1],
    ['Decisión pedagógica','¿Cómo elegir el nivel de ayuda?',['Por diagnóstico.','Usar la mínima ayuda efectiva, observar respuesta y ajustarla.','Aplicar el máximo apoyo.','Dar la misma pista a todos.'],1]
  ], practiceFeedback: [
    ['Comprensión conceptual','¿Qué caracteriza la práctica distribuida?',['Muchas repeticiones seguidas.','Oportunidades breves separadas en el tiempo con recuperación del aprendizaje.','Una evaluación final.','Tareas sin retroalimentación.'],1],
    ['Comprensión conceptual','¿Qué hace accionable una retroalimentación?',['Incluye una calificación.','Vincula evidencia y criterio con una acción para el siguiente intento.','Corrige todos los errores.','Se entrega al final del semestre.'],1],
    ['Interpretación','Resuelve veinte ejercicios iguales, pero falla cuando cambia el formato. ¿Qué falta?',['Más repetición idéntica.','Variación, discriminación de condiciones y transferencia.','Una nota.','Menos ejemplos.'],1],
    ['Interpretación','Recibe un texto marcado y lo archiva sin revisar. ¿Cuál es el problema?',['Poca corrección.','La retroalimentación no genera una acción ni un nuevo intento.','Demasiada autonomía.','Falta una rúbrica numérica.'],1],
    ['Aplicación','¿Cómo promover recuperación activa?',['Releer la explicación.','Pedir recordar y aplicar la estrategia antes de consultar el apoyo.','Copiar el ejemplo.','Mostrar la respuesta.'],1],
    ['Aplicación','¿Qué retroalimentación es más útil?',['Muy bien.','Tu representación es correcta; revisa la incógnita y vuelve a elegir la operación.','Incorrecto.','Debes concentrarte.'],1],
    ['Aplicación','¿Cómo enseñar autorregulación?',['Pedir independencia inmediata.','Modelar metas, autoindicaciones y comprobación, guiarlas y retirar ayudas.','Entregar una pauta permanente.','Evitar errores.'],1],
    ['Decisión pedagógica','¿Qué diseño favorece transferencia?',['Ejercicios idénticos agrupados.','Práctica distribuida y acumulativa con ejemplos variados, explicación y retroalimentación.','Solo evaluación final.','Repetición sin contraste.'],1]
  ], accessSupports: [
    ['Comprensión conceptual','¿Qué caracteriza un apoyo de acceso?',['Reduce objetivos.','Modifica la vía de acceso o respuesta conservando el aprendizaje esperado.','Se asigna por diagnóstico.','Es siempre tecnológico.'],1],
    ['Comprensión conceptual','¿Qué criterio debe orientar la selección de un recurso?',['Su novedad.','La barrera, el objetivo y el cambio observable que produce.','La preferencia adulta.','El precio.'],1],
    ['Interpretación','Se usa audio en Ciencias y decodificar no es el objetivo. ¿Qué ocurre?',['Se invalida siempre.','Se reduce una demanda accesoria manteniendo el contenido científico.','Se modifica el OA.','Se elimina toda lectura.'],1],
    ['Interpretación','Se usa calculadora cuando el objetivo es ejecutar división. ¿Cuál es el riesgo?',['Ninguno.','Sustituye el proceso central que debe demostrarse.','Aumenta la dificultad.','Evalúa lectura.'],1],
    ['Aplicación','Un apoyo mejora precisión, pero requiere indicación adulta constante. ¿Qué se revisa?',['Solo mantenerlo.','Entrenar uso autónomo y retirar ayudas gradualmente.','Cambiar diagnóstico.','Bajar el objetivo.'],1],
    ['Aplicación','Instrucciones públicas simplificadas estigmatizan. ¿Qué alternativa es mejor?',['Retirar el apoyo.','Ofrecer segmentación y pauta visual para el grupo, con verificación discreta.','Separar al estudiante.','Repetir más fuerte.'],1],
    ['Aplicación','¿Cómo comprobar pertinencia de un teclado como apoyo?',['Usarlo siempre.','Comparar producción, autonomía y acceso manteniendo criterios del objetivo.','Contar pulsaciones.','Preguntar solo si le gusta.'],1],
    ['Decisión pedagógica','¿Qué secuencia es más rigurosa?',['Elegir tecnología y luego buscar una barrera.','Identificar barrera y objetivo, seleccionar apoyo, enseñar su uso y monitorear eficacia y autonomía.','Aplicar igual apoyo por diagnóstico.','Mantenerlo permanentemente.'],1]
  ], diversifiedAssessment: [
    ['Comprensión conceptual','¿Qué caracteriza una evaluación diversificada?',['Cambia el objetivo para cada estudiante.','Ofrece vías pertinentes para evidenciar el aprendizaje conservando propósito y criterios esenciales.','Elimina toda exigencia.','Usa solo pruebas orales.'],1],
    ['Comprensión conceptual','¿Para qué se recoge evidencia durante la enseñanza?',['Solo para asignar una nota.','Para interpretar el aprendizaje y decidir próximos pasos pedagógicos.','Para confirmar diagnósticos.','Para completar registros.'],1],
    ['Interpretación','Dos estudiantes obtienen el mismo puntaje, pero muestran errores distintos. ¿Qué corresponde?',['Aplicar el mismo apoyo.','Analizar patrones por criterio y proceso para tomar decisiones diferenciadas.','Usar solo el promedio.','Repetir la prueba sin cambios.'],1],
    ['Interpretación','Una respuesta oral demuestra el concepto, pero leer no era parte del objetivo. ¿Qué indica?',['La evidencia es inválida.','La vía oral redujo una demanda accesoria y permitió observar el constructo.','Debe bajarse el criterio.','La lectura debe calificarse igualmente.'],1],
    ['Aplicación','Una pauta mejora el producto, pero mantiene dependencia adulta. ¿Qué decisión es pertinente?',['Mantenerla sin revisión.','Enseñar su uso, retirar ayudas gradualmente y monitorear autonomía.','Eliminar todo apoyo.','Reducir el objetivo.'],1],
    ['Aplicación','La mayoría falla el mismo criterio después de una explicación. ¿Qué acción aporta más?',['Calificar y avanzar.','Reenseñar con otra representación, práctica guiada y una comprobación breve.','Derivar al grupo.','Repetir idéntica prueba.'],1],
    ['Aplicación','¿Qué evidencia permite ajustar mejor una intervención?',['Solo el puntaje total.','Desempeño por criterio, tipo de error, ayuda requerida y cambio entre momentos.','La opinión aislada del adulto.','La cantidad de tareas.'],1],
    ['Decisión pedagógica','¿Cuál es el ciclo más coherente?',['Evaluar, calificar y archivar.','Precisar criterio, diversificar vías, recoger evidencia, interpretarla y ajustar enseñanza o apoyo.','Elegir formato según diagnóstico.','Cambiar el objetivo después de cada error.'],1]
  ], participationBelonging: [
    ['Comprensión conceptual','¿Qué diferencia participación de presencia?',['La ubicación en el aula.','El involucramiento significativo y la posibilidad de aportar e influir.','La cantidad de asistencia.','El diagnóstico.'],1],
    ['Comprensión conceptual','¿Qué caracteriza el sentido de pertenencia?',['Cumplir tareas en silencio.','Sentirse reconocido, seguro y valorado como integrante de la comunidad.','Recibir trabajo individual.','No necesitar apoyos.'],1],
    ['Interpretación','Un estudiante está en el grupo, pero siempre realiza una tarea paralela. ¿Qué indica?',['Inclusión plena.','Presencia física sin participación en el propósito común.','Autonomía suficiente.','Aprendizaje colaborativo.'],1],
    ['Interpretación','Una estudiante rechaza un apoyo que la expone frente al curso. ¿Cómo usar su opinión?',['Ignorarla porque el apoyo funciona.','Integrarla como evidencia para rediseñar modalidad, contexto o momento.','Retirar todo apoyo.','Cambiarla de curso.'],1],
    ['Aplicación','Un estudiante siempre reparte materiales, aunque quiere registrar datos. ¿Qué corresponde?',['Mantener el rol seguro.','Enseñar y apoyar el registro, ampliando roles y expectativas.','Excluirlo del grupo.','Dejar que observe.'],1],
    ['Aplicación','¿Qué indicador permite observar participación significativa?',['Solo asistencia.','Frecuencia y calidad de aportes, interacción, elección y progreso en el propósito compartido.','Cantidad de fichas.','Tiempo fuera del aula.'],1],
    ['Aplicación','Un apoyo individual mejora precisión, pero separa sistemáticamente al estudiante. ¿Qué se debe analizar?',['Solo la precisión.','Su efecto conjunto en aprendizaje, participación, autonomía y pertenencia.','Solo la preferencia adulta.','La duración del diagnóstico.'],1],
    ['Decisión pedagógica','¿Qué secuencia favorece una decisión inclusiva?',['Asignar un rol y observar asistencia.','Escuchar al estudiante, observar barreras y facilitadores, acordar un ajuste y monitorear participación, aprendizaje y pertenencia.','Aplicar el mismo apoyo por diagnóstico.','Priorizar siempre el trabajo separado.'],1]
  ], coTeaching: [
    ['Comprensión conceptual','¿Qué define la coenseñanza?',['Dos adultos presentes.','Responsabilidad compartida en planificación, enseñanza, evaluación y ajuste.','Un especialista que atiende diagnósticos.','Dividir el curso.'],1],
    ['Comprensión conceptual','¿Cómo se selecciona una modalidad?',['Por costumbre.','Según objetivo, barreras y evidencia requerida.','Por diagnóstico.','Usando siempre estaciones.'],1],
    ['Interpretación','Un docente dirige siempre y otro apoya al mismo subgrupo. ¿Qué riesgo existe?',['Liderazgo compartido.','Roles jerárquicos, estigma y responsabilidad fragmentada.','Exceso de modalidades.','Falta de pruebas.'],1],
    ['Interpretación','Ambos conducen explicaciones conectadas. ¿Qué modalidad es?',['Separada.','En equipo.','Individual.','Derivación.'],1],
    ['Aplicación','¿Cómo aumentar oportunidades de respuesta sobre el mismo objetivo?',['Un grupo observa.','Enseñanza paralela con grupos flexibles y criterios comunes.','Separar por diagnóstico.','Tareas no relacionadas.'],1],
    ['Aplicación','¿Cómo usar uno enseña y otro observa?',['Observar cualquier cosa.','Acordar indicadores, registrar y analizar para ajustar.','Mantener roles siempre.','Mirar solo conducta.'],1],
    ['Aplicación','Las estaciones no producen evidencia comparable. ¿Qué falta?',['Más materiales.','Propósito articulado, tareas coherentes e indicadores.','Más tiempo.','Grupos fijos.'],1],
    ['Decisión pedagógica','¿Qué secuencia expresa colaboración?',['Dividir estudiantes.','Co-planificar objetivo, roles y evidencia; coenseñar; analizar y ajustar juntos.','Improvisar.','Delegar al especialista.'],1]
  ], inclusiveClimate: [
    ['Comprensión conceptual','¿Qué caracteriza una convivencia inclusiva?',['Ausencia de conflictos.','Participación, cuidado, derechos y respuesta formativa a las barreras.','Sanciones idénticas.','Apoyos separados.'],1],
    ['Comprensión conceptual','¿Qué es estigmatización?',['Un apoyo pertinente.','Atribuir una marca desvalorizante que reduce identidad y participación.','Una norma común.','Una evaluación.'],1],
    ['Interpretación','Un estudiante deja de usar un apoyo por burlas. ¿Qué evidencia muestra?',['El apoyo era innecesario.','Una barrera relacional que afecta acceso y pertenencia.','Falta de esfuerzo.','Autonomía.'],1],
    ['Interpretación','Se sanciona una burla, pero continúa la exposición pública del apoyo. ¿Qué falta?',['Otra nota.','Modificar la condición que sostiene el estigma.','Retirar el apoyo.','Cambiar el objetivo.'],1],
    ['Aplicación','Dos estudiantes siempre quedan fuera al formar equipos. ¿Qué corresponde?',['Esperar elección espontánea.','Rediseñar agrupamiento, roles e indicadores de participación.','Trabajar solos.','Sancionar al curso sin diálogo.'],1],
    ['Aplicación','¿Qué respuesta protege a quien sufrió discriminación?',['Pedirle mediar inmediatamente.','Escuchar sin culpabilizar, detener el daño y acordar resguardos.','Exponer el caso públicamente.','Minimizarlo.'],1],
    ['Aplicación','¿Cómo evaluar un cambio de convivencia?',['Solo contar sanciones.','Combinar recurrencia, percepción de seguridad, participación y observación.','Medir asistencia.','Preguntar solo al adulto.'],1],
    ['Decisión pedagógica','¿Qué secuencia es más completa?',['Sancionar y cerrar.','Proteger, escuchar, analizar barreras, actuar formativamente y monitorear.','Retirar a quien fue afectado.','Aplicar la misma medida siempre.'],1]
  ], interdisciplinaryFollowup: [
    ['Comprensión conceptual','¿Qué caracteriza el seguimiento interdisciplinario?',['Acumular informes.','Integrar evidencia y acciones complementarias en una decisión común.','Delegar a un especialista.','Reunirse sin indicadores.'],1],
    ['Comprensión conceptual','¿Qué distingue impacto de actividad?',['La frecuencia.','El cambio observable en desempeño, participación o autonomía.','La duración de reunión.','El número de profesionales.'],1],
    ['Interpretación','Se registran sesiones, pero no cambios. ¿Qué falta?',['Más sesiones.','Indicadores de resultado bajo condiciones comparables.','Otro diagnóstico.','Un informe extenso.'],1],
    ['Interpretación','Dos fuentes muestran desempeños distintos. ¿Qué corresponde?',['Elegir la menor.','Analizar tareas, contextos y apoyos antes de concluir.','Promediar sin contexto.','Descartar una fuente.'],1],
    ['Aplicación','¿Qué completa un acuerdo monitoreable?',['Solo objetivo general.','Acción, responsable, contexto, indicador y fecha de revisión.','Diagnóstico y firma.','Lista de reuniones.'],1],
    ['Aplicación','Un apoyo mejora precisión, pero no autonomía. ¿Qué procede?',['Mantenerlo igual.','Rediseñar ayudas y monitorear retiro gradual.','Eliminar el objetivo.','Aumentar dependencia.'],1],
    ['Aplicación','Cada profesional trabaja una meta distinta. ¿Qué debe hacer el equipo?',['Mantener planes paralelos.','Priorizar una necesidad y articular aportes complementarios.','Elegir una profesión.','Agregar tareas.'],1],
    ['Decisión pedagógica','¿Qué ciclo es más riguroso?',['Informar y archivar.','Triangular, priorizar, acordar, implementar, monitorear y ajustar.','Derivar y esperar.','Mantener apoyos por costumbre.'],1]
  ], assessmentIntegration: [
    ['Comprensión conceptual','¿Qué hace integral a una evaluación?',['La cantidad de pruebas.','La articulación de fuentes, contextos y participantes para orientar apoyos.','La existencia de un diagnóstico.','El uso exclusivo de instrumentos formales.'],1,'Unidad 1'],
    ['Interpretación','Una familia describe fortalezas no observadas en la escuela. ¿Cómo se usa esa información?',['Se descarta.','Se integra y contrasta con otras fuentes y condiciones.','Reemplaza toda evaluación.','Solo confirma diagnósticos.'],1,'Unidad 1'],
    ['Aplicación','¿Qué decisión deriva mejor de una evaluación integral?',['Un apoyo genérico.','Una acción vinculada con evidencia, responsable e indicador.','Archivar el informe.','Aplicar la misma respuesta por diagnóstico.'],1,'Unidad 1'],
    ['Comprensión conceptual','¿Qué significa triangular evidencia?',['Promediar puntajes.','Contrastar fuentes, métodos y momentos.','Repetir una prueba.','Elegir el resultado menor.'],1,'Unidad 2'],
    ['Interpretación','El desempeño cambia al permitir respuesta oral. ¿Qué corresponde analizar?',['Solo la comprensión.','La demanda escrita como posible interferencia y el patrón bajo ambas condiciones.','El diagnóstico.','La nota final.'],1,'Unidad 2'],
    ['Aplicación','¿Qué interpretación es más rigurosa?',['No puede aprender.','Describe tarea, error, apoyo, cambio observado e hipótesis a contrastar.','Su DEA explica todo.','Rinde bajo.'],1,'Unidad 2'],
    ['Comprensión conceptual','¿Qué criterio es relevante para una posible DEA?',['Una dificultad aislada.','Persistencia significativa pese a medidas pedagógicas pertinentes.','Una nota insuficiente.','Preferir material visual.'],1,'Unidad 3'],
    ['Interpretación','Un grupo no recibió enseñanza sistemática y presenta bajo desempeño. ¿Qué se examina primero?',['DEA grupal.','Oportunidad y calidad de enseñanza, seguida de apoyo y monitoreo.','PACI para todos.','Solo prueba estandarizada.'],1,'Unidad 3'],
    ['Decisión pedagógica','Ante evidencia ambigua, ¿qué procede?',['Diagnosticar preventivamente.','Mantener apoyos y ampliar evaluación diferencial e interdisciplinaria.','Retirar apoyos.','Usar el dato más bajo.'],1,'Unidad 3'],
    ['Comprensión conceptual','¿Cuándo corresponde elaborar un PACI?',['Ante todo apoyo.','Cuando se definen adecuaciones curriculares individuales que deben registrarse y monitorearse.','Ante cualquier estrategia diversificada.','Para toda DEA.'],1,'Unidad 4'],
    ['Interpretación','Dos sesiones semanales sin evidencia de cambio informan principalmente:',['Impacto.','Actividad realizada, pero no eficacia.','Autonomía.','Generalización.'],1,'Unidad 4'],
    ['Aplicación','¿Qué completa un plan monitoreable?',['Objetivo general y diagnóstico.','Prioridad, objetivo observable, acción, responsable, indicador y revisión.','Cantidad de informes.','Solo calendario.'],1,'Unidad 4'],
    ['Comprensión conceptual','¿Qué define colaboración efectiva?',['División profesional del estudiante.','Propósito común, roles complementarios y decisiones compartidas.','Más reuniones.','Especialista como único responsable.'],1,'Unidad 5'],
    ['Interpretación','La familia solo firma un plan ya decidido. ¿Qué falta?',['Otro formulario.','Participación auténtica.','Más tecnicismos.','Una prueba médica.'],1,'Unidad 5'],
    ['Aplicación','¿Cómo comunicar información sensible?',['Compartir todo con todo el personal.','Usar lenguaje comprensible y entregar por canales resguardados solo lo pertinente a cada rol.','Grupo abierto de mensajería.','Omitir apoyos.'],1,'Unidad 5']
  ]};
  const module1Expansions={bio:[
    ['Comprensión conceptual','¿Cuál es la unidad de análisis más coherente con el modelo biopsicosocial?',['El diagnóstico considerado de forma aislada.','La interacción entre la persona, la actividad, la participación y las condiciones del contexto.','La conducta observable sin considerar la tarea.','El rendimiento promedio del curso.'],1],
    ['Comprensión conceptual','¿Qué función cumplen los factores ambientales en este modelo?',['Determinan de manera fija el desarrollo.','Pueden actuar como facilitadores o barreras según su interacción con la persona y la actividad.','Sustituyen por completo las características personales.','Solo importan cuando existe discapacidad física.'],1],
    ['Interpretación','Tomás resuelve problemas cuando puede representar las cantidades, pero falla si solo recibe símbolos y tiempo limitado. ¿Qué interpretación es más rigurosa?',['No posee razonamiento matemático.','Su desempeño evidencia una interacción entre representación, tiempo, conocimientos y demandas de la tarea.','Debe trabajar únicamente con material concreto.','La diferencia confirma por sí sola una DEA.'],1],
    ['Interpretación','Una estudiante explica oralmente un concepto con precisión, pero su respuesta escrita es breve y desorganizada. ¿Qué evidencia aporta este contraste?',['Que no comprendió el concepto.','Que la demanda de producción escrita puede interferir con la demostración de lo aprendido.','Que la evaluación oral siempre debe reemplazar la escritura.','Que corresponde reducir el objetivo conceptual.'],1],
    ['Aplicación','Antes de atribuir una dificultad de participación a falta de motivación, ¿qué debería observar el docente?',['Solo la frecuencia de asistencia.','Cómo cambian la participación y la autonomía según agrupamiento, instrucciones, apoyos y clima del aula.','El diagnóstico registrado el año anterior.','La opinión de un único adulto.'],1],
    ['Aplicación','Martín inicia tareas cuando recibe un ejemplo y una lista de pasos, pero espera ayuda constante. ¿Qué acción permite analizar y favorecer autonomía?',['Retirar todos los apoyos inmediatamente.','Mantener la ayuda sin cambios.','Reducir gradualmente las pistas y registrar qué pasos realiza de manera independiente.','Asignar una tarea más fácil sin observar su respuesta.'],2],
    ['Aplicación','Una evaluación pretende medir comprensión científica, pero exige copiar extensos fragmentos. ¿Qué ajuste es coherente con el modelo?',['Eliminar el contenido científico.','Permitir una respuesta que conserve la explicación científica y reduzca la demanda de copia irrelevante.','Calificar principalmente la velocidad de escritura.','Mantener el formato para todos sin analizar barreras.'],1],
    ['Aplicación','Un estudiante evita leer en público después de varias burlas, aunque lee con precisión en pequeño grupo. ¿Qué debe incorporarse al análisis?',['Solo su nivel lector.','La seguridad, las relaciones del grupo y las condiciones de exposición de la actividad.','Únicamente su personalidad.','La necesidad de obligarlo a leer para que se acostumbre.'],1],
    ['Aplicación','El equipo quiere saber si un organizador visual facilita realmente el aprendizaje. ¿Qué evidencia resulta más útil?',['Que al estudiante le agrade el color.','Comparar comprensión, autonomía y transferencia con y sin el apoyo en tareas equivalentes.','El número de organizadores entregados.','La opinión del proveedor del recurso.'],1],
    ['Decisión pedagógica','Una alumna progresa con lectura compartida, pero aún necesita apoyos intensos. ¿Qué decisión es más coherente?',['Concluir que el apoyo fracasó.','Mantener el objetivo, ajustar la intensidad y monitorear progresos y autonomía.','Retirar el apoyo para comprobar voluntad.','Cambiar de inmediato todos los objetivos.'],1],
    ['Decisión pedagógica','Dos estudiantes con el mismo diagnóstico responden de manera distinta a una estrategia. ¿Qué debe decidir el equipo?',['Aplicar idéntico plan por categoría.','Ajustar los apoyos según la evidencia individual y contextual de cada estudiante.','Promediar sus resultados.','Descartar la estrategia para ambos.'],1],
    ['Decisión pedagógica','La clase completa mejora cuando las consignas se segmentan y modelan. ¿Cuál es la decisión más fundada?',['Mantener esa diversificación para el grupo y seguir observando quién requiere apoyos adicionales.','Crear un plan individual para todo el curso.','Volver a consignas extensas para evitar dependencia.','Atribuir la mejora solo a características personales.'],0]
  ],evolution:[
    ['Comprensión conceptual','¿Qué supuesto sostiene una perspectiva centrada en el déficit?',['Las barreras se construyen en la interacción.','La dificultad se localiza principalmente en el individuo y orienta su clasificación.','La escuela debe transformarse desde la diversidad.','La participación es un derecho que organiza la enseñanza.'],1],
    ['Comprensión conceptual','¿Qué distingue integración de inclusión?',['La integración incorpora al estudiante sin exigir necesariamente cambios estructurales; la inclusión transforma las condiciones comunes.','La integración elimina toda categorización.','La inclusión ocurre solo en escuelas especiales.','Ambas expresiones describen exactamente el mismo proceso.'],0],
    ['Interpretación','Una escuela permite asistir al aula común solo a quienes pueden seguir la planificación sin apoyos. ¿Qué enfoque refleja?',['Inclusión.','Integración condicionada a la adaptación del estudiante.','Diseño desde la diversidad.','Participación plena.'],1],
    ['Interpretación','El equipo rediseña horarios, materiales y agrupamientos después de escuchar a estudiantes excluidos de actividades. ¿Qué desplazamiento evidencia?',['De inclusión a segregación.','De una mirada individual a una transformación de prácticas y contexto.','De diversidad a homogeneización.','De participación a clasificación.'],1],
    ['Aplicación','Una docente utiliza la misma guía para todos y prepara después una versión reducida para quienes no avanzan. ¿Qué revisión favorece inclusión?',['Diseñar desde el inicio alternativas de acceso y apoyo vinculadas al mismo propósito.','Mantener la guía y separar permanentemente al grupo.','Reducir todos los objetivos.','Esperar nuevos diagnósticos.'],0],
    ['Aplicación','En una reunión se afirma que un estudiante “pertenece al PIE” y por eso es responsabilidad exclusiva de la especialista. ¿Qué respuesta es más pertinente?',['Aceptar la división de funciones.','Reafirmar la responsabilidad compartida sobre su aprendizaje y participación en el aula común.','Trasladar todas sus evaluaciones fuera del aula.','Solicitar que la familia enseñe los contenidos.'],1],
    ['Aplicación','Una práctica histórica separa a estudiantes para protegerlos de tareas complejas. ¿Qué pregunta ayuda a revisarla desde inclusión?',['¿Cómo mantener la separación con mayor comodidad?','¿Qué barreras y apoyos permitirían participar con sentido en la actividad común?','¿Qué diagnóstico justifica excluirlos?','¿Cómo reducir el tiempo de enseñanza?'],1],
    ['Aplicación','Un establecimiento celebra la diversidad en actos, pero mantiene criterios de participación que excluyen distintas formas de comunicación. ¿Qué debe cambiar?',['Solo el discurso institucional.','Las prácticas y condiciones concretas de participación, además de la cultura declarada.','El nombre de la actividad.','La matrícula del establecimiento.'],1],
    ['Aplicación','Para analizar una medida aparentemente integradora, ¿qué evidencia conviene recoger?',['Solo presencia física.','Presencia, participación, aprendizaje, pertenencia y acceso a apoyos.','Cantidad de diagnósticos.','Número de salas disponibles.'],1],
    ['Decisión pedagógica','Un estudiante se incorpora al aula común, pero trabaja siempre en una tarea paralela sin relación con el curso. ¿Qué decisión corresponde?',['Mantenerla porque comparte el espacio.','Revisar objetivos, apoyos y oportunidades de participación en la experiencia común.','Retirarlo para evitar diferencias.','Calificar únicamente su conducta.'],1],
    ['Decisión pedagógica','El equipo debe escoger entre aumentar retiros individuales o fortalecer apoyos dentro del aula. ¿Qué criterio inclusivo debe orientar la decisión?',['La comodidad adulta.','La alternativa que favorezca aprendizaje, participación y pertenencia con evidencia de efectividad.','La opción más antigua.','El diagnóstico como regla automática.'],1],
    ['Decisión pedagógica','Una política escolar produce exclusión reiterada aunque se aplique igual a todos. ¿Qué debe hacer la comunidad?',['Mantenerla porque es uniforme.','Examinar su impacto y transformarla para asegurar igualdad de oportunidades y participación.','Crear excepciones secretas.','Responsabilizar a quienes no se adaptan.'],1]
  ],inclusion:[
    ['Comprensión conceptual','¿Qué diferencia existe entre una barrera y una necesidad de apoyo?',['La barrera es una etiqueta y el apoyo un diagnóstico.','La barrera describe una condición que limita la interacción; la necesidad de apoyo expresa qué ayuda se requiere para participar y aprender.','Ambas son características fijas del estudiante.','La necesidad de apoyo siempre implica reducir objetivos.'],1],
    ['Comprensión conceptual','¿Qué caracteriza una estrategia diversificada?',['Se diseña únicamente después del fracaso.','Ofrece alternativas pertinentes para responder a la variabilidad del grupo manteniendo el propósito de aprendizaje.','Se asigna según diagnóstico.','Sustituye toda evaluación individual.'],1],
    ['Interpretación','En ciencias, el experimento se explica solo mediante una demostración lejana y sin descripción verbal. ¿Qué barrera puede aparecer?',['Una barrera de acceso a la información para quienes no perciben claramente la demostración.','Una dificultad fija de comprensión científica.','Una necesidad de eliminar el objetivo.','Un problema exclusivamente familiar.'],0],
    ['Interpretación','Un alumno comprende los contenidos, pero nunca es elegido para roles relevantes en el trabajo grupal. ¿Qué dimensión está especialmente comprometida?',['Solo la asistencia.','Participación y pertenencia dentro de la actividad.','El diagnóstico clínico.','La promoción escolar.'],1],
    ['Aplicación','Una familia no puede asistir a reuniones en el único horario ofrecido. ¿Qué acción reduce la barrera?',['Interpretar su ausencia como desinterés.','Ofrecer alternativas de horario o comunicación accesibles y acordadas.','Excluirla de las decisiones.','Solicitar un certificado.'],1],
    ['Aplicación','El objetivo es argumentar una posición y algunos estudiantes requieren apoyos para organizar ideas. ¿Qué diversificación mantiene el propósito?',['Entregar un organizador de razones y evidencias, conservando la elaboración del argumento.','Reemplazar el argumento por copiar una definición.','Calificar solo ortografía.','Eliminar la justificación.'],0],
    ['Aplicación','Una plataforma usa colores como único medio para diferenciar categorías. ¿Qué mejora favorece acceso?',['Agregar etiquetas, símbolos o texto además del color.','Usar más tonos similares.','Pedir memorizar la posición de cada color.','Excluir la actividad digital.'],0],
    ['Aplicación','En una discusión sobre culturas, una estudiante es presionada para hablar en nombre de todo su país. ¿Qué debería hacer la docente?',['Mantener la solicitud para enriquecer la clase.','Evitar la representación forzada, ofrecer participación voluntaria e incorporar fuentes diversas.','Suspender el tema cultural.','Pedir a sus compañeros que evalúen su autenticidad.'],1],
    ['Aplicación','Varios alumnos no comienzan una tarea porque la consigna contiene múltiples acciones implícitas. ¿Qué corresponde probar primero?',['Segmentar la consigna, modelar el producto esperado y verificar comprensión.','Derivar a todos.','Reducir la meta curricular.','Aumentar la sanción por demora.'],0],
    ['Decisión pedagógica','Un apoyo facilita el desempeño, pero expone públicamente al estudiante y genera estigma. ¿Qué decisión es más inclusiva?',['Retirar toda ayuda.','Rediseñar la forma de ofrecer el apoyo para conservar acceso y proteger pertenencia.','Mantenerlo sin cambios porque funciona académicamente.','Separar al estudiante.'],1],
    ['Decisión pedagógica','Una actividad opcional concentra sistemáticamente a estudiantes con mayores apoyos fuera del proyecto central. ¿Qué debe decidir el equipo?',['Mantenerla por ser opcional.','Revisar la estructura para asegurar acceso a roles auténticos y aprendizaje común.','Convertirla en permanente.','Eliminar la evaluación del grupo.'],1],
    ['Decisión pedagógica','Tras diversificar una actividad, algunos estudiantes aún no acceden al aprendizaje. ¿Cuál es el siguiente paso?',['Abandonar la diversificación.','Recoger evidencia individual, intensificar apoyos pertinentes y evaluar su respuesta.','Reducir automáticamente los objetivos.','Esperar al siguiente año.'],1]
  ],regulations:[
    ['Comprensión conceptual','¿Qué relación existe entre un enfoque de derechos y la normativa educativa inclusiva?',['Los derechos solo orientan declaraciones generales.','Los derechos constituyen el marco para interpretar y aplicar procedimientos y decisiones educativas.','Los procedimientos pueden ignorar derechos si son uniformes.','La inclusión depende exclusivamente de reglamentos internos.'],1],
    ['Comprensión conceptual','¿Qué ámbito regula principalmente el Decreto 67?',['Identificación de beneficiarios de subvención especial.','Normas mínimas sobre evaluación, calificación y promoción escolar.','Criterios de accesibilidad de edificios.','Diagnóstico clínico de DEA.'],1],
    ['Interpretación','Un estudiante usa adecuaciones curriculares, pero es evaluado con condiciones que no las consideran. ¿Qué inconsistencia normativa se observa?',['Ninguna, porque todas las pruebas deben ser idénticas.','La evaluación no es coherente ni accesible respecto de las adecuaciones implementadas.','Solo falta una autorización familiar.','Corresponde suspender su promoción.'],1],
    ['Interpretación','El reglamento escolar exige el mismo procedimiento evaluativo aun cuando no permite demostrar el aprendizaje. ¿Qué revisión corresponde?',['Aplicarlo sin excepciones por igualdad.','Asegurar evaluación pertinente y coherente con las oportunidades de aprendizaje y características de los estudiantes.','Reemplazar toda calificación por asistencia.','Usar el Decreto 170 como única respuesta.'],1],
    ['Aplicación','Una escuela prepara un plan de apoyo sin considerar la opinión del estudiante ni su familia. ¿Qué principio debe fortalecer?',['Participación de las personas involucradas en decisiones que les afectan.','Secreto absoluto del equipo.','Clasificación previa a toda consulta.','Uniformidad de las medidas.'],0],
    ['Aplicación','Un equipo confunde el Decreto 83 de 2015 con el antiguo Decreto 83 de 2001. ¿Qué verificación evita el error?',['Consultar solo el número.','Revisar año, materia y texto oficial de la norma aplicable.','Elegir el documento más breve.','Usar cualquiera porque regulan lo mismo.'],1],
    ['Aplicación','Una evaluación sumativa no permite mostrar el aprendizaje que sí se observa en actividades diversificadas. ¿Qué debe analizar el equipo a la luz del Decreto 67?',['Solo aumentar la ponderación.','La coherencia entre evaluación, enseñanza y evidencia del progreso.','Eliminar toda evaluación formal.','Diagnosticar al estudiante.'],1],
    ['Aplicación','Una medida disciplinaria excluye reiteradamente a un estudiante de experiencias de aprendizaje. ¿Qué articulación normativa es más pertinente?',['Considerar únicamente la sanción escrita.','Analizar derecho a la educación, no discriminación, convivencia formativa y continuidad del aprendizaje.','Aplicar solo criterios de subvención.','Revisar únicamente las calificaciones.'],1],
    ['Aplicación','El establecimiento comunica información diagnóstica a personas que no la necesitan para su función. ¿Qué criterio profesional corresponde aplicar?',['Difundirla para asegurar transparencia.','Resguardar la información y compartir solo antecedentes pertinentes para implementar apoyos.','Publicarla sin nombre.','Omitir también los apoyos necesarios.'],1],
    ['Decisión pedagógica','Una norma interna entra en tensión con el acceso y la participación de un estudiante. ¿Qué debe hacer el equipo directivo?',['Aplicarla automáticamente por ser interna.','Revisarla a la luz del marco legal, los derechos y la evidencia del caso.','Solicitar que el estudiante se adapte.','Esperar una denuncia.'],1],
    ['Decisión pedagógica','Ante una posible no promoción, ¿qué decisión refleja mejor el Decreto 67?',['Resolver solo con el promedio.','Realizar un análisis deliberativo basado en antecedentes relevantes y definir acompañamiento pedagógico.','Promover siempre sin revisar evidencia.','Delegar la decisión a un único docente.'],1],
    ['Decisión pedagógica','Un equipo debe decidir qué norma consultar ante una situación compleja. ¿Cuál es el mejor procedimiento?',['Buscar un decreto conocido y aplicarlo completo.','Identificar el derecho y proceso involucrado, consultar textos oficiales vigentes y articular las normas pertinentes.','Usar resúmenes de redes sociales.','Elegir la norma con número más reciente.'],1]
  ],decree83:[
    ['Comprensión conceptual','¿Qué principio orienta la selección de una adecuación curricular?',['Aplicar el mayor cambio posible.','Favorecer acceso, participación y progreso mediante una respuesta pertinente y fundamentada.','Usar la misma medida para cada diagnóstico.','Reemplazar la planificación del curso.'],1],
    ['Comprensión conceptual','¿Qué distingue diversificación de adecuación curricular individual?',['La diversificación amplía opciones para el grupo; la adecuación individual responde a necesidades específicas sustentadas en evaluación.','La diversificación cambia siempre los OA.','La adecuación individual se aplica sin evidencia previa.','No existe diferencia entre ambas.'],0],
    ['Interpretación','El docente presenta un texto en audio y formato digital accesible, manteniendo el análisis del mismo contenido. ¿Qué tipo de respuesta describe?',['Una adecuación de acceso o alternativa de presentación que conserva el objetivo.','Eliminación del objetivo.','Cambio de nivel curricular.','Promoción excepcional.'],0],
    ['Interpretación','El equipo elimina un OA básico sin documentar apoyos previos ni evaluación individual. ¿Qué problema existe?',['Ninguno si hay diagnóstico.','La medida no está suficientemente fundamentada y omite la secuencia de diversificación y evaluación.','Solo falta cambiar la nota.','Debió aplicarse al curso completo.'],1],
    ['Aplicación','Una estudiante conoce la respuesta, pero la escritura manual le impide terminar. El objetivo no evalúa caligrafía. ¿Qué medida es pertinente?',['Permitir teclado o dictado como forma de respuesta.','Eliminar el contenido.','Reducir la complejidad conceptual.','Calificar solo lo escrito a mano.'],0],
    ['Aplicación','El objetivo es leer palabras con precisión. ¿Qué apoyo podría sustituir el aprendizaje central y debe analizarse con cautela?',['Aumentar el tamaño de letra.','Hacer que otra persona lea todas las palabras por el estudiante.','Marcar el inicio de la línea.','Dar tiempo adicional.'],1],
    ['Aplicación','¿Qué debe contener el registro de una adecuación para permitir seguimiento?',['Solo el diagnóstico.','Necesidad identificada, ajuste aplicado, objetivo, responsables, evidencia e instancia de revisión.','Una lista genérica de apoyos.','Únicamente la firma familiar.'],1],
    ['Aplicación','Un estudiante necesita más oportunidades para consolidar un OA sin modificarlo. ¿Qué decisión inicial corresponde?',['Diversificar tiempo, práctica y apoyos, monitoreando el mismo objetivo.','Eliminar el OA.','Cambiarlo por uno de otro nivel de inmediato.','Suspender su evaluación.'],0],
    ['Aplicación','El equipo evalúa una adecuación de acceso. ¿Qué evidencia indicaría que es efectiva?',['Se usa en todas las clases.','Mejora el acceso y la demostración del aprendizaje sin sustituir el proceso central, con mayor autonomía.','Es recomendada para el diagnóstico.','Reduce siempre la exigencia.'],1],
    ['Decisión pedagógica','Una adecuación permite acceso, pero ya no es necesaria porque el estudiante actúa autónomamente. ¿Qué corresponde?',['Mantenerla permanentemente.','Revisarla y reducirla o retirarla gradualmente con monitoreo.','Cambiar los objetivos.','Eliminar otros apoyos a la vez.'],1],
    ['Decisión pedagógica','Dos alternativas permiten participación: una modifica el OA y otra ajusta únicamente el formato. ¿Cuál se prueba primero?',['La modificación del OA.','El ajuste de acceso menos significativo que conserva el aprendizaje.','Ambas simultáneamente sin registro.','Ninguna hasta obtener nuevo diagnóstico.'],1],
    ['Decisión pedagógica','Después de una adecuación, el estudiante no progresa y la evidencia muestra una barrera distinta a la prevista. ¿Qué debe hacer el equipo?',['Mantenerla por estar documentada.','Reevaluar la necesidad, ajustar la medida y volver a monitorear su efecto.','Eliminar todos los objetivos.','Aumentar la calificación.'],1]
  ]};
  Object.entries(module1Expansions).forEach(([key,questions])=>questionSets[key].push(...questions));
  const module1CaseContexts={bio:[
    'Durante varias semanas, el equipo observa el desempeño en actividades individuales y grupales, comparando las ayudas disponibles y el nivel de autonomía alcanzado.',
    'Al revisar el informe semestral, la educadora diferencial advierte que se describen características personales, pero no las exigencias de las tareas ni las condiciones del aula.',
    'En una reunión de planificación, el equipo analiza por qué una misma estudiante obtiene resultados diferentes cuando cambia la forma de presentar las instrucciones.',
    'Para interpretar una producción escrita, se compara lo que la estudiante puede explicar oralmente, los apoyos utilizados y la demanda específica de transcripción.',
    'Antes de formular una hipótesis, el docente reúne observaciones en distintos agrupamientos, conversa con la estudiante y revisa cómo responde a instrucciones y apoyos.',
    'Durante la práctica guiada, Martín completa la actividad con una pauta detallada, pero se detiene cada vez que el adulto se aleja y no inicia el paso siguiente.',
    'En Ciencias, la evaluación busca explicar relaciones entre fenómenos, aunque el formato exige copiar varios párrafos y completar la respuesta dentro de un tiempo breve.',
    'El registro muestra que un estudiante lee con precisión cuando trabaja con dos compañeros, pero evita hacerlo frente al curso después de experiencias de burla.',
    'El equipo implementa un organizador visual durante tres semanas y necesita determinar si el cambio refleja aprendizaje, dependencia del recurso o una mejora transferible.',
    'Después de seis semanas de lectura compartida, la alumna muestra avances parciales, participa con mayor seguridad y todavía requiere mediación frecuente para sostener la tarea.',
    'Dos estudiantes poseen el mismo diagnóstico formal y trabajan el mismo objetivo; sin embargo, uno progresa con modelado y el otro responde mejor a apoyos visuales.',
    'La segmentación y el modelado de consignas mejoran el inicio y la finalización de tareas en gran parte del curso, aunque algunos estudiantes aún requieren ayudas adicionales.',
    'En una clase observada, la participación cambia notoriamente cuando se anticipa la secuencia, se ajusta el agrupamiento y se ofrecen distintas formas de responder.',
    'Un equipo atribuye la baja producción a la DEA registrada, pero no ha comparado el desempeño con apoyos ni ha descrito las demandas de la actividad.',
    'Durante una unidad matemática, el estudiante comprende las relaciones con objetos y dibujos, pero se bloquea al pasar directamente a la notación simbólica.',
    'Tras analizar varias evidencias, el equipo debe escoger una respuesta que mantenga el objetivo, modifique las condiciones pertinentes y permita evaluar posteriormente su efecto.'
  ],evolution:[
    'Al revisar el reglamento y las prácticas de aula, el equipo observa que el acceso a experiencias comunes depende de que cada estudiante responda sin apoyos adicionales.',
    'Después de escuchar a estudiantes que quedaban fuera de talleres y salidas, la escuela modifica horarios, agrupamientos, materiales y formas de participación.',
    'En la planificación semanal se utiliza una guía idéntica para todo el curso y solo después del fracaso se entrega una versión reducida a algunos estudiantes.',
    'Durante una reunión, se afirma que un estudiante es responsabilidad exclusiva del PIE y que el docente de aula solo debe facilitar el espacio físico.',
    'Una práctica institucional separa preventivamente a quienes podrían experimentar dificultad, aunque no se han probado apoyos dentro de la actividad común.',
    'La escuela organiza actos sobre diversidad, pero mantiene exposiciones orales obligatorias como única forma válida de participar y demostrar aprendizaje.',
    'El equipo considera exitosa una medida porque el estudiante está presente en el aula común, sin analizar sus oportunidades reales de aprender, decidir o colaborar.',
    'Un estudiante comparte el espacio del curso, pero desarrolla permanentemente ejercicios paralelos que no se relacionan con el proyecto ni con sus compañeros.',
    'Para responder a dificultades persistentes, el equipo compara aumentar retiros individuales con fortalecer apoyos y cooperación dentro del aula común.',
    'Una regla se aplica de igual forma a todo el alumnado, pero sus efectos excluyen sistemáticamente a quienes necesitan otras modalidades de comunicación.',
    'La escuela permite ingresar al aula común únicamente a estudiantes capaces de seguir el ritmo, los materiales y las evaluaciones sin ajustes.',
    'A partir de testimonios y registros de participación, el establecimiento decide modificar prácticas comunes en vez de preparar a cada estudiante para adaptarse a ellas.',
    'Una docente detecta que el formato único deja fuera a varios estudiantes y debe revisar si adapta al final o diseña desde el inicio para la variabilidad.',
    'En el consejo técnico se discute si pertenecer al PIE traslada la responsabilidad educativa desde el aula común hacia el equipo especialista.',
    'Una medida presentada como integración aumenta la presencia física, pero no el aprendizaje ni la pertenencia; el equipo debe decidir cómo evaluarla.',
    'Los datos muestran exclusión reiterada producida por una política uniforme, aunque la comunidad sostiene que tratar a todos igual garantiza justicia.'
  ],inclusion:[
    'Durante una experiencia de Ciencias, la información esencial se presenta mediante una demostración distante, sin descripción oral, imágenes cercanas ni materiales alternativos.',
    'Un estudiante comprende los contenidos y asiste regularmente, pero en los trabajos grupales recibe siempre tareas periféricas y nunca participa en decisiones relevantes.',
    'La familia manifiesta interés en participar, aunque su jornada laboral coincide con el único horario de reunión y la escuela no ofrece otros canales.',
    'El objetivo de la actividad es construir y justificar una posición, pero varios estudiantes se pierden al organizar razones, evidencias y contraargumentos.',
    'En una plataforma educativa, categorías y estados se comunican exclusivamente mediante colores similares, sin texto, símbolos ni otra señal complementaria.',
    'Durante una conversación sobre migración, la docente solicita a una estudiante que explique la visión de todo su país frente al curso.',
    'Al comenzar una tarea, varios alumnos permanecen inactivos porque la consigna contiene acciones implícitas, vocabulario poco familiar y ningún ejemplo del producto esperado.',
    'Un recurso facilita el desempeño académico, pero se entrega de una forma visible que identifica al estudiante, provoca comentarios y afecta su pertenencia.',
    'Una actividad denominada opcional reúne siempre a quienes requieren mayores apoyos fuera del proyecto central y les asigna funciones de menor relevancia.',
    'Después de diversificar materiales y formas de participación para todo el curso, un grupo pequeño continúa sin acceder al aprendizaje previsto.',
    'La escuela analiza una situación y necesita diferenciar la condición contextual que limita la participación de la ayuda específica requerida para superarla.',
    'En la planificación se proponen distintas formas de acceso y respuesta para el grupo antes de conocer quién podría experimentar dificultad.',
    'Una plataforma de lectura funciona correctamente para la mayoría, pero su diseño impide utilizar lector de pantalla y navegar mediante teclado.',
    'Las comunicaciones a las familias incluyen abreviaturas normativas y términos técnicos, sin ejemplos ni versiones comprensibles para distintos repertorios lingüísticos.',
    'Algunos estudiantes necesitan más tiempo y una pauta para organizar la respuesta, aunque el propósito es evaluar la calidad de sus argumentos y no la rapidez.',
    'El equipo constata baja participación de varios estudiantes y debe decidir si comienza por derivaciones individuales o por revisar la actividad y escuchar sus perspectivas.'
  ],regulations:[
    'En un consejo técnico, el equipo debe fundamentar una decisión curricular y distingue entre normas sobre inclusión, identificación de NEE, diversificación y evaluación.',
    'Una evaluación sumativa utiliza un formato único que no considera los apoyos implementados y contradice la evidencia obtenida durante la enseñanza.',
    'El equipo planifica una adecuación curricular en educación básica y necesita identificar el texto normativo que orienta diversificación y ajustes individuales.',
    'Una escuela mantiene una única prueba para todo el curso, aunque la enseñanza fue diversificada y el formato impide que algunos demuestren su aprendizaje.',
    'Antes de modificar individualmente el currículo, el equipo revisa qué estrategias diversificadas se implementaron, con qué intensidad y qué respuesta produjeron.',
    'Durante el proceso de admisión, una familia recibe una negativa vinculada directamente con la discapacidad y las necesidades de apoyo de su hija.',
    'Frente a conflictos reiterados, el establecimiento propone solo sanciones y no considera prevención, participación, cuidado colectivo ni continuidad del aprendizaje.',
    'Ante un caso complejo, distintas personas citan decretos de memoria sin identificar primero el derecho, el proceso educativo ni la materia que regula cada norma.',
    'Un plan de apoyo se elabora sin conversar con el estudiante ni su familia, aunque las decisiones modificarán sus oportunidades cotidianas de participación.',
    'El equipo encuentra dos decretos con el mismo número, pero de años y materias diferentes, y debe evitar aplicar una referencia equivocada.',
    'La evidencia formativa muestra aprendizaje, pero la prueba final introduce demandas no enseñadas y produce un resultado que el equipo debe interpretar.',
    'Una sanción reiterada deja al estudiante fuera de clases y actividades evaluadas, afectando simultáneamente convivencia, inclusión y continuidad educativa.',
    'Información diagnóstica completa circula entre personas que no participan en la implementación de apoyos y no necesitan conocer esos antecedentes.',
    'Una disposición interna restringe el acceso de un estudiante; el equipo directivo debe resolver la tensión entre uniformidad administrativa y derechos educativos.',
    'Al analizar una eventual no promoción, existen antecedentes de progreso, asistencia, apoyos, bienestar y condiciones contextuales que no se reflejan en el promedio.',
    'El equipo enfrenta una situación que involucra evaluación, participación y adecuaciones, por lo que debe determinar cómo consultar y articular normativa vigente.'
  ],decree83:[
    'El docente ofrece el mismo contenido en audio y formato digital accesible, y mantiene para todo el grupo el análisis y los criterios del objetivo original.',
    'Sin documentar apoyos previos ni respuesta a la enseñanza, el equipo propone eliminar un objetivo básico basándose únicamente en el diagnóstico.',
    'Una estudiante explica con precisión el contenido, pero la escritura manual lenta le impide terminar; la caligrafía no forma parte del objetivo evaluado.',
    'La actividad pretende evaluar lectura precisa de palabras, y el equipo compara apoyos que facilitan el acceso con otros que podrían ejecutar la lectura por el estudiante.',
    'Al revisar un PACI, se observa una lista genérica de medidas sin necesidad identificada, responsables, indicadores ni fecha para valorar resultados.',
    'Un estudiante requiere más práctica, tiempo y modelado para consolidar el mismo objetivo, y todavía no existe evidencia que justifique modificarlo.',
    'Después de implementar un formato accesible, el equipo debe distinguir entre uso frecuente del recurso y mejora real en acceso, aprendizaje y autonomía.',
    'Una adecuación de acceso fue efectiva durante meses; actualmente el estudiante demuestra el aprendizaje de manera autónoma en distintos contextos.',
    'Existen dos alternativas viables: una modifica el objetivo curricular y otra elimina una barrera del formato manteniendo intacto el aprendizaje esperado.',
    'El seguimiento muestra ausencia de progreso y nuevas evidencias indican que la adecuación implementada respondía a una barrera distinta de la actual.',
    'En una tarea escrita, la estudiante utiliza teclado para producir el mismo tipo de texto y es evaluada con los criterios de contenido y organización del curso.',
    'Pese a estrategias diversificadas sostenidas y monitoreadas, el estudiante mantiene un desfase relevante y el equipo considera graduar la complejidad del objetivo.',
    'Una dificultad aparece en gran parte del curso ante instrucciones extensas; aún no se han probado ejemplos, segmentación ni apoyos visuales comunes.',
    'El estudiante comprende el contenido, pero el tamaño y contraste del texto impreso impiden acceder a la información necesaria para realizar la actividad.',
    'Antes de definir una adecuación individual, el equipo dispone de evaluación amplia, registros de diversificación y evidencia de respuesta insuficiente.',
    'Al seleccionar una medida, el equipo compara cambios de diferente magnitud y necesita conservar al máximo la participación y el progreso en el currículo común.'
  ]};
  const module1ContextOrder={
    bio:[0,1,2,14,4,15,14,3,12,5,6,7,8,9,10,11],
    evolution:[0,10,4,5,9,14,10,1,2,3,4,5,6,7,8,9],
    inclusion:[12,13,14,11,5,15,0,1,2,3,4,5,6,7,8,9],
    regulations:[2,3,4,5,6,7,1,3,8,9,10,11,12,13,14,15],
    decree83:[10,11,12,13,14,15,0,1,2,3,4,5,6,7,8,9]
  };
  const module1ComplexityLayer={
    bio:{
      'Interpretación':'El registro reúne observaciones en más de un contexto, por lo que el equipo debe distinguir entre las características del estudiante, las demandas de la tarea y los apoyos disponibles.',
      'Aplicación':'El propósito curricular se mantiene y se busca una medida que reduzca la barrera sin sustituir el aprendizaje que el estudiante debe desarrollar o demostrar.',
      'Decisión pedagógica':'Las alternativas consideradas podrían aportar, pero el equipo debe priorizar la que articule mejor evidencia individual, condiciones contextuales, autonomía y seguimiento posterior.'
    },
    evolution:{
      'Interpretación':'Además de la presencia física, los registros muestran quién accede al aprendizaje común, qué prácticas se transforman y a quién se atribuye la responsabilidad de adaptarse.',
      'Aplicación':'La revisión debe distinguir entre incorporar al estudiante bajo condiciones ya definidas y transformar la experiencia común para ampliar participación, aprendizaje y pertenencia.',
      'Decisión pedagógica':'El equipo dispone de datos sobre presencia, participación, aprendizaje y pertenencia, y debe evitar decidir únicamente por tradición institucional o categoría diagnóstica.'
    },
    inclusion:{
      'Interpretación':'La información permite analizar si la limitación se relaciona con el recurso, la organización, la comunicación o las relaciones, sin atribuirla automáticamente al estudiante.',
      'Aplicación':'El propósito curricular se mantiene y se busca una medida que reduzca la barrera sin sustituir el aprendizaje que el estudiante debe desarrollar o demostrar.',
      'Decisión pedagógica':'Antes de decidir, el equipo recoge la perspectiva de quienes participan y compara efectos sobre acceso, aprendizaje, autonomía y pertenencia.'
    },
    regulations:{
      'Interpretación':'Para fundamentar el análisis, el equipo debe identificar el derecho y el proceso educativo comprometidos, además de la materia específica que regula cada norma.',
      'Aplicación':'La respuesta debe articular derechos y normativa vigente con la evidencia pedagógica del caso, evitando aplicar un decreto solo por su número o familiaridad.',
      'Decisión pedagógica':'La decisión requiere consultar textos oficiales vigentes, justificar cómo se relacionan con el caso y definir responsabilidades y seguimiento.'
    },
    decree83:{
      'Interpretación':'Para clasificar la medida, el equipo debe determinar si cambia únicamente el acceso o si modifica el aprendizaje curricular esperado.',
      'Aplicación':'El propósito curricular se mantiene y se busca una medida que reduzca la barrera sin sustituir el aprendizaje que el estudiante debe desarrollar o demostrar.',
      'Decisión pedagógica':'Las alternativas difieren en magnitud, por lo que debe priorizarse una respuesta fundamentada, lo menos significativa posible y sujeta a monitoreo y revisión.'
    }
  };
  Object.entries(module1CaseContexts).forEach(([key,contexts])=>{
    let contextIndex=0;
    questionSets[key].forEach(question=>{
      if(question[0]==='Comprensión conceptual')return;
      const position=contextIndex++;
      const centralQuestion=question[1].match(/¿[^?]+\?$/)?.[0]||question[1];
      const complexity=position%2===0?` ${module1ComplexityLayer[key][question[0]]}`:'';
      question[1]=`${contexts[module1ContextOrder[key][position]]}${complexity} ${centralQuestion}`;
    });
  });
  const module2Expansions={assessment:[
    ['Comprensión conceptual','¿Qué significa que una evaluación tenga carácter funcional?',['Que se aplica rápidamente.','Que describe cómo participa y aprende el estudiante bajo condiciones concretas para orientar apoyos.','Que produce siempre un diagnóstico.','Que utiliza exclusivamente tareas cotidianas.'],1],
    ['Comprensión conceptual','¿Por qué las fortalezas forman parte de una evaluación integral?',['Solo equilibran el informe.','Permiten comprender recursos disponibles y diseñar apoyos que favorezcan aprendizaje y participación.','Reemplazan el análisis de dificultades.','Determinan automáticamente la promoción.'],1],
    ['Interpretación','Una estudiante obtiene puntajes bajos al inicio del día, pero trabaja con autonomía después de anticipar la rutina. ¿Qué debe interpretar el equipo?',['El puntaje inicial describe toda su capacidad.','Las condiciones y apoyos modifican el desempeño y deben incorporarse al análisis.','La anticipación invalida la evaluación.','Solo importa el mejor resultado.'],1],
    ['Interpretación','Escuela y familia describen desempeños opuestos en lectura. ¿Qué corresponde hacer?',['Elegir el informe escolar.','Precisar tareas, contextos, ayudas y oportunidades de práctica en ambos espacios.','Promediar ambas opiniones.','Descartar la información familiar.'],1],
    ['Aplicación','¿Qué pregunta inicial favorece una evaluación orientada a decisiones?',['¿Qué prueba está disponible?','¿Qué necesitamos comprender para decidir un apoyo educativo concreto?','¿Qué categoría puede asignarse?','¿Qué resultado es el más bajo?'],1],
    ['Aplicación','Un equipo observa baja producción escrita. ¿Qué conjunto de evidencias permite comprender mejor el patrón?',['Solo el texto final.','Producciones, observación del proceso, respuesta oral, apoyos probados e historia de enseñanza.','Una encuesta de satisfacción.','El promedio anual exclusivamente.'],1],
    ['Aplicación','¿Cómo incorporar la voz del estudiante en la evaluación?',['Pedirle que confirme el informe.','Explorar su experiencia, estrategias, barreras percibidas y apoyos que considera útiles, contrastándolo con otras evidencias.','Permitirle escoger el diagnóstico.','Sustituir todas las demás fuentes.'],1],
    ['Aplicación','Una prueba se aplicó durante una crisis emocional. ¿Cómo debe usarse el resultado?',['Como medida estable.','Con cautela, registrando la condición y recogiendo evidencia comparable en otro momento.','Debe eliminarse toda evaluación.','Como confirmación de dificultad permanente.'],1],
    ['Aplicación','¿Qué registro facilita decisiones posteriores?',['“Le fue mal”.','Descripción de tarea, condiciones, estrategias, errores, apoyos y cambio observado.','Solo el puntaje total.','Una etiqueta global.'],1],
    ['Decisión pedagógica','La evidencia formal y de aula no coincide. ¿Qué decide un equipo riguroso?',['Conservar solo la prueba formal.','Ampliar y triangular evidencia antes de formular conclusiones y apoyos.','Usar el dato menor.','Suspender toda intervención.'],1],
    ['Decisión pedagógica','Una fortaleza oral permite acceder a contenidos mientras se trabaja la lectura. ¿Qué decisión corresponde?',['Ignorarla para no compensar.','Utilizarla como vía de acceso sin abandonar la enseñanza del proceso lector.','Reemplazar permanentemente toda lectura.','Reducir los objetivos conceptuales.'],1],
    ['Decisión pedagógica','La evaluación identifica una barrera común a varios estudiantes. ¿Qué acción es prioritaria?',['Elaborar planes individuales para todos.','Modificar la enseñanza o el contexto común y luego identificar necesidades adicionales.','Derivar al grupo completo.','Mantener la planificación para comparar.'],1]
  ],psychoeducational:[
    ['Comprensión conceptual','¿Qué aporta el análisis de errores a la evaluación psicopedagógica?',['Solo cuenta respuestas incorrectas.','Permite inferir estrategias, conocimientos y procesos que requieren apoyo.','Confirma por sí solo un diagnóstico.','Sustituye la observación.'],1],
    ['Comprensión conceptual','¿Qué es una línea base?',['La nota mínima de aprobación.','Una descripción inicial del desempeño con indicadores y condiciones comparables.','El primer diagnóstico disponible.','Un promedio del curso.'],1],
    ['Interpretación','Un alumno responde bien preguntas de selección, pero no explica su razonamiento. ¿Qué falta conocer?',['Solo su velocidad.','La estrategia y profundidad de comprensión que sostiene la respuesta.','La opinión familiar.','Su asistencia.'],1],
    ['Interpretación','Una tarea matemática cambia simultáneamente instrucciones, material y tiempo. El desempeño mejora. ¿Qué limitación tiene la conclusión?',['Ninguna.','No permite identificar qué cambio produjo el efecto.','Demuestra falta de motivación.','Confirma una DEA.'],1],
    ['Aplicación','¿Cómo explorar el proceso de escritura además del producto final?',['Aplicar un dictado únicamente.','Observar planificación, redacción, revisión, verbalizaciones y respuesta a apoyos.','Contar palabras.','Calificar presentación.'],1],
    ['Aplicación','Para comparar dos mediciones de progreso, ¿qué debe mantenerse razonablemente equivalente?',['El día de la semana solamente.','La habilidad, dificultad de la tarea, condiciones y criterios de corrección.','El color del material.','La persona que entrega la nota.'],1],
    ['Aplicación','Un instrumento fue diseñado para otra edad y población. ¿Qué debe hacer el profesional?',['Aplicarlo y ajustar el puntaje informalmente.','Revisar su pertinencia y límites, seleccionando evidencia válida para el propósito.','Usarlo porque está estandarizado.','Interpretarlo como diagnóstico.'],1],
    ['Aplicación','¿Qué técnica permite conocer cómo un estudiante resuelve un problema?',['Solicitar solo la respuesta.','Pedir que explique o muestre los pasos mientras se registran estrategias y errores.','Repetir el enunciado.','Comparar su nota con el curso.'],1],
    ['Aplicación','La comprensión mejora al reducir vocabulario no esencial. ¿Qué hipótesis surge?',['El objetivo era imposible.','La demanda lingüística secundaria interfería y debe examinarse separadamente del concepto.','Debe eliminarse todo vocabulario académico.','El diagnóstico queda confirmado.'],1],
    ['Decisión pedagógica','Los datos cuantitativos muestran progreso, pero el estudiante continúa evitando la actividad. ¿Qué decide el equipo?',['Cerrar el apoyo por mejora.','Integrar evidencia de desempeño y participación para ajustar la intervención.','Ignorar la evitación.','Aumentar la calificación.'],1],
    ['Decisión pedagógica','Una prueba entrega un puntaje global bajo, sin detalle de procesos. ¿Cuál es el siguiente paso?',['Planificar un apoyo genérico.','Recoger evidencia específica de tareas, errores, estrategias y respuesta a ayudas.','Confirmar una dificultad general.','Repetir la misma prueba muchas veces.'],1],
    ['Decisión pedagógica','El formato impide responder, pero el objetivo permanece accesible oralmente. ¿Qué decisión favorece validez?',['Mantener el formato.','Ajustar la modalidad de respuesta y recoger evidencia del mismo objetivo.','Cambiar el objetivo.','No evaluar.'],1]
  ],deaIdentification:[
    ['Comprensión conceptual','¿Qué significa persistencia al identificar una posible DEA?',['Una dificultad observada una vez.','Un patrón que se mantiene en el tiempo pese a enseñanza y apoyos pertinentes documentados.','Una nota baja durante un semestre.','La existencia de antecedentes familiares.'],1],
    ['Comprensión conceptual','¿Qué función cumple la respuesta a la intervención en el proceso de identificación?',['Reemplaza toda evaluación.','Aporta evidencia sobre cómo cambia el desempeño ante apoyos explícitos y monitoreados.','Garantiza un diagnóstico.','Permite retirar apoyos antes de evaluar.'],1],
    ['Interpretación','Una estudiante falta con frecuencia y no ha recibido continuidad pedagógica. Presenta bajo desempeño lector. ¿Qué debe analizarse primero?',['Confirmar DEA.','El impacto del acceso discontinuo a enseñanza y apoyos antes de atribuir una dificultad específica.','Reducir objetivos.','Aplicar solo una prueba normativa.'],1],
    ['Interpretación','Un alumno presenta errores solo en textos con vocabulario que aún no se ha enseñado. ¿Qué explicación debe contrastarse?',['Déficit permanente.','Falta de conocimiento lingüístico y oportunidades de enseñanza del vocabulario.','DEA confirmada.','Problema motor.'],1],
    ['Aplicación','¿Qué evidencia permite distinguir dificultad persistente de aprendizaje insuficientemente enseñado?',['Una comparación con compañeros.','Registro de enseñanza explícita, asistencia, oportunidades de práctica y progreso bajo apoyo.','Solo una entrevista.','Un diagnóstico previo de un familiar.'],1],
    ['Aplicación','Un estudiante bilingüe aprende en una lengua de escolarización reciente. ¿Qué debe incluir la evaluación?',['Solo pruebas en la lengua escolar.','Historia lingüística, competencia en ambas lenguas, oportunidades educativas y tareas culturalmente pertinentes.','Asignación inmediata de DEA.','Exclusión de la familia.'],1],
    ['Aplicación','¿Cómo documentar una intervención previa a la identificación?',['“Recibió apoyo”.','Objetivo, estrategia, frecuencia, duración, fidelidad e indicadores de progreso.','Solo número de sesiones.','Nombre del profesional.'],1],
    ['Aplicación','Hay dificultades matemáticas y ansiedad intensa durante evaluaciones. ¿Qué procede?',['Concluir DEA matemática.','Recoger evidencia en condiciones variadas y abordar la ansiedad como explicación concurrente.','Ignorar la emoción.','Evaluar únicamente bajo presión.'],1],
    ['Aplicación','Un estudiante mejora en la habilidad enseñada, pero no la transfiere. ¿Qué debe analizar el equipo?',['Que el apoyo no funcionó.','Generalización, variedad de práctica y nivel de ayuda requerido.','Solo el puntaje final.','Cambio de diagnóstico.'],1],
    ['Decisión pedagógica','La evidencia muestra dificultades, pero la intervención no tuvo fidelidad. ¿Qué decisión corresponde?',['Declarar falta de respuesta.','Asegurar implementación adecuada y volver a monitorear antes de concluir.','Confirmar DEA.','Retirar apoyos.'],1],
    ['Decisión pedagógica','Se identifica una dificultad sensorial no atendida que puede explicar el desempeño. ¿Qué debe decidir el equipo?',['Ignorarla y continuar el diagnóstico.','Abordar el acceso sensorial y reevaluar el aprendizaje con apoyos pertinentes.','Reducir el currículo.','Suspender toda enseñanza.'],1],
    ['Decisión pedagógica','Tras apoyo de calidad, el progreso sigue siendo significativamente menor y se descartaron explicaciones alternativas relevantes. ¿Qué procede?',['Finalizar los apoyos.','Ampliar la evaluación interdisciplinaria manteniendo la respuesta educativa.','Esperar otro año sin cambios.','Usar solo el diagnóstico médico.'],1]
  ],supportPlanning:[
    ['Comprensión conceptual','¿Qué distingue un indicador de resultado de uno de actividad?',['El resultado describe acciones realizadas; la actividad describe cambios.','El resultado muestra cambios en aprendizaje, participación o autonomía; la actividad registra lo ejecutado.','Son equivalentes.','El resultado siempre es una calificación.'],1],
    ['Comprensión conceptual','¿Qué significa ajustar la intensidad de un apoyo?',['Cambiar necesariamente el objetivo.','Modificar frecuencia, duración, tamaño del grupo o nivel de ayuda según evidencia.','Agregar tareas sin planificación.','Mantenerlo por más tiempo sin revisar.'],1],
    ['Interpretación','Un plan registra 20 sesiones realizadas y ningún dato de desempeño. ¿Qué puede concluirse?',['Que el apoyo fue efectivo.','Que hubo actividad, pero no evidencia suficiente de impacto.','Que debe mantenerse.','Que existe autonomía.'],1],
    ['Interpretación','El estudiante mejora en apoyo individual, pero no participa en aula. ¿Qué debilidad presenta el plan?',['Exceso de objetivos.','Falta de generalización y articulación con el contexto donde debe usar la habilidad.','Pocas firmas.','Demasiada evaluación.'],1],
    ['Aplicación','¿Qué objetivo de apoyo es más monitoreable?',['Participar mejor.','Durante seis semanas iniciará la tarea con una pauta visual y máximo una indicación en 4 de 5 oportunidades.','Mostrar motivación.','Recibir dos sesiones.'],1],
    ['Aplicación','¿Cómo seleccionar un indicador de autonomía?',['Contar ayudas entregadas únicamente.','Registrar nivel y frecuencia de ayuda necesaria para completar pasos definidos.','Usar la nota final.','Preguntar solo al adulto.'],1],
    ['Aplicación','Un plan tiene diez objetivos simultáneos. ¿Qué conviene hacer?',['Agregar responsables.','Priorizar pocas necesidades relevantes y articular acciones complementarias.','Mantenerlos para cubrir todo.','Evaluar solo al final.'],1],
    ['Aplicación','¿Qué favorece la transferencia de una estrategia?',['Practicar siempre con la misma ficha.','Planificar uso gradual en tareas, personas y contextos variados con ayudas decrecientes.','Explicarla una vez.','Mantener apoyo adulto constante.'],1],
    ['Aplicación','La familia informa que el apoyo altera rutinas y no puede sostenerse. ¿Qué debe hacer el equipo?',['Responsabilizarla.','Rediseñar una acción viable conservando el objetivo y acordar cómo monitorearla.','Excluirla del plan.','Cerrar el apoyo.'],1],
    ['Decisión pedagógica','El estudiante alcanzó el objetivo con autonomía durante varias mediciones. ¿Qué corresponde?',['Mantener igual intensidad.','Retirar o reducir gradualmente el apoyo y verificar mantenimiento.','Cambiar inmediatamente el OA.','Finalizar todo seguimiento.'],1],
    ['Decisión pedagógica','No hay progreso y la implementación fue fiel. ¿Cuál es la decisión más rigurosa?',['Repetir indefinidamente.','Revisar hipótesis, método e intensidad y definir un nuevo periodo de monitoreo.','Atribuir falta de esfuerzo.','Eliminar el objetivo.'],1],
    ['Decisión pedagógica','Dos apoyos producen resultados similares, pero uno exige dependencia adulta constante. ¿Cuál elegir?',['El más intensivo.','El que favorece mayor autonomía y participación con menor ayuda efectiva.','Ambos permanentemente.','El más costoso.'],1]
  ],collaboration:[
    ['Comprensión conceptual','¿Qué significa corresponsabilidad en el apoyo educativo?',['Que todos realizan la misma tarea.','Que los participantes asumen aportes complementarios hacia una prioridad compartida.','Que la especialista responde por todo.','Que la familia ejecuta el plan escolar.'],1],
    ['Comprensión conceptual','¿Qué caracteriza una decisión compartida?',['La mayoría impone su opinión.','Integra evidencia, derechos y perspectivas relevantes para acordar acciones revisables.','Requiere unanimidad en todo.','Evita definir responsables.'],1],
    ['Interpretación','En cada reunión se repiten preocupaciones, pero no se revisan acuerdos anteriores. ¿Qué falta?',['Más participantes.','Seguimiento de acciones, indicadores y responsabilidades.','Un nuevo diagnóstico.','Mayor duración.'],1],
    ['Interpretación','La familia describe una estrategia eficaz en casa, pero el equipo la descarta sin probarla. ¿Qué problema existe?',['Exceso de evidencia.','Falta de reconocimiento y contraste de saberes relevantes.','Demasiada confidencialidad.','Ausencia de calificación.'],1],
    ['Aplicación','¿Cómo iniciar una reunión centrada en soluciones?',['Revisar todas las dificultades.','Definir una pregunta prioritaria y presentar evidencia comprensible, incluidas fortalezas.','Distribuir informes.','Confirmar decisiones previas.'],1],
    ['Aplicación','Docente y especialista observan resultados distintos. ¿Qué deberían hacer?',['Defender cada perspectiva.','Comparar tareas, contextos, apoyos y criterios antes de acordar una hipótesis.','Promediar opiniones.','Elegir a quien tiene más experiencia.'],1],
    ['Aplicación','¿Qué acuerdo de colaboración es operativo?',['“Apoyar más”.','La docente modelará la estrategia tres veces por semana, la especialista observará una sesión y revisarán el indicador el viernes.','Reunirse cuando sea posible.','La familia se hará cargo.'],1],
    ['Aplicación','Un estudiante solicita participar en la reunión sobre sus apoyos. ¿Qué corresponde?',['Negarlo por confidencialidad.','Incorporar su voz de manera adecuada a su edad y condiciones de comunicación.','Permitirle solo firmar.','Sustituir la opinión familiar.'],1],
    ['Aplicación','¿Cómo comunicar desacuerdo sin romper la colaboración?',['Evitar registrarlo.','Explicitar perspectivas, volver a la evidencia y acordar qué información permitirá revisar la decisión.','Imponer el criterio profesional.','Suspender el plan.'],1],
    ['Decisión pedagógica','Un apoyo externo contradice el objetivo trabajado en aula. ¿Qué decide el equipo?',['Mantener ambos planes.','Alinear la prioridad y coordinar aportes para evitar fragmentación.','Eliminar el trabajo de aula.','Dejar que el estudiante elija sin orientación.'],1],
    ['Decisión pedagógica','La información diagnóstica circula por un grupo amplio de mensajería. ¿Qué debe decidir la escuela?',['Continuar por rapidez.','Usar canales resguardados y limitar la información a lo pertinente para cada rol.','Eliminar toda comunicación.','Compartir también evaluaciones completas.'],1],
    ['Decisión pedagógica','La familia no acepta una medida que el equipo considera útil. ¿Cuál es el siguiente paso?',['Aplicarla sin informar.','Comprender sus razones, explicar evidencia y alternativas, y acordar una prueba monitoreada cuando sea posible.','Cerrar el caso.','Retirar todos los apoyos.'],1]
  ]};
  Object.entries(module2Expansions).forEach(([key,questions])=>questionSets[key].push(...questions));
  const module2CaseContexts={assessment:[
    'El equipo dispone de resultados de pruebas, producciones de aula y entrevistas, pero el informe resume únicamente los puntajes más bajos.',
    'La familia relata que Martín organiza compras y calcula vueltos, aunque en la prueba escrita de matemática dejó varios ejercicios sin responder.',
    'Durante dos semanas, Antonia completa más etapas cuando recibe una pauta visual y solicita menos ayuda que ante instrucciones extensas.',
    'La devolución enumera dificultades con términos técnicos, sin explicar qué apoyos implementará la escuela ni cómo se revisarán.',
    'El equipo debe decidir entre aumentar la ejercitación individual o modificar una actividad con instrucciones densas, poco tiempo y una única respuesta.',
    'Los profesionales aplicaron instrumentos y observaron clases, pero todavía no vinculan cada necesidad identificada con acciones concretas.',
    'Camila comunica ideas complejas oralmente y se orienta con esquemas, aunque su producción escrita es breve.',
    'En una clase con ruido y tiempo limitado, Tomás obtiene un resultado bajo; con anticipación y una pauta por pasos trabaja sostenidamente.',
    'Antes de escoger instrumentos, el equipo discute si necesita conocer precisión, comprensión, respuesta a ayudas o participación en tareas auténticas.',
    'Ante una baja producción escrita, la escuela cuenta con textos finales, registros de planificación, explicaciones orales y apoyos ya probados.',
    'Durante una entrevista accesible, la estudiante describe tareas difíciles, estrategias útiles y situaciones en que la ayuda adulta limita su autonomía.',
    'La prueba se aplicó el día en que el estudiante llegó alterado por una situación familiar y necesitó pausas poco habituales.',
    'El registro solo señala “no logra la actividad”, aunque el equipo necesita planificar qué ayuda probar y con qué indicador.',
    'Una prueba formal indica bajo desempeño, mientras producciones recientes y observaciones sistemáticas muestran avances bajo ciertas condiciones.',
    'Mientras fortalece la lectura, una estudiante comprende explicaciones orales y relaciona conceptos cuando accede al contenido por audio.',
    'La evaluación revela que varios estudiantes se confunden ante la misma organización de instrucciones, pero muestran el aprendizaje en formatos claros.'
  ],psychoeducational:[
    'En una prueba individual, Benjamín obtiene un resultado bajo; en tareas curriculares explica procedimientos y corrige errores ante una pregunta de apoyo.',
    'Dos actividades evalúan comprensión, pero una exige copiar respuestas extensas y la otra permite seleccionar y justificar oralmente.',
    'La estudiante responde correctamente varias preguntas, aunque no explica cómo llegó a sus respuestas ni detecta una contradicción del texto.',
    'En una tarea matemática se modificaron simultáneamente el lenguaje, el material, el tiempo y la mediación adulta; luego mejoró el resultado.',
    'El profesional necesita conocer cómo el estudiante anticipa, ejecuta y revisa una tarea de escritura, no solo el producto final.',
    'El equipo compara mediciones aplicadas con textos, tiempos y criterios diferentes, y advierte que esa variación afecta la interpretación.',
    'Se propone una prueba cuya población normativa y edad no coinciden con el estudiante, aunque el instrumento está disponible.',
    'El estudiante anota una respuesta incorrecta, pero sus pasos pueden revelar si comprendió la operación y dónde se produjo el error.',
    'La estudiante comprende la relación matemática al eliminar vocabulario secundario, manteniendo intactos el concepto y la dificultad numérica.',
    'Los datos cuantitativos muestran progreso, pero en el aula el estudiante evita comenzar y abandona ante el primer error.',
    'El informe presenta un puntaje global bajo, sin detallar tareas, errores, estrategias ni respuesta a mediaciones.',
    'El formato escrito impide mostrar lo aprendido; oralmente, el estudiante desarrolla correctamente el mismo razonamiento.'
  ],deaIdentification:[
    'Un curso completo presenta dificultades lectoras después de meses con alta rotación docente, poca enseñanza sistemática y escasa práctica guiada.',
    'Tras seis semanas de enseñanza explícita, una estudiante mejora rápidamente en precisión y comienza a aplicar la estrategia sin ayuda.',
    'El estudiante presenta bajo desempeño lector, pero ha faltado reiteradamente y no ha tenido continuidad en los apoyos.',
    'Los errores aparecen en textos con vocabulario disciplinar todavía no enseñado; en textos familiares la lectura es adecuada.',
    'Antes de concluir persistencia, el equipo revisa asistencia, enseñanza explícita, oportunidades de práctica y evolución durante el apoyo.',
    'Una estudiante bilingüe comenzó recientemente a aprender en español y muestra desempeños diferentes según lengua, familiaridad cultural y tarea.',
    'El expediente solo consigna “recibió refuerzo”, sin precisar objetivo, estrategia, frecuencia, duración, fidelidad ni progreso.',
    'En evaluaciones cronometradas, un estudiante se bloquea y comete errores matemáticos; en actividades graduadas explica parte del procedimiento.',
    'El estudiante responde en sesiones de apoyo, pero no utiliza la estrategia aprendida en problemas nuevos del aula.',
    'Los resultados siguen bajos, pero la intervención se aplicó irregularmente y con actividades distintas a las acordadas.',
    'Se detecta una dificultad visual no corregida que afecta el acceso a textos, símbolos y detalles gráficos usados en las mediciones.',
    'Tras una intervención pertinente, intensa y bien documentada, el progreso continúa siendo menor y se examinaron explicaciones alternativas.'
  ],supportPlanning:[
    'El plan señala “mejorar lectura” y enumera sesiones, pero no define desempeño esperado, estrategia, responsable, indicador ni revisión.',
    'El estudiante aumenta su precisión con apoyo individual, aunque espera que el adulto indique cada paso antes de comenzar.',
    'El equipo debe traducir una necesidad amplia de participación en una meta observable durante tareas habituales y en un plazo definido.',
    'Para monitorear, se comparan indicadores de ejecución administrativa con cambios efectivos en aprendizaje, participación y autonomía.',
    'No se observa progreso; antes de cambiar el objetivo, el equipo necesita revisar si la estrategia se aplicó como fue planificada.',
    'El apoyo ocurre fuera del aula y con tareas distintas; docente y especialista trabajan objetivos paralelos sin coordinación.',
    'El registro informa veinte sesiones, pero no contiene datos sobre desempeño inicial, evolución, participación ni ayuda requerida.',
    'En apoyo individual completa la tarea; en aula no reconoce cuándo usar la estrategia y vuelve a depender de indicaciones.',
    'El borrador contiene diez objetivos simultáneos, distintos responsables y acciones difíciles de sostener.',
    'El equipo quiere transferir una estrategia aprendida con una ficha a asignaturas, materiales, personas y situaciones diferentes.',
    'La familia explica que una actividad diaria no es compatible con sus horarios, aunque comparte el propósito de autonomía.',
    'En cuatro mediciones consecutivas, la estudiante alcanza el objetivo en contextos distintos sin la ayuda que antes necesitaba.',
    'La intervención se implementó con la frecuencia y estrategia acordadas, pero los indicadores permanecen estables.',
    'Dos apoyos producen resultados semejantes; uno exige guía permanente y el otro utiliza una pauta manejada por el estudiante.'
  ],collaboration:[
    'Docente y especialista trabajan con el mismo estudiante, pero planifican por separado y utilizan estrategias contradictorias.',
    'El equipo presenta a la familia un plan ya cerrado, usa lenguaje técnico y solicita una firma sin explorar sus prioridades.',
    'En cada reunión se repiten preocupaciones, pero no se revisan acuerdos, responsables, indicadores ni acciones previas.',
    'La familia describe una estrategia eficaz en casa; el equipo la descarta porque no fue diseñada por un profesional.',
    'El equipo dispone de mucha información y una hora, por lo que necesita ordenar la conversación en torno a una prioridad verificable.',
    'La docente observa participación grupal y la especialista dificultades en tareas individuales; ambas consideran contradictorios los datos.',
    'El acta solo dice “apoyar más” y no identifica qué hará cada persona, con qué frecuencia ni cuándo se revisará.',
    'El estudiante pide explicar cómo vive los apoyos porque uno lo expone frente al curso y reduce su participación.',
    'Dos profesionales discrepan sobre la intensidad del apoyo sin identificar qué evidencia permitiría resolverlo.',
    'El servicio externo trabaja una prioridad distinta del aula y el estudiante recibe instrucciones que compiten entre sí.',
    'Un informe diagnóstico completo fue enviado a personas que no implementan apoyos ni requieren esos antecedentes.',
    'La familia rechaza una medida por temor a la dependencia; el equipo cree que facilitaría el acceso durante un periodo inicial.'
  ]};
  const module2ComplexityLayer={
    assessment:{'Interpretación':'Debe distinguirse lo que sabe de las condiciones que le permiten demostrarlo.','Aplicación':'La decisión debe integrar fuentes complementarias y orientar una respuesta educativa.','Decisión pedagógica':'Las alternativas difieren en la calidad de evidencia y en su capacidad de orientar apoyos revisables.'},
    psychoeducational:{'Interpretación':'Es necesario examinar qué proceso mide cada tarea y qué demanda adicional interfiere.','Aplicación':'El procedimiento debe observar estrategias, errores y respuesta a ayudas sin perder el propósito evaluado.','Decisión pedagógica':'La conclusión debe reconocer los límites de los datos y precisar qué evidencia adicional se necesita.'},
    deaIdentification:{'Interpretación':'El equipo debe contrastar persistencia y especificidad con enseñanza y explicaciones alternativas.','Aplicación':'Se requiere documentar oportunidades, apoyos, fidelidad y evolución, no solo bajo rendimiento.','Decisión pedagógica':'La decisión debe mantener apoyos mientras se amplía evidencia y evitar una atribución prematura.'},
    supportPlanning:{'Interpretación':'La revisión debe distinguir actividades realizadas de cambios en aprendizaje, participación o autonomía.','Aplicación':'El plan necesita conectar necesidad, objetivo, estrategia, responsable, indicador y plazo.','Decisión pedagógica':'La medida debe ser viable, favorecer autonomía y revisarse según sus resultados.'},
    collaboration:{'Interpretación':'Debe analizarse cómo se integran perspectivas y se traducen acuerdos en acciones coherentes.','Aplicación':'La respuesta requiere prioridad compartida, aportes complementarios y seguimiento explícito.','Decisión pedagógica':'La decisión debe resguardar participación, confidencialidad y derechos, además de prever la revisión.'}
  };
  Object.entries(module2CaseContexts).forEach(([key,contexts])=>{
    let contextIndex=0;
    questionSets[key].forEach(question=>{
      if(question[0]==='Comprensión conceptual')return;
      const position=contextIndex++;
      const centralQuestion=question[1].match(/¿[^?]+\?$/)?.[0]||question[1];
      const complexity=position%2===0?` ${module2ComplexityLayer[key][question[0]]}`:'';
      question[1]=`${contexts[position]}${complexity} ${centralQuestion}`;
    });
  });
  const module3Expansions={readingProcesses:[
    ['Comprensión conceptual','¿Qué relación plantea la visión simple de la lectura?',['La comprensión depende solo de leer rápido.','La comprensión lectora resulta de la interacción entre reconocimiento de palabras y comprensión del lenguaje.','La decodificación deja de ser relevante después de primero básico.','El vocabulario reemplaza el reconocimiento de palabras.'],1],
    ['Comprensión conceptual','¿Por qué conviene analizar componentes lectores por separado?',['Para asignar una etiqueta a cada error.','Porque desempeños similares pueden originarse en procesos distintos y requerir apoyos diferentes.','Para evitar observar lectura auténtica.','Porque cada componente se enseña sin conexión con los demás.'],1],
    ['Interpretación','Un estudiante reconoce palabras con precisión y comprende explicaciones orales, pero lee tan lentamente que olvida el inicio de las oraciones. ¿Qué hipótesis es más plausible?',['Un déficit general de lenguaje.','La baja automatización limita la integración del significado durante la lectura.','Una dificultad exclusiva de vocabulario.','Falta de conocimientos previos en todas las áreas.'],1],
    ['Interpretación','Una estudiante lee palabras y pseudopalabras con precisión, pero tampoco comprende el texto cuando se lo leen. ¿Dónde conviene profundizar?',['Solo en conciencia fonológica.','En lenguaje oral, vocabulario, conocimientos y comprensión.','En velocidad de copia.','Únicamente en prosodia.'],1],
    ['Aplicación','¿Qué tarea aporta evidencia específica sobre reconocimiento de palabras nuevas?',['Relatar una experiencia.','Leer pseudopalabras controladas y analizar los tipos de error.','Responder preguntas sobre un video.','Copiar un párrafo.'],1],
    ['Aplicación','Para comparar comprensión oral y lectora de manera válida, ¿qué condición debe cuidarse?',['Usar temas totalmente distintos.','Mantener contenidos y demandas lingüísticas comparables, variando principalmente la modalidad de acceso.','Dar más tiempo solo en lectura oral.','Calificar ambas tareas con criterios diferentes.'],1],
    ['Aplicación','Un alumno falla una pregunta porque desconoce el tema, aunque decodifica y explica bien otros textos. ¿Qué corresponde registrar?',['Una dificultad lectora global.','La influencia del conocimiento previo antes de generalizar el resultado.','Un problema permanente de fluidez.','La necesidad de reducir todos los textos.'],1],
    ['Aplicación','¿Qué registro ayuda más a formular una hipótesis de proceso?',['Solo el puntaje total.','Precisión, latencia, autocorrecciones, comprensión oral y respuesta a apoyos.','La cantidad de páginas leídas.','La preferencia por un género textual.'],1],
    ['Aplicación','Una estudiante comprende después de releer en segmentos breves. ¿Cómo usar esa evidencia?',['Concluir que no existe dificultad.','Probar segmentación y enseñanza de monitoreo, observando si aumenta comprensión y autonomía.','Eliminar los textos extensos.','Evaluar únicamente memoria.'],1],
    ['Decisión pedagógica','Dos estudiantes obtienen el mismo puntaje bajo: uno no reconoce palabras y otro lee preciso pero no integra ideas. ¿Qué decisión corresponde?',['Aplicar idéntico programa de velocidad.','Diseñar apoyos diferenciados según el proceso comprometido y monitorear resultados.','Reducir el nivel lector de ambos permanentemente.','Derivar sin intervención pedagógica.'],1],
    ['Decisión pedagógica','La lectura oral es lenta, pero la comprensión silenciosa es adecuada y no hay errores. ¿Qué procede primero?',['Diagnosticar una DEA.','Ampliar evidencia sobre demandas de fluidez y efectos funcionales antes de intervenir.','Entrenar máxima velocidad.','Suspender la lectura silenciosa.'],1],
    ['Decisión pedagógica','Tras un apoyo focalizado mejora la decodificación, pero no la comprensión. ¿Cuál es el siguiente paso?',['Repetir solo el mismo apoyo.','Actualizar la hipótesis y evaluar lenguaje, conocimientos, inferencias y monitoreo.','Concluir falta de esfuerzo.','Retirar todos los apoyos.'],1]
  ],decodingFluency:[
    ['Comprensión conceptual','¿Qué aporta la lectura de pseudopalabras a la evaluación?',['Mide conocimientos temáticos.','Permite observar la aplicación de correspondencias sin depender de palabras memorizadas.','Evalúa exclusivamente comprensión oral.','Mide caligrafía.'],1],
    ['Comprensión conceptual','¿Cuál es la función pedagógica de la prosodia?',['Aumentar el volumen de voz.','Agrupar sintácticamente y expresar relaciones que apoyan la construcción de significado.','Reemplazar la precisión.','Memorizar puntuación.'],1],
    ['Interpretación','Un lector transforma “plato” en “pato” y “blusa” en “busa”. ¿Qué patrón merece analizarse?',['Inferencias causales.','Procesamiento de grupos consonánticos durante la decodificación.','Vocabulario abstracto.','Organización textual.'],1],
    ['Interpretación','Una estudiante reconoce palabras aisladas con rapidez, pero pierde ritmo en oraciones complejas. ¿Qué evidencia conviene recoger?',['Solo lista de palabras.','Fraseo, pausas, sintaxis y comprensión en texto conectado.','Copia de oraciones.','Preferencias lectoras.'],1],
    ['Aplicación','¿Qué secuencia favorece el aprendizaje de una correspondencia compleja?',['Texto difícil sin preparación.','Modelado, combinación guiada, contraste de ejemplos y práctica acumulativa en palabras y textos.','Memorización de una definición.','Cronometraje inmediato.'],1],
    ['Aplicación','Un estudiante adivina palabras por la ilustración. ¿Qué intervención es pertinente?',['Retirar todo contexto para siempre.','Pedir atender a todas las letras, decodificar y comprobar después con el significado.','Aceptar la aproximación.','Enseñar solo vocabulario.'],1],
    ['Aplicación','¿Cómo seleccionar textos para lectura repetida?',['Usar siempre material nuevo y muy difícil.','Elegir textos breves accesibles, con propósito y oportunidades de mejorar precisión, fraseo y comprensión.','Usar listas sin sentido exclusivamente.','Premiar solo el tiempo.'],1],
    ['Aplicación','¿Qué retroalimentación es más específica ante una sustitución?',['Lee mejor.','Mira la parte final, combina nuevamente los sonidos y comprueba si la palabra coincide.','Estás equivocado.','Memoriza la oración.'],1],
    ['Aplicación','La precisión mejora en listas, pero no en cuentos. ¿Qué ajuste corresponde?',['Volver indefinidamente a listas.','Planificar transferencia gradual hacia frases y textos con complejidad controlada.','Aumentar la velocidad exigida.','Eliminar la lectura contextual.'],1],
    ['Decisión pedagógica','Aumentan palabras por minuto sin mejora de fraseo ni comprensión. ¿Cómo debe juzgarse el apoyo?',['Como plenamente exitoso.','Como progreso parcial que requiere reorientar criterios hacia lectura expresiva y significado.','Como evidencia de falta de capacidad.','Solo por asistencia.'],1],
    ['Decisión pedagógica','Un alumno se bloquea en lectura pública, pero lee preciso individualmente. ¿Qué decisión es más coherente?',['Entrenar fonología de inmediato.','Distinguir la influencia del contexto emocional y ofrecer condiciones graduales de participación.','Obligarlo a leer frente al curso.','Concluir dificultad de decodificación.'],1],
    ['Decisión pedagógica','Persisten errores pese a intervención explícita bien implementada. ¿Qué procede?',['Repetirla sin cambios.','Revisar el análisis de errores, la intensidad y la hipótesis, ampliando evidencia interdisciplinaria si corresponde.','Retirar apoyos.','Reducir todos los objetivos.'],1]
  ],readingComprehension:[
    ['Comprensión conceptual','¿Qué función cumple la estructura textual en la comprensión?',['Solo ordenar párrafos visualmente.','Organiza relaciones entre ideas y orienta qué información es central.','Reemplaza el vocabulario.','Asegura decodificación automática.'],1],
    ['Comprensión conceptual','¿Qué caracteriza una estrategia de comprensión?',['Una respuesta correcta aprendida.','Una acción deliberada para construir, comprobar o reparar significado.','Una técnica de velocidad.','Una lista fija aplicada sin propósito.'],1],
    ['Interpretación','Una estudiante recuerda detalles, pero no puede formular la idea central. ¿Qué dificultad sugiere?',['Reconocimiento de letras.','Jerarquización e integración de información relevante.','Conciencia fonémica.','Trazado de palabras.'],1],
    ['Interpretación','Un lector explica cada párrafo por separado, pero no conecta causa y consecuencia entre ellos. ¿Qué requiere apoyo?',['Precisión articulatoria.','Integración de relaciones globales del texto.','Ortografía visual.','Velocidad de copia.'],1],
    ['Aplicación','¿Cómo enseñar a identificar la idea central?',['Pedir subrayar la primera oración siempre.','Modelar qué trata el texto, qué se dice de ello y qué información se repite o integra.','Entregar un título para copiar.','Eliminar detalles antes de leer.'],1],
    ['Aplicación','Antes de un texto científico con conceptos desconocidos, ¿qué apoyo favorece acceso sin sustituir la lectura?',['Entregar todas las respuestas.','Activar conocimientos pertinentes y enseñar vocabulario crítico con ejemplos.','Reducir el contenido central.','Leer solo el resumen final.'],1],
    ['Aplicación','¿Qué pregunta promueve una inferencia basada en evidencia?',['¿Te gustó?','¿Qué pistas explican el cambio del personaje y cómo se relacionan?','¿Cuántas líneas tiene?','¿Qué palabra aparece primero?'],1],
    ['Aplicación','Un estudiante detecta una contradicción, pero no sabe repararla. ¿Qué modelar?',['Continuar hasta el final.','Volver al segmento, localizar la inconsistencia, releer y ajustar la interpretación.','Cambiar de texto.','Memorizar la oración.'],1],
    ['Aplicación','¿Cómo comprobar transferencia de una estrategia?',['Repetir el mismo texto.','Observar su selección y uso autónomo en textos y propósitos variados.','Preguntar su definición.','Mantener todas las pistas.'],1],
    ['Decisión pedagógica','Una pauta de preguntas mejora respuestas, pero el estudiante no la usa sin adulto. ¿Qué corresponde?',['Mantenerla completa para siempre.','Enseñar su uso estratégico y retirar gradualmente las ayudas.','Eliminar toda pauta de inmediato.','Reducir las preguntas a literales.'],1],
    ['Decisión pedagógica','La mayoría del curso falla inferencias en un texto ambiguo. ¿Qué decisión es prioritaria?',['Derivar a todos.','Revisar texto, enseñanza y oportunidades de modelado antes de atribuir dificultades individuales.','Bajar expectativas.','Calificar sin retroalimentación.'],1],
    ['Decisión pedagógica','Un lector mejora cuando se enseña vocabulario, pero aún no integra ideas. ¿Qué ajuste procede?',['Suspender la intervención.','Mantener el apoyo léxico e incorporar enseñanza explícita de conexiones y síntesis.','Trabajar solo velocidad.','Concluir que el vocabulario no importaba.'],1]
  ],writingProduction:[
    ['Comprensión conceptual','¿Qué función cumple un borrador en la escritura?',['Producir de inmediato una versión definitiva.','Externalizar ideas para poder desarrollarlas, reorganizarlas y revisarlas.','Evaluar solo ortografía.','Copiar un modelo sin cambios.'],1],
    ['Comprensión conceptual','¿Por qué la memoria de trabajo puede afectar la producción escrita?',['Porque determina el tema preferido.','Porque escribir exige coordinar ideas, lenguaje, transcripción y control del texto.','Porque reemplaza la enseñanza.','Porque solo interviene en caligrafía.'],1],
    ['Interpretación','Un estudiante escribe oraciones correctas, pero sin conectores y con saltos entre ideas. ¿Qué proceso requiere apoyo?',['Trazado.','Coherencia y cohesión durante la textualización y revisión.','Decodificación.','Conciencia silábica.'],1],
    ['Interpretación','Una alumna produce un texto organizado en computador, pero muy breve al escribir a mano. ¿Qué hipótesis aporta la comparación?',['Carece de conocimientos.','La demanda de transcripción manual puede limitar la composición.','No comprende el propósito.','Presenta necesariamente una DEA.'],1],
    ['Aplicación','¿Qué organizador ayuda a planificar una narración sin escribirla por el estudiante?',['Una copia del cuento final.','Una secuencia flexible de situación, problema, acciones y desenlace.','Una lista de faltas.','Un cronómetro.'],1],
    ['Aplicación','¿Cómo enseñar cohesión entre dos ideas?',['Pedir un texto más largo.','Modelar la relación semántica y elegir conectores posibles, comparando su efecto.','Corregir solo puntuación.','Entregar siempre el conector.'],1],
    ['Aplicación','Un estudiante revisa únicamente ortografía. ¿Qué pregunta amplía su revisión?',['¿Está limpia la hoja?','¿Cada parte aporta al propósito y las ideas siguen un orden comprensible?','¿Cuántas palabras escribiste?','¿Usaste lápiz azul?'],1],
    ['Aplicación','¿Qué apoyo favorece ortografía sin interrumpir cada idea del borrador?',['Corregir en el momento cada grafema.','Registrar dudas y realizar una revisión focalizada después de desarrollar el contenido.','Ignorar siempre la ortografía.','Reducir el vocabulario.'],1],
    ['Aplicación','Para monitorear progreso en composición, ¿qué conviene comparar?',['Solo extensión.','Muestras equivalentes con criterios de contenido, organización, lenguaje y convenciones.','La mejor producción del año.','Cantidad de correcciones del adulto.'],1],
    ['Decisión pedagógica','Una herramienta de dictado aumenta contenido, pero el objetivo incluye también transcripción. ¿Qué decisión corresponde?',['Reemplazar toda escritura manual.','Usarla para acceso y composición, manteniendo enseñanza y evaluación específica de transcripción cuando sea pertinente.','Eliminar la herramienta.','Evaluar ambos procesos como uno solo.'],1],
    ['Decisión pedagógica','La corrección exhaustiva desmotiva y no mejora nuevos textos. ¿Qué ajuste es más pertinente?',['Corregir todavía más.','Priorizar uno o dos criterios, dar retroalimentación accionable y solicitar una nueva versión.','Dejar de revisar.','Calificar solo limpieza.'],1],
    ['Decisión pedagógica','Dos estudiantes escriben poco: uno no genera ideas y otro se demora al transcribir. ¿Qué procede?',['Dar la misma plantilla.','Diferenciar la evaluación y los apoyos según generación de contenido y transcripción.','Reducir a ambos el propósito.','Evaluar solo el producto final.'],1]
  ],literacyIntervention:[
    ['Comprensión conceptual','¿Qué significa que una intervención sea explícita?',['Que el estudiante descubra solo el procedimiento.','Que se hagan visibles el objetivo, el razonamiento, los pasos y los criterios de comprobación.','Que use muchas fichas.','Que ocurra individualmente.'],1],
    ['Comprensión conceptual','¿Qué distingue un indicador sensible al progreso?',['Se aplica una sola vez.','Puede mostrar cambios pequeños y pertinentes durante el periodo de apoyo.','Depende solo de una nota final.','Mide asistencia.'],1],
    ['Interpretación','Un plan mejora palabras practicadas, pero no palabras nuevas equivalentes. ¿Qué sugiere?',['Dominio generalizado.','Aprendizaje restringido y necesidad de enseñar transferencia o revisar el método.','Falta de motivación necesariamente.','Éxito completo.'],1],
    ['Interpretación','Los resultados fluctúan porque cada sesión usa tareas y criterios distintos. ¿Qué problema existe?',['Exceso de práctica.','Las medidas no son suficientemente comparables para interpretar la tendencia.','La línea base es innecesaria.','El estudiante ya logró el objetivo.'],1],
    ['Aplicación','¿Cómo formular un objetivo de fluidez que no premie solo rapidez?',['Aumentará palabras por minuto.','Leerá textos equivalentes con precisión, fraseo y comprensión definidos en un plazo.','Leerá mejor.','Asistirá a sesiones.'],1],
    ['Aplicación','¿Qué permite comprobar fidelidad además de registrar asistencia?',['La opinión final.','Una pauta breve sobre pasos, duración, frecuencia y oportunidades de respuesta realizadas.','El diagnóstico.','La cantidad de hojas impresas.'],1],
    ['Aplicación','Un estudiante progresa durante apoyo individual. ¿Cómo favorecer generalización?',['Mantenerlo siempre fuera del aula.','Planificar práctica coordinada en aula, variar materiales y retirar claves gradualmente.','Cambiar de objetivo.','Esperar transferencia espontánea.'],1],
    ['Aplicación','¿Qué retroalimentación ayuda tras un error de decodificación?',['Incorrecto.','Señalar la parte omitida, guiar una nueva combinación y pedir comprobar la palabra en contexto.','Dar la palabra y continuar.','Aumentar el tiempo.'],1],
    ['Aplicación','El progreso se estanca después de una mejora inicial. ¿Qué evidencia revisar?',['Solo el diagnóstico.','Tendencia, dificultad de tareas, fidelidad, intensidad y tipos de error actuales.','La nota del curso.','Cantidad de premios.'],1],
    ['Decisión pedagógica','El plan muestra progreso consistente y uso autónomo en aula. ¿Qué decisión es coherente?',['Mantener igual intensidad indefinidamente.','Reducir gradualmente el apoyo y continuar monitoreo para confirmar mantenimiento.','Suspender toda observación.','Cambiar inmediatamente de diagnóstico.'],1],
    ['Decisión pedagógica','No hay progreso, pero la intervención se aplicó según lo planificado. ¿Qué procede?',['Culpar al estudiante.','Revisar hipótesis, adecuación del método e intensidad y reunir evidencia adicional.','Continuar sin cambios todo el año.','Eliminar el objetivo.'],1],
    ['Decisión pedagógica','Dos apoyos muestran resultados diferentes, pero también distinta frecuencia de aplicación. ¿Cómo decidir?',['Elegir el que obtuvo mayor puntaje.','Comparar fidelidad y dosis antes de atribuir diferencias al método.','Promediar ambos resultados.','Suspender los dos.'],1]
  ]};
  Object.entries(module3Expansions).forEach(([key,questions])=>questionSets[key].push(...questions));
  const module3CaseContexts={readingProcesses:[
    'En textos escuchados, Elisa explica relaciones y vocabulario; al leer el mismo nivel de contenido, silabea, realiza pausas frecuentes y olvida el inicio.',
    'Matías reconoce palabras con precisión y ritmo adecuado, recupera datos explícitos, pero no justifica inferencias ni relaciona información distante.',
    'El equipo dispone de lectura oral, comprensión al escuchar, precisión en palabras y pseudopalabras, fluidez y respuestas ante distintos apoyos.',
    'Al leer palabras nuevas, Fernanda segmenta cada sonido, pierde la combinación y necesita que el adulto modele nuevamente el procedimiento.',
    'Después de una lectura precisa, Vicente no advierte que una oración contradice la información anterior y continúa respondiendo desde su primera interpretación.',
    'En un grupo aparecen puntajes bajos similares, pero los registros muestran errores de reconocimiento, lentitud, vocabulario limitado y dificultades inferenciales diferentes.',
    'Joaquín reconoce palabras con precisión y comprende explicaciones orales, pero lee tan lentamente que al final de una oración no recuerda su comienzo.',
    'Paula lee palabras y pseudopalabras sin errores; cuando escucha el mismo texto tampoco explica sus relaciones ni vocabulario central.',
    'El equipo necesita aislar el reconocimiento de palabras nuevas sin que el resultado dependa de vocabulario memorizado o conocimiento del tema.',
    'Para comparar modalidades, se preparan dos textos con contenidos semejantes, pero uno incluye vocabulario y estructura sintáctica mucho más complejos.',
    'Tomás falla una pregunta sobre un fenómeno desconocido, aunque decodifica con precisión y comprende textos de temas que ha estudiado previamente.',
    'El registro disponible consigna solo un puntaje lector total, sin precisión, latencia, autocorrecciones, comprensión oral ni respuesta a ayudas.',
    'Antonia pierde el sentido en párrafos extensos, pero comprende al releer segmentos breves y explicar después cómo se conectan.',
    'Dos estudiantes obtienen 45%: uno sustituye palabras y el otro lee con precisión, pero no integra las ideas principales.',
    'La lectura oral de Diego es lenta y vacilante frente al curso; silenciosamente responde con precisión y no presenta errores de reconocimiento.',
    'Después de una intervención explícita mejora la decodificación de palabras nuevas, pero la comprensión de textos permanece sin cambios.'
  ],decodingFluency:[
    'Al leer, Simón sustituye palabras por otras con el mismo inicio y obtiene resultados especialmente bajos en pseudopalabras que nunca ha visto.',
    'Catalina lee todas las palabras correctamente, pero corta las frases, ignora la puntuación y no conserva la entonación de las preguntas.',
    'Durante varias sesiones, un estudiante identifica sonidos aislados, pero no logra combinarlos de manera continua para reconocer la palabra.',
    'El curso practica con cronómetro; algunos aumentan velocidad, aunque omiten palabras, pierden fraseo y comprenden menos el texto.',
    'Tras cuatro semanas, las palabras por minuto aumentan, pero también las sustituciones y las respuestas de comprensión incorrectas.',
    'Dos lectores demoran lo mismo: uno comete errores en grupos consonánticos y otro lee preciso, aunque con pausas dentro de cada frase.',
    'En tres registros, Andrés transforma “plato” en “pato”, “blusa” en “busa” y presenta el mismo patrón en palabras nuevas.',
    'Constanza reconoce palabras aisladas con rapidez, pero en oraciones complejas cambia las pausas, pierde ritmo y responde parcialmente.',
    'La docente introduce una correspondencia compleja con una definición y luego solicita leer un texto difícil sin práctica guiada intermedia.',
    'Un estudiante mira la ilustración y dice una palabra semánticamente posible, aunque varias letras no coinciden con lo escrito.',
    'Para lectura repetida se consideran textos de dificultad, extensión y propósito distintos, además de criterios de precisión, fraseo y comprensión.',
    'Ante la sustitución “camino” por “camión”, el adulto necesita ofrecer una indicación que ayude a revisar letras y significado sin entregar la palabra.',
    'La precisión aumenta en listas practicadas, pero en cuentos reaparecen errores cuando las mismas correspondencias se presentan en contexto.',
    'El indicador mejora en palabras por minuto, mientras el fraseo y la comprensión permanecen estables o disminuyen.',
    'En lectura pública, Nicolás se bloquea y omite palabras; individualmente lee el mismo texto con precisión y ritmo adecuados.',
    'Los errores persisten pese a una intervención explícita aplicada con la frecuencia, secuencia y práctica que fueron planificadas.'
  ],readingComprehension:[
    'Sofía lee con precisión y ritmo, pero desconoce palabras centrales; después de explicarlas, relaciona mejor las ideas del texto.',
    'Durante la lectura, Benjamín mantiene su primera interpretación aunque una oración posterior la contradice y no vuelve a revisar.',
    'Antes de leer un texto científico, el equipo selecciona palabras críticas y decide cómo enseñarlas sin anticipar todas las respuestas.',
    'Para inferir por qué cambia un personaje, el estudiante debe combinar una acción inicial, una conversación posterior y conocimiento pertinente.',
    'Valentina reconoce que perdió el sentido en el segundo párrafo, pero continúa hasta el final sin localizar dónde surgió la confusión.',
    'Dos lectores precisos fallan la misma pregunta: uno desconoce términos centrales y otro comprende las palabras, pero no conecta las pistas.',
    'Emilia recuerda nombres, fechas y detalles, aunque no logra explicar de qué trata principalmente el texto ni jerarquizar información.',
    'Cristóbal resume cada párrafo por separado, pero no vincula la causa presentada al inicio con la consecuencia explicada al final.',
    'Al modelar la idea central, la docente compara información repetida, detalles y la afirmación que integra el contenido global.',
    'El texto contiene conceptos científicos nuevos; se busca facilitar el acceso manteniendo el propósito de construir significado al leer.',
    'Una pregunta solicita explicar el cambio del protagonista con pistas del texto, mientras otras solo piden opinión o recuento literal.',
    'El estudiante detecta una inconsistencia, pero no sabe qué segmento releer ni cómo ajustar la interpretación previa.',
    'La estrategia funciona en el texto modelado; el equipo necesita saber si se selecciona de forma autónoma con otros géneros y propósitos.',
    'Una pauta completa mejora las respuestas, pero el estudiante espera que el adulto lea cada pregunta y señale cuándo usarla.',
    'La mayoría del curso falla inferencias en un texto ambiguo que no fue trabajado con modelado ni conversación sobre pistas.',
    'Después de enseñar vocabulario, el lector comprende palabras aisladas, pero todavía no integra relaciones entre párrafos.'
  ],writingProduction:[
    'Laura relata oralmente una historia completa y organizada; al escribir a mano produce dos oraciones, pero al dictar conserva personajes y secuencia.',
    'Felipe escribe varias oraciones con ortografía funcional, aunque cambia de tema, repite ideas y no organiza la información según el propósito.',
    'Antes de redactar un texto argumentativo, el estudiante tiene opiniones, pero no distingue tesis, razones, evidencias ni destinatario.',
    'Durante la revisión, la estudiante busca tildes y limpieza, pero no relee si las ideas cumplen el propósito o siguen un orden comprensible.',
    'Al escribir el primer borrador, Nicolás se detiene ante cada duda ortográfica, pierde ideas y termina con un texto mucho más breve que su relato oral.',
    'Ante una producción breve, el equipo cuenta palabras, pero aún no compara planificación, dictado, teclado, escritura manual ni respuesta a apoyos.',
    'Un estudiante escribe oraciones completas, pero las presenta sin conectores y con saltos que dificultan seguir la relación entre ideas.',
    'En computador, Javiera produce un texto organizado y extenso; a mano, demora en cada letra y reduce notablemente el contenido.',
    'Para planificar una narración, se busca una herramienta que organice situación, problema, acciones y desenlace sin escribir el texto por el estudiante.',
    'Dos ideas son pertinentes, pero aparecen como oraciones aisladas; la docente quiere enseñar a expresar la relación semántica entre ellas.',
    'En su segunda versión, el estudiante corrige mayúsculas y tildes, pero mantiene información irrelevante y un orden difícil de comprender.',
    'Durante el borrador surgen dudas ortográficas frecuentes que interrumpen la generación y organización del contenido.',
    'El equipo compara muestras de distinta extensión y género usando solo cantidad de palabras como señal de progreso.',
    'El dictado por voz aumenta el contenido y permite revisar ideas, aunque uno de los objetivos también incluye desarrollar transcripción escrita.',
    'La docente corrige todos los errores con tinta roja; el estudiante recibe la nota, pero no produce una nueva versión ni transfiere las correcciones.',
    'Dos estudiantes escriben tres líneas: uno no genera contenido ni oralmente y otro expresa muchas ideas, pero se demora al transcribir.'
  ],literacyIntervention:[
    'La intervención planificada contempla doce sesiones, pero se realizaron cuatro, se cambiaron actividades y no se registró la dosis aplicada.',
    'El estudiante usa la estrategia con indicaciones durante apoyo individual, aunque en aula no reconoce cuándo aplicarla ni inicia sin adulto.',
    'Para monitorear decodificación, el equipo compara listas de diferente dificultad y registra únicamente cantidad total de aciertos.',
    'Tras una intervención fiel, explícita y suficientemente intensa, el progreso es mínimo y los tipos de error permanecen estables.',
    'El desempeño mejora durante la sesión, pero depende de recordatorios en cada paso y no se mantiene con materiales nuevos.',
    'El equipo debe decidir entre una prueba única al final o una secuencia que permita formular, comprobar y ajustar una hipótesis pedagógica.',
    'El estudiante reconoce las palabras practicadas, pero no aplica las correspondencias en palabras nuevas equivalentes.',
    'Los puntajes fluctúan porque cada sesión utiliza tareas, tiempos y criterios distintos, sin medidas comparables de progreso.',
    'El objetivo de fluidez propone solo aumentar velocidad, aunque los registros muestran sustituciones, fraseo débil y comprensión variable.',
    'La asistencia está completa, pero se necesita comprobar si cada sesión incluyó modelado, práctica, retroalimentación y duración previstas.',
    'En apoyo individual hay progreso consistente; la estrategia todavía no se practica coordinadamente en tareas habituales del aula.',
    'Ante un error de decodificación, el adulto dice la palabra de inmediato y continúa, sin orientar dónde estuvo el quiebre.',
    'Después de una mejora inicial, la curva se estabiliza y simultáneamente aumentó la dificultad de los textos utilizados.',
    'El estudiante alcanza el criterio durante varias semanas y usa la estrategia con autonomía en actividades del aula.',
    'No se observa progreso, aunque la intervención se implementó con fidelidad, dosis suficiente y tareas alineadas con el objetivo.',
    'Dos métodos muestran resultados distintos, pero uno se aplicó tres veces por semana y el otro solo en sesiones esporádicas.'
  ]};
  const module3ComplexityLayer={
    readingProcesses:{'Interpretación':'Debe localizarse el proceso que limita el desempeño sin confundir manifestaciones semejantes.','Aplicación':'La evidencia debe permitir comparar reconocimiento, fluidez, lenguaje y comprensión bajo condiciones equivalentes.','Decisión pedagógica':'La decisión debe diferenciar apoyos según el patrón y comprobar su efecto con nuevas evidencias.'},
    decodingFluency:{'Interpretación':'Importa analizar precisión, tipo de error, ritmo, fraseo y efecto sobre el significado, no solo velocidad.','Aplicación':'La enseñanza debe ser explícita, acumulativa y acompañada de retroalimentación que permita autocorrección.','Decisión pedagógica':'El apoyo se juzga por precisión, automatización, prosodia y comprensión, además de su transferencia.'},
    readingComprehension:{'Interpretación':'La lectura precisa no basta para explicar el resultado; deben examinarse vocabulario, integración, inferencia y monitoreo.','Aplicación':'El apoyo debe hacer visible el razonamiento y conservar la responsabilidad del estudiante por construir significado.','Decisión pedagógica':'La respuesta se ajusta al proceso comprometido y debe avanzar hacia el uso autónomo en textos variados.'},
    writingProduction:{'Interpretación':'El producto final debe contrastarse con planificación, composición, transcripción y revisión en distintas modalidades.','Aplicación':'El apoyo debe reducir la carga secundaria sin sustituir el proceso de escritura que se busca desarrollar.','Decisión pedagógica':'La intervención se diferencia según el quiebre y mantiene separados los propósitos de composición y transcripción.'},
    literacyIntervention:{'Interpretación':'Antes de atribuir falta de respuesta deben revisarse comparabilidad, fidelidad, intensidad, generalización y autonomía.','Aplicación':'Cada acción debe vincular línea base, objetivo observable, procedimiento explícito e indicador sensible al progreso.','Decisión pedagógica':'La evidencia permite mantener, intensificar, modificar o retirar gradualmente el apoyo sin esperar al final del periodo.'}
  };
  Object.entries(module3CaseContexts).forEach(([key,contexts])=>{
    let contextIndex=0;
    questionSets[key].forEach(question=>{
      if(question[0]==='Comprensión conceptual')return;
      const position=contextIndex++;
      const centralQuestion=question[1].match(/¿[^?]+\?$/)?.[0]||question[1];
      const complexity=position%2===0?` ${module3ComplexityLayer[key][question[0]]}`:'';
      question[1]=`${contexts[position]}${complexity} ${centralQuestion}`;
    });
  });
  const module4Expansions={mathProcesses:[
    ['Comprensión conceptual','¿Por qué un error matemático debe analizarse como procedimiento?',['Porque la respuesta final nunca importa.','Porque revela representaciones, relaciones y decisiones que orientan apoyos específicos.','Porque todos los errores tienen la misma causa.','Porque evita enseñar contenidos.'],1],
    ['Comprensión conceptual','¿Qué función cumple el lenguaje matemático?',['Decorar la solución.','Representar y comunicar cantidades, relaciones, operaciones y argumentos.','Reemplazar toda representación concreta.','Memorizar símbolos aislados.'],1],
    ['Interpretación','Una estudiante compara cantidades correctamente con bloques, pero invierte el signo al escribir la relación. ¿Qué proceso requiere apoyo?',['La noción de cantidad.','La conexión entre relación comprendida y notación simbólica.','El conteo oral.','La memoria de hechos.'],1],
    ['Interpretación','Un alumno calcula con precisión operaciones dadas, pero no elige una operación ante una situación. ¿Dónde se ubica el quiebre principal?',['En ejecución del algoritmo.','En representación y modelación de las relaciones del problema.','En escritura de numerales.','En conteo estable.'],1],
    ['Aplicación','¿Qué pregunta hace visible el razonamiento matemático?',['¿Terminaste?','¿Cómo representaste la relación y por qué tu procedimiento funciona?','¿Cuál es tu nota?','¿Cuánto demoraste?'],1],
    ['Aplicación','Para distinguir una dificultad conceptual de una notacional, ¿qué conviene hacer?',['Aplicar más ejercicios escritos iguales.','Presentar la misma relación con objetos, dibujos, lenguaje y símbolos comparables.','Eliminar los símbolos.','Evaluar solo oralmente.'],1],
    ['Aplicación','Un estudiante responde al azar cuando ve números grandes. ¿Qué apoyo aporta evidencia?',['Reducirlos permanentemente.','Pedir estimar magnitud, representar y explicar antes de calcular.','Entregar el algoritmo.','Corregir solo el resultado.'],1],
    ['Aplicación','¿Qué registro permite comparar estrategias?',['Correcto o incorrecto.','Representación elegida, pasos, explicación, errores y nivel de ayuda.','Cantidad de páginas.','Promedio del curso.'],1],
    ['Aplicación','Una alumna obtiene una respuesta correcta mediante un procedimiento que no comprende. ¿Qué corresponde?',['Dar el aprendizaje por logrado.','Pedir justificar, representar y aplicar el procedimiento en una situación variada.','Premiar la rapidez.','Cambiar de contenido.'],1],
    ['Decisión pedagógica','El curso falla una tarea presentada con una representación nunca enseñada. ¿Qué decisión es prioritaria?',['Concluir dificultades individuales.','Enseñar explícitamente la representación y comprobar nuevamente el desempeño.','Bajar los objetivos.','Derivar al curso.'],1],
    ['Decisión pedagógica','Dos estudiantes fallan una resta: uno desconoce el significado y otro comete un error de reagrupación. ¿Qué procede?',['La misma ficha repetitiva.','Apoyos diferenciados sobre concepto y procedimiento, con indicadores propios.','Entrenamiento de velocidad.','Reducir el ámbito numérico a ambos.'],1],
    ['Decisión pedagógica','Un apoyo concreto mejora el resultado, pero no se transfiere a símbolos. ¿Qué ajuste corresponde?',['Retirar el material de inmediato.','Enseñar conexiones explícitas entre acciones, dibujos, lenguaje y notación.','Mantener solo objetos.','Concluir falta de capacidad.'],1]
  ],numberSense:[
    ['Comprensión conceptual','¿Qué expresa la cardinalidad?',['La forma del numeral.','Que el último número contado representa la cantidad total de la colección.','El orden de los objetos.','La rapidez del conteo.'],1],
    ['Comprensión conceptual','¿Qué significa componer y descomponer números?',['Copiar sus dígitos.','Expresar una cantidad mediante partes equivalentes y relacionarlas flexiblemente.','Ordenarlos alfabéticamente.','Aplicar siempre el algoritmo vertical.'],1],
    ['Interpretación','Un niño cuenta dos veces un objeto y omite otro, aunque recita bien la secuencia. ¿Qué principio requiere apoyo?',['Valor posicional.','Correspondencia uno a uno en el conteo.','Propiedad conmutativa.','Estimación.'],1],
    ['Interpretación','Una estudiante afirma que 398 está más cerca de 300 que de 400. ¿Qué conocimiento conviene explorar?',['Trazado de cifras.','Magnitud, distancia numérica y uso de referentes.','Memoria multiplicativa.','Lectura de gráficos.'],1],
    ['Aplicación','¿Cómo enseñar que 10 unidades equivalen a 1 decena?',['Repetir la frase.','Agrupar, desagrupar y registrar la equivalencia en material y notación.','Copiar números de dos cifras.','Usar solo una tabla.'],1],
    ['Aplicación','Un estudiante compara 507 y 57 mirando solo el 7. ¿Qué apoyo es pertinente?',['Memorizar cuál es mayor.','Representar ambos números y justificar desde la posición de mayor valor.','Contar de uno en uno.','Cambiar el signo.'],1],
    ['Aplicación','¿Qué actividad desarrolla subitización conceptual?',['Contar siempre de uno en uno.','Reconocer una colección breve organizada y explicar cómo se agruparon sus partes.','Copiar el numeral.','Memorizar una imagen.'],1],
    ['Aplicación','Para ampliar flexibilidad con 100, ¿qué tarea conviene?',['Usar solo 10 decenas.','Construir y justificar múltiples descomposiciones equivalentes.','Recitar hasta 100.','Escribirlo muchas veces.'],1],
    ['Aplicación','¿Cómo comprobar comprensión de la recta numérica?',['Pedir dibujar una línea.','Ubicar, comparar y estimar posiciones explicando los referentes usados.','Contar marcas.','Copiar números ordenados.'],1],
    ['Decisión pedagógica','Una estudiante usa material con autonomía, pero falla sin él. ¿Qué decisión favorece progreso?',['Eliminarlo abruptamente.','Planificar puentes hacia dibujos y símbolos con retiro gradual.','Mantenerlo sin cambios.','Reducir el objetivo.'],1],
    ['Decisión pedagógica','Tras enseñanza explícita persiste la confusión del cero posicional. ¿Qué procede?',['Practicar más algoritmos.','Revisar agrupación, lenguaje, tabla posicional y notación con tareas equivalentes.','Ignorar el cero.','Concluir una dificultad general.'],1],
    ['Decisión pedagógica','Un puntaje bajo combina errores de conteo, comparación y escritura. ¿Qué decisión es más rigurosa?',['Usar el total para elegir una ficha.','Desagregar patrones y priorizar el proceso de base que limita los demás.','Trabajar todo a la vez.','Entrenar rapidez.'],1]
  ],calculationOperations:[
    ['Comprensión conceptual','¿Qué significa comprender una operación?',['Recordar su signo.','Reconocer las relaciones que modela, representarlas y usar propiedades y procedimientos con sentido.','Ejecutar siempre un algoritmo.','Resolver solo cálculos escritos.'],1],
    ['Comprensión conceptual','¿Qué función cumple la propiedad distributiva?',['Cambiar cualquier resultado.','Descomponer un producto o cociente en relaciones equivalentes que facilitan el cálculo.','Ordenar cifras.','Reemplazar el valor posicional.'],1],
    ['Interpretación','Un alumno resuelve 7 + 8 contando todo desde uno. ¿Qué indica?',['Error conceptual total.','Una estrategia válida pero poco eficiente que puede evolucionar desde relaciones numéricas.','Dominio automático.','Dificultad de lectura.'],1],
    ['Interpretación','Una estudiante calcula 36 × 4 como 30 × 4 + 6 × 4. ¿Cómo se interpreta?',['Procedimiento incorrecto.','Uso comprensivo de descomposición y propiedad distributiva.','Memorización aislada.','Conteo uno a uno.'],1],
    ['Aplicación','¿Cómo construir el hecho 9 + 7 desde un referente?',['Memorizarlo sin relación.','Transformarlo en 10 + 6 explicando la compensación.','Contar siempre desde uno.','Usar multiplicación.'],1],
    ['Aplicación','Un estudiante alinea incorrectamente 45 + 7. ¿Qué apoyo corresponde?',['Marcar las columnas.','Relacionar unidades y decenas con material, notación expandida y registro posicional.','Dar más sumas.','Usar calculadora siempre.'],1],
    ['Aplicación','¿Cómo representar 24 ÷ 6 para construir significado?',['Copiar el algoritmo.','Formar grupos iguales o repartir equitativamente y relacionarlo con multiplicación.','Sumar 24 y 6.','Leer el símbolo.'],1],
    ['Aplicación','Una alumna aplica un algoritmo correctamente, pero no detecta un resultado imposible. ¿Qué enseñar?',['Mayor velocidad.','Estimación, magnitud y comprobación mediante relaciones inversas.','Otro algoritmo sin explicación.','Copia de resultados.'],1],
    ['Aplicación','¿Qué práctica favorece automatización flexible?',['Una lista extensa del mismo hecho.','Recuperación espaciada y variada conectada con familias, dobles y propiedades.','Uso exclusivo de cronómetro.','Evitar explicar estrategias.'],1],
    ['Decisión pedagógica','Los errores aumentan solo cuando hay reagrupación. ¿Qué decisión es pertinente?',['Reenseñar toda la suma.','Focalizar equivalencias posicionales y conectar representaciones con cada paso.','Entrenar hechos básicos únicamente.','Reducir números permanentemente.'],1],
    ['Decisión pedagógica','Un estudiante usa una estrategia mental eficiente distinta del algoritmo enseñado. ¿Qué corresponde?',['Marcarla incorrecta.','Validarla si es matemáticamente correcta y pedir explicación y comprobación.','Prohibirla.','Exigir copiar el algoritmo sin sentido.'],1],
    ['Decisión pedagógica','No mejora la precisión pese a repetir ejercicios idénticos. ¿Qué ajuste procede?',['Aumentar la cantidad.','Analizar tipos de error y enseñar relaciones y estrategias con práctica variada y retroalimentación.','Calificar con mayor exigencia.','Suspender cálculo.'],1]
  ],problemSolving:[
    ['Comprensión conceptual','¿Qué función cumple la incógnita en un problema?',['Indicar una palabra clave.','Definir la cantidad o relación que debe determinarse a partir de la situación.','Señalar el algoritmo.','Mostrar el dato mayor.'],1],
    ['Comprensión conceptual','¿Qué significa comprobar una solución?',['Repetir el mismo cálculo.','Evaluar procedimiento y resultado respecto de relaciones, pregunta y contexto.','Comparar con un compañero.','Buscar una palabra clave.'],1],
    ['Interpretación','Un estudiante suma al leer “más”, aunque se pregunta cuánto tenía inicialmente. ¿Qué patrón muestra?',['Falla de cálculo.','Decisión mecánica por palabra clave sin modelar la relación.','Desconocimiento de numerales.','Error de estimación únicamente.'],1],
    ['Interpretación','Una alumna representa bien el problema, elige la operación correcta y comete un error aritmético. ¿Dónde focalizar?',['Comprensión del enunciado.','Ejecución y control del cálculo, preservando su modelación adecuada.','Selección de datos.','Lenguaje matemático completo.'],1],
    ['Aplicación','¿Qué apoyo ayuda a comprender un problema de comparación?',['Subrayar “más que”.','Representar las dos cantidades, la diferencia y cuál de ellas es desconocida.','Entregar la operación.','Eliminar el texto.'],1],
    ['Aplicación','Hay un dato irrelevante. ¿Qué pregunta promueve selección razonada?',['¿Qué número sobra?','¿Qué información necesitas para responder y qué relación tiene cada dato con la pregunta?','¿Cuál es el número menor?','¿Qué operación aparece en la unidad?'],1],
    ['Aplicación','¿Cómo favorecer planificación antes de calcular?',['Impedir usar dibujos.','Pedir anticipar una representación, un procedimiento y un resultado aproximado.','Entregar una fórmula.','Corregir al final.'],1],
    ['Aplicación','Un estudiante comprende al escuchar, pero no al leer el problema. ¿Qué apoyo permite evaluar razonamiento?',['Cambiar todos los números.','Ofrecer acceso oral o segmentado y comparar el desempeño sin alterar la relación matemática.','Resolverlo por él.','Eliminar problemas verbales.'],1],
    ['Aplicación','¿Qué favorece transferencia en resolución de problemas?',['Practicar enunciados con la misma palabra clave.','Comparar problemas con estructuras semejantes y superficiales distintas, justificando estrategias.','Memorizar operaciones.','Usar siempre números pequeños.'],1],
    ['Decisión pedagógica','La mayoría falla porque el enunciado es ambiguo. ¿Qué procede?',['Atribuirlo a baja capacidad.','Revisar la calidad de la tarea antes de interpretar desempeños individuales.','Dar la respuesta.','Reducir todos los objetivos.'],1],
    ['Decisión pedagógica','Un alumno siempre espera que el adulto elija la operación. ¿Qué ajuste favorece autonomía?',['Seguir indicándola.','Usar preguntas graduadas sobre relaciones y retirar ayudas mientras explica su decisión.','Entregar una tabla de palabras clave.','Evitar problemas nuevos.'],1],
    ['Decisión pedagógica','Un estudiante resuelve de varias formas correctas. ¿Cómo aprovecharlo?',['Exigir una única forma.','Comparar eficiencia y validez de las estrategias, promoviendo argumentación.','Elegir la más larga.','Calificar solo el resultado.'],1]
  ],mathIntervention:[
    ['Comprensión conceptual','¿Qué caracteriza una intervención matemática focalizada?',['Trabaja todos los contenidos.','Se dirige a un proceso priorizado desde evidencia y define enseñanza e indicador coherentes.','Usa exclusivamente material concreto.','Depende del diagnóstico.'],1],
    ['Comprensión conceptual','¿Por qué debe observarse la transferencia?',['Porque reemplaza la línea base.','Porque muestra si el aprendizaje se usa en tareas, representaciones y contextos nuevos.','Porque aumenta la asistencia.','Porque evita retirar ayudas.'],1],
    ['Interpretación','Mejora en ejercicios practicados, pero no reconoce la misma relación en otro formato. ¿Qué indica?',['Dominio generalizado.','Aprendizaje restringido y necesidad de enseñar conexiones y variación.','Falta de cálculo exclusivamente.','Éxito completo.'],1],
    ['Interpretación','El promedio semanal no cambia, pero disminuyen errores posicionales y aparecen errores de cálculo menores. ¿Cómo interpretar?',['No hay progreso.','Existe un cambio cualitativo que debe registrarse y orientar el siguiente apoyo.','La intervención fracasó.','Debe ignorarse el tipo de error.'],1],
    ['Aplicación','¿Cómo formular un objetivo monitoreable de valor posicional?',['Comprenderá números.','Representará y explicará números de tres cifras en modalidades equivalentes con criterio y plazo definidos.','Hará fichas semanales.','Mejorará mucho.'],1],
    ['Aplicación','¿Qué medida breve sirve para monitorear estrategias de cálculo?',['Solo tiempo total.','Tareas equivalentes periódicas con registro de precisión, estrategia y explicación.','Una prueba anual.','Número de páginas.'],1],
    ['Aplicación','Un apoyo concreto produce dependencia. ¿Qué ajuste corresponde?',['Eliminarlo de inmediato.','Enseñar elección y representación intermedia, retirando indicaciones gradualmente.','Mantener ayuda total.','Reducir la meta.'],1],
    ['Aplicación','¿Cómo asegurar coordinación con el aula?',['Usar tareas distintas sin informar.','Acordar objetivo, lenguaje, representaciones, oportunidades de práctica e indicadores comunes.','Trabajar solo fuera del aula.','Enviar el diagnóstico.'],1],
    ['Aplicación','La intervención se aplicó con menor frecuencia que la prevista. ¿Qué registrar?',['Solo el resultado.','La dosis real y sus causas antes de juzgar respuesta al apoyo.','Una nueva etiqueta.','El promedio del curso.'],1],
    ['Decisión pedagógica','Hay progreso estable y autónomo durante varias mediciones. ¿Qué procede?',['Mantener máxima intensidad.','Desvanecer apoyos gradualmente y monitorear mantenimiento y transferencia.','Suspender toda evaluación.','Cambiar el objetivo sin revisar.'],1],
    ['Decisión pedagógica','No hay progreso con alta fidelidad y tareas bien alineadas. ¿Qué decisión es rigurosa?',['Culpar al estudiante.','Revisar hipótesis, método e intensidad y ampliar la evaluación si corresponde.','Repetir igual indefinidamente.','Retirar el apoyo.'],1],
    ['Decisión pedagógica','Dos indicadores entregan conclusiones opuestas. ¿Qué corresponde?',['Elegir el más favorable.','Examinar qué mide cada uno, su comparabilidad y evidencia cualitativa antes de ajustar.','Promediarlos sin análisis.','Descartar ambos.'],1]
  ]};
  Object.entries(module4Expansions).forEach(([key,questions])=>questionSets[key].push(...questions));
  const module4CaseContexts={mathProcesses:[
    'En una situación de compra, Camila calcula correctamente la operación escrita, pero no explica qué representa el resultado ni comprueba si responde la pregunta.',
    'Tomás resuelve restas simbólicas, pero ante “había 35 y se retiraron 8” suma ambos números sin construir una representación de la situación.',
    'El equipo quiere distinguir si el error se origina en la comprensión de cantidad, la notación, el procedimiento o la demanda verbal de la tarea.',
    'Una estudiante utiliza bloques para mostrar 52, pero afirma que 52 es menor que 48 porque compara solamente los dígitos finales.',
    'Después de obtener 91 para 48 + 32, el estudiante no estima ni representa decenas y unidades, aunque conoce los pasos del algoritmo.',
    'En el curso aparecen respuestas incorrectas diferentes; el registro disponible consigna solo acierto o error y no conserva procedimientos ni ayudas.',
    'Valentina compara dos colecciones correctamente con bloques, pero invierte el signo cuando registra la relación mediante símbolos.',
    'Ignacio ejecuta operaciones dadas con precisión, pero no selecciona una operación cuando debe modelar una situación nueva.',
    'Durante la entrevista, el profesional necesita una pregunta que revele representación, relaciones y justificación, no solo el resultado final.',
    'Para aislar una dificultad notacional, se dispone de objetos, dibujos, lenguaje oral y símbolos que expresan la misma relación matemática.',
    'Al ver números grandes, un estudiante responde al azar y evita calcular, aunque con referentes de magnitud puede formular estimaciones razonables.',
    'Dos procedimientos llegan al mismo resultado; el equipo requiere registrar representación, pasos, explicación, errores y nivel de ayuda.',
    'Una alumna aplica de memoria un algoritmo y obtiene la respuesta correcta, pero no logra representar ni justificar por qué funciona.',
    'La mayoría falla una tarea presentada mediante un diagrama que nunca fue enseñado, pese a resolver la misma relación en formatos conocidos.',
    'Dos estudiantes fallan una resta: uno no comprende la relación de quitar y otro comprende, pero se equivoca al reagrupar.',
    'El material concreto mejora el resultado, pero al pasar directamente a símbolos el estudiante pierde la relación entre las cantidades.'
  ],numberSense:[
    'Martina recita la secuencia numérica, pero al contar una colección señala dos veces un objeto y omite otro sin advertirlo.',
    'Benjamín forma 52 con bloques, aunque afirma que es menor que 48 porque observa solamente que 2 es menor que 8.',
    'Para construir equivalencias, el estudiante manipula unidades y decenas, pero todavía registra cada representación como una cantidad distinta.',
    'Al comparar 507 y 57, Javiera se fija únicamente en el dígito 7 y no considera la posición de mayor valor.',
    'La docente muestra brevemente una colección organizada y pide explicar qué grupos permitieron reconocer el total sin contar uno a uno.',
    'Una estudiante usa material con autonomía para representar cantidades, pero falla cuando debe pasar de inmediato a notación simbólica.',
    'Durante el conteo, un niño recita bien la serie, pero asigna más de una palabra numérica a algunos objetos y deja otros sin señalar.',
    'Ante 398 en una recta de 0 a 500, una estudiante lo ubica cerca de 300 y no usa 400 como referente próximo.',
    'El curso repite que diez unidades forman una decena, pero no logra agrupar, desagrupar ni registrar esa equivalencia.',
    'Al comparar 507 y 57, el estudiante necesita justificar desde centenas, decenas y unidades en lugar de memorizar cuál es mayor.',
    'Se busca desarrollar reconocimiento rápido de cantidades organizadas sin convertir la actividad en memorización visual de una sola imagen.',
    'Para trabajar 100, la planificación contempla una única representación con diez decenas y no explora otras descomposiciones equivalentes.',
    'En una recta vacía, el estudiante coloca números sin explicar los referentes, las distancias ni la magnitud relativa.',
    'El material permite responder, pero no existe una secuencia hacia dibujos, lenguaje numérico y símbolos con retiro gradual.',
    'Tras enseñanza explícita, persiste la confusión del cero en números como 304 y 340 bajo distintas representaciones.',
    'Un puntaje total bajo reúne errores de conteo, comparación, valor posicional y escritura de numerales con patrones distintos.'
  ],calculationOperations:[
    'Para resolver 8 + 7, Alonso cuenta ambas colecciones desde uno, llega al resultado correcto y demora considerablemente.',
    'Fernanda calcula 36 × 4 como 30 × 4 más 6 × 4 y explica que ambas partes conservan el valor del número original.',
    'El estudiante conoce 10 + 6, pero ante 9 + 7 vuelve a contar desde uno y no utiliza compensación ni relaciones conocidas.',
    'En 45 + 7, una alumna escribe el 7 bajo las decenas; con bloques diferencia unidades y decenas correctamente.',
    'Para resolver 24 ÷ 6, el estudiante aplica pasos escritos, pero no representa reparto, agrupamiento ni relación con multiplicación.',
    'Los errores aumentan solo cuando las operaciones requieren reagrupar, mientras los hechos básicos y sumas sin reagrupación son precisos.',
    'Ante 7 + 8, un alumno cuenta todos los elementos desde uno; la estrategia funciona, pero demanda mucha atención y tiempo.',
    'Una estudiante descompone 36 × 4 en productos parciales equivalentes y luego suma los resultados con precisión.',
    'El equipo quiere conectar 9 + 7 con un referente conocido sin exigir memorización aislada ni conteo completo.',
    'Al sumar 45 + 7, el error aparece al alinear cifras, aunque la estudiante representa correctamente 4 decenas y 12 unidades.',
    'El símbolo 24 ÷ 6 se ejecuta mecánicamente; se busca construir su significado mediante grupos iguales y relaciones inversas.',
    'Una alumna obtiene un resultado imposible con el algoritmo, pero no estima ni utiliza la operación inversa para comprobarlo.',
    'La práctica diaria usa listas extensas y cronómetro, pero no conecta hechos con dobles, familias ni propiedades.',
    'Las equivocaciones se concentran en los pasos de reagrupación y en la equivalencia entre una decena y diez unidades.',
    'Un estudiante utiliza una estrategia mental distinta del algoritmo enseñado, obtiene resultados correctos y puede justificar cada transformación.',
    'Después de muchas fichas idénticas, la precisión no mejora y se repiten sustituciones, errores posicionales y pasos omitidos.'
  ],problemSolving:[
    'Ante un problema que incluye la palabra “más”, Sebastián suma automáticamente, aunque la pregunta solicita determinar la cantidad inicial.',
    'Daniela representa correctamente la relación, selecciona la operación pertinente y luego comete un error aritmético en el cálculo final.',
    'En un problema de comparación, el estudiante identifica dos cantidades, pero no representa la diferencia ni cuál valor es desconocido.',
    'El enunciado incluye edad, precio y cantidad; solo algunos datos se relacionan con la pregunta que debe responderse.',
    'Antes de calcular, el alumno empieza a operar con todos los números sin anticipar representación, procedimiento ni resultado aproximado.',
    'La mayoría del curso falla una pregunta cuyo enunciado admite dos interpretaciones y contiene información contradictoria.',
    'Al leer “tenía algunas y recibió 7”, un estudiante suma por la palabra “recibió”, aunque se pregunta cuánto tenía al comienzo.',
    'La estudiante construye un diagrama adecuado y elige la operación correcta, pero se equivoca en un hecho numérico durante la ejecución.',
    'Para enseñar comparación, se consideran dibujos que muestren ambas cantidades, la diferencia y la ubicación de la incógnita.',
    'Un problema contiene un dato atractivo pero irrelevante; el estudiante selecciona todos los números sin relacionarlos con la pregunta.',
    'La planificación busca que el alumno represente y estime antes de ejecutar operaciones, conservando la responsabilidad por la solución.',
    'El estudiante comprende el problema cuando se lo leen, pero el acceso al texto escrito interfiere con su razonamiento matemático.',
    'Se practican enunciados con las mismas palabras clave, aunque las estructuras matemáticas y contextos cambian superficialmente.',
    'El enunciado utilizado por todo el curso es ambiguo y no permite establecer con claridad una única relación matemática.',
    'Un alumno espera que el adulto nombre la operación antes de comenzar y no explica las relaciones entre los datos.',
    'La estudiante resuelve correctamente con diagrama, cálculo mental y ecuación, y puede comparar la eficiencia de cada estrategia.'
  ],mathIntervention:[
    'Después de varias sesiones, el estudiante mejora en los ejercicios practicados, pero no reconoce la misma relación en dibujos o problemas nuevos.',
    'El promedio semanal permanece estable, aunque disminuyen errores posicionales y ahora aparecen equivocaciones menores de cálculo.',
    'La planificación indica “comprender números”, sin criterio observable, representaciones esperadas, plazo ni condición de ayuda.',
    'Para monitorear cálculo, cada semana se aplican tareas de dificultad distinta y se registra solamente el tiempo total.',
    'El material concreto facilita respuestas, pero el adulto indica siempre qué recurso usar y cada paso que debe seguirse.',
    'No hay progreso pese a una intervención aplicada con frecuencia, duración, procedimiento y tareas alineadas al objetivo.',
    'El estudiante resuelve los ejercicios practicados, pero no identifica la misma relación cuando cambia la representación o el contexto.',
    'El puntaje total no cambia; sin embargo, desaparecen errores de valor posicional y surgen errores de cálculo más específicos.',
    'El equipo necesita transformar “comprender números de tres cifras” en un desempeño comparable y temporalizado.',
    'Para observar estrategias, se comparan tareas equivalentes y se registran precisión, procedimiento, explicación y nivel de ayuda.',
    'El apoyo concreto produce respuestas correctas, pero también dependencia de indicaciones y poca elección autónoma de representaciones.',
    'Docente y especialista utilizan lenguaje, representaciones e indicadores distintos para trabajar el mismo objetivo.',
    'La intervención se aplicó una vez por semana, aunque el plan establecía tres; además hubo suspensiones no registradas.',
    'Durante varias mediciones, el desempeño es estable, autónomo y se transfiere a tareas habituales del aula.',
    'Con alta fidelidad, dosis suficiente y tareas bien alineadas, no se observa cambio en el proceso priorizado.',
    'Un indicador muestra progreso y otro retroceso, pero evalúan demandas, formatos y niveles de ayuda diferentes.'
  ]};
  const module4ComplexityLayer={
    mathProcesses:{'Interpretación':'Debe localizarse el quiebre entre concepto, representación, lenguaje, notación y procedimiento.','Aplicación':'La evidencia debe hacer visible el razonamiento y mantener comparable la relación matemática evaluada.','Decisión pedagógica':'La respuesta se diferencia según el patrón y se comprueba con representaciones y tareas nuevas.'},
    numberSense:{'Interpretación':'El análisis requiere separar recitado, conteo, cardinalidad, magnitud, valor posicional y notación.','Aplicación':'El apoyo debe conectar cantidad, material, dibujo, lenguaje y símbolo sin fijar dependencia de una modalidad.','Decisión pedagógica':'La progresión conserva el concepto y construye puentes explícitos hacia representaciones más abstractas.'},
    calculationOperations:{'Interpretación':'Una respuesta correcta o incorrecta debe interpretarse desde la estrategia, eficiencia y comprensión de relaciones.','Aplicación':'La enseñanza conecta propiedades, valor posicional, estimación y comprobación con práctica variada.','Decisión pedagógica':'El apoyo se focaliza en el error observado y reconoce procedimientos alternativos matemáticamente válidos.'},
    problemSolving:{'Interpretación':'Debe distinguirse modelación, selección de datos, elección de operación, ejecución y comprobación.','Aplicación':'El apoyo facilita el acceso al enunciado sin entregar la relación ni sustituir el razonamiento.','Decisión pedagógica':'Antes de atribuir dificultad individual se revisan la calidad de la tarea y las oportunidades de enseñanza.'},
    mathIntervention:{'Interpretación':'El progreso incluye cambios cualitativos, transferencia y autonomía, no solo promedio o ejercicios practicados.','Aplicación':'La intervención vincula línea base, objetivo focalizado, dosis, fidelidad e indicadores comparables.','Decisión pedagógica':'La evidencia permite retirar, intensificar o modificar apoyos después de revisar implementación y método.'}
  };
  Object.entries(module4CaseContexts).forEach(([key,contexts])=>{
    let contextIndex=0;
    questionSets[key].forEach(question=>{
      if(question[0]==='Comprensión conceptual')return;
      const position=contextIndex++;
      const centralQuestion=question[1].match(/¿[^?]+\?$/)?.[0]||question[1];
      const complexity=position%2===0?` ${module4ComplexityLayer[key][question[0]]}`:'';
      question[1]=`${contexts[position]}${complexity} ${centralQuestion}`;
    });
  });
  const module5Expansions={diversifiedDesign:[
    ['Comprensión conceptual','¿Qué significa anticipar barreras en la planificación?',['Esperar a que un estudiante fracase.','Examinar previamente demandas, contextos y posibles obstáculos para ofrecer alternativas pertinentes.','Crear una tarea distinta para cada diagnóstico.','Reducir todos los objetivos.'],1],
    ['Comprensión conceptual','¿Qué debe permanecer estable al diversificar una actividad?',['El formato de respuesta.','El propósito de aprendizaje y los criterios centrales que se evaluarán.','El tiempo exacto para todos.','El recurso tecnológico.'],1],
    ['Interpretación','El objetivo es comparar fuentes y se permite presentar conclusiones oralmente o por escrito con igual evidencia. ¿Qué ocurre?',['Se modifica el objetivo.','Se diversifica la expresión manteniendo el aprendizaje central.','Se aplica una adecuación de OA.','Se elimina la evaluación.'],1],
    ['Interpretación','Se entrega a un estudiante una ficha de menor nivel sin analizar la barrera. ¿Cuál es el problema?',['La ficha tiene pocas preguntas.','Se reduce la expectativa sin justificar ni preservar el propósito curricular.','No se usa tecnología.','Falta una calificación.'],1],
    ['Aplicación','Un video no tiene subtítulos y parte del curso no accede al audio. ¿Qué ajuste corresponde?',['Eliminar el contenido.','Añadir subtítulos o transcripción manteniendo la información y la tarea.','Crear otro objetivo.','Evaluar solo a quienes escucharon.'],1],
    ['Aplicación','¿Cómo diversificar la participación en una discusión?',['Obligar a intervenir espontáneamente.','Ofrecer preparación previa, turnos, apoyos visuales y modalidades pertinentes con criterios comunes.','Eximir a quienes no hablan.','Bajar la complejidad del tema.'],1],
    ['Aplicación','Una consigna extensa añade dificultad no relacionada con el objetivo. ¿Qué hacer?',['Reducir el contenido central.','Segmentar y clarificar la consigna, comprobando comprensión sin resolver la tarea.','Eliminar toda lectura.','Dar la respuesta inicial.'],1],
    ['Aplicación','¿Qué dato permite evaluar una alternativa de acceso?',['Que fue novedosa.','Si mejora acceso, participación y autonomía sin alterar el constructo.','Que todos la prefieren.','Que reduce el tiempo docente.'],1],
    ['Aplicación','Un organizador ayuda a ordenar ideas. ¿Cómo evitar dependencia?',['Retirarlo de inmediato.','Enseñar su uso, variar ejemplos y disminuir gradualmente las claves.','Mantenerlo completo siempre.','Usarlo solo en evaluación.'],1],
    ['Decisión pedagógica','Una alternativa facilita la tarea, pero elimina el razonamiento que se pretendía evaluar. ¿Qué procede?',['Mantenerla por inclusión.','Rediseñarla para conservar el constructo y remover solo la barrera irrelevante.','Reducir el criterio.','Calificar con otra escala.'],1],
    ['Decisión pedagógica','La diversificación beneficia a muchos estudiantes. ¿Cómo incorporarla?',['Reservarla para quienes tienen diagnóstico.','Integrarla al diseño común y monitorear si aún se requieren apoyos individuales.','Convertirla en premio.','Usarla solo fuera del aula.'],1],
    ['Decisión pedagógica','Pese a diversificar acceso y enseñanza, un estudiante no progresa. ¿Qué decisión es coherente?',['Reducir inmediatamente todos los OA.','Analizar evidencia y considerar apoyos o adecuaciones individualizadas según corresponda.','Retirar la diversificación.','Esperar sin cambios.'],1]
  ],explicitTeaching:[
    ['Comprensión conceptual','¿Qué diferencia modelar de explicar una instrucción?',['No hay diferencia.','Modelar muestra el proceso y las decisiones en acción; explicar solo puede describirlas.','Modelar entrega la respuesta.','Explicar siempre es individual.'],1],
    ['Comprensión conceptual','¿Qué significa transferir gradualmente la responsabilidad?',['Disminuir el objetivo.','Pasar desde apoyo docente intenso hacia desempeño autónomo según evidencia.','Dejar al estudiante solo desde el inicio.','Mantener una pauta permanente.'],1],
    ['Interpretación','El docente resuelve todos los ejemplos y luego asigna una tarea nueva sin práctica guiada. ¿Qué falta?',['Una prueba inicial.','Oportunidades intermedias de respuesta con retroalimentación.','Más explicaciones largas.','Trabajo individual inmediato.'],1],
    ['Interpretación','Una estudiante repite los pasos de memoria, pero no sabe cuándo usar la estrategia. ¿Qué requiere apoyo?',['Velocidad de ejecución.','Reconocimiento de condiciones, propósito y selección estratégica.','Copia del procedimiento.','Memoria literal adicional.'],1],
    ['Aplicación','¿Qué pensamiento en voz alta modela mejor la comprensión?',['Esta es la respuesta.','Esta idea contradice la anterior; volveré a leer para ajustar mi interpretación.','Debes concentrarte.','Copien mis pasos.'],1],
    ['Aplicación','¿Cómo comprobar comprensión durante el modelado?',['Preguntar “¿entendieron?”.','Solicitar que anticipen el siguiente paso y justifiquen la decisión.','Esperar la prueba final.','Repetir la explicación idéntica.'],1],
    ['Aplicación','Un estudiante falla con una consigna abierta. ¿Cuál es la primera ayuda graduada?',['Resolver el primer paso.','Dar una pregunta breve que oriente su atención al objetivo.','Entregar una pauta completa.','Cambiar la tarea.'],1],
    ['Aplicación','¿Qué favorece la práctica guiada efectiva?',['Corregir solo al final.','Respuestas frecuentes, observación del proceso y retroalimentación inmediata y específica.','Ejemplos sin variación.','Ayuda máxima constante.'],1],
    ['Aplicación','La estrategia ya se usa con precisión en ejemplos conocidos. ¿Qué sigue?',['Mantener las mismas claves.','Variar contextos y retirar apoyos para comprobar transferencia.','Cambiar de contenido sin comprobar.','Aumentar explicaciones.'],1],
    ['Decisión pedagógica','Un grupo necesita apoyos distintos durante la misma tarea. ¿Qué hace el docente?',['Entrega máxima ayuda a todos.','Ajusta pistas y ejemplos según respuesta, manteniendo objetivo y criterios comunes.','Separa permanentemente al grupo.','Reduce la meta general.'],1],
    ['Decisión pedagógica','La pauta permite completar, pero nadie puede explicar el proceso. ¿Qué ajuste corresponde?',['Añadir más pasos escritos.','Volver al modelado del razonamiento y pedir explicaciones antes de retirar gradualmente la pauta.','Calificar el producto.','Eliminar toda ayuda.'],1],
    ['Decisión pedagógica','Un error se repite pese a retroalimentación verbal. ¿Qué procede?',['Repetir la misma frase.','Analizar el punto de quiebre y cambiar el tipo o nivel de andamiaje.','Atribuir falta de esfuerzo.','Dar la respuesta.'],1]
  ],practiceFeedback:[
    ['Comprensión conceptual','¿Qué caracteriza la práctica acumulativa?',['Trabaja solo el contenido nuevo.','Integra aprendizajes recientes y anteriores para fortalecer recuperación y discriminación.','Repite una tarea sin variación.','Se realiza únicamente al final.'],1],
    ['Comprensión conceptual','¿Qué función cumple el error en una práctica formativa?',['Demostrar incapacidad.','Aportar evidencia para ajustar estrategia, ayuda y enseñanza.','Determinar una nota definitiva.','Indicar que debe terminar la práctica.'],1],
    ['Interpretación','Una estudiante acierta con ejemplos agrupados, pero confunde estrategias cuando se mezclan. ¿Qué falta?',['Más ejemplos idénticos.','Práctica intercalada que exija reconocer cuándo usar cada estrategia.','Una calificación.','Menos contenidos.'],1],
    ['Interpretación','El comentario dice “revisa”, pero el estudiante no sabe qué cambiar. ¿Cuál es la debilidad?',['Es demasiado largo.','No vincula evidencia y criterio con una acción concreta.','Se entrega por escrito.','No incluye una nota.'],1],
    ['Aplicación','¿Qué práctica favorece retención a largo plazo?',['Una sesión extensa única.','Recuperaciones breves y espaciadas con retroalimentación.','Relectura pasiva solamente.','Copiar la respuesta.'],1],
    ['Aplicación','¿Cómo usar ejemplos contrastados?',['Mostrar solo casos correctos.','Comparar casos y no casos para explicar qué condiciones hacen pertinente una estrategia.','Evitar diferencias.','Pedir memorizarlos.'],1],
    ['Aplicación','¿Qué retroalimentación promueve un nuevo intento?',['Incorrecto.','Tu idea central es pertinente; agrega la evidencia que la sostiene y vuelve a redactar.','Debes mejorar.','Obtienes cuatro puntos.'],1],
    ['Aplicación','Un estudiante depende de una lista de control. ¿Cómo avanzar?',['Retirarla sin aviso.','Reducir sus claves y promover autoexplicación y comprobación autónoma.','Mantenerla completa.','Cambiar el objetivo.'],1],
    ['Aplicación','¿Qué enseña a planificar el propio trabajo?',['Dar instrucciones paso a paso siempre.','Modelar metas, elección de estrategia, monitoreo y ajuste, y luego guiar su uso.','Pedir autonomía inmediata.','Evaluar solo el resultado.'],1],
    ['Decisión pedagógica','La práctica masiva mejora el resultado inmediato, pero una semana después se pierde. ¿Qué ajuste corresponde?',['Aumentar la misma sesión.','Distribuir oportunidades de recuperación y volver sobre el aprendizaje en el tiempo.','Reducir la dificultad.','Calificar antes.'],1],
    ['Decisión pedagógica','Un estudiante corrige al recibir la respuesta, pero repite el error en tareas nuevas. ¿Qué procede?',['Dar más respuestas.','Pedir que explique el error, aplique la corrección y discrimine nuevos casos.','Suspender la práctica.','Marcar todos los errores.'],1],
    ['Decisión pedagógica','El grupo logra precisión, pero trabaja solo con ayuda. ¿Qué prioridad sigue?',['Más ejercicios idénticos con ayuda.','Retiro planificado de apoyos y práctica autónoma en situaciones variadas.','Cambiar de objetivo.','Reducir criterios.'],1]
  ],accessSupports:[
    ['Comprensión conceptual','¿Qué distingue un apoyo de acceso de una reducción curricular?',['El apoyo siempre usa tecnología.','El apoyo cambia cómo se accede o responde sin alterar necesariamente el aprendizaje central.','La reducción es temporal.','No existe diferencia.'],1],
    ['Comprensión conceptual','¿Qué criterio orienta la selección de tecnología de apoyo?',['La novedad del dispositivo.','La relación entre barrera, tarea, objetivo, contexto y autonomía.','El diagnóstico por sí solo.','La preferencia del adulto.'],1],
    ['Interpretación','Un lector de texto permite responder Ciencias, donde decodificar no es el objetivo. ¿Cómo se interpreta?',['Elimina el aprendizaje científico.','Reduce una barrera de acceso preservando el constructo evaluado.','Constituye una adecuación de OA.','Entrega una ventaja injusta.'],1],
    ['Interpretación','Una aplicación añade animaciones y opciones que distraen al estudiante. ¿Qué revela?',['Toda tecnología es inadecuada.','El recurso puede crear nuevas barreras y debe evaluarse en uso.','Debe aumentarse su duración.','El objetivo era incorrecto.'],1],
    ['Aplicación','Una hoja está visualmente saturada. ¿Qué ajuste es pertinente?',['Eliminar preguntas.','Mejorar jerarquía, espaciado, contraste y segmentación sin reducir el contenido.','Cambiar el objetivo.','Usar letra decorativa.'],1],
    ['Aplicación','¿Cómo introducir una herramienta de apoyo?',['Entregarla sin instrucción.','Modelar su uso, practicar en tareas reales y evaluar eficacia y autonomía.','Reservarla para pruebas.','Mantener ayuda adulta permanente.'],1],
    ['Aplicación','Un estudiante se fatiga al copiar, pero debe demostrar comprensión conceptual. ¿Qué alternativa corresponde?',['Reducir las ideas exigidas.','Permitir respuesta oral o digital con criterios equivalentes.','Eliminar la tarea.','Calificar solo caligrafía.'],1],
    ['Aplicación','¿Qué evidencia muestra utilidad de un apoyo?',['Que fue utilizado.','Mejora consistente en acceso o participación con menor dependencia y sin alterar el objetivo.','Que es costoso.','Que gusta al equipo.'],1],
    ['Aplicación','Un temporizador aumenta ansiedad. ¿Qué hacer?',['Mantenerlo por consistencia.','Revisar la barrera, recoger la perspectiva del estudiante y probar otra señal temporal.','Eliminar el tiempo de toda tarea.','Aumentar el volumen.'],1],
    ['Decisión pedagógica','Un recurso funciona en apoyo individual, pero no en aula. ¿Qué procede?',['Descartarlo.','Analizar condiciones del aula y planificar generalización con coordinación docente.','Usarlo solo fuera del aula.','Cambiar el diagnóstico.'],1],
    ['Decisión pedagógica','Dos herramientas resuelven la misma barrera. ¿Cómo elegir?',['Usar la más compleja.','Comparar eficacia, facilidad, autonomía, preferencias y sostenibilidad contextual.','Elegir al azar.','Entregar ambas siempre.'],1],
    ['Decisión pedagógica','El apoyo permite participar, pero expone públicamente al estudiante. ¿Qué decisión corresponde?',['Mantenerlo porque funciona.','Rediseñarlo con su participación para conservar eficacia y reducir estigmatización.','Retirarlo sin alternativa.','Informar al curso del diagnóstico.'],1]
  ],diversifiedAssessment:[
    ['Comprensión conceptual','¿Qué hace válida una evaluación diversificada?',['Que todos respondan de forma distinta.','Que las alternativas recojan evidencia comparable del aprendizaje que se pretende medir.','Que sea más fácil.','Que no tenga criterios.'],1],
    ['Comprensión conceptual','¿Qué función cumple la evaluación formativa?',['Certificar al final.','Recoger e interpretar evidencia durante el proceso para ajustar enseñanza y aprendizaje.','Asignar diagnósticos.','Reemplazar la planificación.'],1],
    ['Interpretación','El objetivo es argumentar con evidencia, pero una opción permite marcar verdadero o falso. ¿Cuál es el problema?',['La opción es digital.','No exige el mismo constructo ni produce evidencia comparable de argumentación.','Tiene pocas preguntas.','No usa una rúbrica.'],1],
    ['Interpretación','Un estudiante mejora al recibir consignas segmentadas, manteniendo las mismas demandas cognitivas. ¿Qué indica?',['El objetivo fue reducido.','La consigna original introducía una barrera de acceso irrelevante.','La evaluación perdió validez.','Debe usarse siempre ayuda adulta.'],1],
    ['Aplicación','¿Cómo diversificar una evaluación de comprensión histórica?',['Cambiar el contenido para algunos.','Ofrecer modalidades pertinentes para explicar relaciones causales con criterios comunes.','Eliminar la evidencia.','Calificar esfuerzo.'],1],
    ['Aplicación','¿Qué criterio debe explicitarse antes de elegir formatos?',['La duración.','Qué aprendizaje y evidencia demostrarán logro.','La herramienta preferida.','El diagnóstico.'],1],
    ['Aplicación','¿Cómo usar una rúbrica para apoyar aprendizaje?',['Entregarla después de calificar.','Compartir criterios, analizar ejemplos y utilizarla para revisar un nuevo intento.','Convertirla solo en puntaje.','Cambiar criterios durante la tarea.'],1],
    ['Aplicación','Una respuesta oral incluye el contenido esperado. ¿Qué corresponde al calificar?',['Penalizar por no escribir.','Aplicar los criterios vinculados al constructo, si la modalidad estaba permitida.','Crear una nota distinta.','Evaluar dicción aunque no sea objetivo.'],1],
    ['Aplicación','¿Qué evidencia favorece un ajuste oportuno?',['Solo prueba final.','Observaciones breves, producciones, preguntas y respuestas recogidas durante la enseñanza.','Promedio anual.','Asistencia.'],1],
    ['Decisión pedagógica','Casi todo el curso falla el mismo criterio. ¿Qué decisión es prioritaria?',['Atribuirlo a dificultades individuales.','Revisar enseñanza, tarea y criterio, reenseñar y recoger nueva evidencia.','Bajar la escala.','Continuar sin cambios.'],1],
    ['Decisión pedagógica','Una adaptación mejora el puntaje, pero entrega pistas sobre la respuesta. ¿Qué procede?',['Mantenerla.','Rediseñarla porque contamina la evidencia del aprendizaje.','Subir la calificación.','Eliminar toda adaptación.'],1],
    ['Decisión pedagógica','Las evidencias de distintas modalidades son inconsistentes. ¿Cómo decidir?',['Elegir la mejor.','Analizar condiciones, comparabilidad y patrones, y recoger evidencia adicional focalizada.','Promediar sin análisis.','Usar solo la prueba escrita.'],1]
  ]};
  Object.entries(module5Expansions).forEach(([key,questions])=>questionSets[key].push(...questions));
  const module5CaseContexts={diversifiedDesign:[
    'El objetivo es explicar relaciones causales, pero la actividad exige leer un texto denso, copiar preguntas y responder en un único formato escrito.',
    'Para apoyar a una estudiante, se entrega una ficha de menor nivel que elimina el análisis central sin identificar primero la barrera.',
    'En una clase, algunos comprenden mejor con esquemas, ejemplos orales o texto; todos deben demostrar la misma relación conceptual.',
    'Un estudiante usa un organizador para ordenar ideas, pero espera que el adulto complete las categorías y no lo selecciona en tareas nuevas.',
    'La consigna extensa contiene vocabulario y pasos secundarios que no forman parte del objetivo que será evaluado.',
    'Pese a diversificar acceso, participación y enseñanza durante varias semanas, un estudiante no progresa en el objetivo monitoreado.',
    'El propósito es comparar fuentes y se permiten conclusiones orales, escritas o apoyadas visualmente con los mismos criterios de evidencia.',
    'Una estudiante recibe una tarea más simple por su diagnóstico, aunque no se analizó qué demanda específica restringía su participación.',
    'El video contiene información necesaria, pero no tiene subtítulos ni transcripción y parte del curso no accede al audio.',
    'En una discusión, solo se considera participación hablar espontáneamente frente al grupo, aunque el objetivo es argumentar con evidencia.',
    'La instrucción presenta cinco acciones simultáneas y lenguaje ambiguo que agrega demanda ajena al contenido central.',
    'Se prueba una alternativa de acceso novedosa, pero el equipo registra solo si fue utilizada y no su efecto en autonomía o aprendizaje.',
    'El organizador facilita la tarea conocida, aunque mantiene todas las pistas y no se ha enseñado cuándo ni cómo usarlo.',
    'Una adaptación permite responder sin realizar el razonamiento que constituye precisamente el aprendizaje evaluado.',
    'Una alternativa incorporada para algunos mejora acceso y participación de gran parte del curso en distintas actividades.',
    'Después de una diversificación planificada y monitoreada, persiste una necesidad específica que requiere analizar apoyos individualizados.'
  ],explicitTeaching:[
    'El docente resuelve varios ejemplos mientras el grupo observa y luego asigna una tarea nueva sin práctica intermedia ni retroalimentación.',
    'Antonia recita todos los pasos de una estrategia, pero no reconoce en qué situaciones debe seleccionarla ni cuál es su propósito.',
    'Durante el modelado de comprensión, el profesor necesita hacer visibles las pistas, decisiones y comprobaciones que orientan su pensamiento.',
    'Después de explicar un procedimiento, el docente pregunta “¿entendieron?” y continúa sin recoger una respuesta observable del grupo.',
    'Ante una consigna abierta, un estudiante se detiene; existen ayudas posibles desde una pregunta breve hasta una pauta completa.',
    'Una pauta permite completar la tarea, pero los estudiantes no explican el proceso y dependen de cada uno de sus pasos.',
    'El docente resuelve todos los ejemplos y pasa directamente al trabajo independiente, donde aparecen errores que no observó previamente.',
    'Una estudiante repite una secuencia memorizada aun cuando las condiciones del problema exigen una estrategia diferente.',
    'Al leer, el profesor detecta una contradicción y debe mostrar cómo la identifica, relee y modifica su interpretación.',
    'Durante el modelado, el equipo busca una forma de comprobar comprensión antes de finalizar la explicación.',
    'El estudiante no inicia una tarea abierta; el docente puede orientar su atención sin realizar por él el primer paso.',
    'La práctica guiada contiene pocas respuestas del alumnado y la corrección se entrega únicamente al terminar toda la actividad.',
    'La estrategia se aplica con precisión en ejemplos conocidos, pero todavía no se ha probado con contextos variados ni menos claves.',
    'Durante la misma tarea, algunos necesitan un ejemplo, otros una pregunta y otros ya trabajan de forma autónoma.',
    'Una pauta asegura productos completos, pero nadie puede justificar las decisiones que siguió para obtenerlos.',
    'El mismo error persiste después de repetir varias veces una indicación verbal general que no identifica el punto de quiebre.'
  ],practiceFeedback:[
    'Una estudiante acierta cuando los ejercicios aparecen agrupados por estrategia, pero se confunde cuando debe decidir cuál utilizar.',
    'La retroalimentación escrita dice solamente “revisa”, sin identificar criterio, evidencia ni acción para un nuevo intento.',
    'Después de una sesión extensa el resultado mejora, pero una semana más tarde el aprendizaje no se recupera sin ayuda.',
    'El docente muestra únicamente ejemplos correctos; los estudiantes no distinguen cuándo una estrategia deja de ser pertinente.',
    'Ante una respuesta incompleta, se necesita una devolución que reconozca el avance y oriente una modificación concreta.',
    'El grupo logra precisión con una lista de control completa, aunque no trabaja de manera autónoma cuando esta se retira.',
    'Los ejercicios del contenido nuevo reemplazan completamente aprendizajes anteriores y no exigen recuperarlos ni discriminarlos.',
    'Un error se registra como falta de capacidad, sin analizar la estrategia utilizada ni modificar la enseñanza posterior.',
    'La práctica se concentra en una única jornada con relectura pasiva y no vuelve a solicitar recuperación en el tiempo.',
    'Se comparan casos muy semejantes, pero no se explican las condiciones que determinan qué estrategia corresponde aplicar.',
    'El comentario entrega la respuesta correcta, pero no solicita que el estudiante revise su producción ni explique el cambio.',
    'La lista de control mantiene todas las claves después de varias semanas y el estudiante no comprueba su trabajo sin ella.',
    'El adulto indica siempre meta, estrategia y pasos; el estudiante completa, pero no planifica ni monitorea su propio trabajo.',
    'La práctica masiva produce una mejora inmediata que desaparece cuando el aprendizaje se evalúa nuevamente días después.',
    'Al recibir la respuesta, el estudiante corrige ese ejercicio, aunque repite el mismo error en situaciones nuevas.',
    'El grupo alcanza precisión con apoyo constante; la siguiente prioridad es mantener el aprendizaje con menor ayuda y mayor variación.'
  ],accessSupports:[
    'En Ciencias, un lector de texto permite acceder al contenido y responder relaciones conceptuales; la decodificación no forma parte del objetivo.',
    'Una aplicación incorpora animaciones, sonidos y opciones que desvían la atención y dificultan localizar la información relevante.',
    'La hoja presenta poco espacio, bajo contraste y muchas consignas juntas, aunque la cantidad y complejidad del contenido son pertinentes.',
    'Se entrega una herramienta nueva sin modelado ni práctica y se utiliza por primera vez durante una evaluación.',
    'Un estudiante se fatiga al copiar, pero la tarea busca comprobar comprensión conceptual y no velocidad ni caligrafía.',
    'Un apoyo permite participar, aunque requiere presencia adulta permanente y no se ha comparado el desempeño sin indicaciones.',
    'Un lector de texto facilita responder una actividad de Ciencias donde el objetivo es interpretar evidencia, no leer palabras.',
    'Una aplicación considerada accesible introduce estímulos y navegación compleja que crean nuevas dificultades durante el uso.',
    'El material está visualmente saturado, pero es posible reorganizar jerarquía, contraste y segmentos conservando todas las preguntas.',
    'La herramienta fue entregada directamente y el estudiante no conoce sus funciones ni cuándo seleccionarlas.',
    'La copia extensa consume tiempo y esfuerzo, mientras el criterio evaluado es explicar relaciones entre conceptos.',
    'El equipo registra que el apoyo fue usado, pero no si mejoró acceso, participación, autonomía o fidelidad al objetivo.',
    'Un temporizador visual aumenta la ansiedad y reduce el desempeño, pese a que pretendía anticipar el tiempo disponible.',
    'El recurso funciona en atención individual, pero en aula no está disponible ni coordinado con la planificación docente.',
    'Dos herramientas reducen la misma barrera, aunque difieren en facilidad, autonomía, preferencias y sostenibilidad.',
    'El apoyo es eficaz académicamente, pero identifica públicamente al estudiante y este solicita una alternativa menos visible.'
  ],diversifiedAssessment:[
    'El objetivo es argumentar con evidencia, pero una modalidad alternativa permite responder verdadero o falso sin construir una justificación.',
    'El estudiante mejora cuando la consigna se segmenta y aclara, manteniendo intactas las relaciones y demandas cognitivas evaluadas.',
    'Para evaluar comprensión histórica, se consideran formatos orales, escritos y visuales que deben demostrar las mismas relaciones causales.',
    'El equipo elige herramientas antes de precisar qué aprendizaje se medirá y qué evidencia permitirá reconocer el logro.',
    'La rúbrica se entrega después de calificar y se utiliza solo para transformar criterios en un puntaje final.',
    'Casi todo el curso falla el mismo criterio después de una enseñanza breve y una tarea con instrucciones poco claras.',
    'Una modalidad alternativa de argumentación solicita marcar opciones, mientras la modalidad escrita exige justificar con evidencia.',
    'Con consignas segmentadas, la respuesta mejora sin cambiar el contenido, el criterio ni la complejidad del razonamiento.',
    'La evaluación histórica busca explicar causas y consecuencias; se ofrecen distintas modalidades con criterios comunes.',
    'Antes de escoger formatos, el equipo aún no define el constructo ni la evidencia mínima que demostrará aprendizaje.',
    'La rúbrica se conoce solo al final y no se usa para analizar ejemplos, autoevaluar ni mejorar una versión.',
    'Una respuesta oral demuestra el contenido esperado, pero se penaliza la ausencia de escritura aunque esa modalidad estaba autorizada.',
    'Durante la enseñanza se producen observaciones, preguntas y trabajos breves, pero solo se considera la prueba final.',
    'La mayoría falla el mismo criterio, por lo que podría existir un problema común de enseñanza, tarea o comprensión del criterio.',
    'Una adaptación mejora el puntaje porque incluye pistas que prácticamente revelan la respuesta correcta.',
    'Las modalidades producen evidencias inconsistentes y difieren en tiempo, apoyo, demanda secundaria y criterios aplicados.'
  ]};
  const module5ComplexityLayer={
    diversifiedDesign:{'Interpretación':'Debe identificarse si cambia el acceso o si se reduce injustificadamente el aprendizaje central.','Aplicación':'La alternativa elimina una barrera irrelevante, conserva criterios comunes y debe favorecer autonomía.','Decisión pedagógica':'La respuesta se incorpora al diseño común o se individualiza según evidencia de participación y progreso.'},
    explicitTeaching:{'Interpretación':'La secuencia debe conectar modelado, práctica guiada, comprobación y transferencia gradual de responsabilidad.','Aplicación':'La ayuda se ajusta al punto de quiebre y orienta el razonamiento sin sustituir la respuesta.','Decisión pedagógica':'El nivel de andamiaje varía según la evidencia y se retira cuando aumenta la autonomía.'},
    practiceFeedback:{'Interpretación':'Debe analizarse si la práctica favorece recuperación, discriminación y uso autónomo, no solo desempeño inmediato.','Aplicación':'La retroalimentación vincula criterio, evidencia y una acción que el estudiante puede aplicar en otro intento.','Decisión pedagógica':'La práctica se distribuye, varía y reduce ayudas para favorecer retención y transferencia.'},
    accessSupports:{'Interpretación':'La utilidad depende de la relación entre barrera, tarea, objetivo y experiencia real de uso.','Aplicación':'El recurso debe enseñarse, comprobarse en contexto y reducir dependencia sin alterar el constructo.','Decisión pedagógica':'Entre alternativas eficaces se priorizan autonomía, participación, preferencia y sostenibilidad.'},
    diversifiedAssessment:{'Interpretación':'Las modalidades son válidas solo si producen evidencia comparable del mismo aprendizaje.','Aplicación':'Primero se explicita el constructo y luego se seleccionan formatos, criterios y evidencias formativas.','Decisión pedagógica':'La decisión revisa enseñanza y calidad de evidencia antes de atribuir resultados al estudiante.'}
  };
  Object.entries(module5CaseContexts).forEach(([key,contexts])=>{
    let contextIndex=0;
    questionSets[key].forEach(question=>{
      if(question[0]==='Comprensión conceptual')return;
      const position=contextIndex++;
      const centralQuestion=question[1].match(/¿[^?]+\?$/)?.[0]||question[1];
      const complexity=position%2===0?` ${module5ComplexityLayer[key][question[0]]}`:'';
      question[1]=`${contexts[position]}${complexity} ${centralQuestion}`;
    });
  });
  const module6Expansions={participationBelonging:[
    ['Comprensión conceptual','¿Qué diferencia participación de presencia física?',['La participación exige asistencia diaria.','La participación implica aportar, decidir, aprender y ser reconocido dentro de la experiencia común.','La presencia siempre garantiza pertenencia.','No existe diferencia.'],1],
    ['Comprensión conceptual','¿Qué caracteriza el sentido de pertenencia escolar?',['Cumplir todas las normas sin apoyo.','Sentirse reconocido, valorado y parte legítima de la comunidad.','Obtener altas calificaciones.','Participar solo en actividades especiales.'],1],
    ['Interpretación','Una estudiante asiste a todas las clases, pero sus compañeros nunca consideran sus aportes ni le asignan funciones relevantes. ¿Qué dimensión está comprometida?',['Solo asistencia.','Participación y pertenencia.','Promoción.','Diagnóstico.'],1],
    ['Interpretación','Un alumno completa tareas adaptadas en el aula, aunque estas no se relacionan con el proyecto del grupo. ¿Qué revela?',['Inclusión plena.','Presencia con oportunidades limitadas de aprendizaje y contribución común.','Autonomía consolidada.','Colaboración efectiva.'],1],
    ['Aplicación','¿Qué acción favorece roles auténticos en trabajo grupal?',['Asignar siempre tareas simples a quien requiere apoyo.','Definir responsabilidades relevantes, apoyarlas y rotarlas según fortalezas y objetivos.','Dejar que el grupo elija sin mediación.','Separar funciones por diagnóstico.'],1],
    ['Aplicación','Una estudiante comunica decisiones mediante imágenes. ¿Cómo fortalecer su participación?',['Pedir respuesta oral antes de considerarla.','Incorporar su sistema de comunicación en turnos, elecciones y acuerdos del grupo.','Interpretar por ella.','Limitarla a observar.'],1],
    ['Aplicación','¿Qué evidencia permite valorar pertenencia?',['Solo matrícula.','Perspectivas del estudiante, relaciones, acceso a roles, reconocimiento y participación sostenida.','Número de apoyos.','Promedio general.'],1],
    ['Aplicación','En recreos un alumno permanece aislado pese a participar en clases. ¿Qué corresponde explorar?',['Solo sus preferencias.','Barreras relacionales, oportunidades de interacción, seguridad y su propia perspectiva.','Su calificación.','La necesidad de obligarlo a socializar.'],1],
    ['Aplicación','¿Cómo evitar participación simbólica en una consulta estudiantil?',['Solicitar opiniones después de decidir.','Entregar información accesible, opciones reales y explicar cómo inciden los aportes.','Invitar solo representantes adultos.','Registrar asistencia.'],1],
    ['Decisión pedagógica','Un apoyo académico funciona, pero separa sistemáticamente al estudiante de actividades valoradas. ¿Qué decide el equipo?',['Mantenerlo por sus resultados.','Rediseñar su modalidad para equilibrar progreso, participación y pertenencia.','Retirarlo sin alternativa.','Reducir el objetivo.'],1],
    ['Decisión pedagógica','Los registros muestran baja participación de varios alumnos durante exposiciones únicas. ¿Qué prioridad corresponde?',['Derivar individualmente.','Revisar el diseño común y ofrecer modalidades pertinentes antes de intensificar apoyos individuales.','Calificar esfuerzo.','Mantener el formato.'],1],
    ['Decisión pedagógica','Un estudiante rechaza una medida que lo identifica públicamente. ¿Qué acción es coherente?',['Aplicarla por beneficio académico.','Incorporar su perspectiva y acordar una alternativa eficaz y menos estigmatizante.','Eliminar todo apoyo.','Informar su diagnóstico al curso.'],1]
  ],coTeaching:[
    ['Comprensión conceptual','¿Qué distingue coenseñanza de apoyo ocasional?',['La presencia simultánea de dos adultos.','Planificación, enseñanza, evaluación y responsabilidad compartidas.','La intervención exclusiva del especialista.','La división fija del curso.'],1],
    ['Comprensión conceptual','¿Qué función cumple la planificación conjunta?',['Repartir materiales.','Acordar objetivos, barreras, roles, estrategias y evidencia antes de la clase.','Determinar quién controla al grupo.','Preparar tareas paralelas.'],1],
    ['Interpretación','Durante toda la clase, un docente enseña y el otro acompaña únicamente a estudiantes PIE. ¿Qué riesgo existe?',['Exceso de liderazgo.','Reproducir segregación dentro del aula y limitar responsabilidad compartida.','Demasiada evaluación.','Falta de diagnóstico.'],1],
    ['Interpretación','Dos profesionales alternan actividades, pero usan criterios y objetivos distintos. ¿Qué falta?',['Más recursos.','Coherencia pedagógica y acuerdos previos sobre aprendizaje y evidencia.','Separar al grupo.','Una prueba estandarizada.'],1],
    ['Aplicación','¿Cuándo resulta pertinente la enseñanza por estaciones?',['Cuando se desea separar por diagnóstico.','Cuando cada estación aporta al objetivo y permite agrupamientos flexibles con responsabilidades acordadas.','Cuando un docente queda sin rol.','Solo en evaluaciones.'],1],
    ['Aplicación','¿Cómo aprovechar la observación durante coenseñanza?',['Vigilar conducta únicamente.','Registrar respuestas, ayudas y barreras para ajustar la enseñanza conjuntamente.','Evaluar solo al grupo apoyado.','Evitar intervenir.'],1],
    ['Aplicación','Un profesional domina el contenido y otro estrategias de acceso. ¿Qué diseño es coherente?',['Dividir estudiantes permanentemente.','Combinar saberes en modelado, práctica guiada y apoyos disponibles para el grupo.','Delegar todo al especialista.','Crear currículos separados.'],1],
    ['Aplicación','¿Qué acuerdo favorece retroalimentación coherente?',['Cada docente corrige como prefiera.','Definir criterios, lenguaje común y forma de registrar próximos pasos.','Calificar por separado.','Entregar comentarios solo al final.'],1],
    ['Aplicación','El equipo siempre usa “uno enseña y otro ayuda”. ¿Qué revisión conviene?',['Mantener el formato.','Seleccionar estructuras variadas según objetivo, barreras y oportunidades de participación.','Cambiar de profesionales.','Reducir apoyos.'],1],
    ['Decisión pedagógica','La coenseñanza aumenta presencia, pero algunos siguen sin participar. ¿Qué decide el equipo?',['Considerarla exitosa.','Analizar roles, agrupamientos, tareas y voces estudiantiles para rediseñar.','Aumentar retiros.','Mantenerla sin cambios.'],1],
    ['Decisión pedagógica','No existe tiempo formal de planificación conjunta. ¿Qué medida institucional es prioritaria?',['Depender de conversaciones informales.','Proteger tiempos, definir propósitos y establecer mecanismos breves de seguimiento.','Suspender coenseñanza.','Entregar toda planificación al especialista.'],1],
    ['Decisión pedagógica','Los docentes discrepan sobre el nivel de ayuda durante una tarea. ¿Cómo resolver?',['Aplicar la máxima ayuda.','Volver al objetivo y la evidencia, acordar la mínima ayuda efectiva y observar su resultado.','Cada uno actúa por separado.','Consultar el diagnóstico.'],1]
  ],inclusiveClimate:[
    ['Comprensión conceptual','¿Qué caracteriza una convivencia inclusiva?',['Ausencia total de conflictos.','Relaciones de cuidado, participación, reconocimiento y resolución formativa de conflictos.','Aplicación idéntica de sanciones.','Responsabilidad exclusiva de convivencia escolar.'],1],
    ['Comprensión conceptual','¿Qué es una barrera actitudinal?',['Una limitación física del edificio.','Una expectativa, prejuicio o práctica relacional que restringe participación y oportunidades.','Una dificultad curricular individual.','Una norma de evaluación.'],1],
    ['Interpretación','Compañeros hacen bromas sobre un apoyo y el estudiante deja de utilizarlo. ¿Qué debe analizarse?',['Solo su motivación.','El clima, el estigma y la seguridad para participar con apoyos.','La eficacia técnica del recurso únicamente.','Su diagnóstico.'],1],
    ['Interpretación','Una norma de puntualidad sanciona del mismo modo a quien enfrenta una barrera de transporte accesible documentada. ¿Qué tensión existe?',['Ninguna por igualdad.','La aplicación uniforme puede producir inequidad y exclusión.','Falta una calificación.','Exceso de participación.'],1],
    ['Aplicación','¿Cómo responder formativamente a lenguaje discriminatorio?',['Ignorarlo si es una broma.','Detenerlo, reparar el daño, analizar su impacto y enseñar formas respetuosas de relación.','Sancionar sin diálogo.','Cambiar al estudiante afectado de grupo.'],1],
    ['Aplicación','¿Qué acción preventiva fortalece seguridad y pertenencia?',['Esperar denuncias.','Construir acuerdos accesibles, enseñar convivencia y habilitar canales confiables de ayuda.','Publicar diagnósticos.','Separar grupos.'],1],
    ['Aplicación','Una estudiante no participa porque teme equivocarse públicamente. ¿Qué ajuste corresponde?',['Obligarla a responder.','Ofrecer preparación, opciones graduales y una cultura donde el error se use para aprender.','Eximirla siempre.','Bajar el objetivo.'],1],
    ['Aplicación','¿Cómo incorporar la voz estudiantil en convivencia?',['Aplicar una encuesta sin devolución.','Crear instancias accesibles de consulta, decisión y seguimiento de acuerdos.','Consultar solo al centro de estudiantes.','Informar normas terminadas.'],1],
    ['Aplicación','Un conflicto se repite después de una sanción. ¿Qué evidencia revisar?',['Solo quién inició.','Patrones, contextos, necesidades, relaciones y efectos de las respuestas previas.','La nota de conducta.','El diagnóstico de los involucrados.'],1],
    ['Decisión pedagógica','Una medida protege momentáneamente, pero excluye al estudiante de clases. ¿Qué decide el equipo?',['Mantenerla indefinidamente.','Diseñar protección y reparación que resguarden seguridad y continuidad educativa.','Eliminar toda medida.','Cambiarlo de establecimiento.'],1],
    ['Decisión pedagógica','Las burlas se concentran en una actividad competitiva. ¿Cuál es la prioridad?',['Trabajar solo con quien recibe burlas.','Intervenir relaciones y rediseñar condiciones de la actividad, además de apoyar a los involucrados.','Suspender recreos.','Ocultar el problema.'],1],
    ['Decisión pedagógica','Una regla aparentemente neutral excluye reiteradamente. ¿Qué corresponde?',['Aplicarla por coherencia.','Examinar su impacto, escuchar a afectados y modificarla para asegurar participación y cuidado.','Crear excepciones privadas.','Responsabilizar a las familias.'],1]
  ],interdisciplinaryFollowup:[
    ['Comprensión conceptual','¿Qué aporta una perspectiva interdisciplinaria?',['Acumular informes independientes.','Integrar saberes y evidencia para comprender necesidades y coordinar decisiones.','Reemplazar al docente de aula.','Priorizar la opinión clínica.'],1],
    ['Comprensión conceptual','¿Qué hace operativo un acuerdo de equipo?',['Que todos estén de acuerdo.','Definir acción, responsable, plazo, indicador y fecha de revisión.','Registrar diagnósticos.','Realizar reuniones frecuentes.'],1],
    ['Interpretación','Cada profesional informa avances en su área, pero nadie analiza su uso en aula. ¿Qué falta?',['Más pruebas.','Integración funcional, generalización y una lectura compartida del progreso.','Un nuevo diagnóstico.','Mayor confidencialidad.'],1],
    ['Interpretación','El plan indica “apoyar comprensión” sin línea base ni criterio. ¿Cuál es la principal debilidad?',['Tiene pocos profesionales.','No permite implementar, monitorear ni tomar decisiones comparables.','Falta una etiqueta.','Debe reducir objetivos.'],1],
    ['Aplicación','¿Qué estructura favorece una reunión breve y útil?',['Revisar todos los antecedentes.','Priorizar evidencia nueva, analizar un objetivo, acordar acciones y fijar revisión.','Conversar sin registro.','Distribuir informes.'],1],
    ['Aplicación','La familia aporta una estrategia eficaz en casa. ¿Cómo utilizarla?',['Descartarla por no ser escolar.','Analizar su propósito y probar una adaptación coordinada en contextos pertinentes.','Aplicarla sin observar.','Reemplazar el plan.'],1],
    ['Aplicación','¿Qué indicador muestra generalización?',['Número de sesiones.','Uso autónomo de la estrategia en tareas, personas y contextos distintos.','Asistencia.','Cantidad de informes.'],1],
    ['Aplicación','Dos profesionales entregan instrucciones contradictorias. ¿Qué procede?',['Mantener ambas.','Acordar objetivo, lenguaje y secuencia común, y observar la respuesta.','Pedir al estudiante elegir.','Separar las intervenciones.'],1],
    ['Aplicación','¿Cómo resguardar confidencialidad en seguimiento?',['Compartir informes completos con todo el personal.','Comunicar solo información pertinente para cada rol mediante canales protegidos.','Evitar registrar apoyos.','Usar grupos abiertos.'],1],
    ['Decisión pedagógica','No hay progreso y la implementación fue irregular. ¿Qué decide primero el equipo?',['Cambiar diagnóstico.','Corregir fidelidad y recoger evidencia antes de juzgar la eficacia.','Retirar apoyo.','Reducir el objetivo.'],1],
    ['Decisión pedagógica','El estudiante logra el objetivo con autonomía en varios contextos. ¿Qué corresponde?',['Mantener todos los apoyos.','Reducirlos gradualmente y monitorear mantenimiento y participación.','Cerrar todo seguimiento.','Cambiar de meta sin informar.'],1],
    ['Decisión pedagógica','Existen interpretaciones profesionales distintas sobre la misma evidencia. ¿Cómo avanzar?',['Imponer la especialidad con mayor jerarquía.','Explicitar hipótesis, acordar qué datos permitirán contrastarlas y revisar conjuntamente.','Promediar opiniones.','Posponer indefinidamente.'],1]
  ]};
  Object.entries(module6Expansions).forEach(([key,questions])=>questionSets[key].push(...questions));
  const module6CaseContexts={participationBelonging:[
    'Durante el proyecto del curso, Emilia permanece en la sala, pero recibe una ficha individual y no participa en las decisiones ni en el producto común.',
    'Un estudiante asiste regularmente y completa tareas adaptadas, aunque sus compañeros no consideran sus aportes ni le asignan funciones relevantes.',
    'En el trabajo grupal, al alumno que requiere apoyo se le asigna siempre colorear, aun cuando comprende el contenido y desea asumir otras responsabilidades.',
    'Antonia comunica elecciones mediante imágenes, pero el grupo espera respuestas orales y un adulto termina decidiendo por ella.',
    'La escuela registra matrícula y asistencia como evidencia de inclusión, sin consultar relaciones, reconocimiento, roles ni experiencia del estudiante.',
    'Un apoyo académico mejora resultados, pero retira sistemáticamente al estudiante de proyectos, celebraciones y actividades que valora.',
    'Una estudiante asiste a todas las clases, pero sus compañeros interrumpen sus aportes y no la incluyen en decisiones grupales.',
    'Un alumno completa una tarea distinta dentro del aula, sin relación con el proyecto ni oportunidades de contribuir al aprendizaje común.',
    'El grupo distribuye funciones y reserva las tareas más simples para quien requiere apoyo, sin considerar fortalezas ni objetivos.',
    'La estudiante utiliza imágenes para expresar preferencias, pero su sistema no está disponible durante elecciones y acuerdos del curso.',
    'Para valorar pertenencia, el equipo dispone de asistencia, calificaciones, perspectivas, relaciones, acceso a roles y participación sostenida.',
    'En clases participa activamente, pero durante recreos permanece aislado y relata que no encuentra oportunidades seguras de interacción.',
    'La escuela consulta al alumnado después de tomar las decisiones y no explica si sus opiniones producirán cambios reales.',
    'El apoyo individual produce progreso, pero separa al estudiante de experiencias comunes en las que desea participar.',
    'Varios estudiantes intervienen poco cuando la única modalidad es exponer espontáneamente frente al curso completo.',
    'Un estudiante rechaza una ayuda visible porque sus compañeros la asocian públicamente con su diagnóstico.'
  ],coTeaching:[
    'Durante todas las clases, la docente de asignatura enseña al curso y la educadora diferencial se sienta solo con estudiantes PIE.',
    'Dos profesionales alternan actividades, pero utilizan objetivos, vocabulario y criterios distintos para juzgar el mismo aprendizaje.',
    'El equipo considera usar estaciones; algunas aportan al objetivo común y otras agrupan permanentemente según diagnóstico.',
    'Mientras una docente modela, la otra observa respuestas, tipos de ayuda y barreras que luego podrían orientar ajustes conjuntos.',
    'Una profesional domina el contenido y otra conoce estrategias de acceso, pero actualmente trabajan en secuencias separadas.',
    'La coenseñanza aumenta la cantidad de adultos en aula, aunque algunos estudiantes siguen sin acceder ni participar en la tarea.',
    'Durante todo el semestre, un docente expone y el otro acompaña exclusivamente a quienes pertenecen al PIE.',
    'Los profesionales se turnan frente al curso, pero planifican por separado y aplican criterios de éxito diferentes.',
    'Se propone enseñanza por estaciones con agrupamientos flexibles y tareas complementarias orientadas al mismo aprendizaje.',
    'Mientras un docente guía la actividad, el otro registra estrategias, errores y apoyos requeridos por estudiantes diversos.',
    'Los saberes de contenido y accesibilidad están distribuidos entre ambos profesionales, pero no se integran en una misma secuencia.',
    'Cada docente entrega comentarios diferentes y no existe lenguaje común sobre criterios ni próximos pasos.',
    'El equipo utiliza siempre “uno enseña y otro ayuda”, aunque los objetivos y barreras varían entre clases.',
    'La presencia de ambos profesionales aumentó, pero la tarea y los agrupamientos continúan excluyendo a parte del curso.',
    'La institución no protege tiempo de planificación; los acuerdos dependen de conversaciones breves en los pasillos.',
    'Los docentes discrepan sobre cuánta ayuda ofrecer y cada uno interviene de manera distinta durante la misma tarea.'
  ],inclusiveClimate:[
    'Compañeros hacen bromas sobre una herramienta de apoyo; después de varios episodios, el estudiante deja de utilizarla aunque le resulta útil.',
    'Una norma de puntualidad aplica la misma sanción a una estudiante cuya ruta de transporte accesible presenta retrasos documentados.',
    'Durante una actividad, aparece lenguaje discriminatorio; la respuesta inicial propone solo anotar una sanción sin abordar impacto ni reparación.',
    'El establecimiento espera denuncias formales, pero no enseña acuerdos de convivencia ni ofrece canales accesibles y confiables de ayuda.',
    'Una estudiante evita responder porque sus errores provocan risas; conoce el contenido cuando participa en condiciones más seguras.',
    'Una medida protege temporalmente, pero mantiene al estudiante fuera de clases y actividades evaluadas durante varias semanas.',
    'Después de bromas reiteradas sobre su apoyo, el estudiante lo guarda y disminuye su participación en las actividades.',
    'La regla se aplica de manera uniforme, aunque una barrera de transporte accesible afecta de forma documentada solo a algunos estudiantes.',
    'Un comentario discriminatorio se trata como broma y no se conversa sobre daño, responsabilidad ni formas respetuosas de relación.',
    'La escuela interviene solo después de conflictos y no construye acuerdos accesibles ni enseña estrategias preventivas.',
    'Una estudiante teme equivocarse públicamente y permanece en silencio pese a mostrar comprensión en grupos pequeños.',
    'La consulta sobre convivencia se realiza mediante una encuesta única sin devolución ni oportunidades reales de decisión.',
    'El mismo conflicto reaparece después de sanciones, pero no se revisan contextos, relaciones, necesidades ni efectos previos.',
    'La medida de protección reduce el riesgo inmediato, aunque interrumpe aprendizaje, vínculos y participación del estudiante afectado.',
    'Las burlas aparecen especialmente en una actividad competitiva cuyo diseño refuerza exposición y comparación pública.',
    'Una regla aparentemente neutral produce exclusión reiterada y las personas afectadas no han sido escuchadas en su revisión.'
  ],interdisciplinaryFollowup:[
    'Cada profesional informa avances de su área, pero nadie analiza si las habilidades se utilizan en aula o en otros contextos cotidianos.',
    'El plan señala “apoyar comprensión” sin línea base, acción, responsable, indicador ni fecha para revisar resultados.',
    'La reunión dispone de treinta minutos y muchos antecedentes; el equipo necesita priorizar evidencia nueva y una decisión verificable.',
    'La familia describe una estrategia eficaz en casa, pero el equipo la considera ajena al contexto escolar y no analiza su propósito.',
    'Un estudiante usa la estrategia en terapia individual, aunque no la selecciona con otras personas, tareas o espacios.',
    'No hay progreso y las acciones acordadas se aplicaron de manera irregular, con dosis y procedimientos diferentes.',
    'Los informes muestran avances disciplinares, pero no explican transferencia, autonomía ni efecto sobre participación en aula.',
    'La meta general no permite comparar desempeño inicial y posterior ni decidir si mantener o modificar el apoyo.',
    'Para una reunión breve, se deben seleccionar datos recientes, revisar un objetivo y cerrar con responsabilidades y fecha.',
    'La familia aporta una rutina que funciona, pero todavía no se ha probado una adaptación coordinada ni recogido evidencia.',
    'El equipo necesita un indicador que demuestre uso autónomo en tareas, personas y contextos diferentes.',
    'Dos profesionales entregan instrucciones y secuencias contradictorias para el mismo objetivo durante la semana.',
    'El seguimiento utiliza informes completos en grupos amplios, aunque cada participante requiere solo información pertinente a su rol.',
    'La implementación fue irregular y el equipo considera cambiar la hipótesis sin corregir primero la fidelidad del plan.',
    'El estudiante alcanza el objetivo autónomamente en aula, hogar y apoyo individual durante varias mediciones.',
    'Dos especialidades interpretan de manera diferente los mismos datos y ninguna explicita qué evidencia permitiría contrastar su hipótesis.'
  ]};
  const module6ComplexityLayer={
    participationBelonging:{'Interpretación':'Debe distinguirse presencia física de oportunidades reales para aprender, aportar, decidir y ser reconocido.','Aplicación':'La respuesta incorpora voz, comunicación accesible y roles auténticos dentro de la experiencia común.','Decisión pedagógica':'La medida debe equilibrar progreso, autonomía, participación y pertenencia sin producir estigmatización.'},
    coTeaching:{'Interpretación':'La presencia de dos profesionales no basta si se fragmentan responsabilidades, objetivos o grupos.','Aplicación':'El diseño articula saberes, roles, criterios y evidencia para ampliar oportunidades del curso completo.','Decisión pedagógica':'La estructura se selecciona según objetivo y barreras, y requiere tiempo institucional de planificación y revisión.'},
    inclusiveClimate:{'Interpretación':'Debe analizarse el efecto de normas, relaciones, estigma y seguridad sobre la participación.','Aplicación':'La respuesta combina prevención, interrupción del daño, reparación y enseñanza de convivencia.','Decisión pedagógica':'La protección debe resguardar seguridad y continuidad educativa, además de transformar condiciones que reproducen exclusión.'},
    interdisciplinaryFollowup:{'Interpretación':'El seguimiento integra evidencia funcional y transferencia, no solo informes paralelos de cada especialidad.','Aplicación':'Todo acuerdo necesita prioridad, acción, responsable, indicador, plazo y comunicación pertinente.','Decisión pedagógica':'Antes de juzgar eficacia se revisa fidelidad; luego se ajustan o retiran apoyos según progreso y autonomía.'}
  };
  Object.entries(module6CaseContexts).forEach(([key,contexts])=>{
    let contextIndex=0;
    questionSets[key].forEach(question=>{
      if(question[0]==='Comprensión conceptual')return;
      const position=contextIndex++;
      const centralQuestion=question[1].match(/¿[^?]+\?$/)?.[0]||question[1];
      const complexity=position%2===0?` ${module6ComplexityLayer[key][question[0]]}`:'';
      question[1]=`${contexts[position]}${complexity} ${centralQuestion}`;
    });
  });
  const moduleBanks=[
    ['bio','evolution','inclusion','regulations','decree83'],
    ['assessment','psychoeducational','deaIdentification','supportPlanning','collaboration'],
    ['readingProcesses','decodingFluency','readingComprehension','writingProduction','literacyIntervention'],
    ['mathProcesses','numberSense','calculationOperations','problemSolving','mathIntervention'],
    ['diversifiedDesign','explicitTeaching','practiceFeedback','accessSupports','diversifiedAssessment'],
    ['participationBelonging','coTeaching','collaboration','inclusiveClimate','interdisciplinaryFollowup']
  ];
  const distractorRationales=[
    {pattern:/^(solo|únicamente)\b/i,text:' considerando que ese antecedente podría representar el componente principal del desempeño observado.'},
    {pattern:/^(eliminar|reducir|suspender|retirar|bajar|separar|eximir|obligar|prohibir|cambiar)\b/i,text:' al considerar que así se ajusta la respuesta educativa al desempeño observado en ese momento.'},
    {pattern:/^(mantener|repetir|continuar|usar|aplicar|entregar|dar|pedir|aumentar)\b/i,text:' para conservar un procedimiento estable y comparar el desempeño en nuevas oportunidades.'},
    {pattern:/^(concluir|confirmar|diagnosticar|atribuir|declarar)\b/i,text:' porque el patrón observado se considera suficiente para orientar una decisión inmediata.'},
    {pattern:/^(ignorar|descartar|evitar)\b/i,text:' al estimar que ese antecedente no modifica la interpretación principal del caso.'},
    {pattern:/^(esperar|posponer)\b/i,text:' hasta contar con una nueva evaluación que confirme la necesidad de modificar la respuesta.'}
  ];
  const recalibrateDistractors=question=>{
    if(question[0]==='Comprensión conceptual')return;
    question[2]=question[2].map((option,index)=>{
      if(index===question[3]||option.trim().split(/\s+/).length>=14)return option;
      const rationale=distractorRationales.find(item=>item.pattern.test(option.trim()));
      if(!rationale)return option;
      return `${option.trim().replace(/[.]$/,'')},${rationale.text}`;
    });
  };
  new Set(moduleBanks.flat()).forEach(key=>questionSets[key].forEach(recalibrateDistractors));
  const integrationKeys={integration:0,assessmentIntegration:1,literacyIntegration:2,mathIntegration:3,module5Integration:4,module6Integration:5};
  const shuffle=items=>{const copy=[...items];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];}return copy;};
  const tagged=(questions,label)=>questions.map(q=>[q[0],q[1],q[2],q[3],label]);
  const unitPracticeKeys=new Set(moduleBanks.flat());
  const unitPracticeDistribution={'Comprensión conceptual':2,'Interpretación':2,'Aplicación':3,'Decisión pedagógica':1};
  const unitPracticeBank=key=>Object.entries(unitPracticeDistribution).flatMap(([skill,count])=>shuffle(questionSets[key].filter(question=>question[0]===skill)).slice(0,count));
  const integrationBank=moduleIndex=>moduleBanks[moduleIndex].flatMap((key,unitIndex)=>tagged(shuffle(questionSets[key]).slice(0,3),`Unidad ${unitIndex+1}`));
  const questionWords=question=>question[1].trim().split(/\s+/).length;
  const variedCandidate=(candidates,preferUpper=false)=>{
    const ordered=shuffle(candidates).sort((a,b)=>questionWords(a)-questionWords(b));
    const midpoint=Math.max(1,Math.ceil(ordered.length/2));
    const range=preferUpper?ordered.slice(midpoint):ordered.slice(0,midpoint);
    return shuffle(range.length?range:ordered)[0];
  };
  const taggedQuestion=(question,moduleIndex)=>[question[0],question[1],question[2],question[3],`Módulo ${moduleIndex+1}`];
  const quickSkillPattern=['Comprensión conceptual','Interpretación','Interpretación','Aplicación','Aplicación','Aplicación','Aplicación','Decisión pedagógica'];
  const quickBank=()=>{
    const modules=shuffle([0,1,2,3,4,5]);
    const moduleSequence=[...modules,...shuffle(modules).slice(0,2)];
    const used=new Set();
    return shuffle(quickSkillPattern).map((skill,index)=>{
      const moduleIndex=moduleSequence[index];
      const candidates=moduleBanks[moduleIndex].flatMap(key=>questionSets[key]).filter(question=>question[0]===skill&&!used.has(question[1]));
      const selected=variedCandidate(candidates,index%2===1);
      used.add(selected[1]);
      return taggedQuestion(selected,moduleIndex);
    });
  };
  const miniSkillPatterns=[
    ['Comprensión conceptual','Interpretación','Aplicación'],
    ['Interpretación','Aplicación','Decisión pedagógica'],
    ['Comprensión conceptual','Aplicación','Decisión pedagógica']
  ];
  const miniBank=()=>moduleBanks.flatMap((keys,moduleIndex)=>{
    const units=shuffle(keys);
    return miniSkillPatterns[moduleIndex%miniSkillPatterns.length].map((skill,index)=>{
      const candidates=questionSets[units[index]].filter(question=>question[0]===skill);
      return taggedQuestion(variedCandidate(candidates,index%2===1),moduleIndex);
    });
  });
  const fullExamPatterns=[
    ['Comprensión conceptual','Aplicación'],
    ['Interpretación','Aplicación'],
    ['Comprensión conceptual','Decisión pedagógica'],
    ['Interpretación','Aplicación'],
    ['Aplicación','Decisión pedagógica']
  ];
  const fullExamBank=()=>moduleBanks.flatMap((keys,moduleIndex)=>{
    const patterns=shuffle(fullExamPatterns);
    return keys.flatMap((key,unitIndex)=>patterns[unitIndex].map((skill,skillIndex)=>{
      const candidates=questionSets[key].filter(question=>question[0]===skill);
      return taggedQuestion(variedCandidate(candidates,(unitIndex+skillIndex)%2===1),moduleIndex);
    }));
  });
  const dynamicQuestions=key=>{
    if(key in integrationKeys)return integrationBank(integrationKeys[key]);
    if(key==='transversalQuick')return quickBank();
    if(key==='transversalMini')return miniBank();
    if(key==='transversalFull')return fullExamBank();
    if(unitPracticeKeys.has(key))return unitPracticeBank(key);
    return questionSets[key];
  };
  if(quiz.dataset.quiz==='transversal'){const mode=new URLSearchParams(location.search).get('modo')||'rapida';const config={rapida:['transversalQuick','Práctica rápida','8 preguntas · 6 módulos · habilidades equilibradas'],mini:['transversalMini','Miniensayo transversal','18 preguntas · 3 por módulo · casos variados'],completo:['transversalFull','Ensayo completo','60 preguntas · 10 por módulo · matriz equilibrada · tiempo sugerido: 120 minutos']}[mode]||['transversalQuick','Práctica rápida','8 preguntas · 6 módulos · habilidades equilibradas'];quiz.dataset.quiz=config[0];document.querySelector('[data-practice-title]').textContent=config[1];document.querySelector('[data-practice-meta]').textContent=config[2];document.querySelector(`.practice-mode-nav a[href="?modo=${mode}"]`)?.setAttribute('aria-current','page');document.title=`${config[1]} | ECEP`;}
  const quizKey=quiz.dataset.quiz||'bio';
  let questions=[];
  const letters=['A','B','C','D'];
  const renderQuiz=()=>{questions=shuffle(dynamicQuestions(quizKey)).map(q=>{const indexed=q[2].map((option,index)=>({option,correct:index===q[3]}));const options=shuffle(indexed);return [q[0],q[1],options.map(x=>x.option),options.findIndex(x=>x.correct),q[4]];});quiz.innerHTML=questions.map((x,i)=>`<fieldset class="quiz-question"><legend><span>${i+1} de ${questions.length} · ${x[0]}${x[4] ? ` · ${x[4]}` : ''}</span>${x[1]}</legend>${x[2].map((o,j)=>`<label><input type="radio" name="q${i}" value="${j}"><span><strong>${letters[j]}</strong>${o}</span></label>`).join('')}</fieldset>`).join('')+'<p class="quiz-error" role="alert" tabindex="-1" hidden>Responde todas las preguntas antes de finalizar.</p><button class="button green-button quiz-submit">Ver mi resultado</button>';};
  renderQuiz();
  quiz.addEventListener('submit',(event)=>{event.preventDefault();const data=new FormData(quiz);if(questions.some((_,i)=>!data.has(`q${i}`))){const e=quiz.querySelector('.quiz-error');e.hidden=false;e.focus();return;}let total=0;const stats={},units={};questions.forEach((x,i)=>{const ok=Number(data.get(`q${i}`))===x[3];total+=ok;stats[x[0]]??={correct:0,total:0};stats[x[0]].total++;stats[x[0]].correct+=ok;if(x[4]){units[x[4]]??={correct:0,total:0};units[x[4]].total++;units[x[4]].correct+=ok;}});const sorted=Object.entries(stats).sort((a,b)=>b[1].correct/b[1].total-a[1].correct/a[1].total);document.querySelector('#result-percent').textContent=`${Math.round(total/questions.length*100)}%`;document.querySelector('#result-score').textContent=`${total} de ${questions.length}`;document.querySelector('#result-strength').textContent=sorted[0][0].toLowerCase();document.querySelector('#result-improve').textContent=sorted.at(-1)[0].toLowerCase();const bars=(source)=>Object.entries(source).map(([n,v])=>{const p=Math.round(v.correct/v.total*100);return `<article><div><strong>${n}</strong><span>${v.correct}/${v.total} · ${p}%</span></div><div class="mini-progress green" role="progressbar" aria-label="${n}: ${p} por ciento"><span style="width:${p}%"></span></div></article>`}).join('');document.querySelector('#skill-breakdown').innerHTML=bars(stats);const unitBreakdown=document.querySelector('#unit-breakdown');if(unitBreakdown)unitBreakdown.innerHTML=bars(units);const result=document.querySelector('#resultado');result.hidden=false;result.scrollIntoView({behavior:'smooth'});result.querySelector('h2').focus({preventScroll:true});});
  document.querySelector('#retry-quiz').addEventListener('click',()=>{document.querySelector('#resultado').hidden=true;renderQuiz();document.querySelector('#practica,#miniensayo')?.scrollIntoView({behavior:'smooth'});quiz.querySelector('legend')?.setAttribute('tabindex','-1');quiz.querySelector('legend')?.focus({preventScroll:true});});
});
