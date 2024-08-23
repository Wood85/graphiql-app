# Git Flow

![Screenshot_30](https://github.com/user-attachments/assets/78d10c9b-cd3a-40a1-bfb1-54ed0babe096)

## Repository

1. Ветка `main` содержит только `README.md`.
2. От ветки `main` создается ветка `develop`.
3. В ветки `main` и `develop` нельзя делать `commit` напрямую.
4. Для каждой задачи создается своя ветка от ветки `develop` с названием типа, номера и названия задачи:

   `docs/RSS-GRAPHI-1_09_createPullRequestTemplate`

   `feat/RSS-GRAPHI-1_11_createHeaderComponent`

5. Примеры написания коммитов:

   `docs: RSS-GRAPHI-1_09 Create Pull Request template`

   `feat: RSS-GRAPHI-1_11 Create Header component`

6. После окончания работы над задачей создается `Pull Request`, добавляются `Reviewers` для проверки кода. Выполнить `Squash and merge` ветки задачи с веткой `develop` можно только после `Code Review` двух участников команды. Необходимо регулярно проводить `Code Review`, чтобы не задерживать процесс разработки. После объединения ветки задачи с веткой разработки, ветку с задачей нужно удалить.
7. Пример заголовка `Pull Request`:

   `docs: RSS-GRAPHI-1_09 Create Pull Request template`

   `feat: RSS-GRAPHI-1_11 Create Header component`

8. В конце разработки проекта создается итоговый `Pull Request` из ветки `develop` в ветку `main`. Этот `Pull Request` мержить не надо.
9. Ссылку на итоговый `Pull Request` для проверки ментором должен засабмитить каждый участник команды:
   - Перейти на страницу [Dashboard](https://app.rs.school/course/student/dashboard?course=react-2024-q3)
   - В разделе `Mentor's check` нажать кнопку `Submit Task`.
   - Выбрать таск `React.GraphiGL` и добавить ссылку на PR.
10. Ссылку на `Cross check` сабмитит только лидер команды. Оценки будут выставлены всем членам команды автоматически.

## Deploy

1. Для деплоя приложения используется Netlify.
2. После настройки, деплой происходит автоматически из ветки `develop`.
3. Netlify создает `Deploy Preview` при каждом PR в ветку `develop`. При ревью PR необходимо проверять работоспособность этого `preview`.

## Commit's prefix

`feat`: Новая функция, которую вы добавляете в конкретное приложение

`fix`: Исправление ошибок

`style`: Обновления, связанные со стилизацией

`refactor`: Рефакторинг кода

`test`: Написание тестов

`docs`: Обновление документации

`chore`: Изменения, связанные с настройкой проекта

## Task board

1. В качестве доски с задачами используется `Github projects`.
2. Основные разделы:
   - `Todo`: Все задачи для выполнения
   - `In Progress`: Задачи, которые в данный момент находятся в процессе разработки
   - `On Review`: Завершенные задачи, для которых созданы PR, и которые необходимо проверить остальным участникам команды
   - `To Fix`: Если после review найдены ошибки и требуется дальнейшая доработка
   - `Done`: Выполненные задачи
3. Каждый участник выбирает себе задачу, отмечает себя исполнителем, перемещает в раздел `In Progress` и дальше своевременно перемещает свою задачу по соответствующим колонкам. Это позволяет понимать текущей статус разработки каждой задачи.
4. В случае, если нужно добавить функционал, которого нет в списке задач в `Github Projects`, то:
   - Находим последний номер задачи, например, это `RSS-GRAPHI-1_11: Create the Header component`.
   - Создаем новую задачу в `Github Projects` со следующим по счету номером `RSS-GRAPHI-1_12: Create the Footer component`.
   - Создаем новую ветку от текущей ветки разработки с названием `feat/RSS-GRAPHI-1_12_createFooterComponent`.
   - Добавляем весь функционал.
   - Затем создаем `Pull Request` по аналогии с предыдущими задачами.
   - Дожидаемся ревью и мержим в ветку разработки.