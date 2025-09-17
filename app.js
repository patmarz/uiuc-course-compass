/* UIUC Course Compass — v1.1.2
 - Buckets can be marked completed (Completed page)
 - Remaining shows professors inline (auto-expanded)
 - Per-professor plan buttons; planning stores professor+section
*/

// ---------- Seed Data (courses + groups) ----------
const Data = (() => {
  const courses = [
    C("CMN 101", "Public Speaking", 3, ["gened:comm"]),
    C("CS 105", "Intro Computing: Non-Tech", 3, ["qr"]),
    C("ECON 102", "Microeconomic Principles", 3, ["soc-beh"]),
    C("ECON 103", "Macroeconomic Principles", 3, ["soc-beh"]),
    C("FIN 221", "Corporate Finance", 3, ["core"]),
    C("MATH 115", "Preparation for Calculus", 3, ["math","qr1?"]),
    C("MATH 220", "Calculus", 4, ["math","qr1"]),
    C("MATH 221", "Calculus I", 4, ["math","qr1"]),
    C("MATH 231", "Calculus II", 3, ["math"]),
    C("MATH 234", "Calculus for Business I", 3, ["math","qr1"]),
    C("STAT 100", "Statistics", 3, ["math","qr"]),
    C("ACCY 201", "Accounting and Accountancy I", 3, ["core"]),
    C("ACCY 202", "Accounting and Accountancy II", 3, ["core"]),
    C("BUS 101", "Professional Responsibility and Business", 3, ["core"]),
    C("BUS 201", "Business Dynamics", 3, ["core"]),
    C("BUS 301", "Business in Action", 3, ["core"]),
    C("BUS 401", "Crafting Your Purpose in Business", 3, ["core"]),
    C("BADM 210", "Business Analytics I", 3, ["core"]),
    C("BADM 211", "Business Analytics II", 3, ["core"]),
    C("BADM 275", "Intro to Operations & Supply Chain Mgmt", 3, ["core"]),
    C("BADM 300", "The Legal Environment of Business", 3, ["core"]),
    C("BADM 310", "Mgmt and Organizational Behavior", 3, ["core"]),
    C("BADM 320", "Principles of Marketing", 3, ["core"]),
    C("BADM 449", "Business Policy and Strategy", 3, ["core"]),
    C("ACCY 301", "Atg Measurement & Disclosure", 3, ["accy"]),
    C("ACCY 302", "Decision Making for Atg", 3, ["accy"]),
    C("ACCY 303", "Accounting Institutions and Regulation", 3, ["accy"]),
    C("ACCY 304", "Accounting Control Systems", 3, ["accy"]),
    C("ACCY 312", "Principles of Taxation", 3, ["accy"]),
    C("ACCY 405", "Assurance and Attestation", 3, ["accy"]),
    C("ACCY 410", "Advanced Financial Reporting", 3, ["accy:oneof"]),
    C("ACCY 451", "Advanced Income Tax Problems", 3, ["accy:oneof"]),
  ];

  // Grouped requirement model (three accordions)
  const reqs = [
    GroupBlock("General Education", [
      R("Composition I", "creditBucket", {hours: 4, id:"bucket_comp1"}),
      R("Advanced Composition", "creditBucket", {hours: 3, id:"bucket_advcomp"}),
      R("Humanities & the Arts", "creditBucket", {hours: 6, id:"bucket_humart"}),
      R("Natural Sciences & Technology", "creditBucket", {hours: 6, id:"bucket_natsci"}),
      R("Social & Behavioral Sciences", "multiCourse", {courses:["ECON 102","ECON 103"], hours:6}),
      R("Cultural Studies: Non-Western", "creditBucket", {hours:3, id:"bucket_cs_nw"}),
      R("Cultural Studies: U.S. Minorities", "creditBucket", {hours:3, id:"bucket_cs_us"}),
      R("Cultural Studies: Western/Comparative", "creditBucket", {hours:3, id:"bucket_cs_west"}),
      R("Quantitative Reasoning", "creditBucket", {hours:0, id:"bucket_qr"}), /* allow mark completed */
      R("Language Requirement", "creditBucket", {hours: 0, id:"bucket_lang"})
    ]),
    GroupBlock("Business Core", [
      R("ACCY 201", "singleCourse", {course:"ACCY 201", hours:3}),
      R("ACCY 202", "singleCourse", {course:"ACCY 202", hours:3}),
      R("BUS 101", "singleCourse", {course:"BUS 101", hours:3}),
      R("BUS 201", "singleCourse", {course:"BUS 201", hours:3}),
      R("BUS 301", "singleCourse", {course:"BUS 301", hours:3}),
      R("BUS 401", "singleCourse", {course:"BUS 401", hours:3}),
      R("BADM 210", "singleCourse", {course:"BADM 210", hours:3}),
      R("BADM 211", "singleCourse", {course:"BADM 211", hours:3}),
      R("BADM 275", "singleCourse", {course:"BADM 275", hours:3}),
      R("BADM 300", "singleCourse", {course:"BADM 300", hours:3}),
      R("BADM 310", "singleCourse", {course:"BADM 310", hours:3}),
      R("BADM 320", "singleCourse", {course:"BADM 320", hours:3}),
      R("BADM 449", "singleCourse", {course:"BADM 449", hours:3}),
      R("CMN 101", "singleCourse", {course:"CMN 101", hours:3}),
      R("CS 105", "singleCourse", {course:"CS 105", hours:3}),
      R("ECON 102", "singleCourse", {course:"ECON 102", hours:3}),
      R("ECON 103", "singleCourse", {course:"ECON 103", hours:3}),
      R("FIN 221", "singleCourse", {course:"FIN 221", hours:3}),
      R("Business Core Math", "oneOf", {options:["MATH 115","MATH 220","MATH 221","MATH 231","MATH 234","STAT 100"], hours:3})
    ]),
    GroupBlock("Accountancy Major", [
      R("ACCY 301", "singleCourse", {course:"ACCY 301", hours:3}),
      R("ACCY 302", "singleCourse", {course:"ACCY 302", hours:3}),
      R("ACCY 303", "singleCourse", {course:"ACCY 303", hours:3}),
      R("ACCY 304", "singleCourse", {course:"ACCY 304", hours:3}),
      R("ACCY 312", "singleCourse", {course:"ACCY 312", hours:3}),
      R("ACCY 405", "singleCourse", {course:"ACCY 405", hours:3}),
      R("Select one of the following", "oneOf", {options:["ACCY 410","ACCY 451"], hours:3})
    ])
  ];

  function C(code,title,creditHours,tags=[]){ return {id:code, code, title, creditHours, tags}; }
  function R(title,type,props){ return {title,type,...props}; }
  function GroupBlock(title,items){ return {groupTitle:title, items}; }

  return { courses, reqs };
})();

// ---------- State ----------
const Store = {
  get key(){ return "uicc_state_v1_1_2"; },
  read(){
    try{ return JSON.parse(localStorage.getItem(this.key)) ?? {
      user:null, major:"GIES-ACCY", taken:[], planned:[], selectedSections:{}, selectedProfs:{}, ui:{openAccordions:{}, completedBuckets:{}}
    }; }catch{ return { user:null, major:"GIES-ACCY", taken:[], planned:[], selectedSections:{}, selectedProfs:{}, ui:{openAccordions:{}, completedBuckets:{}} }; }
  },
  write(s){ localStorage.setItem(this.key, JSON.stringify(s)); },
  clear(){ localStorage.removeItem(this.key); }
};

// ---------- Helpers ----------
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
function el(html){ const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function fmtGpa(g) { return (Math.round(g*100)/100).toFixed(2); }
function byFilter(q){
  q = (q||"").toLowerCase();
  return (c)=> !q || c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || q.split(/\s+/).every(tok => c.title.toLowerCase().includes(tok));
}

// Deterministic pseudo-random per course/prof index
function hash(str){ let h=0; for (let i=0;i<str.length;i++) h = Math.imul(31,h) + str.charCodeAt(i) | 0; return Math.abs(h); }
function prng(seed){ let s = seed; return ()=> (s = (s*1664525 + 1013904223) % 2**32) / 2**32; }

const NameGen = {
  first: ["Alex","Jordan","Taylor","Riley","Casey","Morgan","Avery","Quinn","Jules","Cameron","Drew","Skyler","Emerson","Logan","Reese","Harper","Rowan","Parker","Sage","Blake"],
  last: ["Nguyen","Patel","Chen","Garcia","Diaz","Johnson","Smith","Lee","Brown","Davis","Rodriguez","Martinez","Lopez","Wilson","Anderson","Thomas","Moore","Jackson","White","Harris"]
};

function generateProfsForCourse(code, count=2){
  const rng = prng(hash(code));
  const num = 2 + Math.floor(rng()*2); // 2-3 profs
  const profs = [];
  for (let i=0;i<Math.max(count,num);i++){
    const first = NameGen.first[Math.floor(rng()*NameGen.first.length)];
    const last = NameGen.last[Math.floor(rng()*NameGen.last.length)];
    const name = `${first} ${last}`;
    const id = `${code.replace(/\s+/g,'_')}_p${i}`;
    // GPA range 2.7 - 3.8, varied by course & prof index
    const gpa = 2.7 + (rng()*1.1);
    const rating = 3.5 + (rng()*1.3); // 3.5 - 4.8
    // Generate a deterministic section time per prof
    const dayPatterns = ["MWF","TR"];
    const days = dayPatterns[Math.floor(rng()*dayPatterns.length)];
    const startHour = 8 + Math.floor(rng()*8); // 8..15
    const start = `${String(startHour).padStart(2,'0')}:${["00","30"][Math.floor(rng()*2)]}`;
    const endMin = days==="TR" ? 75 : 50;
    const endHour = startHour + Math.floor((endMin + 0)/60);
    const end = `${String(endHour).padStart(2,'0')}:${(endMin%60===0?"00":"15")}`;
    profs.push({id, name, gpa, rating, section:{courseId:code, sectionId:id.replace(/\W/g,''), days, start, end}});
  }
  return profs;
}

// ---------- Router ----------
const app = $("#app");
const topNav = $("#topNav");

function render(){
  const s = Store.read();
  topNav.classList.toggle("hidden", !s.user);
  $$("#topNav button").forEach(btn=> btn.onclick = ()=> route(btn.dataset.link));
  const v = (!s.user) ? "account" : (location.hash.replace("#","") || "completed");
  route(v, true);
}

function route(view, skip=false){
  if (!skip) location.hash = view;
  const s = Store.read();
  app.innerHTML = "";
  switch(view){
    case "account": View.account(); break;
    case "completed": if(!s.user) View.account(); else View.completed(); break;
    case "remaining": if(!s.user) View.account(); else View.remaining(); break;
    case "schedule": if(!s.user) View.account(); else View.schedule(); break;
    default: View.completed();
  }
}

// ---------- Views ----------
const View = {
  account(){
    const s = Store.read();
    const panel = el(`<section class="panel">
      <h2>${s.user ? "Account" : "Welcome"}</h2>
      ${s.user ? `
        <p>Signed in as <b>${s.user.email}</b>.</p>
        <div class="form-row">
          <button class="primary" id="goCompleted">Go to Completed</button>
          <button class="ghost" id="signOut">Sign out</button>
        </div>`
      : `
        <p>Sign in locally (demo only; stored on this device).</p>
        <div class="form-row">
          <input type="email" id="email" placeholder="netid@illinois.edu" />
          <input type="password" id="pw" placeholder="Password (demo only)" />
          <button class="primary" id="signin">Sign In</button>
        </div>`}
    </section>`);
    app.append(panel);
    if (!s.user){
      $("#signin").onclick = ()=>{
        const email = $("#email").value.trim();
        if (!email) return alert("Enter an email");
        Store.write({...s, user:{email}});
        route("completed");
      };
    } else {
      $("#signOut").onclick = ()=>{ Store.clear(); render(); };
      $("#goCompleted").onclick = ()=> route("completed");
    }
  },

  completed(){
    const s = Store.read();
    const container = el(`<section class="panel"></section>`);
    container.append(el(`<h2>Completed — select what you've already finished</h2>`));
    const major = el(`<div class="form-row">
      <label>Major:</label>
      <select id="majorSel"><option value="GIES-ACCY">GIES — Accountancy (BS)</option></select>
      <button class="ghost" id="toRemaining">View what's left →</button>
    </div>`);
    container.append(major);
    $("#majorSel").value = s.major;
    $("#majorSel").onchange = (e)=>{ Store.write({...s, major:e.target.value}); render(); };
    $("#toRemaining").onclick = ()=> route("remaining");

    Data.reqs.forEach(group=>{
      const acc = accordion(group.groupTitle, () => {
        const body = el(`<div></div>`);
        group.items.forEach(item=> body.append(completedRow(item, s)));
        return body;
      }, s.ui.openAccordions[group.groupTitle]);
      container.append(acc);
    });

    app.append(container);
  },

  remaining(){
    const s = Store.read();
    const container = el(`<section class="panel"></section>`);
    container.append(el(`<h2>Remaining & Plan</h2>`));

    const allUnmet = computeUnmetGrouped(Data.reqs, s);
    let remainingCount = 0;
    Data.reqs.forEach(group=>{
      const items = allUnmet[group.groupTitle] || [];
      remainingCount += items.length;
      const acc = accordion(group.groupTitle, () => {
        const body = el(`<div></div>`);
        items.forEach(req => body.append(remainingRow(req, s)));
        if (!items.length) body.append(el(`<p class="muted">All satisfied in this group 🎉</p>`));
        return body;
      }, s.ui.openAccordions[group.groupTitle]);
      container.append(acc);
    });

    const plannedCredits = s.planned.map(c => Data.courses.find(x=>x.code===c)?.creditHours||0).reduce((a,b)=>a+b,0);
    const summary = el(`<div class="form-row">
      <span class="badge">${remainingCount} requirements remaining</span>
      <span class="badge">Planned credits: ${plannedCredits}</span>
      <button class="primary" id="goSchedule">Open Schedule</button>
    </div>`);
    container.append(summary);
    $("#goSchedule").onclick = ()=> route("schedule");

    app.append(container);
  },

  schedule(){
    const s = Store.read();
    const panel = el(`<section class="panel">
      <h2>Schedule</h2>
      <div id="planList"></div>
    </section>
    <section class="panel">
      <h3>Weekly Grid</h3>
      <div id="conflicts"></div>
      <div class="schedule" id="grid"></div>
    </section>`);
    app.append(panel);

    function renderPlan(){
      const planList = $("#planList");
      planList.innerHTML = "";
      s.planned.forEach(code=>{
        const course = Data.courses.find(c=>c.code===code);
        const chosenProfId = s.selectedProfs[code];
        const profs = generateProfsForCourse(code);
        const secs = profs.map(p=>p.section);
        const pick = profs.find(p=>p.id===chosenProfId) || profs[0];
        s.selectedProfs[code] = pick.id;
        s.selectedSections[code] = pick.section.sectionId;
        Store.write(s);

        const row = el(`<div class="course-row">
          <div class="course-meta">
            <span class="badge">${course.code}</span>
            <div><b>${course.title}</b><br><small class="muted">${course.creditHours} hrs</small></div>
          </div>
          <div class="form-row">
            <select data-code="${code}" class="profSelect">
              ${profs.map(p=>`<option value="${p.id}">${p.name} • ${p.section.days} ${p.section.start}-${p.section.end}</option>`).join("")}
            </select>
            <button class="ghost" data-remove="${code}">Remove</button>
          </div>
        </div>`);
        $(".profSelect",row).value = pick.id;
        $(".profSelect",row).onchange = (e)=>{
          const pid = e.target.value;
          const p = profs.find(x=>x.id===pid);
          s.selectedProfs[code] = pid;
          s.selectedSections[code] = p.section.sectionId;
          Store.write(s);
          drawGrid();
        };
        $('[data-remove]',row).onclick = (e)=>{
          const code = e.currentTarget.dataset.remove;
          s.planned = s.planned.filter(x=>x!==code);
          delete s.selectedSections[code];
          delete s.selectedProfs[code];
          Store.write(s); renderPlan();
        };
        planList.append(row);
      });
      drawGrid();
    }

    function drawGrid(){
      const grid = $("#grid"); grid.innerHTML="";
      const days = ["","Mon","Tue","Wed","Thu","Fri"];
      days.forEach(d=> grid.append(el(`<div class="cell label">${d}</div>`)));
      const hours = Array.from({length:10},(_,i)=>8+i);
      hours.forEach(h=>{
        grid.append(el(`<div class="cell label">${h}:00</div>`));
        for (let i=0;i<5;i++) grid.append(el(`<div class="cell" data-slot="${h}-${i}"></div>`));
      });

      const chosen = s.planned.map(code=>{
        const profs = generateProfsForCourse(code);
        const pick = profs.find(p=>p.id===s.selectedProfs[code]) || profs[0];
        return {code, ...pick.section, profName: pick.name};
      }).filter(Boolean);

      const conflicts = [];
      for (let i=0;i<chosen.length;i++){
        for (let j=i+1;j<chosen.length;j++){
          if (overlaps(chosen[i], chosen[j])) conflicts.push([chosen[i], chosen[j]]);
        }
      }
      const cEl = $("#conflicts");
      cEl.innerHTML = conflicts.length
        ? `<p class="badge bad">Conflicts detected: ${conflicts.length}</p>`
        : `<p class="badge ok">No conflicts</p>`;

      chosen.forEach(it=>{
        daysToArr(it.days).forEach(d=>{
          const idx = {M:0,T:1,W:2,R:3,F:4}[d];
          const startHour = parseInt(it.start.split(":")[0],10);
          const rowIndex = Math.max(8, startHour) - 8;
          const slot = document.querySelector(`.cell[data-slot="${8+rowIndex}-${idx}"]`);
          if (slot){
            const pill = el(`<div class="course-pill">
              <b>${it.courseId}</b> • ${it.profName}<br>${it.days} ${it.start}-${it.end}
            </div>`);
            slot.append(pill);
          }
        });
      });
    }

    // Helpers
    function daysToArr(days){ return days.match(/[MTWRF]/g) || []; }
    function timeStrToMinutes(t){ const [h,m]=t.split(":").map(Number); return h*60+m; }
    function overlaps(a,b){
      const da=a.days.match(/[MTWRF]/g)||[], db=b.days.match(/[MTWRF]/g)||[];
      if (!da.some(d=>db.includes(d))) return false;
      const a1=timeStrToMinutes(a.start), a2=timeStrToMinutes(a.end);
      const b1=timeStrToMinutes(b.start), b2=timeStrToMinutes(b.end);
      return Math.max(a1,b1) < Math.min(a2,b2);
    }

    renderPlan();
  }
};

// ---------- UI Builders ----------
function accordion(title, bodyBuilder, isOpen=false){
  const id = `acc-${title.replace(/\s+/g,'-').toLowerCase()}`;
  const acc = el(`<div class="accordion" id="${id}">
    <div class="acc-head"><div class="acc-title">${title}</div><div class="chev">▾</div></div>
    <div class="acc-body"></div>
  </div>`);
  const body = acc.querySelector(".acc-body");
  const head = acc.querySelector(".acc-head");
  const chev = acc.querySelector(".chev");

  const toggle = (open) => {
    body.classList.toggle("open", open);
    chev.style.transform = open ? "rotate(180deg)" : "rotate(0)";
    const s = Store.read();
    s.ui.openAccordions[title] = open;
    Store.write(s);
    if (open && !body.dataset.built){
      const built = bodyBuilder();
      body.append(built);
      body.dataset.built = "1";
    }
  };
  head.onclick = ()=> toggle(!body.classList.contains("open"));
  toggle(!!isOpen);
  return acc;
}

function completedRow(item, s){
  const wrap = el(`<div></div>`);
  if (item.type === "singleCourse"){
    const c = Data.courses.find(x=>x.code===item.course);
    wrap.append(checkRow(c, s));
  } else if (item.type === "oneOf"){
    const sub = el(`<div class="accordion">
      <div class="acc-head"><div class="acc-title">${item.title} — choose one</div><div class="chev">▾</div></div>
      <div class="acc-body"></div>
    </div>`);
    const body = sub.querySelector(".acc-body");
    sub.querySelector(".acc-head").onclick = ()=> subToggle();
    function subToggle(){
      const open = !body.classList.contains("open");
      body.classList.toggle("open", open);
      sub.querySelector(".chev").style.transform = open ? "rotate(180deg)" : "rotate(0)";
      if (open && !body.dataset.built){
        item.options.forEach(code => body.append(checkRow(Data.courses.find(c=>c.code===code), s)));
        body.dataset.built="1";
      }
    }
    wrap.append(sub);
  } else if (item.type === "multiCourse"){
    item.courses.forEach(code => wrap.append(checkRow(Data.courses.find(c=>c.code===code), s)));
  } else if (item.type === "creditBucket"){
    const checked = !!s.ui.completedBuckets[item.id];
    const row = el(`<div class="course-row">
      <div class="course-meta">
        <span class="badge">${item.title}</span>
        <div><small class="muted">${item.hours ? item.hours + " hrs" : "Bucket"}</small></div>
      </div>
      <label><input type="checkbox" data-bucket="${item.id}"> Completed</label>
    </div>`);
    const cb = row.querySelector("input");
    cb.checked = checked;
    cb.onchange = ()=>{
      const st = Store.read();
      st.ui.completedBuckets[item.id] = cb.checked;
      Store.write(st);
    };
    wrap.append(row);
  }
  return wrap;
}

function checkRow(course, s){
  if (!course) return el(`<div></div>`);
  const row = el(`<div class="course-row">
    <div class="course-meta">
      <span class="badge">${course.code}</span>
      <div><b>${course.title}</b><br><small class="muted">${course.creditHours} hrs</small></div>
    </div>
    <label><input type="checkbox" data-code="${course.code}"> Completed</label>
  </div>`);
  const cb = row.querySelector("input");
  cb.checked = s.taken.includes(course.code);
  cb.onchange = ()=>{
    const state = Store.read();
    const set = new Set(state.taken);
    if (cb.checked) set.add(course.code); else set.delete(course.code);
    state.taken = [...set];
    Store.write(state);
  };
  return row;
}

function remainingRow(req, s){
  const block = el(`<div></div>`);
  const courses = req._courses?.length ? req._courses : (req.course ? [req.course] : []);

  courses.forEach(code => {
    const course = Data.courses.find(c=>c.code===code);
    if (!course) return;
    const profs = generateProfsForCourse(code);
    const avg = profs.length ? profs.reduce((a,p)=>a+p.gpa,0)/profs.length : null;
    const row = el(`<div class="course-row">
      <div class="course-meta">
        <span class="badge">${course.code}</span>
        <div><b>${course.title}</b><br><small class="muted">${course.creditHours} hrs</small></div>
        <span class="badge gpa">${avg ? "Avg GPA: " + fmtGpa(avg) : "GPA: n/a"}</span>
      </div>
      <div class="form-row">
        <!-- Per-prof Plan buttons below -->
      </div>
    </div>`);
    block.append(row);

    // Professors inline
    const profWrap = el(`<div class="prof-list"></div>`);
    profs.forEach(p=>{
      const item = el(`<div class="prof-item">
        <span>${p.name}</span>
        <span><span class="badge gpa">${fmtGpa(p.gpa)} GPA</span> • ${p.rating.toFixed(1)}/5</span>
        <button class="primary" data-plan="${course.code}" data-profid="${p.id}">Plan</button>
      </div>`);
      item.querySelector("[data-plan]").onclick = (e)=>{
        const st = Store.read();
        if (!st.planned.includes(course.code)) st.planned.push(course.code);
        st.selectedProfs[course.code] = p.id;
        st.selectedSections[course.code] = p.section.sectionId;
        Store.write(st);
      };
      profWrap.append(item);
    });
    block.append(profWrap);
  });

  if (req._note) block.append(el(`<p class="muted">${req._note}</p>`));
  return block;
}

// ---------- Requirement Computation (grouped with buckets) ----------
function computeUnmetGrouped(groups, state){
  const taken = state.taken;
  const completedBuckets = state.ui?.completedBuckets || {};
  const out = {};
  groups.forEach(g=>{
    const items = [];
    g.items.forEach(node=>{
      const n = structuredClone(node);
      let unmet = true;
      if (node.type==="singleCourse"){
        unmet = !taken.includes(node.course);
        n._courses = [node.course];
      } else if (node.type==="oneOf"){
        n._courses = node.options.filter(c=>!taken.includes(c));
        unmet = n._courses.length>0;
      } else if (node.type==="multiCourse"){
        n._courses = node.courses.filter(c=>!taken.includes(c));
        unmet = n._courses.length>0;
      } else if (node.type==="creditBucket"){
        unmet = !completedBuckets[node.id];
        n._note = node.hours ? `${node.hours} hrs — mark completed when satisfied` : `Mark completed when satisfied`;
        n._courses = [];
      }
      if (unmet) items.push(n);
    });
    out[g.groupTitle] = items;
  });
  return out;
}

// ---------- Utilities for schedule ----------
function daysToArr(days){ return days.match(/[MTWRF]/g) || []; }
function timeStrToMinutes(t){ const [h,m]=t.split(":").map(Number); return h*60+m; }
function overlaps(a,b){
  const da=daysToArr(a.days), db=daysToArr(b.days);
  if (!da.some(d=>db.includes(d))) return false;
  const a1=timeStrToMinutes(a.start), a2=timeStrToMinutes(a.end);
  const b1=timeStrToMinutes(b.start), b2=timeStrToMinutes(b.end);
  return Math.max(a1,b1) < Math.min(a2,b2);
}

// ---------- Boot ----------
window.addEventListener("hashchange", ()=>render());
render();
