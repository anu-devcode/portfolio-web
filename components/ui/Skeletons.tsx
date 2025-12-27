export function HeroSkeleton() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Reserve space for 3D background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/20 to-transparent" style={{ contain: 'layout' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
                    {/* Profile Image Skeleton */}
                    <div className="flex justify-center lg:justify-end order-first lg:order-last">
                        <div className="w-40 h-40 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-3xl glass-strong border border-cyan-400/20 animate-pulse" style={{ contain: 'layout' }} />
                    </div>

                    {/* Content Skeleton */}
                    <div className="text-left lg:pr-8 space-y-6">
                        <div className="w-32 h-8 glass rounded-full animate-pulse" style={{ contain: 'layout' }} />
                        <div className="w-full h-16 glass rounded-lg animate-pulse" style={{ contain: 'layout' }} />
                        <div className="w-3/4 h-12 glass rounded-lg animate-pulse" style={{ contain: 'layout' }} />
                        <div className="w-full h-24 glass rounded-lg animate-pulse" style={{ contain: 'layout' }} />
                        <div className="flex gap-4">
                            <div className="w-40 h-14 glass rounded-lg animate-pulse" style={{ contain: 'layout' }} />
                            <div className="w-40 h-14 glass rounded-lg animate-pulse" style={{ contain: 'layout' }} />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 glass rounded-xl animate-pulse" style={{ contain: 'layout' }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function SectionSkeleton() {
    return (
        <section className="py-20 relative" style={{ minHeight: '600px', contain: 'layout' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                    <div className="w-48 h-12 glass rounded-lg animate-pulse mx-auto" style={{ contain: 'layout' }} />
                    <div className="w-96 h-6 glass rounded-lg animate-pulse mx-auto" style={{ contain: 'layout' }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-64 glass rounded-xl animate-pulse" style={{ contain: 'layout' }} />
                    ))}
                </div>
            </div>
        </section>
    );
}
