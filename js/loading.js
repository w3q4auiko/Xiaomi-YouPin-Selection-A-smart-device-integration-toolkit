window.addEventListener("DOMContentLoaded", () => {
  // 1. 模拟加载
  setTimeout(() => {
    document.getElementById("loading-icon").classList.add("fade-out");
    setTimeout(() => {
      document.getElementById("loading-icon").style.display = "none";
      document.getElementById("login").classList.remove("hidden");
    }, 500);
  }, 500);

  // 2. Tab切换
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginBtn = document.querySelector(".login");
  const signupBtn = document.querySelector(".signup");

  // URL 控制 tab 默认显示
  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");
  switchTab(tab || "login");

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    switchTab("login");
  });

  signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    switchTab("signup");
  });

  // 3. 模拟登录逻辑
  loginForm.onsubmit = function (e) {
    e.preventDefault();
    const username = document.getElementById("user").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === mockUser.username && password === mockUser.password) {
      alert("登录成功！");
      window.location.href = "../index.html";
    } else {
      alert("账号或密码错误！");
    }
  };

  // 4. 输入框浮动动画逻辑（解决你说的“文字不浮动”问题）
  document.querySelectorAll(".input-container input").forEach((input) => {
    const container = input.parentElement;

    if (input.value.trim() !== "") {
      container.classList.add("focused");
    }

    input.addEventListener("focus", () => {
      container.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (input.value.trim() === "") {
        container.classList.remove("focused");
      }
    });
  });
});

// 模拟账户数据
const mockUser = {
  username: "admin",
  password: "admin",
};

// 封装 tab 切换函数
function switchTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginBtn = document.querySelector(".login");
  const signupBtn = document.querySelector(".signup");

  if (tab === "signup") {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    loginBtn.classList.remove("active");
    signupBtn.classList.add("active");

    setTimeout(() => {
      signupForm.classList.add("form-visible");
      loginForm.classList.remove("form-visible");
    }, 10);
  } else {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    signupBtn.classList.remove("active");
    loginBtn.classList.add("active");

    setTimeout(() => {
      loginForm.classList.add("form-visible");
      signupForm.classList.remove("form-visible");
    }, 10);
  }
}
