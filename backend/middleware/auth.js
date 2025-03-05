import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    // create a new header in the request body 
    const token = req.header("Authorization");
    // set up an error if the token gets denied
    if (!token) return res.status(401).json({ message: "No token exists, authorization denied"});

    // now that we know a token exists, we decode it asynchronously and proceed is the signature and other metadata is valid
    try {
        // .verify decodes and verifies the token's signature
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        // set the use in the req object to the decoded token
        console.log(decodedToken);
        req.user = decodedToken;
        // continue to the next middleware or route once we've verified the token
        next();
    } catch (error) {
        // set the req error status if the token is invalid
        res.status(400).json({message: "Invalid token"});
    }
}

export default authMiddleware;

// middleware is a function that runs between the request and response; it can intercept unauthorized access
// in this case, the next parameter refers to the next middleware function; a way of directing the flow of traffic