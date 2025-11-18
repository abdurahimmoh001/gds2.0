
import React, { useState } from 'react';
import type { User } from '../types';

interface AuthProps {
    onLogin: (user: User) => void;
}

const AuthIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-accent dark:text-dark-accent-foreground">
        <path d="M14 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
        <path d="M14 13h4.4a5.5 5.5 0 0 1 5.6 5.6V22h-18v-3.4a5.5 5.5 0 0 1 5.6-5.6H10" />
        <path d="M4.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        <path d="M7 12.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        <path d="M9.5 10.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>
);


export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim()) {
            onLogin({ id: 'user-' + Date.now(), username });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-secondary dark:bg-dark-secondary">
            <div className="w-full max-w-md p-8 space-y-8 bg-card dark:bg-dark-card rounded-xl shadow-lg border border-border dark:border-dark-border">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <AuthIcon />
                    </div>
                    <h1 className="text-3xl font-bold text-foreground dark:text-dark-foreground">Welcome to InsightForge</h1>
                    <p className="mt-2 text-secondary-foreground dark:text-dark-secondary-foreground">Log in to generate market insights.</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input dark:border-dark-input placeholder-secondary-foreground dark:placeholder-dark-secondary-foreground text-foreground dark:text-dark-foreground bg-background dark:bg-dark-background rounded-t-md focus:outline-none focus:ring-accent dark:focus:ring-dark-accent focus:border-accent dark:focus:border-dark-accent focus:z-10 sm:text-sm"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-input dark:border-dark-input placeholder-secondary-foreground dark:placeholder-dark-secondary-foreground text-foreground dark:text-dark-foreground bg-background dark:bg-dark-background rounded-b-md focus:outline-none focus:ring-accent dark:focus:ring-dark-accent focus:border-accent dark:focus:border-dark-accent focus:z-10 sm:text-sm"
                                placeholder="Password (mock)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-accent-foreground dark:text-dark-accent-foreground bg-accent dark:bg-dark-accent hover:bg-accent/90 dark:hover:bg-dark-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent dark:focus:ring-dark-accent"
                        >
                            Sign in / Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
