### `js/components/noise-canvas.js`

```javascript
/**
 * Noise Canvas Component
 * WebGL shader per effetto noise animato
 */

function initNoiseCanvas() {
    const canvas = document.getElementById('noiseCanvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0 },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
            u_resolution: { value: new THREE.Vector2() },
            u_lightMode: { value: 0.0 }
        },
        vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
        fragmentShader: `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_mouse;
            uniform vec2 u_resolution;
            uniform float u_lightMode;

            float random(vec2 p) { 
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); 
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                float n = random(uv + fract(u_time * 0.15)); 
                float dist = distance(uv, vec2(u_mouse.x, 1.0 - u_mouse.y));
                float shadow = smoothstep(0.1, 0.8, dist);

                vec3 color;
                if(u_lightMode > 0.5) {
                    color = vec3(0.95) - vec3(mix(0.0, 0.20, n)) - (shadow * 0.12);
                } else {
                    color = vec3(mix(0.0, 0.12, n)) - (shadow * 0.15);
                }
                
                gl_FragColor = vec4(color, 1.0);
            }
        `
    });

    // Rendi accessibile globalmente per theme toggle
    window.noiseMaterial = material;

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    function resize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        material.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        material.uniforms.u_mouse.value.set(
            e.clientX / window.innerWidth, 
            e.clientY / window.innerHeight
        );
    });

    function animate(time) {
        material.uniforms.u_time.value = time * 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initNoiseCanvas };
}
```
