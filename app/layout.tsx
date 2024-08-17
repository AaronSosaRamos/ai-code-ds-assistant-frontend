import './globals.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'AI Code and DS Assistant',
  description: 'Professional Navbar and Footer with Dark Mode. Made by: Wilfredo Aaron Sosa Ramos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
