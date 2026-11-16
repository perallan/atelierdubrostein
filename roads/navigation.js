// Progressive enhancement: native anchor links remain usable without JavaScript.
// With JavaScript, jump to the *content* of each chapter rather than its padded
// section box, and avoid adding hashes to the URL.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('.masthead');

function scrollToChapter(target) {
  const isTop = target.id === 'story';
  const isChapter = target.matches('.chapter, .interlude, .finale');
  const compactHeight = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--compact-masthead-height')) || 62;
  const headerHeight = isTop ? 0 : compactHeight;
  const breathingRoom = 18;
  const sectionPadding = isChapter
    ? Number.parseFloat(getComputedStyle(target).paddingTop) || 0
    : 0;

  // Using the section's document position (rather than the sticky heading's
  // viewport position) keeps destinations reliable when navigating backwards.
  const targetY = isTop ? 0 : window.scrollY + target.getBoundingClientRect().top
    + sectionPadding - headerHeight - breathingRoom;

  window.scrollTo({
    top: Math.max(0, targetY),
    behavior: motionPreference.matches ? 'instant' : 'smooth'
  });

  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      (link.target && link.target !== '_self')) return;

  const hash = link.getAttribute('href');
  if (!hash || hash === '#') return;
  const target = document.getElementById(hash.slice(1));
  if (!target) return;

  event.preventDefault();
  scrollToChapter(target);
});

// Reading mode: one passive scroll listener, throttled to animation frames.
// The compact state is also set on load/refresh at a restored scroll position.
const COMPACT_AFTER_PX = 64;
let headerUpdatePending = false;
function updateHeaderMode() {
  header?.classList.toggle('is-compact', window.scrollY > COMPACT_AFTER_PX);
  headerUpdatePending = false;
}
window.addEventListener('scroll', () => {
  if (headerUpdatePending) return;
  headerUpdatePending = true;
  requestAnimationFrame(updateHeaderMode);
}, { passive: true });
updateHeaderMode();
window.addEventListener('pageshow', updateHeaderMode);
