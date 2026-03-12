import { curriculum } from '@/lib/algorithms';
import { ClusterSelector } from '@/components/learn/cluster-selector';
import { VisualizationArea } from '@/components/learn/visualization-area';
import { InfoPanel } from '@/components/learn/info-panel';
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

      {/* Center - Canvas & Controls */}
      <VisualizationArea 
        algorithm={algorithm}
        rightPanel={(currentStep) => (
          <InfoPanel 
            algorithm={algorithm} 
            currentStep={algorithm.steps[currentStep]}
          />
        )}
      />
    </div>
  );
}
