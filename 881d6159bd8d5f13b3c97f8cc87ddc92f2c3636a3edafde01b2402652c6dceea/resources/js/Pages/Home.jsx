import { Head, Link } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { useState, useEffect, useRef, useMemo, createElement } from "react";

import { motion } from "framer-motion";

const buildKeyframes = (from, steps) => {
    const keys = new Set([
        ...Object.keys(from),
        ...steps.flatMap((s) => Object.keys(s)),
    ]);

    const keyframes = {};
    keys.forEach((k) => {
        keyframes[k] = [from[k], ...steps.map((s) => s[k])];
    });
    return keyframes;
};

const BlurText = ({
    text = "",
    delay = 200,
    className = "justify-center",
    animateBy = "words",
    direction = "top",
    threshold = 0.1,
    rootMargin = "0px",
    animationFrom,
    animationTo,
    easing = (t) => t,
    onAnimationComplete,
    stepDuration = 0.35,
}) => {
    const elements = animateBy === "words" ? text.split(" ") : text.split("");
    const [inView, setInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [threshold, rootMargin]);

    const defaultFrom = useMemo(
        () =>
            direction === "top"
                ? { filter: "blur(10px)", opacity: 0, y: -50 }
                : { filter: "blur(10px)", opacity: 0, y: 50 },
        [direction]
    );

    const defaultTo = useMemo(
        () => [
            {
                filter: "blur(5px)",
                opacity: 0.5,
                y: direction === "top" ? 5 : -5,
            },
            { filter: "blur(0px)", opacity: 1, y: 0 },
        ],
        [direction]
    );

    const fromSnapshot = animationFrom ?? defaultFrom;
    const toSnapshots = animationTo ?? defaultTo;

    const stepCount = toSnapshots.length + 1;
    const totalDuration = stepDuration * (stepCount - 1);
    const times = Array.from({ length: stepCount }, (_, i) =>
        stepCount === 1 ? 0 : i / (stepCount - 1)
    );

    return (
        <p ref={ref} className={`blur-text ${className} flex flex-wrap`}>
            {elements.map((segment, index) => {
                const animateKeyframes = buildKeyframes(
                    fromSnapshot,
                    toSnapshots
                );

                const spanTransition = {
                    duration: totalDuration,
                    times,
                    delay: (index * delay) / 1000,
                };
                spanTransition.ease = easing;

                return (
                    <motion.span
                        className="inline-block will-change-[transform,filter,opacity]"
                        key={index}
                        initial={fromSnapshot}
                        animate={inView ? animateKeyframes : fromSnapshot}
                        transition={spanTransition}
                        onAnimationComplete={
                            index === elements.length - 1
                                ? onAnimationComplete
                                : undefined
                        }
                    >
                        {segment === " " ? "\u00A0" : segment}
                        {animateBy === "words" &&
                            index < elements.length - 1 &&
                            "\u00A0"}
                    </motion.span>
                );
            })}
        </p>
    );
};

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
    text,
    className = "",
    delay = 10,
    duration = 1,
    ease = "power3.out",
    splitType = "chars",
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = "-100px",
    textAlign = "center",
    onLetterAnimationComplete,
}) => {
    const ref = useRef(null);
    const animationCompletedRef = useRef(false);
    const scrollTriggerRef = useRef(null);

    useEffect(() => {
        if (typeof window === "undefined" || !ref.current || !text) return;

        const el = ref.current;

        animationCompletedRef.current = false;

        const absoluteLines = splitType === "lines";
        if (absoluteLines) el.style.position = "relative";

        let splitter;
        try {
            splitter = new GSAPSplitText(el, {
                type: splitType,
                absolute: absoluteLines,
                linesClass: "split-line",
            });
        } catch (error) {
            console.error("Failed to create SplitText:", error);
            return;
        }

        let targets;
        switch (splitType) {
            case "lines":
                targets = splitter.lines;
                break;
            case "words":
                targets = splitter.words;
                break;
            case "chars":
                targets = splitter.chars;
                break;
            default:
                targets = splitter.chars;
        }

        if (!targets || targets.length === 0) {
            console.warn("No targets found for SplitText animation");
            splitter.revert();
            return;
        }

        targets.forEach((t) => {
            t.style.willChange = "transform, opacity";
        });

        const startPct = (1 - threshold) * 100;
        const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(
            rootMargin
        );
        const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
        const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
        const sign =
            marginValue < 0
                ? `-=${Math.abs(marginValue)}${marginUnit}`
                : `+=${marginValue}${marginUnit}`;
        const start = `top ${startPct}%${sign}`;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start,
                toggleActions: "play none none none",
                once: true,
                onToggle: (self) => {
                    scrollTriggerRef.current = self;
                },
            },
            smoothChildTiming: true,
            onComplete: () => {
                animationCompletedRef.current = true;
                gsap.set(targets, {
                    ...to,
                    clearProps: "willChange",
                    immediateRender: true,
                });
                onLetterAnimationComplete?.();
            },
        });

        tl.set(targets, { ...from, immediateRender: false, force3D: true });
        tl.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            force3D: true,
        });

        return () => {
            tl.kill();
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill();
                scrollTriggerRef.current = null;
            }
            gsap.killTweensOf(targets);
            if (splitter) {
                splitter.revert();
            }
        };
    }, [
        text,
        delay,
        duration,
        ease,
        splitType,
        from,
        to,
        threshold,
        rootMargin,
        onLetterAnimationComplete,
    ]);

    return (
        <p
            ref={ref}
            className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
            style={{
                textAlign,
                wordWrap: "break-word",
            }}
        >
            {text}
        </p>
    );
};

const AnimatedContent = ({
    children,
    distance = 50,
    direction = "vertical",
    reverse = false,
    duration = 0.5,
    ease = "power3.out",
    initialOpacity = 0,
    animateOpacity = true,
    scale = 1,
    threshold = 0.1,
    delay = 1,
    onComplete,
}) => {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const axis = direction === "horizontal" ? "x" : "y";
        const offset = reverse ? -distance : distance;
        const startPct = (1 - threshold) * 100;

        gsap.set(el, {
            [axis]: offset,
            scale,
            opacity: animateOpacity ? initialOpacity : 1,
        });

        gsap.to(el, {
            [axis]: 0,
            scale: 1,
            opacity: 1,
            duration,
            ease,
            delay,
            onComplete,
            scrollTrigger: {
                trigger: el,
                start: `top ${startPct}%`,
                toggleActions: "play none none none",
                once: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
            gsap.killTweensOf(el);
        };
    }, [
        distance,
        direction,
        reverse,
        duration,
        ease,
        initialOpacity,
        animateOpacity,
        scale,
        threshold,
        delay,
        onComplete,
    ]);

    return <div ref={ref}>{children}</div>;
};

export default function Home({
    settings,
    latestNews = [],
    galleries = [],
    underbows = [],
}) {
    // Mendapatkan daftar kategori unik dari data gambar
    const categories = [
        "Semua",
        ...new Set(galleries.map((image) => image.category)),
    ];

    // State untuk kategori aktif dan gambar yang akan ditampilkan
    const [activeCategory, setActiveCategory] = useState("Semua");
    const [filteredImages, setFilteredImages] = useState(galleries);

    // Efek untuk memfilter gambar saat kategori aktif berubah
    useEffect(() => {
        if (activeCategory === "Semua") {
            setFilteredImages(galleries);
        } else {
            setFilteredImages(
                galleries.filter((image) => image.category === activeCategory)
            );
        }
    }, [activeCategory, galleries]);

    return (
        <MainLayout>
            <Head
                title={`${settings.cabinet_name || "Nama Kabinet"} ${
                    settings.period || "Periode"
                }`}
            />

            {/* Hero Section Start */}
            <section className="relative pt-28 pb-14 md:pt-64 md:pb-40 flex items-center justify-center text-center text-white">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-gray-100"
                    // Ganti URL ini dengan gambar Anda sendiri, misalnya '/assets/hero-image.jpg'
                    style={{
                        backgroundImage: settings.cover_photo_path
                            ? `url(/storage/${settings.cover_photo_path})`
                            : "none",
                    }}
                ></div>

                {/* Overlay Gelap */}
                {/* Ini membantu agar teks lebih mudah dibaca di atas gambar */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Konten Teks */}
                <div className="relative z-10 p-4">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-2 md:mb-4">
                        <BlurText text={settings.headline || "Hima Ilkom"} />
                    </h1>
                    <p className="text-base md:text-xl mb-4 md:mb-8 max-w-screen-lg mx-auto">
                        <SplitText
                            text={settings.tagline || "Tagline Hima Ilkom"}
                        />
                    </p>
                    <div className="flex gap-4 items-center justify-center">
                        <AnimatedContent>
                            <Link
                                href={route("activity.index")}
                                className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg text-sm md:text-base transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Lebih Dekat
                            </Link>
                        </AnimatedContent>
                        <AnimatedContent>
                            <Link
                                href={route("contact")}
                                className="inline-block bg-transparent border border-white hover:bg-opacity-90 text-white font-semibold py-2 px-4 md:py-3 md:px-6 rounded-lg text-sm md:text-base transition duration-300 ease-in-out transform hover:scale-105 hover:bg-secondary"
                            >
                                Kerja Sama
                            </Link>
                        </AnimatedContent>
                    </div>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-primary">
                            <BlurText text="Layanan Kami" />
                        </h2>
                        <p className="text-gray-600 mt-2">
                            <AnimatedContent delay={0}>
                                Layanan penunjang bagi pihak internal maupun
                                eksternal.
                            </AnimatedContent>
                        </p>
                    </div>

                    {/* Grid Galeri menjadi dinamis */}
                    <AnimatedContent delay={0.1}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                                <h2 className="text-xl font-semibold text-primary">
                                    PENDATAAN MAHASISWA BARU 2025
                                </h2>
                                <p className="text-gray-600 my-4 text-sm">
                                    Bagi mahasiswa baru program studi Teknik
                                    Informatika dan Sistem Informasi Tahun 2025
                                    semua jalur, silakan mengisi formulir
                                    pendataan.
                                </p>
                                <div className="border-t border-gray-200 pt-4 items-center">
                                    <a
                                        target="_blank"
                                        href="https://himailkomunnes.com/pendataanmahasiswabaru"
                                        className="text-primary text-sm font-semibold hover:text-secondary transition-colors"
                                    >
                                        Isi pendataan &rarr;
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                                <h2 className="text-xl font-semibold text-primary">
                                    PENDATAAN PRESTASI MAHASISWA
                                </h2>
                                <p className="text-gray-600 my-4 text-sm">
                                    Bagi mahasiswa aktif Program Studi Teknik
                                    Informatika dan Sistem Informasi yang
                                    memiliki prestasi bidang akademik maupun non
                                    akademik dapat diisikan.
                                </p>
                                <div className="border-t border-gray-200 pt-4 items-center">
                                    <a
                                        target="_blank"
                                        href="https://himailkomunnes.com/pendataanprestasi"
                                        className="text-primary text-sm font-semibold hover:text-secondary transition-colors"
                                    >
                                        Isi pendataan &rarr;
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                                <h2 className="text-xl font-semibold text-primary">
                                    MEDIA PARTNER & KERJA SAMA
                                </h2>
                                <p className="text-gray-600 my-4 text-sm">
                                    Publikasi kegiatanmu melalui layanan media
                                    partner dan kerja sama HIMA ILKOM. Akses
                                    paket media partner melalui link di bawah
                                    ini.
                                </p>
                                <div className="border-t border-gray-200 pt-4 flex items-center gap-4">
                                    <a
                                        target="_blank"
                                        href="https://himailkomunnes.com/paketmediapartner"
                                        className="bg-primary rounded-full px-3 py-1 text-white text-sm font-semibold hover:bg-secondary transition-colors"
                                    >
                                        Akses Paket
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://wa.me/6287777526460"
                                        className="text-primary text-sm font-semibold hover:text-secondary transition-colors"
                                    >
                                        Kontak &rarr;
                                    </a>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                                <h2 className="text-xl font-semibold text-primary">
                                    PEMINJAMAN ALAT INVENTARIS
                                </h2>
                                <p className="text-gray-600 my-4 text-sm">
                                    Perlu alat untuk menunjang keberlangsungan
                                    kegiatanmu? Akses formulir peminjaman alat
                                    inventaris HIMA ILKOM melalui link di bawah
                                    ini.
                                </p>
                                <div className="border-t border-gray-200 pt-4 flex items-center gap-4">
                                    <a
                                        target="_blank"
                                        href="https://himailkomunnes.com/soppeminjamanalat"
                                        className="bg-primary rounded-full px-3 py-1 text-white text-sm font-semibold hover:bg-secondary transition-colors"
                                    >
                                        Akses SOP
                                    </a>
                                    <a
                                        target="_blank"
                                        href="https://himailkomunnes.com/formulirpeminjamanalat"
                                        className="text-primary text-sm font-semibold hover:text-secondary transition-colors"
                                    >
                                        Formulir &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>
                    </AnimatedContent>
                </div>
            </section>

            <section className="py-10 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary">
                            <BlurText text="Kolaborasi Aktif" />
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mt-2">
                            <AnimatedContent delay={0}>
                                Bersama dengan lembaga kemahasiswaan di bawah
                                naungan {settings.organization_name}.
                            </AnimatedContent>
                        </p>
                    </div>
                    {/* 2. Ganti bagian statis dengan loop dinamis */}
                    <AnimatedContent delay={0.1}>
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-16">
                            {underbows.length > 0 ? (
                                underbows.map((underbow) => (
                                    <img
                                        src={
                                            underbow.logo_path
                                                ? `/storage/${underbow.logo_path}`
                                                : "https://via.placeholder.com/150"
                                        }
                                        alt={`Logo ${underbow.name}`}
                                        className="h-16 md:h-20 transition duration-300 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                                    />
                                ))
                            ) : (
                                <p className="text-gray-500">
                                    Underbow belum ditambahkan.
                                </p>
                            )}
                        </div>
                    </AnimatedContent>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary">
                            <BlurText text="Berita dan Informasi Terkini" />
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mt-2">
                            <AnimatedContent delay={0}>
                                Ikuti perkembangan terbaru dari kegiatan dan
                                pencapaian kami.
                            </AnimatedContent>
                        </p>
                    </div>

                    {/* Bagian Berita menjadi dinamis */}
                    <AnimatedContent delay={0.1}>
                        {latestNews.length > 0 ? (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {latestNews.map((news) => (
                                    <article
                                        key={news.id}
                                        className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
                                    >
                                        <Link
                                            href={route("news.show", news.slug)}
                                        >
                                            <img
                                                src={`/storage/${news.image_path}`}
                                                alt={news.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        </Link>
                                        <div className="p-6">
                                            <span className="text-sm font-semibold text-secondary">
                                                {news.category}
                                            </span>
                                            <h3 className="mt-2 text-xl font-bold text-primary hover:text-secondary transition-colors line-clamp-2">
                                                <Link
                                                    href={route(
                                                        "news.show",
                                                        news.slug
                                                    )}
                                                >
                                                    {news.title}
                                                </Link>
                                            </h3>
                                            <p className="mt-2 text-gray-600 text-sm line-clamp-3">
                                                {news.excerpt}
                                            </p>
                                            <div className="mt-4">
                                                <Link
                                                    href={route(
                                                        "news.show",
                                                        news.slug
                                                    )}
                                                    className="text-primary font-semibold hover:text-secondary transition-colors"
                                                >
                                                    Baca Selengkapnya &rarr;
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500">
                                    Berita belum ditambahkan.
                                </p>
                            </div>
                        )}
                    </AnimatedContent>
                </div>
            </section>
            <section className="py-10 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    {/* Kolom Kiri: Teks Penjelasan */}
                    <div className="text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                            <BlurText
                                className="text-left"
                                text={`Tentang ${
                                    settings.organization_name || "Organisasi"
                                }`}
                            />
                        </h2>
                        <p className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
                            <AnimatedContent delay={0}>
                                Kabinet{" "}
                                {settings.cabinet_name || "Nama Kabinet"}{" "}
                                {settings.period || "Periode"}
                            </AnimatedContent>
                        </p>
                        <p className="text-gray-600 text-sm md:text-base mb-6 leading-relaxed">
                            <AnimatedContent delay={0.1}>
                                {settings.definition ||
                                    "Definisi organisasi belum diatur."}
                            </AnimatedContent>
                        </p>
                        <AnimatedContent delay={0.2}>
                            <Link
                                href="/about"
                                className="inline-block bg-primary hover:bg-opacity-90 text-white font-semibold py-3 px-6 rounded-lg text-sm md:text-base transition duration-300 ease-in-out transform hover:scale-105"
                            >
                                Baca Selengkapnya
                            </Link>
                        </AnimatedContent>
                    </div>

                    {/* Kolom Kanan: Gambar Logo */}
                    <div className="flex justify-center items-center order-first md:order-last">
                        {/* Ganti src dengan path logo HIMA ILKOM Anda */}
                        <AnimatedContent delay={0.3}>
                            <img
                                src={
                                    settings.logo_full_path
                                        ? `/storage/${settings.logo_full_path}`
                                        : "https://via.placeholder.com/256"
                                }
                                alt="Logo Organisasi"
                                className="h-48 md:h-64 object-contain"
                            />
                        </AnimatedContent>
                    </div>
                </div>
            </section>
            <section className="py-10">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary">
                            <BlurText text="Galeri Kegiatan" />
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mt-2">
                            <AnimatedContent delay={0}>
                                Momen-momen berharga dari berbagai acara yang
                                telah kami selenggarakan.
                            </AnimatedContent>
                        </p>
                    </div>

                    {/* Tombol Filter Kategori */}
                    <AnimatedContent delay={0.1}>
                        {galleries.length > 0 && (
                            <div className="flex justify-center flex-wrap gap-2 mb-12">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() =>
                                            setActiveCategory(category)
                                        }
                                        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                                            activeCategory === category
                                                ? "bg-primary text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        )}
                    </AnimatedContent>

                    {/* Grid Galeri menjadi dinamis */}
                    <AnimatedContent delay={0.2}>
                        {galleries.length > 0 ? (
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                                {filteredImages.map((image) => (
                                    <div
                                        key={image.id}
                                        className="relative aspect-square rounded-lg overflow-hidden group"
                                    >
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt={
                                                image.caption ||
                                                `Galeri ${image.category}`
                                            }
                                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {image.category}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">
                                Galeri kegiatan belum ditambahkan.
                            </p>
                        )}
                    </AnimatedContent>
                </div>
            </section>
            <section className="py-10 bg-gray-50">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-primary">
                            <BlurText
                                text={`Video Profil Kabinet ${settings.cabinet_name}`}
                            />
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mt-2">
                            <AnimatedContent delay={0}>
                                Kenali kami lebih dekat melalui video profil
                                singkat ini.
                            </AnimatedContent>
                        </p>
                    </div>

                    {/* Container untuk membuat video responsif */}
                    <AnimatedContent delay={0.1}>
                        {settings.video_profile_link ? (
                            <div className="max-w-4xl mx-auto aspect-video rounded-lg overflow-hidden shadow-2xl">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${settings.video_profile_link}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-gray-500">
                                    Video profil belum ditambahkan.
                                </p>
                            </div>
                        )}
                    </AnimatedContent>
                </div>
            </section>
        </MainLayout>
    );
}
