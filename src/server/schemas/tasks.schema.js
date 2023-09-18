import { z } from "zod";

export let createTaskSchema = z.object({
    title: z.string({ required_error: "Title is required" }).max(150, {
        message: "Title must be less than 150 characters",
    }),
    // description: z.max(500, {
    //     message: "Description must be less than 500 characters",
    // }),
});

export let editTaskSchema = z.object({
    title: z
        .string({
            required_error: "Title is required",
        })
        .max(150, {
            message: "Title must be less than 150 characters",
        }),
    // description: z
    //     .string({ required_error: "Description is required" })
    //     .max(500, {
    //         message: "Description must be less than 500 characters",
    //     }),
});
