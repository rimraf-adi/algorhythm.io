'use client';

import { SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface StepControlsProps {
  currentStep: number;
  totalSteps: number;
  speed: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export function StepControls({
  currentStep,
  totalSteps,
  speed,
  onPrevStep,
  onNextStep,
  onReset,
  onSpeedChange,
}: StepControlsProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-black border-opacity-20 bg-gray-50">
      <div className="text-xs text-gray-600">
        step {currentStep} of {totalSteps}
      </div>

      <div className="flex-1 h-1 bg-gray-200 relative cursor-pointer">
        <div
          className="h-full bg-black transition-all"
          style={{ width: `${((currentStep + 1) / (totalSteps + 1)) * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          className="p-2 hover:bg-white transition rounded"
          title="reset"
        >
          <RotateCcw size={16} />
        </button>

        <button
          onClick={onPrevStep}
          className="p-2 hover:bg-white transition disabled:opacity-30"
          title="previous step"
        >
          <SkipBack size={16} />
        </button>

        <button
          onClick={onNextStep}
          className="p-2 hover:bg-white transition disabled:opacity-30"
          title="next step"
        >
          <SkipForward size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span>speed:</span>
        <select
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="px-2 py-1 border border-black text-xs"
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1x</option>
          <option value={1.5}>1.5x</option>
          <option value={2}>2x</option>
          <option value={3}>3x</option>
        </select>
      </div>
    </div>
  );
}
