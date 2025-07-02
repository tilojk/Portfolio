"use client";
import React, {useRef} from 'react';
import Image from 'next/image';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const Header = () => {
  const layersRef = useRef([]);
  const containerRef = useRef(null);
  const textRef = useRef([]);
  const imageRef = useRef([]);

  useGSAP(() => {

    //Timeline für Parallax-Scroll
    const tlParallax = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
        },
    });

    //Hinzufügen der Parallax-Animationen zur Timeline
    layersRef.current.forEach((layer, i) => {
        tlParallax.to(layer, {
        yPercent: (i + 1) * 15,
        ease: "none",
        }, 0); // alle gleichzeitig starten
    });

    //Hero-Bild von den Layers abspalten
    const layersRefWo0 = layersRef.current.slice(1);

    //Timeline für die Anfangsanimation
    const tlIntroAnimation = gsap.timeline();

    //Hinzufügen der Anfangsanimation zur Timeline
    tlIntroAnimation.fromTo(layersRefWo0, {autoAlpha: 0, scale: 0.8,},{autoAlpha: 1, scale: 1, duration: 0.8, ease: "elastic.out(1,0.5)", stagger: {each: 0.1, from: "end"}})
             .fromTo(layersRef.current[0], {x:50,},{x: 0, ease: "elastic.out(1,0.5)", duration: 0.8}, "-=0.8")
             .fromTo(imageRef.current, {autoAlpha: 0}, {autoAlpha: 1, duration: 0.3, ease: "power1.inOut"}, "<")
             .fromTo(textRef.current, {autoAlpha: 0, scale: 0.8,},{autoAlpha: 1, scale: 1, ease: "elastic.out(1,0.5)", duration: 0.8, stagger: 0.1}, "<0.25");

    //Scrollanimation für Hero-Bild         
    gsap.fromTo(layersRef.current[0], { x: 0, autoAlpha: 1 }, { 
        x: 30,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power1.in",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom center",
            end: "bottom top",
            toggleActions: "play none none reverse",
        },
    });         
  });

  return (
    <section id="start" className="flex flex-col min-h-screen w-full relative overflow-hidden">
        <div className="flex flex-col mt-24 md:mt-0 md:min-h-screen w-full justify-center items-center absolute z-10">
            <div className="container py-4 px-12 text-center">
                <h1 ref={(el) => (textRef.current[0] = el)} className="opacity-0 text-4xl md:text-6xl 2xl:text-7xl mb-8">Hi, ich bin <b>Tilo</b>.</h1>
                <p className="text-base mb-2 flex flex-col gap-2 items-center justify-center"><span className="opacity-0" ref={(el) => (textRef.current[1] = el)}>Ich verbinde Technik und Gestaltung zu digitalen Erlebnissen, die funktionieren und begeistern.</span><span className="opacity-0" ref={(el) => (textRef.current[2] = el)}>Das ist mein Portfolio.</span></p>
            </div>
        </div>
        <div ref={containerRef} className="container w-full min-h-screen">
            <div ref={(el) => (layersRef.current[0] = el)} className="absolute will-change-transform max-h-1/2 md:max-h-4/5 lg:max-h-3/4 w-96 h-96 lg:w-108 lg:h-108 2xl:w-128 2xl:h-128 -bottom-2 -right-20 md:-right-8 lg:right-24 z-5">
                <Image ref={imageRef} className="opacity-0 object-contain" src="/images/header/me_sitting.png" fill alt="Hero sitzt" sizes="(max-width: 767px) 384px, 432px (max-width: 1023px) 384px, 432px (max-width: 1535px) 512px, 1048px" />
            </div>
            <div ref={(el) => (layersRef.current[1] = el)} className="absolute opacity-0 w-[150%] left-1/2 will-change-transform transform -translate-x-1/2 md:w-full mt-12 md:mt-0 min-h-screen blur-[0.5px] bg-[url('/images/header/parallax_layer_1.png')] bg-contain bg-center bg-no-repeat z-4"></div>
            <div ref={(el) => (layersRef.current[2] = el)} className="absolute opacity-0 w-[150%] left-1/2 will-change-transform transform -translate-x-1/2 md:w-full mt-12 md:mt-0 min-h-screen blur-[1px] bg-[url('/images/header/parallax_layer_2.png')] bg-contain bg-center bg-no-repeat z-3"></div>
            <div ref={(el) => (layersRef.current[3] = el)} className="absolute opacity-0 w-[150%] left-1/2 will-change-transform transform -translate-x-1/2 md:w-full mt-12 md:mt-0 min-h-screen blur-[2px] bg-[url('/images/header/parallax_layer_3.png')] bg-contain bg-center bg-no-repeat z-2"></div>
            <div ref={(el) => (layersRef.current[4] = el)} className="absolute opacity-0 w-[150%] left-1/2 will-change-transform transform -translate-x-1/2 md:w-full mt-12 md:mt-0 min-h-screen blur-[4px] bg-[url('/images/header/parallax_layer_4.png')] bg-contain bg-center bg-no-repeat z-1"></div>
        </div>
    </section>
  )
}

export default Header