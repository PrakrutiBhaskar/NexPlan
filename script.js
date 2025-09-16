(function() {
    const modeToggle = document.getElementById('modeToggle');
    const bodyEl = document.body;
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Load mode from memory (since localStorage isn't available)
    let currentMode = 'light';

    function updateMode() {
      if (currentMode === 'dark') {
        bodyEl.classList.add('dark');
        modeToggle.checked = true;
        modeToggle.setAttribute('aria-checked', 'true');
      } else {
        bodyEl.classList.remove('dark');
        modeToggle.checked = false;
        modeToggle.setAttribute('aria-checked', 'false');
      }
    }

    modeToggle.addEventListener('change', () => {
      if (modeToggle.checked) {
        currentMode = 'dark';
        bodyEl.classList.add('dark');
        modeToggle.setAttribute('aria-checked', 'true');
      } else {
        currentMode = 'light';
        bodyEl.classList.remove('dark');
        modeToggle.setAttribute('aria-checked', 'false');
      }
    });

    // Initialize mode
    updateMode();

    // Adds a task if input is not empty
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === '') return;

      const li = document.createElement('li');

      const label = document.createElement('label');
      label.setAttribute('tabindex', '0'); // make label focusable

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.setAttribute('aria-label', 'Mark task as completed');
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          li.classList.add('completed');
        } else {
          li.classList.remove('completed');
        }
      });

      const span = document.createElement('span');
      span.textContent = taskText;

      label.appendChild(checkbox);
      label.appendChild(span);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✕';
      deleteBtn.className = 'delete-btn';
      deleteBtn.setAttribute('aria-label', 'Delete task');
      deleteBtn.addEventListener('click', () => {
        li.remove();
      });

      li.appendChild(label);
      li.appendChild(deleteBtn);

      taskList.appendChild(li);
      taskInput.value = '';
      taskInput.focus();
    }

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    });
  })();