// 1 Kalkulator Linear

function solveInequality(a, b, operator) {
    let result;

    switch (operator) {
        case '>':
            result = `x > ${-b / a}`;
            break;
        case '<':
            result = `x < ${-b / a}`;
            break;
        case '>=':
            result = `x >= ${-b / a}`;
            break;
        case '<=':
            result = `x <= ${-b / a}`;
            break;
        default:
            result = "Operator tidak valid!";
    }

    return result;
}

// Contoh penggunaan

// Kalkulator Kuadrat
   
function solveInequality() {
    // Ambil nilai input
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const operator = document.getElementById('operator').value;
    const resultDiv = document.getElementById('result');

    // Validasi input
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        resultDiv.innerHTML = "Harap masukkan nilai yang valid untuk a, b, dan c.";
        return;
    }

    // Hitung diskriminan
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
        resultDiv.innerHTML = "Tidak ada solusi riil untuk pertidaksamaan kuadrat ini.";
        return;
    }

    // Hitung akar-akar persamaan kuadrat
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    // Tentukan hasil berdasarkan operator
    let solution = "";
    switch (operator) {
        case '>':
            if (a > 0) {
                solution = `x < ${x2} atau x > ${x1}`; // Solusi jika parabola terbuka ke atas
            } else {
                solution = `x > ${x2} atau x < ${x1}`; // Solusi jika parabola terbuka ke bawah
            }
            break;
        case '<':
            if (a > 0) {
                solution = `x > ${x2} atau x < ${x1}`; // Solusi jika parabola terbuka ke atas
            } else {
                solution = `x < ${x2} atau x > ${x1}`; // Solusi jika parabola terbuka ke bawah
            }
            break;
        case '>=':
            if (a > 0) {
                solution = `x ≤ ${x2} atau x ≥ ${x1}`; // Solusi jika parabola terbuka ke atas
            } else {
                solution = `x ≥ ${x2} atau x ≤ ${x1}`; // Solusi jika parabola terbuka ke bawah
            }
            break;
        case '<=':
            if (a > 0) {
                solution = `x ≥ ${x2} atau x ≤ ${x1}`; // Solusi jika parabola terbuka ke atas
            } else {
                solution = `x ≤ ${x2} atau x ≥ ${x1}`; // Solusi jika parabola terbuka ke bawah
            }
            break;
        default:
            resultDiv.innerHTML = "Operator tidak valid.";
            return;
    }

    resultDiv.innerHTML = `Solusi untuk pertidaksamaan: ${solution}`;
}



