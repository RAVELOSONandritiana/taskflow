import { successResponse } from '$lib/server/utils';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
    cookies.delete('auth_token', { path: '/' });
    return successResponse(null, 'Logged out successfully');
};
