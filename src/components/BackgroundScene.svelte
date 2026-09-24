<script>
  import { onMount } from "svelte";

  export let paused = false;
  let canvas;
  let updatePlayback = () => {};
  $: updatePlayback(paused);

  onMount(() => {
    const context = canvas.getContext("2d");
    if (!context) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let width = 0;
    let height = 0;
    let scroll = window.scrollY;
    let pointer = { x: 0, y: 0 };
    let camera = { x: 0, y: 0 };
    let points = [];
    let stopped = paused;
    let disposed = false;

    // Real XYZ coordinates projected through a perspective camera.
    const vertices = [
      [-1,-1,-1], [1,-1,-1], [1,1,-1], [-1,1,-1],
      [-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1],
    ];
    const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    const shapes = [
      { x: -.39, y: -.24, z: 120, size: 90, speed: .13 },
      { x: .38, y: .20, z: 30, size: 115, speed: -.10 },
      { x: -.25, y: .43, z: 210, size: 65, speed: .17 },
    ];
    const moving = () => !stopped && !preference.matches && !document.hidden;

    function project(x, y, z, angle) {
      const yaw = angle + camera.x * .14;
      const pitch = camera.y * .12 + .25;
      const rx = x * Math.cos(yaw) - z * Math.sin(yaw);
      const rz = x * Math.sin(yaw) + z * Math.cos(yaw);
      const ry = y * Math.cos(pitch) - rz * Math.sin(pitch);
      const depth = y * Math.sin(pitch) + rz * Math.cos(pitch);
      const scale = 650 / (850 + depth);
      return { x: width / 2 + rx * scale, y: height / 2 + ry * scale, scale };
    }

    function draw() {
      context.clearRect(0, 0, width, height);
      const angle = elapsed * .025 + scroll * .000035;
      const projected = points.map(p => project(p.x, p.y, p.z, angle));
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const q = projected[j];
          const distance = Math.hypot(p.x - q.x, p.y - q.y);
          if (distance < 125) {
            context.strokeStyle = `rgba(173,145,245,${(1-distance/125)*.13})`;
            context.lineWidth = .7;
            context.beginPath();
            context.moveTo(p.x, p.y);
            context.lineTo(q.x, q.y);
            context.stroke();
          }
        }
        context.fillStyle = `rgba(193,174,255,${Math.min(.55, p.scale*.48)})`;
        context.beginPath();
        context.arc(p.x, p.y, Math.max(.7, p.scale * 1.6), 0, Math.PI * 2);
        context.fill();
      }
      for (const shape of shapes) {
        const size = shape.size * Math.min(1, width / 800);
        const rotation = elapsed * shape.speed + scroll * .00012;
        const cube = vertices.map(([x,y,z]) => {
          const a = x * Math.cos(rotation) - z * Math.sin(rotation);
          const b = x * Math.sin(rotation) + z * Math.cos(rotation);
          const c = y * Math.cos(rotation*.6) - b * Math.sin(rotation*.6);
          const d = y * Math.sin(rotation*.6) + b * Math.cos(rotation*.6);
          return project(a*size + shape.x*width, c*size + shape.y*height, d*size + shape.z, .08);
        });
        context.strokeStyle = "rgba(168,139,250,.19)";
        context.lineWidth = 1;
        for (const [a,b] of edges) {
          context.beginPath();
          context.moveTo(cube[a].x, cube[a].y);
          context.lineTo(cube[b].x, cube[b].y);
          context.stroke();
        }
      }
    }

    function tick(time) {
      frame = 0;
      if (!moving() || disposed) return;
      if (time - lastTime >= 1000 / 30) {
        elapsed += Math.min((time - lastTime) / 1000, .05);
        lastTime = time;
        camera.x += (pointer.x-camera.x)*.045;
        camera.y += (pointer.y-camera.y)*.045;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }

    function sync() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (disposed) return;
      if (moving()) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      } else {
        camera = { x: 0, y: 0 };
        draw();
      }
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(devicePixelRatio || 1, width < 640 ? 1.25 : 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      // Deterministic positions keep the scene stable across resizes.
      points = Array.from({ length: width < 640 ? 42 : 76 }, (_, i) => ({
        x: (Math.sin(i * 127.1) * .5) * width * 2,
        y: (Math.cos(i * 311.7) * .5) * height * 2,
        z: Math.sin(i * 74.7) * 350,
      }));
      draw();
    }
    function onPointer(event) {
      if (event.pointerType === "touch" || !moving()) return;
      pointer = { x: event.clientX / width * 2 - 1, y: event.clientY / height * 2 - 1 };
    }
    function resetPointer() { pointer = { x: 0, y: 0 }; }
    function onScroll() { if (moving()) scroll = window.scrollY; }
    updatePlayback = value => { stopped = value; sync(); };
    resize();
    sync();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", resetPointer);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      updatePlayback = () => {};
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", resetPointer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
    };
  });
</script>

<div class="scene-background" aria-hidden="true">
  <div class="scene-glow scene-glow-one"></div>
  <div class="scene-glow scene-glow-two"></div>
  <canvas bind:this={canvas}></canvas>
  <div class="scene-vignette"></div>
</div>
