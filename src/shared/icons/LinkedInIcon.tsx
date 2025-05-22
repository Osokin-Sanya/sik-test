import { IconProps } from './types';

export const LinkedIdIcon = ({ size = 24, color = 'white' }: IconProps) => {
  const width = size;
  const height = size - 2;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 24 22`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3233_1554)">
        <path
          opacity={0.3}
          d="M23.9998 13.4666V21.9604H18.9776V13.9841C18.9776 12.0164 18.2452 10.6691 16.4665 10.6691C15.1065 10.6691 14.2692 11.6019 13.9554 12.4309C13.8172 12.8309 13.7463 13.2507 13.7456 13.6734V21.9604H8.72339C8.72339 21.9604 8.82828 8.49376 8.72339 7.14736H13.7456V9.21888C14.3732 8.18312 15.6292 6.73288 18.2452 6.73288C21.4887 6.73288 23.9998 8.90824 23.9998 13.4666ZM3.49139 0C1.81761 0 0.666504 1.1396 0.666504 2.58984C0.666504 4.04008 1.71273 5.17968 3.3865 5.17968C5.16606 5.17968 6.21228 4.04008 6.21228 2.58984C6.31628 1.03576 5.26917 0 3.49139 0ZM0.980282 21.9604H6.0025V7.14736H0.980282V21.9604Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_3233_1554">
          <rect width={width} height={height} fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};
