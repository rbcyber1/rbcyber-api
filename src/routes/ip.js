import express from "express";

const router = express.Router();

const getAddressByType = async (type) => {
    const responseV4 = await fetch("https://api.ipify.org");
    if (type === "v4") {
        return responseV4.text();
    } else if (type === "v6") {
        const responseV6 = await fetch("https://api64.ipify.org?format=text");
        if (responseV4.text !== responseV6.text) {
            return responseV6.text();
        }

        return; // Return undefined if the IPv4 and IPv6 addresses are the same, which likely indicates that the client does not have a valid IPv6 address.
    }
};

router.get("/", async (request, response) => {
    const type = request.query.type;

    if (type !== "v4" && type !== "v6") {
        return response
            .status(400)
            .type("text/plain")
            .send("Invalid type parameter. Use 'ipv4' or 'ipv6'.");
    }

    try {
        const address = await getAddressByType(type);
        if (address) {
            response.type("text/plain").send(address);
        } else {
            response
                .status(404)
                .type("text/plain")
                .send(`No IP${type} address found for the client.`);
        }
    } catch (error) {
        console.error("Error fetching IP address:", error);
        response
            .status(500)
            .type("text/plain")
            .send("An error occurred while fetching the IP address.");
    }
});

export default router;
