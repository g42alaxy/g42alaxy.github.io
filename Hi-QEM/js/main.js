document.addEventListener('DOMContentLoaded', () => {
  // Tab groups
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const buttons = group.querySelectorAll('.tab-btn');
    const panels = group.querySelectorAll('.tab-panel');
    const subtitleId = group.getAttribute('data-subtitle-target');
    const subtitleEl = subtitleId ? document.getElementById(subtitleId) : null;
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        group.querySelector(`.tab-panel[data-panel="${target}"]`).classList.add('active');
        if (subtitleEl && btn.hasAttribute('data-subtitle')) {
          subtitleEl.innerHTML = btn.getAttribute('data-subtitle');
        }
      });
    });
  });

  // Draggable mock slider (visual only, roadmap preview)
  const slider = document.querySelector('.mock-slider .bar-track');
  if (slider) {
    const handle = slider.querySelector('.handle');
    let dragging = false;
    const setPos = (clientX) => {
      const rect = slider.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      handle.style.left = pct + '%';
      slider.style.background = `linear-gradient(90deg, var(--orange-tint) 0%, var(--orange-tint) ${pct}%, var(--blue-tint) ${pct}%, var(--blue-tint) 100%)`;
    };
    slider.addEventListener('pointerdown', e => { dragging = true; setPos(e.clientX); });
    window.addEventListener('pointermove', e => { if (dragging) setPos(e.clientX); });
    window.addEventListener('pointerup', () => dragging = false);
  }
});
