import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Step1_SalonDetails from './Step1_SalonDetails';
import Step2_OutletSetup from './Step2_OutletSetup';
import Step3_StaffAdd from './Step3_StaffAdd';
import { getOnboardingStatus, completeOnboarding } from '../../api/onboarding';
import './onboarding.css';

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [finalizing, setFinalizing] = useState(false);
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const data = await getOnboardingStatus();
                setStatus(data);

                // Map API steps to frontend steps
                if (data.onboardingStep === 'SALON_CONFIRMED') setStep(2);
                else if (data.onboardingStep === 'OUTLET_CREATED') setStep(3);
                else if (data.onboardingStep === 'STAFF_ADDED') setStep(4); // Final step
            } catch (err) {
                console.error('Failed to fetch onboarding status', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    const handleOnboardingComplete = async () => {
        setFinalizing(true);
        try {
            await completeOnboarding();
            // Update local storage user data
            const user = JSON.parse(localStorage.getItem('user'));
            user.onboardingStatus = 'COMPLETED';
            localStorage.setItem('user', JSON.stringify(user));

            navigate('/admin');
        } catch (err) {
            alert(err.message);
        } finally {
            setFinalizing(false);
        }
    };

    if (loading) {
        return <div className="onboarding-page"><h2 style={{ marginTop: '100px' }}>Loading your setup...</h2></div>;
    }

    return (
        <div className="onboarding-page">
            <div className="onboarding-container">
                <div className="onboarding-header">
                    <img src="/logo/wapixologo1 (1).png" alt="Logo" className="onboarding-logo" />
                    <h1>Let's setup your salon</h1>
                    <p>Complete these steps to start using Wapixo Salon CRM.</p>
                </div>

                <div className="stepper">
                    <div className={`step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                        <div className="step-circle">1</div>
                        <span className="step-label">Salon Details</span>
                    </div>
                    <div className={`step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                        <div className="step-circle">2</div>
                        <span className="step-label">Outlet</span>
                    </div>
                    <div className={`step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
                        <div className="step-circle">3</div>
                        <span className="step-label">Staff</span>
                    </div>
                </div>

                <div className="onboarding-card">
                    {step === 1 && (
                        <Step1_SalonDetails
                            onNext={() => setStep(2)}
                            initialData={status?.salonDetails}
                        />
                    )}
                    {step === 2 && (
                        <Step2_OutletSetup onNext={() => setStep(3)} />
                    )}
                    {step === 3 && (
                        <Step3_StaffAdd onNext={() => setStep(4)} />
                    )}
                    {step === 4 && (
                        <div className="onboarding-success-msg step-content">
                            <i className="fas fa-check-circle"></i>
                            <h2>All Set!</h2>
                            <p>You have successfully configured your salon basics. You can now access your dashboard.</p>
                            <button
                                className="bb-btn bb-btn-gold onboarding-btn"
                                style={{ width: '100%' }}
                                onClick={handleOnboardingComplete}
                                disabled={finalizing}
                            >
                                {finalizing ? 'Finalizing...' : 'Go to Dashboard'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
