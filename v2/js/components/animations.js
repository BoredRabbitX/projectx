### `js/utils/animations.js`

```javascript
/**
 * Animations Utilities
 * Funzioni per animazioni e effetti
 */

// Animazione sottotitoli rotanti (homepage)
function initSubtitleRotation() {
    const subs = document.querySelectorAll('.subtitle-item');
    if (subs.length === 0) return;

    let currentSub = 0;
    
    setInterval(() => {
        subs[currentSub].classList.remove('active');
        currentSub = (currentSub + 1) % subs.length;
        subs[currentSub].classList.add('active');
    }, 4000);
}

// Animazione contatori (tecnologia.html)
function startCounters() {
    const counters = document.querySelectorAll('.count');
    
    counters.forEach(counter => {
        if (counter.innerText !== "0") return;
        
        const target = +counter.getAttribute('data-target');
        let count = 0;
        
        const update = () => {
            if (count < target) {
                count += target / 50;
                counter.innerText = Math.ceil(count);
                setTimeout(update, 30);
            } else {
                counter.innerText = target;
            }
        };
        
        update();
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initSubtitleRotation, startCounters };
}
```
