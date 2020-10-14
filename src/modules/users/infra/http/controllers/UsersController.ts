import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// import UserMap from '../mappers/UserMap';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class UsersController {
  async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();
    const users = await usersRepository.find();

    // const mappedUsers = users.map(user => UserMap.toDTO(user));

    const mappedUsers = users.map(user => classToClass(user));

    return response.json(mappedUsers);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password }: IRequest = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // const mappedUser = UserMap.toDTO(user);

    return response.json(classToClass(user));
  }
}
