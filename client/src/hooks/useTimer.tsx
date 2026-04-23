import { useEffect, useState } from "react"

export function useTimer(startedAt?: number) {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        if (!startedAt) return;

        const interval = setInterval(() => {
            setNow(Date.now());
        }, 1000)
        return () => clearInterval(interval);
    }, [startedAt]);

    if(!startedAt) return 0;

    return now - startedAt;
}