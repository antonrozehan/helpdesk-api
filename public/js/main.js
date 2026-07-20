// Автообновление статистики
console.log('🚀 Helpdesk API Frontend loaded');

// Глобальная функция для форматирования даты
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Глобальная функция для статуса
function getStatusLabel(status) {
    const map = {
        'NEW': 'Новая',
        'IN_PROGRESS': 'В работе',
        'ON_REVIEW': 'На проверке',
        'RESOLVED': 'Решена',
        'CLOSED': 'Закрыта'
    };
    return map[status] || status;
}

// Глобальная функция для приоритета
function getPriorityLabel(priority) {
    const map = {
        'CRITICAL': 'Критичный',
        'HIGH': 'Высокий',
        'MEDIUM': 'Средний',
        'LOW': 'Низкий'
    };
    return map[priority] || priority;
}

console.log('✅ Ready!');
