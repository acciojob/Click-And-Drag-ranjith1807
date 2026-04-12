document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const cubes = document.querySelectorAll('.cube');
    
    // Initial Setup: Arrange cubes in a grid format dynamically
    const cubeSize = 60;
    const gap = 15;
    const columns = 4;

    cubes.forEach((cube, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;
        
        cube.style.left = `${col * (cubeSize + gap) + gap}px`;
        cube.style.top = `${row * (cubeSize + gap) + gap}px`;
    });

    // Drag State Variables
    let activeCube = null;
    let startMouseX = 0;
    let startMouseY = 0;
    let initialCubeLeft = 0;
    let initialCubeTop = 0;

    // 1. Selection (Mousedown)
    cubes.forEach(cube => {
        cube.addEventListener('mousedown', (e) => {
            activeCube = cube;
            
            // Record starting mouse positions
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            
            // Record starting cube positions
            initialCubeLeft = activeCube.offsetLeft;
            initialCubeTop = activeCube.offsetTop;
            
            // Bring active cube to the front visually
            cubes.forEach(c => c.style.zIndex = 1);
            activeCube.style.zIndex = 100;
        });
    });

    // 2. Dragging (Mousemove)
    // Attached to document so rapid mouse movements don't break the drag if the cursor slips off the cube
    document.addEventListener('mousemove', (e) => {
        if (!activeCube) return;

        // Calculate how far the mouse has moved
        const deltaX = e.clientX - startMouseX;
        const deltaY = e.clientY - startMouseY;

        // Calculate the proposed new position
        let newLeft = initialCubeLeft + deltaX;
        let newTop = initialCubeTop + deltaY;

        // Constraint Handling: Calculate boundaries
        const maxX = container.clientWidth - activeCube.offsetWidth;
        const maxY = container.clientHeight - activeCube.offsetHeight;

        // Apply boundaries (Prevents moving outside defined area)
        newLeft = Math.max(0, Math.min(newLeft, maxX));
        newTop = Math.max(0, Math.min(newTop, maxY));

        // Update the cube's position visually
        activeCube.style.left = `${newLeft}px`;
        activeCube.style.top = `${newTop}px`;
    });

    // 3. Drop (Mouseup)
    // Attached to document to ensure release registers even if mouse is outside the container
    document.addEventListener('mouseup', () => {
        if (activeCube) {
            activeCube = null; // Clear the active element to stop dragging
        }
    });
});