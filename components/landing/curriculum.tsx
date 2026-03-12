'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { curriculum } from '@/lib/algorithms';

export function Curriculum() {
  return (
    <section id="curriculum" className="py-20 px-6 bg-white border-t border-black border-opacity-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold tracking-tighter mb-3">
            complete curriculum
          </h2>
          <p className="text-gray-600 max-w-2xl">
            progress through 6 core topics, from basic graph concepts to advanced algorithms. each cluster builds on the previous.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculum.clusters.map((cluster, index) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-black p-6 hover:bg-gray-50 transition cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold tracking-tight group-hover:opacity-70 transition">
                  {cluster.name}
                </h3>
                <div className="text-2xl font-bold text-gray-300 group-hover:text-gray-400 transition">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {cluster.description}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  {cluster.algorithms.length} algorithm{cluster.algorithms.length !== 1 ? 's' : ''}
                </span>
                <Link
                  href={`/learn/${cluster.id}`}
                  className="underline hover:opacity-60 transition"
                >
                  explore →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
