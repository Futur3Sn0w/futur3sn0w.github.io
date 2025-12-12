// Projects Page JavaScript
// Guard against reloading this file via Barba; re-init instead of redeclaring globals
if (window.__projectsModuleLoaded) {
    $(function () {
        if (typeof loadApps === 'function') {
            allApps = [];
            currentViewMode = 'icon';
            showDetails = false;
            searchQuery = '';
            loadApps();
            loadUserPreferences();
        }
    });
} else {
    window.__projectsModuleLoaded = true;
}

var allApps = window.allApps || [];
var currentViewMode = window.currentViewMode || 'icon';
var showDetails = window.showDetails || false;
var searchQuery = window.searchQuery || '';

// Initialize the projects page
$(function () {
    loadApps();
    initializeEventListeners();
    loadUserPreferences();
});

// Load apps from JSON
function loadApps() {
    $.getJSON('/projects/apps.json', function (data) {
        allApps = data.apps || [];
        window.allApps = allApps;
        renderApps();
    }).fail(function () {
        console.error('Failed to load apps.json');
        showNoResults();
    });
}

// Render apps in the grid
function renderApps() {
    const $grid = $('#appsGrid');
    $grid.empty();

    // Filter apps based on search query
    const filteredApps = allApps.filter(app => {
        if (!searchQuery) return true;

        const query = searchQuery.toLowerCase();
        return (
            app.name.toLowerCase().includes(query) ||
            app.description.toLowerCase().includes(query) ||
            app.category.toLowerCase().includes(query)
        );
    });

    // Show no results message if needed
    if (filteredApps.length === 0) {
        showNoResults();
        return;
    } else {
        hideNoResults();
    }

    // Create app cards
    filteredApps.forEach(app => {
        const $card = createAppCard(app);
        $grid.append($card);
    });

    // Add click handlers
    attachCardClickHandlers();

    // Initialize magnetic effect (desktop only)
    if (!isTouchDevice()) {
        if (currentViewMode === 'icon') {
            initProjectsMagneticEffect();
        } else if (currentViewMode === 'tile' || currentViewMode === 'list') {
            initTileListMagneticEffect();
        }
    }
}

// Create an app card element
function createAppCard(app) {
    const $card = $('<a>', {
        class: 'app-card outlink gthNav',
        href: app.url,
        'data-app-id': app.id,
        'data-color': app.color,
        'data-barba-prevent': 'all', // avoid Barba transitions on app icons
        'data-disable-portal': 'true', // avoid portal animation on app icons
        title: app.name,
        style: `--app-color: ${app.color}`
    });

    // Icon
    const $icon = $('<i>', {
        class: `app-icon ${app.icon}`
    });
    $card.append($icon);

    // Create info container for list/tile views
    const $info = $('<div>', { class: 'app-info' });

    // Name
    const $name = $('<p>', {
        class: 'app-name',
        text: app.name
    });

    // Description
    const $description = $('<p>', {
        class: 'app-description',
        text: app.description
    });

    // Category
    const $category = $('<span>', {
        class: 'app-category',
        text: app.category
    });

    // Last update date
    const $date = $('<span>', {
        class: 'app-date',
        text: app.lastUpdate
    });

    // Meta container for tile view
    const $meta = $('<div>', { class: 'app-meta' });
    $meta.append($category, ' • ', $date);

    // Assemble based on view mode
    if (currentViewMode === 'icon') {
        // In icon view, wrap card and name in a wrapper for magnetic effect
        const $wrapper = $('<div>', { class: 'app-card-wrapper' });
        $card.append($icon);
        $wrapper.append($card, $name);
        if (showDetails) {
            $card.append($description);
        }
        return $wrapper;
    } else {
        $info.append($name, $description);
        if (currentViewMode === 'tile' && showDetails) {
            $info.append($meta);
        }
        if (currentViewMode === 'list' && showDetails) {
            $info.append($date);
        }
        $card.append($icon, $info);
        return $card;
    }
}

// Attach click handlers to app cards
function attachCardClickHandlers() {
    // Cards now use regular link navigation - no custom transition needed
    // The href attribute on the <a> tag will handle navigation automatically
}

// Initialize event listeners
function initializeEventListeners() {
    // Search input
    $('.search-input').on('input', function () {
        searchQuery = $(this).val();
        window.searchQuery = searchQuery;
        renderApps();
    });

    // View mode buttons
    $('.view-mode-btn').on('click', function () {
        const viewMode = $(this).data('view');
        setViewMode(viewMode);
    });

    // Toggle details button
    $('.view-option-btn[data-option="show-details"]').on('click', function () {
        toggleDetails();
    });
}

// Set view mode
function setViewMode(mode) {
    if (currentViewMode === mode) return; // Don't transition if already in this mode

    currentViewMode = mode;
    window.currentViewMode = mode;

    // Update button states
    $('.view-mode-btn').removeClass('active');
    $(`.view-mode-btn[data-view="${mode}"]`).addClass('active');

    // Show/hide details button based on view mode
    if (mode === 'icon') {
        $('.view-option-btn[data-option="show-details"]').hide();
    } else {
        $('.view-option-btn[data-option="show-details"]').show();
    }

    // Fade out, change view, then fade in
    const $grid = $('#appsGrid');
    $grid.addClass('transitioning');

    setTimeout(() => {
        // Update container attribute
        $('.projects-container').attr('data-view-mode', mode);

        // Re-render apps
        renderApps();

        // Fade back in
        setTimeout(() => {
            $grid.removeClass('transitioning');
        }, 50);
    }, 300);

    // Save preference
    saveUserPreferences();
}

// Toggle details visibility
function toggleDetails() {
    showDetails = !showDetails;
    window.showDetails = showDetails;

    // Fade out, change details, then fade in
    const $grid = $('#appsGrid');
    $grid.addClass('transitioning');

    setTimeout(() => {
        // Update button state and container class AFTER fade out
        if (showDetails) {
            $('.view-option-btn[data-option="show-details"]').addClass('active');
            $('.projects-container').addClass('show-details');
        } else {
            $('.view-option-btn[data-option="show-details"]').removeClass('active');
            $('.projects-container').removeClass('show-details');
        }

        // Re-render apps
        renderApps();

        // Fade back in
        setTimeout(() => {
            $grid.removeClass('transitioning');
        }, 50);
    }, 300);

    // Save preference
    saveUserPreferences();
}

// Show no results message
function showNoResults() {
    $('#appsGrid').empty();
    $('.no-results').show();
}

// Hide no results message
function hideNoResults() {
    $('.no-results').hide();
}

// Save user preferences to localStorage
function saveUserPreferences() {
    const prefs = {
        viewMode: currentViewMode,
        showDetails: showDetails
    };
    localStorage.setItem('projectsPreferences', JSON.stringify(prefs));
}

// Load user preferences from localStorage
function loadUserPreferences() {
    const saved = localStorage.getItem('projectsPreferences');
    if (saved) {
        try {
            const prefs = JSON.parse(saved);
            if (prefs.viewMode) {
                currentViewMode = prefs.viewMode;
                $('.view-mode-btn').removeClass('active');
                $(`.view-mode-btn[data-view="${prefs.viewMode}"]`).addClass('active');
                $('.projects-container').attr('data-view-mode', prefs.viewMode);

                // Hide details button if icon view
                if (prefs.viewMode === 'icon') {
                    $('.view-option-btn[data-option="show-details"]').hide();
                }
            }
            if (prefs.showDetails !== undefined) {
                showDetails = prefs.showDetails;
                if (showDetails) {
                    $('.view-option-btn[data-option="show-details"]').addClass('active');
                    $('.projects-container').addClass('show-details');
                }
            }
        } catch (e) {
            console.error('Failed to load preferences:', e);
        }
    } else {
        // Default: hide details button in icon view
        $('.view-option-btn[data-option="show-details"]').hide();
    }
}

// Keyboard shortcuts
$(document).on('keydown', function (e) {
    // Cmd/Ctrl + F to focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        $('.search-input').focus();
    }

    // Cmd/Ctrl + 1/2/3 to switch views
    if (e.metaKey || e.ctrlKey) {
        if (e.key === '1') {
            e.preventDefault();
            setViewMode('icon');
        } else if (e.key === '2') {
            e.preventDefault();
            setViewMode('list');
        } else if (e.key === '3') {
            e.preventDefault();
            setViewMode('tile');
        }
    }

    // Cmd/Ctrl + I to toggle details
    if ((e.metaKey || e.ctrlKey) && e.key === 'i') {
        e.preventDefault();
        toggleDetails();
    }
});

// Detect if device has touch capability
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

// Magnetic hover effect for icon view
function initProjectsMagneticEffect() {
    const wrappers = document.querySelectorAll('.app-card-wrapper');

    wrappers.forEach(wrapper => {
        const strength = 12; // How much the card moves (in pixels)
        const card = wrapper.querySelector('.app-card');

        if (!card) return;

        wrapper.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate relative position from center
            const relX = e.clientX - centerX;
            const relY = e.clientY - centerY;

            // Calculate movement (proportional to distance from center)
            const moveX = (relX / rect.width) * strength;
            const moveY = (relY / rect.height) * strength;

            // Apply transform to wrapper
            wrapper.style.setProperty('--mag-x', `${moveX}px`);
            wrapper.style.setProperty('--mag-y', `${moveY}px`);
        });

        wrapper.addEventListener('mouseleave', function () {
            // Reset position when mouse leaves
            wrapper.style.setProperty('--mag-x', '0px');
            wrapper.style.setProperty('--mag-y', '0px');
        });
    });
}

// Magnetic hover effect for tile and list views
function initTileListMagneticEffect() {
    const cards = document.querySelectorAll('.app-card');

    cards.forEach(card => {
        const strength = 12; // How much elements move (in pixels)

        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate relative position from center
            const relX = e.clientX - centerX;
            const relY = e.clientY - centerY;

            // Calculate movement (proportional to distance from center)
            const moveX = (relX / rect.width) * strength;
            const moveY = (relY / rect.height) * strength;

            // Apply transform to card
            card.style.setProperty('--mag-x', `${moveX}px`);
            card.style.setProperty('--mag-y', `${moveY}px`);
        });

        card.addEventListener('mouseleave', function () {
            // Reset position when mouse leaves
            card.style.setProperty('--mag-x', '0px');
            card.style.setProperty('--mag-y', '0px');
        });
    });
}
