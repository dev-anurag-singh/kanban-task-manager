/**
 * Routes that are publicly accessible by anyone.
 * @type {string[]}
 * Example: homepage or landing page.
 */
export const publicRoutes: string[] = ["/", "/email-verification"];

/**
 * Routes for authentication pages.
 * Only accessible by users who are NOT logged in.
 * @type {string[]}
 * Example: login or registration pages.
 */
export const authRoutes: string[] = ["/login", "/signup", "/verify-email"];

/**
 * Prefix for API routes related to authentication.
 * Can be used in middleware or API calls to identify auth endpoints.
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth";

/**
 * Default route to redirect users after successful login.
 * Used in middleware or after sign-in to send users to the main dashboard/homepage.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = "/dashboard";
