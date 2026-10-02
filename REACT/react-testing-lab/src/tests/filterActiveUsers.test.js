import { filterActiveUsers } from '../utils/filterActiveUsers';

describe('filterActiveUsers', () => {
  const users = [
    {
      id: 1,
      name: 'Admin',
      active: true,
    },
    {
      id: 2,
      name: 'User A',
      active: false,
    },
    {
      id: 3,
      name: 'User B',
      active: true,
    },
  ];

  test('solution 1 - toContainEqual', () => {
    const result = filterActiveUsers(users);

    expect(result).toContainEqual({
      id: 1,
      name: 'Admin',
      active: true,
    });
  });

  test('solution 2 - find + toEqual', () => {
    const result = filterActiveUsers(users);

    const admin = result.find((user) => user.name === 'Admin');

    expect(admin).toEqual({
      id: 1,
      name: 'Admin',
      active: true,
    });
  });

  test('handles dynamic lastLoginDate', () => {
    const dynamicUsers = [
      {
        id: 1,
        name: 'Admin',
        active: true,
        lastLoginDate: new Date().toISOString(),
      },
    ];

    const result = filterActiveUsers(dynamicUsers);

    expect(result).toContainEqual(
      expect.objectContaining({
        name: 'Admin',
        active: true,
      }),
    );
  });
});