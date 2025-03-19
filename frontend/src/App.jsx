import { Routes, Route } from 'react-router-dom';
import { Box, useColorMode } from '@chakra-ui/react';
import { Navbar } from './components/Navbar';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Unauthorized from './pages/UnauthorizedPage';
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from './pages/LoginPage';
import { Theme } from './store/colors';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  const { colorMode } = useColorMode();
  return (
    <Box minH={"100vh"} bg={Theme[colorMode].backgroundColor}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/create" element={<CreatePage />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
