import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SimpleIcon from './SimpleIcon';

const ProjectCard = React.forwardRef(({ title, imageSrc, faIcons, siIcons, onClick }, ref) => {

  return (
    <div ref={ref} onClick={onClick} className="w-full md:w-68 min-h-72 bg-neutral-3/20 backdrop-blur-sm rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 ease-out">
        <div className="relative w-full h-56">
            <Image src={imageSrc} className="object-cover rounded-t-xl" fill alt="Mockup des Projekts" sizes="(min-width: 1536px) 800px, (min-width: 1024px) 600px, 400px"/>
        </div>
        <h3 className="text-lg md:text-xl 2xl:text-2xl pt-4 px-4 pb-2 3xl:pb-4">{title}</h3>
        <div className="flex flex-row gap-2 h-6 mx-4 mb-4">
            {faIcons.map((faIcon, index) => <FontAwesomeIcon key={index} icon={faIcon} className='text-2xl'/>)}
            {siIcons.map((siIcon, index) => <SimpleIcon key={index} icon={siIcon} size="24"/>)}
        </div>
    </div>   
  )
});

export default ProjectCard