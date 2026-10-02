"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Youtube, Calendar, Play, ExternalLink, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CHANNEL_ID = "UCbr8QF0c8H3HGYXtzl9hhCQ";
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

const fallbackVideos = [
  {
    id: { videoId: "tour-sector21" },
    snippet: {
      title: "1 & 2 BHK Luxury Ready Possession Flats in Kamothe Sector 21",
      description: "Full walkthrough tour with Adv. Sachin Bhoir. Clear CIDCO title, OC received, close to Khandeshwar station.",
      publishedAt: "2026-02-15T00:00:00Z",
      thumbnails: { high: { url: "/gallery/01.webp" } }
    }
  },
  {
    id: { videoId: "airport-corridor" },
    snippet: {
      title: "Navi Mumbai International Airport & Pushpak Nagar Corridor Analysis",
      description: "Key investment insights and upcoming Metro Line 1 connectivity across Panvel and Kamothe.",
      publishedAt: "2026-03-01T00:00:00Z",
      thumbnails: { high: { url: "/gallery/02.webp" } }
    }
  },
  {
    id: { videoId: "rera-verification" },
    snippet: {
      title: "How to Verify MahaRERA Legal Title Before Buying Property in Navi Mumbai",
      description: "Essential legal guidance by Adv. Sachin Bhoir to avoid unapproved construction and title disputes.",
      publishedAt: "2026-03-10T00:00:00Z",
      thumbnails: { high: { url: "/gallery/03.webp" } }
    }
  }
];


export default function YouTubeSection() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVideos() {
      if (!API_KEY) {
        setVideos(fallbackVideos);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&order=date&maxResults=6&type=video&part=snippet`
        );
        const data = await res.json();

        if (data.error) throw new Error(data.error.message);
        setVideos(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-[2.5rem] aspect-video bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (error || videos.length === 0) return null;

  return (
    <div className="space-y-10 lg:space-y-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
        {videos.map((video, index) => (
          <motion.a
            key={video.id.videoId}
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group block bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand/15 transition-all duration-500"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Glassmorphism Play Overlay */}
              <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/40 transition-colors duration-500 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/30 transform group-hover:scale-110 transition-all duration-500 shadow-2xl">
                  <Play size={28} fill="currentColor" className="ml-1" />
                </div>
              </div>
            </div>
            <div className="p-7">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                  <Calendar size={12} className="text-brand" />
                  {new Date(video.snippet.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <PlayCircle size={14} className="text-brand opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-navy-800 font-serif text-lg leading-snug line-clamp-2 group-hover:text-brand transition-colors duration-300">
                {video.snippet.title}
              </h3>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
        <a href="https://www.youtube.com/@sachinbhoir9361?sub_confirmation=1" target="_blank" rel="noopener noreferrer" className="btn-primary w-full sm:w-auto px-12 py-4">
          <Youtube size={18} className="mr-2" /> Subscribe to Channel
        </a>
        <a href="https://www.youtube.com/@sachinbhoir9361" target="_blank" rel="noopener noreferrer" className="btn-outline w-full sm:w-auto px-12 py-4">
          View All Videos <ExternalLink size={14} className="ml-2" />
        </a>
      </div>
    </div>
  );
}