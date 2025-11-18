
export interface User {
  id: string;
  username: string;
}

export interface ResearchFormData {
  startupName: string;
  targetSector: string;
  objective: string;
  files: File[];
}

export interface Report {
  id: string;
  startupName: string;
  targetSector: string;
  objective: string;
  generatedAt: string;
  executiveSummary: string;
  marketAnalysis: {
    marketSize: string;
    keyTrends: string[];
    competitiveLandscape: {
      competitor: string;
      strengths: string;
      weaknesses: string;
    }[];
  };
  dataInsights: {
    competitorMetrics: {
      name: string;
      funding: number;
      users: number;
    }[];
    marketShare: {
      name: string;
      value: number;
    }[];
    keyFigures: {
      marketValuation: string;
      growthRate: string;
      userAdoption: string;
    };
  };
  strategicPerspectives: string;
}

export interface HistoryItem {
  id: string;
  startupName: string;
  generatedAt: string;
  report: Report;
}
