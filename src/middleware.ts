import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Match specific routes
const isHomeRoute = createRouteMatcher(["/"]);
const isDashboardRoute = createRouteMatcher(["/dashboard", "/dashboard(.*)"]);
// No need to create a route matcher for about page since it's public

export default clerkMiddleware((auth, req) => {
    const { userId } = auth();

    // Redirect authenticated users from home ("/") to the dashboard ("/dashboard")
    if (userId && isHomeRoute(req)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Redirect unauthenticated users trying to access the dashboard
    if (!userId && isDashboardRoute(req)) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // Allow all other routes (like /about) to proceed
    return NextResponse.next();
});

// Middleware matcher
export const config = {
    matcher: [
        "/",              
        "/dashboard",     
        "/dashboard/:path*",
        "/about",        
        "/features",
        "/pricing",
        "/home",
        "/devices",
        "/helpcenter",
        "/trimixai",
        "/privacypolicy",
        "/termsconditions"
    ],
};
