import httpStatus from 'http-status-codes';
import authService from './auth.service.js';
import tokenService from './token.service.js';

const register = async (req, res, next) => {
    try {
        const { user } = await authService.registerSalonOwner(req.body);
        res.status(httpStatus.CREATED).send({
            code: httpStatus.CREATED,
            message: 'Registration successful. Please login to continue.',
            data: {
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUserWithEmailAndPassword(email, password);
        const tokens = await tokenService.generateAuthTokens(user);

        res.send({
            success: true,
            message: 'Login successful',
            data: {
                accessToken: tokens.access.token,
                refreshToken: tokens.refresh.token, // Including refresh token for robustness
                user: {
                    userId: user._id,
                    tenantId: user.tenantId,
                    role: user.role,
                    onboardingStatus: user.onboardingStatus,
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
};
