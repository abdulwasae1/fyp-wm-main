"use client"; // Ensure this is a client component since it interacts with the backend

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDashboardState } from "./DashboardStateContext";
import VideoEditorPopup from "./VideoEditorPopup";
import { VideoProcessingService } from "./VideoProcessingService";
import GeneratedVideos from "./GeneratedVideos";

// Progress stages and their corresponding percentage values
const PROGRESS_STAGES = {
  IDLE: 0,
  TRANSCRIBING: 15,
  TRANSCRIPTION_COMPLETE: 65,
  VIDEOS_GENERATED: 100,
};

const STAGE_DURATION = 420000;

const ProgressBar = ({
  currentStage,
  progress
}: {
  currentStage: keyof typeof PROGRESS_STAGES;
  progress: number;
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-primary">Processing Progress</span>
        <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {currentStage === "IDLE" && "Ready to process your video"}
        {currentStage === "TRANSCRIBING" && "Transcribing your video..."}
        {currentStage === "TRANSCRIPTION_COMPLETE" && "Generating scripts..."}
        {currentStage === "VIDEOS_GENERATED" && "Processing complete!"}
      </div>
    </div>
  );
};

const DashboardPage: React.FC = () => {
  // Use our custom hook to access dashboard state
  const { state, setState } = useDashboardState();

  // State for video editor popup
  const [showEditor, setShowEditor] = useState(false);
  const [currentEditingVideo, setCurrentEditingVideo] = useState("");
  const [pollingIntervalId, setPollingIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Progress bar state
  const [currentStage, setCurrentStage] = useState<keyof typeof PROGRESS_STAGES>("IDLE");
  const [progress, setProgress] = useState(0);
  const [stageStartTime, setStageStartTime] = useState<number | null>(null);
  const [progressIntervalId, setProgressIntervalId] = useState<NodeJS.Timeout | null>(null);
  
  // Add a flag to track if the stage has been initiated
  const [stageInitiated, setStageInitiated] = useState<Record<keyof typeof PROGRESS_STAGES, boolean>>({
    IDLE: true,
    TRANSCRIBING: false,
    TRANSCRIPTION_COMPLETE: false,
    VIDEOS_GENERATED: false
  });

  // Create an instance of the video processing service
  const videoProcessingService = new VideoProcessingService(state, setState);

  // Handle automatic progress updates with useEffect
  useEffect(() => {
    // Only create a new interval if we're in an active stage
    if (currentStage !== "IDLE" && stageStartTime) {
      // Clear any existing intervals before setting a new one
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
      }

      const id = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - stageStartTime;
        
        // Get the start and end percentages for the current stage
        let startPercentage = 0;
        let endPercentage = 0;
        
        switch (currentStage) {
          case "TRANSCRIBING":
            startPercentage = PROGRESS_STAGES.IDLE;
            endPercentage = PROGRESS_STAGES.TRANSCRIBING;
            break;
          case "TRANSCRIPTION_COMPLETE":
            startPercentage = PROGRESS_STAGES.TRANSCRIBING;
            endPercentage = PROGRESS_STAGES.TRANSCRIPTION_COMPLETE;
            break;
          case "VIDEOS_GENERATED":
            startPercentage = PROGRESS_STAGES.TRANSCRIPTION_COMPLETE;
            endPercentage = PROGRESS_STAGES.VIDEOS_GENERATED;
            break;
        }
        
        // Calculate the progress within the current stage
        const stageProgress = Math.min(elapsedTime / STAGE_DURATION, 1);
        const calculatedProgress = startPercentage + (endPercentage - startPercentage) * stageProgress;
        
        setProgress(calculatedProgress);
        
        // Move to the next stage automatically if the current stage takes too long
        if (elapsedTime >= STAGE_DURATION) {
          switch (currentStage) {
            case "TRANSCRIBING":
              setCurrentStage("TRANSCRIPTION_COMPLETE");
              setStageStartTime(currentTime);
              setStageInitiated(prev => ({ ...prev, TRANSCRIPTION_COMPLETE: true }));
              break;
            case "TRANSCRIPTION_COMPLETE":
              setCurrentStage("VIDEOS_GENERATED");
              setStageStartTime(currentTime);
              setStageInitiated(prev => ({ ...prev, VIDEOS_GENERATED: true }));
              break;
            case "VIDEOS_GENERATED":
              // We've reached the end, clear the interval
              clearInterval(id);
              setProgressIntervalId(null);
              break;
          }
        }
      }, 100); // Update every 100ms
      
      setProgressIntervalId(id);
      
      // Clean up interval on unmount
      return () => clearInterval(id);
    }
  }, [currentStage, stageStartTime]);

  // Monitor state changes to update progress based on actual events
  useEffect(() => {
    // Handle TRANSCRIBING stage
    if (state.transcriptionLoading && !stageInitiated.TRANSCRIBING) {
      setCurrentStage("TRANSCRIBING");
      setStageStartTime(Date.now());
      setStageInitiated(prev => ({ ...prev, TRANSCRIBING: true }));
    } 
    // Handle TRANSCRIPTION_COMPLETE stage
    else if (state.transcription && !state.transcriptionLoading && 
            currentStage === "TRANSCRIBING" && !stageInitiated.TRANSCRIPTION_COMPLETE) {
      setCurrentStage("TRANSCRIPTION_COMPLETE");
      setStageStartTime(Date.now());
      setStageInitiated(prev => ({ ...prev, TRANSCRIPTION_COMPLETE: true }));
    } 
    // Handle VIDEOS_GENERATED stage
    else if (state.generatedVideos.length > 0 && 
            currentStage === "TRANSCRIPTION_COMPLETE" && !stageInitiated.VIDEOS_GENERATED) {
      setCurrentStage("VIDEOS_GENERATED");
      setStageStartTime(Date.now());
      setStageInitiated(prev => ({ ...prev, VIDEOS_GENERATED: true }));
      
      // Calculate final progress
      setProgress(100);
      
      // Clear the interval when we reach the final stage
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        setProgressIntervalId(null);
      }
    }
  }, [state.transcriptionLoading, state.transcription, state.generatedVideos, 
      currentStage, progressIntervalId, stageInitiated]);

  // Reset progress when user submits a new video
  useEffect(() => {
    if (state.loading) {
      setProgress(0);
      setCurrentStage("IDLE");
      setStageInitiated({
        IDLE: true,
        TRANSCRIBING: false,
        TRANSCRIPTION_COMPLETE: false,
        VIDEOS_GENERATED: false
      });

      // Clear any existing intervals
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
        setProgressIntervalId(null);
      }
    }

    // Cleanup function to clear intervals when component unmounts
    return () => {
      if (pollingIntervalId) {
        clearInterval(pollingIntervalId);
      }
      if (progressIntervalId) {
        clearInterval(progressIntervalId);
      }
    };
  }, [pollingIntervalId, progressIntervalId, state.loading]);

  const openVideoEditor = (videoUrl: string) => {
    setCurrentEditingVideo(videoUrl);
    setShowEditor(true);
  };

  const closeVideoEditor = () => {
    setShowEditor(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset progress state
    setProgress(0);
    setCurrentStage("TRANSCRIBING");
    setStageStartTime(Date.now());
    setStageInitiated({
      IDLE: true,
      TRANSCRIBING: true,
      TRANSCRIPTION_COMPLETE: false,
      VIDEOS_GENERATED: false
    });

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

    // Make sure progress is at the right stage
    setCurrentStage("TRANSCRIPTION_COMPLETE");
    setStageStartTime(Date.now());
    setStageInitiated(prev => ({ ...prev, TRANSCRIPTION_COMPLETE: true }));

    await videoProcessingService.generateScripts();
    // Start video generation after scripts are generated
    videoProcessingService.generateVideos(setPollingIntervalId);
  };

  const downloadScripts = () => {
    videoProcessingService.downloadScripts();
  };

  // Show progress bar only when we're in an active state or loading
  const showProgressBar = currentStage !== "IDLE" || state.loading || state.transcriptionLoading;

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
        {/* Progress Bar - positioned above the input field */}
        {showProgressBar && (
          <ProgressBar currentStage={currentStage} progress={progress} />
        )}
        
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