const container = document.querySelector('// State variables to track dragging
let isDragging = false;
let activeCube = null;
let offsetX = 0;
let offsetY = 0;


container.style.position = 'relative';


const initialPositions = Array.from(cubes).map(cube => {
    const rect = cube.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return {

        left: rect.left - containerRect.left + container.scrollLeft,
        top: rect.top - containerRect.top + container.scrollTop
    };
});

cubes.forEach((cube, index) => {
    cube.style.position = 'absolute';
    cube.style.left = `${initialPositions[index].left}px`;
    cube.style.top = `${initialPositions[index].top}px`;
    cube.style.margin = '0'; // Prevent margin calculation bugs
    cube.style.cursor = 'grab';

      cube.addEventListener('mousedown', (e) => {
        isDragging = true;
        activeCube = cube;
        
         const rect = activeCube.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        
        cubes.forEach(c => c.style.zIndex = '1');
        activeCube.style.zIndex = '100';
        activeCube.style.cursor = 'grabbing';
        
        e.preventDefault();
    });
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging || !activeCube) return;

    const containerRect = container.getBoundingClientRect();
    
    let newX = e.clientX - containerRect.left - offsetX;
    let newY = e.clientY - containerRect.top - offsetY;

    const maxLeft = containerRect.width - activeCube.offsetWidth;
    const maxTop = containerRect.height - activeCube.offsetHeight;

     if (newX < 0) newX = 0;
    if (newY < 0) newY = 0;
    if (newX > maxLeft) newX = maxLeft;
    if (newY > maxTop) newY = maxTop;

    activeCube.style.left = `${newX}px`;
    activeCube.style.top = `${newY}px`;
});

document.addEventListener('mouseup', () => {
    if (isDragging && activeCube) {
        
        isDragging = false;
        activeCube.style.cursor = 'grab';
        activeCube = null;
    }
});