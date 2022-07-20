const scrollTopButton = document.getElementById("scrollTop");
const scrollDownButton = document.getElementById("scrollDown");
let opacity_scrollTopButton = 0;
let opacity_scrollDownButton = 0;
let intervalID = 0;
const fadeOutDelayTime = 2000;

// 일시정지 함수
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// 버튼 페이드 아웃 딜레이 기능
async function fadeOutDelay(ms) {
    await sleep(ms); // 2초 후
    clearInterval(intervalID);
    intervalID = setInterval(fadeOut, 50);
}

// TOP 버튼 클릭 시 동작
function topFunction() {
    window.scrollTo({
        top: 0,
    });
}

// BOTTOM 버튼 클릭 시 동작
function bottomFunction() {
    window.scrollTo({
        top: document.querySelector("body > bottom").offsetTop,
    });
}
// TOP 버튼 클릭 감지 시
scrollTopButton.addEventListener("click", () => {
    fadeIn();
    topFunction();
    fadeOutDelay(fadeOutDelayTime);
});

// BOTTOM 버튼 클릭 감지 시
scrollDownButton.addEventListener("click", () => {
    fadeIn();
    bottomFunction();
    fadeOutDelay(fadeOutDelayTime);
});

// 버튼 페이드 아웃 기능
function fadeOut() {
    opacity_scrollTopButton = Number(
        window.getComputedStyle(scrollTopButton).getPropertyValue("opacity")
    );
    opacity_scrollDownButton = Number(
        window.getComputedStyle(scrollDownButton).getPropertyValue("opacity")
    );
    if (opacity_scrollTopButton > 0 || opacity_scrollDownButton > 0) {
        opacity_scrollTopButton = opacity_scrollTopButton - 0.1;
        opacity_scrollDownButton = opacity_scrollDownButton - 0.1;
        scrollTopButton.style.opacity = opacity_scrollTopButton;
        scrollDownButton.style.opacity = opacity_scrollDownButton;
    } else {
        scrollTopButton.style.display = "none";
        scrollDownButton.style.display = "none";
        clearInterval(intervalID);
    }
}

// 버튼 페이드 인 기능
function fadeIn() {
    opacity_scrollTopButton = Number(
        window.getComputedStyle(scrollTopButton).getPropertyValue("opacity")
    );
    opacity_scrollDownButton = Number(
        window.getComputedStyle(scrollDownButton).getPropertyValue("opacity")
    );
    scrollTopButton.style.opacity = 1;
    scrollDownButton.style.opacity = 1;
    scrollTopButton.style.display = "block";
    scrollDownButton.style.display = "block";
    clearInterval(intervalID);
}

// 화면 스크롤 감지 시
window.addEventListener("scroll", () => {
    fadeIn();
    fadeOutDelay(fadeOutDelayTime);
});

// 버튼 페이드 아웃 기능 실행
fadeOutDelay(fadeOutDelayTime);
