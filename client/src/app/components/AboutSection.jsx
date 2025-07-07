"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import Textbox from './Textbox';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const aboutTexts = [
    {
        title: '<b>Wer</b> ich <b>bin</b>',
        text: 'Ich heiße Tilo Jäkel und studiere im 6. Semester Medieninformatik an der Technischen Hochschule Mittelhessen.',
    },
    {
        title: 'Meine <b>Schwerpunkte</b>',
        text: 'Mein Schwerpunkt im Studium ist “Web- und mobile Anwendungen”. Dabei interessiere ich mich besonders für die Kombination von Technik und Gestaltung im Frontend-Development.',
    },
    {
        title: '<b>Wie</b> ich <b>arbeite</b>',
        text: 'Ich arbeite gerne im Team und bringe eigene Ideen ein. In Projekten bringe ich den Blick fürs Detail mit, ohne das große Ganze aus den Augen zu verlieren.'
    }
]

const AboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {

    //Hero-Animation
    gsap.from(imageRef.current, {
        x:-30,
        autoAlpha: 0,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 15%",
            end: "bottom 75%",
            toggleActions: "play reverse play reverse",
        },
    });


  }, {scope: sectionRef});

  return (
    <section id="about" ref={sectionRef} className="bg-gradient-to-b from-neutral-6 to-bluebg flex flex-col min-h-screen w-full relative overflow-hidden z-20">
        <div className="h-6 w-full bg-neutral-5/50 backdrop-blur-sm rounded-t-xl">
        </div>
        <div className="w-full min-h-[calc(100vh-1.5rem)] bg-neutral-4/50 rounded-b-xl flex flex-col justify-center items-center">
            <h2 className="text-4xl md:text-5xl mt-8 mb-4 lg:mb-8 xl:mb-12 2xl:mb-16 xl:-mt-4 text-center"><b>&Uuml;ber mich</b></h2>
            <div className="w-full flex flex-col items-center lg:flex-row lg:justify-center gap-8 lg:gap-12 p-4 xl:p-0">
                <div className="animated relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 2xl:h-96 2xl:w-96 lg:order-2">
                    <Image src="/images/about/about.jpg?v=2" className="object-cover rounded-full" fill alt="Foto von Tilo Jäkel" sizes="(min-width: 1536px) 384px, (min-width: 1024px) 320px, (min-width: 768px) 288px, 256px"/>
                </div>
                <div className="w-full lg:w-2/3 xl:w-1/2 flex flex-col gap-4 z-25 lg:order-1 mb-4">
                    {aboutTexts.map((text, index) => (
                        <Textbox className="animated" key={index} title={text.title} text={text.text} />
                    ))}
                </div>
            </div>
        </div>
        <div ref={imageRef} className="absolute hidden xl:block max-h-1/2 md:max-h-4/5 lg:max-h-3/4 w-96 h-96 lg:w-108 lg:h-108 -bottom-16 2xl:bottom-0 -left-16">
            <Image className="object-contain" src="/images/about/about_me.png" fill alt="Hero zeigt die About-Section" sizes="(min-width: 1280px) 432px"/>
        </div>
    </section>
  )
}

export default AboutSection