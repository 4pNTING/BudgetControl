'use client';

import React from 'react';

import { useContext } from 'react';

import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <div className="footer-logo-container">
                <span className="footer-app-name">Version 1.0.1</span>
            </div>
            <span className="footer-copyright">&#169; Lao World Public</span>
        </div>
    );
};

export default AppFooter;
