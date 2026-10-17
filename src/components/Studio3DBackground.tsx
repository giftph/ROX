import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Studio3DBackgroundProps {
  accentColor: string;
  versionAbv: number; // 2, 4, or 6
}

export const Studio3DBackground: React.FC<Studio3DBackgroundProps> = ({
  accentColor,
  versionAbv,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    haloMesh: THREE.Mesh;
    haloMaterial: THREE.ShaderMaterial;
    particles: THREE.Points;
    backlight: THREE.PointLight;
    rimLightLeft: THREE.DirectionalLight;
    rimLightRight: THREE.DirectionalLight;
    topLight: THREE.SpotLight;
    pedestalGroup: THREE.Group;
    monolithsGroup: THREE.Group;
    floorMesh: THREE.Mesh;
    targetColor: THREE.Color;
    currentColor: THREE.Color;
    animId: number;
  } | null>(null);

  // Update target lighting on product change
  useEffect(() => {
    if (!sceneRef.current) return;
    const { targetColor, backlight, rimLightLeft, rimLightRight } = sceneRef.current;
    targetColor.set(accentColor);

    if (versionAbv === 2) {
      rimLightLeft.intensity = 1.6;
      rimLightRight.intensity = 1.3;
      backlight.intensity = 2.2;
    } else if (versionAbv === 4) {
      rimLightLeft.intensity = 2.2;
      rimLightRight.intensity = 1.8;
      backlight.intensity = 3.0;
    } else {
      // 6%
      rimLightLeft.intensity = 2.8;
      rimLightRight.intensity = 2.3;
      backlight.intensity = 3.8;
    }
  }, [accentColor, versionAbv]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect prefers-reduced-motion & mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Setup Three.js Scene - 100% Transparent background integration
    const scene = new THREE.Scene();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0.6, 6.0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Completely transparent canvas
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // 1. Volumetric Atmospheric Purple Halo Disc behind the bottle (Additive, soft falloff)
    const haloGeo = new THREE.PlaneGeometry(7.0, 7.0);
    const haloMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(accentColor) },
        uIntensity: { value: 0.8 },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uIntensity;
        uniform float uTime;
        varying vec2 vUv;
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float d = distance(vUv, center);
          // Soft radial falloff with gentle breathing motion
          float pulse = 1.0 + 0.04 * sin(uTime * 1.6);
          float alpha = smoothstep(0.52 * pulse, 0.02, d) * uIntensity;
          gl_FragColor = vec4(uColor, alpha * 0.4);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMaterial);
    haloMesh.position.set(0, 0.3, -1.8);
    scene.add(haloMesh);

    // 2. Subtle Floating Atmospheric Bokeh & Micro-Sparks in 3D Depth
    const particleCount = isMobile ? 40 : 90;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const opacities = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 8; // X spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5; // Y spread
      positions[i * 3 + 2] = -1.5 + (Math.random() - 0.5) * 4; // Z depth
      scales[i] = Math.random() * 0.04 + 0.02;
      opacities[i] = Math.random() * 0.5 + 0.2;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle sprite texture created programmatically (soft round glow point)
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(192, 132, 252, 0.7)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color(accentColor),
      opacity: 0.65,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. Architectural Monoliths in Background (Perspective & studio depth)
    const monolithsGroup = new THREE.Group();
    const monolithMat = new THREE.MeshStandardMaterial({
      color: 0x09090d,
      roughness: 0.55,
      metalness: 0.45,
    });
    const edgeTrimMat = new THREE.MeshStandardMaterial({
      color: 0xd8d8e6,
      roughness: 0.2,
      metalness: 0.9,
    });

    // Monolith Left
    const monoLeftGeo = new THREE.BoxGeometry(1.6, 6.0, 0.4);
    const monoLeft = new THREE.Mesh(monoLeftGeo, monolithMat);
    monoLeft.position.set(-3.2, 1.2, -3.2);
    monoLeft.rotation.y = Math.PI * 0.08;
    monolithsGroup.add(monoLeft);

    const trimLeftGeo = new THREE.BoxGeometry(0.04, 6.0, 0.42);
    const trimLeft = new THREE.Mesh(trimLeftGeo, edgeTrimMat);
    trimLeft.position.set(-2.4, 1.2, -3.15);
    trimLeft.rotation.y = Math.PI * 0.08;
    monolithsGroup.add(trimLeft);

    // Monolith Right
    const monoRightGeo = new THREE.BoxGeometry(1.4, 5.5, 0.3);
    const monoRight = new THREE.Mesh(monoRightGeo, monolithMat);
    monoRight.position.set(3.4, 0.9, -2.8);
    monoRight.rotation.y = -Math.PI * 0.06;
    monolithsGroup.add(monoRight);

    const trimRightGeo = new THREE.BoxGeometry(0.04, 5.5, 0.32);
    const trimRight = new THREE.Mesh(trimRightGeo, edgeTrimMat);
    trimRight.position.set(2.7, 0.9, -2.75);
    trimRight.rotation.y = -Math.PI * 0.06;
    monolithsGroup.add(trimRight);

    // Deeper offset slab
    const monoDeepGeo = new THREE.BoxGeometry(2.0, 4.8, 0.2);
    const monoDeep = new THREE.Mesh(monoDeepGeo, monolithMat);
    monoDeep.position.set(-0.8, 1.8, -4.5);
    monoDeep.rotation.y = 0.04;
    monolithsGroup.add(monoDeep);

    scene.add(monolithsGroup);

    // 4. Polished Floor Plane
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      roughness: 0.35,
      metalness: 0.35,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.35;
    scene.add(floorMesh);

    // 5. Minimalist Circular Exhibition Pedestal
    const pedestalGroup = new THREE.Group();

    // Base Tier
    const baseGeo = new THREE.CylinderGeometry(1.9, 2.05, 0.28, 64);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x0e0e13,
      roughness: 0.45,
      metalness: 0.3,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -1.21;
    pedestalGroup.add(baseMesh);

    // Chrome Accent Ring
    const chromeRingGeo = new THREE.CylinderGeometry(1.82, 1.82, 0.04, 64);
    const chromeRingMat = new THREE.MeshStandardMaterial({
      color: 0xd8d8e2,
      roughness: 0.15,
      metalness: 0.95,
    });
    const chromeRing = new THREE.Mesh(chromeRingGeo, chromeRingMat);
    chromeRing.position.y = -1.07;
    pedestalGroup.add(chromeRing);

    // Top Platform Tier
    const topGeo = new THREE.CylinderGeometry(1.8, 1.8, 0.1, 64);
    const topMat = new THREE.MeshStandardMaterial({
      color: 0x07070a,
      roughness: 0.2,
      metalness: 0.6,
    });
    const topMesh = new THREE.Mesh(topGeo, topMat);
    topMesh.position.y = -1.02;
    pedestalGroup.add(topMesh);

    scene.add(pedestalGroup);

    // 6. Ambient & Studio Accent Lights
    const ambientLight = new THREE.AmbientLight(0x0c0c14, 0.7);
    scene.add(ambientLight);

    const backlight = new THREE.PointLight(new THREE.Color(accentColor), 3.0, 10);
    backlight.position.set(0, 0.4, -1.2);
    scene.add(backlight);

    const rimLightLeft = new THREE.DirectionalLight(0xd8b4fe, 2.0);
    rimLightLeft.position.set(-3.5, 2.5, 2);
    scene.add(rimLightLeft);

    const rimLightRight = new THREE.DirectionalLight(0xe0e7ff, 1.8);
    rimLightRight.position.set(3.5, 2.5, 2);
    scene.add(rimLightRight);

    const topLight = new THREE.SpotLight(0xffffff, 1.2, 15, Math.PI / 6, 0.4);
    topLight.position.set(0, 5, 2);
    topLight.target = topMesh;
    scene.add(topLight);

    // Dynamic color interpolation
    const currentColor = new THREE.Color(accentColor);
    const targetColor = new THREE.Color(accentColor);

    // Mouse movement handler for parallax
    const handlePointerMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    if (!prefersReducedMotion && !isMobile) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Render Loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      const delta = (time - lastTime) * 0.001;
      lastTime = time;

      // Smooth mouse damping
      const dampingFactor = prefersReducedMotion ? 0.02 : 0.04;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * dampingFactor;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * dampingFactor;

      // Camera parallax
      const camTargetX = mouseRef.current.x * 0.35;
      const camTargetY = 0.6 - mouseRef.current.y * 0.2;
      camera.position.x += (camTargetX - camera.position.x) * 0.05;
      camera.position.y += (camTargetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0.2, 0);

      // Subtle particle float & drift
      if (particles) {
        particles.rotation.y = time * 0.00015;
        particles.position.x = -mouseRef.current.x * 0.12;
        particles.position.y = mouseRef.current.y * 0.08;
      }

      // Smooth color transition on version switch
      currentColor.lerp(targetColor, 0.06);
      backlight.color.copy(currentColor);
      haloMaterial.uniforms.uColor.value.copy(currentColor);
      particleMat.color.copy(currentColor);

      // Light breathing animation
      haloMaterial.uniforms.uTime.value = time * 0.001;

      renderer.render(scene, camera);
      sceneRef.current!.animId = requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      haloMesh,
      haloMaterial,
      particles,
      backlight,
      rimLightLeft,
      rimLightRight,
      topLight,
      pedestalGroup,
      monolithsGroup,
      floorMesh,
      targetColor,
      currentColor,
      animId,
    };

    // Cleanup on unmount
    return () => {
      if (!prefersReducedMotion && !isMobile) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
      window.removeEventListener('resize', handleResize);

      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animId);
        renderer.dispose();
        haloGeo.dispose();
        haloMaterial.dispose();
        particleGeo.dispose();
        particleMat.dispose();
        particleTexture.dispose();
        monoLeftGeo.dispose();
        monoRightGeo.dispose();
        monoDeepGeo.dispose();
        trimLeftGeo.dispose();
        trimRightGeo.dispose();
        monolithMat.dispose();
        edgeTrimMat.dispose();
        floorGeo.dispose();
        floorMat.dispose();
        baseGeo.dispose();
        baseMat.dispose();
        chromeRingGeo.dispose();
        chromeRingMat.dispose();
        topGeo.dispose();
        topMat.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    />
  );
};
