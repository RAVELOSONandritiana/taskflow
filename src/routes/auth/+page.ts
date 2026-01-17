// since there's no dynamic data here, we can prerender
export const prerender = true;
import { redirect } from "@sveltejs/kit";

// it so that it gets served as a static asset in production

throw redirect(301, '/auth/login')