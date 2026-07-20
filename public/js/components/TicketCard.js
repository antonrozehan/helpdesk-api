// ============================================================
//  TICKET CARD - Компонент карточки заявки
// ============================================================

import { 
    PRIORITY_COLORS, 
    STATUS_LABELS, 
    STATUS_COLORS, 
    CATEGORY_ICONS 
} from '../utils/constants.js';

import { formatDate } from '../utils/helpers.js';

export class TicketCard {
    /**
     * Рендеринг карточки заявки
     */
    static render(ticket, actions = {}) {
        const priorityColor = PRIORITY_COLORS[ticket.priority] || 'secondary';
        const statusColor = STATUS_COLORS[ticket.status] || 'secondary';
        const statusLabel = STATUS_LABELS[ticket.status] || ticket.status;
        const categoryIcon = CATEGORY_ICONS[ticket.category] || '📌';

        return `
            <div class="ticket-card">
                <div class="d-flex justify-content-between align-items-start">
                    <div style="flex:1; min-width:0;">
                        <div class="ticket-title">${ticket.title || 'Untitled'}</div>
                        <div class="ticket-meta">
                            ${categoryIcon} ${ticket.category || 'OTHER'} • 
                            ${formatDate(ticket.created_at)}
                        </div>
                    </div>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                        <span class="status-badge bg-${statusColor} text-white">
                            ${statusLabel}
                        </span>
                        <span class="badge-priority bg-${priorityColor} text-white">
                            ${ticket.priority || 'LOW'}
                        </span>
                        ${actions.delete ? `
                            <span class="text-danger" 
                                  onclick="window.App.deleteTicket('${ticket.id}','${ticket.title}')" 
                                  style="cursor:pointer;font-size:1.2rem;">
                                <i class="bi bi-x-circle"></i>
                            </span>
                        ` : ''}
                    </div>
                </div>
                
                <div class="ticket-meta mt-1">
                    ${(ticket.description || '').substring(0, 80)}${(ticket.description || '').length > 80 ? '...' : ''}
                </div>
                
                ${actions.statusButtons ? `
                    <div class="mt-2 d-flex flex-wrap gap-1">
                        ${ticket.status === 'NEW' ? `
                            <button class="btn btn-warning btn-sm" 
                                    onclick="window.App.changeStatus('${ticket.id}','IN_PROGRESS')">
                                <i class="bi bi-play-circle"></i> Start Work
                            </button>
                        ` : ''}
                        ${ticket.status === 'IN_PROGRESS' ? `
                            <button class="btn btn-success btn-sm" 
                                    onclick="window.App.changeStatus('${ticket.id}','RESOLVED')">
                                <i class="bi bi-check-circle"></i> Resolve
                            </button>
                        ` : ''}
                        ${ticket.status === 'RESOLVED' ? `
                            <button class="btn btn-secondary btn-sm" 
                                    onclick="window.App.changeStatus('${ticket.id}','CLOSED')">
                                <i class="bi bi-check2-circle"></i> Close
                            </button>
                        ` : ''}
                    </div>
                ` : ''}
                
                ${actions.deleteButton ? `
                    <div class="mt-2">
                        <button class="btn btn-danger btn-sm" 
                                onclick="window.App.deleteTicket('${ticket.id}','${ticket.title}')">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    /**
     * Рендеринг списка заявок
     */
    static renderList(tickets, options = {}) {
        if (!tickets || tickets.length === 0) {
            return `
                <div class="text-center py-5">
                    <i class="bi bi-inbox display-1 text-muted"></i>
                    <h4 class="text-muted mt-3">No tickets found</h4>
                </div>
            `;
        }

        const defaultActions = {
            delete: true,
            statusButtons: true,
            deleteButton: false
        };

        const actions = { ...defaultActions, ...options };

        let html = '';
        tickets.forEach(ticket => {
            html += this.render(ticket, actions);
        });
        return html;
    }
}
