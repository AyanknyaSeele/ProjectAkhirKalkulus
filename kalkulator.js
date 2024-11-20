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
let a = 2; // koefisien x
let b = -4; // konstanta
let operator = '>'; // operator pertidaksamaan

console.log(solveInequality(a, b, operator));


// 2 Kalkulator Kuadrat

function hitungAkar(d, e, f) {
    let diskriminan = e * e - 4 * d * f; // Diskriminan
    let hasil = '';

    switch (true) {
        case (diskriminan < 0):
            hasil = 'Persamaan kuadrat tidak memiliki akar real.';
            break;
        case (diskriminan === 0):
            // Jika diskriminan 0, hanya ada satu akar real
            let x = -e / (2 * d);
            hasil = `Akar tunggal: x = ${x}`;
            break;
        case (diskriminan > 0):
            // Jika diskriminan lebih besar dari 0, ada dua akar real
            let akarD = Math.sqrt(diskriminan);
            let x1 = (-e + akarD) / (2 * d);
            let x2 = (-e - akarD) / (2 * d);
            hasil = `Akar-akar: x1 = ${x1}, x2 = ${x2}`;
            break;
        default:
            hasil = 'Terjadi kesalahan dalam perhitungan.';
            break;
    }

    return hasil;
}

// Fungsi untuk menghitung turunan pertama (fungsi kuadrat)
function turunanPertama(d, e) {
    return `f'(x) = ${2 * d}x + ${e}`;
}

// Fungsi untuk menghitung turunan kedua (fungsi kuadrat)
function turunanKedua(d) {
    return `f''(x) = ${2 * d}`;
}

// Fungsi utama untuk menghitung akar, turunan pertama dan kedua
document.getElementById("quadratic-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let d = parseFloat(document.getElementById('d').value);
    let e = parseFloat(document.getElementById('e').value);
    let f = parseFloat(document.getElementById('f').value);

    // Validasi input
    if (isNaN(d) || isNaN(e) || isNaN(f)) {
        document.getElementById('output').innerHTML = 'Harap masukkan nilai yang valid untuk d, e, dan f.';
        return;
    }

    // Menghitung hasil akar persamaan kuadrat
    let solusi = hitungAkar(d, e, f);

    // Menghitung turunan pertama dan kedua
    let turunanF1 = turunanPertama(d, e);
    let turunanF2 = turunanKedua(d);

    // Menampilkan hasil
    document.getElementById('output').innerHTML = `
        <p>${solusi}</p>
        <p>${turunanF1}</p>
        <p>${turunanF2}</p>
    `;
});





