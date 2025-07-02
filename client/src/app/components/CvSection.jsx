"use client";
import React, {useRef, useState, useEffect} from 'react';
import Image from 'next/image';
import Textbox from './Textbox';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const stages = [
    {
        title: "Frühes Interesse an <b>Mediengestaltung</b>",
        text: "Während meiner Schulzeit habe ich mich privat an kleinen Projekten in Video-, Bildbearbeitung und Webentwicklung ausprobiert und so mein Interesse für digitale Gestaltung entdeckt.",
        parallaxFolder: "/images/cv/bg1/",
    },
    {
        title: "2017 - <b>Praktikum</b> bei der <b>Rat und Tat Werbeagentur GmbH</b>",
        text: "Im Rahmen eines Schulpraktikums bei der Rat und Tat Werbeagentur GmbH in Düsseldorf konnte ich mein Interesse praktisch vertiefen: Von der Gestaltung von Flyern über Bildbearbeitung bis zur Vorbereitung eines Werbedrehs.​",
        parallaxFolder: "/images/cv/bg2/",
    },
    {
        title: "2018 bis 2021 - <b>Abitur</b> an der <b>Goetheschule Wetzlar</b>",
        text: "An der Goetheschule Wetzlar habe ich mein Abitur mit der Note 1,2 abgeschlossen. Meine Leistungskurse waren Mathematik und Musik.",
        parallaxFolder: "/images/cv/bg3/",
    },
    {
        title: "2021/22 - <b>Freiwilliges ökologisches Jahr</b> beim <b>Klimaschutzmanagement des LDK</b>",
        text: "Während meines FöJs beim Klimaschutzmanagement des Lahn-Dill-Kreises habe ich neben der Arbeit an Umweltprojekten auch die Website betreut und Pressemitteilungen gestaltet.",
        parallaxFolder: "/images/cv/bg4/",
    },
    {
        title: "Seit 2022 - Studium der <b>Medieninformatik</b> an der <b>THM</b>",
        text: "Seit 2022 studiere ich Medieninformatik an der Technischen Hochschule Mittelhessen. In meinem Schwerpunkt “Web-  und mobile Anwendungen” vertiefe ich mein praktisches und theoretisches Wissen mit besonderem Fokus auf die Webentwicklung.",
        parallaxFolder: "/images/cv/bg5/",
    },
]

const CvSection = () => {
  const layersRef = useRef([]);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isAnimating = useRef(false);
  const blurClasses = ["blur-[0.5px]", "blur-[1px]", "blur-[1.5px]", "blur-[2px]"];

  useGSAP(() => {

    //Timeline für Parallax-Scroll
    const tlParallax = gsap.timeline({
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
        },
    });


    //Timeline für Intro-Animation
    const tlIntro = gsap.timeline();

    if (window.innerWidth <= 768) {
        //Hinzufügen der Parallax-Animationen für Mobile
        layersRef.current.forEach((layer, i) => {
            tlParallax.fromTo(layer, {
            yPercent: -(i + 1) * 15,
            ease: "none",
        },{
            yPercent: (i + 1) * 15,
            ease: "none",
            }, 0); // alle gleichzeitig starten
        });

        //ScrollTrigger für Intro-Animation
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                tlIntro.fromTo(
                    layersRef.current[0],
                    { x: -30, opacity: 0, scaleX: 1 },
                    { x: 0, opacity: 1, duration: 0.5, ease: "power1.out" }
                ) 
                .fromTo(
                    textRef.current, 
                    { opacity: 0, scale: 0.8, backdropFilter: "blur(8px)"  },
                    { opacity: 1, scale: 1, duration: 0.8,ease: "elastic.out(1,0.5)" },
                    "-=0.25"
                );
            },
            onLeave: () => {
                tlIntro.to(
                layersRef.current[0],
                { x: 30, opacity: 0, duration: 0.5, ease: "power1.in" }
                )
                .fromTo(
                    textRef.current, 
                    { opacity: 1, scale: 1, backdropFilter: "blur(8px)"  },
                    { opacity: 0, scale: 0.8, duration: 0.1, ease: "power1.out" },
                    "-=0.25"
                );
            },
            onEnterBack: () => {
                tlIntro.fromTo(
                    layersRef.current[0],
                    { x: -30, opacity: 0, scaleX: 1 },
                    { x: 0, opacity: 1, duration: 0.5, ease: "power1.out" }
                ) 
                .fromTo(
                    textRef.current, 
                    { opacity: 0, scale: 0.8, backdropFilter: "blur(8px)"  },
                    { opacity: 1, scale: 1, duration: 0.8,ease: "elastic.out(1,0.5)" },
                    "-=0.25"
                );
            },
            onLeaveBack: () => {
                tlIntro.fromTo(
                    layersRef.current[0],
                    { x: 0, opacity: 1, scaleX: -1},
                    { x: -30, opacity: 0, duration: 0.5, ease: "power1.out" }
                )
                .fromTo(
                    textRef.current, 
                    { opacity: 1, scale: 1, backdropFilter: "blur(8px)"  },
                    { opacity: 0, scale: 0.8, duration: 0.1, ease: "power1.out" },
                    "-=0.25"
                );
            },
        });
        
        return;
    }

    //Hinzufügen der Parallax-Animationen zur Timeline
    layersRef.current.forEach((layer, i) => {
        tlParallax.fromTo(layer, {
        yPercent: -(i + 1) * 15,
    },{
        yPercent: (i + 1) * 15,
        ease: "none",
        }, 0); // alle gleichzeitig starten
    });
    

    //ScrollTrigger für Hero-Animation
    ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
            tlIntro.fromTo(
                layersRef.current[0],
                { x: -30, opacity: 0, scaleX: 1, },
                { x: 0, opacity: 1, duration: 0.5, ease: "power1.out", }
            ) 
            .fromTo(
                textRef.current, 
                { opacity: 0, scale: 0.8, backdropFilter: "blur(8px)" },
                { opacity: 1, scale: 1, duration: 0.8,ease: "elastic.out(1,0.5)" },
                "-=0.25"
            );
        },
        onLeave: () => {
            tlIntro.to(
            layersRef.current[0],
            { x: 30, opacity: 0, duration: 0.5, ease: "power1.in" }
            )
            .fromTo(
                textRef.current, 
                { opacity: 1, scale: 1, backdropFilter: "blur(8px)"  },
                { opacity: 0, scale: 0.8, duration: 0.1, ease: "power1.out" },
                "-=0.25"
            );
        },
        onEnterBack: () => {
            tlIntro.fromTo(
                layersRef.current[0],
                { x: -30, opacity: 0, scaleX: 1 },
                { x: 0, opacity: 1, duration: 0.5, ease: "power1.out" }
            ) 
            .fromTo(
                textRef.current, 
                { opacity: 0, scale: 0.8, backdropFilter: "blur(8px)"  },
                { opacity: 1, scale: 1, duration: 0.8,ease: "elastic.out(1,0.5)" },
                "-=0.25"
            );
        },
        onLeaveBack: () => {
            tlIntro.fromTo(
                layersRef.current[0],
                { x: 0, opacity: 1, scaleX: -1},
                { x: -30, opacity: 0, duration: 0.5, ease: "power1.out" }
            )
            .fromTo(
                textRef.current, 
                { opacity: 1, scale: 1, backdropFilter: "blur(8px)"  },
                { opacity: 0, scale: 0.8, duration: 0.1, ease: "power1.out" },
                "-=0.25"
            );
        },
    });
  });
  
  //stageIndex zum speichern der aktuellen Stage
  const [stageIndex, setStageIndex] = useState(0);

  //switchToStage umd zwischen Stages zu wechseln
  const switchToStage = (newIndex) => {
    if (isAnimating.current) return; // Blockiere bei laufender Animation
    isAnimating.current = true;

    const direction = newIndex > stageIndex ? 1 : -1;
    const tl = gsap.timeline(); 

    const bgRef = layersRef.current.slice(1);

    // 1. Ausblenden
    tl.to(bgRef, {
        x: -100 * direction,
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.in",
    })
    .to(textRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
    }, "<")
    .to(layersRef.current[0], {
        scale: 1.02,
        duration: 0.5,
        ease: "power1.inOut",
    }, "<")
    .to(layersRef.current[0], {
        scale: 1,
        duration: 0.5,
        ease: "power1.inOut",
    })

    // 2. Nach Ausblendung Stage ändern & einblenden
    .add(() => {
        setStageIndex(newIndex);

        const tlIn = gsap.timeline({
            onComplete: () => {
            // Freigabe nach gesamter Animation
            isAnimating.current = false;
            },
        }); 
        tlIn.fromTo(bgRef, {
            x: 100 * direction,
            opacity: 0,
        }, {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out",
        })
        .fromTo(textRef.current, {
            opacity: 0,
            scale: 0.8,
        }, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
        }, "-=0.3");
    }, "<");
  };

  


  return (
    <section id="cv" ref={sectionRef} className='w-full min-h-screen bg-bluebg overflow-visible relative'>
        <div className='relative z-10 w-full min-h-screen'>
            <h2 className="text-4xl md:text-5xl pt-16 mb-4 lg:mb-8 xl:mb-12 2xl:mb-16 text-center">
                <b>Wie</b> ich <b>hierher gekommen</b> bin
            </h2>
            <div className='p-4 md:absolute md:top-5/12 md:left-2/3 md:transform md:-translate-y-1/2 md:-translate-x-1/2 md:w-1/2'>
                <Textbox
                    ref={textRef}
                    opacity={true}
                    title={stages[stageIndex].title}
                    text={stages[stageIndex].text}
                />
            </div>
        </div>
        <div ref={containerRef} className='w-full min-h-screen absolute top-0 left-0 flex justify-center items-center'>
                <div ref={(el) => (layersRef.current[0] = el)} className="absolute opacity-0 max-h-1/2 md:max-h-4/5 lg:max-h-3/4 w-108 h-108 md:w-128 md:h-128 2xl:h-156 2xl:w-156 bottom-0 left-1/3 transform -translate-x-1/2 z-5">
                    <Image className="object-contain" src="/images/cv/me_standing.png" fill alt="Hero läuft" sizes="(min-width: 1536px) 624px, (min-width: 768px) 512px, 432px"/>
                </div>
                {[1, 2, 3, 4].map((index) => (
                    <div
                        key={index}
                        ref={(el) => (layersRef.current[index] = el)}
                        className={`absolute w-[125%] md:w-full left-1/2 transform -translate-x-1/2 translate-y-1/2 md:translate-y-0 min-h-1/2 bottom-9/24 md:bottom-auto md:min-h-3/4 ${blurClasses[index-1]} bg-contain bg-center bg-no-repeat z-${5 - index} mt-24`}
                        style={{
                            backgroundImage: `url(${stages[stageIndex].parallaxFolder}parallax_layer_${index}.png)`,
                        }}
                    />
                ))}
        </div>
        {/* Slide-Controls */}
        <button
        onClick={() => {
            if (stageIndex > 0) {
            switchToStage(stageIndex - 1);
            }
        }}
        disabled={stageIndex === 0}
        className="absolute left-1/24 top-2/3 md:top-1/2 transform -translate-y-1/2 z-30 cursor-pointer text-neutral-1 hover:text-secondary-1 w-12 h-12 flex items-center justify-center disabled:opacity-30 transition-all duration-150"
        >
        <ChevronLeftIcon className="w-10 h-10 md:w-8 md:h-8" />
        </button>
        <button
        onClick={() => {
            if (stageIndex < stages.length - 1) {
            switchToStage(stageIndex + 1);
            }
        }}
        disabled={stageIndex === stages.length - 1}
        className="absolute right-1/24 top-2/3 md:top-1/2 transform -translate-y-1/2 z-30 cursor-pointer text-neutral-1 hover:text-secondary-1 w-12 h-12 flex items-center justify-center disabled:opacity-30 transition-all duration-150"
        >
        <ChevronRightIcon className="w-10 h-10 md:w-8 md:h-8" />
        </button>
        {/* Stage-Indikator */}
        <div className="absolute bottom-12 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {stages.map((_, index) => (
            <div
            key={index}
            onClick={() => {
                if (index !== stageIndex) {
                switchToStage(index);
                }
            }}
            className={`w-3 h-3 rounded-full transition-all hover:bg-neutral-1 cursor-pointer duration-300 ${
                index === stageIndex ? "bg-neutral-1 scale-125" : "bg-neutral-1/40"
            }`}
            />
        ))}
        </div>
    </section>
  )
}

export default CvSection