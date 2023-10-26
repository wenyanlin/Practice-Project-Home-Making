// 獲取輪播圖元素和所有幻燈片
const slideshow = document.querySelector('.slideshow');
const slides = slideshow.querySelectorAll('.slide');

let currentIndex = 0; // 當前幻燈片的索引

// 顯示指定索引的幻燈片
function showSlide(index) {
  // 移除所有幻燈片的 active 類名
  slides.forEach(slide => slide.classList.remove('active'));

  // 添加當前幻燈片的 active 類名
  slides[index].classList.add('active');
}

// 切換到下一張幻燈片
function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length; // 計算下一張幻燈片的索引
  showSlide(currentIndex);
}

// 設置定時器自動切換幻燈片
setInterval(nextSlide, 3000);

// 初始顯示第一張幻燈片
showSlide(currentIndex);