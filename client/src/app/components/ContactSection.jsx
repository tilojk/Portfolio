"use client";
import React, {useRef} from 'react';
import Image from 'next/image';
import FormItem from './FormItem';
import gsap from "gsap";
import Link from 'next/link';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const ContactSection = () => {
  const imageRef= useRef(null);
  const username = process.env.NEXT_PUBLIC_BASIC_AUTH_USER;
  const password = process.env.NEXT_PUBLIC_BASIC_AUTH_PASS;
  const credentials = btoa(`${username}:${password}`);

  useGSAP(() => {
    //Hero-Animation       
    gsap.fromTo(imageRef.current, { x: -15, autoAlpha: 0 }, { 
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
            trigger: imageRef.current,
            start: "top 90%",
            end: "bottom top",
            toggleActions: "play none none reverse",
        },
    });    
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Basic ${credentials}`,
         },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Nachricht erfolgreich gesendet!");
        form.reset();
      } else {
        alert("Fehler beim Senden.");
      }
    } catch (error) {
      console.error(error);
      alert("Server nicht erreichbar.");
    }
  };

  return (
    <section id="contact" className='relative w-full min-h-screen bg-neutral-6 overflow-hidden'>
        <h2 className="relative text-4xl md:text-5xl 3xl:text-6xl pt-16 3xl:pt-24 mb-12 md:mb-16 2xl:mb-20 3xl:mb-24 text-center z-15">
            <b>Kontakt</b>
        </h2>
        <div className='relative w-full flex flex-col md:flex-row px-4 md:px-12 xl:px-24 gap-12 lg:gap-20 z-10'>
            <div className='md:flex-1'>
                <h3 className="text-xl md:text-2xl 2xl:text-3xl mb-4">Lass uns in Kontakt treten</h3>
                <p className='text-base 3xl:text-lg mb-2'>
                    Ich bin offen für spannende Projekte, kreative Herausforderungen und neue Möglichkeiten, mein Wissen weiterzuentwickeln.
                </p>
                <p className='text-base 3xl:text-lg mb-2'>
                    Ich freue mich über jede Nachricht. Fülle einfach das Formular aus oder kontaktiere mich direkt per Mail:
                </p>
                <Link href='mailto:tilo@v-jaekel.de' className='text-secondary-1 hover:underline 3xl:text-lg'>tilo@v-jaekel.de</Link>
            </div>
            <div className='md:flex-1'>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <FormItem label="E-Mail-Adresse" name="email" type="email" placeholder="deine@email.de" />
                    <FormItem label="Betreff" name="subject" type="text" placeholder="Dein Betreff" />
                    <FormItem label="Nachricht" name="message" type="textarea" placeholder="Deine Nachricht" />
                    <div>
                        <input type="checkbox" id="privacy" name="privacy" className="accent-secondary-1" required/>
                        <label htmlFor="privacy" className="text-white 3xl:text-lg pl-2 mb-2 text-base font-medium">Ich habe die <a href="/datenschutz" target="_blank" className="text-secondary-1 hover:underline">Datenschutzerklärung</a> gelesen und akzeptiere sie.</label>
                    </div>
                    <button type="submit" className="py-2.5 px-4 3xl:text-lg bg-secondary-2/80 backdrop-blur-xl hover:bg-secondary-2 transition-all duration-150 rounded-xl cursor-pointer w-fit">Absenden</button>
                </form>
            </div>
        </div>
        <div className="w-full h-80 md:min-h-screen md:absolute top-0 left-0 flex justify-center items-center mt-16 md:mt-auto">
            <div ref={imageRef} className="absolute max-h-1/2 md:max-h-4/5 lg:max-h-3/4 w-80 h-80 lg:w-96 lg:h-96 2xl:w-108 2xl:h-108 3xl:w-112 3xl:h-112 scale-x-[-1] -bottom-2 -left-20 md:-left-8 lg:left-24 z-5">
                <Image className="object-contain" src="/images/header/me_sitting.png" fill alt="Tilo sitzt" sizes="(min-width: 1536px) 432px, (min-width: 1024px) 384px, 320px" />
            </div>
            <div className="bg-radial from-secondary-1 to-transparent rounded-full h-128 w-128 3xl:h-140 3xl:w-140 z-0 blur-lg absolute top-full right-0 transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
    </section>
  )
}

export default ContactSection