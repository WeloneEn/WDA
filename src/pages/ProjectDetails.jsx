import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Clock, Target, Wrench, Quote } from 'lucide-react';
import { MY_PROJECTS } from '../data/constants';
import { Footer } from '../components/sections/Footer';

export const ProjectDetails = () => {
    const { slug } = useParams();
    const project = MY_PROJECTS.find(p => p.slug === slug);
    const currentIndex = MY_PROJECTS.findIndex(p => p.slug === slug);
    const nextProject = currentIndex !== -1 && currentIndex < MY_PROJECTS.length - 1
        ? MY_PROJECTS[currentIndex + 1]
        : MY_PROJECTS[0];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-6 bg-[#D1D1C7]">
                <h1 className="text-4xl font-editorial italic text-[#C24B31]">Project not found</h1>
                <Link to="/" className="text-sm tracking-widest uppercase hover:text-[#C24B31] transition-colors flex items-center gap-2 text-[#1A1A1A]">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="relative bg-[#D1D1C7] text-[#1A1A1A]">

            {/* Fixed Navigation — newspaper style */}
            <nav className="w-full z-50 p-6 md:p-10 flex justify-between items-center border-b border-[#1A1A1A]/10">
                <Link to="/" className="text-xs md:text-sm tracking-[0.15em] uppercase hover:text-[#C24B31] transition-colors flex items-center gap-2 text-[#1A1A1A]/60">
                    <ArrowLeft size={16} /> Portfolio
                </Link>
                <span className="font-editorial italic text-lg text-[#1A1A1A]/70">
                    Welone Digital Atelier
                </span>
                <span className="text-xs tracking-[0.15em] uppercase text-[#1A1A1A]/30 hidden md:block">
                    {project.category} — {project.year}
                </span>
            </nav>

            {/* ======== HERO — newspaper editorial spread ======== */}
            <section className="w-full min-h-[60vh] md:min-h-[75vh] relative overflow-hidden flex items-end">
                <div
                    className="absolute inset-0 bg-cover bg-center scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D1D1C7] via-[#D1D1C7]/60 to-[#D1D1C7]/30"></div>
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10 pb-16 md:pb-24">
                    <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#1A1A1A]/40 mb-4 md:mb-6">{project.category}</p>
                    <h1 className="font-editorial text-5xl md:text-8xl lg:text-[8vw] leading-[0.9] text-[#1A1A1A] mb-8 md:mb-12">
                        {project.title}
                    </h1>

                    {/* Meta Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border-t border-[#1A1A1A]/10 pt-6 md:pt-8">
                        <div>
                            <p className="text-[10px] md:text-xs text-[#1A1A1A]/35 tracking-[0.2em] uppercase mb-2">Client</p>
                            <p className="text-base md:text-lg font-editorial italic text-[#1A1A1A]/70">{project.clientInfo || project.client}</p>
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-[#1A1A1A]/35 tracking-[0.2em] uppercase mb-2">Role</p>
                            <p className="text-base md:text-lg font-editorial italic text-[#1A1A1A]/70">{project.role || 'Design & Development'}</p>
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-[#1A1A1A]/35 tracking-[0.2em] uppercase mb-2">Timeline</p>
                            <p className="text-base md:text-lg font-editorial italic text-[#1A1A1A]/70 flex items-center gap-2">
                                {project.timeline || '4-6 weeks'}
                            </p>
                        </div>
                        <div>
                            <p className="text-[10px] md:text-xs text-[#1A1A1A]/35 tracking-[0.2em] uppercase mb-2">Year</p>
                            <p className="text-base md:text-lg font-editorial italic text-[#1A1A1A]/70">{project.year}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======== БРИФ ======== */}
            <section className="py-16 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                    <div className="md:col-span-4">
                        <h2 className="text-xs tracking-[0.25em] uppercase text-[#1A1A1A]/35 mb-6">Client's Vision</h2>
                        <div className="flex flex-col gap-4 text-sm text-[#1A1A1A]/40">
                            <div className="flex justify-between border-b border-[#1A1A1A]/8 pb-3">
                                <span>Services</span>
                                <span className="text-[#1A1A1A]/60 font-editorial italic">{project.role || 'Design & Development'}</span>
                            </div>
                            <div className="flex justify-between border-b border-[#1A1A1A]/8 pb-3">
                                <span>Timeline</span>
                                <span className="text-[#C24B31] font-editorial italic">{project.timeline || '4-6 weeks'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Client</span>
                                <span className="text-[#1A1A1A]/60 font-editorial italic">{project.clientInfo || project.client}</span>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-8">
                        <div className="relative pl-8 md:pl-12 border-l-2 border-[#b85c38]/20">
                            <Quote size={32} className="text-[#C24B31]/15 absolute -left-4 -top-2" />
                            <p className="text-xl md:text-3xl font-editorial italic leading-relaxed text-[#1A1A1A]/80">
                                {project.clientWishes || project.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======== SHOWCASE (Скриншоты) ======== */}
            <section className="pb-10 md:pb-20 max-w-[1400px] mx-auto px-6 md:px-10">
                <div className="w-full aspect-video overflow-hidden bg-[#C5C5BA] relative">
                    <img
                        src={project.showcaseImages?.[0] || project.image}
                        alt={`${project.title} — main screen`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = project.image;
                        }}
                    />
                </div>
            </section>

            {/* ======== МЕТОДЫ И РЕШЕНИЯ ======== */}
            <section className="py-16 md:py-28 px-6 md:px-10 max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                    <div className="md:col-span-4">
                        <h2 className="text-xs tracking-[0.25em] uppercase text-[#1A1A1A]/35 mb-6">Methods & Solutions</h2>
                        <h3 className="font-editorial text-3xl md:text-5xl italic text-[#C24B31]/80 leading-tight">
                            How we<br />solved the<br />challenge
                        </h3>
                    </div>
                    <div className="md:col-span-8 flex items-center">
                        <p className="text-base md:text-xl leading-relaxed text-[#1A1A1A]/65 font-editorial italic">
                            {project.methods || project.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* ======== SHOWCASE — остальные скриншоты ======== */}
            <section className="pb-16 md:pb-28 max-w-[1400px] mx-auto px-6 md:px-10 flex flex-col gap-8 md:gap-16">
                {(project.showcaseImages || []).slice(1).map((img, idx) => (
                    <div key={idx} className="w-full aspect-video md:aspect-[21/9] overflow-hidden bg-[#C5C5BA] relative">
                        <img
                            src={img}
                            alt={`${project.title} — screen ${idx + 2}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = project.image;
                            }}
                        />
                    </div>
                ))}
            </section>

            {/* ======== VISIT SITE ======== */}
            {project.link && (
                <section className="py-16 md:py-24 border-y border-[#1A1A1A]/10 flex justify-center text-center px-6">
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-4 text-xl md:text-3xl uppercase tracking-wider hover:text-[#C24B31] transition-colors text-[#1A1A1A]"
                    >
                        Visit Site
                        <span className="p-3 md:p-4 bg-[#111111]/5 group-hover:bg-[#b85c38]/15 transition-colors">
                            <ArrowUpRight size={28} className="text-[#C24B31]" />
                        </span>
                    </a>
                </section>
            )}

            {/* ======== NEXT PROJECT ======== */}
            {nextProject && (
                <section className="py-20 md:py-36 px-6 md:px-10 max-w-[1400px] mx-auto text-center border-t border-[#1A1A1A]/10">
                    <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#1A1A1A]/30 mb-6">Next project</p>
                    <Link
                        to={`/showcase/${nextProject.slug}`}
                        className="group inline-block w-full max-w-4xl"
                    >
                        <h2 className="font-editorial text-5xl sm:text-7xl md:text-[7vw] leading-none transition-all duration-500 group-hover:text-[#C24B31] group-hover:scale-[1.02]">
                            {nextProject.title}
                        </h2>
                        <p className="mt-4 text-base md:text-lg font-editorial italic text-[#1A1A1A]/40 group-hover:text-[#1A1A1A]/60 transition-colors">
                            {nextProject.category} — {nextProject.year}
                        </p>
                    </Link>
                </section>
            )}

            <Footer />
        </div>
    );
};
