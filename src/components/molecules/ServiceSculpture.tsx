import { useId } from 'react';
import styles from './ServiceSculpture.module.css';

/** Lightweight, decorative objects share the hero's chrome and lilac palette. */
export function ServiceSculpture({ kind = 'automation' }: { kind?: string }) {
  const id = useId().replace(/:/g, '');
  const metal = `url(#${id}-metal)`;
  const glass = `url(#${id}-glass)`;
  return (
    <div className={styles.scene} data-sculpture={kind} aria-hidden="true">
      <svg viewBox="0 0 400 290" fill="none" className={styles.object}>
        <defs>
          <linearGradient
            id={`${id}-metal`}
            x1="100"
            y1="30"
            x2="300"
            y2="255"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#161329" />
            <stop offset=".18" stopColor="#aaa4c7" />
            <stop offset=".28" stopColor="#f8f6ff" />
            <stop offset=".4" stopColor="#746590" />
            <stop offset=".49" stopColor="#221b35" />
            <stop offset=".56" stopColor="#d7d9ec" />
            <stop offset=".72" stopColor="#a797da" />
            <stop offset=".83" stopColor="#eeeaff" />
            <stop offset="1" stopColor="#342b56" />
          </linearGradient>
          <linearGradient
            id={`${id}-glass`}
            x1="110"
            y1="50"
            x2="285"
            y2="250"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fbfaee" stopOpacity=".8" />
            <stop offset=".5" stopColor="#c0b4ee" stopOpacity=".35" />
            <stop offset="1" stopColor="#7354d0" stopOpacity=".8" />
          </linearGradient>
        </defs>
        <ellipse
          cx="200"
          cy="257"
          rx="102"
          ry="10"
          fill="#38216c"
          opacity=".09"
          className={styles.shadow}
        />
        {kind === 'mobile' ? (
          <>
            <g className={styles.back}>
              <rect
                x="116"
                y="37"
                width="116"
                height="201"
                rx="25"
                fill={glass}
                stroke={metal}
                strokeWidth="5"
                transform="rotate(-18 174 138)"
              />
            </g>
            <g className={styles.front} transform="rotate(12 222 150)">
              <rect
                x="166"
                y="44"
                width="112"
                height="204"
                rx="24"
                fill={glass}
                stroke={metal}
                strokeWidth="9"
              />
              <rect
                x="199"
                y="56"
                width="46"
                height="7"
                rx="3.5"
                fill={metal}
              />
              <circle
                cx="221"
                cy="139"
                r="29"
                stroke={metal}
                strokeWidth="12"
              />
              <path
                d="M203 223h38"
                stroke={metal}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          </>
        ) : kind === 'web' ? (
          <>
            <g className={styles.back}>
              <path
                d="M69 87 257 44 321 184 133 231Z"
                fill={glass}
                stroke={metal}
                strokeWidth="5"
              />
            </g>
            <g className={styles.front}>
              <path
                d="m78 69 225 39-26 151-225-39Z"
                fill={glass}
                stroke={metal}
                strokeWidth="7"
              />
              <path d="m73 98 225 39" stroke={metal} strokeWidth="3" />
              <circle cx="91" cy="86" r="3" fill="#4c32ff" />
              <path
                d="m128 137-27 13 21 21m97-16 21 21-27 13m-41-55-17 60"
                stroke={metal}
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </>
        ) : kind === 'backend' ? (
          <>
            {[0, 1, 2].map((n) => (
              <g
                key={n}
                className={styles.layer}
                style={{ '--layer': n } as React.CSSProperties}
              >
                <path
                  d={`M200 ${47 + n * 52} 304 ${100 + n * 52} 200 ${153 + n * 52} 96 ${100 + n * 52}Z`}
                  fill={glass}
                  stroke={metal}
                  strokeWidth="6"
                />
                <path
                  d={`M96 ${100 + n * 52}v17l104 53 104-53v-17M200 ${153 + n * 52}v17`}
                  stroke={metal}
                  strokeWidth="5"
                />
                <circle cx="200" cy={101 + n * 52} r="8" fill={metal} />
              </g>
            ))}
          </>
        ) : kind === 'rocket' ? (
          <>
            {[0, 1, 2].map((n) => (
              <g
                key={n}
                className={styles.layer}
                style={{ '--layer': n } as React.CSSProperties}
              >
                <path
                  d={`m${107 + n * 57} ${64 + n * 19} 55-30 55 30v98l-55 30-55-30Z`}
                  fill={glass}
                  stroke={metal}
                  strokeWidth="6"
                />
                <path
                  d={`m${107 + n * 57} ${64 + n * 19} 55 30 55-30m-55 30v98`}
                  stroke={metal}
                  strokeWidth="4"
                />
              </g>
            ))}
          </>
        ) : (
          <>
            <g className={styles.rings}>
              <ellipse
                cx="200"
                cy="141"
                rx="105"
                ry="66"
                transform="rotate(-35 200 141)"
                stroke={metal}
                strokeWidth="19"
              />
              <ellipse
                cx="200"
                cy="141"
                rx="105"
                ry="66"
                transform="rotate(55 200 141)"
                stroke={metal}
                strokeWidth="13"
              />
              <circle cx="200" cy="141" r="25" fill={metal} />
              <circle
                className={styles.spark}
                cx="282"
                cy="78"
                r="13"
                fill="#4c32ff"
                stroke="#e4dcff"
                strokeWidth="4"
              />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
