'use client';
import { useEffect, useRef } from 'react';
import {
  fragmentShaderSource,
  vertexShaderSource,
} from '@/lib/webgl/shader-source';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import styles from './OrganicShader.module.css';

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function OrganicShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;
    const vertex = compile(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertex || !fragment) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.useProgram(program);
    const buffer = gl.createBuffer();
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
    let visible = true;
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.round(canvas.clientWidth * ratio);
      const height = Math.round(canvas.clientHeight * ratio);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };
    const render = (timestamp: number) => {
      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(time, reduced ? 0 : timestamp * 0.001);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduced && visible) frame = requestAnimationFrame(render);
    };
    const onVisibility = () => {
      visible = document.visibilityState === 'visible';
      cancelAnimationFrame(frame);
      if (visible && !reduced) frame = requestAnimationFrame(render);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [reduced]);
  return (
    <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
  );
}
