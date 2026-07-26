import { Route, Routes } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { PublicLayout } from './components/layout/PublicLayout';
import { RequireAuth } from './components/auth/RequireAuth';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderDetailPage } from './pages/OrderDetailPage';
import { CustomerOrdersPage } from './pages/CustomerOrdersPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { AdminOrderDetailPage } from './pages/AdminOrderDetailPage';
import { AdminProductsPage } from './pages/AdminProductsPage';
import { AdminProductFormPage } from './pages/AdminProductFormPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route
          path="products/:slug"
          element={<ProductDetailPage />}
        />
        <Route
          path="cart"
          element={
            <RequireAuth role="CUSTOMER"><CartPage /></RequireAuth>
          }
        />
        <Route
          path="checkout"
          element={
            <RequireAuth role="CUSTOMER"><CheckoutPage /></RequireAuth>
          }
        />
        <Route
          path="profile/orders"
          element={
            <RequireAuth role="CUSTOMER"><CustomerOrdersPage /></RequireAuth>
          }
        />
        <Route
          path="orders/:orderNumber"
          element={
            <RequireAuth role="CUSTOMER"><OrderDetailPage /></RequireAuth>
          }
        />
      </Route>

      <Route path="admin" element={<RequireAuth role="ADMIN"><AdminLayout /></RequireAuth>}>
        <Route index element={<AdminDashboardPage />} />
        <Route
          path="products"
          element={<AdminProductsPage />}
        />
        <Route
          path="products/new"
          element={<AdminProductFormPage />}
        />
        <Route
          path="products/:id/edit"
          element={<AdminProductFormPage />}
        />
        <Route
          path="orders"
          element={<AdminOrdersPage />}
        />
        <Route
          path="orders/:id"
          element={<AdminOrderDetailPage />}
        />
      </Route>

      <Route path="403" element={<PlaceholderPage eyebrow="Akses ditolak" title="Area ini membutuhkan izin berbeda" description="Akun yang digunakan tidak memiliki hak akses ke halaman tersebut." />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
