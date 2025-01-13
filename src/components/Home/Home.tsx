import React, { useRef, useEffect, Suspense } from 'react';
import { useParams, useRouterState, Router } from '@tanstack/react-router';
import { useLazyStore } from '../../store/lazyStore';

export function Home() {
  //Covered: Route parameter usage
  let userId: string | undefined;
  const routerState = useRouterState();
  const router = Router;
  const { isVisible, setIsVisible } = useLazyStore();
  const lazyRef = useRef<HTMLDivElement | null>(null);
  const Lazy = React.lazy(() =>
    import('../Lazy/Lazy').then((module) => ({ default: module.Lazy }))
  );

  try {
    if(routerState.matches.find((match: any) => match.routeId === '/home/$userId')) {
      routerState.matches.forEach((match: any) => {
        userId = match.params.userId;
      });
    }
  } catch (error) {
    console.error("Error getting userId:", error); 
  }

  //Covered: Lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (lazyRef.current) {
      observer.observe(lazyRef.current);
    }

    return () => {
      if (lazyRef.current) {
        observer.unobserve(lazyRef.current);
      }
    };
  }, [setIsVisible]);

  // useEffect(() => {
  //   throw new Error("This is a test error!"); 
  // }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p style={{ minHeight: '100vh' }}>userId: {userId}</p>

      <div ref={lazyRef}>
        {isVisible ? (
          <Suspense fallback={<div>Loading...</div>}>
            <Lazy />
          </Suspense>
        ) : (
          <div>Scroll down to load the component...</div>
        )}
      </div>
    </div>
  );
}
