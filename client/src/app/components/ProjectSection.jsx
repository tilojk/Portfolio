"use client";
import React, { useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import ProjectOverlay from './ProjectOverlay';
import { faHtml5, faCss, faJs, faReact, faVuejs} from '@fortawesome/free-brands-svg-icons';
import { siNextdotjs, siTailwindcss, siNestjs, siTypo3, siWordpress } from 'simple-icons/icons';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP);


const projects = [
  {
    title: "THM MI Universum",
    images: [
      '/images/projects/mi_universum/mockup.jpg',
      '/images/projects/mi_universum/screenshot_copilot.png',
      '/images/projects/mi_universum/screenshot_planet.png',
      '/images/projects/mi_universum/screenshot_level.png',
      '/images/projects/mi_universum/screenshot_skills.png',
    ],
    text: "Im 4. Semester haben wir im Team das \„THM Medieninformatik Universum\“ entwickelt. Dabei handelt es sich um eine Website, um Interessierten interaktiv das Medieninformatik-Studium vorzustellen. Ich war für die Planetenansicht, die Skillübersicht und einzelne Level zuständig.",
    faTitles: ["HTML", "CSS", "Javascript"],
    faIcons: [faHtml5, faCss, faJs],
    siIcons: [],
  },
  {
    title: "Bobrmon",
    images: [
      "/images/projects/bobrmon/mockup.jpg",
      "/images/projects/bobrmon/mockup_2.jpg",
      "/images/projects/bobrmon/screenshot_desktop.png",
      "/images/projects/bobrmon/screenshot_about.png",
      "/images/projects/bobrmon/screenshot_levelauswahl.png",
      "/images/projects/bobrmon/screenshot_reviews.png",
      "/images/projects/bobrmon/screenshot_field_1.png",
      "/images/projects/bobrmon/screenshot_field.png",
      "/images/projects/bobrmon/screenshot_dialogue.png",
      "/images/projects/bobrmon/screenshot_einert.png",
      "/images/projects/bobrmon/screenshot_fight.png",
      "/images/projects/bobrmon/screenshot_fight_2.png",
    ],
    text: "Im 4. Semester haben wir im Team das Online-Programmierlernspiel \„Bobrmon\“ und eine dazugehörige Landingpage entwickelt. Ich war dabei für die Landingpage und die Mitgestaltung der Kämpfe verantwortlich.",
    faTitles: ["HTML", "CSS", "Javascript"],
    faIcons: [faHtml5, faCss, faJs],
    siIcons: [],
  },
  {
    title: "PizzaLab",
    images: [
      "/images/projects/pizzalab/mockup.jpg",
      "/images/projects/pizzalab/screenshot_login.png",
      "/images/projects/pizzalab/screenshot_startseite.png",
      "/images/projects/pizzalab/screenshot_config.png",
      "/images/projects/pizzalab/screenshot_zusammenfassung.png",
      "/images/projects/pizzalab/screenshot_warenkorb.png",
    ],
    text: "Im 5. Semester haben wir im Team \"PizzaLab\" entwickelt. Dabei handelt es sich um einen Online-Pizzakonfigurator, an dessen Beispiel wir die Frameworks Vue.js und React miteinander verglichen haben. Ich war dabei für die Mitgestaltung der Benutzeroberfläche und die Umsetzung des Chatbots verantwortlich.",
    faTitles: ["React", "Vue.js"],
    faIcons: [faReact, faVuejs],
    siIcons: [siNestjs],
  },
  {
    title: "LDK Energie & Klima",
    images: [
      "/images/projects/energie-klima-ldk/mockup.jpg"
    ],
    text: "Im Rahmen meiner Arbeit bei der Stabstelle Klimaschutz des Lahn-Dill-Kreises habe ich die Website <a href='https://energie-klima-ldk.de' target='_blank' rel='noopener noreferrer' class='text-secondary-1 hover:underline'>energie-klima-ldk.de</a> und deren Umzug von TYPO3 auf Wordpress betreut.",
    faIcons: [],
    siIcons: [siTypo3, siWordpress],
  },
  {
    title: "Tilo's Portfolio",
    images: [
      "/images/projects/portfolio/mockup.jpg"
    ],
    text: "Ein modernes Webdesigner-Portfolio, das responsives Design, UI/UX-Fähigkeiten und Frontend-Entwicklung mit Next.js, GSAP und Tailwindcss präsentiert.",
    faIcons: [],
    siIcons: [siNextdotjs, siTailwindcss],
  },
]

const ProjectSection = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [origin, setOrigin] = useState(null);
  const projectCardsRef = useRef([]);

  return (
    <section id="projects" className='relative w-full min-h-screen 2xl:min-h-auto bg-bluebg'>
      <div className='absolute h-full w-full bg-[linear-gradient(to_bottom,_transparent_0rem,_#1E2A45_5rem,_#1C1C1C_100%)] z-25'></div>
        <div className='relative z-30'>
          <h2 className="text-4xl md:text-5xl pt-20 mb-8 lg:mb-8 xl:mb-12 2xl:mb-16 text-center">
              <b>Ausgewählte Projekte</b>
          </h2>
          <div className='w-full min-h-[calc(100vh-16rem)] 2xl:min-h-auto flex flex-wrap xl:flex-nowrap flex-row justify-center items-center p-8 gap-8 lg:mb-16'>
              {projects.map((project, index) => (
                <ProjectCard key={index} onClick={() => {
                  setIsOverlayOpen(true);
                  setSelectedProject(project);
                  setOrigin(projectCardsRef.current[index]);
                }}
                ref={(el) => (projectCardsRef.current[index] = el)}
                title={project.title}
                imageSrc={project.images[0]}
                faIcons={project.faIcons}
                siIcons={project.siIcons}/>
              ))}
          </div>
        </div>
        {isOverlayOpen && 
        <ProjectOverlay
        origin={origin}
        title={selectedProject.title} 
        images={selectedProject.images} 
        text={selectedProject.text}
        faTitles={selectedProject.faTitles}
        faIcons={selectedProject.faIcons} 
        siIcons={selectedProject.siIcons}
        onClose={() => setIsOverlayOpen(false)}
        />
        }
    </section>
  )
}

export default ProjectSection