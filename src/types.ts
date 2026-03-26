export interface LogEntry {
  id: string;
  code: string;
  category: string;
  message: string;
  status: 'STABLE' | 'OPERATIONAL' | 'SYNCED' | 'PENDING' | 'ERROR';
}

export interface ProjectStats {
  readiness: number;
  filesIntegrated: number;
  githubStatus: 'CONNECTED' | 'DISCONNECTED' | 'SYNCING';
  lastSync: string | null;
  repository: string;
  branch: string;
}

export interface ProjectState {
  stats: ProjectStats;
  logs: LogEntry[];
  version: string;
  buildId: string;
}
