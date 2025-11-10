/* v1.2.3 app.js (subject-sharded GPA) */
let TESTIMONIALS={}, TAGS={}; // optional
const GPA_CACHE = {}; // subject -> { 'ACCY 201': {course_avg_gpa, professors:{name:{avg_gpa,n}} } }

function $(sel, root=document){ return root.querySelector(sel); }
function el(tag, attrs={}, ...kids){
  const n = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v])=>{
    if(k==='class') n.className=v; else if(k==='html') n.innerHTML=v; else n.setAttribute(k,v);
  });
  kids.flat().forEach(k=> n.append(k));
  return n;
}
function subjectOf(code){ return (code.split(' ')[0]||'').trim(); }
async function ensureSubjectLoaded(subj){
  if(!subj) return {};
  if(GPA_CACHE[subj]) return GPA_CACHE[subj];
  try{
    const res = await fetch(`data/gpa/${subj}.json?v=123`);
    if(!res.ok) throw new Error('HTTP '+res.status);
    const json = await res.json();
    GPA_CACHE[subj] = json || {};
    return GPA_CACHE[subj];
  }catch(e){
    GPA_CACHE[subj] = {};
    return GPA_CACHE[subj];
  }
}
function getCourseGpaRecord(code){
  const subj = subjectOf(code);
  return (GPA_CACHE[subj]||{})[code];
}
function buildRealProfsFromRecord(code, rec){
  const out=[];
  if(!rec || !rec.professors) return out;
  const entries = Object.entries(rec.professors).sort((a,b)=> (b[1]?.n||0) - (a[1]?.n||0));
  entries.forEach(([name,info],i)=>{
    out.push({
      id:`${code.replace(' ','_')}_real_${i}`,
      name,
      gpa: info.avg_gpa,
      rating: 4.2,
      section:{sectionId:`${code}-R${i}`,days:(i%2?'TR':'MWF'),start:(i%2?'13:00':'09:00'),end:(i%2?'14:15':'09:50')},
      n: info.n||0
    });
  });
  return out;
}
async function getProfsForCourseAsync(code){
  await ensureSubjectLoaded(subjectOf(code));
  const rec = getCourseGpaRecord(code);
  const real = buildRealProfsFromRecord(code, rec);
  if(real.length) return real;
  return generateProfsForCourse(code); // fallback
}
function computeCourseAvgFromRecord(rec){
  if(rec?.course_avg_gpa!=null) return rec.course_avg_gpa;
  if(rec?.professors){
    const entries = Object.values(rec.professors);
    const numer = entries.reduce((a,p)=> a+(p.avg_gpa*(p.n||0)), 0);
    const denom = entries.reduce((a,p)=> a+(p.n||0), 0);
    if(denom) return numer/denom;
  }
  return null;
}

/*********** DEMO DATA: majors/courses ***********/
const Data = {
  user:{name:'Guest'},
  major:'Accountancy (Gies)',
  completed:[],
  planned:[],
  courses:[
    {code:'ACCY 201', title:'Accounting and Accountancy I', hours:3, group:'Business Core'},
    {code:'ACCY 202', title:'Accounting and Accountancy II', hours:3, group:'Business Core'},
    {code:'BUS 101',  title:'Professional Responsibility in Business', hours:3, group:'Business Core'},
    {code:'BUS 201',  title:'Business Dynamics', hours:3, group:'Business Core'},
    {code:'BUS 301',  title:'Business in Action', hours:3, group:'Business Core'},
    {code:'BUS 401',  title:'Crafting Your Purpose in Business', hours:3, group:'Business Core'},
    {code:'BADM 210', title:'Business Analytics I', hours:3, group:'Business Core'},
    {code:'BADM 211', title:'Business Analytics II', hours:3, group:'Business Core'},
    {code:'BADM 275', title:'Intro to Operations & Supply Chain', hours:3, group:'Business Core'},
    {code:'BADM 300', title:'Legal Environment of Business', hours:3, group:'Business Core'},
    {code:'BADM 310', title:'Mgmt and Organizational Behavior', hours:3, group:'Business Core'},
    {code:'BADM 320', title:'Principles of Marketing', hours:3, group:'Business Core'},
    {code:'BADM 449', title:'Business Policy and Strategy', hours:3, group:'Business Core'},
    {code:'CMN 101',  title:'Public Speaking', hours:3, group:'Business Core'},
    {code:'CS 105',   title:'Intro Computing: Non-Tech', hours:3, group:'Business Core'},
    {code:'ECON 102', title:'Microeconomic Principles', hours:3, group:'Business Core'},
    {code:'ECON 103', title:'Macroeconomic Principles', hours:3, group:'Business Core'},
    {code:'FIN 221',  title:'Corporate Finance', hours:3, group:'Business Core'},

    {code:'STAT 100', title:'Statistics', hours:3, group:'Business Core Math', choiceKey:'BUS_MATH',
     choices:['MATH 115','MATH 220','MATH 221','MATH 231','MATH 234','STAT 100']},

    {code:'ACCY 301', title:'Atg Measurement & Disclosure', hours:3, group:'Accountancy Major'},
    {code:'ACCY 302', title:'Decision Making for Atg', hours:3, group:'Accountancy Major'},
    {code:'ACCY 303', title:'Accounting Institutions and Regulation', hours:3, group:'Accountancy Major'},
    {code:'ACCY 304', title:'Accounting Control Systems', hours:3, group:'Accountancy Major'},
    {code:'ACCY 312', title:'Principles of Taxation', hours:3, group:'Accountancy Major'},
    {code:'ACCY 405', title:'Assurance and Attestation', hours:3, group:'Accountancy Major'},

    {code:'ACCY 410', title:'Advanced Financial Reporting', hours:3, group:'Accountancy Major (Choose One)', choiceKey:'ACCY_CAP', choices:['ACCY 410','ACCY 451']},
    {code:'ACCY 451', title:'Advanced Income Tax Problems', hours:3, group:'Accountancy Major (Choose One)', choiceKey:'ACCY_CAP', choices:['ACCY 410','ACCY 451']}
  ]
};

/*********** helpers ***********/
function generateProfsForCourse(code){
  const base = ['Alex Kim','Jordan Patel','Taylor Nguyen','Riley Martinez','Avery Davis','Parker Brown'];
  return base.slice(0,2).map((name,i)=>({
    id:`${code.replace(' ','_')}_${i}`,
    name, gpa: 3.1 + (i*0.2), rating: 4.2 - (i*0.3),
    section:{sectionId:`${code}-S${i}`, days:(i%2?'TR':'MWF'), start:(i%2?'13:00':'09:00'), end:(i%2?'14:15':'09:50')}
  }));
}
function formatGPA(x){ return (Math.round(x*100)/100).toFixed(2); }
function colorForDelta(delta){ if(delta>=0.1) return 'green'; if(delta<=-0.1) return 'red'; return 'yellow'; }
function isPlanned(code, name){ return Data.planned.some(p=> p.code===code && p.prof===name); }
function togglePlan(course, prof){
  const i = Data.planned.findIndex(p=> p.code===course.code && p.prof===prof.name);
  if(i>=0) Data.planned.splice(i,1);
  else Data.planned.push({code:course.code, title:course.title, hours:course.hours, prof:prof.name, section:prof.section});
  renderSchedulePill();
}

/*********** UI ***********/
function appShell(){ const c = el('div',{class:'container'}); return c; }
function navActivate(id){ document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active')); $(id).classList.add('active'); }

async function remaining(){
  const container = appShell();
  const groups = [...new Set(Data.courses.map(c=>c.group))];
  for(const g of groups){
    const card = el('div',{class:'card'}); card.append(el('h3',{class:'section-title',html:g}));
    const list = el('div',{class:'list'});
    const items = Data.courses.filter(c=>c.group===g);
    for(const item of items){
      list.append(await remainingRowCourse(item));
    }
    card.append(list); container.append(card);
  }
  return container;
}

async function remainingRowCourse(course){
  const profs = await getProfsForCourseAsync(course.code);
  const rec = getCourseGpaRecord(course.code);
  const realAvg = computeCourseAvgFromRecord(rec);
  let avg = realAvg ?? (profs.reduce((a,p)=>a+p.gpa,0)/Math.max(1,profs.length));

  const row = el('div',{class:'course-row'+(Data.planned.some(p=>p.code===course.code)?' planned':'')});
  row.append(el('div',{class:'course-meta'},
    el('div',{class:'course-title',html:`${course.code} — ${course.title}`})
  ));
  const right = el('div',{class:'course-right'},
    el('span',{class:'badge gpa',html:`Avg GPA: ${formatGPA(avg)}`})
  );
  row.append(right);

  // professor list
  const plist = el('div',{class:'prof-list'});
  profs.forEach(p=>{
    const delta = p.gpa-avg;
    const chip = el('span',{class:`prof-chip ${colorForDelta(delta)}`,html:`${formatGPA(p.gpa)} ${p.n?`• n=${p.n}`:''}`});
    const btn = el('button',{class:'primary'}, isPlanned(course,p)?'Planned':'Plan');
    btn.addEventListener('click',()=>{ togglePlan(course,p); btn.textContent = isPlanned(course,p)?'Planned':'Plan'; row.classList.toggle('planned', isPlanned(course,p)); });
    const line = el('div',{class:'prof-card'}, el('div',{}, p.name), chip, btn);
    plist.append(line);
  });
  row.append(plist);
  return row;
}

function completed(){
  const c = appShell();
  c.append(el('div',{class:'card'},
    el('h3',{class:'section-title',html:'Completed Courses'}),
    el('p',{class:'help',html:'(Demo list — wire to your saved state as needed)'})
  ));
  return c;
}

function schedule(){
  const c = appShell();
  const card = el('div',{class:'card'});
  card.append(el('h3',{class:'section-title',html:'Planned Schedule'}));
  if(!Data.planned.length){
    card.append(el('p',{class:'help',html:'No classes planned yet. Go to “What’s Left” and click Plan.'}));
  }else{
    Data.planned.forEach(p=>{
      card.append(el('div',{class:'course-row planned'},
        el('div',{}, `${p.code} — ${p.title} (${p.prof})`),
        el('div',{class:'course-right'}, el('span',{class:'badge'}, `${p.section.days} ${p.section.start}-${p.section.end}`))
      ));
    });
  }
  c.append(card); return c;
}

function renderSchedulePill(){
  // could show badge with planned count later
}

function boot(){
  navigator.serviceWorker?.register('service-worker.js');
  const app = $('#app');
  async function show(tab){
    if(tab==='completed'){ navActivate('#tab-completed'); app.innerHTML=''; app.append(completed()); }
    if(tab==='remaining'){ navActivate('#tab-remaining'); app.innerHTML=''; app.append(await remaining()); }
    if(tab==='schedule'){ navActivate('#tab-schedule'); app.innerHTML=''; app.append(schedule()); }
  }
  $('#tab-completed').onclick=()=>show('completed');
  $('#tab-remaining').onclick=()=>show('remaining');
  $('#tab-schedule').onclick=()=>show('schedule');
  show('completed');
}

// preload optional files
Promise.all([
  fetch('data/testimonials.json').then(r=>r.json()).catch(()=>({})),
  fetch('data/tags.json').then(r=>r.json()).catch(()=>({}))
]).then(([tips,tags])=>{ TESTIMONIALS=tips||{}; TAGS=tags||{}; }).finally(boot);
