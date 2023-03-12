const passwordInput = document.querySelector('input[name="Password"]');
const showPasswordBtn = document.querySelector('.show-password i');

showPasswordBtn.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    showPasswordBtn.classList.toggle('active');
});