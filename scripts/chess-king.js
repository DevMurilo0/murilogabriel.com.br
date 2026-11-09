// A new, continuous Staunton turning. Coordinates are radius / height.
export function buildChessKing(THREE) {
  const profile = new THREE.Path();
  profile.moveTo(0, 0);
  profile.lineTo(.405, 0);
  profile.bezierCurveTo(.445, 0, .465, .018, .465, .045);
  profile.bezierCurveTo(.465, .062, .462, .074, .448, .079);
  profile.bezierCurveTo(.443, .084, .443, .094, .452, .100);
  profile.bezierCurveTo(.466, .117, .450, .143, .429, .158);
  profile.bezierCurveTo(.407, .177, .379, .195, .371, .222);
  profile.bezierCurveTo(.368, .233, .384, .239, .386, .251);
  profile.bezierCurveTo(.389, .268, .373, .282, .348, .284);
  profile.bezierCurveTo(.329, .287, .322, .300, .320, .314);
  profile.bezierCurveTo(.320, .327, .334, .330, .334, .342);
  profile.bezierCurveTo(.334, .357, .311, .366, .295, .367);
  profile.bezierCurveTo(.259, .382, .222, .465, .198, .552);
  profile.bezierCurveTo(.166, .666, .143, .834, .140, .968);
  profile.bezierCurveTo(.137, 1.110, .153, 1.219, .206, 1.281);
  profile.bezierCurveTo(.220, 1.299, .258, 1.305, .272, 1.317);
  profile.bezierCurveTo(.291, 1.330, .290, 1.350, .276, 1.362);
  profile.bezierCurveTo(.263, 1.375, .224, 1.376, .219, 1.389);
  profile.bezierCurveTo(.214, 1.400, .224, 1.407, .250, 1.410);
  profile.bezierCurveTo(.275, 1.412, .294, 1.424, .294, 1.440);
  profile.bezierCurveTo(.294, 1.461, .274, 1.468, .259, 1.473);
  profile.bezierCurveTo(.247, 1.480, .244, 1.499, .244, 1.518);
  profile.bezierCurveTo(.245, 1.578, .268, 1.626, .286, 1.679);
  profile.bezierCurveTo(.297, 1.704, .306, 1.717, .301, 1.733);
  profile.bezierCurveTo(.298, 1.748, .278, 1.758, .254, 1.759);
  profile.bezierCurveTo(.228, 1.760, .204, 1.760, .194, 1.773);
  profile.bezierCurveTo(.186, 1.786, .182, 1.801, .166, 1.811);
  profile.bezierCurveTo(.148, 1.824, .112, 1.826, .104, 1.843);
  profile.bezierCurveTo(.095, 1.855, .115, 1.870, .114, 1.891);
  profile.bezierCurveTo(.115, 1.927, .077, 1.953, .044, 1.956);
  profile.lineTo(0, 1.956);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x444950, roughness: .39, metalness: .10,
    clearcoat: .25, clearcoatRoughness: .30
  });
  const bodyGeometry = new THREE.LatheGeometry(profile.getPoints(8), 128);
  bodyGeometry.computeVertexNormals();
  const body = new THREE.Mesh(bodyGeometry, material);

  // Flared terminals, an integral stem, and rounded bevels catch the key light.
  const cross = new THREE.Shape();
  const outline = [
    [-.049,1.931],[.049,1.931],[.049,2.071],[.151,2.071],
    [.160,2.060],[.171,2.060],[.171,2.162],[.160,2.162],
    [.151,2.151],[.049,2.151],[.049,2.245],[.063,2.258],
    [.063,2.278],[-.063,2.278],[-.063,2.258],[-.049,2.245],
    [-.049,2.151],[-.151,2.151],[-.160,2.162],[-.171,2.162],
    [-.171,2.060],[-.160,2.060],[-.151,2.071],[-.049,2.071]
  ];
  outline.forEach(([x,y], i) => i ? cross.lineTo(x,y) : cross.moveTo(x,y));
  cross.closePath();
  const crossGeometry = new THREE.ExtrudeGeometry(cross, {
    depth: .073, steps: 1, bevelEnabled: true,
    bevelSegments: 5, bevelSize: .009, bevelThickness: .009, curveSegments: 12
  });
  crossGeometry.translate(0, 0, -.0365);
  crossGeometry.computeVertexNormals();
  const king = new THREE.Group();
  king.add(body, new THREE.Mesh(crossGeometry, material));
  king.children.forEach(mesh => {
    mesh.geometry.translate(0, -1.139, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  });
  return king;
}

export function initChessKing() {
  const canvas = document.querySelector('[data-chess-3d]');
  const fallback = document.querySelector('[data-chess-3d-fallback]');
  const about = document.querySelector('#sobre');
  const photo = document.querySelector('.about-photo');
  const title = document.querySelector('#stack-title');
  const stackSection = document.querySelector('#stack');
  if (!canvas || !fallback || !about || !photo || !title || !stackSection) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = t => t * t * (3 - 2 * t);
  const near = (a, b, tolerance = .2) => Math.abs(a - b) <= tolerance;
  let renderer = null;
  let scene = null;
  let king = null;
  let camera = null;
  let keyLight = null;
  let canvasSize = 440;
  let frame = 0;
  let previous = 0;
  let current = scrollY;
  let displayX = innerWidth + 120;
  let displayY = innerHeight * .7;
  let displayRotX = -.38;
  let displayRotY = -.55;
  let displayRotZ = 0;
  let displayScale = 1.62;
  let generation = 0;

  function size() {
    const next = innerWidth <= 900 ? Math.min(300, innerWidth * .78) : 440;
    if (Math.abs(next - canvasSize) < .5) return;
    canvasSize = next;
    fallback.style.width = next + 'px';
    fallback.style.height = next + 'px';
    if (renderer) renderer.setSize(next, next, false);
  }

  function show(active) {
    canvas.style.visibility = active && renderer ? 'visible' : 'hidden';
    fallback.style.visibility = active && !renderer ? 'visible' : 'hidden';
  }

  function draw(now) {
    frame = 0;
    if (document.hidden) return;
    const dt = Math.min((now - (previous || now - 16)) / 1000, .05);
    previous = now;
    current = mix(current, scrollY, 1 - Math.exp(-11 * dt));
    if (near(current, scrollY, .1)) current = scrollY;

    const pr = photo.getBoundingClientRect();
    const tr = title.getBoundingClientRect();
    const h = innerHeight;
    const start = about.offsetTop - h;
    const photoY = pr.top + scrollY + pr.height * .44;
    const meet = photoY - h * .48;
    const stackMeet = tr.top + scrollY + tr.height * .52 - h * .56;
    const mobile = innerWidth <= 900;
    const stackBottom = stackSection.offsetTop + stackSection.offsetHeight;
    const end = mobile ? stackBottom - h * .16 : stackMeet + h * .65;
    const path = mobile ? [
      [start, -canvasSize * .42, start + h * .58],
      [meet + h * .18, innerWidth * .10, meet + h * .74],
      [stackSection.offsetTop - h * .42, innerWidth * .76, stackSection.offsetTop + h * .18],
      [stackSection.offsetTop + stackSection.offsetHeight * .38 - h * .52, innerWidth * .79, stackSection.offsetTop + stackSection.offsetHeight * .38 + h * .14],
      [stackBottom - h * .72, innerWidth * .82, stackBottom],
      [end, innerWidth + canvasSize * .42, end + h * .72]
    ] : [
      [start, innerWidth + 100, start + h * .70],
      [mix(start, meet, .62), pr.right + 90, photoY - 65],
      [meet, pr.left + pr.width * .52, photoY],
      [meet + h * .25, pr.left - 65, photoY + 100],
      [stackMeet - h * .22, tr.left - 55, stackMeet + h * .56 - 35],
      [stackMeet, tr.left + tr.width * .42, stackMeet + h * .56],
      [end, innerWidth + 110, end + h * .50]
    ];

    // No movement in reduced-motion mode; the fallback stays anchored to the portrait.
    if (reducedMotion.matches) {
      const visible = pr.bottom > h * .1 && pr.top < h * .9;
      show(visible);
      if (visible) fallback.style.transform =
        'translate3d(' + (pr.left + pr.width * .55 - canvasSize / 2) + 'px,' +
        (pr.top + pr.height * .4 - canvasSize / 2) + 'px,0)';
      return;
    }

    const active = current >= start && current <= end;
    show(active);
    if (!active) return;

    let i = 0;
    while (i < path.length - 2 && current > path[i + 1][0]) i++;
    const a = path[i], b = path[i + 1];
    const progress = smooth(clamp((current - a[0]) / Math.max(1, b[0] - a[0]), 0, 1));
    const targetX = mix(a[1], b[1], progress);
    const targetY = mix(a[2], b[2], progress) - scrollY;
    const overall = clamp((current - start) / Math.max(1, end - start), 0, 1);
    const targetScale = (mobile ? 1.34 : 1.62) - .10 * Math.sin(overall * Math.PI);
    const targetRotX = -.38 + overall * Math.PI * 3.5;
    const targetRotY = -.55 + overall * Math.PI * 2.5;
    const targetRotZ = Math.sin(overall * Math.PI * 2) * .045;
    const posEase = 1 - Math.exp(-8.5 * dt);
    const rotEase = 1 - Math.exp(-6.5 * dt);
    displayX = mix(displayX, targetX, posEase);
    displayY = mix(displayY, targetY, posEase);
    displayRotX = mix(displayRotX, targetRotX, rotEase);
    displayRotY = mix(displayRotY, targetRotY, rotEase);
    displayRotZ = mix(displayRotZ, targetRotZ, rotEase);
    displayScale = mix(displayScale, targetScale, rotEase);

    const transform = 'translate3d(' + (displayX - canvasSize / 2) + 'px,' +
      (displayY - canvasSize / 2) + 'px,0)';
    if (renderer && scene && king) {
      canvas.style.transform = transform;
      king.scale.setScalar(displayScale);
      king.rotation.set(displayRotX, displayRotY, displayRotZ);
      renderer.render(scene, camera);
    } else {
      // Same scroll choreography, with a shaded SVG if WebGL is blocked or unsupported.
      fallback.style.transform = transform + ' rotate(' + (displayRotZ * 180 / Math.PI) + 'deg)';
    }

    const settled =
      near(current, scrollY, .15) &&
      near(displayX, targetX, .3) &&
      near(displayY, targetY, .3) &&
      near(displayRotX, targetRotX, .003) &&
      near(displayRotY, targetRotY, .003) &&
      near(displayRotZ, targetRotZ, .002) &&
      near(displayScale, targetScale, .002);
    if (!settled) frame = requestAnimationFrame(draw);
  }

  function schedule() {
    size();
    if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
  }

  function onVisibility() {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else { current = scrollY; previous = 0; schedule(); }
  }

  function disposeRenderer() {
    if (renderer) {
      const materials = new Set();
      scene.traverse(object => {
        object.geometry?.dispose();
        if (object.material) {
          for (const material of Array.isArray(object.material) ? object.material : [object.material])
            materials.add(material);
        }
      });
      materials.forEach(material => material.dispose());
      keyLight?.shadow?.dispose();
      renderer.dispose();
    }
    renderer = null;
    scene = null;
    king = null;
    camera = null;
    keyLight = null;
    show(false);
  }

  async function activate() {
    const ticket = ++generation;
    disposeRenderer();
    if (reducedMotion.matches) {
      schedule();
      return;
    }
    try {
      // Three.js 0.180 requires WebGL2. An unavailable GPU must not remove the piece.
      const preflight = document.createElement('canvas');
      const gl = preflight.getContext('webgl2');
      if (!gl) throw new Error('WebGL2 indisponível');
      gl.getExtension('WEBGL_lose_context')?.loseContext();

      const THREE = await import('https://esm.sh/three@0.180.0');
      if (ticket !== generation) return;
      const nextRenderer = new THREE.WebGLRenderer({
        canvas, alpha: true, antialias: true, powerPreference: 'low-power'
      });
      nextRenderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
      nextRenderer.setSize(canvasSize, canvasSize, false);
      nextRenderer.setClearColor(0, 0);
      nextRenderer.outputColorSpace = THREE.SRGBColorSpace;
      nextRenderer.toneMapping = THREE.ACESFilmicToneMapping;
      nextRenderer.toneMappingExposure = 1.2;
      nextRenderer.shadowMap.enabled = true;
      nextRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

      const nextScene = new THREE.Scene();
      const nextCamera = new THREE.OrthographicCamera(-2.25, 2.25, 2.25, -2.25, .1, 30);
      nextCamera.position.set(0, 0, 10);
      const nextKing = buildChessKing(THREE);
      nextScene.add(nextKing, new THREE.HemisphereLight(0xe4ebf5, 0x39332e, .65));
      const nextKey = new THREE.DirectionalLight(0xffffff, 3.6);
      nextKey.position.set(-3, 7, 6);
      nextKey.castShadow = true;
      nextKey.shadow.mapSize.set(1024, 1024);
      Object.assign(nextKey.shadow.camera, {left:-2.5,right:2.5,top:2.5,bottom:-2.5,near:.1,far:20});
      nextKey.shadow.bias = -.0003;
      nextKey.shadow.normalBias = .015;
      nextKey.shadow.radius = 3;
      const fill = new THREE.DirectionalLight(0xe0e9ff, .85);
      fill.position.set(4, 1.5, 3);
      const rim = new THREE.DirectionalLight(0xffffff, 2.8);
      rim.position.set(2, 3, -4);
      nextScene.add(nextKey, fill, rim);
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 8),
        new THREE.ShadowMaterial({opacity: .14})
      );
      ground.rotation.x = -Math.PI / 2.7;
      ground.position.set(0, -1.28, -.15);
      ground.receiveShadow = true;
      nextScene.add(ground);
      if (ticket !== generation) {
        nextScene.traverse(object => object.geometry?.dispose());
        nextRenderer.dispose();
        return;
      }
      renderer = nextRenderer;
      scene = nextScene;
      king = nextKing;
      camera = nextCamera;
      keyLight = nextKey;
      previous = 0;
      schedule();
    } catch (error) {
      if (ticket !== generation) return;
      // Browser privacy settings, GPU blocklists, extensions and network failures.
      console.info('Rei 3D: usando prévia de compatibilidade.', error);
      schedule();
    }
  }

  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  document.addEventListener('visibilitychange', onVisibility);
  const observer = new ResizeObserver(schedule);
  observer.observe(document.querySelector('main'));
  reducedMotion.addEventListener('change', activate);
  size();
  schedule();
  activate();
}
