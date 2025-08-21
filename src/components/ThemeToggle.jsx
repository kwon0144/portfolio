import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme ? storedTheme === 'dark' : true; // default to dark
    });

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDarkMode(prevMode => !prevMode);
    }

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === "dark" || storedTheme == null) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, [])


    return (
        <button 
            onClick={toggleTheme} 
            className={cn(
                "max-sm:hidden rounded-full transition-colors duration-300",
                "focus: outline-hidden"
                )}
            >
            {isDarkMode ? (
            <Sun className="h-6 w-6 [stroke:currentColor] text-yellow-300"/>)
             : (
            <Moon className="h-6 w-6 [stroke:currentColor] text-blue-900"/>
            )}
        </button>
    )
}

export default ThemeToggle