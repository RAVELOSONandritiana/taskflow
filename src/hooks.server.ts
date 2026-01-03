export const handle = async ({ event, resolve }) => {
    let user_id = event.cookies.get('user_id');
    if (!user_id) {
        user_id = '1';
        event.cookies.set('user_id', user_id, {
            sameSite: 'lax',
            httpOnly: true,
            path: '/',
            secure: false
        });
    }
    event.locals.user = { id: user_id }
    return resolve(event);
}