import { json, type RequestEvent } from '@sveltejs/kit';

// API Response types
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Success response
export function successResponse<T>(data: T, message?: string) {
    return json<ApiResponse<T>>({
        success: true,
        data,
        message
    });
}

// Error response
export function errorResponse(error: string, status: number = 400) {
    return json<ApiResponse>(
        {
            success: false,
            error
        },
        { status }
    );
}

// Parse JSON body
export async function parseBody<T>(event: RequestEvent): Promise<T> {
    try {
        return await event.request.json();
    } catch {
        throw new Error('Invalid JSON body');
    }
}

// Validate required fields
export function validateRequired(data: Record<string, any>, fields: string[]): void {
    const missing = fields.filter(field => !data[field]);

    if (missing.length > 0) {
        throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }
}

// Email validation
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle API errors
export function handleApiError(error: unknown) {
    console.error('API Error:', error);

    if (error instanceof Error) {
        if (error.message === 'Unauthorized') {
            return errorResponse('Unauthorized', 401);
        }
        return errorResponse(error.message);
    }

    return errorResponse('Internal server error', 500);
}
