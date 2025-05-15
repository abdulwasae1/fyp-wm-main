"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Youtube, Edit } from "lucide-react";
import { VideoProcessingService } from "./VideoProcessingService";

interface GeneratedVideosProps {
  videos: string[];
  downloadingStates: boolean[];
  setState: React.Dispatch<React.SetStateAction<any>>;
  openVideoEditor: (videoUrl: string) => void;
}

const GeneratedVideos: React.FC<GeneratedVideosProps> = ({ 
  videos, 
  downloadingStates, 
  setState,
  openVideoEditor
}) => {
  // Create service instance to handle video downloads and sharing
  const videoProcessingService = new VideoProcessingService(
    { downloadingStates, generatedVideos: videos } as any, 
    setState
  );

  const handleDownloadAndOpenInstagram = async (fullVideoUrl: string, index: number) => {
    await videoProcessingService.downloadAndShareVideo(fullVideoUrl, index, 'instagram');
  };

  const handleDownloadAndOpenFacebook = async (fullVideoUrl: string, index: number) => {
    await videoProcessingService.downloadAndShareVideo(fullVideoUrl, index, 'facebook');
  };

  const handleDownloadAndOpenYouTube = async (fullVideoUrl: string, index: number) => {
    await videoProcessingService.downloadAndShareVideo(fullVideoUrl, index, 'youtube');
  };

  return (
    <div className="mt-8 w-full">
      <h2 className="text-xl font-bold text-center mb-4">
        Generated Short Videos:
      </h2>

      {/* ── scrollable container ─────────────────────────────────── */}
      <div className="mx-auto w-full max-w-4xl max-h-[34rem] overflow-y-auto rounded-xl bg-gradient-to-b from-transparent to-violet-950 ring-1 ring-border border-slate-800 p-4 shadow-sm">
        <div className="flex flex-col items-center gap-8">
          {videos.map((videoUrl, index) => {
            const fullVideoUrl = new URL(
              videoUrl,
              process.env.NEXT_PUBLIC_API_URL,
            ).toString();
            const downloading = downloadingStates[index] || false;

            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="relative w-full max-w-md">
                  {/* Video with clickable overlay */}
                  <div 
                    className="relative group cursor-pointer"
                    onClick={() => openVideoEditor(fullVideoUrl)}
                  >
                    <video
                      src={fullVideoUrl}
                      controls
                      className="w-full border rounded shadow"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-col items-center justify-center text-white">
                        <Edit className="h-12 w-12" />
                        <span className="mt-2 font-medium">Edit Video</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Edit button below video */}
                  <Button 
                    onClick={() => openVideoEditor(fullVideoUrl)}
                    variant="outline"
                    className="absolute bottom-2 right-2 bg-violet-800 text-white hover:bg-violet-700 border-none"
                  >
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </div>

                {/* — social media buttons — */}
                <div className="flex gap-6 mt-[5%]">
                  {/*  Instagram  */}
                  <Button
                    onClick={() => handleDownloadAndOpenInstagram(fullVideoUrl, index)}
                    disabled={downloading}
                    className="w-full max-w-xs flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-2xl disabled:opacity-50"
                  >
                    {downloading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Instagram className="h-5 w-5" />
                        <span>Instagram</span>
                      </>
                    )}
                  </Button>

                  {/*  Facebook  */}
                  <Button
                    onClick={() => handleDownloadAndOpenFacebook(fullVideoUrl, index)}
                    disabled={downloading}
                    className="w-full max-w-xs flex items-center justify-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl disabled:opacity-50"
                  >
                    {downloading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Facebook className="h-5 w-5" />
                        <span>Facebook</span>
                      </>
                    )}
                  </Button>

                  {/*  YouTube  */}
                  <Button
                    onClick={() => handleDownloadAndOpenYouTube(fullVideoUrl, index)}
                    disabled={downloading}
                    className="w-full max-w-xs flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-2xl disabled:opacity-50"
                  >
                    {downloading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Preparing...
                      </>
                    ) : (
                      <>
                        <Youtube className="h-5 w-5" />
                        <span>YouTube</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ─────────────────────────────────────────────────────────── */}
    </div>
  );
};

export default GeneratedVideos;