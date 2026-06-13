import type {Metadata} from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css'; // Global styles

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Feliz Aniversário meu irmão Lilo!',
  description: `É tipo um elo que não quebra, uma fonte que não seca
Um amigo que não deixa a gente desistir
Você é a paz em meio à guerra, um conselho na hora certa
Minha sorte é você existir`
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning className="font-sans min-h-screen">{children}</body>
    </html>
  );
}
