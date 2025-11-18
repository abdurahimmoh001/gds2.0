
import type { Report, ResearchFormData } from '../types';

export const generateResearchReport = (formData: ResearchFormData): Promise<Report> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const mockReport: Report = {
        id: `rep-${new Date().getTime()}`,
        startupName: formData.startupName || 'InnovateAI',
        targetSector: formData.targetSector || 'Artificial Intelligence in Healthcare',
        objective: formData.objective || 'To assess the market viability and competitive landscape for an AI-powered diagnostic tool.',
        generatedAt: new Date().toISOString(),
        executiveSummary: 'InnovateAI shows significant potential in a rapidly growing market. The primary challenge will be differentiating from established players like HealthAI and MediScan. Key opportunities lie in leveraging a proprietary algorithm for faster and more accurate diagnostics, targeting underserved niche medical fields initially.',
        marketAnalysis: {
          marketSize: '$15.8 Billion (2023)',
          keyTrends: [
            'Increasing adoption of AI/ML in diagnostics.',
            'Shift towards personalized and predictive medicine.',
            'Regulatory bodies creating clearer pathways for AI-based medical devices.',
            'Demand for solutions that reduce healthcare professional burnout.',
          ],
          competitiveLandscape: [
            { competitor: 'HealthAI', strengths: 'Strong brand recognition, large existing hospital network.', weaknesses: 'Slower to adopt new deep learning models, higher price point.' },
            { competitor: 'MediScan', strengths: 'Excellent user interface, strong in radiological imaging.', weaknesses: 'Limited to specific imaging modalities, less flexible platform.' },
            { competitor: 'DataCure', strengths: 'Focus on data aggregation and analytics.', weaknesses: 'Not a direct diagnostic tool, potential competitor and partner.' },
          ]
        },
        dataInsights: {
          competitorMetrics: [
            { name: 'HealthAI', funding: 150, users: 50000 },
            { name: 'MediScan', funding: 80, users: 120000 },
            { name: 'DataCure', funding: 120, users: 25000 },
            { name: formData.startupName || 'InnovateAI (est.)', funding: 10, users: 0 },
          ],
          marketShare: [
            { name: 'HealthAI', value: 45 },
            { name: 'MediScan', value: 30 },
            { name: 'DataCure', value: 15 },
            { name: 'Other', value: 10 },
          ],
          keyFigures: {
            marketValuation: '$45 Billion by 2029',
            growthRate: '28% CAGR',
            userAdoption: 'Early-stage, projected 5x growth in 3 years',
          },
        },
        strategicPerspectives: 'Initial focus should be on a specific, high-pain-point diagnostic area where current solutions are slow or inaccurate. Secure pilot programs with mid-sized clinics to build case studies. A flexible, API-first approach could open partnership opportunities with larger players like DataCure. Fundraising efforts should highlight the proprietary technology and the clear go-to-market strategy.'
      };
      resolve(mockReport);
    }, 4500); // Simulate a 4.5-second API call
  });
};
