// ============================================================
//  API SERVICE - Все запросы к серверу
// ============================================================

import { API_ENDPOINTS } from '../utils/constants.js';
import { showToast } from '../utils/helpers.js';

export class ApiService {
    /**
     * Получение статистики
     */
    static async getStats() {
        try {
            const response = await fetch(API_ENDPOINTS.STATS);
            if (!response.ok) throw new Error('Failed to fetch stats');
            return await response.json();
        } catch (error) {
            console.error('Stats error:', error);
            showToast('Error loading statistics', 'error');
            return null;
        }
    }

    /**
     * Получение всех заявок
     */
    static async getTickets() {
        try {
            const response = await fetch(API_ENDPOINTS.TICKETS);
            if (!response.ok) throw new Error('Failed to fetch tickets');
            return await response.json();
        } catch (error) {
            console.error('Tickets error:', error);
            showToast('Error loading tickets', 'error');
            return null;
        }
    }

    /**
     * Создание заявки
     */
    static async createTicket(data) {
        try {
            const response = await fetch(API_ENDPOINTS.TICKETS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create ticket');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Create ticket error:', error);
            showToast(error.message, 'error');
            return null;
        }
    }

    /**
     * Обновление статуса заявки
     */
    static async updateStatus(id, status) {
        try {
            const response = await fetch(`${API_ENDPOINTS.TICKETS}/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to update status');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Update status error:', error);
            showToast(error.message, 'error');
            return null;
        }
    }

    /**
     * Удаление заявки
     */
    static async deleteTicket(id) {
        try {
            const response = await fetch(`${API_ENDPOINTS.TICKETS}/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to delete ticket');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Delete ticket error:', error);
            showToast(error.message, 'error');
            return null;
        }
    }
}
