import { UserRepository } from './user.repository'

export const UserService = {
    register: async (email: string, password: string) => {
        const existing = await UserRepository.findByEmail(email)
        if (existing) throw new Error('Email already exists')
        return UserRepository.create(email, password) // ยังไม่ hash password
    },

    getUsers: () => {
        return UserRepository.findAll()
    }
}
