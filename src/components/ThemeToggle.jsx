import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

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
        if (storedTheme == "dark") {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
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