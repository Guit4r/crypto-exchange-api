import { Request, Response } from 'express'
import { UserService } from './user.service'

export const UserController = {
    register: async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const user = await UserService.register(email, password)
            res.status(201).json(user)
        } catch (err: any) {
            res.status(400).json({ error: err.message })
        }
    },

    getAll: async (_req: Request, res: Response) => {
        const users = await UserService.getUsers()
        res.json(users)
    }
}
