import React, { useState, useEffect } from 'react';

function DisplayImage() {
    const [imageSrc, setImageSrc] = useState(sessionStorage.getItem('imageSrc'));

    // Listen for changes in sessionStorage
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === 'imageSrc') {
                setImageSrc(e.newValue);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return <img src={imageSrc} alt="Dynamic Image" />;
}

export default DisplayImage;
