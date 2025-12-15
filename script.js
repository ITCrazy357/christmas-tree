/* =========================================
   1. HIỆU ỨNG BỤI PHÁT SÁNG KHI VẼ (MỚI)
========================================= */
const sparkCursor = document.getElementById("spark-cursor");

function spawnDustAtCursor() {
  // Lấy vị trí hiện tại của đầu bút (spark-cursor)
  // getBoundingClientRect trả về vị trí so với màn hình
  const rect = sparkCursor.getBoundingClientRect();

  // Tạo hạt bụi
  const dust = document.createElement("div");
  dust.classList.add("drawing-dust");

  // Đặt vị trí bụi trùng với đầu bút
  // Thêm random nhẹ để nó bung ra tự nhiên
  const offsetX = (Math.random() - 0.5) * 10;
  const offsetY = (Math.random() - 0.5) * 10;

  dust.style.left = rect.left + rect.width / 2 + offsetX + "px";
  dust.style.top = rect.top + rect.height / 2 + offsetY + "px";

  // Kích thước ngẫu nhiên
  const size = Math.random() * 3 + 2 + "px";
  dust.style.width = size;
  dust.style.height = size;

  document.body.appendChild(dust);

  // Xóa bụi sau 1s
  setTimeout(() => dust.remove(), 1000);
}

// Bắt đầu tạo bụi khi vẽ (Chạy trong 10s đầu)
let drawingInterval = setInterval(spawnDustAtCursor, 5); // 30ms tạo 1 hạt

// Sau 10s (vẽ xong) thì dừng tạo bụi ở đầu bút
setTimeout(() => {
  clearInterval(drawingInterval);
}, 6000);

/* =========================================
   2. HIỆU ỨNG CÂY SAU KHI VẼ XONG (Bụi rơi từ nhánh) - ĐÃ SỬA LỖI VỊ TRÍ
========================================= */
function spawnDustFromTreeBranch() {
  const treePath = document.getElementById("tree-shape-data");
  // Lấy thẻ SVG chính để tính toán vị trí thực tế trên màn hình
  const svg = document.getElementById("main-svg");

  const pathLength = treePath.getTotalLength();
  const randomDistance = Math.random() * pathLength;
  const point = treePath.getPointAtLength(randomDistance);

  // [QUAN TRỌNG] Lấy vị trí của SVG so với màn hình
  // Nếu không có dòng này, bụi sẽ bị lệch khi bạn resize trình duyệt hoặc căn giữa
  const svgRect = svg.getBoundingClientRect();

  const dust = document.createElement("div");
  dust.classList.add("tree-falling-dust");
  const offsetX = (Math.random() - 0.5) * 10;
  const scaleX = svgRect.width / 600; // 600 là width trong viewBox
  const scaleY = svgRect.height / 700; // 700 là height trong viewBox

  dust.style.left = svgRect.left + point.x * scaleX + offsetX + "px";
  dust.style.top = svgRect.top + point.y * scaleY + "px";

  const size = Math.random() * 3 + 2 + "px";
  dust.style.width = size;
  dust.style.height = size;
  dust.style.animationDuration = Math.random() * 1.5 + 1.5 + "s";

  document.body.appendChild(dust);
  setTimeout(() => dust.remove(), 3000);
}

// Kích hoạt sau khi vẽ xong (10.5s)
setTimeout(() => {
  setInterval(spawnDustFromTreeBranch, 10);
}, 10500);

/* =========================================
   3. CÁC HIỆU ỨNG KHÁC (Tuyết, Chữ, Santa, Quà, Nhạc)
========================================= */

// --- TUYẾT RƠI ---
function createSnowflake() {
  const snow = document.createElement("div");
  snow.classList.add("snowflake");
  snow.textContent = ["❄", "❅", "❆"][Math.floor(Math.random() * 3)];
  snow.style.left = Math.random() * window.innerWidth + "px";
  snow.style.fontSize = Math.random() * 15 + 10 + "px";
  snow.style.opacity = Math.random() * 0.7 + 0.3;
  const duration = Math.random() * 5 + 3;
  snow.style.animationDuration = duration + "s";
  document.body.appendChild(snow);
  setTimeout(() => snow.remove(), duration * 1000);
}
setInterval(createSnowflake, 150);

// --- CHỮ ---
const messages = [
  "Chúc em thi tốt nhe",
  "Chúc em học bài nhìn là thuộc",
  "Lụi là trúng",
  "Nhớ bài dai như đĩa...",
  "Mong ông trời phù hộ độ trì",
  "Cho em vượt qua môn =))",
  "Và có kết quả cao ngút trời =))",
  "Đón một cái tết thật ngon",
  "Và vui vẻ ",
  "Chúc em may mắn",
  "Good Luck",
];
let index = 0;
const messageEl = document.getElementById("message");
setTimeout(() => {
  messageEl.textContent = "";
  showMessage();
  setInterval(showMessage, 4000);
}, 10000);

function showMessage() {
  messageEl.style.opacity = 0;
  setTimeout(() => {
    messageEl.textContent = messages[index];
    messageEl.style.opacity = 1;
    index = (index + 1) % messages.length;
  }, 1000);
}

// --- SANTA ---
function spawnSanta() {
  if (document.querySelector(".santa-container")) return;
  const santa = document.createElement("div");
  santa.classList.add("santa-container");
  for (let i = 0; i < 15; i++) {
    const dust = document.createElement("div");
    dust.classList.add("magic-dust");
    dust.style.left = Math.random() * 50 + "px";
    dust.style.top = Math.random() * 100 + "%";
    const size = Math.random() * 4 + 2 + "px";
    dust.style.width = size;
    dust.style.height = size;
    dust.style.animationDelay = Math.random() * 1 + "s";
    dust.style.animationDuration = Math.random() * 0.5 + 0.5 + "s";
    santa.appendChild(dust);
  }
  setTimeout(() => {
    santa.classList.add("santa-flying");
  }, 50);
  document.body.appendChild(santa);
  setTimeout(() => {
    santa.remove();
  }, 16000);
}
setTimeout(() => {
  spawnSanta();
  setInterval(spawnSanta, 25000);
}, 12000);

// --- QUÀ ---
const giftSVG = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="30" height="25" fill="#D42424"/> <rect x="18" y="10" width="4" height="25" fill="#FFD700"/> <rect x="5" y="20" width="30" height="4" fill="#FFD700"/> <path d="M20 10C20 10 15 0 10 5C5 10 15 15 20 10Z" fill="#FFD700"/> <path d="M20 10C20 10 25 0 30 5C35 10 25 15 20 10Z" fill="#FFD700"/> </svg>`;
function spawnGift() {
  const gift = document.createElement("div");
  gift.classList.add("gift-item");
  gift.innerHTML = giftSVG;
  const randomX = Math.random() * 80 + 10;
  gift.style.left = `${randomX}vw`;
  const scale = Math.random() * 0.5 + 0.8;
  gift.style.transform = `scale(${scale})`;
  document.body.appendChild(gift);
  setTimeout(() => {
    gift.remove();
  }, 10000);
}
setTimeout(() => {
  setInterval(spawnGift, 2500);
}, 15000);

// --- ÂM NHẠC ---
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const btnIcon = musicBtn.querySelector(".icon");
const btnText = musicBtn.querySelector(".text");
music.volume = 0.5;
music.play().catch((e) => console.log("Chờ tương tác..."));

musicBtn.addEventListener("click", () => {
  if (music.muted) {
    music.muted = false;
    musicBtn.classList.add("music-playing");
    btnIcon.textContent = "🔔";
    btnText.textContent = "Đang phát";
    if (music.paused) music.play();
  } else {
    music.muted = true;
    musicBtn.classList.remove("music-playing");
    btnIcon.textContent = "🔇";
    btnText.textContent = "Bật nhạc";
  }
});
/* =========================================
   🌌 ADD-ON: Aurora + Starfield + Garland + Ornaments + Sparkle Burst
   (Dán vào CUỐI script.js — KHÔNG sửa code cũ)
========================================= */
(() => {
  const container = document.querySelector(".container");
  const svg = document.getElementById("main-svg");
  const treePath = document.getElementById("tree-shape-data");
  if (!container || !svg || !treePath) return;

  // ---- 1) Aurora layer (div) + Starfield canvas ----
  const aurora = document.createElement("div");
  aurora.className = "aurora-layer";

  const canvas = document.createElement("canvas");
  canvas.id = "starfield-canvas";

  // Nền đứng sau SVG: prepend để nằm dưới
  container.prepend(canvas);
  container.prepend(aurora);

  const ctx = canvas.getContext("2d");
  let W = 0,
    H = 0;
  function resize() {
    const rect = container.getBoundingClientRect();
    W = Math.max(1, Math.floor(rect.width));
    H = Math.max(1, Math.floor(rect.height));
    canvas.width = Math.floor(W * devicePixelRatio);
    canvas.height = Math.floor(H * devicePixelRatio);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  const stars = Array.from({ length: 140 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.6 + 0.3,
    s: Math.random() * 0.35 + 0.08,
    a: Math.random() * 0.6 + 0.2,
    tw: Math.random() * 0.02 + 0.005,
  }));

  function drawStars() {
    ctx.clearRect(0, 0, W, H);

    // nền gradient mềm hơn (đè nhẹ lên background của body)
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "rgba(10, 15, 47, 0.0)");
    g.addColorStop(1, "rgba(10, 15, 47, 0.35)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    for (const st of stars) {
      st.y += st.s;
      st.x += Math.sin(st.y * 0.003) * 0.08;
      if (st.y > H + 10) {
        st.y = -10;
        st.x = Math.random() * W;
      }
      st.a += (Math.random() - 0.5) * st.tw;
      st.a = Math.max(0.15, Math.min(0.95, st.a));

      ctx.globalAlpha = st.a;
      ctx.beginPath();
      ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawStars);
  }
  drawStars();

  // ---- 2) Garland light theo path (SVG use thêm) ----
  const NS = "http://www.w3.org/2000/svg";
  const garland = document.createElementNS(NS, "use");
  garland.setAttribute("href", "#tree-shape-data");
  garland.classList.add("light-garland");
  // đặt sau fire-trail nhưng trước main-line (đẹp nhất)
  const mainLine = svg.querySelector(".main-line");
  if (mainLine) svg.insertBefore(garland, mainLine);

  // ---- 3) Ornaments (bóng trang trí) rải đều theo path ----
  function addOrnaments() {
    const L = treePath.getTotalLength();
    const group = document.createElementNS(NS, "g");
    group.setAttribute("id", "ornament-group");
    svg.appendChild(group);

    const colors = [
      "#ff3b3b",
      "#ffd166",
      "#06d6a0",
      "#4cc9f0",
      "#b5179e",
      "#ffffff",
    ];

    const count = 34; // số bóng
    for (let i = 0; i < count; i++) {
      // né sát 2 đầu path
      const dist = L * (0.06 + 0.88 * Math.pow(Math.random(), 0.72));
      const p = treePath.getPointAtLength(dist);

      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", p.x);
      c.setAttribute("cy", p.y);

      const r = 3 + Math.random() * 3.6;
      c.setAttribute("r", r);

      const col = colors[(Math.random() * colors.length) | 0];
      c.setAttribute("fill", col);

      c.classList.add("ornament-bulb");
      c.style.animationDelay = `${Math.random() * 1.8}s`; // nhấp nháy lệch nhau
      group.appendChild(c);
    }
  }

  // để xuất hiện sau khi nét cây vẽ gần xong
  setTimeout(addOrnaments, 6500);

  // ---- 4) Sparkle Burst (nổ kim tuyến) khi vẽ xong + click anywhere ----
  function sparkleBurst(x, y, amount = 42) {
    for (let i = 0; i < amount; i++) {
      const p = document.createElement("div");
      p.className = "final-spark";

      // random màu nhẹ
      const hue = 30 + Math.random() * 320;
      p.style.background = `hsl(${hue} 95% 70%)`;

      const dx = (Math.random() - 0.5) * 220;
      const dy = (Math.random() - 0.5) * 220;
      p.style.setProperty("--dx", dx + "px");
      p.style.setProperty("--dy", dy + "px");

      p.style.left = x + "px";
      p.style.top = y + "px";
      p.style.width = p.style.height = `${Math.random() * 5 + 3}px`;

      document.body.appendChild(p);
      setTimeout(() => p.remove(), 950);
    }
  }

  // Nổ ở khu vực ngôi sao đúng timing (starShow bắt đầu ~8s)
  setTimeout(() => {
    const star = document.getElementById("star");
    if (star) {
      const r = star.getBoundingClientRect();
      sparkleBurst(r.left + r.width / 2, r.top + r.height / 2, 55);
    }
  }, 8200);

  // Click ở đâu cũng sparkle (cực “magic”)
  document.addEventListener("pointerdown", (e) => {
    sparkleBurst(e.clientX, e.clientY, 26);
  });

  // ---- 5) Bonus: shooting star thỉnh thoảng ----
  function shootingStar() {
    const s = document.createElement("div");
    s.style.position = "fixed";
    s.style.left = Math.random() * 60 + "vw";
    s.style.top = Math.random() * 35 + "vh";
    s.style.width = "180px";
    s.style.height = "2px";
    s.style.pointerEvents = "none";
    s.style.zIndex = "9998";
    s.style.opacity = "0.9";
    s.style.background =
      "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95), rgba(255,215,0,0.5), rgba(255,255,255,0))";
    s.style.filter = "drop-shadow(0 0 8px rgba(255,255,255,0.7))";
    s.style.transform = "rotate(-18deg)";
    s.style.transition = "transform 900ms ease, opacity 900ms ease";
    document.body.appendChild(s);

    requestAnimationFrame(() => {
      s.style.transform = "translate(60vw, 35vh) rotate(-18deg)";
      s.style.opacity = "0";
    });
    setTimeout(() => s.remove(), 950);
  }
  setInterval(() => {
    if (Math.random() < 0.35) shootingStar();
  }, 7000);
})();
