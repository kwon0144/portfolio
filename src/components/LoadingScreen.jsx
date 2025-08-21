import { useState, useEffect } from 'react'

const targets = ["<Hello World />", "<Welcome/>"];

const LoadingScreen = ({onComplete}) => {
    const [ text, setText ] = useState("");
    const typingDelay = 100;
    const deletingDelay = 60;
    const holdDelay = 800;
    const pauseDelay = 300;

    const [phase, setPhase] = useState("typing"); // typing | deleting
    const [targetIndex, setTargetIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        let timeoutId;
        const current = targets[targetIndex];

        if (phase === "typing") {
            if (charIndex <= current.length) {
                setText(current.slice(0, charIndex));
                timeoutId = setTimeout(() => setCharIndex((v) => v + 1), typingDelay);
            } else {
                // Finished typing current target
                if (targetIndex === 0) {
                    timeoutId = setTimeout(() => {
                        setPhase("deleting");
                        setCharIndex(current.length - 1);
                    }, holdDelay);
                } else {
                    timeoutId = setTimeout(() => onComplete(), 1000);
                }
            }
        } else if (phase === "deleting") {
            if (charIndex >= 0) {
                setText(targets[0].slice(0, charIndex));
                timeoutId = setTimeout(() => setCharIndex((v) => v - 1), deletingDelay);
            } else {
                timeoutId = setTimeout(() => {
                    setPhase("typing");
                    setTargetIndex(1);
                    setCharIndex(1);
                }, pauseDelay);
            }
        }

        return () => clearTimeout(timeoutId);
    }, [phase, targetIndex, charIndex, onComplete])

    return (
        <div className='fixed inset-0 z-50 bg-black flex flex-col items-center justify-center'>
            <div className='text-3xl font-bold text-primary-foreground mb-6'>
                <span>{text}</span>
                <span className='anime-blink ml-1'>|</span>
            </div>
            <div className='mt-2 w-[200px] h-[2px] bg-gray-800 rounded overflow-hidden'>
                <div className='w-[40%] h-full bg-primary shadow-[0_0_15px_#3b82f6] animate-loading-bar'></div>
            </div>
        </div>
    )
}

export default LoadingScreen