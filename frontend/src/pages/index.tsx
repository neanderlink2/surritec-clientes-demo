import { Composition } from 'atomic-layout';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LeftMenu from '../components/LeftMenu';
import { useAuth } from '../contexts/AuthProvider';
import PrivateRoutes from '../routes/index.private';
import PublicRoutes from '../routes/index.public';

const areas = `
  header header
  leftMenu principal  
`

const areasMobile = `
  header 
  principal  
`

export default function Pages() {
    const { authenticated } = useAuth();

    return (
        <Composition areas={areasMobile}
            areasMd={areas}
            height="100vh"
            width="100vw"
            templateCols="275px 1fr"
            templateRows="75px 1fr 100px"
        >
            {(Areas) => (
                <>
                    <Areas.Header as="header" flex flexGrow="1" width="100%">
                        <Header />
                    </Areas.Header>
                    <Areas.LeftMenu as="aside" flex flexGrow="1">
                        <LeftMenu />
                    </Areas.LeftMenu>
                    <Areas.Principal as="main" flex flexGrow="1">
                        <PublicRoutes />
                        {authenticated && <PrivateRoutes />}
                    </Areas.Principal>
                    <Areas.Footer as="footer" flex flexGrow="1">
                        <Footer />
                    </Areas.Footer>
                </>
            )}
        </Composition>
    )
}
