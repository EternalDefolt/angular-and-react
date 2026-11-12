export function validateForm({ name, email, password, confirmPassword, age, agree }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Введите имя';
  } else if (name.trim().length < 2) {
    errors.name = 'Минимум 2 символа';
  } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
    errors.name = 'Только буквы и пробелы';
  }

  if (!email.trim()) {
    errors.email = 'Введите email';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Некорректный email';
  }

  if (!password) {
    errors.password = 'Введите пароль';
  } else if (password.length < 6) {
    errors.password = 'Минимум 6 символов';
  } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    errors.password = 'Должен содержать буквы и цифры';
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = 'Пароли не совпадают';
  }

  if (!age) {
    errors.age = 'Введите возраст';
  } else if (Number(age) < 18) {
    errors.age = 'Только с 18 лет';
  } else if (Number(age) > 120) {
    errors.age = 'Слишком большой возраст';
  }

  if (!agree) {
    errors.agree = 'Нужно согласие';
  }

  return errors;
}

export function validateReview({ name, rating, text }) {
  const errors = {};

  if (!name.trim()) {
    errors.name = 'Введите имя';
  } else if (name.trim().length < 2) {
    errors.name = 'Минимум 2 символа';
  }

  if (rating < 1 || rating > 5) {
    errors.rating = 'Поставьте оценку от 1 до 5';
  }

  if (text.trim().length < 10) {
    errors.text = `Минимум 10 символов, сейчас ${text.trim().length}`;
  }

  return errors;
}

export const COUNTRIES = {
  RU: {
    label: 'Россия',
    cityPattern: /^[а-яА-ЯёЁ\s-]+$/,
    cityHint: 'Кириллицей, например «Нижний Новгород»',
    zipPattern: /^\d{6}$/,
    zipHint: '6 цифр, например 603000',
  },
  US: {
    label: 'США',
    cityPattern: /^[a-zA-Z\s.'-]+$/,
    cityHint: 'Латиницей, например «New York»',
    zipPattern: /^\d{5}(-\d{4})?$/,
    zipHint: '5 цифр или 5+4, например 10001 или 10001-1234',
  },
  DE: {
    label: 'Германия',
    cityPattern: /^[a-zA-ZäöüÄÖÜß\s-]+$/,
    cityHint: 'Латиницей, можно умлауты, например «München»',
    zipPattern: /^\d{5}$/,
    zipHint: '5 цифр, например 80331',
  },
  JP: {
    label: 'Япония',
    cityPattern: /^[a-zA-Z\s-]+$/,
    cityHint: 'Латиницей, например «Tokyo»',
    zipPattern: /^\d{3}-\d{4}$/,
    zipHint: 'Формат 123-4567',
  },
};

export function validateLocation({ country, city, zip }) {
  const errors = {};
  const rules = COUNTRIES[country];

  if (!rules) {
    errors.country = 'Выберите страну';
    return errors;
  }

  if (!city.trim()) {
    errors.city = 'Введите город';
  } else if (city.trim().length < 2) {
    errors.city = 'Минимум 2 символа';
  } else if (!rules.cityPattern.test(city.trim())) {
    errors.city = `Для страны «${rules.label}»: ${rules.cityHint}`;
  }

  if (!zip.trim()) {
    errors.zip = 'Введите индекс';
  } else if (!rules.zipPattern.test(zip.trim())) {
    errors.zip = `Неверный индекс: ${rules.zipHint}`;
  }

  return errors;
}

export function validateContact({ name, email, phone, message }) {
  const errors = {};

  if (name.trim().length < 2) {
    errors.name = 'Минимум 2 символа';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Некорректный email';
  }

  if (!/^\+?\d[\d\s()-]{9,}$/.test(phone.trim())) {
    errors.phone = 'Телефон в формате +7 900 000-00-00';
  }

  if (message.trim().length < 5) {
    errors.message = 'Минимум 5 символов';
  }

  return errors;
}

export function validateStep(step, data) {
  const errors = {};

  if (step === 1) {
    if (data.firstName.trim().length < 2) errors.firstName = 'Минимум 2 символа';
    if (data.lastName.trim().length < 2) errors.lastName = 'Минимум 2 символа';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Некорректный email';
  }

  if (step === 2) {
    if (data.city.trim().length < 2) errors.city = 'Введите город';
    if (data.street.trim().length < 3) errors.street = 'Введите улицу';
    if (!data.house.trim()) errors.house = 'Введите номер дома';
    if (!/^\d{6}$/.test(data.zip.trim())) errors.zip = '6 цифр';
  }

  if (step === 3) {
    if (!data.confirm) errors.confirm = 'Подтвердите данные';
  }

  return errors;
}
