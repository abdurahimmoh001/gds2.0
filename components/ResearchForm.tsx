
import React, { useState, useCallback } from 'react';
import type { ResearchFormData } from '../types';

const UploadCloudIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 mb-4 text-secondary-foreground dark:text-dark-secondary-foreground"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/></svg>
);

const FileIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2 text-secondary-foreground dark:text-dark-secondary-foreground"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
);

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const FileUploader: React.FC<{files: File[], setFiles: React.Dispatch<React.SetStateAction<File[]>>}> = ({ files, setFiles }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles(prev => [...prev, ...Array.from(e.dataTransfer.files)]);
        }
    };
    
    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            <div 
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${isDragging ? 'border-accent dark:border-dark-accent bg-accent/10' : 'border-input dark:border-dark-input hover:border-accent dark:hover:border-dark-accent'}`}
            >
                <UploadCloudIcon />
                <p className="mb-2 text-sm text-secondary-foreground dark:text-dark-secondary-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-secondary-foreground dark:text-dark-secondary-foreground">PDF, DOCX, etc. (up to 10MB each)</p>
                <input id="dropzone-file" type="file" className="absolute h-full w-full opacity-0 cursor-pointer" multiple onChange={handleFileChange} />
            </div>
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-secondary dark:bg-dark-secondary rounded-md">
                            <div className="flex items-center">
                                <FileIcon />
                                <span className="text-sm font-medium truncate">{file.name}</span>
                            </div>
                            <button onClick={() => removeFile(index)} className="text-destructive dark:text-dark-destructive-foreground hover:text-destructive/80"><XIcon className="h-4 w-4" /></button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


interface ResearchFormProps {
    onGenerate: (formData: ResearchFormData) => void;
}

export const ResearchForm: React.FC<ResearchFormProps> = ({ onGenerate }) => {
    const [startupName, setStartupName] = useState('');
    const [targetSector, setTargetSector] = useState('');
    const [objective, setObjective] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        onGenerate({ startupName, targetSector, objective, files });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-2">New Research Report</h2>
            <p className="text-secondary-foreground dark:text-dark-secondary-foreground mb-6">Define the parameters for your market research.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="startupName" className="block text-sm font-medium mb-1">Startup Name</label>
                    <input 
                        type="text" 
                        id="startupName" 
                        value={startupName}
                        onChange={(e) => setStartupName(e.target.value)}
                        required
                        className="w-full p-2 border border-input dark:border-dark-input rounded-md bg-background dark:bg-dark-background focus:ring-2 focus:ring-accent dark:focus:ring-dark-accent focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="targetSector" className="block text-sm font-medium mb-1">Target Sector/Industry</label>
                    <input 
                        type="text" 
                        id="targetSector" 
                        value={targetSector}
                        onChange={(e) => setTargetSector(e.target.value)}
                        required
                        className="w-full p-2 border border-input dark:border-dark-input rounded-md bg-background dark:bg-dark-background focus:ring-2 focus:ring-accent dark:focus:ring-dark-accent focus:outline-none"
                    />
                </div>
                <div>
                    <label htmlFor="objective" className="block text-sm font-medium mb-1">Primary Research Objective</label>
                    <textarea 
                        id="objective" 
                        rows={4}
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                        required
                        className="w-full p-2 border border-input dark:border-dark-input rounded-md bg-background dark:bg-dark-background focus:ring-2 focus:ring-accent dark:focus:ring-dark-accent focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Upload Documents</label>
                    <FileUploader files={files} setFiles={setFiles} />
                </div>
                <div className="flex justify-end">
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="px-6 py-2 bg-accent dark:bg-dark-accent text-accent-foreground dark:text-dark-accent-foreground font-semibold rounded-md hover:bg-accent/90 dark:hover:bg-dark-accent/90 disabled:bg-accent/50 disabled:cursor-not-allowed flex items-center"
                    >
                        {isLoading && (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        {isLoading ? 'Generating...' : 'Generate Research Report'}
                    </button>
                </div>
            </form>
        </div>
    );
};
