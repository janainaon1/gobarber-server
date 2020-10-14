import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';
// import UserMap from '@modules/users/infra/http/mappers/UserMap';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id,
    });

    // const mappedProviders = providers.map(user => UserMap.toDTO(user));
    const mappedProviders = providers.map(user => classToClass(user));

    return response.json(mappedProviders);
  }
}
