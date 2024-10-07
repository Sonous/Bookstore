import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Pages from './routes';
import NotFound from './pages/NotFound';

function App() {
    return (
        <div className="App font-body">
            <Router>
                <Routes>
                    {Pages.map((Page, index) => (
                        <Route key={index} path={Page.path} element={<Page.Component />} />
                    ))}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
