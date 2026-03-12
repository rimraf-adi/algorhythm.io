'use client';

import { AlgorithmVisualization } from '@/lib/types';
import { VisualizationArea } from './visualization-area';
import { InfoPanel } from './info-panel';

interface AlgorithmViewProps {
  algorithm: AlgorithmVisualization;
}

export function AlgorithmView({ algorithm }: AlgorithmViewProps) {
  return (
    <VisualizationArea
      algorithm={algorithm}
      rightPanel={(currentStep) => (
        <InfoPanel
          algorithm={algorithm}
          currentStep={algorithm.steps[currentStep]}
        />
      )}
    />
  );
}
