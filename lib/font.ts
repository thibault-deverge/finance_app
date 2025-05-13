import localFont from 'next/font/local';

export const publicSans = localFont({
  src: [
    {
      path: '../public/fonts/PublicSans-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../public/fonts/PublicSans-Italic-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'italic',
    },
    {
      path: '../public/fonts/static/PublicSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/static/PublicSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-public-sans',
  display: 'swap',
});
