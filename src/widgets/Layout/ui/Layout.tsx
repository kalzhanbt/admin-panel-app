import React, { ReactNode } from "react";

import { LayoutRoot } from "./Layout.styles";
import { Header } from "@/widgets/Header";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <LayoutRoot>
            <Header />
            {children}
        </LayoutRoot>
    )
};

export default Layout;