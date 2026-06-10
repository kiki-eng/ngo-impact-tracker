/* Sidebar */
function toggleSidebar() {
document.getElementById('sidebar').classList.toggle('open');
document.getElementById('overlay').classList.toggle('open');
}
function closeSidebar() {
document.getElementById('sidebar').classList.remove('open');
document.getElementById('overlay').classList.remove('open');
}

/* Nav active */
function navClick(e) {
e.preventDefault();
document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => el.classList.remove('active'));
e.currentTarget.classList.add('active');
if (window.innerWidth <= 720) closeSidebar();
}

/* Bottom nav */
function setBottomActive(el) {
document.querySelectorAll('.bnav-item').forEach(i => i.classList.remove('active'));
el.classList.add('active');
}

/* Toast */
let _toastTimer;
function showToast(msg) {
const t = document.getElementById('toast');
document.getElementById('toastMsg').textContent = msg;
t.classList.add('show');
clearTimeout(_toastTimer);
_toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* Apply */
function applyRole(btn) {
btn.textContent = '✓ Applied';
btn.style.background = 'var(--teal-600)';
btn.disabled = true;
showToast('Application submitted!');
}

/* Save/bookmark */
function toggleSave(btn) {
const i = btn.querySelector('i');
const saved = i.classList.contains('ti-bookmark-filled');
if (saved) {
    i.classList.replace('ti-bookmark-filled', 'ti-bookmark');
    btn.style.color = '';
    showToast('Removed from saved');
} else {
    i.classList.replace('ti-bookmark', 'ti-bookmark-filled');
    btn.style.color = 'var(--teal-700)';
    showToast('Role saved!');
}
}

/* Search */
function filterCards() {
const q = document.getElementById('searchInput').value.toLowerCase().trim();
const cards = document.querySelectorAll('#roleList .role-card');
let vis = 0;
cards.forEach(c => {
    const match = !q || c.dataset.title.toLowerCase().includes(q) || c.dataset.org.toLowerCase().includes(q);
    c.style.display = match ? '' : 'none';
    if (match) vis++;
});
document.getElementById('emptyState').style.display = vis === 0 ? 'block' : 'none';
}

/* Sort cycle */
const SORTS = ['Time Posted', 'Most Relevant', 'Spots Available'];
let sortIdx = 0;
function cycleSort() {
sortIdx = (sortIdx + 1) % SORTS.length;
document.getElementById('sortLabel').textContent = SORTS[sortIdx];
showToast('Sorted by: ' + SORTS[sortIdx]);
}

/* Activate alerts */
function activateAlerts() {
const email = document.getElementById('alertEmail').value.trim();
if (!email || !email.includes('@')) { showToast('Enter a valid email'); return; }
showToast('Alerts activated for ' + email);
document.getElementById('alertEmail').value = '';
}