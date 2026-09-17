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
  if (!canvas || !about || !photo || !title) return;
  const eligible = matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
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
      renderer.setSize(180, 180, false);
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
      const clamp = THREE.MathUtils.clamp;
      const mix = THREE.MathUtils.lerp;
      const smooth = t => t*t*(3-2*t);
      function render(now) {
        frame = 0;
        if (document.hidden) return;
        const dt = Math.min((now - (previous || now-16))/1000,.05);
        previous = now;
        current = mix(current,scrollY,1-Math.exp(-18*dt));
        if (Math.abs(current-scrollY)<.1) current=scrollY;
        const pr = photo.getBoundingClientRect();
        const tr = title.getBoundingClientRect();
        const h = innerHeight;
        const start = about.offsetTop-h;
        const photoY = pr.top+scrollY+pr.height*.44;
        const meet = photoY-h*.48;
        const stackMeet = tr.top+scrollY+tr.height*.52-h*.56;
        const end = stackMeet+h*.65;
        // Document-space anchors keep occlusion aligned with the actual elements.
        const path = [
          [start,innerWidth+100,start+h*.70],
          [mix(start,meet,.62),pr.right+90,photoY-65],
          [meet,pr.left+pr.width*.52,photoY],
          [meet+h*.25,pr.left-65,photoY+100],
          [stackMeet-h*.22,tr.left-55,stackMeet+h*.56-35],
          [stackMeet,tr.left+tr.width*.42,stackMeet+h*.56],
          [end,innerWidth+110,end+h*.50]
        ];
        const active = current>=start && current<=end;
        canvas.style.visibility = active ? 'visible' : 'hidden';
        if (active) {
          let i=0;
          while(i<path.length-2 && current>path[i+1][0]) i++;
          const a=path[i], b=path[i+1];
          const t=smooth(clamp((current-a[0])/(b[0]-a[0]),0,1));
          const x=mix(a[1],b[1],t);
          const y=mix(a[2],b[2],t)-scrollY;
          const p=clamp((current-start)/(end-start),0,1);
          canvas.style.transform=`translate3d(${x-90}px,${y-90}px,0)`;
          king.rotation.set(-.30+p*.75,-.20+p*.25,0);
          king.scale.setScalar(.98-.08*Math.sin(p*Math.PI));
          renderer.render(scene,camera);
        }
        if(current!==scrollY) frame=requestAnimationFrame(render);
      }
      function schedule() {
        if (!frame && !document.hidden) frame=requestAnimationFrame(render);
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
