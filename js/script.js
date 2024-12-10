gsap.registerPlugin(ScrollTrigger);

// 전역 변수 설정
let sections = gsap.utils.toArray(".parallax__item");
let currentIndex = 0;
let isAnimating = false; // 애니메이션 진행 여부 플래그

/* 서비스 워커 업데이트 */
if ("serviceWorker" in navigator) {
  console.log("Service Worker is supported by this browser.");
  if (!localStorage.getItem("serviceWorkerUnregistered")) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });
    localStorage.setItem("serviceWorkerUnregistered", "true");
    window.location.href =
      window.location.href.split("?")[0] + "?no-cache=" + new Date().getTime();
  }
}

// 섹션 변경 함수
function changeSection(direction) {
  if (isAnimating) return;

  if (direction === "next" && currentIndex < sections.length - 1) {
    currentIndex++;
  } else if (direction === "prev" && currentIndex > 0) {
    currentIndex--;
  } else {
    return;
  }

  isAnimating = true;

  gsap.to("#parallax__cont", {
    x: -currentIndex * window.innerWidth,
    duration: 2,
    ease: "power1.inOut",
    onComplete: () => {
      isAnimating = false;
      animateText(sections[currentIndex]);
    },
  });
}

// 텍스트 애니메이션 함수
function animateText(section) {
  const textElement = section.querySelector("text");
  if (textElement) {
    gsap.fromTo(
      textElement,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }
}

// 휠 이벤트 리스너
window.addEventListener("wheel", (event) => {
  if (event.deltaY > 0) {
    changeSection("next");
  } else if (event.deltaY < 0) {
    changeSection("prev");
  }
});

// 키보드 이벤트 리스너
window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    changeSection("next");
  }
});

// IntersectionObserver로 섹션 상태 감지
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const iframe = entry.target.querySelector("iframe");

        if (entry.isIntersecting) {
          console.log(`${entry.target.id} 보임`);
          if (iframe) {
            iframe.contentWindow.postMessage(
              '{"event":"command","func":"playVideo","args":""}',
              "*"
            );
          }
        } else {
          console.log(`${entry.target.id} 벗어남`);
          if (iframe) {
            iframe.contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              "*"
            );
          }
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));
});

// YouTube IFrame API 초기화
function onYouTubeIframeAPIReady() {
  const sectionCount = 6;
  const playerInstances = {};

  for (let i = 1; i <= sectionCount; i++) {
    const iframeId = `youtubePlayer${i}`;
    const iframeElement = document.getElementById(iframeId);

    if (iframeElement) {
      playerInstances[iframeId] = new YT.Player(iframeId, {
        events: {
          onReady: (event) => {
            console.log(`${iframeId} YouTube Player Ready`);
          },
        },
      });
    }
  }
}

// YouTube API 스크립트 로드
const script = document.createElement("script");
script.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(script);

// Typed.js 애니메이션
document.addEventListener("DOMContentLoaded", () => {
  new Typed(".thx", {
    strings: ["Thanks For Watching", "봐주셔서 감사합니다."],
    typeSpeed: 150,
    backSpeed: 150,
    backDelay: 1000,
    loop: true,
  });
});
