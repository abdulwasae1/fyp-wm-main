"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Crop, Scissors, Save, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface VideoEditorPopupProps {
  videoUrl: string;
  onClose: () => void;
}

const VideoEditorPopup: React.FC<VideoEditorPopupProps> = ({ videoUrl, onClose }) => {
  // References
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  // Video state
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Editor state
  const [editorMode, setEditorMode] = useState<'trim' | 'crop'>('trim');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [cropDimensions, setCropDimensions] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    aspectRatio: 9/16 // Default vertical video (e.g., for Instagram/TikTok)
  });
  
  // Processing state
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Initialize video when loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      setEndTime(video.duration);
      setVideoLoaded(true);
      
      // Set default crop to full video dimensions while maintaining aspect ratio
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const aspectRatio = 9/16; // Default for mobile-friendly
      
      let cropWidth, cropHeight;
      
      if (videoWidth / videoHeight > aspectRatio) {
        // Video is wider than target ratio
        cropHeight = videoHeight;
        cropWidth = videoHeight * aspectRatio;
      } else {
        // Video is taller than target ratio
        cropWidth = videoWidth;
        cropHeight = videoWidth / aspectRatio;
      }
      
      setCropDimensions({
        x: (videoWidth - cropWidth) / 2,
        y: (videoHeight - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight,
        aspectRatio
      });
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, [videoUrl]);

  // Update canvas with current frame and crop overlay when time changes
  useEffect(() => {
    if (!videoLoaded || !canvasRef.current || !videoRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Draw crop overlay if in crop mode
    if (editorMode === 'crop') {
      // Draw semi-transparent overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Clear crop area
      ctx.clearRect(
        cropDimensions.x,
        cropDimensions.y,
        cropDimensions.width,
        cropDimensions.height
      );
      
      // Draw crop box border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(
        cropDimensions.x,
        cropDimensions.y,
        cropDimensions.width,
        cropDimensions.height
      );
      
      // Draw handles at corners for resizing
      const handleSize = 10;
      ctx.fillStyle = '#ffffff';
      
      // Draw corner handles
      [
        [cropDimensions.x, cropDimensions.y], // Top left
        [cropDimensions.x + cropDimensions.width, cropDimensions.y], // Top right
        [cropDimensions.x, cropDimensions.y + cropDimensions.height], // Bottom left
        [cropDimensions.x + cropDimensions.width, cropDimensions.y + cropDimensions.height] // Bottom right
      ].forEach(([x, y]) => {
        ctx.fillRect(x - handleSize/2, y - handleSize/2, handleSize, handleSize);
      });
    }
  }, [currentTime, videoLoaded, editorMode, cropDimensions]);

  // Play/pause control
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
    
    // Update current time display during playback
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      
      // Pause when reaching end time during playback
      if (video.currentTime >= endTime) {
        video.currentTime = endTime;
        setCurrentTime(endTime);
        setIsPlaying(false);
      }
    };
    
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, [isPlaying, endTime]);

  // Handle seeking through video
  const handleSeek = (newTime: number) => {
    if (!videoRef.current) return;
    
    // Keep within trim bounds
    newTime = Math.max(startTime, Math.min(newTime, endTime));
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Trim controls
  const handleStartTimeChange = (newStartTime: number[]) => {
    const time = newStartTime[0];
    setStartTime(time);
    
    // Ensure current time is not before start time
    if (currentTime < time) {
      handleSeek(time);
    }
  };

  const handleEndTimeChange = (newEndTime: number[]) => {
    const time = newEndTime[0];
    setEndTime(time);
    
    // Ensure current time is not after end time
    if (currentTime > time) {
      handleSeek(time);
    }
  };

  // Format time as MM:SS.ms
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const milliseconds = Math.floor((timeInSeconds % 1) * 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  // Generate trimmed video using MediaRecorder
  const handleSaveVideo = async () => {
    if (!videoRef.current) return;
    
    setProcessing(true);
    setProgress(0);
    
    try {
      const video = videoRef.current;
      
      // Create a canvas element for video processing
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not get canvas context");
      
      // Set up MediaRecorder for capturing canvas
      const stream = canvas.captureStream();
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9',
        videoBitsPerSecond: 5000000 // 5 Mbps
      });
      
      // Chunks to store recorded data
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };
      
      // When recording stops, create video and download
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.href = url;
        link.download = `trimmed-video-${Date.now()}.webm`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up
        URL.revokeObjectURL(url);
        setProgress(100);
        setTimeout(() => {
          setProcessing(false);
          onClose();
        }, 1000);
      };
      
      // Calculate frames to record based on trim settings
      const trimDuration = endTime - startTime;
      const frameRate = 30; // Target frame rate
      const totalFrames = Math.ceil(trimDuration * frameRate);
      
      // Start recording
      mediaRecorder.start();
      
      // Set video to start time
      video.currentTime = startTime;
      
      // Wait for video to seek to start point
      await new Promise<void>((resolve) => {
        const seeked = () => {
          video.removeEventListener('seeked', seeked);
          resolve();
        };
        video.addEventListener('seeked', seeked);
      });
      
      // Process frame by frame
      let frameCount = 0;
      
      const processNextFrame = async () => {
        if (frameCount >= totalFrames) {
          // Done processing frames
          mediaRecorder.stop();
          return;
        }
        
        // Calculate current video position
        const currentPosition = startTime + (frameCount / frameRate);
        
        // Update progress indicator
        const progressPercent = Math.min(95, (frameCount / totalFrames) * 100);
        setProgress(progressPercent);
        
        // Draw current frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        frameCount++;
        
        // Apply crop if in crop mode
        if (editorMode === 'crop') {
          // TODO: Handle cropping in a future version
          // Current implementation will only trim the video
        }
        
        // Move to next frame
        video.currentTime = currentPosition + (1 / frameRate);
        
        // Wait for video to seek to next position
        await new Promise<void>((resolve) => {
          const seeked = () => {
            video.removeEventListener('seeked', seeked);
            resolve();
          };
          video.addEventListener('seeked', seeked);
        });
        
        // Process next frame (using setTimeout to avoid UI blocking)
        setTimeout(processNextFrame, 0);
      };
      
      // Start processing frames
      processNextFrame();
      
    } catch (error) {
      console.error("Error processing video:", error);
      setProcessing(false);
      alert("There was an error processing the video. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-indigo-950/90 border border-indigo-900 rounded-2xl p-6 shadow-xl overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Video Editor</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-indigo-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Main editor display */}
        <div className="relative mb-6 bg-black rounded-xl overflow-hidden">
          {/* Video element (hidden during crop mode) */}
          <video
            ref={videoRef}
            src={videoUrl}
            className={`w-full ${editorMode === 'crop' ? 'hidden' : 'block'}`}
            onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
          />
          
          {/* Canvas overlay for crop mode and effects */}
          <canvas 
            ref={canvasRef}
            className={`w-full ${editorMode === 'crop' ? 'block' : 'hidden'}`}
          />
          
          {/* Processing overlay */}
          {processing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
              <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-violet-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-white mt-2">Processing video... {progress}%</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Mode selector */}
          <div className="flex justify-center gap-2">
            <Button
              variant={editorMode === 'trim' ? 'default' : 'outline'}
              onClick={() => setEditorMode('trim')}
              className="flex items-center gap-2"
            >
              <Scissors className="h-4 w-4" />
              Trim
            </Button>
            <Button
              variant={editorMode === 'crop' ? 'default' : 'outline'}
              onClick={() => setEditorMode('crop')}
              className="flex items-center gap-2"
            >
              <Crop className="h-4 w-4" />
              Crop
            </Button>
          </div>

          {/* Mode-specific controls */}
          {editorMode === 'trim' && (
            <div className="space-y-4">
              {/* Current time display */}
              <div className="flex justify-between text-sm text-white">
                <span>{formatTime(startTime)}</span>
                <span className="font-bold">{formatTime(currentTime)}</span>
                <span>{formatTime(endTime)}</span>
              </div>
              
              {/* Playback scrubber */}
              <Slider
                value={[currentTime]}
                min={startTime}
                max={endTime}
                step={0.01}
                onValueChange={(value) => handleSeek(value[0])}
                className="w-full"
              />
              
              {/* Trim range selector */}
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Start Point</span>
                  <span>End Point</span>
                </div>
                <div className="flex gap-4">
                  <Slider
                    value={[startTime]}
                    min={0}
                    max={Math.min(endTime - 0.5, videoDuration)}
                    step={0.01}
                    onValueChange={handleStartTimeChange}
                    className="w-full"
                  />
                  <Slider
                    value={[endTime]}
                    min={Math.max(startTime + 0.5, 0)}
                    max={videoDuration}
                    step={0.01}
                    onValueChange={handleEndTimeChange}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Playback controls */}
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline" 
                  size="icon"
                  onClick={() => handleSeek(Math.max(currentTime - 1, startTime))}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline" 
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </Button>
                <Button
                  variant="outline" 
                  size="icon"
                  onClick={() => handleSeek(Math.min(currentTime + 1, endTime))}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}
          
          {editorMode === 'crop' && (
            <div className="space-y-4 text-center">
              <p className="text-sm text-gray-300">
                Adjust the crop frame by dragging the corners.
                <br />
                This view shows how your video will be cropped.
              </p>
              
              <div className="flex justify-center gap-4">
                <div>
                  <label className="text-xs text-gray-400 block mb-1">Aspect Ratio</label>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={cropDimensions.aspectRatio === 16/9 ? 'default' : 'outline'}
                      onClick={() => setCropDimensions({...cropDimensions, aspectRatio: 16/9})}
                      className="text-xs"
                    >
                      16:9
                    </Button>
                    <Button
                      size="sm"
                      variant={cropDimensions.aspectRatio === 9/16 ? 'default' : 'outline'}
                      onClick={() => setCropDimensions({...cropDimensions, aspectRatio: 9/16})}
                      className="text-xs"
                    >
                      9:16
                    </Button>
                    <Button
                      size="sm"
                      variant={cropDimensions.aspectRatio === 1 ? 'default' : 'outline'}
                      onClick={() => setCropDimensions({...cropDimensions, aspectRatio: 1})}
                      className="text-xs"
                    >
                      1:1
                    </Button>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-400">
                Note: Current implementation focuses on trimming. Cropping will be fully implemented in a future version.
              </p>
            </div>
          )}

          {/* Save button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSaveVideo}
              disabled={processing}
              className="w-full sm:w-auto"
            >
              <Save className="h-4 w-4 mr-2" />
              Save and Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEditorPopup;