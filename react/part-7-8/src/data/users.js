export const users = [
  { id: 1, name: 'Анна', email: 'anna@mail.ru', city: 'Москва' },
  { id: 2, name: 'Пётр', email: 'petr@mail.ru', city: 'СПб' },
  { id: 3, name: 'Мария', email: 'maria@mail.ru', city: 'Казань' },
  { id: 4, name: 'Илья', email: 'ilya@mail.ru', city: 'Москва' },
  { id: 5, name: 'Ольга', email: 'olga@mail.ru', city: 'СПб' },
];

export function getUserById(id) {
  return users.find((u) => u.id === Number(id));
}

export const cities = [...new Set(users.map((u) => u.city))];
