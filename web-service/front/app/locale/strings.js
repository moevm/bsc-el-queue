export default {
  page: {
    notFound: {
      header: 'Старница не найдена',
    },

    error: {
      header: 'Ошибка',
    },

    main: {
      header: 'Главная',
      studentAuthentication: 'Авторизоваться как студент',
      teacherAuthentication: 'Авторизоваться как преподаватель',
    },

    student: {
      header: 'Студент',
    },

    teacher: {
      header: 'Преподаватель',
      createRoom: 'Создать комнату',
      roomName: 'Название комнаты',
      roomNameError: 'Необходимо назвать комнату',
    },

    room: {
      header: 'Комната',
      userLogin: 'Авторизоваться',
      comeIn: 'Добавиться в очередь',
      leave: 'Покинуть в очередь',
      skip: 'Пропустить вперёд',
      applyStudent: 'Принять текущего',
      rejectStudent: 'Отклонить текущего',
      newQueue: 'Новая очередь',
      queueName: 'Название очередь',
      queueNameError: 'Необходимо ввести название очереди',
    },
  },

  registration: {
    firstName: 'Имя',
    firstNameError: 'Необходимо ввести имя',
    lastName: 'Фамилия',
    lastNameError: 'Необходимо ввести фамилию',
    userId: 'ID',
    userIdError: 'Наобходимо ввести ID',
    goToRegister: 'Зарегистрироваться',
    goToLogin: 'Авторизоваться',
    register: 'Регистрация',
    login: 'Войти',
    password: 'Пароль',
    passwordError: 'Наобходимо ввести пароль',
  },

  logger: {
    studentConnected: '%s присоединился к очереди',
    studentLeave: '%s покинул очередь',
    studentSkip: '%s пропустил вперёд',
    applyStudentWork: '%s принял работу %s',
    rejectStudentWork: '%s отклонил работу %s',
  },

  common: {
    create: 'Создать',
    apply: 'Принять',
    reject: 'Отклонить',
  },
}
