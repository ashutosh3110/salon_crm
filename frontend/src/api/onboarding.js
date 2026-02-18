const API_URL = 'http://localhost:5000/v1';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const getOnboardingStatus = async () => {
    const response = await fetch(`${API_URL}/onboarding/status`, {
        headers: getHeaders(),
    });
    return response.json();
};

export const confirmSalon = async (salonData) => {
    const response = await fetch(`${API_URL}/onboarding/salon-confirm`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(salonData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to confirm salon');
    return data;
};

export const createOutlet = async (outletData) => {
    const response = await fetch(`${API_URL}/onboarding/outlet`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(outletData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create outlet');
    return data;
};

export const addStaff = async (staffData) => {
    const response = await fetch(`${API_URL}/onboarding/staff`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(staffData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to add staff');
    return data;
};

export const completeOnboarding = async () => {
    const response = await fetch(`${API_URL}/onboarding/complete`, {
        method: 'POST',
        headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to finalize onboarding');
    return data;
};
