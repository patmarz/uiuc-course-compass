
// Basic micro helpers
const $ = (sel, el=document) => el.querySelector(sel);
const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));
const el = (html) => { const t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstElementChild; };
const fmtGpa = (n)=> (Math.round(n*100)/100).toFixed(2);

// Data seeds (demo)
const Data = {
  majors: [{id:'gies_accy', name:'Gies — Accountancy (BS)'}],
  // minimal course catalog for demo
  courses: [
    {code:'ACCY 201', title:'Accounting and Accountancy I', creditHours:3},
    {code:'ACCY 202', title:'Accounting and Accountancy II', creditHours:3},
    {code:'BUS 101', title:'Professional Responsibility in Business', creditHours:3},
    {code:'BUS 201', title:'Business Dynamics', creditHours:3},
    {code:'BUS 301', title:'Business in Action', creditHours:3},
    {code:'BUS 401', title:'Crafting Your Purpose in Business', creditHours:3},
    {code:'BADM 210', title:'Business Analytics I', creditHours:3},
    {code:'BADM 211', title:'Business Analytics II', creditHours:3},
    {code:'BADM 275', title:'Intro to Operations and Supply Chain', creditHours:3},
    {code:'BADM 300', title:'The Legal Environment of Business', creditHours:3},
    {code:'BADM 310', title:'Mgmt and Organizational Behavior', creditHours:3},
    {code:'BADM 320', title:'Principles of Marketing', creditHours:3},
    {code:'BADM 449', title:'Business Policy and Strategy', creditHours:3},
    {code:'CMN 101', title:'Public Speaking', creditHours:3},
    {code:'CS 105', title:'Intro Computing: Non-Tech', creditHours:3},
    {code:'ECON 102', title:'Microeconomic Principles', creditHours:3},
    {code:'ECON 103', title:'Macroeconomic Principles', creditHours:3},
    {code:'FIN 221', title:'Corporate Finance', creditHours:3},
    // Math options
    {code:'STAT 100', title:'Statistics', creditHours:3},
    {code:'MATH 115', title:'Preparation for Calculus', creditHours:3},
    {code:'MATH 220', title:'Calculus', creditHours:3},
    {code:'MATH 221', title:'Calculus I', creditHours:4},
    {code:'MATH 231', title:'Calculus II', creditHours:3},
    {code:'MATH 234', title:'Calculus for Business I', creditHours:3},
    // ACCY major
    {code:'ACCY 301', title:'Atg Measurement & Disclosure', creditHours:3},
    {code:'ACCY 302', title:'Decision Making for Atg', creditHours:3},
    {code:'ACCY 303', title:'Accounting Institutions & Regulation', creditHours:3},
    {code:'ACCY 304', title:'Accounting Control Systems', creditHours:3},
    {code:'ACCY 312', title:'Principles of Taxation', creditHours:3},
    {code:'ACCY 405', title:'Assurance and Attestation', creditHours:3},
    {code:'ACCY 410', title:'Advanced Financial Reporting', creditHours:3},
    {code:'ACCY 451', title:'Advanced Income Tax Problems', creditHours:3},
  ]
};

// Requirements tree
const R=(title,type,opts={})=>({title,type,...opts});
const reqs = [
  R('General Education','group',{items:[
    R('Composition I','bucket',{hours:4,id:'gen_comp_i'}),
    R('Advanced Composition','bucket',{hours:3,id:'gen_adv_comp'}),
    R('Humanities & the Arts','bucket',{hours:6,id:'gen_hum'}),
    R('Natural Sciences & Technology','bucket',{hours:6,id:'gen_nat'}),
    // Social & Behavioral Sciences: bucket; ECON 102/103 shown only in Business Core
    R('Social & Behavioral Sciences','bucket',{hours:6,id:'gen_socsci'}),
    R('Cultural Studies: Non-Western','bucket',{hours:3,id:'gen_cult_nw'}),
    R('Cultural Studies: U.S. Minorities','bucket',{hours:3,id:'gen_cult_us'}),
    R('Cultural Studies: Western/Comparative','bucket',{hours:3,id:'gen_cult_wc'}),
    R('Quantitative Reasoning','bucket',{hours:6,id:'gen_qr'}),
    R('Language Requirement','bucket',{hours:12,id:'gen_lang'}),
  ]}),
  R('Business Core Requirements','group',{items:[
    R('ACCY 201','course',{course:'ACCY 201'}),
    R('ACCY 202','course',{course:'ACCY 202'}),
    R('BUS 101','course',{course:'BUS 101'}),
    R('BUS 201','course',{course:'BUS 201'}),
    R('BUS 301','course',{course:'BUS 301'}),
    R('BUS 401','course',{course:'BUS 401'}),
    R('BADM 210','course',{course:'BADM 210'}),
    R('BADM 211','course',{course:'BADM 211'}),
    R('BADM 275','course',{course:'BADM 275'}),
    R('BADM 300','course',{course:'BADM 300'}),
    R('BADM 310','course',{course:'BADM 310'}),
    R('BADM 320','course',{course:'BADM 320'}),
    R('CMN 101','course',{course:'CMN 101'}),
    R('CS 105','course',{course:'CS 105'}),
    R('ECON 102','course',{course:'ECON 102'}),
    R('ECON 103','course',{course:'ECON 103'}),
    R('FIN 221','course',{course:'FIN 221'}),
    R('Business Core Math (choose one)','oneOf',{options:['STAT 100','MATH 115','MATH 220','MATH 221','MATH 231','MATH 234']})
  ]}),
  R('Accountancy, BS Major Requirements','group',{items:[
    R('ACCY 301','course',{course:'ACCY 301'}),
    R('ACCY 302','course',{course:'ACCY 302'}),
    R('ACCY 303','course',{course:'ACCY 303'}),
    R('ACCY 304','course',{course:'ACCY 304'}),
    R('ACCY 312','course',{course:'ACCY 312'}),
    R('ACCY 405','course',{course:'ACCY 405'}),
    R('Select one of the following','oneOf',{options:['ACCY 410','ACCY 451']})
  ]})
];

// State
const Store = {
  read(){
    try { return JSON.parse(localStorage.getItem('uicc')||'{}'); } catch(e){ return {}; }
  },
  write(s){ localStorage.setItem('uicc', JSON.stringify(s)); }
};
function initState(){
  const s=Store.read();
  return Object.assign({
    major:'gies_accy',
    taken:[],                 // completed courses (codes)
    buckets:{},               // bucketId -> true
    planned:[],               // planned course codes
    selectedProfs:{},         // course -> profId
    selectedSections:{}       // course -> sectionId
  }, s);
}

// Professor generator (stable pseudo-random by code)
function hashStr(str){let h=0;for(let i=0;i<str.length;i++){h=(h<<5)-h+str.charCodeAt(i);h|=0;}return Math.abs(h);}
function randFrom(seed,min,max){const x=Math.sin(seed)*10000; const r=x-Math.floor(x); return min + r*(max-min);}
function generateProfsForCourse(code){
  const seed=hashStr(code);
  const names=[
    'Alex Kim','Jordan Patel','Taylor Nguyen','Morgan Rivera','Casey Chen',
    'Samir Shah','Avery Brooks','Jamie Cohen','Riley Thompson','Parker Li'
  ];
  const profs=[];
  for(let i=0;i<3;i++){
    const s=seed+i*17;
    const gpa = Math.max(2.3, Math.min(3.9, 3.0 + (randFrom(s, -0.5, 0.5))));
    const rating = Math.max(2.8, Math.min(4.9, randFrom(s+3, 3.2, 4.8)));
    const start = Math.floor(randFrom(s+9,8,15)); // 8am-3pm hour
    const minutes = randFrom(s+11,0,1)>0.5?'00':'30';
    const endHour = Math.min(start+1, 20);
    const days = randFrom(s+15,0,1)>0.5?'MWF':'TR';
    profs.push({
      id:`${code.replace(' ','_')}_${i}`,
      name: names[(seed+i)%names.length],
      gpa, rating,
      section:{sectionId:`${code}-${i}`, days, start:`${start}:${minutes}`, end:`${endHour}:${minutes}`}
    });
  }
  return profs;
}

// Compute unmet requirements with oneOf properly handled
function computeUnmet(reqTree, taken, buckets){
  const out=[];
  function walk(node){
    if(node.type==='group'){
      const grp={title:node.title, type:'group', items:[]};
      node.items.forEach(it=>{
        const sub=walk(it);
        if(sub) grp.items.push(sub);
      });
      // hide group if nothing inside
      if(grp.items.length>0) return grp; else return null;
    } else if(node.type==='course'){
      const code=node.course;
      if(!taken.includes(code)){
        const n={title:node.title, type:'course', course:code};
        return n;
      } else return null;
    } else if(node.type==='bucket'){
      const id=node.id;
      if(!buckets[id]){
        return {title:`${node.title} — ${node.hours} hrs`, type:'bucket', id};
      } else return null;
    } else if(node.type==='oneOf'){
      const any = node.options.some(c=>taken.includes(c));
      if(any) return null;
      return {title:node.title, type:'oneOf', options:node.options};
    }
  }
  const res = walk(reqTree);
  if(res) out.push(res);
  return out[0]; // root group
}

function buildRemainingTree(taken,buckets){
  const root={title:'Root',type:'group',items:reqs};
  const list=[];
  reqs.forEach(group=>{
    const g = computeUnmet(group,taken,buckets);
    if(g) list.push(g);
  });
  return list;
}

// Rendering
const View={
  completed(){
    const s=initState(); const app=$("#app"); app.innerHTML='';
    const container=el('<div class="container"></div>');
    container.append(el('<h2 class="section-title">Mark completed requirements</h2>'));
    // Gen Ed buckets
    const gen = reqs[0];
    const genCard = el('<div class="card"></div>');
    genCard.append(el(`<div class="help">General Education buckets — mark as completed when satisfied.</div>`));
    gen.items.forEach(item=>{
      const row=el(`<div class="form-row"><div>${item.title}</div>
        <label><input type="checkbox" data-bucket="${item.id}"> Completed</label></div>`);
      const cb = $("input",row);
      cb.checked = !!s.buckets[item.id];
      cb.onchange = ()=>{ const st=initState(); st.buckets[item.id]=cb.checked; Store.write(st); };
      genCard.append(row);
    });
    container.append(genCard);
    // Business Core + Major courses (checkboxes)
    const rest = [reqs[1], reqs[2]];
    rest.forEach(group=>{
      const card=el('<div class="card"></div>');
      card.append(el(`<h3 class="section-title">${group.title}</h3>`));
      group.items.forEach(item=>{
        if(item.type==='course'){
          const c = Data.courses.find(x=>x.code===item.course);
          const row=el(`<div class="form-row"><div><span class="badge">${c.code}</span> ${c.title}</div>
            <label><input type="checkbox" data-code="${c.code}"> Completed</label></div>`);
          const cb=$("input",row);
          cb.checked = s.taken.includes(c.code);
          cb.onchange = ()=>{
            const st=initState();
            if(cb.checked){ if(!st.taken.includes(c.code)) st.taken.push(c.code); }
            else { st.taken = st.taken.filter(x=>x!==c.code); }
            Store.write(st);
          };
          card.append(row);
        } else if(item.type==='oneOf'){
          const sub = el('<div class="accordion"><div class="acc-head">Business Core Math — choose one ▾</div><div class="acc-body"></div></div>');
          const body = $(".acc-body",sub);
          item.options.forEach(code=>{
            const c=Data.courses.find(x=>x.code===code);
            const row=el(`<div class="form-row"><div><span class="badge">${c.code}</span> ${c.title}</div>
              <label><input type="checkbox" data-code="${c.code}"> Completed</label></div>`);
            const cb=$("input",row);
            cb.checked = s.taken.includes(code);
            cb.onchange = ()=>{
              const st=initState();
              if(cb.checked){
                // radio behavior: uncheck others
                item.options.forEach(o=>{ if(o!==code) st.taken = st.taken.filter(x=>x!==o); });
                if(!st.taken.includes(code)) st.taken.push(code);
              }else{
                st.taken = st.taken.filter(x=>x!==code);
              }
              Store.write(st);
              // reflect UI
              $$(".acc-body input",sub).forEach(inp=>{
                const cc=inp.getAttribute('data-code');
                inp.checked = st.taken.includes(cc);
              });
            };
            body.append(row);
          });
          card.append(sub);
        } else {
          // ignore buckets here
        }
      });
      container.append(card);
    });
    // CTA
    const cta = el('<div class="form-row" style="justify-content:flex-end"></div>');
    const btn = el('<button class="primary">View what’s left →</button>');
    btn.onclick = ()=> route('remaining');
    cta.append(btn);
    container.append(cta);
    app.append(container);
  },
  remaining(){
    const s=initState(); const app=$("#app"); app.innerHTML='';
    const container=el('<div class="container"></div>');
    container.append(el('<h2 class="section-title">What you still need</h2>'));
    const tree = buildRemainingTree(s.taken, s.buckets);
    tree.forEach(group=>{
      const card=el('<div class="card"></div>');
      card.append(el(`<h3 class="section-title">${group.title}</h3>`));
      group.items.forEach(item=>{
        if(item.type==='course'){
          card.append(remainingRowCourse(item,s));
        } else if(item.type==='bucket'){
          const row=el(`<div class="course-row"><div class="course-meta">
            <span class="badge">Bucket</span>
            <div><span class="course-title">${item.title}</span><br><small class="muted">Mark completed on the Completed tab</small></div>
          </div><div class="course-right"></div></div>`);
          card.append(row);
        } else if(item.type==='oneOf'){
          const wrap=el('<div></div>');
          item.options.forEach(code=>{
            const course={type:'course',course:code,title:code};
            wrap.append(remainingRowCourse(course,s));
          });
          card.append(wrap);
        }
      });
      container.append(card);
    });
    app.append(container);
  },
  schedule(){
    const s=initState(); const app=$("#app"); app.innerHTML='';
    const container=el('<div class="container"></div>');
    container.append(el('<h2 class="section-title">Planned Schedule (simple list)</h2>'));
    const list = el('<div class="card list" id="planList"></div>');
    if(s.planned.length===0){
      list.append(el('<div class="help">No courses planned yet. Go to <b>What’s Left</b> and press <b>Plan</b> on a course.</div>'));
    } else {
      s.planned.forEach(code=>{
        const course = Data.courses.find(c=>c.code===code);
        const profId = s.selectedProfs[code];
        const profs = generateProfsForCourse(code);
        const prof = profs.find(p=>p.id===profId) || profs[0];
        const row = el(`<div class="kv"><div><span class="badge">${course.code}</span> ${course.title}<br><span class="muted">${prof.name} • ${prof.section.days} ${prof.section.start}-${prof.section.end}</span></div>
        <div><button class="primary" data-remove="${code}">Remove</button></div></div>`);
        $("button",row).onclick = ()=>{
          const st=initState();
          st.planned = st.planned.filter(x=>x!==code);
          delete st.selectedProfs[code];
          delete st.selectedSections[code];
          Store.write(st);
          route('schedule');
        };
        list.append(row);
      });
    }
    container.append(list);
    app.append(container);
  }
};

function remainingRowCourse(item,s){
  const course = Data.courses.find(c=>c.code===item.course);
  const profs = generateProfsForCourse(course.code);
  const avg = profs.reduce((a,p)=>a+p.gpa,0)/profs.length;
  const row=el(`<div><div class="course-row">
    <div class="course-meta">
      <span class="badge">${course.code}</span>
      <div><span class="course-title">${course.title}</span><br><small class="muted">${course.creditHours} hrs</small></div>
    </div>
    <div class="course-right"><span class="badge gpa">Avg GPA: ${fmtGpa(avg)}</span></div>
  </div></div>`);
  const wrap = el('<div class="prof-list"></div>');
  profs.forEach(p=>{
    const delta=p.gpa-avg;
    const cls = delta>0.15?'green':(delta<-0.15?'red':'yellow');
    const card = el(`<div class="prof-card">
      <div class="muted">${p.name}</div>
      <div><span class="prof-chip ${cls}">${fmtGpa(p.gpa)} GPA ${delta>=0?'▲':'▼'} ${Math.abs(delta).toFixed(2)}</span> • <span class="muted">${p.rating.toFixed(1)}/5</span></div>
      <div><button class="primary" data-plan="${course.code}" data-profid="${p.id}">Plan</button></div>
      <div class="muted" style="grid-column:1/-1">${p.section.days} ${p.section.start}-${p.section.end}</div>
    </div>`);
    $("button",card).onclick = ()=>{
      const st=initState();
      if(!st.planned.includes(course.code)) st.planned.push(course.code);
      st.selectedProfs[course.code]=p.id;
      st.selectedSections[course.code]=p.section.sectionId;
      Store.write(st);
      route('schedule');
    };
    wrap.append(card);
  });
  row.append(wrap);
  return row;
}

// Router
function activateTab(name){
  $$("#header .tab").forEach(t=>t.classList.remove('active'));
}
function route(name){
  $$(".tab").forEach(b=>b.classList.remove('active'));
  if(name==='completed'){ $("#tab-completed").classList.add('active'); View.completed(); }
  else if(name==='remaining'){ $("#tab-remaining").classList.add('active'); View.remaining(); }
  else { $("#tab-schedule").classList.add('active'); View.schedule(); }
}

// Attach events
window.addEventListener('DOMContentLoaded',()=>{
  $("#tab-completed").onclick = ()=> route('completed');
  $("#tab-remaining").onclick = ()=> route('remaining');
  $("#tab-schedule").onclick = ()=> route('schedule');
  // default view
  route('completed');
});

// PWA SW register (optional)
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('service-worker.js').catch(()=>{});
  });
}
