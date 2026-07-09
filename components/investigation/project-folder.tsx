"use client";

import React from 'react';
import { Project } from '@/types/data';
import { Folder } from './folder';
import { motion } from 'framer-motion';

interface ProjectFolderProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export const ProjectFolder = ({ project, onClick, index }: ProjectFolderProps) => {
  // Alternate rotation for a messy desk look
  const rotations = [-3, 2, -1, 4];
  const rotation = rotations[index % rotations.length];

  return (
    <Folder 
      label={project.caseNumber}
      classification={project.classification}
      rotation={rotation}
      onClick={onClick}
      className="w-full sm:w-80 h-96 shrink-0 transition-transform duration-300"
    >
      <div className="flex flex-col h-full pointer-events-none">
        <div className="flex justify-between items-start mb-2 border-b border-[#C5AD7E] pb-2">
          <h3 className="font-bold text-xl uppercase tracking-wider">{project.title}</h3>
          <span className={`text-xs font-bold px-2 py-1 ${project.status === 'COMPLETED' ? 'bg-green-900/20 text-green-800' : 'bg-amber-900/20 text-amber-800'}`}>
            {project.status}
          </span>
        </div>
        
        <div className="flex-grow space-y-4 py-2">
          <div>
            <span className="font-bold underline text-sm mb-1 block">SUMMARY:</span>
            <p className="text-sm line-clamp-3">{project.summary}</p>
          </div>
          
          <div>
            <span className="font-bold underline text-sm mb-1 block">TECH STACK:</span>
            <div className="flex flex-wrap gap-1">
              {project.techStack.slice(0, 4).map((tech, i) => (
                <span key={i} className="bg-ink/10 text-ink px-1.5 py-0.5 text-xs">
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="bg-ink/10 text-ink px-1.5 py-0.5 text-xs">...</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-[#C5AD7E]/50 flex justify-end">
          <span className="text-evidence-red font-bold uppercase text-sm tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
            Open Case <span className="text-lg">→</span>
          </span>
        </div>
      </div>
    </Folder>
  );
};
