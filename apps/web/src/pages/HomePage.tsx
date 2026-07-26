import { ArrowRight, Box, Check, Droplets, Leaf, ShieldCheck, Sparkles, Star, Sun, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { BotanicalExperience } from '../components/three/BotanicalExperience';
import { Badge } from '../components/ui/Badge';
import { ButtonLink } from '../components/ui/Button';

const highlights = [
  { icon: Sparkles, value: '120+', label: 'Tanaman pilihan' },
  { icon: Box, value: '7', label: 'Kategori botani' },
  { icon: ShieldCheck, value: '100%', label: 'Stok tervalidasi' },
];

const categories = [
  { name: 'Tanaman indoor', count: '38 koleksi', color: 'from-[#dcebd4] to-[#a9cf96]', icon: Leaf },
  { name: 'Pot & wadah', count: '24 koleksi', color: 'from-[#f1dfd0] to-[#d7a183]', icon: Box },
  { name: 'Perawatan', count: '31 koleksi', color: 'from-[#d7ece9] to-[#8fc6bd]', icon: Droplets },
];

const products = [
  { name: 'Monstera Deliciosa', category: 'Indoor • Mudah', price: 'Rp185.000', accent: '#78a85c', shape: 'monstera' },
  { name: 'Sansevieria Laurentii', category: 'Indoor • Tahan lama', price: 'Rp95.000', accent: '#a7b85d', shape: 'snake' },
  { name: 'Fiddle Leaf Fig', category: 'Statement plant', price: 'Rp245.000', accent: '#557d4a', shape: 'fiddle' },
  { name: 'Calathea Orbifolia', category: 'Indoor • Medium', price: 'Rp165.000', accent: '#88a87d', shape: 'calathea' },
];

export function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest-950 text-white">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
        <div className="container-shell relative grid min-h-[calc(100vh-4.5rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
            <Badge tone="gold">Koleksi botani 2026</Badge>
            <h1 className="mt-7 max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Bawa kehidupan <span className="text-leaf-400">lebih dekat</span> ke ruangmu.</h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/65 sm:text-lg">Temukan tanaman terkurasi, perlengkapan berkebun, dan panduan perawatan dalam pengalaman belanja botani yang hidup.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><ButtonLink to="/products" size="lg">Jelajahi koleksi <ArrowRight size={17} /></ButtonLink><ButtonLink to="/products?view=care" variant="secondary" size="lg">Panduan perawatan</ButtonLink></div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-7">{highlights.map(({ icon: Icon, value, label }) => <div key={label}><Icon className="mb-2 text-leaf-400" size={18} /><p className="font-display text-xl font-semibold">{value}</p><p className="mt-1 text-[0.7rem] leading-4 text-white/45 sm:text-xs">{label}</p></div>)}</div>
          </motion.div>
          <motion.div className="relative min-h-[29rem] lg:min-h-[39rem]" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="botanical-stage overflow-hidden"><BotanicalExperience /><div className="pointer-events-none floating-card left-2 top-16 lg:left-0"><span className="status-dot" /> Mudah dirawat</div><div className="pointer-events-none floating-card bottom-12 right-2 lg:right-0"><strong className="text-forest-950">Monstera</strong><span className="block text-xs text-slate-500">Geser untuk melihat</span></div></div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 items-center gap-2 pb-5 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/35 lg:flex"><span className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" /> Interactive botanical scene</div>
      </section>

      <section className="container-shell py-18 sm:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="section-kicker">Jelajahi kategori</p><h2 className="section-title">Mulai dari ruang yang ingin kamu hidupkan.</h2></div><p className="max-w-2xl text-sm leading-7 text-slate-600 lg:justify-self-end">Koleksi terkurasi untuk meja kerja, ruang keluarga, balkon, hingga kebun pertamamu.</p></div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">{categories.map(({ name, count, color, icon: Icon }, index) => <motion.article key={name} className={`category-card bg-gradient-to-br ${color}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}><div className="category-glow" /><Icon size={28} className="relative text-forest-900" /><div className="relative mt-auto"><p className="font-display text-2xl font-semibold text-forest-950">{name}</p><p className="mt-1 text-xs font-semibold text-forest-800/65">{count}</p></div><ArrowRight className="relative ml-auto text-forest-900" /></motion.article>)}</div>
      </section>

      <section className="bg-white py-18 sm:py-24">
        <div className="container-shell"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="section-kicker">Pilihan GreenCart</p><h2 className="section-title">Tanaman favorit minggu ini.</h2></div><ButtonLink to="/products" variant="ghost">Lihat semua <ArrowRight size={16} /></ButtonLink></div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map((product, index) => <motion.article key={product.name} className="product-card group" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}><div className="product-visual" style={{ '--product-accent': product.accent } as React.CSSProperties}><span className={`product-plant product-plant-${product.shape}`} /><span className="product-pot-mini" /><span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[.62rem] font-extrabold text-forest-800 backdrop-blur">TERSEDIA</span></div><div className="p-4"><div className="flex items-center gap-1 text-gold-500"><Star size={12} fill="currentColor" /><span className="text-[.68rem] font-bold text-slate-500">4.9</span></div><h3 className="mt-2 font-display text-lg font-semibold text-forest-950">{product.name}</h3><p className="mt-1 text-xs text-slate-500">{product.category}</p><div className="mt-4 flex items-center justify-between"><strong className="text-sm text-forest-900">{product.price}</strong><span className="grid size-9 place-items-center rounded-xl bg-forest-900 text-white transition-transform group-hover:rotate-[-8deg]"><ArrowRight size={15} /></span></div></div></motion.article>)}</div>
        </div>
      </section>

      <section className="container-shell py-18 sm:py-24"><div className="overflow-hidden rounded-[2rem] bg-forest-950 text-white lg:grid lg:grid-cols-2"><div className="relative min-h-80 bg-[radial-gradient(circle_at_40%_35%,#438759_0%,#173c2d_42%,#0b241a_75%)]"><div className="care-plant"><span /><span /><span /></div><div className="absolute bottom-6 left-6 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"><Sun className="text-gold-500" size={20} /><p className="mt-2 text-xs font-semibold">Cahaya tidak langsung</p></div></div><div className="p-8 sm:p-12 lg:p-16"><p className="section-kicker !text-leaf-400">Plant care, simplified</p><h2 className="font-display text-4xl font-semibold leading-tight sm:text-5xl">Rawat dengan percaya diri.</h2><p className="mt-5 text-sm leading-7 text-white/60">Setiap tanaman dilengkapi kebutuhan cahaya, air, tingkat perawatan, dan rekomendasi penempatan.</p><div className="mt-8 grid gap-4">{['Panduan sesuai jenis tanaman', 'Pengingat frekuensi penyiraman', 'Tips untuk kondisi ruangan'].map(item => <div key={item} className="flex items-center gap-3 text-sm text-white/75"><span className="grid size-7 place-items-center rounded-full bg-leaf-500/15 text-leaf-400"><Check size={14} /></span>{item}</div>)}</div><ButtonLink to="/products?view=care" className="mt-9">Buka panduan <ArrowRight size={16} /></ButtonLink></div></div></section>

      <section className="border-y border-sage-200 bg-sage-50 py-12"><div className="container-shell grid gap-6 sm:grid-cols-3">{[{ icon: Truck, title: 'Pengiriman aman', text: 'Kemasan dirancang menjaga tanaman.' }, { icon: ShieldCheck, title: 'Kualitas terjamin', text: 'Produk diperiksa sebelum dikirim.' }, { icon: Droplets, title: 'Panduan lengkap', text: 'Perawatan sederhana dan jelas.' }].map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-forest-800 shadow-sm"><Icon size={20} /></span><div><h3 className="font-display font-semibold text-forest-950">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{text}</p></div></div>)}</div></section>

      <section className="container-shell py-18 sm:py-24"><div className="cta-panel"><div className="relative z-10 max-w-2xl"><Badge tone="gold">Mulai perjalanan hijaumu</Badge><h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">Satu tanaman dapat mengubah suasana seluruh ruang.</h2><p className="mt-5 text-sm leading-7 text-white/60">Pilih tanaman pertama dan biarkan GreenCart membantu langkah berikutnya.</p><ButtonLink to="/products" className="mt-8">Temukan tanamanmu <ArrowRight size={16} /></ButtonLink></div><div className="cta-rings" /></div></section>
    </>
  );
}
