// Получаем все ссылки на странице
const links = document.querySelectorAll('a[href^="#"]');

// Проходим по каждой ссылке и добавляем обработчик события на клик
links.forEach(link => {
  link.addEventListener('click', function(event) {
    // Отменяем стандартное поведение ссылки
    event.preventDefault();

    // Получаем элемент, на который ссылается ссылка
    const targetElement = document.querySelector(link.getAttribute('href'));

    // Получаем расстояние до верха страницы элемента, на который ссылается ссылка
    const targetPosition = targetElement.offsetTop;

    // Получаем текущее расстояние до верха страницы
    const currentPosition = window.pageYOffset;

    // Разница между текущим расстоянием и расстоянием до элемента
    const distance = targetPosition - currentPosition;

    // Время, которое будет затрачено на анимацию
    const duration = 1000;

    // Текущее время анимации
    let start = null;

    // Функция, которая будет вызываться каждый раз при отрисовке кадра анимации
    function step(timestamp) {
      // Если время начала анимации не задано, задаем его
      if (!start) {
        start = timestamp;
      }

      // Рассчитываем процент времени анимации, прошедшего с начала
      const progress = timestamp - start;

      // Рассчитываем новую позицию страницы
      const newPosition = currentPosition + (distance * progress) / duration;

      // Плавно прокручиваем страницу
      window.scrollTo(0, newPosition);

      // Если время анимации не истекло, продолжаем анимацию
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    }

    // Запускаем анимацию
    window.requestAnimationFrame(step);
  });
});