
import React, { useState, useEffect } from 'react';

const FileTextIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
);
const GlobeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);
const LightbulbIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
const BookIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
);

const loadingStages = [
    { text: 'Analyzing Documents...', icon: <FileTextIcon />, duration: 1200 },
    { text: 'Scanning Web Data...', icon: <GlobeIcon />, duration: 1200 },
    { text: 'Generating Insights...', icon: <LightbulbIcon />, duration: 1200 },
    { text: 'Compiling Report...', icon: <BookIcon />, duration: 900 },
];

export const LoadingScreen: React.FC = () => {
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const totalDuration = loadingStages.reduce((acc, stage) => acc + stage.duration, 0);

    useEffect(() => {
        const stageTimer = setTimeout(() => {
            if (currentStageIndex < loadingStages.length - 1) {
                setCurrentStageIndex(currentStageIndex + 1);
            }
        }, loadingStages[currentStageIndex].duration);

        return () => clearTimeout(stageTimer);
    }, [currentStageIndex]);

    useEffect(() => {
        let elapsed = 0;
        for (let i = 0; i < currentStageIndex; i++) {
            elapsed += loadingStages[i].duration;
        }

        const interval = setInterval(() => {
            const currentStageElapsed = performance.now() % loadingStages[currentStageIndex].duration;
            const totalElapsed = elapsed + currentStageElapsed;
            setProgress((totalElapsed / totalDuration) * 100);
        }, 50);

        return () => clearInterval(interval);
    }, [currentStageIndex, totalDuration]);


    const currentStage = loadingStages[currentStageIndex];

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center p-8 bg-card dark:bg-dark-card rounded-lg shadow-lg border border-border dark:border-dark-border">
                <div className="flex items-center justify-center text-accent dark:text-dark-accent-foreground mb-4">
                    {currentStage.icon}
                </div>
                <h2 className="text-2xl font-semibold mb-4">{currentStage.text}</h2>
                <div className="w-64 bg-secondary dark:bg-dark-secondary rounded-full h-2.5">
                    <div 
                        className="bg-accent dark:bg-dark-accent h-2.5 rounded-full transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
                 <p className="text-sm mt-4 text-secondary-foreground dark:text-dark-secondary-foreground">Please wait, this may take a moment...</p>
            </div>
        </div>
    );
};
