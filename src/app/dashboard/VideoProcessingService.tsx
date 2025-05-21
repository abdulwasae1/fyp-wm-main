"use client";

import axios from "@/lib/axios";

interface DashboardState {
  videoURL: string;
  responseMessage: string;
  loading: boolean;
  transcriptionLoading: boolean;
  transcription: string;
  transcriptionBlob: Blob | null;
  scriptLoading: boolean;
  scriptBlob: Blob | null;
  videoGenerationLoading: boolean;
  generatedVideos: string[];
  downloadingStates: boolean[];
  processingComplete: boolean;
  pollingStarted: boolean;
}

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

export class VideoProcessingService {
  private ws: WebSocket | null = null;
  private state: DashboardState;
  private setState: React.Dispatch<React.SetStateAction<DashboardState>>;

  constructor(
    state: DashboardState,
    setState: React.Dispatch<React.SetStateAction<DashboardState>>
  ) {
    this.state = state;
    this.setState = setState;
  }

  async processVideo() {
    // Set processingComplete to false when starting the process
    this.setState(prev => ({ ...prev, processingComplete: false, loading: true }));
    try {
      const response = await axios.post("/videos/", {
        source_url: this.state.videoURL,
        title: "Video Title",
      });
      this.setState(prev => ({ 
        ...prev, 
        responseMessage: response.data.message,
        transcriptionLoading: true,
        loading: false
      }));
      this.pollForTranscription();
    } catch (error: any) {
      this.setState(prev => ({ 
        ...prev, 
        responseMessage: error.response?.data?.detail || "An error occurred.",
        processingComplete: true,
        loading: false
      }));
    }
  }

  pollForTranscription() {
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
          this.setState(prev => ({
            ...prev,
            transcription: fileText,
            transcriptionBlob: response.data,
            transcriptionLoading: false
          }));
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
        this.setState(prev => ({ ...prev, processingComplete: true }));
        clearInterval(interval);
      }
    }, 5000);
  }

  downloadTranscription() {
    if (this.state.transcriptionBlob) {
      const url = window.URL.createObjectURL(this.state.transcriptionBlob);
      const element = document.createElement("a");
      element.href = url;
      element.download = "transcription.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      window.URL.revokeObjectURL(url);
    }
  }

  async generateScripts() {
    const transcriptId = "combined";
    
    this.setState(prev => ({ ...prev, scriptLoading: true }));
    try {
      const response = await axios.post(
        "/generate-scripts/",
        { transcript_id: transcriptId },
        { responseType: "blob" }
      );
  
      const contentType = response.headers["content-type"];
      if (contentType.includes("text/plain")) {
        await response.data.text(); // Read content to completion
        this.setState(prev => ({
          ...prev,
          scriptBlob: response.data,
          responseMessage: "Scripts generated successfully.",
          scriptLoading: false
        }));
      }
    } catch (error: any) {
      this.setState(prev => ({
        ...prev,
        responseMessage: error.response?.data?.detail || "Error generating scripts.",
        processingComplete: true,
        scriptLoading: false
      }));
    }
  }
  
  downloadScripts() {
    if (this.state.scriptBlob) {
      const url = window.URL.createObjectURL(this.state.scriptBlob);
      const element = document.createElement("a");
      element.href = url;
      element.download = "scripts.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      window.URL.revokeObjectURL(url);
    }
  }
  
  async generateVideos(setPollingIntervalId: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>) {
    this.setState(prev => ({ 
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
      
      this.setState(prev => ({
        ...prev,
        responseMessage: response.data.message || "Video generation started. Check status endpoint for updates."
      }));
      
      // Start polling for video generation status
      this.startPollingForVideoStatus(setPollingIntervalId);
      
    } catch (err) {
      console.error(err);
      this.setState(prev => ({
        ...prev,
        responseMessage: "Error starting video generation.",
        videoGenerationLoading: false,
        pollingStarted: false,
        processingComplete: true
      }));
    }
  }

  startPollingForVideoStatus(setPollingIntervalId: React.Dispatch<React.SetStateAction<NodeJS.Timeout | null>>) {
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
        
        // Check if any videos are available and update the videos list if we have new ones
        if (data.video_paths && data.video_paths.length > 0) {
          console.log("Received videos:", data.video_paths);
          
          // Update only if we have new videos
          if (data.video_paths.length > this.state.generatedVideos.length) {
            // Initialize downloading states array with false values for each video
            const initialDownloadingStates = Array(data.video_paths.length).fill(false);
            
            this.setState(prev => ({
              ...prev,
              generatedVideos: data.video_paths,
              downloadingStates: initialDownloadingStates,
            }));
          }
        }
        
        // Always update status information regardless of new videos
        this.setState(prev => ({
          ...prev,
          videoGenerationLoading: data.status !== "completed",
          responseMessage: data.status === "completed" 
            ? "All videos generated successfully!" 
            : (data.video_paths && data.video_paths.length > 0)
              ? `Received ${data.video_paths.length} videos so far. Still checking for more...`
              : "Generating videos, please wait..."
        }));
        
        // Only mark complete and stop polling if status is explicitly "completed"
        if (data.status === "completed") {
          this.setState(prev => ({
            ...prev,
            pollingStarted: false,
            processingComplete: true,
            videoGenerationLoading: false,
            responseMessage: "All videos generated successfully!"
          }));
          
          // Clear the interval only when the backend says we're done
          clearInterval(interval);
          setPollingIntervalId(null);
        }
      } catch (err) {
        console.error("Error polling for video status:", err);
        
        // Don't stop polling on error, just log it
        this.setState(prev => ({
          ...prev,
          responseMessage: "Checking video generation status..."
        }));
      }
    }, 5000);
    
    // Save the interval ID so we can clear it later
    setPollingIntervalId(interval);
  }

  // Methods for handling social media sharing
  async downloadAndShareVideo(fullVideoUrl: string, index: number, platform: 'instagram' | 'facebook' | 'youtube') {
    const updatedStates = [...this.state.downloadingStates];
    updatedStates[index] = true;
    this.setState(prev => ({ ...prev, downloadingStates: updatedStates }));

    try {
      // First, fetch the video to ensure it's downloaded completely
      const response = await fetch(fullVideoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create and trigger download link
      const link = document.createElement("a");
      link.href = url;
      link.download = `${platform}-video-${index + 1}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // After download started, open appropriate platform
      setTimeout(() => {
        let platformUrl: string;
        switch (platform) {
          case 'instagram':
            platformUrl = "https://www.instagram.com/";
            break;
          case 'facebook':
            platformUrl = "https://www.facebook.com/";
            break;
          case 'youtube':
            platformUrl = "https://studio.youtube.com/channel/UC/videos/upload";
            break;
        }
        
        const platformWindow = window.open(platformUrl, "_blank", "noopener,noreferrer");
        
        // Handle case where popup might be blocked
        if (platform === 'youtube' && (!platformWindow || platformWindow.closed || typeof platformWindow.closed === 'undefined')) {
          console.warn("YouTube window was blocked by the browser. Please check your popup blocker settings.");
          alert("YouTube window was blocked. Please check your popup blocker settings and try again.");
          this.setState(prev => ({
            ...prev,
            responseMessage: "Couldn't open YouTube automatically. Downloaded video successfully. Please manually upload to YouTube."
          }));
        }
      }, 1500);
      
    } catch (error) {
      console.error(`Error downloading video for ${platform}:`, error);
      alert("Error downloading the video. Please try again.");
    } finally {
      // Reset downloading state
      setTimeout(() => {
        const updatedStatesAfter = [...this.state.downloadingStates];
        updatedStatesAfter[index] = false;
        this.setState(prev => ({ ...prev, downloadingStates: updatedStatesAfter }));
      }, 3000);
    }
  }
}