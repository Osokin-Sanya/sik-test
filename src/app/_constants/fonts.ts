import 'server-only';

import localFont from 'next/font/local';

const carlito = localFont({
  src: '../fonts/Carlito/Carlito-Bold.ttf',
});
const notoSans = localFont({
  display: 'swap',
  src: [
    {
      path: '../fonts/NotoSans/NotoSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },

    {
      path: '../fonts/NotoSans/NotoSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default [carlito, notoSans].map((font) => font.className).join(' ');
