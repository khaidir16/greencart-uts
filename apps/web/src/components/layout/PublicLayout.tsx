import { Outlet } from 'react-router-dom';
import { PublicFooter } from './PublicFooter';
import { PublicHeader } from './PublicHeader';

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <a href="#main-content" className="skip-link">Lewati ke konten utama</a>
      <PublicHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
}
