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
  const about = document.querySelector('#sobre');
  const photo = document.querySelector('.about-photo');
  const title = document.querySelector('#stack-title');
  const stackSection = document.querySelector('#stack');
  if (!canvas || !about || !photo || !title || !stackSection) return;
  const eligible = matchMedia('(prefers-reduced-motion: no-preference)');
  let dispose = null;
  let generation = 0;

  async function activate() {
    const ticket = ++generation;
    dispose?.();
    dispose = null;
    canvas.style.visibility = 'hidden';
    if (!eligible.matches) return;
    try {
      const THREE = await import('https://esm.sh/three@0.180.0');
      if (ticket !== generation) return;
      const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true, powerPreference:'low-power'});
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
      let canvasSize = innerWidth <= 900 ? Math.min(300, innerWidth * .78) : 440;
      renderer.setSize(canvasSize, canvasSize, false);
      renderer.setClearColor(0, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-2.25,2.25,2.25,-2.25,.1,30);
      camera.position.set(0,0,10);
      const king = buildChessKing(THREE);
      scene.add(king);
      scene.add(new THREE.HemisphereLight(0xe4ebf5,0x39332e,.65));
      const key = new THREE.DirectionalLight(0xffffff,3.6);
      key.position.set(-3,7,6);
      key.castShadow = true;
      key.shadow.mapSize.set(1024,1024);
      Object.assign(key.shadow.camera,{left:-2.5,right:2.5,top:2.5,bottom:-2.5,near:.1,far:20});
      key.shadow.bias = -.0003;
      key.shadow.normalBias = .015;
      key.shadow.radius = 3;
      const fill = new THREE.DirectionalLight(0xe0e9ff,.85);
      fill.position.set(4,1.5,3);
      const rim = new THREE.DirectionalLight(0xffffff,2.8);
      rim.position.set(2,3,-4);
      scene.add(key,fill,rim);
      const ground = new THREE.Mesh(new THREE.PlaneGeometry(8,8),new THREE.ShadowMaterial({opacity:.14}));
      ground.rotation.x = -Math.PI / 2.7;
      ground.position.set(0,-1.28,-.15);
      ground.receiveShadow = true;
      scene.add(ground);

      let frame = 0;
      let previous = 0;
      let current = scrollY;
      let displayX = innerWidth + 100;
      let displayY = innerHeight * .7;
      let displayProgress = 0;
      let displayRotX = -.38;
      let displayRotY = -.55;
      let displayRotZ = 0;
      let displayScale = 1.62;
      const clamp = THREE.MathUtils.clamp;
      const mix = THREE.MathUtils.lerp;
      const smooth = t => t*t*(3-2*t);
      const almostEqual = (a, b, epsilon = .1) => Math.abs(a - b) <= epsilon;

      function render(now) {
        frame = 0;
        if (document.hidden) return;
        const dt = Math.min((now - (previous || now - 16)) / 1000, .05);
        previous = now;

        // Softer scroll catch-up for a more fluid feeling.
        current = mix(current, scrollY, 1 - Math.exp(-11 * dt));
        if (Math.abs(current - scrollY) < .1) current = scrollY;

        const pr = photo.getBoundingClientRect();
        const tr = title.getBoundingClientRect();
        const h = innerHeight;
        const start = about.offsetTop - h;
        const photoY = pr.top + scrollY + pr.height * .44;
        const meet = photoY - h * .48;
        const stackMeet = tr.top + scrollY + tr.height * .52 - h * .56;
        const mobile = innerWidth <= 900;
        const stackBottom = stackSection.offsetTop + stackSection.offsetHeight;
        const mobileEnd = stackBottom - h * .16;
        const end = mobile ? mobileEnd : stackMeet + h * .65;

        const mobileStage1 = start;
        const mobileStage2 = meet + h * .18;
        const mobileStage3 = stackSection.offsetTop - h * .42;
        const mobileStage4 = stackSection.offsetTop + stackSection.offsetHeight * .38 - h * .52;
        const mobileStage5 = stackBottom - h * .72;

        const path = mobile ? [
          // Mobile only: enter from the LEFT through Sobre. Once Stack begins,
          // move to the RIGHT side and stay there while rotating, then exit right.
          [mobileStage1, -canvasSize * .42, mobileStage1 + h * .58],
          [mobileStage2, innerWidth * .10, mobileStage2 + h * .56],
          [mobileStage3, innerWidth * .76, mobileStage3 + h * .60],
          [mobileStage4, innerWidth * .79, mobileStage4 + h * .66],
          [mobileStage5, innerWidth * .82, mobileStage5 + h * .72],
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

        const active = current >= start && current <= end;
        canvas.style.visibility = active ? 'visible' : 'hidden';

        let targetX = displayX;
        let targetY = displayY;
        let targetProgress = displayProgress;
        let targetRotX = displayRotX;
        let targetRotY = displayRotY;
        let targetRotZ = displayRotZ;
        let targetScale = displayScale;

        if (active) {
          let i = 0;
          while (i < path.length - 2 && current > path[i + 1][0]) i++;
          const a = path[i], b = path[i + 1];
          const t = smooth(clamp((current - a[0]) / (b[0] - a[0]), 0, 1));
          targetX = mix(a[1], b[1], t);
          targetY = mix(a[2], b[2], t) - scrollY;
          targetProgress = clamp((current - start) / (end - start), 0, 1);
          const scalePulse = Math.sin(targetProgress * Math.PI);
          targetScale = (innerWidth <= 900 ? 1.34 : 1.62) - .10 * scalePulse;
          targetRotX = -.38 + targetProgress * Math.PI * 3.5;
          targetRotY = -.55 + targetProgress * Math.PI * 2.5;
          targetRotZ = Math.sin(targetProgress * Math.PI * 2) * .045;
        }

        // Damped transforms for less rigid movement and smoother easing between segments.
        const motionEase = 1 - Math.exp(-8.5 * dt);
        const rotationEase = 1 - Math.exp(-6.5 * dt);
        displayX = mix(displayX, targetX, motionEase);
        displayY = mix(displayY, targetY, motionEase);
        displayProgress = mix(displayProgress, targetProgress, 1 - Math.exp(-6 * dt));
        displayScale = mix(displayScale, targetScale, rotationEase);
        displayRotX = mix(displayRotX, targetRotX, rotationEase);
        displayRotY = mix(displayRotY, targetRotY, rotationEase);
        displayRotZ = mix(displayRotZ, targetRotZ, rotationEase);

        if (active || !almostEqual(displayX, targetX, .3) || !almostEqual(displayY, targetY, .3)) {
          const halfCanvas = canvasSize / 2;
          canvas.style.transform = `translate3d(${displayX - halfCanvas}px,${displayY - halfCanvas}px,0)`;
          king.scale.setScalar(displayScale);
          king.rotation.x = displayRotX;
          king.rotation.y = displayRotY;
          king.rotation.z = displayRotZ;
          renderer.render(scene, camera);
        }

        const settled =
          almostEqual(current, scrollY, .15) &&
          almostEqual(displayX, targetX, .3) &&
          almostEqual(displayY, targetY, .3) &&
          almostEqual(displayRotX, targetRotX, .003) &&
          almostEqual(displayRotY, targetRotY, .003) &&
          almostEqual(displayRotZ, targetRotZ, .002) &&
          almostEqual(displayScale, targetScale, .002);

        if (!settled) frame = requestAnimationFrame(render);
      }

      function syncCanvasSize() {
        const nextSize = innerWidth <= 900 ? Math.min(300, innerWidth * .78) : 440;
        if (Math.abs(nextSize - canvasSize) > .5) {
          canvasSize = nextSize;
          renderer.setSize(canvasSize, canvasSize, false);
        }
      }

      function schedule() {
        syncCanvasSize();
        if (!frame && !document.hidden) frame = requestAnimationFrame(render);
      }

      function visibility() {
        if(document.hidden){cancelAnimationFrame(frame);frame=0;}
        else {current=scrollY;previous=0;schedule();}
      }

      addEventListener('scroll',schedule,{passive:true});
      addEventListener('resize',schedule);
      document.addEventListener('visibilitychange',visibility);
      const observer = new ResizeObserver(schedule);
      observer.observe(document.querySelector('main'));
      dispose = () => {
        cancelAnimationFrame(frame);
        removeEventListener('scroll',schedule);
        removeEventListener('resize',schedule);
        document.removeEventListener('visibilitychange',visibility);
        observer.disconnect();
        const materials = new Set();
        scene.traverse(object=>{object.geometry?.dispose();if(object.material)materials.add(object.material);});
        materials.forEach(material=>material.dispose());
        key.shadow.dispose();
        renderer.dispose();
      };
      schedule();
    } catch(error) {
      dispose?.();
      canvas.style.visibility='hidden';
      console.warn('Rei 3D indisponível:',error);
    }
  }
  eligible.addEventListener('change',activate);
  activate();
}
