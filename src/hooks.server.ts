import { getUserFromRequest } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    // Get user from session cookie
    const user = await getUserFromRequest(event);

    // Set user in locals
    if (user) {
        event.locals.user = user;
    } else {
        event.locals.user = null;
    }

    return resolve(event);
};