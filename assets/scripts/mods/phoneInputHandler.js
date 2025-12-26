document.addEventListener('DOMContentLoaded', () => {
    const phoneInputs = document.querySelectorAll('.js-phone-field');

    phoneInputs.forEach((input) => {
        const mask = () => {
            let digits = input.value.replace(/\D/g, '');

            if (!digits.startsWith('38')) {
                digits = '38' + digits;
            }

            digits = digits.slice(0, 12); // +38XXXXXXXXXX

            let result = '+38';

            if (digits.length > 2) {
                result += ' (' + digits.slice(2, 5) + ')';
            }

            if (digits.length >= 5) {
                result += ' ' + digits.slice(5, 8);
            }

            if (digits.length >= 8) {
                result += ' ' + digits.slice(8, 10);
            }

            if (digits.length >= 10) {
                result += ' ' + digits.slice(10, 12);
            }

            input.value = result;
        };

        input.addEventListener('input', mask);

        input.addEventListener('focus', () => {
            if (!input.value) input.value = '+38 (';
        });

        input.addEventListener('blur', () => {
            if (input.value === '+38 (') input.value = '';
        });
    });
});
