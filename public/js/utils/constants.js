// ============================================================
//  CONSTANTS - Все константы приложения
// ============================================================

export const PRIORITY_COLORS = {
    CRITICAL: 'danger',
    HIGH: 'warning',
    MEDIUM: 'info',
    LOW: 'success'
};

export const STATUS_LABELS = {
    NEW: '🆕 New',
    IN_PROGRESS: '🔄 In Progress',
    RESOLVED: '✅ Resolved',
    CLOSED: '📌 Closed'
};

export const STATUS_COLORS = {
    NEW: 'primary',
    IN_PROGRESS: 'warning',
    RESOLVED: 'success',
    CLOSED: 'secondary'
};

export const CATEGORY_ICONS = {
    HARDWARE: '🖥️',
    SOFTWARE: '💻',
    NETWORK: '🌐',
    ACCESS: '🔑',
    OTHER: '📌'
};

export const API_ENDPOINTS = {
    HEALTH: '/health',
    TICKETS: '/api/tickets',
    STATS: '/api/dashboard/stats',
    AUTH_REGISTER: '/api/auth/register',
    AUTH_LOGIN: '/api/auth/login'
};
