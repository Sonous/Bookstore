import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Pages from './routes';
import NotFound from './pages/NotFound';
import { UserContextProvider } from './context/UserContextProvider';

function App() {
    return (
        <UserContextProvider>
            <div className="App font-body">
                <Router>
                    <Routes>
                        {Pages.map((Page, index) => (
                            <Route
                                key={index}
                                path={Page.path}
                                element={
                                    Page.PrivateRoute ? (
                                        <Page.PrivateRoute>
                                            <Page.Component />
                                        </Page.PrivateRoute>
                                    ) : (
                                        <Page.Component />
                                    )
                                }
                            />
                        ))}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Router>
            </div>
        </UserContextProvider>
    );
}

export default App;
