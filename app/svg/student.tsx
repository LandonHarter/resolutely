export default function StudentSVG({ className, pathClassName }: { className?: string, pathClassName?: string }) {
    return (
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32" xmlSpace="preserve" className={className}>
            <line x1="3" y1="13" x2="3" y2="24" className={pathClassName} />
            <circle cx="3" cy="24" r="2" className={pathClassName} />
            <polygon points="16,8.833 3.5,13 16,17.167 28.5,13 " className={pathClassName} />
            <path d="M7,14.451V20c0,1.657,4.029,3,9,3s9-1.343,9-3
	v-5.549" className={pathClassName} />
        </svg>
    );
}