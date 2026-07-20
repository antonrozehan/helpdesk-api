// ============================================================
//  HELPERS - Вспомогательные функции
// ============================================================

/**
 * Форматирование даты
 */
export function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        return new Date(dateStr).toLocaleString();
    } catch {
        return dateStr;
    }
}

/**
 * Показ уведомления (toast)
 */
export function showToast(message, type = 'info') {
    const colors = {
        success: 'toast-success',
        error: 'toast-error',
        info: 'toast-info'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast-custom ${colors[type] || colors.info}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

/**
 * Получение цвета приоритета
 */
export function getPriorityColor(priority) {
    const colors = {
        CRITICAL: 'danger',
        HIGH: 'warning',
        MEDIUM: 'info',
        LOW: 'success'
    };
    return colors[priority] || 'secondary';
}

/**
 * Получение цвета статуса
 */
export function getStatusColor(status) {
    const colors = {
        NEW: 'primary',
        IN_PROGRESS: 'warning',
        RESOLVED: 'success',
        CLOSED: 'secondary'
    };
    return colors[status] || 'secondary';
}
