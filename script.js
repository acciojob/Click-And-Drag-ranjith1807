document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.items');
    const items = document.querySelectorAll('.item');
    
    // Grid Setup
    items.forEach((item, index) => {
        item.style.left = `${(index % 4) * 75 + 15}px`;
        item.style.top = `${Math.floor(index / 4) * 75 + 15}px`;
    });

    let activeItem = null;
    let startX, startY, initialLeft, initialTop;

    // Listen on container to catch events triggered by the test on '.items'
    container.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('item')) {
            activeItem = e.target;
            startX = e.pageX;
            startY = e.pageY;
            initialLeft = parseInt(activeItem.style.left);
            initialTop = parseInt(activeItem.style.top);
            
            items.forEach(i => i.style.zIndex = 1);
            activeItem.style.zIndex = 100;
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (!activeItem) return;

        const dx = e.pageX - startX;
        const dy = e.pageY - startY;

        let newX = initialLeft + dx;
        let newY = initialTop + dy;

        // Boundary Checks
        const maxX = container.clientWidth - activeItem.offsetWidth;
        const maxY = container.clientHeight - activeItem.offsetHeight;

        activeItem.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
        activeItem.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
    });

    document.addEventListener('mouseup', () => {
        activeItem = null;
    });
});