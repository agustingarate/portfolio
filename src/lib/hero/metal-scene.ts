import * as THREE from 'three';
import { argentina } from './map-shape';

const SEGMENTS = 240;
const SIDES = 24;
const ease = (p: number) => p * p * p * (p * (p * 6 - 15) + 10);
function progressAt(time: number) {
  const phase = time % 10;
  if (phase < 2.5) return 0;
  if (phase < 4.2) return ease((phase - 2.5) / 1.7);
  if (phase < 7.7) return 1;
  if (phase < 9.4) return 1 - ease((phase - 7.7) / 1.7);
  return 0;
}

function ringPoints(index: number) {
  return Array.from({ length: 96 }, (_, i) => {
    const angle = Math.PI / 2 - (i / 96) * Math.PI * 2;
    const radius = 1.64;
    if (index < 3) {
      const longitude = index === 0 ? 0 : index === 1 ? 1.02 : -1.02;
      return new THREE.Vector3(
        Math.cos(angle) * radius * Math.cos(longitude),
        Math.sin(angle) * radius,
        Math.cos(angle) * radius * Math.sin(longitude),
      );
    }
    const latitude = (index - 4) * 0.52;
    return new THREE.Vector3(
      Math.cos(angle) * radius * Math.cos(latitude),
      Math.sin(latitude) * radius,
      Math.sin(angle) * radius * Math.cos(latitude),
    );
  });
}

function tube(points: THREE.Vector3[], radius: number) {
  return new THREE.TubeGeometry(
    new THREE.CatmullRomCurve3(points, true, 'centripetal'),
    SEGMENTS,
    radius,
    SIDES,
    true,
  );
}

// Match the circular cross-sections before morphing to avoid twisted/pinched tubes.
function addMorph(source: THREE.TubeGeometry, target: THREE.TubeGeometry) {
  const positions = target.attributes.position.clone();
  const normals = target.attributes.normal.clone();
  const sourceNormal = new THREE.Vector3();
  const normal = new THREE.Vector3();
  const axisU = new THREE.Vector3();
  const axisV = new THREE.Vector3();
  const center = new THREE.Vector3();
  const radius = target.parameters.radius;
  for (let ring = 0; ring <= SEGMENTS; ring++) {
    const start = ring * (SIDES + 1);
    sourceNormal.fromBufferAttribute(source.attributes.normal, start);
    axisU.fromBufferAttribute(target.attributes.normal, start);
    axisV.fromBufferAttribute(target.attributes.normal, start + SIDES / 4);
    center
      .fromBufferAttribute(target.attributes.position, start)
      .addScaledVector(axisU, -radius);
    // Continuous angular alignment avoids snapping to a discrete polygon side.
    const offset = Math.atan2(sourceNormal.dot(axisV), sourceNormal.dot(axisU));
    for (let side = 0; side <= SIDES; side++) {
      const angle = offset + (side / SIDES) * Math.PI * 2;
      normal
        .copy(axisU)
        .multiplyScalar(Math.cos(angle))
        .addScaledVector(axisV, Math.sin(angle))
        .normalize();
      positions.setXYZ(
        start + side,
        center.x + normal.x * radius,
        center.y + normal.y * radius,
        center.z + normal.z * radius,
      );
      normals.setXYZ(start + side, normal.x, normal.y, normal.z);
    }
  }
  // Share the exact closing section: no hairline opening at the loop seam.
  for (let side = 0; side <= SIDES; side++) {
    const end = SEGMENTS * (SIDES + 1) + side;
    positions.setXYZ(
      end,
      positions.getX(side),
      positions.getY(side),
      positions.getZ(side),
    );
    normals.setXYZ(
      end,
      normals.getX(side),
      normals.getY(side),
      normals.getZ(side),
    );
  }
  source.morphAttributes.position = [positions];
  source.morphAttributes.normal = [normals];
  // Culling must include both ends of the morph (the map is taller).
  source.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3);
}

function studioEnvironment(renderer: THREE.WebGLRenderer) {
  const studio = new THREE.Scene();
  studio.background = new THREE.Color('#03040a');
  const geometry = new THREE.PlaneGeometry(1, 1);
  const cards: THREE.MeshBasicMaterial[] = [];
  const panel = (
    color: string,
    power: number,
    position: [number, number, number],
    width: number,
    height: number,
  ) => {
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(power),
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.set(width, height, 1);
    mesh.lookAt(0, 0, 0);
    studio.add(mesh);
    cards.push(material);
  };
  panel('#9ed7ff', 7.5, [-3, 2, 3], 2.5, 4);
  panel('#f49dce', 7, [3, 0.5, 2], 2, 3.5);
  panel('#9beacb', 6, [-1, -3, 1], 3, 1.5);
  panel('#a78cf8', 6, [1, 2, -3], 2, 3);
  // Each broad softbox contains two smaller, saturated lights. The close hues
  // remain part of the same reflection while producing richer bands as the
  // environment rotates across the metal.
  panel('#36a7ff', 10, [-2.88, 2.14, 2.88], 0.52, 1.35);
  panel('#77dcff', 8.5, [-2.78, 1.58, 2.78], 0.42, 0.78);
  panel('#ff3f9d', 10, [2.88, 0.78, 1.92], 0.48, 1.08);
  panel('#ff8dcc', 8.5, [2.78, -0.05, 1.84], 0.42, 0.82);
  panel('#2ed69e', 8.5, [-1.2, -2.88, 1.05], 0.92, 0.34);
  panel('#86ffd0', 7.5, [-0.35, -2.8, 0.82], 0.64, 0.28);
  panel('#7f4dff', 9, [0.78, 1.92, -2.88], 0.5, 0.92);
  panel('#bd70ff', 8, [1.35, 1.72, -2.78], 0.4, 0.72);
  panel('#ffffff', 11, [-1, 3, 1], 1.6, 0.5);
  panel('#fff0e7', 9, [3, -1, -1], 0.6, 2);
  const generator = new THREE.PMREMGenerator(renderer);
  const environment = generator.fromScene(studio, 0.025);
  generator.dispose();
  geometry.dispose();
  cards.forEach((material) => material.dispose());
  return environment;
}

// Small HDR highlight blur. Transparent compositing keeps the hero visible and
// the brightness threshold restricts the glow to actual reflected light.
const compositeFragment = `
  uniform sampler2D sceneTexture;
  uniform vec2 texel;
  varying vec2 vUv;
  vec3 peak(vec2 uv) {
    vec3 c = texture2D(sceneTexture, uv).rgb;
    float brightness = max(c.r, max(c.g, c.b));
    return c * smoothstep(1.0, 2.8, brightness);
  }
  vec3 tone(vec3 x) {
    return clamp((x * (2.51 * x + 0.03)) / (x * (2.43 * x + 0.59) + 0.14), 0.0, 1.0);
  }
  void main() {
    vec4 base = texture2D(sceneTexture, vUv);
    vec3 glow = vec3(0.0);
    for (int i = 0; i < 12; i++) {
      float angle = float(i) * 2.399963;
      float radius = sqrt((float(i) + 0.5) / 12.0) * 6.0;
      glow += peak(vUv + vec2(cos(angle), sin(angle)) * texel * radius);
    }
    glow *= 0.20 / 12.0;
    float haloAlpha = clamp(max(glow.r, max(glow.g, glow.b)) * 0.3, 0.0, 0.28);
    float alpha = base.a + (1.0 - base.a) * haloAlpha;
    vec3 color = tone(base.rgb / max(base.a, 0.001) + glow);
    color = mix(vec3(0.75, 0.83, 0.9), color, base.a);
    gl_FragColor = vec4(color, alpha);
    #include <colorspace_fragment>
    gl_FragColor.rgb *= alpha;
  }
`;

export function createMetalScene(canvas: HTMLCanvasElement, reduced: boolean) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NoToneMapping;
  const scene = new THREE.Scene();
  let environment = studioEnvironment(renderer);
  scene.environment = environment.texture;
  const camera = new THREE.OrthographicCamera(-2.2, 2.2, 2.85, -2.85, 0.1, 30);
  camera.position.z = 10;
  const group = new THREE.Group();
  scene.add(group);
  const map = argentina.map(
    (point) => new THREE.Vector3((point.x - 0.5) * 4, (0.65 - point.y) * 4, 0),
  );
  const material = new THREE.MeshPhysicalMaterial({
    color: '#777e91',
    metalness: 1,
    roughness: 0.22,
    clearcoat: 0.8,
    clearcoatRoughness: 0.16,
    envMapIntensity: 1.1,
  });
  const meshes = Array.from({ length: 6 }, (_, index) => {
    const geometry = tube(ringPoints(index), index === 0 ? 0.082 : 0.052);
    const target = tube(map, index === 0 ? 0.082 : 0.052);
    addMorph(geometry, target);
    target.dispose();
    const mesh = new THREE.Mesh(
      geometry,
      index === 0 ? material : material.clone(),
    );
    if (index > 0) {
      mesh.material.transparent = true;
      mesh.material.depthWrite = false;
    }
    group.add(mesh);
    return mesh;
  });
  const target = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    samples: Math.min(4, renderer.capabilities.maxSamples),
  });
  const compositeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      sceneTexture: { value: target.texture },
      texel: { value: new THREE.Vector2(1, 1) },
    },
    vertexShader:
      'varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }',
    fragmentShader: compositeFragment,
    depthTest: false,
    depthWrite: false,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), compositeMaterial);
  const outputScene = new THREE.Scene();
  outputScene.add(quad);
  const outputCamera = new THREE.Camera();
  let frame = 0;
  let time = 0;
  let last = 0;
  let inView = false;
  let lost = false;
  let disposed = false;
  const draw = () => {
    const progress = reduced ? 1 : progressAt(time);
    for (let index = 0; index < meshes.length; index++) {
      const mesh = meshes[index];
      mesh.morphTargetInfluences![0] = progress;
      if (index > 0) {
        mesh.material.opacity = 1 - ease(Math.min(1, progress / 0.84));
        mesh.visible = mesh.material.opacity > 0.01;
        mesh.material.depthWrite = mesh.material.opacity > 0.98;
      }
    }
    group.rotation.set(
      (1 - progress) * 0.16 + Math.sin(time * 0.58) * 0.08,
      Math.sin(time * 0.46) * 0.22,
      0.12 * (1 - progress) + Math.sin(time * 0.39) * 0.04,
    );
    group.position.y = Math.sin(time * 0.7) * 0.045;
    scene.environmentRotation.set(
      Math.sin(time * 0.31) * 0.22,
      time * 0.21,
      Math.sin(time * 0.27) * 0.15,
    );
    renderer.setRenderTarget(target);
    renderer.render(scene, camera);
    renderer.setRenderTarget(null);
    renderer.render(outputScene, outputCamera);
  };
  const tick = (now: number) => {
    if (disposed || lost) return;
    if (!last || now - last >= 1000 / 60 - 1) {
      time += last ? Math.min(now - last, 50) / 1000 : 0;
      last = now;
      draw();
    }
    frame = requestAnimationFrame(tick);
  };
  const schedule = () => {
    cancelAnimationFrame(frame);
    last = 0;
    if (
      !disposed &&
      !lost &&
      inView &&
      document.visibilityState === 'visible'
    ) {
      if (reduced) draw();
      else frame = requestAnimationFrame(tick);
    }
  };
  const resize = () => {
    if (disposed || lost) return;
    const { width, height } = canvas.getBoundingClientRect();
    const ratio = Math.min(Math.max(window.devicePixelRatio || 1, 2), 2.5);
    renderer.setPixelRatio(ratio);
    renderer.setSize(width, height, false);
    target.setSize(
      Math.max(1, Math.round(width * ratio)),
      Math.max(1, Math.round(height * ratio)),
    );
    compositeMaterial.uniforms.texel.value.set(
      1 / target.width,
      1 / target.height,
    );
    const halfHeight = Math.max(2.85, (2.15 * height) / Math.max(1, width));
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.right = (halfHeight * width) / Math.max(1, height);
    camera.left = -camera.right;
    camera.updateProjectionMatrix();
    draw();
  };
  const onLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    cancelAnimationFrame(frame);
  };
  const onRestored = () => {
    environment.dispose();
    environment = studioEnvironment(renderer);
    scene.environment = environment.texture;
    lost = false;
    resize();
    schedule();
  };
  const intersection = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      schedule();
    },
    { threshold: 0.05 },
  );
  const observer = new ResizeObserver(resize);
  resize();
  observer.observe(canvas);
  intersection.observe(canvas);
  document.addEventListener('visibilitychange', schedule);
  canvas.addEventListener('webglcontextlost', onLost);
  canvas.addEventListener('webglcontextrestored', onRestored);
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    intersection.disconnect();
    document.removeEventListener('visibilitychange', schedule);
    canvas.removeEventListener('webglcontextlost', onLost);
    canvas.removeEventListener('webglcontextrestored', onRestored);
    meshes.forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    environment.dispose();
    target.dispose();
    quad.geometry.dispose();
    compositeMaterial.dispose();
    renderer.dispose();
  };
}
