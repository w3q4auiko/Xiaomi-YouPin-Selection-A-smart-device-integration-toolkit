document.addEventListener('DOMContentLoaded', function () {
  const cartContainer = document.getElementById('cart-container');
  const emptyContainer = document.querySelector('.no-good-container');

  // 示例数据（仅首次加载时使用）
  let cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart || cart.length === 0) {
    cart = [
      { name: "米家吸收机专业泡沫洗手液", price: 39.9, quantity: 3 },
      { name: "小米Type-C耳机", price: 49, quantity: 1 }
    ];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  if (cart.length === 0) {
    if (emptyContainer) emptyContainer.style.display = 'block';
    return;
  }

  if (emptyContainer) emptyContainer.style.display = 'none';

  // 清空旧内容（避免重复渲染）
  cartContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('cart-item');
    itemDiv.innerHTML = `
      <p><strong>${escapeHtml(item.name)}</strong></p>
      <p>价格：¥${item.price.toFixed(2)}</p>
      <p>
        数量：
        <button class="quantity-btn" data-action="decrease" data-index="${index}">−</button>
        <span class="quantity-value">${item.quantity}</span>
        <button class="quantity-btn" data-action="increase" data-index="${index}">+</button>
      </p>
      <p>小计：¥${subtotal.toFixed(2)}</p>
      <button onclick="removeItem(${index})">删除</button>
      <hr/>
    `;
    cartContainer.appendChild(itemDiv);
  });

  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<h3>总价：¥${total.toFixed(2)}</h3>`;
  cartContainer.appendChild(totalDiv);

  // ✅ 添加“去结款”按钮
  const checkoutBtn = document.createElement('button');
  checkoutBtn.textContent = '去结款';
  checkoutBtn.classList.add('checkout-btn');
  checkoutBtn.style.cssText = `
    padding: 10px 20px;
    font-size: 16px;
    margin-top: 10px;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 6px;
  `;
  checkoutBtn.addEventListener('click', showQRCode);
  cartContainer.appendChild(checkoutBtn);

  // 为所有加减按钮添加监听
  document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', handleQuantityChange);
  });
});

// 删除商品
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart'));
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

// 加减数量处理
function handleQuantityChange(event) {
  const btn = event.target;
  const index = parseInt(btn.dataset.index);
  const action = btn.dataset.action;

  let cart = JSON.parse(localStorage.getItem('cart'));
  if (action === 'increase') {
    cart[index].quantity += 1;
  } else if (action === 'decrease' && cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  location.reload();
}

// 显示二维码
function showQRCode() {
  if (document.getElementById('qrcode-container')) return;

  const qrContainer = document.createElement('div');
  qrContainer.id = 'qrcode-container';
  qrContainer.style.cssText = 'text-align: center; margin-top: 20px;';

  const qrImage = document.createElement('img');
  qrImage.src = '../img/applet.png';
  qrImage.alt = '支付二维码';
  qrImage.style.width = '200px';
  qrImage.style.height = '200px';

  qrContainer.appendChild(qrImage);
  document.getElementById('cart-container').appendChild(qrContainer);
}

// 防止 XSS
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function (match) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    }[match];
  });
}
