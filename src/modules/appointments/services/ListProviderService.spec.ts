import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersServices from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersServices;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    listProviders = new ListProvidersServices(fakeUserRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Jose',
      email: 'jose@teste.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Maria',
      email: 'maria@teste.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
