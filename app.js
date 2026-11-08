const sampleMatches = [
  {id:1,home:"Flamengo",away:"Palmeiras",date:"Hoje · 19:00",a:"🔴",b:"🟢"},
  {id:2,home:"Corinthians",away:"São Paulo",date:"Amanhã · 16:00",a:"⚫",b:"🔴"},
  {id:3,home:"Grêmio",away:"Internacional",date:"Sábado · 18:30",a:"🔵",b:"🔴"},
  {id:4,home:"Santos",away:"Botafogo",date:"Domingo · 17:00",a:"⚪",b:"⚫"}
];
const defaults=[{name:"Bolão dos Amigos",description:"Disputa com a turma",privacy:"Privado",scoring:"Personalizada",members:12},{name:"Brasileirão 2026",description:"Quem entende mais de futebol?",privacy:"Público",scoring:"Placar exato",members:28}];
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
let pools=JSON.parse(localStorage.getItem("be_pools")||"null")||defaults;
let picks=JSON.parse(localStorage.getItem("be_picks")||"{}");
let playerName=localStorage.getItem("be_name")||"Jogador";
function persist(){localStorage.setItem("be_pools",JSON.stringify(pools));localStorage.setItem("be_picks",JSON.stringify(picks));}
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2400)}
function navigate(page){$$(".page").forEach(p=>p.classList.toggle("active",p.id===`page-${page}`));$$("[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));const labels={inicio:"Início",jogos:"Jogos",boloes:"Meus bolões",ranking:"Ranking",perfil:"Meu perfil"};$("#pageCrumb").textContent=labels[page]||"Início";$("#sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});if(page==="boloes")renderPools()}
function matchMarkup(m,withInputs=false){const p=picks[m.id]||["",""];return `<div class="match-row"><div class="team"><span class="team-badge">${m.a}</span>${m.home}</div><div class="match-mid"><b>VS</b><small>${m.date}</small></div><div class="team">${m.away}<span class="team-badge">${m.b}</span></div>${withInputs?`<div class="pick-fields"><input aria-label="Gols ${m.home}" type="number" min="0" max="99" placeholder="0" value="${p[0]}" data-pick="${m.id}" data-side="0"><b>×</b><input aria-label="Gols ${m.away}" type="number" min="0" max="99" placeholder="0" value="${p[1]}" data-pick="${m.id}" data-side="1"><button class="save-pick" data-save-pick="${m.id}">Salvar palpite</button></div>`:""}</div>`}
function renderMatches(){$("#homeMatches").innerHTML=sampleMatches.slice(0,3).map(m=>matchMarkup(m)).join("");$("#allMatches").innerHTML=sampleMatches.map(m=>matchMarkup(m,true)).join("");}
function renderPools(){$("#poolGrid").innerHTML=pools.map((p,i)=>`<article class="pool-card"><div class="pool-card-top"><span class="pool-symbol">▤</span><span class="pool-state">● Ativo</span></div><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description||"Bolão criado por você")}</p><div class="pool-meta"><span>♙ <b>${p.members||1}</b> participantes</span><span>Privacidade: <b>${p.privacy}</b></span></div><div class="pool-meta"><span>Pontuação: <b>${p.scoring}</b></span></div></article>`).join("")||`<div class="panel"><h2>Você ainda não tem bolões</h2><p class="muted">Crie seu primeiro bolão e convide seus amigos.</p></div>`;$("#statPools").textContent=pools.length}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderRanking(){const names=[["Marina Costa",182],["Pedro Alves",156],[playerName,124],["Lucas Rocha",109],["Ana Souza",98]];$("#rankingRows").innerHTML=names.map((n,i)=>`<tr><td><span class="rank-number ${i===0?"first":""}">${i+1}º</span></td><td><div class="player-cell"><span class="player-mini">${n[0].split(" ").map(x=>x[0]).join("").slice(0,2)}</span>${escapeHtml(n[0])}${i===2?' <small style="color:#2463d3">(você)</small>':""}</div></td><td>${[15,13,8,11,10][i]}</td><td><b>${n[1]} pts</b></td></tr>`).join("")}
function openModal(){$("#poolModal").classList.add("open");$("#poolModal").setAttribute("aria-hidden","false");$("#poolName").focus()}
function closeModal(){$("#poolModal").classList.remove("open");$("#poolModal").setAttribute("aria-hidden","true")}
document.addEventListener("click",e=>{const page=e.target.closest("[data-page]");if(page){e.preventDefault();navigate(page.dataset.page)}const action=e.target.closest("[data-action]")?.dataset.action;if(action==="new-pool")openModal();if(action==="close-modal")closeModal();const save=e.target.closest("[data-save-pick]");if(save){const id=save.dataset.savePick;const fields=$$(`[data-pick="${id}"]`);picks[id]=fields.map(x=>x.value);persist();$("#statPicks").textContent=Object.values(picks).filter(v=>v.some(Boolean)).length;toast("Palpite salvo neste dispositivo!") }});
$("#poolForm").addEventListener("submit",e=>{e.preventDefault();const name=$("#poolName").value.trim();if(!name)return;pools.unshift({name,description:$("#poolDescription").value.trim(),privacy:$("#poolPrivacy").value,scoring:$("#poolScoring").value,members:1});persist();renderPools();e.target.reset();closeModal();navigate("boloes");toast("Bolão criado com sucesso!")});
$("#mobileMenu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#poolModal").addEventListener("click",e=>{if(e.target===$("#poolModal"))closeModal()});
$("#editProfile").addEventListener("click",()=>{const next=prompt("Como deseja ser chamado?",playerName);if(next&&next.trim()){playerName=next.trim().slice(0,30);localStorage.setItem("be_name",playerName);$(".welcome-row h1 span").textContent=playerName+"!";$("#profileName").textContent=playerName;renderRanking();toast("Nome atualizado!") }});
$$(".filter-chip").forEach(chip=>chip.addEventListener("click",()=>{$$(".filter-chip").forEach(c=>c.classList.remove("active"));chip.classList.add("active");toast("Filtro de demonstração selecionado.")}));
$(".welcome-row h1 span").textContent=playerName+"!";$("#profileName").textContent=playerName;
renderMatches();renderPools();renderRanking();
if("serviceWorker" in navigator && location.protocol.startsWith("http"))window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
