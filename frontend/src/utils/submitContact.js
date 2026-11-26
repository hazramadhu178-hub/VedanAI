
const API_URL = (
    import.meta.env.VITE_API_URL ||
    "https://vedanai-backend.onrender.com"
).replace(/\/$/, "");

export const submitContact = async (formData, source) => {
    const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            ...formData,
            source,
        }),
    });

    const responseBody = await response.text();
    let result = {};

    if (responseBody) {
        try {
            result = JSON.parse(responseBody);
        } catch {
            result = {};
        }
    }

    if (!response.ok) {
        throw new Error(
            result.message ||
            `Unable to send inquiry (server returned ${response.status}).`
        );
    }

    if (!result.success || !result.message) {
        throw new Error("The contact service returned an invalid response.");
    }

    return result;
};
