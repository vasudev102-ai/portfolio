document.addEventListener('DOMContentLoaded', () => {

  const hero = document.querySelector('.hero');
  const shoe = document.querySelector('.shoe');
  const shadow = document.querySelector('.shoe-shadow');

  // Safety check (important for reuse)
  if (!hero || !shoe || !shadow) return;

  /* Shared motion function */
  function applyMotion(x, y, rotate) {
    shoe.style.transform =
      `translate(${x}px, ${y}px) rotate(${rotate}deg)`;

    shadow.style.transform =
      `translate(-50%, ${y * 0.3}px)`;
  }

  /* -----------------------------
     DESKTOP: Mouse parallax
  ----------------------------- */
  hero.addEventListener('mousemove', (e) => {
  const rect = hero.getBoundingClientRect();

  const x = (e.clientX - rect.left) / rect.width - 0.9;
  const y = (e.clientY - rect.top) / rect.height - 0.9;

  // Circular / orbital feel
  const translateX = x * 10;      // reduced side movement
  const translateY = y * 6;       // reduced vertical movement

  // Rotation is now the HERO
  const rotateZ = x * 15.2;        // main attractive motion
  const rotateX = -y * 15.2;       // depth illusion

  shoe.style.transform = `
    translate(${translateX}px, ${translateY}px)
    rotateZ(${rotateZ}deg)
    rotateX(${rotateX}deg)
  `;

  shadow.style.transform = `
    translate(-50%, ${translateY * 0.4}px)
    scale(${1 - Math.abs(x) * 0.05})
  `;
});


  /* -----------------------------
     MOBILE: Device tilt
  ----------------------------- */
  let baseTransform = '';
  let idle = 0;
  window.addEventListener('deviceorientation', (e) => {
   
  if (e.gamma === null || e.beta === null) return;
/*
  const x = e.gamma / 45;
  const y = e.beta / 45;

  const translateX = x * 6;
  const translateY = y * 4;

  const rotateZ = x * 1.4;
  const rotateX = -y * 0.8;
*/
const x = Math.max(-1, Math.min(1, e.gamma / 30));
const y = Math.max(-1, Math.min(1, e.beta / 30));

const translateX = x * 4;
const translateY = y * 3;

baseTransform = `
    translate(${x * 4}px, ${y * 3}px)
    rotateZ(${x * 5.5}deg)
    rotateX(${-y * 5.5}deg)
  `;

  shoe.style.transform = baseTransform;
});

setInterval(() => {
  idle += 0.03;
  shoe.style.transform = baseTransform + ` rotateZ(${Math.sin(idle) * 0.4}deg)`;
}, 50);

});
