// ============================================================
//  APP - Главное приложение
// ============================================================

import { ApiService } from './services/api.js';
import { TicketCard } from './components/TicketCard.js';
import { StatsCards } from './components/StatsCards.js';
import { ApiDocs } from './components/ApiDocs.js';
import { showToast } from './utils/helpers.js';

class App {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    /**
     * Инициализация приложения
     */
    init() {
        this.loadPage('home');
        this.setupNavigation();
        this.setupAutoRefresh();
        console.log('🚀 Helpdesk initialized successfully!');
    }

    /**
     * Настройка навигации
     */
    setupNavigation() {
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.dataset.page;
                this.loadPage(page);
            });
        });
    }

    /**
     * Настройка формы создания заявки
     */
    setupTicketForm() {
        const form = document.getElementById('ticketForm');
        if (form) {
            form.addEventListener('submit', this.handleCreateTicket.bind(this));
        }
    }

    /**
     * Настройка автообновления
     */
    setupAutoRefresh() {
        setInterval(() => {
            if (this.currentPage === 'home') {
                this.loadHomePage();
            }
        }, 5000);
    }

    /**
     * Загрузка страницы
     */
    async loadPage(page) {
        this.currentPage = page;
        
        // Обновляем навигацию
        document.querySelectorAll('[data-page]').forEach(l => l.classList.remove('active'));
        document.querySelector(`[data-page="${page}"]`)?.classList.add('active');
        
        // Рендерим страницу
        const container = document.getElementById('app');
        
        switch(page) {
            case 'home':
                container.innerHTML = this.getHomePageHTML();
                await this.loadHomePage();
                this.setupTicketForm();
                break;
            case 'tickets':
                container.innerHTML = this.getTicketsPageHTML();
                await this.loadTicketsPage();
                break;
            case 'dashboard':
                container.innerHTML = this.getDashboardPageHTML();
                await this.loadDashboardPage();
                break;
            case 'api':
                container.innerHTML = this.getApiPageHTML();
                break;
        }
    }

    /**
     * HTML: Главная страница
     */
    getHomePageHTML() {
        return `
            <div class="row mb-4">
                <div class="col-12 text-center">
                    <h1 class="display-4 fw-bold" style="color:#1a1a2e;">🎫 Helpdesk</h1>
                    <p class="text-muted fs-5">IT Ticket Management System</p>
                    <hr class="w-25 mx-auto" style="border-color:#667eea;opacity:0.3;">
                </div>
            </div>

            <div class="row g-3 mb-4" id="homeStats"></div>

            <div class="row g-4">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-success text-white">
                            <i class="bi bi-plus-circle"></i> Create New Ticket
                        </div>
                        <div class="card-body">
                            <form id="ticketForm">
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Ticket Title</label>
                                    <input type="text" class="form-control" id="title" 
                                           placeholder="Enter brief problem summary" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-semibold">Problem Description</label>
                                    <textarea class="form-control" id="description" rows="3" 
                                              placeholder="Describe the problem in detail..." required></textarea>
                                </div>
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold">Category</label>
                                        <select class="form-select" id="category">
                                            <option value="HARDWARE">🖥️ Hardware</option>
                                            <option value="SOFTWARE">💻 Software</option>
                                            <option value="NETWORK">🌐 Network</option>
                                            <option value="ACCESS">🔑 Access</option>
                                            <option value="OTHER">📌 Other</option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-semibold">Priority</label>
                                        <select class="form-select" id="priority">
                                            <option value="CRITICAL">🔴 Critical</option>
                                            <option value="HIGH">🟠 High</option>
                                            <option value="MEDIUM" selected>🟡 Medium</option>
                                            <option value="LOW">🟢 Low</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-success w-100 mt-3" id="submitBtn">
                                    <i class="bi bi-send"></i> <span id="btnText">Create Ticket</span>
                                </button>
                            </form>
                            <div id="message" class="mt-3"></div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-clock-history"></i> Recent Tickets</span>
                            <button class="btn btn-sm btn-outline-light" onclick="window.App.loadHomePage()">
                                <i class="bi bi-arrow-clockwise"></i> Refresh
                            </button>
                        </div>
                        <div class="card-body" id="recentTickets">
                            <div class="loading"><div class="spinner"></div><div>Loading tickets...</div></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * HTML: Страница заявок
     */
    getTicketsPageHTML() {
        return `
            <div class="row mb-4">
                <div class="col-12">
                    <h1 class="fw-bold" style="color:#1a1a2e;"><i class="bi bi-list-task text-primary"></i> All Tickets</h1>
                    <p class="text-muted">Manage all tickets in the system</p>
                    <hr class="w-25" style="border-color:#667eea;opacity:0.3;">
                </div>
            </div>

            <div class="row g-3 mb-4">
                <div class="col-md-3">
                    <select class="form-select" id="filterStatus" onchange="window.App.loadTicketsPage()">
                        <option value="">All Statuses</option>
                        <option value="NEW">🆕 New</option>
                        <option value="IN_PROGRESS">🔄 In Progress</option>
                        <option value="RESOLVED">✅ Resolved</option>
                        <option value="CLOSED">📌 Closed</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="filterPriority" onchange="window.App.loadTicketsPage()">
                        <option value="">All Priorities</option>
                        <option value="CRITICAL">🔴 Critical</option>
                        <option value="HIGH">🟠 High</option>
                        <option value="MEDIUM">🟡 Medium</option>
                        <option value="LOW">🟢 Low</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <select class="form-select" id="filterCategory" onchange="window.App.loadTicketsPage()">
                        <option value="">All Categories</option>
                        <option value="HARDWARE">🖥️ Hardware</option>
                        <option value="SOFTWARE">💻 Software</option>
                        <option value="NETWORK">🌐 Network</option>
                        <option value="ACCESS">🔑 Access</option>
                        <option value="OTHER">📌 Other</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <input type="text" class="form-control" id="filterSearch" 
                           placeholder="🔍 Search by title or description..." 
                           oninput="window.App.loadTicketsPage()">
                </div>
            </div>

            <div id="allTicketsList">
                <div class="loading"><div class="spinner"></div><div>Loading...</div></div>
            </div>
        `;
    }

    /**
     * HTML: Дашборд
     */
    getDashboardPageHTML() {
        return `
            <div class="row mb-4">
                <div class="col-12">
                    <h1 class="fw-bold" style="color:#1a1a2e;"><i class="bi bi-bar-chart text-primary"></i> Dashboard</h1>
                    <p class="text-muted">Analytics and ticket statistics</p>
                    <hr class="w-25" style="border-color:#667eea;opacity:0.3;">
                </div>
            </div>

            <div class="row g-3 mb-4" id="dashboardStats"></div>

            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-dark text-white">
                            <i class="bi bi-pie-chart"></i> Distribution by Category
                        </div>
                        <div class="card-body" id="categoryStats">
                            <div class="loading"><div class="spinner"></div><div>Loading...</div></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header bg-dark text-white">
                            <i class="bi bi-bar-chart"></i> Distribution by Status
                        </div>
                        <div class="card-body" id="statusStats">
                            <div class="loading"><div class="spinner"></div><div>Loading...</div></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * HTML: API документация
     */
    getApiPageHTML() {
        return `
            <div class="row mb-4">
                <div class="col-12">
                    <h1 class="fw-bold" style="color:#1a1a2e;"><i class="bi bi-file-code text-primary"></i> API Documentation</h1>
                    <p class="text-muted">Complete documentation of all API endpoints</p>
                    <hr class="w-25" style="border-color:#667eea;opacity:0.3;">
                    <p class="text-muted">Here you can find all available API methods to interact with the system.</p>
                </div>
            </div>
            <div id="apiList">${ApiDocs.render()}</div>
        `;
    }

    // ============================================================
    //  ЗАГРУЗКА ДАННЫХ
    // ============================================================

    /**
     * Загрузка главной страницы
     */
    async loadHomePage() {
        await this.loadStats('homeStats');
        await this.loadRecentTickets();
    }

    /**
     * Загрузка страницы заявок
     */
    async loadTicketsPage() {
        await this.loadAllTickets();
    }

    /**
     * Загрузка дашборда
     */
    async loadDashboardPage() {
        await this.loadStats('dashboardStats');
        await this.loadDashboardCharts();
    }

    // ============================================================
    //  API ВЫЗОВЫ
    // ============================================================

    /**
     * Загрузка статистики
     */
    async loadStats(containerId) {
        const data = await ApiService.getStats();
        if (data && data.overview) {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = StatsCards.render(data.overview);
            }
        }
    }

    /**
     * Загрузка последних заявок
     */
    async loadRecentTickets() {
        const tickets = await ApiService.getTickets();
        const container = document.getElementById('recentTickets');
        if (container) {
            if (tickets && tickets.length > 0) {
                const recent = tickets.slice(0, 5);
                container.innerHTML = TicketCard.renderList(recent);
            } else {
                container.innerHTML = `
                    <div class="text-center text-muted py-4">📭 No tickets</div>
                `;
            }
        }
    }

    /**
     * Загрузка всех заявок с фильтрами
     */
    async loadAllTickets() {
        const status = document.getElementById('filterStatus')?.value || '';
        const priority = document.getElementById('filterPriority')?.value || '';
        const category = document.getElementById('filterCategory')?.value || '';
        const search = document.getElementById('filterSearch')?.value.toLowerCase() || '';

        let tickets = await ApiService.getTickets();
        const container = document.getElementById('allTicketsList');
        
        if (!container) return;

        if (tickets) {
            if (status) tickets = tickets.filter(t => t.status === status);
            if (priority) tickets = tickets.filter(t => t.priority === priority);
            if (category) tickets = tickets.filter(t => t.category === category);
            if (search) {
                tickets = tickets.filter(t => 
                    (t.title || '').toLowerCase().includes(search) || 
                    (t.description || '').toLowerCase().includes(search)
                );
            }

            if (tickets.length > 0) {
                container.innerHTML = `
                    <div class="mb-3 text-muted">Total tickets: ${tickets.length}</div>
                    <div class="row">
                        ${tickets.map(t => `
                            <div class="col-md-6 col-lg-4 mb-3">
                                ${TicketCard.render(t, { 
                                    delete: true, 
                                    statusButtons: true, 
                                    deleteButton: true 
                                })}
                            </div>
                        `).join('')}
                    </div>
                `;
            } else {
                container.innerHTML = `
                    <div class="text-center py-5">
                        <i class="bi bi-inbox display-1 text-muted"></i>
                        <h4 class="text-muted mt-3">No tickets match the filters</h4>
                    </div>
                `;
            }
        }
    }

    /**
     * Загрузка графиков дашборда
     */
    async loadDashboardCharts() {
        const tickets = await ApiService.getTickets();
        
        if (!tickets || tickets.length === 0) {
            document.getElementById('categoryStats').innerHTML = 
                '<div class="text-center text-muted py-3">No data to display</div>';
            document.getElementById('statusStats').innerHTML = 
                '<div class="text-center text-muted py-3">No data to display</div>';
            return;
        }

        // По категориям
        const categories = {};
        tickets.forEach(t => {
            categories[t.category] = (categories[t.category] || 0) + 1;
        });
        const catColors = {
            HARDWARE: 'primary',
            SOFTWARE: 'success',
            NETWORK: 'info',
            ACCESS: 'warning',
            OTHER: 'secondary'
        };
        const catNames = {
            HARDWARE: '🖥️ Hardware',
            SOFTWARE: '💻 Software',
            NETWORK: '🌐 Network',
            ACCESS: '🔑 Access',
            OTHER: '📌 Other'
        };
        const total = tickets.length;
        let catHtml = '';
        for (const [key, value] of Object.entries(categories)) {
            const percent = Math.round(value / total * 100);
            catHtml += `
                <div class="mb-3">
                    <div class="d-flex justify-content-between">
                        <span>${catNames[key] || key}</span>
                        <span>${value} (${percent}%)</span>
                    </div>
                    <div class="progress" style="height:8px;border-radius:10px;">
                        <div class="progress-bar bg-${catColors[key] || 'secondary'}" 
                             style="width:${percent}%;border-radius:10px;"></div>
                    </div>
                </div>
            `;
        }
        document.getElementById('categoryStats').innerHTML = catHtml;

        // По статусам
        const statuses = {};
        tickets.forEach(t => {
            statuses[t.status] = (statuses[t.status] || 0) + 1;
        });
        const statusColors = {
            NEW: 'primary',
            IN_PROGRESS: 'warning',
            RESOLVED: 'success',
            CLOSED: 'secondary'
        };
        const statusLabels = {
            NEW: '🆕 New',
            IN_PROGRESS: '🔄 In Progress',
            RESOLVED: '✅ Resolved',
            CLOSED: '📌 Closed'
        };
        let statusHtml = '';
        for (const [key, value] of Object.entries(statuses)) {
            const percent = Math.round(value / total * 100);
            statusHtml += `
                <div class="mb-3">
                    <div class="d-flex justify-content-between">
                        <span>${statusLabels[key] || key}</span>
                        <span>${value} (${percent}%)</span>
                    </div>
                    <div class="progress" style="height:8px;border-radius:10px;">
                        <div class="progress-bar bg-${statusColors[key] || 'secondary'}" 
                             style="width:${percent}%;border-radius:10px;"></div>
                    </div>
                </div>
            `;
        }
        document.getElementById('statusStats').innerHTML = statusHtml;
    }

    // ============================================================
    //  ДЕЙСТВИЯ С ЗАЯВКАМИ
    // ============================================================

    /**
     * Изменение статуса заявки
     */
    async changeStatus(id, status) {
        const result = await ApiService.updateStatus(id, status);
        if (result) {
            showToast('✅ Status updated!', 'success');
            this.refreshCurrentPage();
        }
    }

    /**
     * Удаление заявки
     */
    async deleteTicket(id, title) {
        if (!confirm(`Are you sure you want to delete ticket "${title || 'untitled'}"?`)) return;
        
        const result = await ApiService.deleteTicket(id);
        if (result) {
            showToast('✅ Ticket deleted!', 'success');
            this.refreshCurrentPage();
        }
    }

    /**
     * Создание заявки
     */
    async handleCreateTicket(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim();
        const category = document.getElementById('category').value;
        const priority = document.getElementById('priority').value;
        const btn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const msg = document.getElementById('message');

        if (!title || !description) {
            msg.innerHTML = '<div class="alert alert-warning">⚠️ Please fill in all fields</div>';
            setTimeout(() => msg.innerHTML = '', 3000);
            return;
        }

        btn.disabled = true;
        btnText.textContent = 'Creating...';

        const result = await ApiService.createTicket({ title, description, category, priority });
        
        if (result) {
            msg.innerHTML = '<div class="alert alert-success">✅ Ticket created successfully!</div>';
            document.getElementById('ticketForm').reset();
            this.refreshCurrentPage();
            setTimeout(() => msg.innerHTML = '', 4000);
        }

        btn.disabled = false;
        btnText.textContent = 'Create Ticket';
    }

    /**
     * Обновление текущей страницы
     */
    refreshCurrentPage() {
        switch(this.currentPage) {
            case 'home':
                this.loadHomePage();
                break;
            case 'tickets':
                this.loadTicketsPage();
                break;
            case 'dashboard':
                this.loadDashboardPage();
                break;
        }
    }
}

// ============================================================
//  ИНИЦИАЛИЗАЦИЯ
// ============================================================

// Создаем глобальный экземпляр приложения
window.App = new App();

// Экспортируем методы для использования в HTML onclick
window.App.changeStatus = window.App.changeStatus.bind(window.App);
window.App.deleteTicket = window.App.deleteTicket.bind(window.App);
window.App.loadHomePage = window.App.loadHomePage.bind(window.App);
window.App.loadTicketsPage = window.App.loadTicketsPage.bind(window.App);
window.App.loadDashboardPage = window.App.loadDashboardPage.bind(window.App);
