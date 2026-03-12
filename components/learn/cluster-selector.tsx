'use client';

import { useState } from 'react';
import Link from 'next/link';
import { curriculum } from '@/lib/algorithms';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ClusterSelectorProps {
  selectedClusterId?: string;
  selectedAlgorithmId?: string;
}

export function ClusterSelector({ selectedClusterId, selectedAlgorithmId }: ClusterSelectorProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set([selectedClusterId || '']));

  const toggleExpand = (clusterId: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(clusterId)) {
      newExpanded.delete(clusterId);
    } else {
      newExpanded.add(clusterId);
    }
    setExpanded(newExpanded);
  };

  return (
    <div className="w-64 border-r border-black border-opacity-20 overflow-y-auto h-screen flex flex-col">
      <div className="p-4 border-b border-black border-opacity-20 sticky top-0 bg-white">
        <h2 className="text-sm font-bold tracking-tighter">curriculum</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {curriculum.clusters.map((cluster) => (
          <div key={cluster.id}>
            <button
              onClick={() => toggleExpand(cluster.id)}
              className="w-full px-4 py-3 text-left text-sm border-b border-black border-opacity-10 hover:bg-gray-50 transition flex items-center justify-between group"
            >
              <span className="font-medium truncate">{cluster.name}</span>
              {expanded.has(cluster.id) ? (
                <ChevronDown size={16} className="text-gray-400 flex-shrink-0" />
              ) : (
                <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
              )}
            </button>

            {expanded.has(cluster.id) && (
              <div className="bg-gray-50 border-b border-black border-opacity-10">
                {cluster.algorithms.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-gray-500">
                    coming soon
                  </div>
                ) : (
                  cluster.algorithms.map((algo) => (
                    <Link
                      key={algo.id}
                      href={`/learn/${cluster.id}/${algo.id}`}
                      className={`block px-6 py-2 text-xs border-b border-black border-opacity-5 hover:bg-white transition ${
                        selectedAlgorithmId === algo.id
                          ? 'bg-white border-l-2 border-l-black pl-5'
                          : ''
                      }`}
                    >
                      {algo.name}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
