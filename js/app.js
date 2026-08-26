document.addEventListener('DOMContentLoaded', () => {
  const demoButtons = document.querySelectorAll('[data-demo-message]');
  if (!demoButtons.length) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.hidden = true;
  document.body.appendChild(toast);

  let timer;
  demoButtons.forEach((button) => {
    button.addEventListener('click', () => {
      clearTimeout(timer);
      toast.textContent = button.dataset.demoMessage;
      toast.hidden = false;
      timer = setTimeout(() => { toast.hidden = true; }, 3800);
    });
  });
});
