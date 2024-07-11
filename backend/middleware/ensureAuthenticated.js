export async function ensureAuthenticated(req, res, next) {
    console.log("Checking authentication...");
    if(req.isAuthenticated()){
        console.log("Authenticated user:", req.user.username);
        return next()
    }
    console.log("Authentication failed.");
    res.redirect(process.env.CLIENT_BASE_URL+ "/login");
}