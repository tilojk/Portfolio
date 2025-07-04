"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SimpleIcon from './SimpleIcon';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(useGSAP, Flip);

const ProjectOverlay = ({origin, title, text, images, faTitles, faIcons, siIcons, onClose}) => {

  const [currentIndex, setCurrentIndex] = useState(1); //Starte beim ersten echten Bild
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const sliderRef = useRef(null);
  const timeoutRef = useRef(null);
  const isAnimating = useRef(false);
  const overlayRef = useRef(null);
  const cardRef = useRef(null);
  const tl = useRef(null);

  // Scroll-Ereignisse blockieren
  function preventScroll(event) {
    event.preventDefault();
  }

  function onKeyDownHandler(event) {
    // Scroll verhindern bei Pfeiltasten usw.
    if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(event.keyCode)) {
        event.preventDefault();
    }
  }

  // Scrollen wieder erlauben
  function enableScroll() {
    window.removeEventListener('wheel', preventScroll);
    window.removeEventListener('touchmove', preventScroll);
    window.removeEventListener('keydown', onKeyDownHandler);
  }

  useEffect(() => {
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', onKeyDownHandler, { passive: false });

    return () => {
    // Cleanup: Entfernt die Listener beim Unmount oder wenn sich deps ändern
    enableScroll();
    };
  });

  useGSAP(() => {
    tl.current = gsap.timeline({
        onReverseComplete: () => {
            onClose(); //onClose ausführen, wenn Animation rückwärts abgeschlossen wird
        }
    });
    
    //Übergangsanimation von Card-Übersicht zur vergrößerten Card
    if (cardRef.current && origin) {
        //Speichere den normalen Zustand (normaler Ort des cards)
        const normalState = Flip.getState(cardRef.current);

        //Setze card sofort an die origin Position
        Flip.fit(cardRef.current, origin, { scale: true });

        tl.current.from(overlayRef.current, {autoAlpha: 0, ease: "power1.out", duration: 0.1}) //blende Overlay ein
        .from(cardRef.current, {autoAlpha: 0, duration: 0.3}, "<") //blende vergrößerte Card ein

        //Von origin zurück zum normalen Zustand
        .add(Flip.to(normalState, {
            targets: cardRef.current,
            duration: 0.25,
            ease: "power1.inOut",
            scale: true,
            onComplete: () => {
                origin.style.cssText = '';
            }
        }), "<")
    }
  });

  // Klone letztes und erstes Bild für Loop Transition
  const imageList = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  //Wechsel zum nächsten Bild
  const nextSlide = () => {
    if (!isAnimating.current && isTransitionEnabled) {
        isAnimating.current = true;
        setCurrentIndex((prev) => (prev + 1) % imageList.length);
        setTimeout(() => {
            isAnimating.current = false;
        }, 700); // muss zur Transition-Dauer passen
    }
  };

  //Wechsel zum vorherigen Bild
  const prevSlide = () => {
    if (!isAnimating.current && isTransitionEnabled) {
        isAnimating.current = true;
        setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
        setTimeout(() => {
            isAnimating.current = false;
        }, 700); // muss zur Transition-Dauer passen
    }
  };

  //Wenn es mehr als ein Bild gibt, soll automatisch gewechselt werden
  if (images.length > 1) {
    useEffect(() => {

        const startAutoSlide = () => {
            timeoutRef.current = setInterval(nextSlide, 5000);
        };

        startAutoSlide();

        return () => clearInterval(timeoutRef.current);
    }, []); // ← nur einmal beim Mount
  }


  useEffect(() => {
    
    //Loop einfügen durch Wechsel vom letzten Bild zum ersten Bild
    if (currentIndex === imageList.length - 1) {
        // ganz rechts → zurück zu index 1
        setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(1);
        setTimeout(() => {setIsTransitionEnabled(true)}, 100);
        }, 700); // muss zur Transition-Dauer passen
    }

    //Loop einfügen durch Wechsel vom ersten Bild zum letzten Bild
    if (currentIndex === 0) {
        // ganz links → zurück zu index (last - 1)
        setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(imageList.length - 2);
        setTimeout(() => {setIsTransitionEnabled(true)}, 100);
        }, 700);
    }
  }, [currentIndex]);

  //Funktion für manuellen Slide
  const handleManualSlide = (direction) => {
    clearInterval(timeoutRef.current);
    direction === 'next' ? nextSlide() : prevSlide();
    timeoutRef.current = setInterval(nextSlide, 5000); //reseten des Auto-Slides
  };
    
  return (
    <>
        <div ref={overlayRef} className='fixed top-0 min-h-screen w-full bg-neutral-950/95 z-100'></div>
        <div className='fixed top-0 min-h-screen w-full flex justify-center items-center z-150'>
            <div ref={cardRef} className="container relative m-4 w-3xl 2xl:w-5xl bg-neutral-3/20 backdrop-blur-sm rounded-xl">
                <div className="absolute top-0 w-full flex justify-end bg-gradient-to-b rounded-t-xl from-black/20 to-black/0 p-4 z-50">
                    <button onClick={() => {tl.current.reverse(); enableScroll();}} className='cursor-pointer h-10 w-10 md:h-8 md:w-8 hover:text-secondary-1 transition-all duration-150'>
                            <XMarkIcon className='h-10 w-10 md:h-8 md:w-8'/>
                    </button>
                </div>
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl">
                    <div
                    ref={sliderRef}
                    className={`flex h-full transition-transform duration-700 ease-in-out ${!isTransitionEnabled ? '!duration-0' :'duration-700'}`}
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                    onTransitionEnd={() => {
                        if (!isTransitionEnabled) {
                        setIsTransitionEnabled(true);
                        }
                    }}
                    >
                    {imageList.map((src, index) => (
                        <div key={index} className="relative min-w-full h-full">
                        <Image
                            src={src}
                            alt={`Slide ${index}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 768px, (max-width: 1536px) 1024px, (min-width: 1536px) 1440px"
                        />
                        </div>
                    ))}
                    </div>

                    {/* Slide Controls */}
                    {(images.length > 1) && 
                    <div className='absolute left-0 top-0 h-full rounded-tl-xl bg-gradient-to-r from-black/20 to-black/0 flex items-center'>
                        <button
                        onClick={() => handleManualSlide('prev')}
                        className="p-4 cursor-pointer hover:text-secondary-1 transition-all duration-150"
                        >
                            <ChevronLeftIcon className="h-10 w-10 md:h-8 md:w-8" />
                        </button>
                    </div>}
                    {(images.length > 1) &&
                    <div className='absolute right-0 top-0 h-full rounded-tr-xl bg-gradient-to-l from-black/20 to-black/0 flex items-center'>
                        <button
                        onClick={() => handleManualSlide('next')}
                        className="p-4 cursor-pointer hover:text-secondary-1 transition-all duration-150"
                        >
                            <ChevronRightIcon className="h-10 w-10 md:h-8 md:w-8" />
                        </button>
                    </div>}
                    {/* Image-Indikator */}
                    {(images.length > 1) &&
                        <div className="absolute bottom-0 w-full flex justify-center bg-gradient-to-t from-black/20 to-black/0 p-4 z-50">
                            <div className="flex gap-2">
                                {images.map((_, index) => (
                                    <div
                                    key={index}
                                    onClick={() => {
                                        if (index !== currentIndex + 1) {
                                            clearInterval(timeoutRef.current);
                                            setCurrentIndex(index + 1);
                                            timeoutRef.current = setInterval(nextSlide, 5000);
                                        }
                                    }}
                                    className={`w-3 h-3 rounded-full transition-all hover:bg-neutral-1 cursor-pointer duration-300 ${
                                        index === currentIndex - 1 ? "bg-neutral-1 scale-125" : "bg-neutral-1/40"
                                    }`}
                                    />
                                ))}
                            </div>
                    </div>}
                </div> 
                <div className="p-4">
                    <h3 className="text-2xl md:text-3xl 2xl:text-4xl pb-2"><b>{title}</b></h3>
                    <p className='text-base pb-4' dangerouslySetInnerHTML={{ __html: text }}>
                    </p>
                    <h4 className="text-xl md:text-2xl 2xl:text-3xl pb-2">Verwendete Technologien</h4>
                    <div className="flex flex-row gap-2">
                        {faIcons.map((faIcon, index) => <FontAwesomeIcon key={index} title={faTitles[index]} icon={faIcon} className='text-2xl'/>)}
                        {siIcons.map((siIcon, index) => <SimpleIcon key={index} icon={siIcon} size="24"/>)}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProjectOverlay