import EncryptionTool from "@/components/encryption-tool";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto py-8 px-4 flex-1">
          <h1 className="text-3xl font-bold text-center mb-8">
            Encryption Algorithm Playground
          </h1>
          <Toaster />
          <EncryptionTool />
        </main>
        <footer className="border-t py-6">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zypher. All rights reserved.
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
