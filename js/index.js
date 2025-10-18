document.addEventListener("DOMContentLoaded", function () {
  // 搜索框焦点样式切换
  const searchInput = document.querySelector(".S-icon input");
  const searchWrapper = document.querySelector(".f-search");

  if (searchInput && searchWrapper) {
    searchInput.addEventListener("focus", function () {
      searchWrapper.style.borderBottom = "1px solid #af8747";
    });

    searchInput.addEventListener("blur", function () {
      searchWrapper.style.borderBottom = "1px solid #e7e7e7";
    });
  }

  // 轮播图
  let currentIndex = 0;
  const banners = document.querySelectorAll(".banner-item");
  const totalBanners = banners.length;
  const nextButton = document.querySelector(".next");
  const prevButton = document.querySelector(".prev");
  const bannerContainer = document.querySelector(".banner-container");

  // 函数: function showBanner(index) {
  function showBanner(index) {
    if (index < 0) {
      currentIndex = totalBanners - 1;
    } else if (index >= totalBanners) {
      currentIndex = 0;
    }

    const offset = -currentIndex * 100;
    bannerContainer.style.transform = `translateX(${offset}%)`;
  }

  if (nextButton && prevButton && bannerContainer && totalBanners > 0) {
    nextButton.addEventListener("click", () => {
      currentIndex++;
      showBanner(currentIndex);
    });

    prevButton.addEventListener("click", () => {
      currentIndex--;
      showBanner(currentIndex);
    });

    setInterval(() => {
      currentIndex++;
      showBanner(currentIndex);
    }, 5000);
  }

  // 返回顶部按钮
  const backToTopBtn = document.querySelector(".back-to-top-link");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 导航栏吸顶
  window.addEventListener("scroll", function () {
    const navi = document.getElementById("navi");
    if (!navi) return;

    if (window.scrollY > 100) {
      navi.style.position = "fixed";
      navi.style.top = "0";
      navi.style.left = "0";
      navi.style.width = "100%";
      navi.style.zIndex = "999";
      navi.style.backgroundColor = "#fff";
      navi.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    } else {
      navi.style.position = "static";
      navi.style.boxShadow = "none";
    }
  });
});
