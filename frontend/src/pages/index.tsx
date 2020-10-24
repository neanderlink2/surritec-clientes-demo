import { Composition } from 'atomic-layout';
import React from 'react';
import { Container } from 'semantic-ui-react';
import Header from '../components/Header';
import PrivateRoutes from '../routes/index.private';

const areas = `
  header
  principal  
`

const areasMobile = `
  header 
  principal  
`

export default function Pages() {
    return (
        <Composition areas={areasMobile}
            areasMd={areas}
            height="100vh"
            width="100vw"
            templateCols="1fr"
            templateRows="75px 1fr"
        >
            {(Areas) => (
                <>
                    <Areas.Header as="header" flex flexGrow="1" width="100%">
                        <Header />
                    </Areas.Header>
                    <Areas.Principal as="main" flex flexGrow="1">
                        <Container>
                            <PrivateRoutes />
                        </Container>
                    </Areas.Principal>
                </>
            )}
        </Composition>
    )
}
