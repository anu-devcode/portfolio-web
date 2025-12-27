export const HeroSkeleton = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-950/20 animate-pulse">
        <div className="max-w-4xl w-full px-4 space-y-8">
            <div className="h-4 w-32 bg-cyan-900/30 rounded-full mx-auto" />
            <div className="h-16 w-3/4 bg-slate-800/40 rounded-2xl mx-auto" />
            <div className="h-24 w-full bg-slate-800/40 rounded-2xl" />
            <div className="flex justify-center gap-4">
                <div className="h-12 w-32 bg-cyan-900/40 rounded-xl" />
                <div className="h-12 w-32 bg-slate-800/40 rounded-xl" />
            </div>
        </div>
    </div>
);

export const SectionSkeleton = ({ title }: { title?: string }) => (
    <div className="py-24 animate-pulse max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
            <div className="h-4 w-24 bg-cyan-900/30 rounded-full mx-auto" />
            <div className="h-12 w-48 bg-slate-800/40 rounded-xl mx-auto" />
            <div className="h-6 w-96 bg-slate-800/40 rounded-xl mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-slate-900/40 rounded-2xl border border-slate-800/50" />
            ))}
        </div>
    </div>
);
