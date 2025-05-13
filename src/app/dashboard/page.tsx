"use client"; // Ensure this is a client component since it interacts with the backend

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axios";
import { Instagram, Facebook, Youtube, Edit } from "lucide-react";
import { useDashboardState } from "./DashboardStateContext";
import VideoEditorPopup from "./VideoEditorPopup";

interface TranscriptStatusResponse {
  status: string;
  transcription?: string;
  transcript_id?: string;
}

interface GeneratedVideosResponse {
  video_paths: string[];
  message?: string;
  status?: "not_started" | "processing" | "completed";
}

const DashboardPage: React.FC = () => {
  // Use our custom hook to access dashboard state
  const { state, setState } = useDashboardState();
  
  // State for video editor popup
  const [showEditor, setShowEditor] = useState(false);
  const [currentEditingVideo, setCurrentEditingVideo] = useState("");
  const [pollingIntervalId, setPollingIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Cleanup function to clear any interval when component unmounts
    return () => {
      if (pollingIntervalId) {
        clearInterval(pollingIntervalId);
      }
    };
  }, [pollingIntervalId]);

  const openVideoEditor = (videoUrl: string) => {
    setCurrentEditingVideo(videoUrl);
    setShowEditor(true);
  };

  const closeVideoEditor = () => {
    setShowEditor(false);
  };
  
  const handleDownloadAndOpenInstagram = async (fullVideoUrl: string, index: number) => {
    const updatedStates = [...state.downloadingStates];
    updatedStates[index] = true;
    setState(prev => ({ ...prev, downloadingStates: updatedStates }));

    try {
      // First, fetch the video to ensure it's downloaded completely
      const response = await fetch(fullVideoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create and trigger download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `instagram-video-${index + 1}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // After download started, try to open Instagram
      setTimeout(() => {
        // Try mobile app URI first
        // window.location.href = "instagram://camera";
        
        // After a short delay, open the website regardless
        setTimeout(() => {
          window.open("https://www.instagram.com/", "_blank", "noopener,noreferrer");
        }, 1000);
      }, 1500);
      
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Error downloading the video. Please try again.");
    } finally {
      // Reset downloading state
      setTimeout(() => {
        const updatedStatesAfter = [...state.downloadingStates];
        updatedStatesAfter[index] = false;
        setState(prev => ({ ...prev, downloadingStates: updatedStatesAfter }));
      }, 3000);
    }
  };

  const handleDownloadAndOpenFacebook = async (fullVideoUrl: string, index: number) => {
    const updatedStates = [...state.downloadingStates];
    updatedStates[index] = true;
    setState(prev => ({ ...prev, downloadingStates: updatedStates }));

    try {
      // First, fetch the video to ensure it's downloaded completely
      const response = await fetch(fullVideoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create and trigger download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `facebook-video-${index + 1}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // After download started, try to open Facebook
      setTimeout(() => {
        // Try mobile app URI first
        // window.location.href = "fb://composer";
        
        // After a short delay, open the website regardless
        setTimeout(() => {
          window.open("https://www.facebook.com/", "_blank", "noopener,noreferrer");
        }, 1000);
      }, 1500);
      
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Error downloading the video. Please try again.");
    } finally {
      // Reset downloading state
      setTimeout(() => {
        const updatedStatesAfter = [...state.downloadingStates];
        updatedStatesAfter[index] = false;
        setState(prev => ({ ...prev, downloadingStates: updatedStatesAfter }));
      }, 3000);
    }
  };

  const handleDownloadAndOpenYouTube = async (fullVideoUrl: string, index: number) => {
    const updatedStates = [...state.downloadingStates];
    updatedStates[index] = true;
    setState(prev => ({ ...prev, downloadingStates: updatedStates }));

    try {
      // First, fetch the video to ensure it's downloaded completely
      const response = await fetch(fullVideoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create and trigger download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `youtube-video-${index + 1}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // After download started, open YouTube upload page
      setTimeout(() => {
        // After a short delay, open the YouTube upload page in a new tab
        const youtubeWindow = window.open("https://studio.youtube.com/channel/UC/videos/upload", "_blank", "noopener,noreferrer");
        
        // Handle case where popup might be blocked
        if (!youtubeWindow || youtubeWindow.closed || typeof youtubeWindow.closed === 'undefined') {
          console.warn("YouTube window was blocked by the browser. Please check your popup blocker settings.");
          alert("YouTube window was blocked. Please check your popup blocker settings and try again.");
          setState(prev => ({
            ...prev,
            responseMessage: "Couldn't open YouTube automatically. Downloaded video successfully. Please manually upload to YouTube."
          }));
        }
      }, 1500);
      
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Error downloading the video. Please try again.");
    } finally {
      // Reset downloading state
      setTimeout(() => {
        const updatedStatesAfter = [...state.downloadingStates];
        updatedStatesAfter[index] = false;
        setState(prev => ({ ...prev, downloadingStates: updatedStatesAfter }));
      }, 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Set processingComplete to false when starting the process
    setState(prev => ({ ...prev, processingComplete: false, loading: true }));
    try {
      const response = await axios.post("/videos/", {
        source_url: state.videoURL,
        title: "Video Title",
      });
      setState(prev => ({ 
        ...prev, 
        responseMessage: response.data.message,
        transcriptionLoading: true,
        loading: false
      }));
      pollForTranscription();
    } catch (error: any) {
      setState(prev => ({ 
        ...prev, 
        responseMessage: error.response?.data?.detail || "An error occurred.",
        processingComplete: true,
        loading: false
      }));
    }
  };

  const pollForTranscription = async () => {
    const interval = setInterval(async () => {
      try {
        // Call the transcription endpoint expecting a blob response.
        const response = await axios.get("/transcription-status/", { responseType: "blob" });
        const contentType = response.headers["content-type"];

        // If the response is JSON, transcription is still pending.
        if (contentType.includes("application/json")) {
          const textResponse = await response.data.text();
          const jsonResponse: TranscriptStatusResponse = JSON.parse(textResponse);
          if (jsonResponse.status === "pending") {
            console.log("Transcription pending...");
            return; // Continue polling.
          }
        }

        // If we get a plain text response, the transcription is ready.
        if (contentType.includes("text/plain")) {
          const fileText = await response.data.text();
          setState(prev => ({
            ...prev,
            transcription: fileText,
            transcriptionBlob: response.data,
            transcriptionLoading: false
          }));
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
        setState(prev => ({ ...prev, processingComplete: true }));
        clearInterval(interval);
      }
    }, 5000);
  };

  const downloadTranscription = () => {
    if (state.transcriptionBlob) {
      const url = window.URL.createObjectURL(state.transcriptionBlob);
      const element = document.createElement("a");
      element.href = url;
      element.download = "transcription.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      window.URL.revokeObjectURL(url);
    }
  };

  const handleGenerateScripts = async () => {
    const transcriptId = "combined";
  
    if (state.pollingStarted) {
      console.log("Polling already started. Skipping new request.");
      return;
    }
  
    setState(prev => ({ ...prev, scriptLoading: true }));
    try {
      const response = await axios.post(
        "/generate-scripts/",
        { transcript_id: transcriptId },
        { responseType: "blob" }
      );
  
      const contentType = response.headers["content-type"];
      if (contentType.includes("text/plain")) {
        await response.data.text(); // Read content to completion
        setState(prev => ({
          ...prev,
          scriptBlob: response.data,
          responseMessage: "Scripts generated successfully.",
          scriptLoading: false
        }));
  
        // Start video generation after scripts are generated
        handleGenerateVideos();
      }
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        responseMessage: error.response?.data?.detail || "Error generating scripts.",
        processingComplete: true,
        scriptLoading: false
      }));
    }
  };
  
  const downloadScripts = () => {
    if (state.scriptBlob) {
      const url = window.URL.createObjectURL(state.scriptBlob);
      const element = document.createElement("a");
      element.href = url;
      element.download = "scripts.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      window.URL.revokeObjectURL(url);
    }
  };
  
  const handleGenerateVideos = async () => {
    setState(prev => ({ 
      ...prev, 
      videoGenerationLoading: true,
      pollingStarted: true,
      responseMessage: "Starting video generation..."
    }));
  
    try {
      // 1) Kick off the generation process
      const response = await axios.post<GeneratedVideosResponse>("/generate-videos/", {
        transcript_id: "combined",
      });
      
      setState(prev => ({
        ...prev,
        responseMessage: response.data.message || "Video generation started. Check status endpoint for updates."
      }));
      
      // Start polling for video generation status
      startPollingForVideoStatus();
      
    } catch (err) {
      console.error(err);
      setState(prev => ({
        ...prev,
        responseMessage: "Error starting video generation.",
        videoGenerationLoading: false,
        pollingStarted: false,
        processingComplete: true
      }));
    }
  };

  const startPollingForVideoStatus = () => {
    // Clear any existing interval
    if (pollingIntervalId) {
      clearInterval(pollingIntervalId);
    }
    
    // Set up a new polling interval
    const interval = setInterval(async () => {
      try {
        console.log("Polling for video status...");
        const { data } = await axios.get<GeneratedVideosResponse>(
          "/generate-videos/status/",
          { params: { transcript_id: "combined" } }
        );
  
        // Log the response to debug
        console.log("Video status response:", data);
        
        // Check if any videos are ready
        if (data.status === "completed" && data.video_paths && data.video_paths.length > 0) {
          console.log("Videos are ready!", data.video_paths);
          
          // Initialize downloading states array with false values for each video
          const initialDownloadingStates = Array(data.video_paths.length).fill(false);
          
          setState(prev => ({
            ...prev,
            generatedVideos: data.video_paths,
            downloadingStates: initialDownloadingStates,
            videoGenerationLoading: false,
            pollingStarted: false,
            processingComplete: true,
            responseMessage: "Videos generated successfully!"
          }));
          
          // Clear the interval since we're done polling
          clearInterval(interval);
          setPollingIntervalId(null);
        } else if (data.status === "processing") {
          // Update message to keep user informed
          setState(prev => ({
            ...prev,
            responseMessage: "Still generating videos, please wait..."
          }));
        }
      } catch (err) {
        console.error("Error polling for video status:", err);
        
        // Don't stop polling on error, just log it
        setState(prev => ({
          ...prev,
          responseMessage: "Checking video generation status..."
        }));
      }
    }, 5000);
    
    // Save the interval ID so we can clear it later
    setPollingIntervalId(interval);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-foreground1/10 backdrop-blur-sm rounded-2xl">
      {/* Video Editor Popup */}
      {showEditor && (
        <VideoEditorPopup
          videoUrl={currentEditingVideo}
          onClose={closeVideoEditor}
        />
      )}

      <h1 className="text-2xl font-bold text-center">Welcome to the Dashboard</h1>
      <p className="text-gray-700 mt-4 text-center max-w-md">
        Enter the video link below, and we will take care of the rest!
      </p>
  
      <div className="flex flex-col items-center gap-4 w-full max-w-4xl mt-8 mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row items-center justify-center gap-2 w-full"
        >
          <Input
            required
            type="url"
            placeholder="Enter your YouTube or Google Drive URL"
            value={state.videoURL}
            onChange={(e) => setState(prev => ({ ...prev, videoURL: e.target.value }))}
            className="focus-visible:ring-0 focus-visible:border-primary duration-300 w-full"
            disabled={!state.processingComplete}
          />
          <Button
            type="submit"
            size="sm"
            variant={"default"}
            className="w-full md:w-auto"
            disabled={!state.processingComplete}
          >
            {state.loading ? "Processing..." : "Generate!"}
          </Button>
        </form>
  
        {state.responseMessage && (
          <p
            className={`mt-4 text-center ${
              state.responseMessage.includes("error") || state.responseMessage.includes("Error") 
                ? "text-red-500" 
                : "text-green-500"
            }`}
          >
            {state.responseMessage}
          </p>
        )}
  
        {state.transcriptionLoading && (
          <p className="mt-4 text-blue-500 text-center">Transcribing your video...</p>
        )}
  
        {state.transcription && (
          <div className="mt-4 w-full md:w-4/4 lg:w-3/3 xl:w-2/2 mx-auto">
            <h2 className="text-xl font-bold text-center">Transcription:</h2>
            <div
              className="mt-4 w-full max-w-5xl h-80 overflow-y-auto rounded-2xl bg-gradient-to-b from-transparent to-violet-950 ring-1 ring-border"
            >
              <pre className="p-4 whitespace-pre-wrap text-slate-100 overflow-x-auto">
                {state.transcription}
              </pre>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-center gap-2 mt-2">
              <Button onClick={downloadTranscription}>Download Transcription</Button>
              <Button 
                onClick={handleGenerateScripts} 
                disabled={state.scriptLoading || state.videoGenerationLoading}
              >
                {state.scriptLoading ? "Generating Scripts..." : "Generate Scripts"}
              </Button>
            </div>
          </div>
        )}
  
        {state.scriptBlob && (
          <div className="mt-4 w-full text-center">
            <h2 className="text-xl font-bold">Generated Scripts:</h2>
            <Button onClick={downloadScripts} className="mt-2">
              Download Scripts
            </Button>
          </div>
        )}
  
        {state.videoGenerationLoading && (
          <p className="mt-4 text-blue-500 text-center">
            Generating short videos, please wait...
          </p>
        )}
  
        {state.generatedVideos.length > 0 && (
        <div className="mt-8 w-full">
          <h2 className="text-xl font-bold text-center mb-4">
            Generated Short Videos:
          </h2>

          {/* ── scrollable container ─────────────────────────────────── */}
          <div className="mx-auto w-full max-w-4xl max-h-[34rem] overflow-y-auto rounded-xl bg-gradient-to-b from-transparent to-violet-950 ring-1 ring-border border-slate-800 p-4 shadow-sm">
            <div className="flex flex-col items-center gap-8">
              {state.generatedVideos.map((videoUrl, index) => {
                const fullVideoUrl = new URL(
                  videoUrl,
                  process.env.NEXT_PUBLIC_API_URL,
                ).toString();
                const downloading = state.downloadingStates[index] || false;

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
      )}

      </div>
    </div>
  );  
};

export default DashboardPage;
