import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor, ScrollProgress } from './components/layout/CursorAndProgress';
import { Preloader } from './components/layout/Preloader';
import { BackToTop } from './components/layout/BackToTop';
import { HomePage } from './pages/HomePage';
import { ProjectPage } from './pages/ProjectPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminPage } from './pages/AdminPage';
import { scrollToSection } from './lib/utils';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const timer = window.setTimeout(() => scrollToSection(id), 120);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
}

function SiteLayout() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </div>
  );
}

export function App() {
  const [loading, setLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('vg.preloader.seen');
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', loading);
    return () => document.documentElement.classList.remove('overflow-hidden');
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <ScrollToHash />
      <AnimatePresence>
        {loading ? (
          <Preloader
            key="preloader"
            onDone={() => {
              try {
                sessionStorage.setItem('vg.preloader.seen', 'true');
              } catch {
                /* ignore private-mode storage errors */
              }
              setLoading(false);
            }}
          />
        ) : null}
      </AnimatePresence>

      {!loading ? (
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="projects/:slug" element={<ProjectPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      ) : null}
    </>
  );
}
