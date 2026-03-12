import { curriculum } from '@/lib/algorithms';
import { ClusterSelector } from '@/components/learn/cluster-selector';
import { AlgorithmView } from '@/components/learn/algorithm-view';
import { redirect } from 'next/navigation';

interface AlgorithmPageProps {
  params: Promise<{
    clusterId: string;
    algorithmId: string;
  }>;
}

export default async function AlgorithmPage({ params }: AlgorithmPageProps) {
  const { clusterId, algorithmId } = await params;

  const cluster = curriculum.clusters.find(c => c.id === clusterId);

  if (!cluster) {
    redirect('/learn');
  }

  const algorithm = cluster.algorithms.find(a => a.id === algorithmId);

  if (!algorithm) {
    redirect(`/learn/${clusterId}`);
  }

  return (
    <div className="flex h-screen">
      {/* Left Sidebar - Curriculum */}
      <ClusterSelector
        selectedClusterId={clusterId}
        selectedAlgorithmId={algorithmId}
      />

      {/* Center - Canvas & Controls + Right Panel */}
      <AlgorithmView algorithm={algorithm} />
    </div>
  );
}
