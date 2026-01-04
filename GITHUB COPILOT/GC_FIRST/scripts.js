window.onload = function() {
    alert("Welcome to First GC Web Project!");
    const btn = document.getElementById('calc-btn');
    const input = document.getElementById('calc-input');
    const result = document.getElementById('calc-result');
    const buttons = document.querySelectorAll('.calc-buttons button[data-val]');
    const clearBtn = document.getElementById('calc-clear');
    const equalsBtn = document.getElementById('calc-equals');

    buttons.forEach(btn => {
        btn.onclick = function() {
            input.value += btn.getAttribute('data-val');
            result.textContent = '';
        };
    });

    clearBtn.onclick = function() {
        input.value = '';
        result.textContent = '';
    };

    equalsBtn.onclick = function() {
        const expr = input.value.trim();
        // Only allow numbers, operators, parentheses, and spaces
        if (/^[\d+\-*/().\s]+$/.test(expr)) {
            try {
                // Evaluate expression using eval (BODMAS is respected)
                const val = eval(expr);
                result.textContent = `Result: ${val}`;
            } catch {
                result.textContent = 'Invalid expression!';
            }
        } else {
            result.textContent = 'Invalid input!';
        }
    };
};
