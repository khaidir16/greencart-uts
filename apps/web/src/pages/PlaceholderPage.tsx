import { ArrowRight, Sprout } from 'lucide-react';
import { ButtonLink } from '../components/ui/Button';

export function PlaceholderPage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="container-shell grid min-h-[38rem] place-items-center py-16 text-center">
      <div className="max-w-2xl">
        <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-sage-100 text-forest-800"><Sprout size={28} /></span>
        <p className="section-kicker mt-7">{eyebrow}</p>
        <h1 className="font-display text-4xl font-semibold leading-tight text-forest-950 sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
        <ButtonLink to="/" variant="secondary" className="mt-8">Kembali ke beranda <ArrowRight size={16} /></ButtonLink>
      </div>
    </section>
  );
}
