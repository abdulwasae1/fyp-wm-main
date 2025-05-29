"use client"; // Ensure this is a client component since it interacts with the backend

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboardState } from "./DashboardStateContext";
import VideoEditorPopup from "./VideoEditorPopup";
import { VideoProcessingService } from "./VideoProcessingService";
import GeneratedVideos from "./GeneratedVideos";

const DashboardPage: React.FC = () => {
  // Use our custom hook to access dashboard state
  const { state, setState } = useDashboardState();

  // State for video editor popup
  const [showEditor, setShowEditor] = useState(false);
  const [currentEditingVideo, setCurrentEditingVideo] = useState("");
  const [pollingIntervalId, setPollingIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Create an instance of the video processing service
  const videoProcessingService = new VideoProcessingService(state, setState);

  // Cleanup function to clear intervals when component unmounts
  useEffect(() => {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await videoProcessingService.processVideo();
  };

  const downloadTranscription = () => {
    videoProcessingService.downloadTranscription();
  };

  const handleGenerateScripts = async () => {
    if (state.pollingStarted) {
      console.log("Polling already started. Skipping new request.");
      return;
    }

    await videoProcessingService.generateScripts();
    // Start video generation after scripts are generated
    videoProcessingService.generateVideos(setPollingIntervalId);
  };

  const downloadScripts = () => {
    videoProcessingService.downloadScripts();
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
            disabled={state.loading || state.transcriptionLoading}
          />
          <Button
            type="submit"
            size="sm"
            variant={"default"}
            className="w-full md:w-auto"
            disabled={state.loading || state.transcriptionLoading}
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
          <GeneratedVideos 
            videos={state.generatedVideos} 
            downloadingStates={state.downloadingStates} 
            setState={setState}
            openVideoEditor={openVideoEditor}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
