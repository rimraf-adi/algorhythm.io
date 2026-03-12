import { curriculum } from '@/lib/algorithms';
import { redirect } from 'next/navigation';

export default function LearnPage() {
  // Redirect to first cluster with algorithms
  const firstCluster = curriculum.clusters.find(c => c.algorithms.length > 0);
  if (firstCluster) {
    redirect(`/learn/${firstCluster.id}`);
  }
  redirect('/');
}
