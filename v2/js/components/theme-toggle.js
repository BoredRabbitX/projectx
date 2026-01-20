### `js/components/theme-toggle.js`

```javascript
/**
 * Theme Toggle Component
 * Gestisce il cambio tra dark e light mode
 */

function initThemeToggle() {
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = document.getElementById('theme-icon');
    
    if (!themeBtn || !themeIcon) return;

    let isLightMode = false;

    themeBtn.addEventListener('click', () => {
        isLightMode = !isLightMode;
        document.body.classList.toggle('light-mode');
        themeIcon.innerText = isLightMode ? '☾' : '☀';
        
        // Aggiorna shader se presente
        if (window.noiseMaterial) {
            window.noiseMaterial.uniforms.u_lightMode.value = isLightMode ? 1.0 : 0.0;
        }
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initThemeToggle };
}
```
