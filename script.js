const $=(s,p=document)=>p.querySelector(s),$$=(s,p=document)=>[...p.querySelectorAll(s)];
const data=window.PACIFICO||{},modal=$("#modal");

function info(k){const x=data[k];if(!x)return;$("#modalTag").textContent=x[0];$("#modalTitle").textContent=x[1];$("#modalBody").textContent=x[2];modal.classList.add("open")}
$$("[data-info]").forEach(b=>b.onclick=()=>info(b.dataset.info));
$("#close").onclick=()=>modal.classList.remove("open");
modal.onclick=e=>{if(e.target===modal)modal.classList.remove("open")};
addEventListener("keydown",e=>{if(e.key==="Escape")modal.classList.remove("open")});
$("#menu").onclick=()=>$("#nav").classList.toggle("open");$$("nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));
addEventListener("scroll",()=>{const h=document.documentElement.scrollHeight-innerHeight;$("#progress").style.width=(scrollY/Math.max(h,1)*100)+"%"});
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("show")),{threshold:.08});$$(".reveal").forEach(e=>io.observe(e));

const shuffle=a=>{const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]]}return x};
const sample=(a,n)=>shuffle(a).slice(0,n);

const quizPool=[
["¿Qué departamentos forman la agrupación Pacífica usada por el DANE?","Cauca, Chocó, Nariño y Valle del Cauca",["Cauca, Chocó, Nariño y Valle del Cauca","Chocó, Cauca, Nariño y Córdoba","Valle del Cauca, Cauca, Chocó y Putumayo"]],
["¿Cuál es un río asociado al territorio pacífico?","Atrato",["Atrato","Magdalena","Meta"]],
["¿Qué ecosistema es una zona de transición entre tierra y mar?","Manglar",["Selva húmeda","Manglar","Páramo"]],
["¿Qué instrumento caracteriza las músicas tradicionales del Pacífico Sur?","Marimba de chonta",["Marimba de chonta","Arpa llanera","Acordeón"]],
["¿Cuál es una actividad económica relacionada con ríos, esteros y mar?","Pesca",["Pesca","Ganadería de alta montaña","Cultivo de papa"]],
["¿Qué área protegida se encuentra en una isla del Cauca?","Gorgona",["Gorgona","Utría","Uramba Bahía Málaga"]],
["¿Qué océano bordea la costa del Pacífico colombiano?","Océano Pacífico",["Océano Pacífico","Océano Atlántico","Océano Índico"]],
["¿Cuál es una característica frecuente del clima del Pacífico?","Alta humedad y abundantes lluvias",["Alta humedad y abundantes lluvias","Clima desértico","Heladas permanentes"]],
["¿Cuál de estos lugares pertenece al departamento del Chocó?","Nuquí",["Nuquí","Leticia","Villavicencio"]],
["¿Qué ciudad se relaciona con el litoral pacífico del Valle del Cauca?","Buenaventura",["Buenaventura","Pereira","Ibagué"]],
["¿Qué departamento incluye el municipio de Tumaco?","Nariño",["Nariño","Caldas","Huila"]],
["¿Cuál de estos territorios hace parte del litoral del Cauca?","Guapi",["Guapi","Popayán","Santander de Quilichao"]],
["¿Qué recurso natural es fundamental para muchos ecosistemas costeros?","Manglar",["Manglar","Páramo seco","Sabana desértica"]],
["¿Qué animal visita las costas del Pacífico colombiano entre julio y noviembre?","Ballena jorobada",["Ballena jorobada","Oso polar","Pingüino emperador"]],
["¿Cuál es una actividad del sector primario presente en el Pacífico?","Agricultura",["Agricultura","Publicidad","Desarrollo de software"]],
["¿Cuál pertenece al sector terciario?","Turismo",["Turismo","Minería","Agricultura"]],
["¿Qué actividad transforma materias primas en otros productos?","Transformación de productos",["Transformación de productos","Pesca","Recolección"]],
["¿Qué elemento conecta muchas comunidades del territorio pacífico?","Los ríos y vías fluviales",["Los ríos y vías fluviales","Glaciares","Ferrocarriles de alta montaña"]],
["¿Qué instrumento musical tradicional está hecho con láminas de palma y resonadores de bambú?","Marimba de chonta",["Marimba de chonta","Piano","Bandoneón"]],
["¿Cuál es un desafío ambiental mencionado para el Pacífico?","Deforestación",["Deforestación","Formación de glaciares","Desertificación polar"]]
];

let quizRound=[],qi=0,score=0,quizFinished=false;
function newQuizRound(){quizRound=sample(quizPool,5);qi=0;score=0;quizFinished=false;renderQuiz()}
function renderQuiz(){
  if(quizFinished)return;
  const q=quizRound[qi];
  $("#qCount").textContent=`Pregunta ${qi+1}/${quizRound.length}`;
  $("#qScore").textContent=`Puntos: ${score}`;
  $("#qBar").style.width=((qi)/quizRound.length*100)+"%";
  $("#qText").textContent=q[0];
  $("#qFeedback").textContent="";
  $("#nextQ").classList.add("hidden");
  $("#quizFinish").classList.add("hidden");
  $("#qOptions").innerHTML=shuffle(q[2]).map(x=>"<button type='button'>"+x+"</button>").join("");
  $$("#qOptions button").forEach(b=>b.onclick=()=>{
    if(b.disabled)return;
    $$("#qOptions button").forEach(x=>x.disabled=true);
    if(b.textContent===q[1]){score++;b.classList.add("correct");$("#qFeedback").textContent="✓ Correcto."}
    else{b.classList.add("wrong");$("#qFeedback").textContent="Respuesta correcta: "+q[1]}
    $("#qScore").textContent=`Puntos: ${score}`;
    if(qi===quizRound.length-1){
      $("#qBar").style.width="100%";
      $("#quizFinalScore").textContent=`Resultado: ${score} / ${quizRound.length}`;
      $("#quizFinalText").textContent=score===quizRound.length?"¡Perfecto! Dominaste los contenidos principales del Pacífico.":score>=4?"¡Buen trabajo! Repasa los temas que quieras reforzar.":"Puedes volver a recorrer la web y luego intentarlo otra vez.";
      $("#quizFinish").classList.remove("hidden");quizFinished=true;
    }else $("#nextQ").classList.remove("hidden");
  });
}
$("#nextQ").onclick=()=>{qi++;renderQuiz()};
$("#resetQuiz").onclick=newQuizRound;
newQuizRound();

const routeCorrect=["Nacimiento en zona alta","Cauce y afluentes","Comunidades ribereñas","Desembocadura en el mar"];
let routeStep=0,routeAttempts=0;
function renderRoute(){
  const box=$("#routeChoices");box.innerHTML="";
  $("#routeProgress").textContent=`Paso ${Math.min(routeStep+1,routeCorrect.length)} de ${routeCorrect.length}`;
  $("#routeAttempts").textContent=`Intentos: ${routeAttempts}`;
  shuffle(routeCorrect.slice(routeStep)).forEach(v=>{
    const b=document.createElement("button");b.type="button";b.textContent=v;
    b.onclick=()=>{
      routeAttempts++;
      if(v===routeCorrect[routeStep]){
        routeStep++;b.classList.add("correct");
        $("#routeResult").textContent=routeStep===routeCorrect.length?"✓ ¡Orden correcto! Completaste la ruta.":"✓ Correcto. Ahora busca el siguiente paso.";
        if(routeStep===routeCorrect.length){$("#routeProgress").textContent="Ruta completa · 4 de 4";$("#routeFinish").classList.remove("hidden");$$("#routeChoices button").forEach(x=>x.disabled=true)}
        else renderRoute();
      }else{b.classList.add("wrong");$("#routeResult").textContent="Ese no es el siguiente paso. Piensa en el recorrido del agua.";setTimeout(()=>b.classList.remove("wrong"),450);$("#routeAttempts").textContent=`Intentos: ${routeAttempts}`}
    };
    box.appendChild(b);
  });
}
$("#resetRoute").onclick=()=>{routeStep=0;routeAttempts=0;$("#routeResult").textContent="";$("#routeFinish").classList.add("hidden");renderRoute()};
renderRoute();

const classifyPool=[
["Agricultura","primario"],["Pesca","primario"],["Minería","primario"],["Aprovechamiento forestal","primario"],["Cultivo de coco","primario"],["Cultivo de plátano","primario"],["Recolección de piangua","primario"],["Cría de animales","primario"],
["Transformación de productos pesqueros","secundario"],["Procesamiento de alimentos","secundario"],["Elaboración de artesanías","secundario"],["Transformación de madera","secundario"],["Producción de conservas","secundario"],["Procesamiento de cacao","secundario"],
["Turismo","terciario"],["Transporte fluvial","terciario"],["Servicios portuarios","terciario"],["Comercio","terciario"],["Alojamiento","terciario"],["Servicios de alimentación","terciario"]
];
let classifyItems=[],selectedSector=null,classifyDone=0;
function newClassifyRound(){classifyItems=sample(classifyPool,8);selectedSector=null;classifyDone=0;$$(".sector-buttons button").forEach(x=>{x.classList.remove("selected");x.disabled=false});$("#classifyScore").textContent="0 / 8";$("#classifyFeedback").textContent="";$("#classifyFinish").classList.add("hidden");renderClassify()}
function renderClassify(){
  const box=$("#classifyCards");box.innerHTML="";
  classifyItems.forEach(it=>{
    const card=document.createElement("div");card.className="classify-card";
    card.innerHTML="<b>"+it[0]+"</b><small>Elige un sector arriba y pulsa Clasificar.</small><div class='selected-sector'></div><button type='button'>Clasificar</button>";
    card.querySelector("button").onclick=()=>{
      if(card.classList.contains("done"))return;
      if(!selectedSector){$("#classifyFeedback").textContent="Primero selecciona Primario, Secundario o Terciario.";return}
      if(selectedSector===it[1]){
        card.classList.add("done");card.querySelector(".selected-sector").textContent="✓ "+selectedSector.toUpperCase();card.querySelector("button").disabled=true;classifyDone++;
        $("#classifyScore").textContent=classifyDone+" / "+classifyItems.length;
        $("#classifyFeedback").textContent=classifyDone===classifyItems.length?"✓ ¡Todas las actividades están clasificadas!":"✓ Correcto. Continúa con otra actividad.";
        if(classifyDone===classifyItems.length){$("#classifyFinish").classList.remove("hidden");$$(".sector-buttons button").forEach(x=>x.disabled=true)}
      }else $("#classifyFeedback").textContent="No coincide. Revisa la definición de ese sector.";
    };box.appendChild(card);
  });
}
$$(".sector-buttons button").forEach(b=>b.onclick=()=>{$$(".sector-buttons button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");selectedSector=b.dataset.sector;$("#classifyFeedback").textContent="Sector seleccionado: "+b.textContent});
$("#resetClassify").onclick=newClassifyRound;
newClassifyRound();

const decisionPool=[
["Una comunidad necesita mejorar su transporte fluvial sin afectar un manglar.",["Priorizar una ruta acordada con la comunidad y medidas de protección del manglar.","Abrir el canal sin estudiar el ecosistema","Eliminar el manglar para ampliar la ruta"]],
["Una actividad económica aumenta la presión sobre el bosque.",["Evaluar alternativas sostenibles, control ambiental y participación comunitaria.","Continuar sin controles","Ignorar los impactos"]],
["Una zona costera necesita reducir residuos.",["Mejorar gestión de residuos, educación ambiental y participación comunitaria.","Dejar los residuos donde estén","Aumentar los vertimientos"]],
["Una comunidad quiere aprovechar un recurso del bosque sin degradarlo.",["Establecer un aprovechamiento sostenible con acuerdos comunitarios.","Extraer todo rápidamente","Eliminar el bosque"]],
["Un destino turístico recibe más visitantes y necesita proteger su entorno.",["Organizar el turismo con manejo de residuos y protección de los ecosistemas.","Aumentar visitantes sin límites","Ignorar la capacidad del lugar"]],
["Una zona de manglar presenta deterioro.",["Restaurar el manglar y fortalecer su cuidado con las comunidades.","Rellenarlo para construir","Retirar toda la vegetación"]],
["Una actividad minera genera impactos sobre agua y suelo.",["Aplicar controles ambientales y evaluar alternativas sostenibles.","Continuar sin seguimiento","Verter residuos al río"]],
["Una comunidad necesita mejorar el comercio de productos locales.",["Fortalecer cadenas sostenibles y medios de transporte adecuados.","Eliminar los productos locales","Aumentar desperdicios"]],
["Un río es usado para transporte y también sostiene ecosistemas.",["Planificar la navegación considerando el río y sus ecosistemas.","Ignorar las condiciones del río","Contaminar para ahorrar costos"]],
["Una actividad turística quiere mostrar la cultura local.",["Promoverla respetando las comunidades y sus expresiones culturales.","Modificarla sin consultar","Usarla sin reconocer a sus portadores"]]
];
let decisions=[],di=0,decisionScore=0,decisionFinished=false;
function newDecisionRound(){decisions=sample(decisionPool,4);di=0;decisionScore=0;decisionFinished=false;renderDecision()}
function renderDecision(){
  if(decisionFinished)return;
  const d=decisions[di];$("#decisionProgress").textContent=`Situación ${di+1} de ${decisions.length}`;$("#decisionScore").textContent=`Puntos: ${decisionScore}`;$("#decisionFinish").classList.add("hidden");
  const opts=d[1].map((text,i)=>({text,i}));const mixed=shuffle(opts);
  $("#decisionBox").innerHTML="<p><b>Situación:</b> "+d[0]+"</p><div>"+mixed.map(o=>"<button type='button' data-i='"+o.i+"'>"+o.text+"</button>").join("")+"</div>";
  $$("#decisionBox button").forEach(b=>b.onclick=()=>{
    $$("#decisionBox button").forEach(x=>x.disabled=true);const good=Number(b.dataset.i)===0;b.classList.add(good?"good":"bad");if(good)decisionScore++;$("#decisionScore").textContent=`Puntos: ${decisionScore}`;
    if(di===decisions.length-1){decisionFinished=true;$("#decisionProgress").textContent=`Situaciones completadas · ${decisions.length} de ${decisions.length}`;$("#decisionFinalScore").textContent=`Resultado: ${decisionScore} / ${decisions.length}`;$("#decisionFinalText").textContent=decisionScore===decisions.length?"Completaste todas las situaciones considerando ambiente, comunidad y economía.":"Completaste el reto. Revisa los desafíos ambientales para reforzar el tema.";$("#decisionFinish").classList.remove("hidden")}
    else setTimeout(()=>{di++;renderDecision()},650);
  });
}
$("#resetDecisions").onclick=newDecisionRound;
newDecisionRound();

$$(".game-tabs button").forEach(b=>b.onclick=()=>{$$(".game-tabs button").forEach(x=>x.classList.toggle("active",x===b));$$(".game").forEach(x=>x.classList.toggle("active",x.id===b.dataset.game))});

let pdfDoc=null,pdfPageNum=1,pdfScale=1.1;
const pdfUrl="region_pacifica_menor_25MB.pdf";

function updatePdfCounters(){
  const label=pdfDoc ? pdfPageNum+" / "+pdfDoc.numPages : "1 / —";
  const main=$("#pdfPage");
  if(main) main.textContent=label;
}
async function loadPdf(){
  if(!window.pdfjsLib){$("#pdfLoading").textContent="No se pudo cargar el visualizador.";return}
  pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  try{
    pdfDoc=await pdfjsLib.getDocument(pdfUrl).promise;
    $("#pdfLoading").style.display="none";
    updatePdfCounters();
    renderPdfPage();
  }catch(e){
    $("#pdfLoading").textContent="No se pudo abrir la presentación. Usa el botón para abrir o descargar el PDF.";
  }
}
async function renderPdfPage(){
  if(!pdfDoc)return;
  const page=await pdfDoc.getPage(pdfPageNum);
  const viewport=page.getViewport({scale:pdfScale});
  const canvas=$("#pdfCanvas"),ctx=canvas.getContext("2d");
  canvas.width=viewport.width;
  canvas.height=viewport.height;
  await page.render({canvasContext:ctx,viewport}).promise;
  updatePdfCounters();
}
function goPdfPrev(){
  if(pdfDoc&&pdfPageNum>1){pdfPageNum--;renderPdfPage()}
}
function goPdfNext(){
  if(pdfDoc&&pdfPageNum<pdfDoc.numPages){pdfPageNum++;renderPdfPage()}
}
function zoomPdf(delta){
  pdfScale=Math.min(2.4,Math.max(.55,pdfScale+delta));
  renderPdfPage();
}
$("#pdfPrev").onclick=goPdfPrev;
$("#pdfNext").onclick=goPdfNext;
$("#pdfZoomIn").onclick=()=>zoomPdf(.15);
$("#pdfZoomOut").onclick=()=>zoomPdf(-.15);

function enterPdfFullscreen(){
  const stage=$("#pdfStage");
  if(!stage)return;
  try{
    if(stage.requestFullscreen){
      const result=stage.requestFullscreen();
      if(result&&result.catch)result.catch(()=>{});
    }else if(stage.webkitRequestFullscreen){
      stage.webkitRequestFullscreen();
    }
  }catch(e){}
}
function exitPdfFullscreen(){
  try{
    if(document.fullscreenElement){
      const result=document.exitFullscreen();
      if(result&&result.catch)result.catch(()=>{});
    }else if(document.webkitFullscreenElement&&document.webkitExitFullscreen){
      document.webkitExitFullscreen();
    }
  }catch(e){}
}
$("#pdfFullscreen").onclick=enterPdfFullscreen;

const pdfViewer=$("#pdfViewer");
if(pdfViewer){
  let touchStartX=0;
  pdfViewer.addEventListener("touchstart",e=>{
    touchStartX=e.changedTouches[0].clientX;
  },{passive:true});
  pdfViewer.addEventListener("touchend",e=>{
    const dx=e.changedTouches[0].clientX-touchStartX;
    if(Math.abs(dx)>55) dx<0?goPdfNext():goPdfPrev();
  },{passive:true});
}
addEventListener("keydown",e=>{
  const stage=$("#pdfStage");
  const fs=document.fullscreenElement===stage||document.webkitFullscreenElement===stage;
  if(!fs)return;
  if(e.key==="ArrowLeft"){e.preventDefault();goPdfPrev()}
  if(e.key==="ArrowRight"){e.preventDefault();goPdfNext()}
  if(e.key==="+"){e.preventDefault();zoomPdf(.15)}
  if(e.key==="-"){e.preventDefault();zoomPdf(-.15)}
});
loadPdf();
