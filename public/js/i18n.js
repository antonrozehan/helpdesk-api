// ============================================================
//  i18n - Мультиязычная поддержка
// ============================================================

const translations = {
    ru: {
        'app.title': 'Helpdesk - Система управления IT-заявками',
        'app.subtitle': 'Управляйте IT-инцидентами эффективно',
        
        'nav.home': 'Главная',
        'nav.tickets': 'Заявки',
        'nav.dashboard': 'Дашборд',
        'nav.api': 'API',
        'nav.swagger': 'Swagger',
        
        'home.title': '🎫 Helpdesk',
        'home.subtitle': 'Система управления IT-заявками',
        'home.stats.total': 'Всего заявок',
        'home.stats.open': 'Открытые',
        'home.stats.inProgress': 'В процессе',
        'home.stats.resolved': 'Решенные',
        'home.create.title': '➕ Создать новую заявку',
        'home.create.name': 'Название заявки',
        'home.create.namePlaceholder': 'Введите краткое название проблемы',
        'home.create.description': 'Описание проблемы',
        'home.create.descriptionPlaceholder': 'Подробно опишите проблему...',
        'home.create.category': 'Категория',
        'home.create.priority': 'Приоритет',
        'home.create.submit': '📨 Создать заявку',
        'home.create.creating': '⏳ Создание...',
        'home.create.success': '✅ Заявка успешно создана!',
        'home.create.error': '❌ Ошибка создания заявки',
        'home.recent': '📋 Последние заявки',
        'home.noTickets': '📭 Нет заявок',
        'home.loading': '⏳ Загрузка заявок...',
        'home.refresh': 'Обновить',
        
        'tickets.title': '📋 Все заявки',
        'tickets.subtitle': 'Управление всеми заявками в системе',
        'tickets.total': 'Всего заявок:',
        'tickets.filters.status': 'Фильтр по статусу',
        'tickets.filters.statusAll': 'Все статусы',
        'tickets.filters.priority': 'Фильтр по приоритету',
        'tickets.filters.priorityAll': 'Все приоритеты',
        'tickets.filters.category': 'Фильтр по категории',
        'tickets.filters.categoryAll': 'Все категории',
        'tickets.filters.search': '🔍 Поиск по названию или описанию...',
        'tickets.status.new': '🆕 Новая',
        'tickets.status.inProgress': '🔄 В процессе',
        'tickets.status.resolved': '✅ Решена',
        'tickets.status.closed': '📌 Закрыта',
        'tickets.priority.critical': '🔴 Критичный',
        'tickets.priority.high': '🟠 Высокий',
        'tickets.priority.medium': '🟡 Средний',
        'tickets.priority.low': '🟢 Низкий',
        'tickets.category.hardware': '🖥️ Оборудование',
        'tickets.category.software': '💻 Программное обеспечение',
        'tickets.category.network': '🌐 Сеть',
        'tickets.category.access': '🔑 Доступ',
        'tickets.category.other': '📌 Другое',
        'tickets.actions.startWork': '🚀 В работу',
        'tickets.actions.resolve': '✅ Решить',
        'tickets.actions.close': '📌 Закрыть',
        'tickets.actions.delete': '🗑️ Удалить',
        'tickets.actions.confirmDelete': 'Вы уверены, что хотите удалить заявку "{title}"?',
        'tickets.actions.deleted': '✅ Заявка удалена',
        'tickets.actions.statusUpdated': '✅ Статус обновлен',
        'tickets.empty': '📭 Нет заявок соответствующих фильтрам',
        'tickets.created': 'Создана',
        'tickets.noDescription': 'Описание отсутствует',
        
        'dashboard.title': '📊 Дашборд',
        'dashboard.subtitle': 'Аналитика и статистика по заявкам',
        'dashboard.stats.total': 'Всего',
        'dashboard.stats.open': 'Открытые',
        'dashboard.stats.inProgress': 'В процессе',
        'dashboard.stats.resolved': 'Решенные',
        'dashboard.charts.categories': '📊 Распределение по категориям',
        'dashboard.charts.status': '📈 Распределение по статусам',
        'dashboard.noData': 'Нет данных для отображения',
        
        'api.title': '📚 API Документация',
        'api.subtitle': 'Полная документация всех API эндпоинтов',
        'api.description': 'Здесь представлены все доступные API методы для взаимодействия с системой.',
        'api.endpoints.health': 'Проверка работоспособности сервера',
        'api.endpoints.register': 'Регистрация нового пользователя',
        'api.endpoints.login': 'Вход в систему (получение JWT токена)',
        'api.endpoints.tickets': 'Получение списка всех заявок',
        'api.endpoints.createTicket': 'Создание новой заявки',
        'api.endpoints.updateStatus': 'Изменение статуса заявки',
        'api.endpoints.deleteTicket': 'Удаление заявки по ID',
        'api.endpoints.stats': 'Получение статистики по заявкам',
        'api.endpoints.swagger': 'Swagger документация API',
        
        'common.loading': 'Загрузка...',
        'common.error': 'Произошла ошибка',
        'common.success': 'Успешно',
        'common.save': 'Сохранить',
        'common.cancel': 'Отмена',
        'common.close': 'Закрыть',
        'common.delete': 'Удалить',
        'common.edit': 'Редактировать',
        'common.create': 'Создать',
        'common.update': 'Обновить',
        'common.refresh': 'Обновить',
        'common.search': 'Поиск',
        'common.noResults': 'Ничего не найдено',
        'common.all': 'Все'
    },
    pl: {
        'app.title': 'Helpdesk - System zarządzania zgłoszeniami IT',
        'app.subtitle': 'Zarządzaj incydentami IT efektywnie',
        'nav.home': 'Strona główna',
        'nav.tickets': 'Zgłoszenia',
        'nav.dashboard': 'Dashboard',
        'nav.api': 'API',
        'nav.swagger': 'Swagger',
        'home.title': '🎫 Helpdesk',
        'home.subtitle': 'System zarządzania zgłoszeniami IT',
        'home.stats.total': 'Wszystkich zgłoszeń',
        'home.stats.open': 'Otwarte',
        'home.stats.inProgress': 'W trakcie',
        'home.stats.resolved': 'Rozwiązane',
        'home.create.title': '➕ Utwórz nowe zgłoszenie',
        'home.create.name': 'Nazwa zgłoszenia',
        'home.create.namePlaceholder': 'Wpisz krótki opis problemu',
        'home.create.description': 'Opis problemu',
        'home.create.descriptionPlaceholder': 'Szczegółowo opisz problem...',
        'home.create.category': 'Kategoria',
        'home.create.priority': 'Priorytet',
        'home.create.submit': '📨 Utwórz zgłoszenie',
        'home.create.creating': '⏳ Tworzenie...',
        'home.create.success': '✅ Zgłoszenie utworzone!',
        'home.create.error': '❌ Błąd tworzenia zgłoszenia',
        'home.recent': '📋 Ostatnie zgłoszenia',
        'home.noTickets': '📭 Brak zgłoszeń',
        'home.loading': '⏳ Ładowanie zgłoszeń...',
        'home.refresh': 'Odśwież',
        'tickets.title': '📋 Wszystkie zgłoszenia',
        'tickets.subtitle': 'Zarządzanie wszystkimi zgłoszeniami',
        'tickets.total': 'Wszystkich zgłoszeń:',
        'tickets.filters.status': 'Filtruj po statusie',
        'tickets.filters.statusAll': 'Wszystkie statusy',
        'tickets.filters.priority': 'Filtruj po priorytecie',
        'tickets.filters.priorityAll': 'Wszystkie priorytety',
        'tickets.filters.category': 'Filtruj po kategorii',
        'tickets.filters.categoryAll': 'Wszystkie kategorie',
        'tickets.filters.search': '🔍 Szukaj po tytule lub opisie...',
        'tickets.status.new': '🆕 Nowe',
        'tickets.status.inProgress': '🔄 W trakcie',
        'tickets.status.resolved': '✅ Rozwiązane',
        'tickets.status.closed': '📌 Zamknięte',
        'tickets.priority.critical': '🔴 Krytyczny',
        'tickets.priority.high': '🟠 Wysoki',
        'tickets.priority.medium': '🟡 Średni',
        'tickets.priority.low': '🟢 Niski',
        'tickets.category.hardware': '🖥️ Sprzęt',
        'tickets.category.software': '💻 Oprogramowanie',
        'tickets.category.network': '🌐 Sieć',
        'tickets.category.access': '🔑 Dostęp',
        'tickets.category.other': '📌 Inne',
        'tickets.actions.startWork': '🚀 Do pracy',
        'tickets.actions.resolve': '✅ Rozwiąż',
        'tickets.actions.close': '📌 Zamknij',
        'tickets.actions.delete': '🗑️ Usuń',
        'tickets.actions.confirmDelete': 'Czy na pewno chcesz usunąć zgłoszenie "{title}"?',
        'tickets.actions.deleted': '✅ Zgłoszenie usunięte',
        'tickets.actions.statusUpdated': '✅ Status zaktualizowany',
        'tickets.empty': '📭 Brak zgłoszeń spełniających kryteria',
        'tickets.created': 'Utworzono',
        'tickets.noDescription': 'Brak opisu',
        'dashboard.title': '📊 Dashboard',
        'dashboard.subtitle': 'Analiza i statystyki zgłoszeń',
        'dashboard.stats.total': 'Wszystkich',
        'dashboard.stats.open': 'Otwarte',
        'dashboard.stats.inProgress': 'W trakcie',
        'dashboard.stats.resolved': 'Rozwiązane',
        'dashboard.charts.categories': '📊 Rozkład według kategorii',
        'dashboard.charts.status': '📈 Rozkład według statusów',
        'dashboard.noData': 'Brak danych do wyświetlenia',
        'api.title': '📚 Dokumentacja API',
        'api.subtitle': 'Pełna dokumentacja wszystkich endpointów API',
        'api.description': 'Tutaj znajdziesz wszystkie dostępne metody API do interakcji z systemem.',
        'api.endpoints.health': 'Sprawdzenie stanu serwera',
        'api.endpoints.register': 'Rejestracja nowego użytkownika',
        'api.endpoints.login': 'Logowanie do systemu (otrzymanie tokena JWT)',
        'api.endpoints.tickets': 'Pobranie listy wszystkich zgłoszeń',
        'api.endpoints.createTicket': 'Utworzenie nowego zgłoszenia',
        'api.endpoints.updateStatus': 'Zmiana statusu zgłoszenia',
        'api.endpoints.deleteTicket': 'Usunięcie zgłoszenia po ID',
        'api.endpoints.stats': 'Pobranie statystyk zgłoszeń',
        'api.endpoints.swagger': 'Dokumentacja API Swagger',
        'common.loading': 'Ładowanie...',
        'common.error': 'Wystąpił błąd',
        'common.success': 'Sukces',
        'common.save': 'Zapisz',
        'common.cancel': 'Anuluj',
        'common.close': 'Zamknij',
        'common.delete': 'Usuń',
        'common.edit': 'Edytuj',
        'common.create': 'Utwórz',
        'common.update': 'Aktualizuj',
        'common.refresh': 'Odśwież',
        'common.search': 'Szukaj',
        'common.noResults': 'Nic nie znaleziono',
        'common.all': 'Wszystkie'
    },
    en: {
        'app.title': 'Helpdesk - IT Ticket Management System',
        'app.subtitle': 'Manage IT incidents effectively',
        'nav.home': 'Home',
        'nav.tickets': 'Tickets',
        'nav.dashboard': 'Dashboard',
        'nav.api': 'API',
        'nav.swagger': 'Swagger',
        'home.title': '🎫 Helpdesk',
        'home.subtitle': 'IT Ticket Management System',
        'home.stats.total': 'Total Tickets',
        'home.stats.open': 'Open',
        'home.stats.inProgress': 'In Progress',
        'home.stats.resolved': 'Resolved',
        'home.create.title': '➕ Create New Ticket',
        'home.create.name': 'Ticket Title',
        'home.create.namePlaceholder': 'Enter a brief problem summary',
        'home.create.description': 'Problem Description',
        'home.create.descriptionPlaceholder': 'Describe the problem in detail...',
        'home.create.category': 'Category',
        'home.create.priority': 'Priority',
        'home.create.submit': '📨 Create Ticket',
        'home.create.creating': '⏳ Creating...',
        'home.create.success': '✅ Ticket created successfully!',
        'home.create.error': '❌ Failed to create ticket',
        'home.recent': '📋 Recent Tickets',
        'home.noTickets': '📭 No tickets',
        'home.loading': '⏳ Loading tickets...',
        'home.refresh': 'Refresh',
        'tickets.title': '📋 All Tickets',
        'tickets.subtitle': 'Manage all tickets in the system',
        'tickets.total': 'Total tickets:',
        'tickets.filters.status': 'Filter by Status',
        'tickets.filters.statusAll': 'All Statuses',
        'tickets.filters.priority': 'Filter by Priority',
        'tickets.filters.priorityAll': 'All Priorities',
        'tickets.filters.category': 'Filter by Category',
        'tickets.filters.categoryAll': 'All Categories',
        'tickets.filters.search': '🔍 Search by title or description...',
        'tickets.status.new': '🆕 New',
        'tickets.status.inProgress': '🔄 In Progress',
        'tickets.status.resolved': '✅ Resolved',
        'tickets.status.closed': '📌 Closed',
        'tickets.priority.critical': '🔴 Critical',
        'tickets.priority.high': '🟠 High',
        'tickets.priority.medium': '🟡 Medium',
        'tickets.priority.low': '🟢 Low',
        'tickets.category.hardware': '🖥️ Hardware',
        'tickets.category.software': '💻 Software',
        'tickets.category.network': '🌐 Network',
        'tickets.category.access': '🔑 Access',
        'tickets.category.other': '📌 Other',
        'tickets.actions.startWork': '🚀 Start Work',
        'tickets.actions.resolve': '✅ Resolve',
        'tickets.actions.close': '📌 Close',
        'tickets.actions.delete': '🗑️ Delete',
        'tickets.actions.confirmDelete': 'Are you sure you want to delete ticket "{title}"?',
        'tickets.actions.deleted': '✅ Ticket deleted',
        'tickets.actions.statusUpdated': '✅ Status updated',
        'tickets.empty': '📭 No tickets match the filters',
        'tickets.created': 'Created',
        'tickets.noDescription': 'No description',
        'dashboard.title': '📊 Dashboard',
        'dashboard.subtitle': 'Analytics and ticket statistics',
        'dashboard.stats.total': 'Total',
        'dashboard.stats.open': 'Open',
        'dashboard.stats.inProgress': 'In Progress',
        'dashboard.stats.resolved': 'Resolved',
        'dashboard.charts.categories': '📊 Distribution by Category',
        'dashboard.charts.status': '📈 Distribution by Status',
        'dashboard.noData': 'No data to display',
        'api.title': '📚 API Documentation',
        'api.subtitle': 'Complete documentation of all API endpoints',
        'api.description': 'Here you can find all available API methods to interact with the system.',
        'api.endpoints.health': 'Server health check',
        'api.endpoints.register': 'Register a new user',
        'api.endpoints.login': 'Login to system (get JWT token)',
        'api.endpoints.tickets': 'Get list of all tickets',
        'api.endpoints.createTicket': 'Create a new ticket',
        'api.endpoints.updateStatus': 'Update ticket status',
        'api.endpoints.deleteTicket': 'Delete ticket by ID',
        'api.endpoints.stats': 'Get ticket statistics',
        'api.endpoints.swagger': 'Swagger API documentation',
        'common.loading': 'Loading...',
        'common.error': 'An error occurred',
        'common.success': 'Success',
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.close': 'Close',
        'common.delete': 'Delete',
        'common.edit': 'Edit',
        'common.create': 'Create',
        'common.update': 'Update',
        'common.refresh': 'Refresh',
        'common.search': 'Search',
        'common.noResults': 'No results found',
        'common.all': 'All'
    }
};

// Состояние
let currentLang = 'ru';

// Получить перевод
function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            return key;
        }
    }
    return value || key;
}

// Применить переводы на странице
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const text = t(key);
        if (text && typeof text === 'string') {
            el.textContent = text;
        }
    });
    
    // Обновить placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        const text = t(key);
        if (text) el.placeholder = text;
    });
}

// Сменить язык
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('helpdesk-lang', lang);
    applyTranslations();
    // Перезагрузить данные
    if (window.loadAllData) window.loadAllData();
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    const saved = localStorage.getItem('helpdesk-lang');
    if (saved && translations[saved]) {
        currentLang = saved;
    }
    applyTranslations();
});

// Экспорт для использования в других файлах
window.t = t;
window.setLanguage = setLanguage;
window.currentLang = currentLang;
