### `js/utils/observers.js`

```javascript
/**
 * Intersection Observers
 * Gestisce le animazioni fade-in al scroll
 */

function initFadeObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-section').forEach(section => {
        observer.observe(section);
    });
}

// Observer specifico per stats con contatori
function initStatsObserver() {
    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Avvia contatori se disponibili
                if (typeof startCounters === 'function') {
                    startCounters();
                }
            }
        });
    }, { threshold: 0.2 });

    observer.observe(statsContainer);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initFadeObserver, initStatsObserver };
}
```
