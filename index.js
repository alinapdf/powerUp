// theme

const body = document.body;
const darkIcons = document.querySelectorAll(".img-dark");
const whiteIcons = document.querySelectorAll(".img-white");
const headerChangeTheme = document.querySelector(".header__change-theme");
const changeThemeBtns = document.querySelectorAll(
  ".header__change-theme button"
);

function updateIcons() {
  if (body.classList.contains("dark")) {
    darkIcons.forEach((icon) => (icon.style.display = "none"));
    whiteIcons.forEach((icon) => (icon.style.display = "block"));
  } else {
    whiteIcons.forEach((icon) => (icon.style.display = "none"));
    darkIcons.forEach((icon) => (icon.style.display = "block"));
  }
}

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    body.classList.remove("white");
    headerChangeTheme.classList.add("dark-theme");
    headerChangeTheme.classList.remove("white-theme");
  } else {
    body.classList.add("white");
    body.classList.remove("dark");
    headerChangeTheme.classList.add("white-theme");
    headerChangeTheme.classList.remove("dark-theme");
  }

  localStorage.setItem("theme", theme);
  updateIcons();
}

function checkUserTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? "dark" : "white");
  }
}

checkUserTheme();

changeThemeBtns.forEach((button) => {
  button.addEventListener("click", function () {
    const theme = button.dataset.theme;
    setTheme(theme);
  });
});

// change language

const langButtons = document.querySelectorAll(".language-selection__btn");
const langElements = document.querySelectorAll("[data-lang]");

function setLanguage(lang) {
  if (!languages[lang]) return;

  langElements.forEach((el) => {
    const key = el.dataset.lang;
    if (languages[lang][key]) {
      el.textContent = languages[lang][key];
    }
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle("language__active", btn.value === lang);
  });

  localStorage.setItem("language", lang);
}

function checkUserLanguage() {
  const savedLanguage = localStorage.getItem("language");
  const browserLanguage = navigator.language.startsWith("pl") ? "pl" : "eng";

  setLanguage(savedLanguage || browserLanguage);
}

checkUserLanguage();

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.value);
  });
});

// burger menu

const header = document.querySelector(".header");
const bugrenBtn = document.querySelector(".header__nav-btn");

bugrenBtn.addEventListener("click", () => {
  header.classList.toggle("header--mobile");
});
