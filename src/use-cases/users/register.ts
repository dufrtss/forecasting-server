import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
    name: string
    company: string
    number: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}

    async execute({ name, company, number, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const passwordHash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
        if (userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }
    
        const user = await this.usersRepository.create({
            name,
            company,
            number,
            email,
            password: passwordHash
        })

        return { user }
    }    
}
