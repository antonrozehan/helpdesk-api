// ============================================================
//  PAGES - Компоненты страниц
// ============================================================

// Генерация HTML для страниц
const Pages = {
    // ----- HOME PAGE -----
    home: function() {
        return `
            <div class="row mb-4">
                <div class="col-12 text-center">
                    <h1 class="display-4 fw-bold" style="color: #1a1a2e;"><span data-i18n="home.title">🎫 Helpdesk</span></h1>
                    <p class="text-muted fs-5" data-i18n="home.subtitle">Система управления IT-заявками</p>
                    <hr class="w-25 mx-auto" style="border-color: #667eea; opacity: 0.3;">
                </div>
            </div>

            <!-- Stats -->
            <div class="row g-3 mb-4" id="homeStats">
                <div class="col-md-3 col-6">
                    <div class="stat-card stat-primary">
                        <div class="stat-icon"><i class="bi bi-inbox"></i></div>
                        <div class="stat-number" id="totalCount">0</div>
                        <div class="stat-label" data-i18n="home.stats.total">Всего заявок</div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-card stat-warning">
                        <div class="stat-icon"><i class="bi bi-clock-history"></i></div>
                        <div class="stat-number" id="openCount">0</div>
                        <div class="stat-label" data-i18n="home.stats.open">Открытые</div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-card stat-info">
                        <div class="stat-icon"><i class="bi bi-arrow-repeat"></i></div>
                        <div class="stat-number" id="progressCount">0</div>
                        <div class="stat-label" data-i18n="home.stats.inProgress">В процессе</div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-card stat-success">
                        <div class="stat-icon"><i class="bi bi-check-circle"></i></div>
                        <div class="stat-number" id="resolvedCount">0</div>
                        <div class="stat-label" data-i18n="home.stats.resolved">Решенные</div>
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <!-- Create Form -->
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-success text-white">
                            <i class="bi bi-plus-circle"></i> <span data-i18n="home.create.title">Создать новую заявку</span>
                        </div>
                        <div class="card-body">
                            <form id="ticketForm" autocomplete="off">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold" data-i18n="home.create.name">Название заявки</label>
                                    <input type="text" class="form-control" id="title" data-i18n-placeholder="home.create.namePlaceholder" placeholder="Введите краткое название проблемы" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-semibold" data-i18n="home.create.description">Описание проблемы</label>
                                    <textarea class="form-control" id="description" rows="3" data-i18n-placeholder="home.create.descriptionPlaceholder" placeholder="Подробно опишите проблему..." required></textarea>
                                </div>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold" data-i18n="home.create.category">Категория</label>
                                        <select class="form-select" id="category">
                                            <option value="HARDWARE" data-i18n="tickets.category.hardware">🖥️ Оборудование</option>
                                            <option value="SOFTWARE" data-i18n="tickets.category.software">💻 Программное обеспечение</option>
                                            <option value="NETWORK" data-i18n="tickets.category.network">🌐 Сеть</option>
                                            <option value="ACCESS" data-i18n="tickets.category.access">🔑 Доступ</option>
                                            <option value="OTHER" data-i18n="tickets.category.other">📌 Другое</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold" data-i18n="home.create.priority">Приоритет</label>
                                        <select class="form-select" id="priority">
                                            <option value="CRITICAL" data-i18n="tickets.priority.critical">🔴 Критичный</option>
                                            <option value="HIGH" data-i18n="tickets.priority.high">🟠 Высокий</option>
                                            <option value="MEDIUM" selected data-i18n="tickets.priority.medium">🟡 Средний</option>
                                            <option value="LOW" data-i18n="tickets.priority.low">🟢 Низкий</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-success w-100 mt-3" id="submitBtn">
                                    <i class="bi bi-send"></i> <span id="btnText" data-i18n="home.create.submit">Создать заявку</span>
                                </button>
                            </form>
                            <div id="message" class="mt-3"></div>
                        </div>
                    </div>
                </div>

                <!-- Recent Tickets -->
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-clock-history"></i> <span data-i18n="home.recent">Последние заявки</span></span>
                            <button class="btn btn-sm btn-outline-light" onclick="App.loadRecentTickets()">
                                <i class="bi bi-arrow-clockwise"></i> <span data-i18n="home.refresh">Обновить</span>
                            </button>
                        </div>
                        <div class="card-body" id="recentTickets">
                            <div class="loading">
                                <div class="spinner"></div>
                                <div data-i18n="home.loading">Загрузка заявок...</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // ----- TICKETS PAGE -----
    tickets: function() {
        return `
            <div class="row mb-4">
                <div class="col-12">
                    <h1 class="fw-bold" style="color: #1a1a2e;"><i class="bi bi-list-task text-primary"></i> <span data-i18n="tickets.title">Все заявки</span></h1>
                    <p class="text-muted" data-i18n="tickets.subtitle">Управление всеми заявками в системе</p>
                    <hr class="w-25" style="border-color: #667eea; opacity: 0.3;">
                </div>
            </div>

            <!-- Filters -->
            <div class="row g-3 mb-4">
                <div class="col-md-3">
                    <select class="form-select" id="filterStatus" onchange="App.loadAllTickets()">
                        <option value="" data-i18n="tickets.filters.statusAll">Все статусы</option>
                        <option value="NEW" data-i18n="tickets.status.new">🆕 Новая</option>
                        <option value="IN_PROGRESS" data-i18n="tickets.status.inProgress">🔄 В процессе</option>
                        <option value="RESOLVED" data-i18n="tickets.status.resolved">✅ Решена</option>
                        <option value="CLOSED" data-i18n="tickets.status.closed">📌 Закрыта</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="filterPriority" onchange="App.loadAllTickets()">
                        <option value="" data-i18n="tickets.filters.priorityAll">Все приоритеты</option>
                        <option value="CRITICAL" data-i18n="tickets.priority.critical">🔴 Критичный</option>
                        <option value="HIGH" data-i18n="tickets.priority.high">🟠 Высокий</option>
                        <option value="MEDIUM" data-i18n="tickets.priority.medium">🟡 Средний</option>
                        <option value="LOW" data-i18n="tickets.priority.low">🟢 Низкий</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="filterCategory" onchange="App.loadAllTickets()">
                        <option value="" data-i18n="tickets.filters.categoryAll">Все категории</option>
                        <option value="HARDWARE" data-i18n="tickets.category.hardware">🖥️ Оборудование</option>
                        <option value="SOFTWARE" data-i18n="tickets.category.software">💻 Программное обеспечение</option>
                        <option value="NETWORK" data-i18n="tickets.category.network">🌐 Сеть</option>
                        <option value="ACCESS" data-i18n="tickets.category.access">🔑 Доступ</option>
                        <option value="OTHER" data-i18n="tickets.category.other">📌 Другое</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" id="filterSearch" data-i18n-placeholder="tickets.filters.search" placeholder="🔍 Поиск по названию или описанию..." oninput="App.loadAllTickets()">
                </div>
            </div>

            <div id="allTicketsList">
                <div class="loading">
                    <div class="spinner"></div>
                    <div data-i18n="common.loading">Загрузка...</div>
                </div>
            </div>
        `;
    },

    // ----- DASHBOARD PAGE -----
    dashboard: function() {
        return `
            <div class="row mb-4">
                <div class="col-12">
                    <h1 class="fw-bold" style="color: #1a1a2e;"><i class="bi bi-bar-chart text-primary"></i> <span data-i18n="dashboard.title">Дашборд</span></h1>
                    <p class="text-muted" data-i18n="dashboard.subtitle">Аналитика и статистика по заявкам</p>
                    <hr class="w-25" style="border-color: #667eea; opacity: 0.3;">
                </div>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-md-3 col-6">
                    <div class="stat-card stat-primary">
                        <div class="stat-number" id="dashTotal">0</div>
                        <div class="stat-label" data-i18n="dashboard.stats.total">Всего</div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-card stat-warning">
                        <div class="stat-number" id="dashOpen">0</div>
                        <div class="stat-label" data-i18n="dashboard.stats.open">Открытые</div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-card stat-info">
                        <div class="stat-number" id="dashProgress">0</div>
                        <div class="stat-label" data-i18n="dashboard.stats.inProgress">В процессе</div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="stat-card stat-success">
                        <div class="stat-number" id="dashResolved">0</div>
                        <div class="stat-label" data-i18n="dashboard.stats.resolved">Решенные</div>
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-dark text-white">
                            <i class="bi bi-pie-chart"></i> <span data-i18n="dashboard.charts.categories">Распределение по категориям</span>
                        </div>
                        <div class="card-body" id="categoryStats">
                            <div class="loading"><div class="spinner"></div><div data-i18n="common.loading">Загрузка...</div></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-dark text-white">
                            <i class="bi bi-bar-chart"></i> <span data-i18n="dashboard.charts.status">Распределение по статусам</span>
                        </div>
                        <div class="card-body" id="statusStats">
                            <div class="loading"><div class="spinner"></div><div data-i18n="common.loading">Загрузка...</div></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    // ----- API PAGE -----
    api: function() {
        return `
            <div class="row mb-4">
                <div class="col-12">
                    <h1 class="fw-bold" style="color: #1a1a2e;"><i class="bi bi-file-code text-primary"></i> <span data-i18n="api.title">API Документация</span></h1>
                    <p class="text-muted" data-i18n="api.subtitle">Полная документация всех API эндпоинтов</p>
                    <hr class="w-25" style="border-color: #667eea; opacity: 0.3;">
                    <p class="text-muted" data-i18n="api.description">Здесь представлены все доступные API методы для взаимодействия с системой.</p>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    ${this._apiCard('GET', '/health', 'api.endpoints.health')}
                    ${this._apiCard('POST', '/api/auth/register', 'api.endpoints.register', '{ "email": "user@mail.com", "password": "123456", "name": "Имя" }')}
                    ${this._apiCard('POST', '/api/auth/login', 'api.endpoints.login', '{ "email": "user@mail.com", "password": "123456" }')}
                    ${this._apiCard('GET', '/api/tickets', 'api.endpoints.tickets', null, true)}
                    ${this._apiCard('POST', '/api/tickets', 'api.endpoints.createTicket', '{ "title": "Название", "description": "Описание", "category": "SOFTWARE", "priority": "HIGH" }')}
                    ${this._apiCard('PUT', '/api/tickets/:id/status', 'api.endpoints.updateStatus', '{ "status": "IN_PROGRESS" }')}
                    ${this._apiCard('DELETE', '/api/tickets/:id', 'api.endpoints.deleteTicket')}
                    ${this._apiCard('GET', '/api/dashboard/stats', 'api.endpoints.stats', null, true)}
                    ${this._apiCard('GET', '/api-docs', 'api.endpoints.swagger', null, true)}
                </div>
            </div>
        `;
    },

    _apiCard: function(method, url, descKey, body, hasLink) {
        const methodClass = method.toLowerCase();
        const linkHtml = hasLink ? `
            <a href="${url}" target="_blank" class="btn btn-sm btn-outline-light">
                <i class="bi bi-box-arrow-up-right"></i> Открыть
            </a>
        ` : '';
        
        const bodyHtml = body ? `
            <div class="text-muted small mt-1" style="font-family: 'Inter', sans-serif;">
                <strong>Body:</strong> ${body}
            </div>
        ` : '';

        return `
            <div class="api-card">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div>
                        <span class="method method-${methodClass}">${method}</span>
                        <span class="url">${url}</span>
                    </div>
                    ${linkHtml}
                </div>
                <div class="desc" data-i18n="${descKey}">${descKey}</div>
                ${bodyHtml}
            </div>
        `;
    }
};

window.Pages = Pages;
