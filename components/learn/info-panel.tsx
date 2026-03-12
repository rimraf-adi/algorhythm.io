'use client';

import { useState } from 'react';
import { AlgorithmVisualization, GraphStep } from '@/lib/types';

interface InfoPanelProps {
  algorithm: AlgorithmVisualization;
  currentStep: GraphStep;
}

export function InfoPanel({ algorithm, currentStep }: InfoPanelProps) {
  const [activeTab, setActiveTab] = useState<'pseudocode' | 'complexity' | 'notes'>('pseudocode');

  return (
    <div className="w-80 border-l border-black border-opacity-20 overflow-y-auto h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-black border-opacity-20 sticky top-0 bg-white">
        <h2 className="text-sm font-bold mb-2 tracking-tighter">{algorithm.name}</h2>
        <p className="text-xs text-gray-600 line-clamp-2">{algorithm.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-black border-opacity-20 sticky top-16 bg-gray-50 z-10">
        {(['pseudocode', 'complexity', 'notes'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-2 text-xs font-medium border-b-2 transition ${
              activeTab === tab
                ? 'border-b-black'
                : 'border-b-transparent hover:opacity-60'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'pseudocode' && (
          <div className="font-mono text-xs space-y-1">
            {algorithm.pseudocode.map((line, idx) => {
              const isCurrentLine = currentStep.pseudocode.some(pc => pc.line === idx);
              return (
                <div
                  key={idx}
                  className={`transition ${
                    isCurrentLine
                      ? 'bg-black text-white px-2 py-1'
                      : 'text-gray-700 hover:bg-gray-100 px-2 py-1'
                  }`}
                >
                  <span className="text-gray-400 mr-3">{String(idx + 1).padStart(2, '0')}</span>
                  {line}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'complexity' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold mb-2">time complexity</h3>
              <div className="font-mono text-sm bg-gray-50 p-3 border border-black border-opacity-20">
                {algorithm.complexity.time}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold mb-2">space complexity</h3>
              <div className="font-mono text-sm bg-gray-50 p-3 border border-black border-opacity-20">
                {algorithm.complexity.space}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="text-xs text-gray-600 space-y-3">
            <div>
              <h3 className="font-bold mb-1">step {currentStep.stepNumber}</h3>
              <p>{currentStep.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
