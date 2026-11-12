import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import About from './pages/About';
import TodoPage from './pages/TodoPage';
import CounterPage from './pages/CounterPage';
import DraftPage from './pages/DraftPage';
import SettingsPage from './pages/SettingsPage';
import UsersList from './pages/UsersList';
import UserProfile from './pages/UserProfile';
import PostsList from './pages/PostsList';
import PostPage from './pages/PostPage';
import AdminPage from './pages/AdminPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/todo" element={<TodoPage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/draft" element={<DraftPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:userId" element={<UserProfile />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
