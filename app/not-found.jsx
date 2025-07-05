// app/not-found/page.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background p-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <p className="text-xl text-muted-foreground">Ayo This Page does  not exist just go back</p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
      >
        Return Home
      </Link>
    </div>
  );
}