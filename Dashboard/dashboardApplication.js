// Sidebar Navigation

const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', () => {

        document
            .querySelector('.nav-item.active')
            ?.classList.remove('active');

        item.classList.add('active');
    });
});


// Activate Button

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {

    btn.addEventListener('click', () => {

        if(btn.textContent.trim() === 'Activate'){

            btn.textContent = 'Activated ✓';
            btn.style.background = '#16a34a';
            btn.style.color = '#ffffff';
        }
    });

});