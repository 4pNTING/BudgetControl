'use client';

import React from 'react';
import { Button } from 'primereact/button';
import type { Page } from '@/types';

const AccessDenied: Page = () => {
    return (
        <>
            <svg width="54px" height="54px" viewBox="0 0 74 64" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="flex absolute z-1 mx-6 my-6">
                <title>Shape</title>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="noun_Diamond_1258501" fill="#FFFFFF" fillRule="nonzero">
                        <path
                            d="M73.3,22.7 C73.3,22.6 73.3,22.6 73.4,22.5 C73.5,22.4 73.5,22.2 73.5,22.1 C73.5,21.9 73.5,21.7 73.4,21.5 L73.4,21.5 C73.4,21.5 73.3,21.4 73.3,21.4 C73.3,21.3 73.2,21.3 73.2,21.2 L58.2,1.2 L58.2,1.2 C58.1,1.1 58,1 57.9,0.9 L57.9,0.9 C57.8,0.8 57.7,0.8 57.5,0.7 L57.4,0.7 C57.3,0.7 57.1,0.6 57,0.6 L17,0.6 C16.9,0.6 16.7,0.6 16.6,0.7 L16.5,0.7 C16.4,0.7 16.3,0.8 16.1,0.9 L16.1,0.9 C16,1 15.9,1.1 15.8,1.2 L15.8,1.2 L0.8,21.2 C0.8,21.3 0.7,21.3 0.7,21.4 C0.7,21.4 0.6,21.5 0.6,21.5 L0.6,21.5 C0.6,21.6 0.5,21.7 0.5,21.7 C0.4,22 0.4,22.2 0.5,22.5 C0.5,22.6 0.5,22.6 0.6,22.7 L0.6,22.7 C0.6,22.8 0.7,22.8 0.7,22.9 C0.7,22.9 0.8,23 0.8,23 L35.8,63 L35.8,63 L36,63 C36.1,63.1 36.1,63.1 36.2,63.2 L36.3,63.3 L36.5,63.4 L36.6,63.4 C36.8,63.5 37.1,63.5 37.4,63.4 L37.5,63.4 L37.7,63.3 L37.8,63.2 C37.9,63.1 38,63.1 38,63 L38.1,62.9 L38.1,62.9 L73.1,22.9 C73.1,22.9 73.2,22.8 73.2,22.8 C73.3,22.8 73.3,22.7 73.3,22.7 L73.3,22.7 Z M19.4,23.5 L54.5,23.5 L37,58.7 L19.4,23.5 Z M37,4.1 L53.4,20.5 L20.6,20.5 L37,4.1 Z M69,20.5 L58.5,20.5 L58.5,6.5 L69,20.5 Z M55.5,3.5 L55.5,18.4 L40.6,3.5 L55.5,3.5 Z M18.5,18.4 L18.5,3.5 L33.4,3.5 L18.5,18.4 Z M15.5,6.5 L15.5,20.5 L5,20.5 L15.5,6.5 Z M16.1,23.5 L30.5,52.2 L5.3,23.5 L16.1,23.5 Z M43.6,52.2 L58,23.5 L68.8,23.5 L43.6,52.2 Z"
                            id="Shape"
                        ></path>
                    </g>
                </g>
            </svg>
            <div className="px-5 min-h-screen flex justify-content-center align-items-center bg-cover bg-center" style={{ backgroundImage: 'url(/images/auth/bg-access.jpg)' }}>
                <div className="relative text-center">
                    <div className="text-900 font-bold text-white text-8xl mb-4">ACCESS DENIED</div>
                    <p className="line-height-3 text-white mt-0 mb-5 text-700 text-xl font-medium">You do not have the necessary permissions.</p>
                    <Button severity="warning" className="font-medium">
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </>
    );
};

export default AccessDenied;
