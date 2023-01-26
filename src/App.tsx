import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import Top from './pages/Top';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Top />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
