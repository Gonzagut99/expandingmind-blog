import { HashRouter, Routes, Route } from 'react-router-dom';
import Menu from './Menu';
import { AuthProvider, RequireAuth } from './auth';
import HomePage from './HomePage';
import BlogPage from './BlogPage';
import ProfilePage from './ProfilePage';
import BlogPost from './BlogPost';
import LoginPage from './LoginPage';
import LogoutPage from './LogoutPage';
import { blogdata } from './blogData'
import { useState } from 'react';

function App() {
  const blogDataStates = useState(blogdata)
  
  return (
    <HashRouter>
      <AuthProvider>
          <Menu></Menu>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage blogDataStates={blogDataStates}/>}>
              <Route path=":slug" element={<BlogPost blogDataStates={blogDataStates}/>} />
            </Route>
      
            <Route path="/login" element={<LoginPage />} />
            <Route 
              path="/logout" 
              element={
              <RequireAuth>
                <LogoutPage />
              </RequireAuth>} />
            <Route 
              path="/profile" 
              element={
                <RequireAuth>
                  <ProfilePage />
                </RequireAuth>
              } 
            />
            <Route path="*" element={
              <p>
                Not Found
                {/* <NotFound /> */}
              </p>
            } />
          </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
