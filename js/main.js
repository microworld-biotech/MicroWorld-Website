// Mobile menu
const ham = document.getElementById('ham'),
  mob = document.getElementById('mob'),
  mobClose = document.getElementById('mobClose');
ham.addEventListener('click', () => mob.classList.add('open'));
mobClose.addEventListener('click', () => mob.classList.remove('open'));
mob.addEventListener('click', e => {
  if (e.target === mob) mob.classList.remove('open');
});
// Products accordion
const mobProd = document.getElementById('mobProd'),
  mobProdSub = document.getElementById('mobProdSub'),
  prodArrow = document.getElementById('prodArrow');
mobProd.addEventListener('click', () => {
  const o = mobProdSub.style.display === 'block';
  mobProdSub.style.display = o ? 'none' : 'block';
  prodArrow.textContent = o ? '▼' : '▲';
});
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) {
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
