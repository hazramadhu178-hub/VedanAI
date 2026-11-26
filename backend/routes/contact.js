
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const emailUser = process.env.EMAIL_USER?.trim();
const emailPass = process.env.EMAIL_PASS?.replace(/\s+/g, "");
const emailTo = process.env.EMAIL_TO?.trim();

const transporter =
    emailUser && emailPass && emailTo
        ? nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        })
        : null;

// POST /api/contact
router.post("/", async (req, res) => {
    if (!transporter || !emailTo) {
        console.error("Contact email is not configured.");

        return res.status(503).json({
            success: false,
            message: "The contact service is temporarily unavailable.",
        });
    }

    try {
        const {
            name,
            email,
            company,
            phone,
            service,
            message,
            source,
        } = req.body;

        // Required field validation
        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof service !== "string" ||
            typeof message !== "string" ||
            !name.trim() ||
            !email.trim() ||
            !service.trim() ||
            !message.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields.",
            });
        }

        // Optional fields validation
        if (
            (company != null && typeof company !== "string") ||
            (phone != null && typeof phone !== "string")
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid form data.",
            });
        }

        // Length validation
        if (
            name.length > 100 ||
            email.length > 254 ||
            (company?.length ?? 0) > 150 ||
            (phone?.length ?? 0) > 30 ||
            service.length > 100 ||
            message.length > 5000
        ) {
            return res.status(400).json({
                success: false,
                message: "One or more fields are too long.",
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address.",
            });
        }

        // Identify form location
        const formSource =
            source === "Home Page" ? "Home Page" : "Contact Page";

        // Send email
        await transporter.sendMail({
            from: emailUser,
            to: emailTo,
            replyTo: email.trim(),

            subject: `New VedanAI Inquiry - ${service.trim()}`,

            text: `
NEW VEDANAI CONTACT INQUIRY

Source: ${formSource}

Name: ${name.trim()}
Email: ${email.trim()}
Company: ${company?.trim() || "Not provided"}
Phone: ${phone?.trim() || "Not provided"}

Selected Service: ${service.trim()}

Message:
${message.trim()}
            `,
        });

        return res.status(200).json({
            success: true,
            message: "Your inquiry has been sent successfully!",
        });

    } catch (error) {
        console.error("Nodemailer Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to send your inquiry. Please try again.",
        });
    }
});

export default router;