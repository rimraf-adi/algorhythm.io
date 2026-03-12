import { curriculum } from '@/lib/algorithms';
import { ClusterSelector } from '@/components/learn/cluster-selector';
import { redirect } from 'next/navigation';

interface ClusterPageProps {
  params: Promise<{
    clusterId: string;
  }>;
}

export default async function ClusterPage({ params }: ClusterPageProps) {
  const { clusterId } = await params;

  const cluster = curriculum.clusters.find(c => c.id === clusterId);

  if (!cluster) {
    redirect('/learn');
  }

  // Redirect to first algorithm if it exists
  if (cluster.algorithms.length > 0) {
    redirect(`/learn/${clusterId}/${cluster.algorithms[0].id}`);
  }

  return (
    <div className="flex h-screen">
      <ClusterSelector selectedClusterId={clusterId} />
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">{cluster.name}</h1>
          <p className="text-gray-600">coming soon</p>
        </div>
      </div>
    </div>
  );
}
