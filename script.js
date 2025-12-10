/* =========================================
   1. CÁC HIỆU ỨNG MỚI CHO CÂY (Bụi rơi từ nhánh)
========================================= */

// Hàm tạo một hạt bụi tại một điểm ngẫu nhiên trên nhánh cây
function spawnDustFromTreeBranch() {
  const treePath = document.getElementById("tree-shape-data");
  const container = document.querySelector(".container");

  // Lấy tổng chiều dài của đường vẽ cây
  const pathLength = treePath.getTotalLength();

  // Chọn một điểm ngẫu nhiên trên đường vẽ
  const randomDistance = Math.random() * pathLength;
  const point = treePath.getPointAtLength(randomDistance);

  // Tạo phần tử bụi (DIV)
  const dust = document.createElement("div");
  dust.classList.add("tree-falling-dust");

  // Đặt vị trí bụi tại tọa độ của điểm vừa tìm được
  // Thêm một chút ngẫu nhiên (offset) để nó không rơi thẳng hàng
  const offsetX = (Math.random() - 0.5) * 10; // lệch trái phải tối đa 5px
  dust.style.left = point.x + offsetX + "px";
  dust.style.top = point.y + "px";

  // Kích thước ngẫu nhiên (từ 2px đến 5px)
  const size = Math.random() * 3 + 2 + "px";
  dust.style.width = size;
  dust.style.height = size;

  // Thời gian rơi ngẫu nhiên (từ 1.5s đến 3s)
  dust.style.animationDuration = Math.random() * 1.5 + 1.5 + "s";

  container.appendChild(dust);

  // Xóa hạt bụi sau khi rơi xong để nhẹ máy
  setTimeout(() => {
    dust.remove();
  }, 3000);
}

// --- KÍCH HOẠT HIỆU ỨNG ---
// Đợi 10.5 giây (khi cây vừa vẽ xong) thì bắt đầu
setTimeout(() => {
  // Tạo một hạt bụi mới mỗi 50 mili giây (tạo hiệu ứng rơi liên tục)
  setInterval(spawnDustFromTreeBranch, 50);
}, 10500);

/* =========================================
   2. CÁC HIỆU ỨNG CŨ (Giữ nguyên toàn bộ bên dưới)
========================================= */

/* HIỆU ỨNG TUYẾT RƠI CHUNG */
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

/* HIỆU ỨNG CHỮ THAY ĐỔI */
const messages = [
  "Merry Christmas",
  "Happy New Year 2026",
  "Peace & Joy",
  "From Gemini with Love",
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

/* ÔNG GIÀ NOEL BAY + BỤI */
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

/* QUÀ RƠI */
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

/* =========================================
   XỬ LÝ ÂM NHẠC (AUTOPLAY + MUTE)
========================================= */
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
const btnIcon = musicBtn.querySelector(".icon");
const btnText = musicBtn.querySelector(".text");

music.volume = 0.5;

// Tự động chạy (Mute)
music.play().catch((e) => console.log("Chờ tương tác..."));

musicBtn.addEventListener("click", () => {
  if (music.muted) {
    // --- BẬT TIẾNG ---
    music.muted = false;
    musicBtn.classList.add("music-playing");

    // Đổi icon thành cái chuông reo
    btnIcon.textContent = "🔔";
    btnText.textContent = "Đang phát";

    if (music.paused) music.play();
  } else {
    // --- TẮT TIẾNG (MUTE) ---
    music.muted = true;
    musicBtn.classList.remove("music-playing");

    // Đổi icon về loa tắt
    btnIcon.textContent = "🔇";
    btnText.textContent = "Bật nhạc";
  }
});
