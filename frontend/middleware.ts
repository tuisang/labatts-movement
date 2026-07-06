import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/activity-library(.*)",
  "/equipment-hire(.*)",
  "/schools(.*)",
  "/parent-portal(.*)",
  "/institution-contract(.*)",
  "/dashboard(.*)",
  "/api/mpesa/callback(.*)",
  "/api/mpesa/shop-callback(.*)",
  "/api/reviews(.*)",
  "/api/chat(.*)",
  "/api/subscribe(.*)",
  "/api/athlete-chat(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
