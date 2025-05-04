import React from 'react';

const Header = () => {
    return (
        <header className="w-full mb-6 text-center">
            <h1 className="text-4xl font-display font-bold text-white py-4 animate-pulse">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Get Fit Dude!
                </span>
            </h1>
            <div className="h-1 w-3/4 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full shadow-glow"></div>
        </header>
    );
};

export default Header;