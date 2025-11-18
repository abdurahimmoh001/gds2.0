
import React, { useContext } from 'react';
import { ThemeContext } from '../App';

const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);

const LogOutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
);

const LogoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-accent dark:text-dark-accent-foreground">
        <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20Z" />
        <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path d="m14.5 9.5-5 5" />
        <path d="m9.5 9.5 5 5" />
    </svg>
);


interface HeaderProps {
    username: string;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ username, onLogout }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header className="flex items-center justify-between p-4 bg-card dark:bg-dark-card border-b border-border dark:border-dark-border shadow-sm">
            <div className="flex items-center gap-4">
                <LogoIcon />
                <h1 className="text-xl font-bold text-foreground dark:text-dark-foreground">InsightForge</h1>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-secondary-foreground dark:text-dark-secondary-foreground hidden md:inline">Welcome, {username}</span>
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-secondary dark:hover:bg-dark-secondary text-secondary-foreground dark:text-dark-secondary-foreground">
                    {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                </button>
                <button onClick={onLogout} className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary dark:hover:bg-dark-secondary text-secondary-foreground dark:text-dark-secondary-foreground">
                    <LogOutIcon className="h-5 w-5" />
                    <span className="text-sm hidden sm:inline">Sign Out</span>
                </button>
            </div>
        </header>
    );
};
