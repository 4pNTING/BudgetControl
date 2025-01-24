'use client';

import React, { forwardRef, useImperativeHandle, useContext, useRef } from 'react';

import Link from 'next/link';
import AppBreadCrumb from './AppBreadCrumb';
import { LayoutContext } from './context/layoutcontext';
import AppSidebar from './AppSidebar';
import { StyleClass } from 'primereact/styleclass';
import { Ripple } from 'primereact/ripple';

const AppTopbar = forwardRef((props: { sidebarRef: React.RefObject<HTMLDivElement> }, ref) => {
    const btnRef1 = useRef(null);
    const btnRef2 = useRef(null);
    const menubuttonRef = useRef(null);

    const { onMenuToggle, toggleSearch, showRightSidebar, layoutConfig } = useContext(LayoutContext);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current
    }));

    return (
        <div className="layout-topbar">
            <div className="topbar-left">
                <button ref={menubuttonRef} type="button" className="menu-button p-link" onClick={onMenuToggle}>
                    <i className="pi pi-chevron-left"></i>
                </button>

                <Link href="/" className="horizontal-logo">
                    <img id="logo-horizontal" src={`/images/logo-${layoutConfig.menuTheme === 'white' || layoutConfig.menuTheme === 'orange' ? 'dark' : 'white'}.svg`} alt="diamond-layout" />
                </Link>

                <span className="topbar-separator"></span>

                <AppBreadCrumb />
                <img id="logo-mobile" className="mobile-logo" src={`/images/logo-${layoutConfig.colorScheme == 'light' ? 'dark' : 'white'}.svg`} alt="diamond-layout" />
            </div>
            <div className="layout-topbar-menu-section">
                <AppSidebar sidebarRef={props.sidebarRef} />
            </div>
            <div className="layout-mask modal-in"></div>

            <div className="topbar-right">
                <ul className="topbar-menu">
                    <li className="static sm:relative">
                        <StyleClass nodeRef={btnRef1} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick>
                            <a tabIndex={0} ref={btnRef1}>
                                <i className="pi pi-bell"></i>
                                <span className="topbar-badge">5</span>
                            </a>
                        </StyleClass>
                        <ul className="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-19rem mt-2 right-0 z-5 top-auto">
                            <li>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <span className="flex flex-column">
                                        <span className="text-color-secondary">
                                            New item alert
                                        </span>
                                    </span>
                                    <Ripple />
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="profile-item static sm:relative">
                        <StyleClass nodeRef={btnRef2} selector="@next" enterClassName="hidden" enterActiveClassName="scalein" leaveToClassName="hidden" leaveActiveClassName="fadeout" hideOnOutsideClick={true}>
                            <a tabIndex={1} ref={btnRef2}>
                                <img src={`/images/profile.jpg`} alt="diamond-layout" className="profile-image" />
                                <span className="profile-name">Seven N</span>
                            </a>
                        </StyleClass>
                        <ul className="list-none p-3 m-0 border-round shadow-2 absolute surface-overlay hidden origin-top w-full sm:w-19rem mt-2 right-0 z-5 top-auto">
                            <li>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-user mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">ຂໍ້ມູນສ່ວນຕົວ</span>
                                    </span>
                                    <Ripple />
                                </a>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-cog mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">ຕັ້ງຄ່າ</span>
                                    </span>
                                    <Ripple />
                                </a>
                                <a className="p-ripple flex p-2 border-round align-items-center hover:surface-hover transition-colors transition-duration-150 cursor-pointer">
                                    <i className="pi pi-power-off mr-3"></i>
                                    <span className="flex flex-column">
                                        <span className="font-semibold">ອອກຈາກລະບົບ</span>
                                    </span>
                                    <Ripple />
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="right-sidebar-item">
                        <a onClick={showRightSidebar}>
                            <i className="pi pi-align-right"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
});

export default AppTopbar;

AppTopbar.displayName = 'AppTopbar';
