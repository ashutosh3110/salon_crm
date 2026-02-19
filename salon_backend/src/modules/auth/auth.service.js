import mongoose from 'mongoose';
import userService from '../user/user.service.js';
import tokenService from './token.service.js';
import User from '../user/user.model.js';
import Tenant from '../tenant/tenant.model.js';

const registerSalonOwner = async (registrationData) => {
    const { salonName, fullName, email, phone, password, subscriptionPlan = 'free' } = registrationData;

    // Check if user already exists
    if (await User.isEmailTaken(email)) {
        throw new Error('Email already taken');
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 1. Create Tenant
        const slug = salonName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
        const tenant = new Tenant({
            name: salonName,
            slug,
            subscriptionPlan
        });
        await tenant.save({ session });

        // 2. Create Admin User linked to Tenant
        const user = new User({
            name: fullName,
            email,
            password,
            phone,
            role: 'admin',
            tenantId: tenant._id,
            onboardingStatus: 'NOT_STARTED',
        });
        await user.save({ session });

        // 3. Link Owner back to Tenant
        tenant.owner = user._id;
        await tenant.save({ session });

        await session.commitTransaction();
        return { user, tenant };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new Error('Incorrect email or password');
    }
    return user;
};

export default {
    registerSalonOwner,
    loginUserWithEmailAndPassword,
};
