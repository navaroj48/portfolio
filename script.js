const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const themeBtn = document.getElementById('themeBtn');
document.getElementById('year').textContent = new Date().getFullYear();
function closeMenu() {
  navLinks.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.setAttribute('aria-label', 'Open menu');
}
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
navLinks.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && navLinks.classList.contains('open')) { closeMenu(); menuBtn.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });
matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === 'dark' ? '\u2600' : '\u25d0';
  themeBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('theme') || 'dark'; } catch {}
setTheme(savedTheme === 'dark' ? 'dark' : 'light');
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  try { localStorage.setItem('theme', next); } catch {}
});
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(other => {
      const active = other === button;
      other.classList.toggle('active', active);
      other.setAttribute('aria-pressed', String(active));
    });
    let visibleCount = 0;
    document.querySelectorAll('.project-card').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && !card.dataset.category.split(' ').includes(button.dataset.filter);
      if (!card.hidden) visibleCount += 1;
    });
    const status = document.getElementById('projectStatus');
    const category = button.dataset.filter === 'all' ? 'all projects' : button.dataset.filter === 'ai' ? 'AI and machine learning projects' : 'full-stack projects';
    status.textContent = `Showing ${visibleCount} ${category}.`;
  });
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('reveal'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.section-heading, .project-card, .about-facts, .chip-group').forEach(element => observer.observe(element));
}
