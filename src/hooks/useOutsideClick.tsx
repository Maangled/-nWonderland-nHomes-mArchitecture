// based on https://stackoverflow.com/questions/32553158/detect-click-outside-react-component

import { useEffect } from 'react';

// Hook
export default function useOutsideClick(ref: any, callback: any) {
    const handleClick = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback();
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    });
}
