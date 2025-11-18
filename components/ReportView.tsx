import React, { useRef, useContext, useState } from 'react';
import type { Report } from '../types';
import { ThemeContext } from '../App';

const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);

const PlusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
);

const SectionCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-card dark:bg-dark-card p-6 rounded-lg border border-border dark:border-dark-border mb-6">
        <h3 className="text-xl font-bold mb-4 text-accent dark:text-dark-accent-foreground">{title}</h3>
        {children}
    </div>
);

const KeyFigureCard: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="bg-secondary dark:bg-dark-secondary p-4 rounded-lg text-center">
        <p className="text-sm text-secondary-foreground dark:text-dark-secondary-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

interface ReportViewProps {
    report: Report;
    onNewResearch: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ report, onNewResearch }) => {
    const reportRef = useRef<HTMLDivElement>(null);
    const { theme } = useContext(ThemeContext);
    const [isExporting, setIsExporting] = useState(false);

    // Access window objects inside the component to avoid race condition on script load.
    const Recharts = (window as any).Recharts;
    const jspdf = (window as any).jspdf;
    const html2canvas = (window as any).html2canvas;

    const handleExportPDF = async () => {
      if (!reportRef.current || !jspdf || !html2canvas) return;
      setIsExporting(true);
      try {
        const { jsPDF } = jspdf;
        const canvas = await html2canvas(reportRef.current, {
          scale: 2,
          backgroundColor: theme === 'light' ? '#ffffff' : '#020817',
          useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`InsightForge-Report-${report.startupName}.pdf`);
      } catch (error) {
        console.error("Error exporting to PDF:", error);
      } finally {
        setIsExporting(false);
      }
    };
    
    return (
        <div>
            <header className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h2 className="text-3xl font-bold">Market Research Report</h2>
                    <p className="text-secondary-foreground dark:text-dark-secondary-foreground">for {report.startupName}</p>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={handleExportPDF} 
                        disabled={isExporting || !jspdf || !html2canvas}
                        className="flex items-center px-4 py-2 bg-secondary dark:bg-dark-secondary text-foreground dark:text-dark-foreground font-semibold rounded-md hover:bg-secondary/80 dark:hover:bg-dark-secondary/80 disabled:opacity-50"
                    >
                        {isExporting ? 'Exporting...' : <><DownloadIcon /> Export to PDF</>}
                    </button>
                    <button 
                        onClick={onNewResearch} 
                        className="flex items-center px-4 py-2 bg-accent dark:bg-dark-accent text-accent-foreground dark:text-dark-accent-foreground font-semibold rounded-md hover:bg-accent/90 dark:hover:bg-dark-accent/90"
                    >
                        <PlusIcon /> New Research
                    </button>
                </div>
            </header>

            <div ref={reportRef} className="p-1">
                <SectionCard title="Executive Summary">
                    <p className="text-secondary-foreground dark:text-dark-secondary-foreground leading-relaxed">{report.executiveSummary}</p>
                </SectionCard>

                <SectionCard title="Market Analysis">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">Market Size</h4>
                            <p className="text-secondary-foreground dark:text-dark-secondary-foreground">{report.marketAnalysis.marketSize}</p>
                        </div>
                        <div>
                            <h4 className="font-semibold">Key Trends</h4>
                            <ul className="list-disc list-inside text-secondary-foreground dark:text-dark-secondary-foreground space-y-1 mt-2">
                                {report.marketAnalysis.keyTrends.map((trend, index) => <li key={index}>{trend}</li>)}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Competitive Landscape</h4>
                            <div className="overflow-x-auto mt-2">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-secondary dark:bg-dark-secondary">
                                        <tr>
                                            <th className="p-3">Competitor</th>
                                            <th className="p-3">Strengths</th>
                                            <th className="p-3">Weaknesses</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {report.marketAnalysis.competitiveLandscape.map((item, index) => (
                                            <tr key={index} className="border-b border-border dark:border-dark-border">
                                                <td className="p-3 font-medium">{item.competitor}</td>
                                                <td className="p-3 text-secondary-foreground dark:text-dark-secondary-foreground">{item.strengths}</td>
                                                <td className="p-3 text-secondary-foreground dark:text-dark-secondary-foreground">{item.weaknesses}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </SectionCard>

                <SectionCard title="Data Insights">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <KeyFigureCard title="Market Valuation (2029)" value={report.dataInsights.keyFigures.marketValuation} />
                        <KeyFigureCard title="Growth Rate" value={report.dataInsights.keyFigures.growthRate} />
                        <KeyFigureCard title="User Adoption" value={report.dataInsights.keyFigures.userAdoption} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {Recharts ? (() => {
                                const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } = Recharts;
                                const lightColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
                                const darkColors = ["#a8a2f8", "#a0e0c0", "#ffe080", "#ffa060"];
                                const chartColors = theme === 'light' ? lightColors : darkColors;
                                const chartTickColor = theme === 'light' ? '#666' : '#bbb';

                                return (
                                    <>
                                        <div>
                                            <h4 className="font-semibold mb-4 text-center">Competitor Funding (in millions)</h4>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <BarChart data={report.dataInsights.competitorMetrics} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'light' ? '#e0e0e0' : '#444'} />
                                                    <XAxis dataKey="name" tick={{ fill: chartTickColor, fontSize: 12 }} />
                                                    <YAxis tick={{ fill: chartTickColor, fontSize: 12 }}/>
                                                    <Tooltip contentStyle={{ backgroundColor: theme === 'light' ? '#fff' : '#333', border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}` }}/>
                                                    <Legend />
                                                    <Bar dataKey="funding" fill={chartColors[0]} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold mb-4 text-center">Market Share</h4>
                                            <ResponsiveContainer width="100%" height={300}>
                                                <PieChart>
                                                    <Pie data={report.dataInsights.marketShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                                        {report.dataInsights.marketShare.map((entry, index) => <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />)}
                                                    </Pie>
                                                    <Tooltip contentStyle={{ backgroundColor: theme === 'light' ? '#fff' : '#333', border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}` }}/>
                                                    <Legend />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </>
                                );
                            })() : (
                            <div className="col-span-full text-center p-8 text-secondary-foreground dark:text-dark-secondary-foreground">
                                Loading charts...
                            </div>
                        )}
                    </div>
                </SectionCard>
                
                <SectionCard title="Strategic Perspectives">
                    <p className="text-secondary-foreground dark:text-dark-secondary-foreground leading-relaxed">{report.strategicPerspectives}</p>
                </SectionCard>
            </div>
        </div>
    );
};
