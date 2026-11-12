import './style.css'

const themeCheckBox = document.getElementById('theme-checkbox') as HTMLInputElement
const startBtn = document.getElementById('button') as HTMLButtonElement

function setTheme(theme: 'dark' | 'light') {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme')
    if (themeCheckBox) themeCheckBox.checked = true
  } else {
    document.body.classList.remove('dark-theme')
    if (themeCheckBox) themeCheckBox.checked = false
  }
}

const savedTheme = localStorage.getItem('theme')

if (savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-coloroscheme: dark').matches)) {
  setTheme('dark')
} else {
  setTheme('light')
}

themeCheckBox?.addEventListener('change', () => {
  if (themeCheckBox.checked) {
    setTheme('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    setTheme('light')
    localStorage.setItem('theme', 'light')
  }
})
// ==========================================================================
// 1. ДАННЫЕ КВИЗА (ВОПРОСЫ, ТЕГИ И ПЛЕЙЛИСТЫ)
// ==========================================================================

// Интерфейс для варианта ответа
interface Option {
  text: string;
  tags: string[]; // Каждому ответу присваиваем массив тегов
}

// Интерфейс для вопроса
interface Question {
  question: string;
  options: Option[];
}

// Массив с вашими вопросами
const questions: Question[] = [
  {
    question: "Какое у вас сейчас настроение?",
    options: [
      { text: "Хочу сворачивать горы и бегать!", tags: ["energetic", "rock"] },
      { text: "Грустно, хочется побыть в мыслях", tags: ["sad", "indie", "chill"] },
      { text: "Спокойное, рабочее", tags: ["chill", "lofi"] },
      { text: "Танцевальное, тусовочное", tags: ["energetic", "pop"] }
    ]
  },
  {
    question: "Идеальная погода для прогулки — это...",
    options: [
      { text: "Яркое солнце, жара", tags: ["pop", "energetic"] },
      { text: "Пасмурно, мелкий дождь", tags: ["sad", "indie"] },
      { text: "Прохладный вечер, свет фонарей", tags: ["chill", "lofi", "rock"] }
    ]
  },
  {
        question: "Какой напиток вы бы выбрали прямо сейчас?",
    options: [
      { text: "Двойной эспрессо или энергетик", tags: ["energetic", "rock"] },
      { text: "Горячий чай или какао с маршмеллоу", tags: ["chill", "lofi"] },
      { text: "Бокал вина или виски", tags: ["sad", "indie"] },
      { text: "Яркий коктейль или газировка", tags: ["pop", "energetic"] }
    ]
  },
  {
    question: "Представьте идеальный вечер пятницы:",
    options: [
      { text: "Шумный клуб или концерт любимой группы", tags: ["pop", "rock", "energetic"] },
      { text: "В пледе за просмотром сериала или с книгой", tags: ["chill", "lofi"] },
      { text: "Ночная поездка на машине по пустой трассе", tags: ["rock", "indie", "chill"] },
      { text: "Прогулка в одиночестве под неоновыми вывесками", tags: ["sad", "lofi"] }
    ]
  },
  {
    question: "Если бы ваша жизнь была фильмом, то какого жанра?",
    options: [
      { text: "Динамичный боевик или супергероика", tags: ["energetic", "rock"] },
      { text: "Ламповое инди-кино или артхаус", tags: ["indie", "sad"] },
      { text: "Подростковая ромком-комедия", tags: ["pop"] },
      { text: "Эстетичная драма с глубоким смыслом", tags: ["sad", "chill"] }
    ]
  },
  {
    question: "Какой визуал вам ближе всего?",
    options: [
      { text: "Яркий неон, вспышки и диско-шар", tags: ["pop", "energetic"] },
      { text: "Размытые огни ночного города сквозь стекло в каплях дождя", tags: ["sad", "lofi", "chill"] },
      { text: "Старый виниловый проигрыватель и постеры на стенах", tags: ["rock", "indie"] },
      { text: "Минималистичная комната, залитая мягким утренним солнцем", tags: ["chill", "lofi"] }
    ]
  },
  {
    question: "Что вы делаете, когда включаете музыку?",
    options: [
      { text: "Начинаю подпевать во весь голос и танцевать", tags: ["pop", "energetic"] },
      { text: "Ухожу в глубокие размышления и воспоминания", tags: ["sad", "indie"] },
      { text: "Фокусируюсь на делах или просто расслабляюсь", tags: ["chill", "lofi"] },
      { text: "Прибавляю звук на максимум и трясу головой", tags: ["rock", "energetic"] }
    ]
  },
  {
    question: "Какое животное лучше всего описывает ваше состояние сейчас?",
    options: [
      { text: "Гепард, готовый к стремительному рывку", tags: ["energetic"] },
      { text: "Ленивец, засыпающий на ветке", tags: ["chill", "lofi"] },
      { text: "Одинокий волк, смотрящий на луну", tags: ["sad", "rock"] },
      { text: "Домашний кот, который ластится и хочет играть", tags: ["pop", "indie"] }
    ]
  },
  {
    question: "Вы заходите в кофейню. Где вы сядете?",
    options: [
      { text: "У самого окна, чтобы разглядывать прохожих", tags: ["indie", "lofi", "chill"] },
      { text: "В самом дальнем и темном углу, чтобы меня никто не видел", tags: ["sad"] },
      { text: "За барную стойку, чтобы поболтать с бариста", tags: ["pop", "energetic"] },
      { text: "Мне некогда сидеть, беру навынос и бегу дальше!", tags: ["energetic", "rock"] }
    ]
  },
  {
    question: "Ваш идеальный вид транспорта для путешествия:",
    options: [
      { text: "Поезд дальнего следования — стук колес успокаивает", tags: ["chill", "lofi", "sad"] },
      { text: "Спортивный байк или кабриолет — только скорость!", tags: ["energetic", "rock"] },
      { text: "Самолет — повыше к облакам и новому опыту", tags: ["pop"] },
      { text: "Старый фургончик (кемпер) с кучей друзей внутри", tags: ["indie", "chill"] }
    ]
  }
  // Сюда вы можете дописать сколько угодно вопросов по такому же шаблону!
];

// Куда ведут результаты в зависимости от победившего тега
interface PlaylistResult {
  text: string;
  link: string;
}

const results: Record<string, PlaylistResult> = {
  energetic: {
    text: "Вы полны энергии! Вам нужен мощный заряд бодрости.",
    link: "https://music.yandex.ru/playlists/7d3eb7a8-a0ac-0338-2f6d-45b614b8ba4a" // Пример ссылки
  },
  chill: {
    text: "Время замедлиться и поймать расслабленный вайб.",
    link: "https://music.yandex.ru/playlists/d137c3f5-f05a-9b48-b101-aaaab8c837a9"
  },
  sad: {
    text: "Похоже, сейчас время для светлой грусти и красивой меланхолии.",
    link: "https://music.yandex.ru/playlists/a855830b-3fe1-9163-f2d0-ff03c4e372f6"
  },
  // Дефолтный результат, если теги распределились поровну
  default: {
    text: "Ваш вкус уникален! Вот микс под любое настроение.",
    link: "https://music.yandex.ru/playlists/407d0494-d589-84ff-4824-ebb99bec315f"
  }
};

// ==========================================================================
// 2. ПЕРЕМЕННЫЕ СОСТОЯНИЯ И ЭЛЕМЕНТЫ
// ==========================================================================
let currentQuestionIndex = 0;
let userTags: string[] = []; // Сюда будут складываться все выбранные теги

// Экраны
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

// Кнопки и контейнеры
const questionTitle = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const resultText = document.getElementById('result-text');
const resultLink = document.getElementById('result-link') as HTMLAnchorElement | null;

// Переключатель темы (код из прошлого шага, сохраняем его)
// ==========================================================================
// 3. ФУНКЦИИ УПРАВЛЕНИЯ КВИЗОМ
// ==========================================================================

// Функция запуска квиза
function startQuiz() {
  startScreen?.classList.add('hidden'); // Прячем старт
  quizScreen?.classList.remove('hidden'); // Показываем квиз
  currentQuestionIndex = 0;
  userTags = [];
  showQuestion();
}

// Функция отображения текущего вопроса
function showQuestion() {
  if (!questionTitle || !optionsContainer) return;

  // Очищаем старые кнопки вариантов
  optionsContainer.innerHTML = '';

  const currentQuestion = questions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;

  // Создаем кнопки для каждого варианта ответа
  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.classList.add('option-btn');
    button.textContent = option.text;
    
    // При клике на вариант ответа
    button.addEventListener('click', () => handleAnswer(option.tags));
    optionsContainer.appendChild(button);
  });
}

// Функция обработки ответа
function handleAnswer(tags: string[]) {
  // Добавляем теги этого ответа в общий массив пользователя
  userTags.push(...tags);

  currentQuestionIndex++;

  // Если вопросы еще есть — показываем следующий, иначе — финал
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Функция расчета и показа результата
function showResult() {
  quizScreen?.classList.add('hidden');
  resultScreen?.classList.remove('hidden');

  if (!resultText || !resultLink) return;

  // Считаем, какой тег встречается чаще всего
  const tagCounts: Record<string, number> = {};
  let maxCount = 0;
  let winningTag = 'default';

  userTags.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    if (tagCounts[tag] > maxCount) {
      maxCount = tagCounts[tag];
      winningTag = tag;
    }
  });

  // Получаем нужный плейлист по победившему тегу
  const finalResult = results[winningTag] || results['default'];

  // Выводим данные на экран
  resultText.textContent = finalResult.text;
  resultLink.href = finalResult.link;
}

// ==========================================================================
// 4. ИНИЦИАЛИЗАЦИЯ И СОБЫТИЯ
// ==========================================================================

// Слушаем клик на старт
startBtn?.addEventListener('click', startQuiz);


