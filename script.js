const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
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
matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
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

/* Redesign: active nav indicator, spotlight, rotating roles, live GitHub data */
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const spy = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => { const on = link.getAttribute('href') === '#' + entry.target.id; link.classList.toggle('active', on); on ? link.setAttribute('aria-current', 'true') : link.removeAttribute('aria-current'); });
  }), { rootMargin: '-40% 0px -55% 0px' });
  ['top', 'about', 'skills', 'projects', 'contact'].forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });
}
document.querySelectorAll('.project-card, .chip-group, .about-facts > div, .gh-stats > div').forEach(el => {
  el.classList.add('spot');
  el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px'); });
});
const role = document.getElementById('role');
if (role && !reduceMotion) {
  const roles = ['machine learning models', 'full-stack web apps', 'agentic AI systems']; let i = 0;
  setInterval(() => { role.classList.add('swap'); setTimeout(() => { i = (i + 1) % roles.length; role.textContent = roles[i]; role.classList.remove('swap'); }, 300); }, 2800);
}
function countUp(el, to) {
  if (reduceMotion || to < 1) { el.textContent = to; return; }
  const start = performance.now();
  const tick = now => { const p = Math.min((now - start) / 900, 1); el.textContent = Math.round(to * p); if (p < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}
(async () => {
  const note = document.getElementById('ghNote'), list = document.getElementById('ghRepoList');
  if (!note) return;
  try {
    const [user, repos] = await Promise.all([
      fetch('https://api.github.com/users/navarojreddy48').then(r => { if (!r.ok) throw 0; return r.json(); }),
      fetch('https://api.github.com/users/navarojreddy48/repos?sort=updated&per_page=6').then(r => { if (!r.ok) throw 0; return r.json(); })
    ]);
    countUp(document.getElementById('ghRepos'), user.public_repos); countUp(document.getElementById('ghFollowers'), user.followers);
    repos.forEach(repo => {
      const li = document.createElement('li'), a = document.createElement('a'), b = document.createElement('b'), s = document.createElement('small');
      a.href = repo.html_url; a.target = '_blank'; a.rel = 'noreferrer'; b.textContent = repo.name;
      s.textContent = [repo.language, repo.stargazers_count ? repo.stargazers_count + ' stars' : ''].filter(Boolean).join(' \u00b7 ') || 'Public repository';
      a.append(b, s); li.append(a); list.append(li);
    });
    note.textContent = 'Live data from the public GitHub API.';
  } catch { note.textContent = 'GitHub data could not be loaded right now. Visit the profile link above.'; }
})();
