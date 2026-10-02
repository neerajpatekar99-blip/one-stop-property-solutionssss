"use client";

import { Play, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PropertyVideoSection({ videos, videoUrl, title }) {
  // Support both array 'videos' and single string 'videoUrl' for backward compatibility
  const videoList = videos?.length > 0 ? videos : (videoUrl ? [videoUrl] : []);
  
  if (videoList.length === 0) return null;

  return (
    <section className="py-10 sm:py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-brand font-bold text-[10px] uppercase tracking-[0.2em] mb-3">
              <span className="w-6 h-px bg-brand" /> Virtual Experience <span className="w-6 h-px bg-brand" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-navy-900 leading-tight">Property Video Tours</h2>
          </div>
          <div className="flex items-center gap-2 text-navy-400 text-xs font-medium bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <PlayCircle size={14} className="text-brand" />
            {videoList.length} High-Definition {videoList.length === 1 ? 'Tour' : 'Walkthroughs'}
          </div>
        </div>
        
        {/* Horizontal layout using Grid - reduces vertical length significantly */}
        <div className={`grid grid-cols-1 gap-6 ${videoList.length > 1 ? 'md:grid-cols-2' : 'max-w-4xl mx-auto'}`}>
          {videoList.map((video, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group relative rounded-[2rem] overflow-hidden shadow-xl shadow-navy-900/5 bg-slate-950 border border-gray-100 hover:shadow-2xl hover:shadow-brand/10 transition-all duration-500"
            >
              <div className="aspect-video w-full relative">
                <video 
                  controls 
                  className="w-full h-full object-cover"
                  poster="/video-placeholder.jpg"
                >
                  <source src={typeof video === 'string' ? video : video.src} type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>
              </div>
              <div className="p-5 bg-white flex items-center justify-between gap-4 border-t border-gray-50">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-navy-800 truncate">
                    {typeof video === 'object' ? video.title : `${title || 'Property'} - Walkthrough ${idx + 1}`}
                  </h3>
                  <p className="text-[10px] text-navy-400 uppercase tracking-widest font-black mt-0.5">Project Tour</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand/5 flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                  <Play size={16} fill="currentColor" className="ml-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}