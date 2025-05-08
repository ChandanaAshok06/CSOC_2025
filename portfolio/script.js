window.onload = function() {
    AOS.init({ offset: 0 });

    const typewriter = document.querySelector('.typewriter-text');
    const texts = [" Developer", " Designer", " Freelancer"];
    let i = 0, j = 0, current = '', isDeleting = false;

    function type() {
        if (i >= texts.length) i = 0;
        current = texts[i];
        let display = current.substring(0, j);
        typewriter.innerHTML = display;

        if (!isDeleting) {
            j++;
            if (j > current.length) {
                isDeleting = true;
                setTimeout(type, 1000);
                return;
            }
        } else {
            j--;
            if (j === 0) {
                isDeleting = false;
                i++;
            }
        }
        setTimeout(type, isDeleting ? 60 : 100);
    }
    type();

    window.hamburg = function() {
        document.querySelector(".dropdown").style.transform = 'translateY(0px)';
    }

    window.cancel = function() {
        document.querySelector(".dropdown").style.transform = 'translateY(-500px)';
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            cancel(); 
        });
    });
    
}
