// ============================================================
//  STATS CARDS - Компонент карточек статистики
// ============================================================

export class StatsCards {
    /**
     * Рендеринг карточек статистики
     */
    static render(stats) {
        return `
            <div class="col-md-3 col-6">
                <div class="stat-card stat-primary">
                    <div class="stat-icon"><i class="bi bi-inbox"></i></div>
                    <div class="stat-number">${stats.total || 0}</div>
                    <div class="stat-label">Total Tickets</div>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="stat-card stat-warning">
                    <div class="stat-icon"><i class="bi bi-clock-history"></i></div>
                    <div class="stat-number">${stats.open || 0}</div>
                    <div class="stat-label">Open</div>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="stat-card stat-info">
                    <div class="stat-icon"><i class="bi bi-arrow-repeat"></i></div>
                    <div class="stat-number">${stats.inProgress || 0}</div>
                    <div class="stat-label">In Progress</div>
                </div>
            </div>
            <div class="col-md-3 col-6">
                <div class="stat-card stat-success">
                    <div class="stat-icon"><i class="bi bi-check-circle"></i></div>
                    <div class="stat-number">${stats.resolved || 0}</div>
                    <div class="stat-label">Resolved</div>
                </div>
            </div>
        `;
    }
}
