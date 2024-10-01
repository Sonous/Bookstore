import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Pages from './routes';

function App() {
    return (
        <div className="App font-body">
            <Router>
                <Routes>
                    {Pages.map((Page, index) => (
                        <Route key={index} path={Page.path} element={<Page.Component />} />
                    ))}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
