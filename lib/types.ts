// Node representing a vertex in the graph
export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

// Edge representing a connection between nodes
export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight?: number;
  directed?: boolean;
}

// State of a single animation step
export interface GraphStep {
  stepNumber: number;
  description: string;
  nodes: {
    id: string;
    state: 'normal' | 'visiting' | 'visited' | 'highlighted';
    label?: string;
  }[];
  edges: {
    id: string;
    state: 'normal' | 'visiting' | 'visited' | 'highlighted';
    label?: string;
  }[];
  pseudocode: {
    line: number;
    code: string;
  }[];
  complexity?: {
    time: string;
    space: string;
  };
}

// Complete graph with all animation steps
export interface AlgorithmVisualization {
  id: string;
  name: string;
  description: string;
  complexity: {
    time: string;
    space: string;
  };
  initialNodes: GraphNode[];
  initialEdges: GraphEdge[];
  steps: GraphStep[];
  pseudocode: string[];
}

// Curriculum cluster grouping related algorithms
export interface CurriculumCluster {
  id: string;
  name: string;
  description: string;
  color: string;
  algorithms: AlgorithmVisualization[];
  prerequisites?: string[];
}

// Complete curriculum structure
export interface Curriculum {
  clusters: CurriculumCluster[];
}
