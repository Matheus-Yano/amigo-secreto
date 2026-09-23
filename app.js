(function(){
  var STORAGE_KEY = "amigo-secreto:participantes";
  var amigos = [];
  var assignments = null; // { nome: destinatario }
  var revealedName = null;

  var $amigo = document.getElementById("amigo");
  var $btnAdd = document.getElementById("btnAdd");
  var $chips = document.getElementById("chips");
  var $empty = document.getElementById("empty");
  var $msg = document.getElementById("msg");
  var $btnDraw = document.getElementById("btnDraw");
  var $countPill = document.getElementById("countPill");
  var $picker = document.getElementById("picker");
  var $revealArea = document.getElementById("revealArea");
  var $btnReset = document.getElementById("btnReset");

  function loadSaved(){
    try{
      var raw = localStorage.getItem(STORAGE_KEY);
      if(raw){ var parsed = JSON.parse(raw); if(Array.isArray(parsed)) amigos = parsed; }
    }catch(e){}
  }
  function persist(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(amigos)); }catch(e){}
  }

  function showMsg(text){
    $msg.textContent = text || "";
    if(text){ clearTimeout(showMsg._t); showMsg._t = setTimeout(function(){ $msg.textContent = ""; }, 3200); }
  }

  function renderChips(){
    $chips.innerHTML = "";
    $empty.hidden = amigos.length > 0;
    amigos.forEach(function(nome, idx){
      var li = document.createElement("li");
      li.className = "chip";
      var span = document.createElement("span");
      span.textContent = nome;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", "Remover " + nome);
      btn.textContent = "✕";
      btn.addEventListener("click", function(){ removeAmigo(idx); });
      li.appendChild(span); li.appendChild(btn);
      $chips.appendChild(li);
    });
    $countPill.textContent = amigos.length + (amigos.length === 1 ? " participante" : " participantes");
    $btnDraw.disabled = amigos.length < 3;
  }

  function addAmigo(){
    var nome = $amigo.value.trim();
    if(!nome){ showMsg("Digite um nome antes de adicionar."); return; }
    var dup = amigos.some(function(n){ return n.toLowerCase() === nome.toLowerCase(); });
    if(dup){ showMsg("Esse nome já está na lista."); return; }
    amigos.push(nome);
    persist(); renderChips();
    $amigo.value = ""; $amigo.focus();
  }

  function removeAmigo(idx){
    amigos.splice(idx, 1);
    persist(); renderChips();
    if(assignments) resetDraw();
  }

  function resetAll(){
    amigos = []; persist(); renderChips(); resetDraw();
  }

  // Gera um sorteio válido: ninguém tira o próprio nome (derangement)
  function gerarSorteio(lista){
    var nomes = lista.slice();
    var destino;
    var tentativas = 0;
    do{
      destino = nomes.slice();
      for(var i = destino.length - 1; i > 0; i--){
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = destino[i]; destino[i] = destino[j]; destino[j] = tmp;
      }
      tentativas++;
    } while(destino.some(function(d, i){ return d === nomes[i]; }) && tentativas < 200);
    var map = {};
    nomes.forEach(function(n, i){ map[n] = destino[i]; });
    return map;
  }

  function startDraw(){
    assignments = gerarSorteio(amigos);
    revealedName = null;
    renderPicker();
    $btnDraw.hidden = true;
    $btnReset.hidden = false;
  }

  function renderPicker(){
    $picker.innerHTML = "";
    $picker.hidden = false;
    $revealArea.innerHTML = "";
    Object.keys(assignments).forEach(function(nome){
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = nome;
      btn.addEventListener("click", function(){ reveal(nome, btn); });
      li.appendChild(btn);
      $picker.appendChild(li);
    });
  }

  function reveal(nome, btnEl){
    document.querySelectorAll(".picker button").forEach(function(b){ b.classList.remove("revealed"); });
    btnEl.classList.add("revealed");
    $revealArea.innerHTML = "";
    var card = document.createElement("div");
    card.className = "reveal-card";
    var label = document.createElement("div");
    label.className = "reveal-label";
    label.textContent = nome + ", seu amigo secreto é:";
    var name = document.createElement("div");
    name.className = "reveal-name";
    name.textContent = assignments[nome];
    var hide = document.createElement("button");
    hide.className = "reveal-hide";
    hide.type = "button";
    hide.textContent = "Esconder";
    hide.addEventListener("click", function(){ $revealArea.innerHTML = ""; btnEl.classList.remove("revealed"); });
    card.appendChild(label); card.appendChild(name); card.appendChild(hide);
    $revealArea.appendChild(card);
  }

  function resetDraw(){
    assignments = null;
    $picker.hidden = true; $picker.innerHTML = "";
    $revealArea.innerHTML = "";
    $btnDraw.hidden = false;
    $btnReset.hidden = true;
  }

  $btnAdd.addEventListener("click", addAmigo);
  $amigo.addEventListener("keydown", function(e){ if(e.key === "Enter"){ e.preventDefault(); addAmigo(); } });
  $btnDraw.addEventListener("click", startDraw);
  $btnReset.addEventListener("click", resetDraw);

  loadSaved();
  renderChips();
})();
