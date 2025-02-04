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

// main change phase
function changeLanguageAndUpdateText(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
  currentPhaseIndex = 0;
  changePhrase();
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedLang = button.value;
    changeLanguageAndUpdateText(selectedLang);
  });
});

let currentLanguage =
  localStorage.getItem("language") ||
  (navigator.language.startsWith("pl") ? "pl" : "eng");

let currentPhaseIndex = 0;
const phraseElement = document.querySelector(".dynamic-phrase");
const phraseWrapper = document.querySelector(".phrase-wrapper");

function changePhrase() {
  phraseWrapper.style.top = "-100%";

  setTimeout(() => {
    const currentPhaseKey = `phase-${currentPhaseIndex + 1}`;
    const currentPhrase = languages[currentLanguage][currentPhaseKey];

    phraseElement.textContent = currentPhrase;
    phraseElement.setAttribute("data-lang", currentPhaseKey);

    phraseWrapper.style.top = "0";
    phraseElement.style.opacity = 1;

    currentPhaseIndex =
      (currentPhaseIndex + 1) % Object.keys(languages[currentLanguage]).length;
  }, 500);

  setTimeout(() => {
    phraseWrapper.style.top = "100%";
    phraseElement.style.opacity = 0;
  }, 2500);
}

setInterval(changePhrase, 3000);

changePhrase();

// map

var map = L.map("map", {
  center: [52.2328870943528, 20.896613431747067],
  zoom: 13,
  scrollWheelZoom: false,
  dragging: false,
  zoomControl: false,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var customIcon = L.icon({
  iconUrl: "img/map__point.svg",
  iconSize: [38, 50],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

var marker = L.marker([52.2328870943528, 20.896613431747067], {
  icon: customIcon,
})
  .addTo(map)
  .bindPopup("Это кастомный поинт!");

var marker2 = L.marker([52.2428870943528, 20.906613431747067], {
  icon: customIcon,
})
  .addTo(map)
  .bindPopup("Второй кастомный поинт!");

map.on("click", function () {
  map.dragging.enable();
  map.zoomControl.enable();
  map.scrollWheelZoom.enable();
});

// download app swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 7,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  spaceBetween: 10,
  speed: 1000,
  breakpoints: {
    650: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

// validation

document
  .querySelector(".form__btn")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll(".input__wrapper");
    inputs.forEach((inputWrapper) => {
      inputWrapper.classList.remove(
        "input__wrapper-validate",
        "input__wrapper-error"
      );
      const errorSpan = inputWrapper.querySelector(".input__error");
      if (errorSpan) errorSpan.textContent = "";
    });

    let isValid = true;

    const nameInput = document.getElementById("name");
    const nameWrapper = document.querySelector(".input__wrapper-first");
    const nameError = nameWrapper.querySelector(".input__error");
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
      nameWrapper.classList.add("input__wrapper-error");
      nameError.textContent = "Name is required.";
      isValid = false;
    } else if (nameValue.length < 2 || nameValue.length > 20) {
      nameWrapper.classList.add("input__wrapper-error");
      nameError.textContent = "Name must be between 2 and 20 characters.";
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      nameWrapper.classList.add("input__wrapper-error");
      nameError.textContent = "Name must only contain letters.";
      isValid = false;
    } else {
      nameWrapper.classList.add("input__wrapper-validate");
    }

    const emailOrPhoneInput = document.getElementById("e-mail-or-phone");
    const emailOrPhoneWrapper = document.querySelector(
      ".input__wrapper-second"
    );
    const emailOrPhoneError =
      emailOrPhoneWrapper.querySelector(".input__error");
    const emailOrPhoneValue = emailOrPhoneInput.value.trim();

    if (emailOrPhoneValue === "") {
      emailOrPhoneWrapper.classList.add("input__wrapper-error");
      emailOrPhoneError.textContent = "Email or phone number is required.";
      isValid = false;
    } else if (
      /^\d+$/.test(emailOrPhoneValue) ||
      /^[\+]*\d+$/.test(emailOrPhoneValue)
    ) {
      const phoneRegex = /^(\+?\d{10,15})$/;
      if (!phoneRegex.test(emailOrPhoneValue)) {
        emailOrPhoneWrapper.classList.add("input__wrapper-error");
        emailOrPhoneError.textContent =
          "Phone number must be 10-15 digits, with or without '+' sign.";
        isValid = false;
      } else {
        emailOrPhoneWrapper.classList.add("input__wrapper-validate");
      }
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(emailOrPhoneValue)) {
        emailOrPhoneWrapper.classList.add("input__wrapper-error");
        emailOrPhoneError.textContent = "Please enter a valid email address.";
        isValid = false;
      } else {
        emailOrPhoneWrapper.classList.add("input__wrapper-validate");
      }
    }

    if (isValid) {
      // то тут можно отправлять форму
    }
  });
