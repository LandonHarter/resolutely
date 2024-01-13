export default function WeeklySVG({ className, pathClassName }: { className?: string, pathClassName?: string }) {
    return (
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path d="M4 9V19C4 20.1046 4.89543 21 6 21H12M4 9V7C4 5.89543 4.89543 5 6 5H8M4 9H20M20 9V7C20 5.89543 19.1046 5 18 5H16M20 9V12M16 5V3M16 5H8M8 3V5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className={pathClassName} /><path d="M19 16V19M19 22V19M19 19H22M19 19H16" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className={pathClassName} /></svg>
    );
}