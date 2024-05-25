document.addEventListener("DOMContentLoaded", function() {
    const text1 = "Hi! I'm HyeongHan.";
    const text2 = "I observe the Universe through gravitational lenses.";
    const typewriterText1 = document.getElementById("typewriter-text");
    const typewriterText2 = document.getElementById("typewriter-text2");
    const cursor1 = document.getElementById("cursor1");
    const cursor2 = document.getElementById("cursor2");
    const nextButtonContainer = document.getElementById("next-button-container");
    const cvButtonContainer = document.getElementById("cv-button-container");
    const nextStepButtonContainer = document.getElementById("next-step-button-container");
    const nextButton = nextButtonContainer.querySelector('.button');
    const secondTypewriter = document.getElementById("second-typewriter");
    let index = 0;

    function createSpan(char) {
        const span = document.createElement('span');
        span.textContent = char;
        return span;
    }

    function updateCursorPosition(element, cursor) {
        if (element.lastChild) {
            const lastSpan = element.lastChild;
            const rect = lastSpan.getBoundingClientRect();
            cursor.style.left = `${lastSpan.offsetLeft + lastSpan.offsetWidth}px`;
            cursor.style.top = `${lastSpan.offsetTop}px`;
        }
    }

    function typeWriter(text, element, cursor, callback) {
        if (index < text.length) {
            const charSpan = createSpan(text.charAt(index));
            element.appendChild(charSpan);
            index++;
            updateCursorPosition(element, cursor);
            setTimeout(() => typeWriter(text, element, cursor, callback), 30);
        } else if (callback) {
            setTimeout(callback, 500); // Slight delay before calling the callback
        }
    }

    function showButton(container) {
        container.style.display = "flex";
    }

    nextButton.addEventListener("click", function() {
        cursor1.style.display = "none";
        cursor2.style.display = "inline";
        index = 0;
        nextButtonContainer.style.display = "none";
        secondTypewriter.style.display = "flex";
        typeWriter(text2, typewriterText2, cursor2, function() {
            showButton(cvButtonContainer);
            showButton(nextStepButtonContainer);
        });
    });

    setTimeout(() => typeWriter(text1, typewriterText1, cursor1, function() {
        showButton(nextButtonContainer);
    }), 500); // Delay before starting the typewriter

    window.addEventListener('resize', function() {
        updateCursorPosition(typewriterText1, cursor1);
        updateCursorPosition(typewriterText2, cursor2);
    });
});

