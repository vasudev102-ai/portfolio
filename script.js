
/* Universal slideshow + simple mobile nav placeholder */
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  if (hero && hero.dataset.images) {
    const images = hero.dataset.images.split(",").map(s => s.trim()).filter(Boolean);
    let i = 0;
    const change = () => {
      hero.style.backgroundImage = `url(${images[i]})`;
      i = (i + 1) % images.length;
    };
    change();
    setInterval(change, 4000);
  }
  const btn = document.querySelector(".menu-btn");
  const links = document.querySelector(".navlinks");
  if (btn && links) {
    btn.addEventListener("click", () => {
      links.style.display = (links.style.display === "flex" ? "none" : "flex");
      links.style.flexDirection = "column";
      links.style.gap = "12px";
      links.style.padding = "12px 20px";
      links.style.background = "#fff";
      links.style.position = "absolute";
      links.style.top = "52px";
      links.style.right = "10px";
      links.style.border = "1px solid #eee";
      links.style.borderRadius = "10px";
      links.style.boxShadow = "0 10px 20px rgba(0,0,0,.07)";
    });
  }
});
