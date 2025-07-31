(() => {
  const style = document.createElement('style');
  style.textContent = `
    .dino-btn-panel {
      position: fixed;
      top: 100px;
      left: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 9999;
    }
    .dino-btn-panel button {
      padding: 6px 10px;
      font-size: 14px;
      background: #222;
      color: #fff;
      border: 1px solid #888;
      border-radius: 4px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  const panel = document.createElement('div');
  panel.className = 'dino-btn-panel';
  document.body.appendChild(panel);

  const addBtn = (label, action) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.onclick = action;
    panel.appendChild(btn);
  };

  const R = () => Runner?.instance_;

  addBtn('🛡 Invincible', () => R().gameOver = () => {});
  addBtn('🐇 Speed x10', () => R().setSpeed(100));
  addBtn('🐢 Slow Mo', () => R().setSpeed(0.1));
  addBtn('⏸ Pause', () => R().stop());
  addBtn('▶ Resume', () => R().play());
  addBtn('🌑 Dark Mode', () => R().setDarkMode(true));
  addBtn('🤖 Auto-Jump', () => {
    if (window.dinoBot) return;
    window.dinoBot = setInterval(() => {
      const t = R().tRex;
      const o = R().horizon.obstacles[0];
      if (o && o.xPos - t.xPos < 100 && !t.jumping) t.startJump();
    }, 10);
  });
  addBtn('🛑 Stop Bot', () => {
    clearInterval(window.dinoBot);
    window.dinoBot = null;
  });
})();
