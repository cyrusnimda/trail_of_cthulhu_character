import React from 'react';

const SocialMediaIcons = () => {
    return (
        <div className="flex justify-center items-center gap-6 mb-8">
            {/* GitHub */}
            <a
                href="https://github.com/cyrusnimda/trail_of_cthulhu_character"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-void-800 border border-void-700 hover:border-gold-500/50 hover:bg-void-700 transition-all duration-500 hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                aria-label="GitHub"
            >
                <svg className="w-5 h-5 text-parchment-400/50 group-hover:text-gold-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
            </a>

            {/* Website */}
            <a
                href="https://cyrusdev.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-3 rounded-full bg-void-800 border border-void-700 hover:border-gold-500/50 hover:bg-void-700 transition-all duration-500 hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                aria-label="Website"
            >
                <svg className="w-5 h-5 text-parchment-400/50 group-hover:text-gold-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
            </a>

            {/* Email */}
            <a
                href="mailto:cyrusnimda@gmail.com"
                className="group relative p-3 rounded-full bg-void-800 border border-void-700 hover:border-gold-500/50 hover:bg-void-700 transition-all duration-500 hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
                aria-label="Email"
            >
                <svg className="w-5 h-5 text-parchment-400/50 group-hover:text-gold-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </a>
        </div>
    );
};

export default SocialMediaIcons;
