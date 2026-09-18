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

const quiz=[
["¿Qué departamentos forman la agrupación Pacífica usada por el DANE?","Cauca, Chocó, Nariño y Valle del Cauca",["Cauca, Chocó, Nariño y Valle del Cauca","Chocó, Cauca, Nariño y Córdoba","Valle del Cauca, Cauca, Chocó y Putumayo"]],
["¿Cuál es un río asociado al territorio pacífico?","Atrato",["Atrato","San Juan","Mira"]],
["¿Qué ecosistema es una zona de transición entre tierra y mar?","Manglar",["Selva húmeda","Manglar","Bosque de ribera"]],
["¿Qué instrumento caracteriza las músicas tradicionales del Pacífico Sur?","Marimba de chonta",["Marimba de chonta","Cununo","Guasá"]],
["¿Cuál es una actividad económica importante?","Pesca",["Pesca","Agricultura","Turismo"]],
["¿Qué área protegida se encuentra en una isla del Cauca?","Gorgona",["Gorgona","Utría","Uramba Bahía Málaga"]]
];
let qi=0,score=0;
function renderQuiz(){let q=quiz[qi];$("#qCount").textContent=`Pregunta ${qi+1}/${quiz.length}`;$("#qScore").textContent=`Puntos: ${score}`;$("#qBar").style.width=qi/quiz.length*100+"%";$("#qText").textContent=q[0];$("#qFeedback").textContent="";$("#nextQ").classList.add("hidden");$("#qOptions").innerHTML=q[2].map(x=>"<button>"+x+"</button>").join("");$$("#qOptions button").forEach(b=>b.onclick=()=>{if(b.disabled)return;$$("#qOptions button").forEach(x=>x.disabled=true);if(b.textContent===q[1]){score++;b.classList.add("correct");$("#qFeedback").textContent="Correcto."}else{b.classList.add("wrong");$("#qFeedback").textContent="Respuesta correcta: "+q[1]}$("#qScore").textContent="Puntos: "+score;$("#nextQ").classList.remove("hidden")})}
$("#nextQ").onclick=()=>{qi++;if(qi>=quiz.length){qi=0;score=0}renderQuiz()};renderQuiz();

const pairs=["🌊","🌿","🐋","🪘","🚢","🐢"];let first=null,lock=false,moves=0;
function memory(){let board=$("#memoryBoard");board.innerHTML="";first=null;lock=false;moves=0;$("#moves").textContent="0 movimientos";[...pairs,...pairs].sort(()=>Math.random()-.5).forEach(v=>{let b=document.createElement("button");b.innerHTML="<span>?</span><b>"+v+"</b>";b.onclick=()=>{if(lock||b.classList.contains("flip"))return;b.classList.add("flip");if(!first){first=b;return}moves++;$("#moves").textContent=moves+" movimientos";if(b.textContent===first.textContent)first=null;else{lock=true;setTimeout(()=>{b.classList.remove("flip");first.classList.remove("flip");first=null;lock=false},650)}};board.appendChild(b)})}
$("#resetMemory").onclick=memory;memory();

const correct=["Nacimiento en zona alta","Cauce y afluentes","Comunidades ribereñas","Desembocadura en el mar"];let route=[...correct].sort(()=>Math.random()-.5);
function drawRoute(){let box=$("#routeChoices");box.innerHTML="";route.forEach((v,i)=>{let b=document.createElement("button");b.textContent=(i+1)+". "+v;b.onclick=()=>{if(i<route.length-1){[route[i],route[i+1]]=[route[i+1],route[i]];drawRoute()}};box.appendChild(b)})}
drawRoute();$("#checkRoute").onclick=()=>$("#routeResult").textContent=route.join("|")===correct.join("|")?"¡Ruta correcta!":"Aún hay elementos por ordenar.";

const classifyItems=[["Agricultura","primario"],["Pesca","primario"],["Minería","primario"],["Transformación de productos","secundario"],["Transporte y puertos","terciario"],["Turismo","terciario"]];let selectedSector=null,classifyDone=0;
function renderClassify(){let box=$("#classifyCards");box.innerHTML="";classifyItems.forEach((it,i)=>{let card=document.createElement("div");card.className="classify-card";card.innerHTML="<b>"+it[0]+"</b><small>Elige un sector para clasificarla.</small><div class='selected-sector'></div><button>Clasificar</button>";card.querySelector("button").onclick=()=>{if(!selectedSector){$("#classifyFeedback").textContent="Selecciona primero un sector.";return}if(card.classList.contains("done"))return;if(selectedSector===it[1]){card.classList.add("done");card.querySelector(".selected-sector").textContent="✓ "+selectedSector.toUpperCase();classifyDone++;$("#classifyScore").textContent=classifyDone+" / "+classifyItems.length;$("#classifyFeedback").textContent=classifyDone===classifyItems.length?"¡Clasificación completa!":"Correcto. Sigue con la siguiente."}else $("#classifyFeedback").textContent="No coincide. Revisa la definición del sector y prueba otra vez.";};box.appendChild(card)})}
$$(".sector-buttons button").forEach(b=>b.onclick=()=>{$$(".sector-buttons button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");selectedSector=b.dataset.sector;$("#classifyFeedback").textContent="Sector seleccionado: "+b.textContent});
$("#resetClassify").onclick=()=>{classifyDone=0;selectedSector=null;$$(".sector-buttons button").forEach(x=>x.classList.remove("selected"));$("#classifyScore").textContent="0 / 6";$("#classifyFeedback").textContent="";renderClassify()};renderClassify();

const decisions=[
["Una comunidad necesita mejorar su transporte fluvial sin afectar un manglar.",["Priorizar una ruta acordada con la comunidad y medidas de protección del manglar.","Abrir el canal sin estudiar el ecosistema","Eliminar el manglar para ampliar la ruta"]],
["Una actividad económica aumenta la presión sobre el bosque.",["Evaluar alternativas sostenibles, control ambiental y participación comunitaria.","Continuar sin controles","Ignorar los impactos"]],
["Una zona costera necesita reducir residuos.",["Mejorar gestión de residuos, educación ambiental y participación comunitaria.","Dejar los residuos donde estén","Aumentar los vertimientos"]]
];let di=0;
function decision(){let d=decisions[di];$("#decisionBox").innerHTML="<p><b>Situación:</b> "+d[0]+"</p><div>"+d[1].map((x,i)=>"<button data-i='"+i+"'>"+x+"</button>").join("")+"</div>";$$("button",$("#decisionBox")).forEach(b=>b.onclick=()=>{b.classList.add(+b.dataset.i===0?"good":"bad");setTimeout(()=>{di=(di+1)%decisions.length;decision()},700)})}
decision();

$$(".game-tabs button").forEach(b=>b.onclick=()=>{$$(".game-tabs button").forEach(x=>x.classList.toggle("active",x===b));$$(".game").forEach(x=>x.classList.toggle("active",x.id===b.dataset.game))});

let pdfDoc=null,pdfPageNum=1,pdfScale=1.1;
const pdfUrl="region_pacifica_menor_25MB.pdf";
async function loadPdf(){if(!window.pdfjsLib){$("#pdfLoading").textContent="No se pudo cargar el visualizador.";return}pdfjsLib.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";try{pdfDoc=await pdfjsLib.getDocument(pdfUrl).promise;$("#pdfLoading").style.display="none";$("#pdfPage").textContent="1 / "+pdfDoc.numPages;renderPdfPage()}catch(e){$("#pdfLoading").textContent="No se pudo abrir la presentación. Usa el botón para abrir o descargar el PDF."}}
async function renderPdfPage(){if(!pdfDoc)return;const page=await pdfDoc.getPage(pdfPageNum);const viewport=page.getViewport({scale:pdfScale});const canvas=$("#pdfCanvas"),ctx=canvas.getContext("2d");canvas.width=viewport.width;canvas.height=viewport.height;await page.render({canvasContext:ctx,viewport}).promise;$("#pdfPage").textContent=pdfPageNum+" / "+pdfDoc.numPages}
$("#pdfPrev").onclick=()=>{if(pdfDoc&&pdfPageNum>1){pdfPageNum--;renderPdfPage()}};
$("#pdfNext").onclick=()=>{if(pdfDoc&&pdfPageNum<pdfDoc.numPages){pdfPageNum++;renderPdfPage()}};
$("#pdfZoomIn").onclick=()=>{pdfScale=Math.min(2.4,pdfScale+.15);renderPdfPage()};
$("#pdfZoomOut").onclick=()=>{pdfScale=Math.max(.55,pdfScale-.15);renderPdfPage()};
$("#pdfFullscreen").onclick=()=>{const box=$("#pdfViewer");if(box.requestFullscreen)box.requestFullscreen();else if(box.webkitRequestFullscreen)box.webkitRequestFullscreen()};
loadPdf();
