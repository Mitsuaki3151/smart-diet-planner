import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './context/UserContext';
import { MealProvider } from './context/MealContext';
import { Layout } from './components/layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { WeightPage } from './pages/WeightPage';
import { MealPlanPage } from './pages/MealPlanPage';
import { DayDetailPage } from './pages/DayDetailPage';
import { ShoppingListPage } from './pages/ShoppingListPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useUser();
  if (!state.hasCompletedOnboarding) {
    return <Navigate to="/welcome" replace />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/welcome" element={<LandingPage />} />

      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route index element={<HomePage />} />
        <Route path="weight" element={<WeightPage />} />
        <Route path="plan" element={<MealPlanPage />} />
        <Route path="plan/:dayIndex" element={<DayDetailPage />} />
        <Route path="shop" element={<ShoppingListPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <MealProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </MealProvider>
    </UserProvider>
  );
}

export default App;
