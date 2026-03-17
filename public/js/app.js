document.addEventListener('DOMContentLoaded', () => {
  initTeleprompter();
  initExplorer();
  initSlides();

  const tabs = document.querySelectorAll('.nav-tabs .tab');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${target}`).classList.add('active');
    });
  });

  async function checkHealth() {
    const dot = document.querySelector('.status-dot');
    const text = document.querySelector('.status-text');
    try {
      const res = await fetch('/api/v1/health');
      if (res.ok) {
        dot.classList.add('online');
        dot.classList.remove('offline');
        text.textContent = 'API Online';
      } else {
        throw new Error();
      }
    } catch {
      dot.classList.add('offline');
      dot.classList.remove('online');
      text.textContent = 'API Offline';
    }
  }

  checkHealth();
  setInterval(checkHealth, 15000);
});
