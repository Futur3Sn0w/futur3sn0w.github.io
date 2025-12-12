// Lava Lamp Orb Background Animation
// Creates floating, morphing gradient orbs across all pages

// Helper function to generate random position
function randomPosition() {
    const side = Math.random() > 0.5 ? 'vertical' : 'horizontal';
    const value = Math.floor(Math.random() * 80) + 5; // 5% to 85%

    if (side === 'vertical') {
        return Math.random() > 0.5
            ? { top: `${value}%` }
            : { bottom: `${value}%` };
    } else {
        return Math.random() > 0.5
            ? { left: `${value}%` }
            : { right: `${value}%` };
    }
}

// Generate random positions for each orb
function generateOrbPositions() {
    return [
        {
            width: 600,
            height: 600,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            ...randomPosition(),
            ...randomPosition(),
            animationDuration: '25s',
            morphDuration: '18s'
        },
        {
            width: 550,
            height: 550,
            gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            ...randomPosition(),
            ...randomPosition(),
            animationDuration: '30s',
            morphDuration: '22s'
        },
        {
            width: 650,
            height: 650,
            gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            ...randomPosition(),
            ...randomPosition(),
            animationDuration: '35s',
            morphDuration: '25s'
        },
        {
            width: 500,
            height: 500,
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            ...randomPosition(),
            ...randomPosition(),
            animationDuration: '28s',
            morphDuration: '20s'
        },
        {
            width: 580,
            height: 580,
            gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            ...randomPosition(),
            ...randomPosition(),
            animationDuration: '32s',
            morphDuration: '23s'
        },
        {
            width: 520,
            height: 520,
            gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            ...randomPosition(),
            ...randomPosition(),
            animationDuration: '29s',
            morphDuration: '21s'
        }
    ];
}

const orbs = generateOrbPositions();

// Create orb container
const orbContainer = document.createElement('div');
orbContainer.className = 'lava-orb-container';
orbContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
`;
document.body.appendChild(orbContainer);

// Create and append each orb
orbs.forEach((orbConfig, index) => {
    const orb = document.createElement('div');
    orb.className = `lava-orb lava-orb-${index + 1}`;

    let positionStyles = '';
    if (orbConfig.top) positionStyles += `top: ${orbConfig.top};`;
    if (orbConfig.bottom) positionStyles += `bottom: ${orbConfig.bottom};`;
    if (orbConfig.left) positionStyles += `left: ${orbConfig.left};`;
    if (orbConfig.right) positionStyles += `right: ${orbConfig.right};`;

    // Calculate stagger delay for this orb (spread over ~800ms)
    const staggerDelay = index * 133; // 6 orbs × 133ms ≈ 800ms spread

    orb.style.cssText = `
        position: fixed;
        width: ${orbConfig.width}px;
        height: ${orbConfig.height}px;
        background: ${orbConfig.gradient};
        border-radius: 50%;
        filter: blur(80px);
        opacity: 0;
        transform: scale(0.85);
        pointer-events: none;
        will-change: transform, opacity;
        transition: opacity 1s ease-out ${staggerDelay}ms, transform 1s ease-out ${staggerDelay}ms;
        animation: float${index + 1} ${orbConfig.animationDuration} ease-in-out infinite,
                   morph${index + 1} ${orbConfig.morphDuration} ease-in-out infinite;
        ${positionStyles}
    `;

    orbContainer.appendChild(orb);
});

// Trigger orb fade-in on page load
setTimeout(() => {
    document.querySelectorAll('.lava-orb').forEach(orb => {
        orb.style.opacity = '0.2';
        orb.style.transform = 'scale(1.0)';
    });
}, 50);

// Handle window resize
window.addEventListener('resize', () => {
    // Orbs will automatically adjust since they're using % positioning
});
