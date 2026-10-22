// Sticky table headers: the scrollwrap (overflow-x:auto) is the
// sticky element's scrollport and traps it. For each table either:
//  - it fits the column -> clear overflow-x, header pins on page scroll
//  - it overflows -> mark it; CSS gives it an internal scroll box and
//    the header pins inside it instead
function classifyScrollwraps() {
  document.querySelectorAll('.md-typeset__scrollwrap').forEach(function (el) {
    if (el.dataset.stickyDone) return;
    var tbl = el.querySelector('table');
    if (!tbl) return;
    el.dataset.stickyDone = '1';
    if (tbl.scrollWidth + 2 <= el.clientWidth) {
      el.style.overflowX = 'visible';
    } else {
      el.classList.add('js-scrollbox');
    }
  });
}

new MutationObserver(classifyScrollwraps).observe(
  document.documentElement, { childList: true, subtree: true });
document.addEventListener('DOMContentLoaded', classifyScrollwraps);
window.addEventListener('load', classifyScrollwraps);
