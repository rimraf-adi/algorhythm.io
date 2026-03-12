'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GraphNode, GraphEdge, GraphStep, AlgorithmVisualization } from '@/lib/types';

interface GraphCanvasProps {
  algorithm: AlgorithmVisualization;
  currentStep: GraphStep;
}

export function GraphCanvas({ algorithm, currentStep }: GraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Fill background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid for reference (light) — drawn first so nodes/edges render on top
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Create a map of node states for quick lookup
    const nodeStateMap = new Map(
      currentStep.nodes.map(n => [n.id, n])
    );
    const edgeStateMap = new Map(
      currentStep.edges.map(e => [e.id, e])
    );

    // Draw edges
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    algorithm.initialEdges.forEach((edge) => {
      const edgeState = edgeStateMap.get(edge.id);
      const sourceNode = algorithm.initialNodes.find(n => n.id === edge.source);
      const targetNode = algorithm.initialNodes.find(n => n.id === edge.target);

      if (!sourceNode || !targetNode) return;

      // Color based on state
      if (edgeState?.state === 'visited') {
        ctx.strokeStyle = '#999999';
      } else if (edgeState?.state === 'visiting') {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
      } else {
        ctx.strokeStyle = '#cccccc';
        ctx.lineWidth = 2;
      }

      // Draw edge
      ctx.beginPath();
      ctx.moveTo(sourceNode.x, sourceNode.y);
      ctx.lineTo(targetNode.x, targetNode.y);
      ctx.stroke();

      // Reset line width
      ctx.lineWidth = 2;

      // Draw weight if exists
      if (edge.weight) {
        const midX = (sourceNode.x + targetNode.x) / 2;
        const midY = (sourceNode.y + targetNode.y) / 2;
        ctx.fillStyle = '#000000';
        ctx.font = '11px "JetBrains Mono"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(edge.weight.toString(), midX, midY - 8);
      }
    });

    // Draw nodes
    algorithm.initialNodes.forEach((node) => {
      const nodeState = nodeStateMap.get(node.id);

      // Determine colors based on state
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

      // Draw node circle
      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw node label
      ctx.fillStyle = nodeState?.state === 'visiting' ? '#ffffff' : '#000000';
      ctx.font = 'bold 12px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label = nodeState?.label || node.label;
      ctx.fillText(label, node.x, node.y);
    });
  }, [currentStep, algorithm]);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full bg-white border-b border-black border-opacity-20"
    />
  );
}
