document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript 代码已加载");

  // ========== 缩略图切换主图 ==========
  const thumbnails = document.querySelectorAll(".lrd");
  const mainImage = document.getElementById("mainImage");

  if (thumbnails.length && mainImage) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        const newSrc = this.querySelector("img")?.src;
        if (newSrc) {
          mainImage.src = newSrc;

          thumbnails.forEach((thumb) => thumb.classList.remove("selected"));
          this.classList.add("selected");

          console.log("点击了缩略图", newSrc);
        }
      });
    });
  }

  // ========== 商品数量加减 ==========
  const quantityInput = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");

  if (quantityInput) {
    if (increaseBtn) {
      increaseBtn.addEventListener("click", function () {
        quantityInput.value = parseInt(quantityInput.value) + 1;
      });
    }

    if (decreaseBtn) {
      decreaseBtn.addEventListener("click", function () {
        let currentVal = parseInt(quantityInput.value);
        if (currentVal > 1) {
          quantityInput.value = currentVal - 1;
        }
      });
    }
  }

  // ========== 商品配置切换 ==========
  const items = document.querySelectorAll(".item-oneS");
  const productTitle = document.querySelector(".product-title");
  const priceValue = document.querySelector(".price .value");
  const originalPrice = document.querySelector(".market-price");

  // 函数: function updateProductInfo(data) {
  function updateProductInfo(data) {
    if (productTitle && priceValue && originalPrice) {
      productTitle.textContent = ` ${data.config}`;
      priceValue.textContent = data.price;
      originalPrice.textContent = data.original ? `¥${data.original}` : "";
    }
  }

  if (items.length) {
    // 初始化第一个配置
    updateProductInfo(items[0].dataset);

    items.forEach((item) => {
      item.addEventListener("click", function () {
        items.forEach((i) => i.classList.remove("active"));
        this.classList.add("active");

        updateProductInfo(this.dataset);
      });
    });
  }

  // ========== 商品详情/参数切换 ==========
  const navItems = document.querySelectorAll(".info-nav-item");
  const navArr = document.querySelector(".nav-arr");
  const imgContents = document.querySelectorAll(".img-content");

  if (navItems.length && navArr && imgContents.length) {
    navItems.forEach((item, index) => {
      item.addEventListener("click", function () {
        // 移动下划线
        navArr.style.left = `${index * 102.7}px`;

        // 显示对应内容
        imgContents.forEach((content, i) => {
          content.style.display = i === index ? "block" : "none";
        });
      });
    });
  }
});

