export const posts = [
  {
    id: 1,
    title: 'Зачем нужен localStorage',
    date: '2026-11-01',
    body: 'localStorage хранит строки по ключу и переживает закрытие браузера. Объекты сохраняем через JSON.stringify, читаем через JSON.parse в try/catch.',
  },
  {
    id: 2,
    title: 'Ленивая инициализация useState',
    date: '2026-11-04',
    body: 'Если передать в useState функцию, она выполнится только при первом рендере. Так данные из localStorage попадают в состояние сразу, и эффект сохранения не затирает их пустым значением.',
  },
  {
    id: 3,
    title: 'Роутинг в SPA',
    date: '2026-11-08',
    body: 'React Router связывает URL с компонентами. Link меняет адрес через History API без перезагрузки, а useParams достаёт параметры из пути.',
  },
];

export function getPostById(id) {
  return posts.find((p) => p.id === Number(id));
}
