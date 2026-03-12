'use client';

import { useEffect, useState, useCallback, ReactNode } from 'react';
import { AlgorithmVisualization } from '@/lib/types';
import { GraphCanvas } from './graph-canvas';
import { StepControls } from './step-controls';

interface VisualizationAreaProps {
  algorithm: AlgorithmVisualization;
  rightPanel?: (currentStep: number) => ReactNode;
}

export function VisualizationArea({ algorithm, rightPanel }: VisualizationAreaProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);

  const totalSteps = algorithm.steps.length - 1;

  const handlePrevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  }, [totalSteps]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  // Endless Auto-loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= totalSteps) {
          // Loop back to 0 seamlessly
          return 0;
        }
        return prev + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [speed, totalSteps]);

  // Reset to step 0 when the algorithm changes
  useEffect(() => {
    setCurrentStep(0);
  }, [algorithm.id]);

  const step = algorithm.steps[currentStep];

  return (
    <>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto">
          <GraphCanvas algorithm={algorithm} currentStep={step} />
        </div>
        <StepControls
          currentStep={currentStep}
          totalSteps={totalSteps}
          speed={speed}
          onPrevStep={handlePrevStep}
          onNextStep={handleNextStep}
          onReset={handleReset}
          onSpeedChange={setSpeed}
        />
      </div>
      {rightPanel && rightPanel(currentStep)}
    </>
  );
}
