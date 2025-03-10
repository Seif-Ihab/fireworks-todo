let input = document.getElementById("taskInput");
let addBtn = document.getElementById("addBtn");
let tasksContainer = document.getElementById("tasksContainer");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    tasksContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        let taskDiv = document.createElement("div");
        taskDiv.className = "task";

        let taskText = document.createElement("span");
        taskText.textContent = task;
        taskText.classList.add("task-text");

        // === Edit Button ===
        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");
        editBtn.onclick = function () {
            const input = document.createElement("input");
            input.type = "text";
            input.value = task;
            input.classList.add("edit-input");

            const saveBtn = document.createElement("button");
            saveBtn.textContent = "Save";
            saveBtn.classList.add("save-btn");

            saveBtn.onclick = function () {
                if (input.value.trim()) {
                    tasks[index] = input.value.trim();
                    updateLocalStorage();
                    renderTasks();
                }
            };

            taskDiv.innerHTML = "";
            taskDiv.appendChild(input);
            taskDiv.appendChild(saveBtn);
        };

        // === Delete Button ===
        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.classList.add("delete-btn");
        delBtn.onclick = function () {
            tasks.splice(index, 1);
            updateLocalStorage();
            renderTasks();
        };

        // === Buttons Wrapper ===
        const buttonGroup = document.createElement("div");
        buttonGroup.style.display = "flex";
        buttonGroup.style.gap = "5px";
        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(delBtn);

        taskDiv.appendChild(taskText);
        taskDiv.appendChild(buttonGroup);
        tasksContainer.appendChild(taskDiv);
    });
}



function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.onclick = () => {
    if (input.value.trim() !== "") {
        tasks.push(input.value.trim());
        updateLocalStorage();
        renderTasks();
        input.value = "";

        triggerFirework();
    }
};

renderTasks();

// === Add Stars ===
function generateStars(count = 100) {
    const starsContainer = document.createElement("div");
    starsContainer.className = "stars";
    document.body.appendChild(starsContainer);

    for (let i = 0; i < count; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.top = Math.random() * 100 + "vh";
        star.style.left = Math.random() * 100 + "vw";
        star.style.animationDuration = 1 + Math.random() * 3 + "s";
        starsContainer.appendChild(star);
    }
}

generateStars();

// === Fireworks Animation ===
function triggerFirework() {
    const colors = ["#ff4d4d", "#4da6ff", "#ffff4d", "#85e085", "#ff66cc", "#ffa64d"];

    const centerX = Math.random() * window.innerWidth;
    const centerY = Math.random() * window.innerHeight / 2; // upper half for realism

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.className = "firework";
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;

        // Random direction and distance
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 80 + 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        particle.style.transition = "transform 0.8s ease-out, opacity 0.8s";
        document.body.appendChild(particle);

        // Trigger explosion
        requestAnimationFrame(() => {
            particle.style.transform = `translate(${x}px, ${y}px) scale(1.5)`;
            particle.style.opacity = 0;
        });

        // Cleanup
        setTimeout(() => {
            particle.remove();
        }, 900);
    }
}
