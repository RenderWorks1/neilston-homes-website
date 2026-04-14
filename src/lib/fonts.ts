import localFont from 'next/font/local';

export const fontHeading = localFont({
  variable: '--font-heading',
  display: 'swap',
  src: [
    { path: '../../public/fonts/Lora-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../../public/fonts/Lora-MediumItalic.ttf', weight: '500', style: 'italic' },
    { path: '../../public/fonts/Lora-SemiBoldItalic.ttf', weight: '600', style: 'italic' },
    { path: '../../public/fonts/Lora-BoldItalic.ttf', weight: '700', style: 'italic' },
    { path: '../../public/fonts/Lora-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Lora-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Lora-Bold.ttf', weight: '700', style: 'normal' },
  ],
});

export const fontBody = localFont({
  variable: '--font-body',
  display: 'swap',
  src: [
    { path: '../../public/fonts/Poppins-Light.ttf', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Poppins-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Poppins-Italic.ttf', weight: '400', style: 'italic' },
    { path: '../../public/fonts/Poppins-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Poppins-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Poppins-Bold.ttf', weight: '700', style: 'normal' },
  ],
});
