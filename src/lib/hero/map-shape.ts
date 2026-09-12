type Point = { x: number; y: number };

const POINT_COUNT = 96;

// Simplified from Natural Earth's public-domain 1:50m Argentina boundary.
const argentinaCoordinates: readonly [number, number][] = [
  [-65.933, -21.945],
  [-64.185, -22.471],
  [-62.349, -22.471],
  [-61.62, -23.283],
  [-60.423, -23.989],
  [-58.336, -24.992],
  [-57.875, -25.876],
  [-58.288, -26.769],
  [-57.855, -27.298],
  [-55.985, -27.332],
  [-54.807, -26.661],
  [-54.437, -25.685],
  [-53.883, -25.713],
  [-53.81, -27.101],
  [-54.543, -27.487],
  [-55.178, -27.854],
  [-55.897, -28.407],
  [-57.292, -29.815],
  [-58.19, -31.913],
  [-58.447, -34.001],
  [-57.447, -35.071],
  [-57.377, -37.715],
  [-62.093, -38.902],
  [-62.196, -39.307],
  [-62.374, -40.476],
  [-64.052, -41.007],
  [-65, -41.793],
  [-64.039, -42.158],
  [-65.012, -42.732],
  [-65.229, -43.975],
  [-65.283, -44.493],
  [-65.704, -44.801],
  [-66.336, -45.044],
  [-67.423, -46.567],
  [-66.274, -47.859],
  [-66.468, -48.4],
  [-67.653, -49.377],
  [-68.829, -49.982],
  [-69.124, -51.135],
  [-69.008, -52.179],
  [-72.347, -50.743],
  [-73.588, -49.541],
  [-72.395, -48.051],
  [-71.934, -46.8],
  [-71.639, -45.52],
  [-71.213, -44.607],
  [-71.724, -43.595],
  [-72.123, -42.53],
  [-71.866, -41.15],
  [-71.625, -39.931],
  [-70.885, -38.649],
  [-71.161, -36.975],
  [-70.6, -36.175],
  [-70.128, -34.469],
  [-70.101, -33.187],
  [-70.258, -31.986],
  [-70.18, -30.477],
  [-69.911, -29.143],
  [-69.029, -27.551],
  [-68.61, -25.474],
  [-67.481, -24.08],
  [-65.933, -21.945],
];

const argentinaSource: Point[] = argentinaCoordinates.map(
  ([longitude, latitude]) => ({
    x: 0.5 + (longitude + 63.7) * 0.026,
    y: 0.035 + (-21.945 - latitude) * 0.04,
  }),
);

function distance(a: Point, b: Point) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function resample(source: Point[], count = POINT_COUNT, closed = true) {
  const points =
    closed && source[0] !== source.at(-1) ? [...source, source[0]] : source;
  const lengths = [0];
  for (let index = 1; index < points.length; index += 1) {
    lengths.push(
      lengths[index - 1] + distance(points[index - 1], points[index]),
    );
  }
  const total = lengths.at(-1) ?? 1;
  return Array.from({ length: count }, (_, sample) => {
    const target = (sample / (closed ? count : count - 1)) * total;
    let segment = 1;
    while (segment < lengths.length - 1 && lengths[segment] < target)
      segment += 1;
    const startLength = lengths[segment - 1];
    const segmentLength = lengths[segment] - startLength || 1;
    const ratio = (target - startLength) / segmentLength;
    return {
      x:
        points[segment - 1].x +
        (points[segment].x - points[segment - 1].x) * ratio,
      y:
        points[segment - 1].y +
        (points[segment].y - points[segment - 1].y) * ratio,
    };
  });
}

export const argentina = resample(argentinaSource);

// Keep the server-rendered SVG fallback byte-for-byte identical to the browser
// version. Rounding avoids tiny floating-point differences between runtimes
// leaking into the `d` attribute during hydration.
export const argentinaPath = `M${argentina
  .map((point) => `${(point.x * 100).toFixed(4)},${(point.y * 100).toFixed(4)}`)
  .join(' L')} Z`;
