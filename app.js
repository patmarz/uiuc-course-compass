/* UIUC Course Compass – Plain JS Prototype
   Data is kept small & local for demo purposes.
*/

// ---------- Seed Data ----------
const Data = (() => {
  // Minimal course catalog for GIES (Accountancy BS)
  const courses = [
    // Gen Ed / Core samplers
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
    // Business Core
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
    // Accountancy major
    C("ACCY 301", "Atg Measurement & Disclosure", 3, ["accy"]),
    C("ACCY 302", "Decision Making for Atg", 3, ["accy"]),
    C("ACCY 303", "Accounting Institutions and Regulation", 3, ["accy"]),
    C("ACCY 304", "Accounting Control Systems", 3, ["accy"]),
    C("ACCY 312", "Principles of Taxation", 3, ["accy"]),
    C("ACCY 405", "Assurance and Attestation", 3, ["accy"]),
    C("ACCY 410", "Advanced Financial Reporting", 3, ["accy:oneof"]),
    C("ACCY 451", "Advanced Income Tax Problems", 3, ["accy:oneof"]),
  ];

  // Fake GPA & RMP-like ratings (sample only)
  const instructors = [
    P("p1","Dr. Smith"), P("p2","Dr. Chen"), P("p3","Prof. Patel"),
    P("p4","Dr. Johnson"), P("p5","Prof. Rivera"), P("p6","Dr. Nguyen")
  ];

  // Per-course/per-prof average GPAs & ratings (toy data)
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

  // Simple sections for scheduling (M–F; 24h "HH:MM")
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

  // Requirement model for GIES – Accountancy (trimmed but faithful to your outline)
  const reqs = [
    R("Composition I", "creditBucket", {hours: 4, tag:"comp1"}),
    R("Advanced Composition", "creditBucket", {hours: 3, tag:"advcomp"}),
    R("Humanities & the Arts", "creditBucket", {hours: 6, tag:"hum-art"}),
    R("Natural Sciences & Technology", "creditBucket", {hours: 6, tag:"nat-sci"}),
    R("Social & Behavioral Sciences", "multiCourse", {courses:["ECON 102","ECON 103"], hours:6}),
    R("Cultural Studies: Non-Western", "creditBucket", {hours:3, tag:"cs-nw"}),
    R("Cultural Studies: U.S. Minorities", "creditBucket", {hours:3, tag:"cs-us"}),
    R("Cultural Studies: Western/Comparative", "creditBucket", {hours:3, tag:"cs-west"}),
    R("Quantitative Reasoning", "rule", {need:2, mustIncludeTag:"qr1"}),
    R("Language Requirement", "creditBucket", {hours: 0, note:"3rd semester language; omitted in prototype"}),
    Group("Business Core Requirements", [
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
    Group("Accountancy Major Requirements", [
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
  function Group(title,items){ return {groupTitle:title, items}; }

  return { courses, instructors, stats, sections, reqs };
})();

// ---------- State ----------
const Store = {
  get key(){ return "uicc_state_v1"; },
  read(){
    try{ return JSON.parse(localStorage.getItem(this.key)) ?? {
      user:null, major:"GIES-ACCY", taken:[], planned:[], selectedSections:{}
    }; }catch{ return { user:null, major:"GIES-ACCY", taken:[], planned:[], selectedSections:{} }; }
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
function daysToArr(days){ // "MWF" -> ["M","W","F"]
  return days.match(/[MTWRF]/g) || [];
}
function overlaps(a,b){
  // any shared day and overlapping time?
  const da=daysToArr(a.days), db=daysToArr(b.days);
  if (!da.some(d=>db.includes(d))) return false;
  const a1=timeStrToMinutes(a.start), a2=timeStrToMinutes(a.end);
  const b1=timeStrToMinutes(b.start), b2=timeStrToMinutes(b.end);
  return Math.max(a1,b1) < Math.min(a2,b2);
}

// ---------- Router / UI ----------
const app = $("#app");
const topNav = $("#topNav");

function render(){
  const state = Store.read();
  topNav.classList.toggle("hidden", !state.user);
  $$("#topNav button").forEach(btn=>{
    btn.onclick = ()=> route(btn.dataset.link);
  });
  const hash = location.hash.replace("#","");
  const view = (!state.user) ? "welcome" : (hash || "remaining");
  route(view, true);
}

function route(view, skipPush=false){
  if (!skipPush) location.hash = view;
  const state = Store.read();
  app.innerHTML = "";
  if (!state.user) return View.welcome();
  switch(view){
    case "welcome": View.welcome(true); break;
    case "major": View.major(); break;
    case "taken": View.taken(); break;
    case "remaining": View.remaining(); break;
    case "schedule": View.schedule(); break;
    default: View.remaining();
  }
}

const View = {
  welcome(showManage=false){
    const s = Store.read();
    const panel = el(`
      <section class="panel">
        <h2>${s.user ? "Account" : "Welcome"}</h2>
        ${s.user ? `
          <p>Signed in as <b>${s.user.email}</b>.</p>
          <div class="form-row">
            <button class="primary" id="goMajor">Choose Major</button>
            <button class="ghost" id="signOut">Sign out</button>
          </div>
        ` : `
          <p>Sign in locally to personalize your plan (no server; stored on this device).</p>
          <div class="form-row">
            <input type="email" id="email" placeholder="netid@illinois.edu" />
            <input type="password" id="pw" placeholder="Password (demo only)" />
            <button class="primary" id="signin">Sign In</button>
          </div>
          <small class="muted">Demo only — credentials are not sent anywhere.</small>
        `}
      </section>
    `);
    app.append(panel);
    if (!s.user){
      $("#signin").onclick = ()=>{
        const email = $("#email").value.trim();
        if (!email) return alert("Enter an email");
        Store.write({...s, user:{email}});
        render();
      };
    } else {
      $("#signOut").onclick = ()=>{ Store.clear(); render(); };
      $("#goMajor").onclick = ()=> route("major");
    }
  },

  major(){
    const s = Store.read();
    const panel = el(`
      <section class="panel">
        <h2>Select your major</h2>
        <div class="form-row">
          <select id="majorSel">
            <option value="GIES-ACCY">GIES — Accountancy (BS)</option>
          </select>
          <button class="primary" id="saveMajor">Save</button>
        </div>
        <p class="muted">We’ll add more majors later — prototype uses Accountancy.</p>
      </section>
    `);
    app.append(panel);
    $("#majorSel").value = s.major;
    $("#saveMajor").onclick = ()=>{ Store.write({...s, major: $("#majorSel").value}); route("taken"); };
  },

  taken(){
    const s = Store.read();
    const allCourses = new Set(flattenReqCourses(Data.reqs));
    const panel = el(`
      <section class="panel">
        <h2>Mark classes you've already taken</h2>
        <div class="form-row">
          <input type="text" id="filter" placeholder="Filter (e.g., ACCY, ECON, 'calc')" />
          <button class="ghost" id="clearTaken">Clear</button>
          <button class="primary" id="save">Save</button>
        </div>
        <div class="grid cols-2" id="list"></div>
      </section>
    `);
    app.append(panel);
    const list = $("#list");
    const renderList = ()=>{
      list.innerHTML = "";
      [...allCourses]
        .map(code => Data.courses.find(c=>c.code===code))
        .filter(Boolean)
        .filter(byFilter($("#filter").value))
        .forEach(course=>{
          const row = el(`
            <div class="course-row">
              <div class="course-meta">
                <span class="badge">${course.code}</span>
                <div><b>${course.title}</b><br><small class="muted">${course.creditHours} hrs</small></div>
              </div>
              <label><input type="checkbox" data-code="${course.code}"> Taken</label>
            </div>
          `);
          $("input",row).checked = s.taken.includes(course.code);
          list.append(row);
        });
      $$('input[type="checkbox"]', list).forEach(cb=>{
        cb.onchange = ()=>{
          const next = new Set(s.taken);
          if (cb.checked) next.add(cb.dataset.code); else next.delete(cb.dataset.code);
          s.taken = [...next];
          Store.write(s);
        };
      });
    };
    $("#filter").oninput = renderList;
    $("#clearTaken").onclick = ()=>{ Store.write({...s, taken:[]}); renderList(); };
    $("#save").onclick = ()=> route("remaining");
    renderList();
  },

  remaining(){
    const s = Store.read();
    const unmet = computeUnmet(Data.reqs, s.taken);
    const panel = el(`<section class="panel"><h2>Remaining Requirements</h2></section>`);
    app.append(panel);

    unmet.forEach(block=>{
      if (block.groupTitle){
        const groupEl = el(`<div class="panel"><h3>${block.groupTitle}</h3></div>`);
        block.items.forEach(req => groupEl.append(reqCard(req, s)));
        app.append(groupEl);
      } else {
        app.append(reqCard(block, s));
      }
    });
  },

  schedule(){
    const s = Store.read();
    const panel = el(`
      <section class="panel">
        <h2>Schedule Builder</h2>
        <p>Select courses to plan. We'll choose a sample section per course and warn on conflicts.</p>
        <div class="form-row">
          <input type="text" id="addCode" placeholder="Add by code (e.g., ACCY 301)" />
          <button class="primary" id="addBtn">Add</button>
          <button class="ghost" id="clearPlan">Clear</button>
        </div>
        <div id="planList"></div>
      </section>
      <section class="panel">
        <h3>Weekly Grid</h3>
        <div id="conflicts"></div>
        <div class="schedule" id="grid"></div>
      </section>
    `);
    app.append(panel);

    $("#addBtn").onclick = ()=>{
      const code = $("#addCode").value.trim().toUpperCase();
      const course = Data.courses.find(c=>c.code===code);
      if (!course) return alert("Unknown course code");
      if (!s.planned.includes(code)) s.planned.push(code);
      // Auto-pick first section if none
      if (!s.selectedSections[code]){
        const sec = sectionsForCourse(code)[0];
        if (sec) s.selectedSections[code] = sec.sectionId;
      }
      Store.write(s); renderPlan();
    };
    $("#clearPlan").onclick = ()=>{ s.planned=[]; s.selectedSections={}; Store.write(s); renderPlan(); };

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

      // Build a 8am–6pm simple grid (labels only; contents stacked)
      const hours = Array.from({length:10},(_,i)=>8+i); // 8..17
      hours.forEach(h=>{
        grid.append(el(`<div class="cell label">${h}:00</div>`));
        for (let i=0;i<5;i++) grid.append(el(`<div class="cell" data-slot="${h}-${i}"></div>`));
      });

      // Place selected sections
      const chosen = s.planned.map(code=>{
        const pick = sectionsForCourse(code).find(sc=>sc.sectionId === s.selectedSections[code]) || sectionsForCourse(code)[0];
        return pick ? {code, ...pick} : null;
      }).filter(Boolean);

      // Conflicts
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

      // Render pills into rough day cells (not proportional — simple list)
      chosen.forEach(it=>{
        daysToArr(it.days).forEach(d=>{
          const colIndex = {M:0,T:1,W:2,R:3,F:4}[d];
          const startHour = parseInt(it.start.split(":")[0],10);
          const rowIndex = Math.max(8, startHour) - 8; // clamp
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

// ---------- Requirement Computation ----------
function flattenReqCourses(reqs){
  const out = new Set();
  const walk = (node)=>{
    if (node.groupTitle){ node.items.forEach(walk); return; }
    if (node.type === "singleCourse" && node.course) out.add(node.course);
    if (node.type === "oneOf" && Array.isArray(node.options)) node.options.forEach(c=>out.add(c));
    if (node.type === "multiCourse" && Array.isArray(node.courses)) node.courses.forEach(c=>out.add(c));
  };
  reqs.forEach(walk);
  return [...out];
}

function computeUnmet(reqs, taken){
  const res = [];
  reqs.forEach(node=>{
    if (node.groupTitle){
      const items = computeUnmet(node.items, taken);
      if (items.length) res.push({groupTitle:node.groupTitle, items});
      return;
    }
    const unmetNode = structuredClone(node);
    unmetNode._unmet = true;

    switch(node.type){
      case "singleCourse":
        unmetNode._unmet = !taken.includes(node.course);
        unmetNode._courses = [node.course];
        break;
      case "oneOf":
        unmetNode._courses = node.options.filter(c=>!taken.includes(c));
        unmetNode._unmet = unmetNode._courses.length>0;
        break;
      case "multiCourse":
        const remaining = node.courses.filter(c=>!taken.includes(c));
        unmetNode._courses = remaining;
        unmetNode._unmet = remaining.length>0;
        break;
      case "rule": // Quantitative Reasoning: need N courses, include at least one tag
        // Simple rule over our seed catalog
        const qrCandidates = Data.courses.filter(c=>c.tags.includes("qr") || c.tags.includes("qr1"));
        const takenCodes = new Set(taken);
        const left = qrCandidates.filter(c=>!takenCodes.has(c.code)).map(c=>c.code);
        unmetNode._courses = left;
        unmetNode._unmet = (qrCandidates.length - (qrCandidates.length - left.length)) < node.need;
        unmetNode._note = `Need ${node.need} QR courses (at least one QR I).`;
        break;
      case "creditBucket":
        // Prototype: we don't map every gen-ed; show placeholder guidance
        unmetNode._courses = []; // unknown; satisfied externally
        unmetNode._note = `${node.hours} hrs from approved list (prototype bucket).`;
        unmetNode._unmet = true;
        break;
    }
    if (unmetNode._unmet) res.push(unmetNode);
  });
  return res;
}

function reqCard(req, state){
  const block = el(`<section class="panel req-card"></section>`);
  const header = el(`
    <div class="req-header">
      <div class="req-title">${req.title}</div>
      <div><span class="req-chip">${req.type === "oneOf" ? "Select one" : "Requirement"}</span></div>
    </div>
  `);
  block.append(header);

  if (req._note) block.append(el(`<div class="muted">${req._note}</div>`));

  if (req._courses?.length){
    req._courses.forEach(code=>{
      const course = Data.courses.find(c=>c.code===code);
      if (!course) return;
      const avg = avgGpaForCourse(code);
      const row = el(`
        <div class="course-row">
          <div class="course-meta">
            <span class="badge">${course.code}</span>
            <div><b>${course.title}</b><br><small class="muted">${course.creditHours} hrs</small></div>
            ${gpaBadge(avg)}
          </div>
          <div class="form-row">
            <button class="ghost" data-prof="${course.code}">Professors</button>
            <button class="primary" data-add="${course.code}">Plan</button>
          </div>
        </div>
      `);
      block.append(row);
    });
  } else if (req.type === "creditBucket"){
    block.append(el(`<div class="muted">Add courses that satisfy this bucket via the university list. (Prototype does not enumerate all options.)</div>`));
  } else if (req.type === "singleCourse" && req._unmet){
    // fall back: if _courses missing, expose the single
    const code = req.course, course = Data.courses.find(c=>c.code===code);
    if (course){
      const avg = avgGpaForCourse(code);
      const row = el(`
        <div class="course-row">
          <div class="course-meta">
            <span class="badge">${course.code}</span>
            <div><b>${course.title}</b><br><small class="muted">${course.creditHours} hrs</small></div>
            ${gpaBadge(avg)}
          </div>
          <div class="form-row">
            <button class="ghost" data-prof="${course.code}">Professors</button>
            <button class="primary" data-add="${course.code}">Plan</button>
          </div>
        </div>
      `);
      block.append(row);
    }
  } else {
    block.append(el(`<div class="muted">Nothing to list for this requirement.</div>`));
  }

  // Wire buttons
  $$("[data-prof]", block).forEach(btn=>{
    btn.onclick = ()=> showProfessors(btn.dataset.prof);
  });
  $$("[data-add]", block).forEach(btn=>{
    btn.onclick = ()=>{
      const s = Store.read();
      if (!s.planned.includes(btn.dataset.add)) s.planned.push(btn.dataset.add);
      Store.write(s);
      route("schedule");
    };
  });

  return block;
}

function showProfessors(code){
  const list = profsForCourse(code);
  const modal = el(`
    <div class="modal">
      <div class="modal-card">
        <h3>${code} • Professors</h3>
        ${list.length ? `
          <table class="table">
            <thead><tr><th>Name</th><th>Avg GPA</th><th>Rating</th></tr></thead>
            <tbody>
              ${list.map(x=>`
                <tr>
                  <td>${x.prof.name}</td>
                  <td>${fmtGpa(x.avgGpa)}</td>
                  <td>${x.rating.toFixed(1)} / 5</td>
                </tr>`).join("")}
            </tbody>
          </table>
        `: `<p>No professor data in prototype.</p>`}
        <div class="form-row" style="justify-content:flex-end">
          <button class="primary" id="closeModal">Close</button>
        </div>
      </div>
    </div>
  `);
  document.body.append(modal);
  document.querySelector("#closeModal", modal).onclick = ()=> modal.remove();
  modal.addEventListener("click",(e)=>{ if (e.target===modal) modal.remove(); });
}

// ---------- Small DOM helpers ----------
function el(html){
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function byFilter(q){
  q = (q||"").toLowerCase();
  return (c)=> !q
    || c.code.toLowerCase().includes(q)
    || c.title.toLowerCase().includes(q)
    || q.split(/\\s+/).every(tok => c.title.toLowerCase().includes(tok));
}

// ---------- Boot ----------
window.addEventListener("hashchange", ()=>render());
render();
