'use client';

import { useEffect, useRef, useState, ComponentType } from 'react';
import dynamic from 'next/dynamic';

interface LazyLoadProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    rootMargin?: string;
}

/**
 * Lazy load component when it enters viewport
 * Reduces initial bundle size by deferring non-critical components
 */
export function LazyLoad({ children, fallback = null, rootMargin = '200px' }: LazyLoadProps) {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [rootMargin]);

    return (
        <div ref={ref}>
            {isInView ? children : fallback}
        </div>
    );
}

/**
 * Create a lazy-loaded component with viewport detection
 */
export function createLazyComponent<P extends object = {}>(
    importFn: () => Promise<{ default: ComponentType<P> }>,
    fallback?: React.ReactNode
) {
    const Component = dynamic(importFn, {
        ssr: false,
        loading: () => <>{fallback}</>,
    });

    return function LazyComponent(props: P) {
        return (
            <LazyLoad fallback={fallback}>
                <Component {...(props as any)} />
            </LazyLoad>
        );
    };
}

/**
 * Defer component loading until after initial paint
 */
export function DeferredLoad({ children, delay = 100 }: { children: React.ReactNode; delay?: number }) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return isReady ? <>{children}</> : null;
}
