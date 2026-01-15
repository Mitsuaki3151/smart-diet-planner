import React from 'react';
import { useUser } from '../context/UserContext';
import { Navigate } from 'react-router-dom';
import { OnboardingFlow } from '../features/onboarding/OnboardingFlow';

export const LandingPage: React.FC = () => {
    const { state } = useUser();

    // If user has already completed onboarding, redirect to dashboard
    if (state.hasCompletedOnboarding) {
        return <Navigate to="/" replace />;
    }

    return (
        <OnboardingFlow />
    );
};
