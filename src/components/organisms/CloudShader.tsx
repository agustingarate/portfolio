'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cloudFragmentShader } from '@/lib/webgl/cloud-shader';
import styles from './EducationTimeline.module.css';

export function CloudShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;
    const shaders: WebGLShader[] = [];
    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(
      gl.VERTEX_SHADER,
      `attribute vec2 a_position;
      void main() { gl_Position = vec4(a_position, 0., 1.); }`,
    );
    const fragment = compile(gl.FRAGMENT_SHADER, cloudFragmentShader);
    const program = gl.createProgram();
    const buffer = gl.createBuffer();
    const dispose = () => {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
    };
    if (!vertex || !fragment || !program || !buffer) {
      dispose();
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      dispose();
      return;
    }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const time = gl.getUniformLocation(program, 'u_time');
    const resolution = gl.getUniformLocation(program, 'u_resolution');
    let frame = 0;
    let visible = false;
    let elapsed = 0;
    let previous = 0;
    const draw = () => {
      // A deliberately soft, capped buffer keeps the procedural background inexpensive.
      const scale = Math.min(
        1,
        960 / Math.max(canvas.clientWidth, canvas.clientHeight),
      );
      const width = Math.max(1, Math.round(canvas.clientWidth * scale));
      const height = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(time, reduced ? 0 : elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      canvas.style.opacity = '1';
    };
    const render = (timestamp: number) => {
      if (previous) elapsed += Math.min((timestamp - previous) / 1000, 0.1);
      previous = timestamp;
      draw();
      frame = requestAnimationFrame(render);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !document.hidden) {
        draw();
        if (!reduced) frame = requestAnimationFrame(render);
      }
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const resize = new ResizeObserver(sync);
    intersection.observe(canvas);
    resize.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    const lost = (event: Event) => {
      event.preventDefault();
      cancelAnimationFrame(frame);
      canvas.style.opacity = '0';
    };
    canvas.addEventListener('webglcontextlost', lost);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', sync);
      canvas.removeEventListener('webglcontextlost', lost);
      canvas.style.opacity = '0';
      dispose();
    };
  }, [reduced]);

  return (
    <canvas ref={canvasRef} className={styles.cloudCanvas} aria-hidden="true" />
  );
}
