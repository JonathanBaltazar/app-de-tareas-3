import { z } from "zod";

export let registerSchema = z.object({
    username: z
        .string({
            required_error: "Username is required",
        })
        .min(1),
    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Email is invalid",
        }),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(6, {
            message: "Password must be at least 6 characters ",
        }),
});

export let usernameAuthSchema = z.object({
    username: z.string({
        required_error: "Username is required",
    }),
    password: z.string({
        required_error: "Password is required",
    }),
});

export let emailAuthSchema = z.object({
    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Email is invalid",
        }),
    password: z.string({
        required_error: "Password is required",
    }),
});
