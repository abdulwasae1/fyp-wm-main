"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define types for our context
interface TranscriptionState {
  videoURL: string;
  loading: boolean;
  transcriptionLoading: boolean;
  scriptLoading: boolean;
  videoGenerationLoading: boolean;
  responseMessage: string;
  transcription: string;
  transcriptionBlob: Blob | null;
  scriptBlob: Blob | null;
  generatedVideos: string[];
  pollingStarted: boolean;
  downloadingStates: boolean[];
  processingComplete: boolean;
}

interface DashboardContextType {
  state: TranscriptionState;
  setState: React.Dispatch<React.SetStateAction<TranscriptionState>>;
  resetState: () => void;
}

// Default state values
const defaultState: TranscriptionState = {
  videoURL: "",
  loading: false,
  transcriptionLoading: false,
  scriptLoading: false,
  videoGenerationLoading: false,
  responseMessage: "",
  transcription: "",
  transcriptionBlob: null,
  scriptBlob: null,
  generatedVideos: [],
  pollingStarted: false,
  downloadingStates: [],
  processingComplete: true
};

// Create context
const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Provider component
export const DashboardStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TranscriptionState>(defaultState);
  
  // Optional: Load state from localStorage when the provider mounts
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('dashboardState');
      if (savedState) {
        const parsedState = JSON.parse(savedState);
        // We need to handle Blob objects specially since they can't be serialized to JSON
        setState({
          ...parsedState,
          transcriptionBlob: null, // Reset blobs as they can't be stored in localStorage
          scriptBlob: null
        });
      }
    } catch (error) {
      console.error('Failed to load state from localStorage:', error);
    }
  }, []);

  // Optional: Save state to localStorage when it changes
  useEffect(() => {
    try {
      // Create a copy without the Blob objects
      const stateToPersist = {
        ...state,
        transcriptionBlob: null,
        scriptBlob: null
      };
      localStorage.setItem('dashboardState', JSON.stringify(stateToPersist));
    } catch (error) {
      console.error('Failed to save state to localStorage:', error);
    }
  }, [state]);

  // Reset function to clear state
  const resetState = () => {
    setState(defaultState);
    localStorage.removeItem('dashboardState');
  };

  return (
    <DashboardContext.Provider value={{ state, setState, resetState }}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use the context
export const useDashboardState = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardState must be used within a DashboardStateProvider');
  }
  return context;
};