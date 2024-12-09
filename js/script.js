document.addEventListener("DOMContentLoaded", () => {
  const loadingPage = document.getElementById("loading-page");
  const progressBar = document.querySelector(".progress");
  const mainContent = document.getElementById("main-content");

  let progress = 0;

  const interval = setInterval(() => {
    progress += 5;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);

      // 로딩 창 페이드아웃
      loadingPage.style.opacity = "0";
      loadingPage.style.visibility = "hidden";

      // 본문 페이드인
      setTimeout(() => {
        mainContent.classList.add("visible");
        mainContent.classList.remove("hidden");
      }, 1000); // 로딩 창이 사라진 후 1초 후에 본문 표시
    }
  }, 100); // 진행률 100ms마다 업데이트
});

document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scroll for Navigation Links
  const navLinks = document.querySelectorAll("header .nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").slice(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 60, // Header height adjustment
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll Animation
  const sections = document.querySelectorAll("section");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < windowHeight - 100) {
        section.classList.add("visible");
      } else {
        section.classList.remove("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run on page load
});

document.querySelectorAll(".underLine").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    const video = item.querySelector("video");
    video.play();
  });

  item.addEventListener("mouseleave", () => {
    const video = item.querySelector("video");
    video.pause();
  });
});

//영어 눌렀을 때 화면 설정
document.addEventListener("DOMContentLoaded", () => {
  const videoElement = document.getElementById("video-element");
  const textMaskSVG = document.getElementById("text-mask-svg");

  // 초기 상태 설정
  videoElement.style.display = "block"; // 동영상 표시
  textMaskSVG.style.display = "block"; // 마스킹 표시

  // 동영상 자동 재생 (muted 상태로 보장)
  videoElement.play().catch((error) => {
    console.error("Autoplay failed:", error);
  });

  // A 글자를 클릭했을 때 동영상 풀스크린 전환
  textMaskSVG.addEventListener("click", (event) => {
    event.stopPropagation(); // 이벤트 전파 방지

    videoElement.muted = false; // 소리 켜기
    videoElement.style.display = "block"; // 동영상 표시
    videoElement.classList.add("fullscreen-video"); // 풀스크린 스타일 적용
    textMaskSVG.style.display = "none"; // 마스킹 숨기기
  });

  // 풀스크린 상태에서 화면 아무 곳이나 클릭하면 원래 상태로 복귀
  document.addEventListener("click", () => {
    videoElement.muted = true; // 소리 끄기
    videoElement.style.display = "block"; // 동영상 표시
    videoElement.classList.remove("fullscreen-video"); // 풀스크린 스타일 제거
    textMaskSVG.style.display = "block"; // 마스킹 보이기
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const iframeElement = document.getElementById("iframe-youtubePlayer");

  if (iframeElement) {
    // 드래그 이벤트 차단
    iframeElement.addEventListener("dragstart", (event) => {
      event.preventDefault();
      console.log("iframe 드래그 차단됨");
    });
  }
});
