
import React, { useState } from 'react';
import type { HistoryItem } from '../types';

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>
);

const HistoryIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>
);

interface HistoryPanelProps {
    history: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    return (
        <aside className={`relative bg-card dark:bg-dark-card border-r border-border dark:border-dark-border transition-all duration-300 ease-in-out ${isCollapsed ? 'w-0 md:w-16' : 'w-full md:w-80'}`}>
            <div className={`h-full flex flex-col overflow-hidden ${isCollapsed ? 'items-center' : ''}`}>
                <div className={`flex items-center p-4 border-b border-border dark:border-dark-border ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    <div className={`flex items-center gap-2 ${isCollapsed ? 'hidden md:flex' : 'flex'}`}>
                        <HistoryIcon className="h-6 w-6 text-accent dark:text-dark-accent-foreground" />
                        {!isCollapsed && <h2 className="text-lg font-semibold">Research History</h2>}
                    </div>
                </div>
                
                <ul className="flex-1 overflow-y-auto">
                    {history.length === 0 && !isCollapsed && (
                        <p className="p-4 text-sm text-secondary-foreground dark:text-dark-secondary-foreground">No reports generated yet.</p>
                    )}
                    {history.map(item => (
                        <li key={item.id}>
                            <button 
                                onClick={() => onSelect(item)}
                                className={`w-full text-left p-4 hover:bg-secondary dark:hover:bg-dark-secondary transition-colors duration-200 ${isCollapsed ? 'flex justify-center' : ''}`}
                            >
                                {isCollapsed ? (
                                    <span className="font-bold text-lg">{item.startupName.charAt(0)}</span>
                                ) : (
                                    <div>
                                        <p className="font-semibold text-sm truncate">{item.startupName}</p>
                                        <p className="text-xs text-secondary-foreground dark:text-dark-secondary-foreground">{formatDate(item.generatedAt)}</p>
                                    </div>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            
            <button 
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-full p-1 text-secondary-foreground dark:text-dark-secondary-foreground hover:bg-secondary dark:hover:bg-dark-secondary focus:outline-none focus:ring-2 focus:ring-accent z-10 hidden md:block"
                aria-label={isCollapsed ? "Expand history panel" : "Collapse history panel"}
            >
                <ChevronLeftIcon className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} />
            </button>
        </aside>
    );
};
