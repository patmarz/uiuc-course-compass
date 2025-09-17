const App = {
  state: { completed: [], planned: [] },
  courses: [
    { code:'ACCY 201', title:'Accounting and Accountancy I', avgGpa:3.28, profs:[
      { name:'Parker Brown', gpa:3.45, rating:4.0, time:'MWF 09:00-10:50' },
      { name:'Rowan Martinez', gpa:3.11, rating:4.6, time:'TR 13:00-14:15' }
    ]},
    { code:'BUS 101', title:'Professional Responsibility and Business', avgGpa:3.18, profs:[
      { name:'Drew Martinez', gpa:3.11, rating:4.7, time:'TR 12:30-13:15' },
      { name:'Riley Martinez', gpa:3.25, rating:4.7, time:'TR 15:00-16:15' }
    ]}
  ],
  show(page) {
    const el = document.getElementById('app');
    if(page==='completed') {
      el.innerHTML = `<h2>Completed Requirements</h2>
        <p>Select the courses you've completed.</p>
        <button onclick="App.show('remaining')">View what's left</button>`;
    }
    if(page==='remaining') {
      el.innerHTML = '<h2>Remaining Courses</h2>';
      this.courses.forEach(c => {
        let courseHtml = `<div class="course"><div class="course-header">
          <h3>${c.code} — ${c.title}</h3>
          <span class="course-gpa">Avg GPA: ${c.avgGpa.toFixed(2)}</span>
        </div>`;
        c.profs.forEach(p => {
          let cls = 'avg';
          if(p.gpa > c.avgGpa) cls = 'good'; else if(p.gpa < c.avgGpa) cls='bad';
          courseHtml += `<div class="prof-card">
            <strong>${p.name}</strong> — <span class="prof-gpa ${cls}">${p.gpa.toFixed(2)} GPA</span> • 
            Rating: ${p.rating}/5 • ${p.time}
            <button style="float:right;background:#13294B;color:#fff;border:none;border-radius:4px;padding:2px 8px;">Plan</button>
          </div>`;
        });
        courseHtml += '</div>';
        el.innerHTML += courseHtml;
      });
    }
    if(page==='schedule') {
      el.innerHTML = '<h2>Schedule</h2><p>Planned courses will appear here.</p>';
    }
    if(page==='account') {
      el.innerHTML = '<h2>Account</h2><p>Sign in/out placeholder.</p>';
    }
  }
};
window.onload = () => App.show('completed');