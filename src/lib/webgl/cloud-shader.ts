// Domain-warped, low-frequency noise creates soft cloud volumes without textures.
export const cloudFragmentShader = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), f.x),
             mix(hash(i + vec2(0., 1.)), hash(i + vec2(1.)), f.x), f.y);
}
float fbm(vec2 p) {
  float value = 0., amplitude = .55;
  mat2 rotation = mat2(.8, -.6, .6, .8);
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p = rotation * p * 2.03 + 7.4;
    amplitude *= .45;
  }
  return value;
}
float density(vec2 p) {
  vec2 warp = vec2(fbm(p + 2.7), fbm(p + 9.2));
  return fbm(p + warp * 1.8);
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = (uv - .5) * vec2(u_resolution.x / u_resolution.y, 1.) * 2.8;
  p += vec2(u_time * .018, u_time * .007);
  float cloud = density(p);
  // Cloud banks frame a warm opening, inspired by the reference's sunset light.
  float sides = smoothstep(.1, .5, abs(uv.x - .5));
  float lower = 1. - smoothstep(.1, .65, uv.y);
  float volume = smoothstep(.25, .78, cloud + sides * .18 + lower * .14);
  float light = smoothstep(-.16, .16, cloud - density(p + vec2(-.13, .18)));
  vec3 salmon = vec3(.98, .69, .65);
  vec3 peach = vec3(1., .77, .62);
  vec3 cream = vec3(1., .91, .72);
  vec3 rose = vec3(.79, .52, .61);
  float glow = exp(-dot((uv - vec2(.52, .57)) * vec2(2.3, 1.7),
                       (uv - vec2(.52, .57)) * vec2(2.3, 1.7)) * 2.);
  vec3 sky = mix(salmon, peach, 1. - uv.y);
  sky = mix(sky, cream, glow * .85);
  vec3 cloudColor = mix(rose, peach, light);
  cloudColor = mix(cloudColor, cream, light * glow * .5);
  vec3 color = mix(sky, cloudColor, volume * (.85 - glow * .45));
  color = mix(color, vec3(1., .96, .90), .08);
  gl_FragColor = vec4(color, 1.);
}
`;
