// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in').forEach(element => {
    observer.observe(element);
});

// Анимация чисел в карточках достижений
function animateNumbers() {
    const numbers = document.querySelectorAll('.achievement-card .number');
    
    numbers.forEach(number => {
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 секунды
        const stepTime = duration / 100;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.textContent = Math.round(current);
                setTimeout(updateNumber, stepTime);
            } else {
                number.textContent = target;
            }
        };
        
        updateNumber();
    });
}

// Запуск анимации чисел при появлении секции
const achievementsSection = document.querySelector('.about-achievements');
if (achievementsSection) {
    const achievementsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                achievementsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    achievementsObserver.observe(achievementsSection);
}

// Анимация кнопок при наведении и клике
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0)';
    });
    
    button.addEventListener('click', () => {
        button.classList.add('clicked');
        setTimeout(() => {
            button.classList.remove('clicked');
        }, 200);
    });
});

// Анимация форм при фокусе
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

// Анимация поисковой строки
const searchBar = document.querySelector('.search-bar');
if (searchBar) {
    searchBar.addEventListener('focus', () => {
        searchBar.classList.add('focused');
    });
    
    searchBar.addEventListener('blur', () => {
        searchBar.classList.remove('focused');
    });
}

// Анимация карточек товаров при наведении
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Анимация социальных иконок
document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.1)';
        link.style.color = '#007bff';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
        link.style.color = '';
    });
});

// Анимация логотипа
const logo = document.querySelector('.logo-img');
if (logo) {
    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'scale(1.05)';
    });
    
    logo.addEventListener('mouseleave', () => {
        logo.style.transform = 'scale(1)';
    });
}

// Анимация навигационных ссылок
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.color = '#007bff';
    });
    
    link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('active')) {
            link.style.color = '';
        }
    });
});

// Анимация иконок в карточках преимуществ
document.querySelectorAll('.advantage-card i, .contact-card i').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2)';
        icon.style.color = '#0056b3';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
        icon.style.color = '';
    });
});

// Функционал модальных окон
document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category');
        const modal = document.getElementById(`${category}Modal`);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

document.querySelectorAll('.modal-close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Закрытие модального окна при клике вне его содержимого
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Функционал переключения темы
const themeSwitch = document.createElement('div');
themeSwitch.className = 'theme-switch';
themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeSwitch);

// Проверяем сохраненную тему
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
}

// Переключение темы
themeSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeSwitch.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Функционал поиска товаров
const searchInput = document.querySelector('.search-bar input');
const productCards = document.querySelectorAll('.product-card');

if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Показываем сообщение, если ничего не найдено
        const visibleCards = document.querySelectorAll('.product-card[style="display: block;"]');
        const noResultsMessage = document.querySelector('.no-results');
        
        if (visibleCards.length === 0) {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results';
                message.textContent = 'Товары не найдены';
                document.querySelector('.product-grid').appendChild(message);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    });
}

// Обработка формы обратной связи
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получаем данные формы
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message')
        };

        // Здесь можно добавить отправку данных на сервер
        // Например, через fetch API:
        /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showNotification('Сообщение успешно отправлено!', 'success');
                contactForm.reset();
            } else {
                showNotification('Произошла ошибка при отправке сообщения.', 'error');
            }
        })
        .catch(error => {
            showNotification('Произошла ошибка при отправке сообщения.', 'error');
        });
        */

        // Временное решение - показываем уведомление об успешной отправке
        showNotification('Сообщение успешно отправлено!', 'success');
        contactForm.reset();
    });
}

// Функция для показа уведомлений
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Анимация появления
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Удаление уведомления через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 