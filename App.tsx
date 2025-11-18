
import React, { useState, useEffect, useCallback } from 'react';
import { Auth } from './components/Auth';
import { Header } from './components/Header';
import { HistoryPanel } from './components/HistoryPanel';
import { ResearchForm } from './components/ResearchForm';
import { LoadingScreen } from './components/LoadingScreen';
import { ReportView } from './components/ReportView';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateResearchReport } from './services/reportService';
import type { User, Report, HistoryItem, ResearchFormData } from './types';

export const ThemeContext = React.createContext<{ theme: 'light' | 'dark'; toggleTheme: () => void; }>({
    theme: 'light',
    toggleTheme: () => {},
});

const App: React.FC = () => {
    const [user, setUser] = useLocalStorage<User | null>('insightforge-user', null);
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('insightforge-theme', 'light');
    const [history, setHistory] = useLocalStorage<HistoryItem[]>('insightforge-history', []);
    const [view, setView] = useState<'form' | 'loading' | 'report'>('form');
    const [activeReport, setActiveReport] = useState<Report | null>(null);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    }, [setTheme]);

    const handleLogin = (loggedInUser: User) => {
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        setUser(null);
        setActiveReport(null);
        setView('form');
    };

    const handleGenerateReport = async (formData: ResearchFormData) => {
        setView('loading');
        try {
            const report = await generateResearchReport(formData);
            const newHistoryItem: HistoryItem = {
                id: report.id,
                startupName: report.startupName,
                generatedAt: report.generatedAt,
                report: report,
            };
            setHistory(prevHistory => [newHistoryItem, ...prevHistory]);
            setActiveReport(report);
            setView('report');
        } catch (error) {
            console.error("Failed to generate report:", error);
            setView('form'); // Reset to form on error
        }
    };
    
    const handleSelectHistoryItem = (item: HistoryItem) => {
        setActiveReport(item.report);
        setView('report');
    };

    const handleNewResearch = () => {
        setActiveReport(null);
        setView('form');
    };
    
    if (!user) {
        return <Auth onLogin={handleLogin} />;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className="flex flex-col h-screen font-sans bg-secondary dark:bg-dark-secondary text-foreground dark:text-dark-foreground">
                <Header username={user.username} onLogout={handleLogout} />
                <div className="flex flex-1 overflow-hidden">
                    <HistoryPanel history={history} onSelect={handleSelectHistoryItem} />
                    <main className="flex-1 overflow-y-auto p-4 md:p-8 transition-all duration-300">
                        {view === 'form' && <ResearchForm onGenerate={handleGenerateReport} />}
                        {view === 'loading' && <LoadingScreen />}
                        {view === 'report' && activeReport && <ReportView report={activeReport} onNewResearch={handleNewResearch} />}
                    </main>
                </div>
            </div>
        </ThemeContext.Provider>
    );
};

export default App;
