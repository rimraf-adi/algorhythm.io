'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'choose an algorithm',
    description: 'browse our comprehensive library of graph algorithms, from bfs to dijkstra.',
  },
  {
    number: '02',
    title: 'watch it unfold',
    description: 'observe each step of execution with animated node and edge transitions.',
  },
  {
    number: '03',
    title: 'understand the code',
    description: 'read pseudocode synchronized with the animation for deep understanding.',
  },
  {
    number: '04',
    title: 'master the concept',
    description: 'revisit complex algorithms until the patterns become second nature.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-gray-50 border-t border-black border-opacity-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tighter mb-3">
            how it works
          </h2>
          <p className="text-gray-600 max-w-2xl">
            a simple, four-step process to transform algorithm confusion into intuitive understanding.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border-l-4 border-black pl-6"
            >
              <div className="text-4xl font-bold text-gray-200 mb-2">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-tight">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
