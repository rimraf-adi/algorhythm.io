'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import Link from 'next/link';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const nodes = [
      { x: 100, y: 100, label: 'A' },
      { x: 200, y: 50, label: 'B' },
      { x: 200, y: 150, label: 'C' },
      { x: 300, y: 100, label: 'D' },
    ];

    const edges = [
      { from: 0, to: 1 },
      { from: 0, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 3 },
    ];

    const animate = () => {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      edges.forEach(edge => {
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
      });

      ctx.fillStyle = '#000000';
      ctx.font = '12px "JetBrains Mono"';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.fillText(node.label, node.x, node.y);
        ctx.fillStyle = '#000000';
      });
    };

    animate();
  }, []);

  return (
    <section className="pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
              learn data structures the visual way
            </h1>
            <p className="text-lg text-gray-600">
              interactive animations for graphs, trees, sorting & beyond. understand dsa deeply with step-by-step walkthroughs.
            </p>
          </div>
          <div className="flex gap-4 pt-4">
            <Link href="/learn">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-black text-white text-sm font-medium hover:opacity-80 transition"
              >
                start free
              </motion.button>
            </Link>
            <Link href="#curriculum">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-black text-black text-sm font-medium hover:bg-black hover:text-white transition"
              >
                see demo
              </motion.button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border border-black p-6 bg-gray-50"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-64 bg-white"
          />
          <div className="mt-4 text-center text-sm text-gray-600">
            {'> bfs traversal animation'}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
