// ── State ──
let currentStep = 1;
const TOTAL_STEPS = 4;
const PROGRESS = [25, 50, 75, 100];

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  // Set earliest selectable date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('f-startdate').min = today;
});

// ── Navigation ──
function showPanel(n) {
  // Show / hide panels
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const panel = document.getElementById('panel-' + i);
    if (panel) panel.style.display = i === n ? 'block' : 'none';
  }
  document.getElementById('success-screen').style.display = 'none';

  // Update stepper circles & labels
  const CIRCLE_BASE = 'w-[34px] h-[34px] rounded-full border-2 flex items-center justify-center text-[0.78rem] font-semibold transition-all duration-300';
  const CIRCLE_ACTIVE = 'border-teal bg-teal text-white';
  const CIRCLE_INACTIVE = 'border-[#e5e7eb] bg-white text-gray-400';
  const LABEL_BASE = 'text-[0.7rem] whitespace-nowrap transition-all duration-300';
  const LABEL_ACTIVE = 'font-semibold text-teal';
  const LABEL_INACTIVE = 'font-medium text-gray-400';

  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const circle = document.getElementById('circle-' + i);
    const label = document.getElementById('label-' + i);
    const line = i < TOTAL_STEPS ? document.getElementById('line-' + i) : null;

    if (i <= n) {
      circle.className = `${CIRCLE_BASE} ${CIRCLE_ACTIVE}`;
      label.className = `${LABEL_BASE} ${LABEL_ACTIVE}`;
      if (line) line.className = 'flex-1 h-0.5 bg-teal mb-5 transition-all duration-300';
      if (i < n) {
        circle.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
      } else {
        circle.textContent = i;
      }
    } else {
      circle.className = `${CIRCLE_BASE} ${CIRCLE_INACTIVE}`;
      label.className = `${LABEL_BASE} ${LABEL_INACTIVE}`;
      circle.textContent = i;
      if (line) line.className = 'flex-1 h-0.5 bg-[#e5e7eb] mb-5 transition-all duration-300';
    }
  }

  // Update progress bar
  document.getElementById('progress-fill').style.width = PROGRESS[n - 1] + '%';
  currentStep = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger slide-in animation
  const panel = document.getElementById('panel-' + n);
  if (panel) {
    panel.classList.remove('slide-in');
    void panel.offsetWidth; // force reflow
    panel.classList.add('slide-in');
  }
}

function jumpTo(n) {
  // Only allow jumping backwards (to already-completed steps)
  if (n < currentStep) showPanel(n);
}

function goNext(step) {
  if (!validateStep(step)) return;
  if (step === 3) buildReview();
  showPanel(step + 1);
}

function goPrev(step) {
  showPanel(step - 1);
}

// ── Validation ──
function validateStep(step) {
  let ok = true;

  // Helper: validates a single field
  const req = (id, errId, check) => {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    const pass = check ? check(el) : el.value.trim() !== '';
    el.classList.toggle('error', !pass);
    if (err) err.style.display = pass ? 'none' : 'block';
    if (!pass) ok = false;
  };

  if (step === 1) {
    req('f-fname', 'e-fname');
    req('f-lname', 'e-lname');
    req('f-email', 'e-email', el => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value));
    req('f-phone', 'e-phone');
    req('f-city', 'e-city');
    req('f-profession', 'e-profession');
  }

  if (step === 2) {
    req('f-motivation', 'e-motivation', el => el.value.trim().length >= 50);

    const selectedSkills = document.querySelectorAll('.skill-chip.bg-teal-light');
    const skillErr = document.getElementById('e-skills');
    if (selectedSkills.length === 0) {
      skillErr.style.display = 'block';
      ok = false;
    } else {
      skillErr.style.display = 'none';
    }
  }

  if (step === 3) {
    req('f-startdate', 'e-startdate');
    req('f-workmode', 'e-workmode', el => el.value !== '');

    const selectedDays = document.querySelectorAll('#days-grid .avail-tile.bg-teal-light');
    const daysErr = document.getElementById('e-days');
    if (selectedDays.length === 0) {
      daysErr.style.display = 'block';
      ok = false;
    } else {
      daysErr.style.display = 'none';
    }
  }

  if (!ok) showToast('Please fill in all required fields');
  return ok;
}

// ── Review builder ──
function buildReview() {
  // Personal Info
  document.getElementById('review-personal').innerHTML = `
    <div class="review-item">
      <span class="r-label">Full Name</span>
      <span class="r-val">${val('f-fname')} ${val('f-lname')}</span>
    </div>
    <div class="review-item">
      <span class="r-label">Email</span>
      <span class="r-val">${val('f-email')}</span>
    </div>
    <div class="review-item">
      <span class="r-label">Phone</span>
      <span class="r-val">${val('f-phone')}</span>
    </div>
    <div class="review-item">
      <span class="r-label">Location</span>
      <span class="r-val">${val('f-city')}</span>
    </div>
    <div class="review-item">
      <span class="r-label">Profession</span>
      <span class="r-val">${val('f-profession')}</span>
    </div>
    ${val('f-url') ? `
    <div class="review-item">
      <span class="r-label">Portfolio</span>
      <span class="r-val" style="word-break:break-all">${val('f-url')}</span>
    </div>` : ''}
  `;

  // Why You
  const skills = [...document.querySelectorAll('.skill-chip.bg-teal-light')].map(c => c.textContent);
  document.getElementById('review-why').innerHTML = `
    <div class="review-item">
      <span class="r-label">Motivation</span>
      <span class="r-val" style="white-space:pre-wrap">${val('f-motivation')}</span>
    </div>
    ${val('f-experience') ? `
    <div class="review-item" style="margin-top:0.5rem">
      <span class="r-label">Experience</span>
      <span class="r-val" style="white-space:pre-wrap">${val('f-experience')}</span>
    </div>` : ''}
    <div class="review-item" style="margin-top:0.5rem">
      <span class="r-label">Skills</span>
      <div class="r-chips">
        ${skills.map(s => `<span class="r-chip">${s}</span>`).join('')}
      </div>
    </div>
  `;

  // Availability
  const days = [...document.querySelectorAll('#days-grid .avail-tile.bg-teal-light')]
    .map(t => t.querySelector('.t-label').textContent);
  document.getElementById('review-avail').innerHTML = `
    <div class="review-item">
      <span class="r-label">Start Date</span>
      <span class="r-val">${formatDate(val('f-startdate'))}</span>
    </div>
    <div class="review-item">
      <span class="r-label">Hours / Week</span>
      <span class="r-val">${val('f-hours')} hours</span>
    </div>
    <div class="review-item">
      <span class="r-label">Work Mode</span>
      <span class="r-val">${val('f-workmode')}</span>
    </div>
    <div class="review-item">
      <span class="r-label">Preferred Days</span>
      <div class="r-chips">
        ${days.map(d => `<span class="r-chip">${d}</span>`).join('')}
      </div>
    </div>
  `;
}

// ── Helpers ──
function val(id) {
  return document.getElementById(id).value;
}

function formatDate(d) {
  if (!d) return '—';
  const [y, m, day] = d.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${day} ${months[parseInt(m) - 1]} ${y}`;
}

// ── UI Toggles ──
function toggleSkill(el) {
  el.classList.toggle('bg-teal-light');
  el.classList.toggle('border-teal');
  el.classList.toggle('text-teal');
}

function toggleTile(el) {
  el.classList.toggle('bg-teal-light');
  el.classList.toggle('border-teal');
  el.classList.toggle('text-teal');
}

function updateChar(el, counterId, max) {
  document.getElementById(counterId).textContent = `${el.value.length} / ${max}`;
}

function updateHours(val) {
  document.getElementById('hours-label').textContent =
    `${val} hour${val == 1 ? '' : 's'} / week`;
}

// ── Submit ──
function submitApplication() {
  const btn = document.getElementById('submit-btn');
  btn.textContent = 'Submitting…';
  btn.style.opacity = '0.75';
  btn.style.pointerEvents = 'none';

  setTimeout(() => {
    // Hide all step panels
    for (let i = 1; i <= TOTAL_STEPS; i++) {
      const p = document.getElementById('panel-' + i);
      if (p) p.style.display = 'none';
    }

    // Hide stepper and progress bar
    document.getElementById('stepper').style.display = 'none';
    document.querySelector('.progress-bar-wrap').style.display = 'none';

    // Show success screen
    const successScreen = document.getElementById('success-screen');
    successScreen.style.display = 'block';
    successScreen.style.animation = 'fadeUp 0.4s ease both';
  }, 1400);
}

// ── Toast ──
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}