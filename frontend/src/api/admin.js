const API_URL = 'http://localhost:5000/v1';

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };
};

export const getOutlets = async () => {
    const response = await fetch(`${API_URL}/outlets`, {
        headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch outlets');
    return data;
};

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`, {
        headers: getHeaders(),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to fetch users');
    return data;
};

export const createOutlet = async (outletData) => {
    const response = await fetch(`${API_URL}/outlets`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(outletData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to create outlet');
    return data;
};

export const updateOutlet = async (id, outletData) => {
    const response = await fetch(`${API_URL}/outlets/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify(outletData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to update outlet');
    return data;
};

