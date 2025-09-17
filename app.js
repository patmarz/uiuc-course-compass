/* UIUC Course Compass — v1.1.1 (web-optimized, light theme, new flow) */

// ---------- Seed Data (same as v1.1.0) ----------
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

  const instructors = [
    P("p1","Dr. Smith"), P("p2","Dr. Chen"), P("p3","Prof. Patel"),
    P("p4","Dr. Johnson"), P("p5","Prof. Rivera"), P("p6","Dr. Nguyen")
  ];

  const stats = [
    S("CS 105","p1",3.42,4.2), S("CS 105","p3",3.65,4.6),
    S("STAT 100","p2",3.10,3.9), S("STAT 100","p4",3.25,4.1),
    S("ACCY 301","p5",2.95,4.3), S("ACCY 301","p6",3.12,3.8),
    S("ACCY 410","p5",3.20,4.1), S("ACCY 451","p6",3.05,4.4),
    S("CMN 101","p4",3.55,4.5), S("ECON 102","p2",3.00,3.7), S("ECON 103","p2",2.95,3.8),
    S("MATH 221","p3",2.85,4.2), S("MATH 234","p1",3.10,4.0),
    S("BADM 320","p5",3.35,4.2), S("BADM 300","p4",3.10,4.0),
    S("ACCY 405","p6",3.00,4.1)
  ];

  const sections = [
    T("CS 105","A1","MWF","10:00","10:50","p1"),
    T("CS 105","B1","TR","11:00","12:15","p3"),
    T("STAT 100","A1","MWF","12:00","12:50","p2"),
    T("ACCY 301","A1","TR","09:30","10:45","p5"),
    T("ACCY 451","A1","MWF","11:00","11:50","p6"),
    T("ACCY 410","A1","TR","14:00","15:15","p5"),
    T("CMN 101","A1","TR","08:00","09:15","p4"),
    T("ECON 102","A1","MWF","09:00","09:50","p2"),
    T("ECON 103","A1","MWF","13:00","13:50","p2"),
    T("MATH 221","A1","TR","12:30","13:45","p3"),
    T("MATH 234","A1","TR","10:30","11:45","p1"),
    T("BADM 320","A1","MWF","14:00","14:50","p5"),
    T("BADM 300","A1","TR","16:00","17:15","p4"),
    T("ACCY 405","A1","MWF","15:00","15:50","p6"),
  ];

  // Grouped requirement model for new UI
  const reqs = [
    GroupBlock("General Education", [
      R("Composition I", "creditBucket", {hours: 4, tag:"comp1"}),
      R("Advanced Composition", "creditBucket", {hours: 3, tag:"advcomp"}),
      R("Humanities & the Arts", "creditBucket", {hours: 6, tag:"hum-art"}),
      R("Natural Sciences & Technology", "creditBucket", {hours: 6, tag:"nat-sci"}),
      R("Social & Behavioral Sciences", "multiCourse", {courses:["ECON 102","ECON 103"], hours:6}),
      R("Cultural Studies: Non-Western", "creditBucket", {hours:3, tag:"cs-nw"}),
      R("Cultural Studies: U.S. Minorities", "creditBucket", {hours:3, tag:"cs-us"}),
      R("Cultural Studies: Western/Comparative", "creditBucket", {hours:3, tag:"cs-west"}),
      R("Quantitative Reasoning", "rule", {need:2, mustIncludeTag:"qr1"}),
      R("Language Requirement", "creditBucket", {hours: 0, note:"3rd semester language; omitted in prototype"})
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
  function P(id,name){ return {id,name}; }
  function S(courseId,profId,avgGpa,profRating){ return {courseId,profId,avgGpa,profRating}; }
  function T(courseId,sectionId,days,start,end,profId){ return {courseId,sectionId,days,start,end,profId}; }
  function R(title,type,props){ return {title,type,...props}; }
  function GroupBlock(title,items){ return {groupTitle:title, items}; }

  return { courses, instructors, stats, sections, reqs };
})();

// ---------- State ----------
const Store = {
  get key(){ return "uicc_state_v1_1_1"; },
  read(){
    try{ return JSON.parse(localStorage.getItem(this.key)) ?? {
      user:null, major:"GIES-ACCY", taken:[], planned:[], selectedSections:{}, ui:{openAccordions:{}}
    }; }catch{ return { user:null, major:"GIES-ACCY", taken:[], planned:[], selectedSections:{}, ui:{openAccordions:{}} }; }
  },
  write(s){ localStorage.setItem(this.key, JSON.stringify(s)); },
  clear(){ localStorage.removeItem(this.key); }
};

// ---------- Helpers ----------
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
const fmtGpa = (g) => g?.toFixed(2) ?? "—";
const avgGpaForCourse = (code) => {
  const rows = Data.stats.filter(s=>s.courseId===code);
  if (!rows.length) return null;
  return rows.reduce((a,c)=>a+c.avgGpa,0)/rows.length;
};
const profsForCourse = (code) =>
  Data.stats.filter(s=>s.courseId===code).map(s => ({
    prof: Data.instructors.find(p=>p.id===s.profId),
    avgGpa: s.avgGpa,
    rating: s.profRating
  }));
const sectionsForCourse = (code) => Data.sections.filter(x=>x.courseId===code);
function gpaBadge(g){
  if (g==null) return `<span class="badge gpa">GPA: n/a</span>`;
  const cls = g>=3.3 ? "ok" : g>=3.0 ? "warn" : "bad";
  return `<span class="badge gpa ${cls}">Avg GPA: ${fmtGpa(g)}</span>`;
}
function timeStrToMinutes(t){ const [h,m]=t.split(":").map(Number); return h*60+m; }
function daysToArr(days){ return days.match(/[MTWRF]/g) || []; }
function overlaps(a,b){
  const da=daysToArr(a.days), db=daysToArr(b.days);
  if (!da.some(d=>db.includes(d))) return false;
  const a1=timeStrToMinutes(a.start), a2=timeStrToMinutes(a.end);
  const b1=timeStrToMinutes(b.start), b2=timeStrToMinutes(b.end);
  return Math.max(a1,b1) < Math.min(a2,b2);
}
function el(html){ const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function byFilter(q){
  q = (q||"").toLowerCase();
  return (c)=> !q || c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || q.split(/\s+/).every(tok => c.title.toLowerCase().includes(tok));
}

// ---------- Router ----------
const app = $("#app");
const topNav = $("#topNav");

function render(){
  const state = Store.read();
  topNav.classList.toggle("hidden", !state.user);
  $$("#topNav button").forEach(btn=> btn.onclick = ()=> route(btn.dataset.link));
  const hash = location.hash.replace("#","");
  const view = (!state.user) ? "account" : (hash || "completed");
  route(view, true);
}

function route(view, skip=false){
  if (!skip) location.hash = view;
  const s = Store.read();
  app.innerHTML = "";
  switch(view){
    case "account": View.account(); break;
    case "completed": if(!s.user) { View.account(); } else { View.completed(); } break;
    case "remaining": if(!s.user) { View.account(); } else { View.remaining(); } break;
    case "schedule": if(!s.user) { View.account(); } else { View.schedule(); } break;
    default: View.completed();
  }
}

// ---------- Views ----------
const View = {
  account(){
    const s = Store.read();
    const panel = el(`
      <section class="panel">
        <h2>${s.user ? "Account" : "Welcome"}</h2>
        ${s.user ? `
          <p>Signed in as <b>${s.user.email}</b>.</p>
          <div class="form-row">
            <button class="primary" id="goCompleted">Go to Completed</button>
            <button class="ghost" id="signOut">Sign out</button>
          </div>
        ` : `
          <p>Sign in locally (demo only; stored on this device).</p>
          <div class="form-row">
            <input type="email" id="email" placeholder="netid@illinois.edu" />
            <input type="password" id="pw" placeholder="Password (demo only)" />
            <button class="primary" id="signin">Sign In</button>
          </div>
        `}
      </section>
    `);
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

    // Major selector
    const major = el(`<div class="form-row">
      <label>Major:</label>
      <select id="majorSel"><option value="GIES-ACCY">GIES — Accountancy (BS)</option></select>
      <button class="ghost" id="toRemaining">View what's left →</button>
    </div>`);
    container.append(major);
    $("#majorSel",major).value = s.major;
    $("#majorSel",major).onchange = (e)=>{ Store.write({...s, major:e.target.value}); render(); };
    $("#toRemaining",major).onclick = ()=> route("remaining");

    // Three accordions (Gen Ed, Core, Accy)
    Data.reqs.forEach((group, idx)=>{
      const acc = accordion(group.groupTitle, () => {
        const body = el(`<div></div>`);
        group.items.forEach(item=>{
          body.append(completedRow(item, s));
        });
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

    const allUnmet = computeUnmetGrouped(Data.reqs, s.taken);
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

    // Sticky summary-like panel
    const plannedCredits = s.planned.map(c => Data.courses.find(x=>x.code===c)?.creditHours||0).reduce((a,b)=>a+b,0);
    const summary = el(`<div class="form-row">
      <span class="badge">${remainingCount} requirements remaining</span>
      <span class="badge">Planned credits: ${plannedCredits}</span>
      <button class="primary" id="goSchedule">Open Schedule</button>
    </div>`);
    container.append(summary);
    $("#goSchedule",summary).onclick = ()=> route("schedule");

    app.append(container);
  },

  schedule(){
    const s = Store.read();
    const panel = el(`
      <section class="panel">
        <h2>Schedule</h2>
        <div id="planList"></div>
      </section>
      <section class="panel">
        <h3>Weekly Grid</h3>
        <div id="conflicts"></div>
        <div class="schedule" id="grid"></div>
      </section>
    `);
    app.append(panel);

    function renderPlan(){
      const planList = $("#planList");
      planList.innerHTML = "";
      s.planned.forEach(code=>{
        const course = Data.courses.find(c=>c.code===code);
        const secs = sectionsForCourse(code);
        const sel = s.selectedSections[code] ?? (secs[0]?.sectionId ?? "");
        const row = el(`
          <div class="course-row">
            <div class="course-meta">
              <span class="badge">${course.code}</span>
              <div><b>${course.title}</b><br><small class="muted">${course.creditHours} hrs</small></div>
            </div>
            <div class="form-row">
              <select data-code="${code}">
                ${secs.map(sc=>`<option value="${sc.sectionId}">${sc.sectionId} • ${sc.days} ${sc.start}-${sc.end}</option>`).join("")}
              </select>
              <button class="ghost" data-remove="${code}">Remove</button>
            </div>
          </div>
        `);
        $("select",row).value = sel;
        $("select",row).onchange = (e)=>{ s.selectedSections[code]=e.target.value; Store.write(s); drawGrid(); };
        $('[data-remove]',row).onclick = (e)=>{
          const code = e.currentTarget.dataset.remove;
          s.planned = s.planned.filter(x=>x!==code);
          delete s.selectedSections[code];
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
        const pick = sectionsForCourse(code).find(sc=>sc.sectionId === s.selectedSections[code]) || sectionsForCourse(code)[0];
        return pick ? {code, ...pick} : null;
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
          const colIndex = {M:0,T:1,W:2,R:3,F:4}[d];
          const startHour = parseInt(it.start.split(":")[0],10);
          const rowIndex = Math.max(8, startHour) - 8;
          const slot = document.querySelector(`.cell[data-slot="${8+rowIndex}-${colIndex}"]`);
          if (slot){
            const pill = el(`<div class="course-pill ${conflicts.some(([a,b])=>a.code===it.code||b.code===it.code) ? 'conflict' : ''}">
              <b>${it.code}</b> ${it.sectionId} • ${it.days} ${it.start}-${it.end}
            </div>`);
            slot.append(pill);
          }
        });
      });
    }

    renderPlan();
  }
};

// ---------- UI Builders ----------
function accordion(title, bodyBuilder, isOpen=false){
  const id = `acc-${title.replace(/\\s+/g,'-').toLowerCase()}`;
  const acc = el(`<div class="accordion" id="${id}">
    <div class="acc-head"><div class="acc-title">${title}</div><div class="chev">▾</div></div>
    <div class="acc-body"></div>
  </div>`);
  const body = $(".acc-body", acc);
  const head = $(".acc-head", acc);
  const chev = $(".chev", acc);

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
  // Flatten into simple checkboxes (and sub-options for oneOf)
  const wrap = el(`<div></div>`);
  if (item.type === "singleCourse"){
    const c = Data.courses.find(x=>x.code===item.course);
    wrap.append(checkRow(c, s));
  } else if (item.type === "oneOf"){
    const sub = el(`<div class="accordion">
      <div class="acc-head"><div class="acc-title">${item.title} — choose one</div><div class="chev">▾</div></div>
      <div class="acc-body"></div>
    </div>`);
    const body = $(".acc-body", sub);
    $(".acc-head", sub).onclick = ()=> subToggle();
    function subToggle(){
      const open = !body.classList.contains("open");
      body.classList.toggle("open", open);
      $(".chev", sub).style.transform = open ? "rotate(180deg)" : "rotate(0)";
      if (open && !body.dataset.built){
        item.options.forEach(code => body.append(checkRow(Data.courses.find(c=>c.code===code), s)));
        body.dataset.built="1";
      }
    }
    wrap.append(sub);
  } else if (item.type === "multiCourse"){
    item.courses.forEach(code => wrap.append(checkRow(Data.courses.find(c=>c.code===code), s)));
  } else {
    // creditBucket / rule -> show note only
    const note = item.title + (item.hours ? ` — ${item.hours} hrs` : "");
    wrap.append(el(`<p class="muted">${note}</p>`));
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
  const cb = $("input", row);
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
    const avg = avgGpaForCourse(code);
    const row = el(`<div class="course-row">
      <div class="course-meta">
        <span class="badge">${course.code}</span>
        <div><b>${course.title}</b><br><small class="muted">${course.creditHours} hrs</small></div>
        ${gpaBadge(avg)}
      </div>
      <div class="form-row">
        <button class="prof-toggle" data-prof="${course.code}">Professors ▾</button>
        <button class="primary" data-add="${course.code}">Plan</button>
      </div>
    </div>`);

    // inline professor list container
    const profWrap = el(`<div class="prof-list hidden"></div>`);
    row.append(profWrap);

    $("[data-add]", row).onclick = ()=>{
      const st = Store.read();
      if (!st.planned.includes(code)) st.planned.push(code);
      Store.write(st);
    };

    $("[data-prof]", row).onclick = (e)=>{
      const open = profWrap.classList.contains("hidden");
      if (open){
        // build list
        if (!profWrap.dataset.built){
          const list = profsForCourse(code);
          if (!list.length){ profWrap.append(el(`<div class="muted">No professor data in prototype.</div>`)); }
          list.forEach(x=>{
            const li = el(`<div class="prof-item"><span>${x.prof.name}</span><span>${fmtGpa(x.avgGpa)} GPA • ${x.rating.toFixed(1)}/5</span></div>`);
            profWrap.append(li);
          });
          profWrap.dataset.built="1";
        }
        profWrap.classList.remove("hidden");
        e.currentTarget.textContent = "Professors ▴";
      } else {
        profWrap.classList.add("hidden");
        e.currentTarget.textContent = "Professors ▾";
      }
    };

    block.append(row);
  });

  if (req._note) block.append(el(`<p class="muted">${req._note}</p>`));
  return block;
}

// ---------- Requirement Computation (grouped) ----------
function computeUnmetGrouped(groups, taken){
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
      } else if (node.type==="rule"){
        const qrCandidates = Data.courses.filter(c=>c.tags.includes("qr") || c.tags.includes("qr1"));
        const left = qrCandidates.filter(c=>!taken.includes(c.code)).map(c=>c.code);
        n._courses = left;
        n._note = `Need ${node.need} QR courses (at least one QR I).`;
        unmet = left.length>0;
      } else if (node.type==="creditBucket"){
        n._note = `${node.hours} hrs from approved list (prototype bucket).`;
        n._courses = [];
        unmet = true;
      }
      if (unmet) items.push(n);
    });
    out[g.groupTitle] = items;
  });
  return out;
}

// ---------- Boot ----------
window.addEventListener("hashchange", ()=>render());
render();
