import React, {Suspense} from "react";
import {Outlet} from "react-router-dom";
import Head from "./head";

const Layout = ({title, ...props}) => {
    const loading = () => <div/>
    const children = props['children'] || null
    return (
        <Suspense fallback={loading()}>
            <Head title={!title && 'Loading'}/>
            <div className="nk-app-root">
                <div className="nk-wrap nk-wrap-nosidebar">
                    <div className="nk-content">
                        {children}
                    </div>
                </div>
            </div>
        </Suspense>
    );
};
export {Layout};
