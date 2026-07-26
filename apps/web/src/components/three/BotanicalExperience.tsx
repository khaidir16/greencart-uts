import { lazy, Suspense, useEffect, useState } from 'react';

const PlantScene = lazy(() => import('./PlantScene'));

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export function BotanicalExperience() {
  const [ready, setReady] = useState(false);
  const [loadScene, setLoadScene] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);
    setReady(supportsWebGL());
    const loadTimer = window.setTimeout(() => setLoadScene(true), 300);
    const updateMotion = () => setReducedMotion(media.matches);
    media.addEventListener('change', updateMotion);
    return () => { window.clearTimeout(loadTimer); media.removeEventListener('change', updateMotion); };
  }, []);

  if (!ready || !loadScene) return <BotanicalFallback />;

  return (
    <div className="h-full w-full" data-testid="botanical-3d-scene">
      <Suspense fallback={<BotanicalFallback />}>
        <PlantScene reducedMotion={reducedMotion} />
      </Suspense>
    </div>
  );
}

function BotanicalFallback() {
  return (
    <div className="plant-placeholder" data-testid="botanical-fallback" aria-label="Ilustrasi tanaman GreenCart">
      <span className="plant-stem" />
      <span className="plant-leaf plant-leaf-1" />
      <span className="plant-leaf plant-leaf-2" />
      <span className="plant-leaf plant-leaf-3" />
      <span className="plant-leaf plant-leaf-4" />
      <span className="plant-pot" />
    </div>
  );
}
