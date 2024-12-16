const adminAuth = (req, res, next) => {
    const token = "xyz";
    const isTrue = token === "xyz1"; // Modify this logic based on your requirements
    if (isTrue) {
        console.log("Admin Authenticated");
        next(); // Call the next middleware or route handler
    } else {
        res.status(401).send("Unauthorized data"); // End the response if not authorized
    }
};

const userAuth = (req, res, next) => {
    const token = "xyz";
    const isTrue = token === "xyz"; // Modify this logic based on your requirements
    if (isTrue) {
        console.log("user Authenticated");
        next(); // Call the next middleware or route handler
    } else {
        res.status(401).send("Unauthorized data"); // End the response if not authorized
    }
};

module.exports = {
    adminAuth,
    userAuth,
};
const url = "mongodb+srv://namasteshivansh:HEU2oE9koUbKSUxM@namastenode.cxr8b.mongodb.net/";
// mongodb+srv://shivanshchaturvedi5:<db_password>@cluster0.vcalv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0