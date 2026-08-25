export const vertexShaderSource = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

export const fragmentShaderSource = `
precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i); float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)); float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
void main() {
  vec2 uv = v_texCoord;
  vec3 baseColor = vec3(0.97, 0.96, 0.89);
  float n1 = noise(uv * 2.0 + u_time * 0.1);
  float n2 = noise(uv * 3.0 - u_time * 0.15);
  vec3 lila = vec3(0.79, 0.72, 1.0);
  vec3 blue = vec3(0.66, 0.84, 1.0);
  vec3 green = vec3(0.72, 0.93, 0.86);
  vec3 coral = vec3(1.0, 0.72, 0.70);
  vec3 color = baseColor;
  color = mix(color, lila, smoothstep(0.4, 0.7, n1));
  color = mix(color, blue, smoothstep(0.5, 0.8, n2));
  color = mix(color, green, smoothstep(0.3, 0.6, noise(uv * 1.5 + u_time * 0.05)));
  color = mix(color, coral, smoothstep(0.6, 0.9, noise(uv * 4.0 - u_time * 0.2)));
  float grain = (hash(uv + fract(u_time)) - 0.5) * 0.05;
  color += grain;
  gl_FragColor = vec4(color, 1.0);
}`;
