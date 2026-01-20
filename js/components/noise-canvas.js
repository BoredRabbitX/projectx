(function () {
  window.PolkadotItalia = window.PolkadotItalia || {};

  var _material = null;
  var _pendingLightMode = null;

  function initNoiseCanvas(opts) {
    opts = opts || {};
    var canvas = document.getElementById(opts.canvasId || "noiseCanvas");
    if (!canvas) return null;
    if (!window.THREE) return null;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    var scene = new THREE.Scene();
    var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    var material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
        u_resolution: { value: new THREE.Vector2() },
        u_lightMode: { value: 0.0 },
      },
      vertexShader: "void main() { gl_Position = vec4(position, 1.0); }",
      fragmentShader:
        "precision highp float;\n" +
        "uniform float u_time;\n" +
        "uniform vec2 u_mouse;\n" +
        "uniform vec2 u_resolution;\n" +
        "uniform float u_lightMode;\n" +
        "float random(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }\n" +
        "void main() {\n" +
        "  vec2 uv = gl_FragCoord.xy / u_resolution.xy;\n" +
        "  float n = random(uv + fract(u_time * 0.15));\n" +
        "  float dist = distance(uv, vec2(u_mouse.x, 1.0 - u_mouse.y));\n" +
        "  float shadow = smoothstep(0.1, 0.8, dist);\n" +
        "  vec3 color;\n" +
        "  if(u_lightMode > 0.5) {\n" +
        "    float grain = mix(0.0, 0.20, n);\n" +
        "    color = vec3(0.95) - vec3(grain) - (shadow * 0.12);\n" +
        "  } else {\n" +
        "    float grain = mix(0.0, 0.12, n);\n" +
        "    color = vec3(grain) - (shadow * 0.15);\n" +
        "  }\n" +
        "  gl_FragColor = vec4(color, 1.0);\n" +
        "}\n",
    });

    _material = material;
    window.material = material; // backward-compat with old inline code

    // apply pending light/dark preference if it was set before init
    if (_pendingLightMode !== null && material.uniforms.u_lightMode) {
      material.uniforms.u_lightMode.value = _pendingLightMode ? 1.0 : 0.0;
    }

    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.u_resolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
    }

    window.addEventListener("resize", resize);
    resize();

    window.addEventListener("mousemove", function (e) {
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
    return material;
  }

  function setNoiseLightMode(isLight) {
    _pendingLightMode = !!isLight;

    if (_material && _material.uniforms && _material.uniforms.u_lightMode) {
      _material.uniforms.u_lightMode.value = isLight ? 1.0 : 0.0;
    } else if (window.material && window.material.uniforms) {
      window.material.uniforms.u_lightMode.value = isLight ? 1.0 : 0.0;
    }
  }

  window.PolkadotItalia.initNoiseCanvas = initNoiseCanvas;
  window.PolkadotItalia.setNoiseLightMode = setNoiseLightMode;
})();

