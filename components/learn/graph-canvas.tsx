'use client';

import { GraphEdge, GraphNode, GraphStep, AlgorithmVisualization } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

interface GraphCanvasProps {
  algorithm: AlgorithmVisualization;
  currentStep: GraphStep;
}

export function GraphCanvas({ algorithm, currentStep }: GraphCanvasProps) {
  // Create state maps for quick lookup of current animation frame
  const nodeStateMap = new Map(currentStep.nodes.map(n => [n.id, n]));
  const edgeStateMap = new Map(currentStep.edges.map(e => [e.id, e]));

  // Base canvas dimensions relative to internal SVG viewBox
  const viewBoxWidth = 800;
  const viewBoxHeight = 600;

  return (
    <div className="w-full h-full bg-white border-b border-black border-opacity-20 overflow-hidden relative">
      {/* Background Grid - CSS Pattern for continuous crispness */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      <svg
        className="w-full h-full relative z-10"
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <AnimatePresence>
          {/* Edges Layer */}
          <g>
            {algorithm.initialEdges.map((edge) => {
              const edgeState = edgeStateMap.get(edge.id);
              const sourceNode = algorithm.initialNodes.find(n => n.id === edge.source);
              const targetNode = algorithm.initialNodes.find(n => n.id === edge.target);

              if (!sourceNode || !targetNode) return null;

              // Color mapping
              let strokeColor = '#cccccc';
              let strokeWidth = 2;

              if (edgeState?.state === 'visited') {
                strokeColor = '#999999';
              } else if (edgeState?.state === 'visiting') {
                strokeColor = '#000000';
                strokeWidth = 3;
              }

              const midX = (sourceNode.x + targetNode.x) / 2;
              const midY = (sourceNode.y + targetNode.y) / 2;

              return (
                <g key={edge.id}>
                  <motion.line
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    animate={{
                      stroke: strokeColor,
                      strokeWidth: strokeWidth,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    strokeLinecap="round"
                  />
                  {edge.weight !== undefined && (
                    <text
                      x={midX}
                      y={midY - 8}
                      fill="#000000"
                      fontSize="11px"
                      fontFamily="JetBrains Mono"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {edge.weight}
                    </text>
                  )}
                </g>
              );
            })}
          </g>

          {/* Nodes Layer */}
          <g>
            {algorithm.initialNodes.map((node) => {
              const nodeState = nodeStateMap.get(node.id);

              let fillColor = '#ffffff';
              let strokeColor = '#000000';
              let strokeWidth = 2;

              if (nodeState?.state === 'visited') {
                fillColor = '#cccccc';
                strokeColor = '#666666';
              } else if (nodeState?.state === 'visiting') {
                fillColor = '#000000';
                strokeColor = '#000000';
                strokeWidth = 3;
              } else if (nodeState?.state === 'highlighted') {
                fillColor = '#f0f0f0';
                strokeColor = '#000000';
                strokeWidth = 3;
              }

              const labelColor = nodeState?.state === 'visiting' ? '#ffffff' : '#000000';
              const label = nodeState?.label || node.label;

              return (
                <g key={node.id}>
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={12}
                    animate={{
                      fill: fillColor,
                      stroke: strokeColor,
                      strokeWidth: strokeWidth,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                  <motion.text
                    x={node.x}
                    y={node.y}
                    animate={{ fill: labelColor }}
                    transition={{ duration: 0.3 }}
                    fontSize="12px"
                    fontWeight="bold"
                    fontFamily="JetBrains Mono"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {label}
                  </motion.text>
                </g>
              );
            })}
          </g>
        </AnimatePresence>
      </svg>
    </div>
  );
}
