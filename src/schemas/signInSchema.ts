import {z} from 'zod'

export const singInSchema = z.object({
    Identifier: z.string(),
    password:z.string()
})