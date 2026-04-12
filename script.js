document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.items');
    const items = document.querySelectorAll('.item');
    
    const size = 60;
    const gap = 15;
    const columns = 4;

    // Grid Initialization
    items.forEach((item, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;
        item.style.left = `${col * (size + gap) + gap}px`;
        item.style.top = `${row * (size + gap) + gap}px`;
    });

    let activeItem = null;
    let offset = { x: 0, y: 0 };

    items.forEach(item => {
        item.addEventListener('mousedown', (e) => {
            activeItem = item;
            
            // Calculate offset so the cube doesn't "jump" its center to the mouse
            const rect = item.getBoundingClientRect();
            offset.x = e.clientX - rect.left;
            offset.y = e.clientY - rect.top;

            items.forEach(i => i.style.zIndex = 1);
            item.style.zIndex = 100;
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (!activeItem) return;

        const containerRect = container.getBoundingClientRect();
        
        // Calculate new position relative to container
        let newX = e.clientX - containerRect.left - offset.x;
        let newY = e.clientY - containerRect.top - offset.y;

        // Boundary Constraints
        const maxX = container.clientWidth - activeItem.offsetWidth;
        const maxY = container.clientHeight - activeItem.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        activeItem.style.left = `${newX}px`;
        activeItem.style.top = `${newY}px`;
    });

    document.addEventListener('mouseup', () => {
        activeItem = null;
    });
});