import { ButtonLink } from '../components/ui/Button';

export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-forest-950 p-6 text-center text-white">
      <div><p className="font-display text-[8rem] font-semibold leading-none text-leaf-400">404</p><h1 className="mt-4 font-display text-4xl font-semibold">Tanaman ini belum tumbuh.</h1><p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/60">Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.</p><ButtonLink to="/" className="mt-8">Kembali ke GreenCart</ButtonLink></div>
    </main>
  );
}
