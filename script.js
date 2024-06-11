document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settingsForm');
    const fontsizeInput = document.getElementById('fontsize');
    const fontcolorInput = document.getElementById('fontcolor');

    // Load preferences from cookies if they exist
    const savedFontSize = getCookie('fontsize');
    const savedFontColor = getCookie('fontcolor');

    if (savedFontSize) {
        document.documentElement.style.setProperty('--fontsize', `${savedFontSize}px`);
        fontsizeInput.value = savedFontSize;
    }

    if (savedFontColor) {
        document.documentElement.style.setProperty('--fontcolor', savedFontColor);
        fontcolorInput.value = savedFontColor;
    }

    // Save preferences to cookies on form submission
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fontsize = fontsizeInput.value;
        const fontcolor = fontcolorInput.value;

        setCookie('fontsize', fontsize, 365);
        setCookie('fontcolor', fontcolor, 365);

        document.documentElement.style.setProperty('--fontsize', `${fontsize}px`);
        document.documentElement.style.setProperty('--fontcolor', fontcolor);
    });

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
});
