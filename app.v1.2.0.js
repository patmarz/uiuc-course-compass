// UIUC Course Compass — v1.2.0 (from scratch)

// ---------- Utility ----------
const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
function el(html){ const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; }
function fmt(n, d=2){ return (Math.round(n*100)/100).toFixed(d); }
function hash(str){ let h=0; for(let i=0;i<str.length;i++) h = Math.imul(31,h) + str.charCodeAt(i) | 0; return Math.abs(h); }
function prng(seed){ let s = seed>>>0; return () => (s=(s*1664525+1013904223)>>>0)/2**32; }
function daysToArr(days){ return days.match(/[MTWRF]/g)||[]; }
function timeToMin(t){ const [h,m]=t.split(':').map(Number); return h*60+m; }
function overlaps(a,b){ const da=daysToArr(a.days), db=daysToArr(b.days); if(!da.some(d=>db.includes(d))) return false; return Math.max(timeToMin(a.start), timeToMin(b.start)) < Math.min(timeToMin(a.end), timeToMin(b.end)); }

// ---------- Data ----------
const Data = (()=>{
  const C=(code,title,hrs)=>({code,title,hrs});
  const courses=[
    C("CMN 101","Public Speaking",3),
    C("CS 105","Intro Computing: Non-Tech",3),
    C("ECON 102","Microeconomic Principles",3),
    C("ECON 103","Macroeconomic Principles",3),
    C("FIN 221","Corporate Finance",3),
    C("MATH 115","Preparation for Calculus",3),
    C("MATH 220","Calculus",4),
    C("MATH 221","Calculus I",4),
    C("MATH 231","Calculus II",3),
    C("MATH 234","Calculus for Business I",3),
    C("STAT 100","Statistics",3),
    C("ACCY 201","Accounting and Accountancy I",3),
    C("ACCY 202","Accounting and Accountancy II",3),
    C("BUS 101","Professional Responsibility and Business",3),
    C("BUS 201","Business Dynamics",3),
    C("BUS 301","Business in Action",3),
    C("BUS 401","Crafting Your Purpose in Business",3),
    C("BADM 210","Business Analytics I",3),
    C("BADM 211","Business Analytics II",3),
    C("BADM 275","Intro to Operations & Supply Chain Mgmt",3),
    C("BADM 300","The Legal Environment of Business",3),
    C("BADM 310","Mgmt and Organizational Behavior",3),
    C("BADM 320","Principles of Marketing",3),
    C("BADM 449","Business Policy and Strategy",3),
    C("ACCY 301","Atg Measurement & Disclosure",3),
    C("ACCY 302","Decision Making for Atg",3),
    C("ACCY 303","Accounting Institutions and Regulation",3),
    C("ACCY 304","Accounting Control Systems",3),
    C("ACCY 312","Principles of Taxation",3),
    C("ACCY 405","Assurance and Attestation",3),
    C("ACCY 410","Advanced Financial Reporting",3),
    C("ACCY 451","Advanced Income Tax Problems",3),
  ];
  const byCode = Object.fromEntries(courses.map(c=>[c.code,c]));
  const reqs=[
    {group:"General Education", items:[
      {type:"bucket", id:"comp1", title:"Composition I", hrs:4},
      {type:"bucket", id:"advcomp", title:"Advanced Composition", hrs:3},
      {type:"bucket", id:"humarts", title:"Humanities & the Arts", hrs:6},
      {type:"bucket", id:"natsci", title:"Natural Sciences & Technology", hrs:6},
      {type:"bucket", id:"socsci", title:"Social & Behavioral Sciences", hrs:6}, // no ECON here
      {type:"bucket", id:"cult-nw", title:"Cultural Studies: Non-Western", hrs:3},
      {type:"bucket", id:"cult-us", title:"Cultural Studies: U.S. Minorities", hrs:3},
      {type:"bucket", id:"cult-west", title:"Cultural Studies: Western/Comparative", hrs:3},
      {type:"bucket", id:"qr", title:"Quantitative Reasoning", hrs:0},
      {type:"bucket", id:"lang", title:"Language Requirement", hrs:0},
    ]},
    {group:"Business Core", items:[
      {type:"course", code:"ACCY 201"},
      {type:"course", code:"ACCY 202"},
      {type:"course", code:"BUS 101"},
      {type:"course", code:"BUS 201"},
      {type:"course", code:"BUS 301"},
      {type:"course", code:"BUS 401"},
      {type:"course", code:"BADM 210"},
      {type:"course", code:"BADM 211"},
      {type:"course", code:"BADM 275"},
      {type:"course", code:"BADM 300"},
      {type:"course", code:"BADM 310"},
      {type:"course", code:"BADM 320"},
      {type:"course", code:"BADM 449"},
      {type:"course", code:"CMN 101"},
      {type:"course", code:"CS 105"},
      {type:"course", code:"ECON 102"}, // kept here
      {type:"course", code:"ECON 103"}, // kept here
      {type:"course", code:"FIN 221"},
      {type:"oneof", title:"Business Core Math", options:["MATH 115","MATH 220","MATH 221","MATH 231","MATH 234","STAT 100"]},
    ]},
    {group:"Accountancy Major", items:[
      {type:"course", code:"ACCY 301"},
      {type:"course", code:"ACCY 302"},
      {type:"course", code:"ACCY 303"},
      {type:"course", code:"ACCY 304"},
      {type:"course", code:"ACCY 312"},
      {type:"course", code:"ACCY 405"},
      {type:"oneof", title:"Select one of the following", options:["ACCY 410","ACCY 451"]},
    ]}
  ];

  function profsFor(code){
    const rng = prng(hash(code));
    const first = ["Alex","Jordan","Taylor","Riley","Casey","Morgan","Avery","Quinn","Jules","Cameron","Drew","Skyler","Emerson","Logan","Reese","Harper","Rowan","Parker","Sage","Blake"];
    const last = ["Nguyen","Patel","Chen","Garcia","Diaz","Johnson","Smith","Lee","Brown","Davis","Rodriguez","Martinez","Lopez","Wilson","Anderson","Thomas","Moore","Jackson","White","Harris"];
    const count = 2 + Math.floor(rng()*2);
    const out = [];
    for(let i=0;i<count;i++){
      const name = `${first[Math.floor(rng()*first.length)]} ${last[Math.floor(rng()*last.length)]}`;
      const gpa = 2.7 + rng()*1.1;
      const rating = 3.5 + rng()*1.3;
      const days = ["MWF","TR"][Math.floor(rng()*2)];
      const startH = 8 + Math.floor(rng()*8);
      const start = `${String(startH).padStart(2,'0')}:${["00","30"][Math.floor(rng()*2)]}`;
      const end = `${String(startH + (days==="TR"?1:1)).padStart(2,'0')}:${days==="TR"?"15":"50"}`;
      out.push({id:`${code.replace(/\s+/g,'_')}_p${i}`, name, gpa, rating, section:{courseId:code, days, start, end, sectionId:`S${i}`} });
    }
    return out;
  }

  return {courses, byCode, reqs, profsFor};
})();

// ---------- State ----------
const Store={
  key:"uicc_state_1_2_0",
  read(){ try{ return JSON.parse(localStorage.getItem(this.key)) ?? {taken:[], planned:[], profPick:{}, bucketDone:{}}; }catch{ return {taken:[], planned:[], profPick:{}, bucketDone:{}}; },
  write(s){ localStorage.setItem(this.key, JSON.stringify(s)); },
  clear(){ localStorage.removeItem(this.key); }
};

// ---------- App ----------
const App={
  init(){
    // nav
    $$('nav [data-view]').forEach(b=> b.onclick = ()=> this.show(b.dataset.view));
    this.show('completed');
  },

  show(view){
    const app = $('#app'); app.innerHTML = '';
    if (view==='about'){ this.viewAbout(app); return; }
    if (view==='completed'){ this.viewCompleted(app); return; }
    if (view==='remaining'){ this.viewRemaining(app); return; }
    if (view==='schedule'){ this.viewSchedule(app); return; }
  },

  // Completed
  viewCompleted(app){
    const s = Store.read();
    const panel = el(`<section class="panel"><h2>Completed — mark what you've finished</h2></section>`);
    app.append(panel);

    Data.reqs.forEach(group=>{
      const acc = el(`<div class="accordion">
        <div class="acc-head">${group.group} ▾</div>
        <div class="acc-body"></div>
      </div>`);
      const body = $('.acc-body', acc);
      group.items.forEach(item=>{
        if(item.type==='bucket'){
          const row = el(`<div class="course-row">
            <div class="course-meta">
              <span class="badge">${item.title}</span>
              <div><small class="muted">${item.hrs? item.hrs+' hrs' : 'Bucket'}</small></div>
            </div>
            <label><input type="checkbox" data-bucket="${item.id}"> Completed</label>
          </div>`);
          const cb=$('input',row); cb.checked = !!s.bucketDone[item.id];
          cb.onchange = ()=>{ const st=Store.read(); st.bucketDone[item.id]=cb.checked; Store.write(st); };
          body.append(row);
        } else if(item.type==='course'){
          const c = Data.byCode[item.code];
          const row = el(`<div class="course-row">
            <div class="course-meta">
              <span class="badge">${c.code}</span>
              <div><span class="course-title">${c.title}</span><br><small class="muted">${c.hrs} hrs</small></div>
            </div>
            <label><input type="checkbox" data-code="${c.code}"> Completed</label>
          </div>`);
          const cb=$('input',row); cb.checked = s.taken.includes(c.code);
          cb.onchange = ()=>{ const st=Store.read(); const set=new Set(st.taken); if(cb.checked) set.add(c.code); else set.delete(c.code); st.taken=[...set]; Store.write(st); };
          body.append(row);
        } else if(item.type==='oneof'){
          const sub = el(`<div class="accordion"><div class="acc-head">${item.title} — choose one ▾</div><div class="acc-body"></div></div>`);
          item.options.forEach(code=>{
            const c = Data.byCode[code];
            const row = el(`<div class="course-row">
              <div class="course-meta">
                <span class="badge">${c.code}</span>
                <div><span class="course-title">${c.title}</span><br><small class="muted">${c.hrs} hrs</small></div>
              </div>
              <label><input type="checkbox" data-code="${c.code}"> Completed</label>
            </div>`);
            const cb=$('input',row); cb.checked = s.taken.includes(c.code);
            cb.onchange = ()=>{ const st=Store.read(); const set=new Set(st.taken); if(cb.checked) set.add(c.code); else set.delete(c.code); st.taken=[...set]; Store.write(st); };
            $('.acc-body', sub).append(row);
          });
          body.append(sub);
        }
      });
      panel.append(acc);
    });

    const cta = el(`<div class="form-row" style="justify-content:flex-end"><button class="primary" id="toRemaining">View what's left</button></div>`);
    panel.append(cta); $('#toRemaining').onclick = ()=> this.show('remaining');
  },

  // Remaining
  computeUnmet(){
    const s = Store.read();
    const out = {};
    Data.reqs.forEach(group=>{
      const items = [];
      group.items.forEach(item=>{
        if(item.type==='bucket'){ if(!s.bucketDone[item.id]) items.push({type:'bucket', title:item.title, note:(item.hrs?`${item.hrs} hrs — `:'')+'mark completed when satisfied'}); }
        if(item.type==='course'){ if(!s.taken.includes(item.code)) items.push({type:'course', code:item.code}); }
        if(item.type==='oneof'){
          const left = item.options.filter(c=>!s.taken.includes(c));
          if(left.length) items.push({type:'oneof', options:left});
        }
      });
      out[group.group] = items;
    });
    return out;
  },

  viewRemaining(app){
    const s = Store.read();
    const panel = el(`<section class="panel"><h2>Remaining & Plan</h2></section>`);
    app.append(panel);

    const unmet = this.computeUnmet();
    Object.keys(unmet).forEach(groupName=>{
      const list = unmet[groupName];
      const acc = el(`<div class="accordion"><div class="acc-head">${groupName} ▾</div><div class="acc-body"></div></div>`);
      const body = $('.acc-body', acc);

      if(!list.length){ body.append(el(`<p class="muted">All satisfied in this group 🎉</p>`)); }
      list.forEach(item=>{
        if(item.type==='bucket'){
          body.append(el(`<div class="course-row"><div class="course-meta"><span class="badge">${item.title}</span></div><div class="course-right"><span class="badge">${item.note}</span></div></div>`));
        } else {
          const codes = item.type==='course' ? [item.code] : item.options;
          codes.forEach(code=>{
            const c = Data.byCode[code];
            const profs = Data.profsFor(code);
            const avg = profs.reduce((a,p)=>a+p.gpa,0)/profs.length;
            const row = el(`<div class="course-row">
              <div class="course-meta">
                <span class="badge">${c.code}</span>
                <div><span class="course-title">${c.title}</span><br><small class="muted">${c.hrs} hrs</small></div>
              </div>
              <div class="course-right">
                <span class="badge">Avg GPA: ${fmt(avg)}</span>
                <button class="primary" disabled>Plan</button>
              </div>
            </div>`);
            body.append(row);

            const profWrap = el(`<div class="prof-list"></div>`);
            profs.forEach(p=>{
              const delta = p.gpa - avg;
              const cls = delta>0.15 ? 'green' : delta<-0.15 ? 'red' : 'yellow';
              const card = el(`<div class="prof-card">
                <div class="muted">${p.name}</div>
                <div><span class="prof-chip ${cls}">${fmt(p.gpa)} GPA ${delta>=0?'▲':'▼'} ${fmt(Math.abs(delta))}</span> • <span class="muted">${p.rating.toFixed(1)}/5</span></div>
                <div><button class="primary" data-plan="${c.code}" data-pid="${p.id}">Plan</button></div>
                <div class="muted" style="grid-column:1/-1">${p.section.days} ${p.section.start}-${p.section.end}</div>
              </div>`);
              $('[data-plan]', card).onclick = ()=>{
                const st = Store.read();
                if(!st.planned.includes(c.code)) st.planned.push(c.code);
                st.profPick[c.code] = p.id;
                Store.write(st);
              };
              profWrap.append(card);
            });
            body.append(profWrap);
          });
        }
      });

      panel.append(acc);
    });

    const plannedHrs = Store.read().planned.map(code=>Data.byCode[code]?.hrs||0).reduce((a,b)=>a+b,0);
    panel.append(el(`<div class="form-row"><span class="badge">${Object.values(unmet).reduce((a,b)=>a+b.length,0)} requirements remaining</span><span class="badge">Planned credits: ${plannedHrs}</span><button class="primary" id="openSched">Open Schedule</button></div>`));
    $('#openSched').onclick = ()=> this.show('schedule');
  },

  // Schedule
  viewSchedule(app){
    const s = Store.read();
    const panel = el(`<section class="panel"><h2>Schedule</h2><div id="planList"></div></section>
    <section class="panel"><h3>Weekly Grid</h3><div id="conflicts"></div><div id="grid" class="schedule"></div></section>`);
    app.append(panel);

    const planList = $('#planList');
    s.planned.forEach(code=>{
      const c = Data.byCode[code];
      const profs = Data.profsFor(code);
      const selected = s.profPick[code] || profs[0].id;
      if(!s.profPick[code]){ const st=Store.read(); st.profPick[code]=selected; Store.write(st); }
      const row = el(`<div class="course-row">
        <div class="course-meta"><span class="badge">${c.code}</span><div><span class="course-title">${c.title}</span><br><small class="muted">${c.hrs} hrs</small></div></div>
        <div class="course-right">
          <select class="profSel">${profs.map(p=>`<option value="${p.id}">${p.name} • ${p.section.days} ${p.section.start}-${p.section.end}</option>`).join('')}</select>
          <button class="ghost" data-remove="${code}">Remove</button>
        </div>
      </div>`);
      $('.profSel',row).value = selected;
      $('.profSel',row).onchange = (e)=>{ const st=Store.read(); st.profPick[code]=e.target.value; Store.write(st); draw(); };
      $('[data-remove]',row).onclick = ()=>{ const st=Store.read(); st.planned = st.planned.filter(x=>x!==code); delete st.profPick[code]; Store.write(st); this.show('schedule'); };
      planList.append(row);
    });

    function draw(){
      const grid = $('#grid'); grid.innerHTML='';
      const days=["","Mon","Tue","Wed","Thu","Fri"]; days.forEach(d=> grid.append(el(`<div class="cell label">${d}</div>`)));
      const hours = Array.from({length:10},(_,i)=>8+i);
      hours.forEach(h=>{ grid.append(el(`<div class="cell label">${h}:00</div>`)); for(let i=0;i<5;i++) grid.append(el(`<div class="cell" data-slot="${h}-${i}"></div>`)); });
      const chosen = Store.read().planned.map(code=>{
        const profs = Data.profsFor(code);
        const pid = Store.read().profPick[code] || profs[0].id;
        const p = profs.find(x=>x.id===pid) || profs[0];
        return {courseId:code, ...p.section, profName:p.name};
      });
      // conflicts
      let conflicts=0;
      for(let i=0;i<chosen.length;i++){ for(let j=i+1;j<chosen.length;j++){ if(overlaps(chosen[i],chosen[j])) conflicts++; } }
      $('#conflicts').innerHTML = conflicts ? `<span class="badge" style="background:#fde7e5;color:#7a1a14">${conflicts} conflict(s) detected</span>` : `<span class="badge" style="background:#e7f6ea;color:#1b5e20">No conflicts</span>`;
      chosen.forEach(it=>{
        daysToArr(it.days).forEach(d=>{
          const idx={M:0,T:1,W:2,R:3,F:4}[d];
          const startH = parseInt(it.start.split(':')[0],10);
          const row = Math.max(8,startH)-8;
          const slot = document.querySelector(`.cell[data-slot="${8+row}-${idx}"]`);
          if(slot){ slot.append(el(`<div class="course-pill"><b>${it.courseId}</b> • ${it.profName}<br>${it.days} ${it.start}-${it.end}</div>`)); }
        });
      });
    }
    draw();
  },

  viewAbout(app){
    app.append(el(`<section class="panel"><h2>About</h2>
      <p class="muted">Prototype built with plain HTML/CSS/JS. Data is synthetic and stored locally (no backend).</p>
    </section>`));
  }
};

window.addEventListener('load', ()=> App.init());
