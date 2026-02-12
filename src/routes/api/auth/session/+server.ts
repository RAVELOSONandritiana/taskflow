import { successResponse, errorResponse } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
    if (!locals.user) {
        return errorResponse('Not authenticated', 401);
    }

    // Remove sensitive data
    const { password, ...userWithoutPassword } = locals.user;

    return successResponse({ user: userWithoutPassword });
};
