"use client";
import React, {useRef, useEffect} from 'react';
import Link from 'next/link';
import NavLink from './NavLink';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname, useRouter } from 'next/navigation';
gsap.registerPlugin(useGSAP);


const navLinks = [
    {
        title: "Start",
        path: "#start",
    },
    {
        title: "Über mich",
        path: "#about",
    },
    {
        title: "Wie ich hierher gekommen bin",
        path: "#cv",
    },
    {
        title: "Ausgewählte Projekte",
        path: "#projects",
    },
    {
        title: "Kontakt",
        path: "#contact",
    },
]


const NavOverlay = ({ onClose }) => {
  const overlayRef = useRef(null);
  const tl = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

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

  const handleNavClick = (href) => (event) => {
    event.preventDefault(); // Link Standard verhindern, sonst springt es sofort

    tl.current.reverse();

    setTimeout(() => {
      const targetId = href.replace("#", "");
      if (pathname === "/") {
        // Auf der Startseite: Smooth scrollen
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Auf anderen Seiten: Navigiere zur Startseite mit Hash
        router.push(`/#${targetId}`);
      }
      enableScroll();
    }, 300);
  };

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

    //Animation zum Einblenden der Navigation
    tl.current.from(overlayRef.current, {autoAlpha: 0, ease: "power1.out", duration: 0.1})
              .from("li", {autoAlpha: 0, x:-25, duration: 0.2, ease: "power2.out", stagger: 0.05}, "<");
  }, {scope: overlayRef});

  return (
    <>
    <div className="absolute top-0 p-4 z-50">
        <button onClick={() => {tl.current.reverse(); enableScroll();}} className='cursor-pointer h-10 w-10 md:h-8 md:w-8 hover:text-secondary-1 transition-all duration-150'>
                <XMarkIcon className='h-10 w-10 md:h-8 md:w-8'/>
        </button>
    </div>
    <div ref={overlayRef} className='absolute top-0 min-h-screen w-full bg-neutral-950/80 backdrop-blur-sm flex flex-col justify-center items-center z-40'>
        <ul className='flex flex-col gap-8 justify-center items-center w-full'>
            {navLinks.map((link, index) => (
                <li key={index}>
                    <NavLink href={link.path} onClick={handleNavClick(link.path)}>{link.title}</NavLink>
                </li>
            ))}
        </ul>
    </div>
    </>
  )
}

export default NavOverlay