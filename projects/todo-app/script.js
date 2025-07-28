class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.renderTodos();
        this.updateStats();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Add todo on Enter key
        document.getElementById('todoInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.renderTodos();
            });
        });
    }

    addTodo() {
        const input = document.getElementById('todoInput');
        const text = input.value.trim();

        if (text === '') {
            this.showNotification('Please enter a task!', 'error');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString()
        };

        this.todos.unshift(todo);
        this.saveTodos();
        this.renderTodos();
        this.updateStats();
        input.value = '';
        
        this.showNotification('Task added successfully!', 'success');
    }

    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            this.showNotification('Task deleted!', 'success');
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
        }
    }

    editTodo(id, newText) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo && newText.trim() !== '') {
            todo.text = newText.trim();
            this.saveTodos();
            this.renderTodos();
            this.showNotification('Task updated!', 'success');
        }
    }

    clearCompleted() {
        const completedCount = this.todos.filter(todo => todo.completed).length;
        if (completedCount === 0) {
            this.showNotification('No completed tasks to clear!', 'error');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            this.showNotification('Completed tasks cleared!', 'success');
        }
    }

    clearAll() {
        if (this.todos.length === 0) {
            this.showNotification('No tasks to clear!', 'error');
            return;
        }

        if (confirm('Delete all tasks? This cannot be undone!')) {
            this.todos = [];
            this.saveTodos();
            this.renderTodos();
            this.updateStats();
            this.showNotification('All tasks cleared!', 'success');
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    renderTodos() {
        const todoList = document.getElementById('todoList');
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            todoList.innerHTML = `
                <div class="empty-state">
                    ${this.currentFilter === 'all' ? 'No tasks yet. Add one above!' : 
                      this.currentFilter === 'active' ? 'No active tasks!' : 'No completed tasks!'}
                </div>
            `;
            return;
        }

        todoList.innerHTML = filteredTodos.map(todo => `
            <li class="todo-item ${todo.completed ? 'completed' : ''}" data-id="${todo.id}">
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                       onchange="todoApp.toggleTodo(${todo.id})">
                <span class="todo-text" ondblclick="todoApp.startEdit(${todo.id})">${todo.text}</span>
                <div class="todo-actions">
                    <button class="edit-btn" onclick="todoApp.startEdit(${todo.id})">✏️</button>
                    <button class="delete-btn" onclick="todoApp.deleteTodo(${todo.id})">🗑️</button>
                </div>
            </li>
        `).join('');
    }

    startEdit(id) {
        const todoItem = document.querySelector(`[data-id="${id}"]`);
        const todoText = todoItem.querySelector('.todo-text');
        const currentText = todoText.textContent;

        todoText.innerHTML = `
            <input type="text" class="edit-input" value="${currentText}" 
                   onblur="todoApp.finishEdit(${id}, this.value)"
                   onkeypress="if(event.key==='Enter') todoApp.finishEdit(${id}, this.value)">
        `;
        
        const input = todoText.querySelector('.edit-input');
        input.focus();
        input.select();
    }

    finishEdit(id, newText) {
        if (newText.trim() !== '') {
            this.editTodo(id, newText);
        } else {
            this.renderTodos();
        }
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(todo => todo.completed).length;
        
        document.getElementById('totalTasks').textContent = `${total} task${total !== 1 ? 's' : ''}`;
        document.getElementById('completedTasks').textContent = `${completed} completed`;
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: ${type === 'success' ? '#00b894' : '#e17055'};
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the app
const todoApp = new TodoApp();

// Global functions for HTML onclick events
function addTodo() {
    todoApp.addTodo();
}

function clearCompleted() {
    todoApp.clearCompleted();
}

function clearAll() {
    todoApp.clearAll();
}