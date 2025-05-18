document.addEventListener('DOMContentLoaded', function() {
    // FAQ аккордеон
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle i');
        
        question.addEventListener('click', () => {
            // Закрываем все другие ответы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-toggle i').classList.remove('fa-minus');
                    otherItem.querySelector('.faq-toggle i').classList.add('fa-plus');
                }
            });
            
            // Открываем или закрываем текущий ответ
            item.classList.toggle('active');
            
            // Меняем иконку
            if (item.classList.contains('active')) {
                toggle.classList.remove('fa-plus');
                toggle.classList.add('fa-minus');
            } else {
                toggle.classList.remove('fa-minus');
                toggle.classList.add('fa-plus');
            }
        });
    });
    
    // Табы для программ обучения
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.program-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Убираем активный класс со всех кнопок и контента
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none'; // Явно скрываем
            });
            
            // Добавляем активный класс текущей кнопке
            button.classList.add('active');
            
            // Показываем соответствующий контент
            const tabId = button.getAttribute('data-tab');
            const activeContent = document.getElementById(`${tabId}-content`);
            activeContent.classList.add('active');
            activeContent.style.display = 'block'; // Явно показываем
        });
    });
    
    // Анимация прокрутки для якорных ссылок
    const anchors = document.querySelectorAll('a[href^="#"]');
    
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Отступ для учета фиксированной шапки
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Слайдер отзывов (простая версия для демонстрации)
    const reviewCards = document.querySelectorAll('.review-card');
    const prevButton = document.querySelector('.review-prev');
    const nextButton = document.querySelector('.review-next');
    let currentReviewIndex = 0;
    
    // Функция для показа конкретного отзыва на мобильных устройствах
    function showReview(index) {
        // Проверяем, находимся ли мы на мобильном устройстве
        if (window.innerWidth <= 768) {
            reviewCards.forEach((card, i) => {
                card.style.display = i === index ? 'block' : 'none';
            });
        }
    }
    
    // Инициализация отображения на мобильных устройствах
    function initReviewDisplay() {
        if (window.innerWidth <= 768) {
            showReview(currentReviewIndex);
        } else {
            reviewCards.forEach(card => {
                card.style.display = 'block';
            });
        }
    }
    
    // Показываем отзывы при загрузке страницы
    initReviewDisplay();
    
    // Обновляем отображение при изменении размера окна
    window.addEventListener('resize', initReviewDisplay);
    
    // Обработчики для кнопок навигации
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            if (currentReviewIndex > 0) {
                currentReviewIndex--;
            } else {
                currentReviewIndex = reviewCards.length - 1;
            }
            showReview(currentReviewIndex);
        });
        
        nextButton.addEventListener('click', () => {
            if (currentReviewIndex < reviewCards.length - 1) {
                currentReviewIndex++;
            } else {
                currentReviewIndex = 0;
            }
            showReview(currentReviewIndex);
        });
    }
    
    // Анимация карточек при прокрутке
    const animatedElements = document.querySelectorAll('.feature-card, .price-card, .review-card');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Добавляем CSS класс для анимации
    const style = document.createElement('style');
    style.textContent = `
        .feature-card.animate, 
        .price-card.animate, 
        .review-card.animate {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            0% {
                opacity: 0;
                transform: translateY(30px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Проверяем видимость элементов при загрузке страницы и прокрутке
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Проверка при загрузке страницы
    
    // Фиксированное меню при прокрутке
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '';
            header.style.background = '';
        }
        
        lastScrollTop = scrollTop;
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Валидация формы
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
                
                if (input.type === 'email' && input.value && !validateEmail(input.value)) {
                    isValid = false;
                    input.style.borderColor = 'red';
                }
                
                if (input.type === 'tel' && input.value && !validatePhone(input.value)) {
                    isValid = false;
                    input.style.borderColor = 'red';
                }
            });
            
            if (isValid) {
                alert('Форма отправлена успешно! Мы свяжемся с вами в ближайшее время.');
                form.reset();
            } else {
                alert('Пожалуйста, заполните все обязательные поля корректно.');
            }
        });
        
        // Сбрасываем индикацию ошибок при вводе
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    });
    
    // Функции валидации
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function validatePhone(phone) {
        const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/;
        return re.test(phone);
    }

    // Мобильное меню-гамбургер
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    const menuLinks = mainMenu ? mainMenu.querySelectorAll('a') : [];
    const menuItems = mainMenu ? mainMenu.querySelectorAll('li') : [];

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mainMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open');
            
            // Анимация меню
            if (mainMenu.classList.contains('open')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
                
                // Сбрасываем стили и добавляем инерционный эффект
                menuItems.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(-70px)';
                });
                
                // Небольшая задержка перед появлением
                setTimeout(() => {
                    menuItems.forEach(item => {
                        item.style.opacity = '';
                        item.style.transform = '';
                    });
                }, 50);
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                
                // Эффект при закрытии
                menuItems.forEach((item, index) => {
                    const delay = index * 50;
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateX(50px)';
                    }, delay);
                });
            }
        });

        // Закрытие меню при клике вне меню
        document.addEventListener('click', function(e) {
            if (mainMenu.classList.contains('open')) {
                if (!mainMenu.contains(e.target) && e.target !== menuToggle && !menuToggle.contains(e.target)) {
                    // Эффект при закрытии
                    menuItems.forEach((item, index) => {
                        const delay = index * 30;
                        setTimeout(() => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateX(30px)';
                        }, delay);
                    });
                    
                    // Небольшая задержка перед закрытием меню
                    setTimeout(() => {
                        mainMenu.classList.remove('open');
                        document.body.classList.remove('menu-open');
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                        
                        // Сброс стилей
                        setTimeout(() => {
                            menuItems.forEach(item => {
                                item.style.opacity = '';
                                item.style.transform = '';
                            });
                        }, 300);
                    }, 150);
                }
            }
        });

        // Закрытие меню при клике на ссылку с эффектом инерции
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Добавляем эффект инерции при клике
                this.parentElement.style.transform = 'translateX(40px)';
                this.parentElement.style.transition = 'transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                
                // Анимация других пунктов меню при закрытии
                const currentItem = this.parentElement;
                menuItems.forEach(item => {
                    if (item !== currentItem) {
                        setTimeout(() => {
                            item.style.opacity = '0';
                            item.style.transform = 'translateX(30px)';
                        }, 100);
                    }
                });
                
                // Закрываем меню с задержкой для эффекта
                setTimeout(() => {
                    mainMenu.classList.remove('open');
                    document.body.classList.remove('menu-open');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    
                    // Сброс стилей
                    setTimeout(() => {
                        menuItems.forEach(item => {
                            item.style.opacity = '';
                            item.style.transform = '';
                            item.style.transition = '';
                        });
                    }, 300);
                }, 300);
            });
        });
    }
}); 