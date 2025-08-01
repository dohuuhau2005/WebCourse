import React from 'react';
import './Footer.scss';
function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} 1A3H Course Web. All rights reserved.</p>
                <p>
                    Follow us on{' '}
                    <a href="https://zalo.me/0356100675" className="text-blue-400 hover:underline">
                        zalo
                    </a>{' '}
                    and{' '}
                    <a href="https://facebook.com" className="text-blue-400 hover:underline">
                        Facebook
                    </a>
                </p>
            </div>
        </footer>
    );
}
export default Footer;