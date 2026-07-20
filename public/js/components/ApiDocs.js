// ============================================================
//  API DOCS - Компонент документации API
// ============================================================

export class ApiDocs {
    static getEndpoints() {
        return [
            { method: 'GET', url: '/health', desc: 'Server health check', hasLink: true },
            { method: 'POST', url: '/api/auth/register', desc: 'Register a new user', 
              body: '{ "email": "user@mail.com", "password": "123456", "name": "Name" }' },
            { method: 'POST', url: '/api/auth/login', desc: 'Login to system (get JWT token)',
              body: '{ "email": "user@mail.com", "password": "123456" }' },
            { method: 'GET', url: '/api/tickets', desc: 'Get list of all tickets', hasLink: true },
            { method: 'POST', url: '/api/tickets', desc: 'Create a new ticket',
              body: '{ "title": "Title", "description": "Description", "category": "SOFTWARE", "priority": "HIGH" }' },
            { method: 'PUT', url: '/api/tickets/:id/status', desc: 'Update ticket status',
              body: '{ "status": "IN_PROGRESS" }' },
            { method: 'DELETE', url: '/api/tickets/:id', desc: 'Delete ticket by ID' },
            { method: 'GET', url: '/api/dashboard/stats', desc: 'Get ticket statistics', hasLink: true },
            { method: 'GET', url: '/api-docs', desc: 'Swagger API documentation', hasLink: true }
        ];
    }

    static render() {
        const endpoints = this.getEndpoints();
        let html = '';
        
        endpoints.forEach(e => {
            const methodClass = e.method.toLowerCase();
            const linkHtml = e.hasLink 
                ? `<a href="${e.url}" target="_blank" class="btn btn-sm btn-outline-light">
                     <i class="bi bi-box-arrow-up-right"></i> Open
                   </a>`
                : '';
            
            const bodyHtml = e.body 
                ? `<div class="text-muted small mt-1" style="font-family: 'Segoe UI', sans-serif;">
                     <strong>Body:</strong> ${e.body}
                   </div>`
                : '';

            html += `
                <div class="api-card">
                    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <div>
                            <span class="method method-${methodClass}">${e.method}</span>
                            <span class="url">${e.url}</span>
                        </div>
                        ${linkHtml}
                    </div>
                    <div class="desc">${e.desc}</div>
                    ${bodyHtml}
                </div>
            `;
        });
        
        return html;
    }
}
