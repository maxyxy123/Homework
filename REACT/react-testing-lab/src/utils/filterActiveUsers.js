export function filterActiveUsers(users) {
  return users.filter((user) => user.active);
}