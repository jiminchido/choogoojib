'use strict'; // JavaScript 코드를 엄격 모드로 실행하여 잠재적인 오류 방지 및 더 나은 코드 작성 유도

// --- 스크롤 투 탑(Scroll-to-Top) 버튼 기능 ---
(function() {
    const scrollToTopBtn = document.getElementById("myBtn");

    /**
     * 스크롤 위치에 따라 상단으로 이동 버튼을 보이거나 숨깁니다.
     * @returns {void}
     */
    function toggleScrollToTopButton() {
        // document.documentElement.scrollTop은 대부분의 최신 브라우저에서 사용됩니다.
        // document.body.scrollTop은 구형 IE나 quirks 모드에서 사용될 수 있습니다.
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block"; // 버튼 보이기
        } else {
            scrollToTopBtn.style.display = "none"; // 버튼 숨기기
        }
    }

    /**
     * 페이지를 맨 위로 부드럽게 스크롤합니다.
     * @returns {void}
     */
    function smoothScrollToTop() {
        // window.scrollTo()와 behavior: 'smooth'를 사용하여 부드러운 스크롤 효과 구현
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 사용자가 스크롤할 때마다 버튼 가시성 토글 함수 실행
    window.addEventListener('scroll', toggleScrollToTopButton);

    // 버튼 클릭 시 페이지 맨 위로 스크롤
    // null 체크를 통해 버튼이 존재할 때만 이벤트 리스너를 추가합니다.
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', smoothScrollToTop);
    }
})();

// --- 슬라이드쇼(Slideshow) 기능 ---
(function() {
    // 각 슬라이드쇼의 현재 인덱스를 저장하는 배열
    // 예: slideIndices[0]은 mySlides1의 현재 인덱스, slideIndices[1]은 mySlides2의 현재 인덱스
    let slideIndices = [1, 1]; 
    // 각 슬라이드쇼의 HTML 클래스 ID를 저장하는 배열
    const slideshowClassIds = ["mySlides1", "mySlides2"];

    // 페이지 로드 시 모든 슬라이드쇼 초기화 및 첫 번째 슬라이드 표시
    // 0: mySlides1 (첫 번째 슬라이드쇼), 1: mySlides2 (두 번째 슬라이드쇼)
    showSlides(1, 0); // 첫 번째 슬라이드쇼 초기화
    showSlides(1, 1); // 두 번째 슬라이드쇼 초기화

    /**
     * 슬라이드를 이전/다음으로 이동시킵니다.
     * @param {number} n - 이동할 슬라이드 수 (1은 다음, -1은 이전)
     * @param {number} slideshowNo - 어떤 슬라이드쇼인지 나타내는 인덱스 (0 또는 1)
     * @returns {void}
     */
    window.plusSlides = function(n, slideshowNo) {
        showSlides(slideIndices[slideshowNo] += n, slideshowNo);
    };

    /**
     * 특정 슬라이드쇼의 지정된 슬라이드를 표시합니다.
     * @param {number} n - 표시할 슬라이드의 인덱스 (1부터 시작)
     * @param {number} slideshowNo - 어떤 슬라이드쇼인지 나타내는 인덱스 (0 또는 1)
     * @returns {void}
     */
    function showSlides(n, slideshowNo) {
        let slides = document.getElementsByClassName(slideshowClassIds[slideshowNo]);

        // 슬라이드 인덱스 유효성 검사 (범위 벗어날 시 처음 또는 마지막으로 순환)
        if (n > slides.length) {
            slideIndices[slideshowNo] = 1; // 마지막 슬라이드 넘어갔을 경우 첫 슬라이드로
        }
        if (n < 1) {
            slideIndices[slideshowNo] = slides.length; // 첫 슬라이드 이전으로 갔을 경우 마지막 슬라이드로
        }

        // 모든 슬라이드를 숨김
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // 현재 슬라이드만 표시
        slides[slideIndices[slideshowNo] - 1].style.display = "block";
    }
})();

// --- 부드러운 스크롤(Smooth Scroll) 앵커 기능 ---
(function() {
    // 'smooth-scroll' 클래스를 가진 모든 앵커 태그에 이벤트 리스너 추가
    document.querySelectorAll('a.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault(); // 기본 앵커 동작 (즉시 이동) 방지

            const targetId = this.getAttribute('href'); // href 속성에서 대상 ID 가져오기 (예: '#section1')
            const targetElement = document.querySelector(targetId); // ID에 해당하는 DOM 요소 찾기

            // 대상 요소가 존재하면 부드럽게 스크롤
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth' // 부드러운 스크롤 효과 적용
                });
            }
        });
    });
})();