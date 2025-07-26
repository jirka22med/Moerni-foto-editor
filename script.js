const singleImageInput = document.getElementById('singleImageInput');
const originalImage = document.getElementById('originalImage');
const editedCanvas = document.getElementById('editedCanvas');
const ctx = editedCanvas.getContext('2d');
const brightnessSlider = document.getElementById('brightness');
const contrastSlider = document.getElementById('contrast');
const saturationSlider = document.getElementById('saturation');
const exposureSlider = document.getElementById('exposure');
const hueSlider = document.getElementById('hue');
const sharpnessSlider = document.getElementById('sharpness'); // Deklarace pro nový slider Ostrost/Rozostření

console.log('%c🎯 Image Editor inicializace dokončena', 'color: #FF6B6B; font-weight: bold; font-size: 14px;');

let image = new Image();
let imageData; // Zde budeme uchovávat původní, neupravená data obrázku
let isImageLoaded = false;

// Debounce funkce pro omezení počtu volání applyFilters
// Zajišťuje, že se applyFilters zavolá jen jednou po krátké pauze od posledního pohybu sliderem,
// což zlepšuje výkon a plynulost.
// Debounce funkce pro omezení počtu volání applyFilters
function debounce(func, wait) {
   // console.log('%c⏱️ Debounce funkce vytvořena s čekáním:', 'color: #4ECDC4; font-weight: bold;', wait + 'ms');
    let timeout;
    return function(...args) {
        const later = () => {
            clearTimeout(timeout);
           // console.log('%c⚡ Debounce: Volání funkce po čekání', 'color: #4ECDC4; font-style: italic;');
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        //console.log('%c⏳ Debounce: Timeout nastaven', 'color: #4ECDC4; font-style: italic;');
    };
}

const debouncedApplyFilters = debounce(applyFilters, 50);

// Event Listener pro nahrání obrázku
singleImageInput.addEventListener('change', function(e) {
    console.log('%c📁 Načítání obrázku - Event listener aktivován', 'color: #45B7D1; font-weight: bold; font-size: 12px;');
    const file = e.target.files[0];
    if (!file) {
        console.log('%c❌ Žádný soubor nebyl vybrán', 'color: #E74C3C; font-weight: bold;');
        return;
    }

    console.log('%c📄 Soubor vybrán:', 'color: #45B7D1; font-weight: bold;', file.name, 'Velikost:', file.size, 'bytes');

    const reader = new FileReader();

    reader.onload = function(event) {
        console.log('%c✅ FileReader načetl soubor úspěšně', 'color: #27AE60; font-weight: bold;');
        image.src = event.target.result;
        originalImage.src = event.target.result;

        image.onload = function() {
            console.log('%c🖼️ Obrázek načten do Image objektu', 'color: #8E44AD; font-weight: bold;');
            console.log('%c📐 Původní rozměry:', 'color: #8E44AD;', `${image.width}x${image.height}`);
            
            const MAX_WIDTH = 1920;
            const MAX_HEIGHT = 1080;
            let width = image.width;
            let height = image.height;

            if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                console.log('%c⚠️ Obrázek je větší než maximální rozlišení - bude zmenšen', 'color: #F39C12; font-weight: bold;');
                const aspectRatio = width / height;
                if (width > height) {
                    width = MAX_WIDTH;
                    height = Math.round(MAX_WIDTH / aspectRatio);
                } else {
                    height = MAX_HEIGHT;
                    width = Math.round(MAX_HEIGHT * aspectRatio);
                }
                console.log('%c📐 Nové rozměry po zmenšení:', 'color: #F39C12;', `${width}x${height}`);
            }

            // Nastavení rozměrů canvasu a vykreslení původního obrázku
            editedCanvas.width = width;
            editedCanvas.height = height;
            console.log('%c🎨 Canvas nastaven na rozměry:', 'color: #9B59B6;', `${width}x${height}`);
            
            ctx.drawImage(image, 0, 0, width, height);
            console.log('%c🖌️ Obrázek vykreslen na canvas', 'color: #9B59B6; font-weight: bold;');
            
            imageData = ctx.getImageData(0, 0, width, height);
            console.log('%c💾 ImageData získána - pixelů:', 'color: #16A085;', imageData.data.length / 4);
            
            isImageLoaded = true;
            console.log('%c✅ Obrázek úspěšně načten a připraven k editaci', 'color: #27AE60; font-weight: bold; font-size: 14px;');
            applyFilters();
        };
    }

    reader.readAsDataURL(file);
});

// Hlavní funkce pro aplikaci všech filtrů
function applyFilters() {
    //console.log('%c🎛️ === APLIKACE FILTRŮ ZAČÍNÁ ===', 'color: #E67E22; font-weight: bold; font-size: 16px; background: #FFF3E0; padding: 4px;');
    
    if (!isImageLoaded || !imageData) {
        console.log('%c❌ Obrázek není načten nebo imageData nejsou k dispozici', 'color: #E74C3C; font-weight: bold;');
        return;
    }

    // Vždy začínáme s původními daty obrázku (imageData) pro všechny filtry,
    // aby se filtry neaplikovaly kumulativně na již upravený obrázek.
    // Vytvoříme dočasný ImageData objekt, se kterým budeme pracovat.
    // Důležité je vytvořit nová data, nikoliv jen referenci.
    let currentImageData = ctx.createImageData(imageData.width, imageData.height);
    currentImageData.data.set(imageData.data); // Zkopírujeme původní pixely
    //console.log('%c🔄 Kopie původních dat vytvořena', 'color: #3498DB; font-weight: bold;');

    let data = currentImageData.data; // Reference na pole pixelů pro úpravu

    // Získání aktuálních hodnot ze všech sliderů
    const brightness = parseInt(brightnessSlider.value);
    const contrast = parseInt(contrastSlider.value);
    const saturation = parseInt(saturationSlider.value);
    const exposure = parseInt(exposureSlider.value);
    const hue = parseInt(hueSlider.value);
    const sharpness = parseInt(sharpnessSlider.value); // Hodnota pro ostrost/rozostření

   // console.log('%c📊 Hodnoty sliderů:', 'color: #34495E; font-weight: bold;');
   // console.log('%c   💡 Jas:', 'color: #F1C40F;', brightness);
   // console.log('%c   🔲 Kontrast:', 'color: #95A5A6;', contrast);
   // console.log('%c   🌈 Saturace:', 'color: #E91E63;', saturation);
   // console.log('%c   📸 Expozice:', 'color: #FF9800;', exposure);
    //console.log('%c   🎨 Odstín:', 'color: #9C27B0;', hue);
    //console.log('%c   🔍 Ostrost:', 'color: #607D8B;', sharpness);

    const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    //console.log('%c🧮 Kontrastní faktor vypočítán:', 'color: #795548;', contrastFactor);

    // Aplikace základních filtrů (jas, kontrast, sytost, expozice, odstín) na pixely
    //console.log('%c🔄 Začínám procházet pixely...', 'color: #2196F3; font-weight: bold;');
    const startTime = performance.now();
    
    for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Debug log pouze pro první pixel
        if (i === 0) {
            //console.log('%c🔍 První pixel - původní hodnoty RGB:', 'color: #673AB7;', `[${r}, ${g}, ${b}]`);
        }

        // 1. Jas
        r += brightness;
        g += brightness;
        b += brightness;

        // 2. Kontrast
        r = contrastFactor * (r - 128) + 128;
        g = contrastFactor * (g - 128) + 128;
        b = contrastFactor * (b - 128) + 128;

        // 3. Sytost (převod na průměr, posun od průměru)
        const avg = (r + g + b) / 3;
        r += (r - avg) * (saturation / 100);
        g += (g - avg) * (saturation / 100);
        b += (b - avg) * (saturation / 100);

        // 4. Expozice
        r *= (1 + exposure / 100);
        g *= (1 + exposure / 100);
        b *= (1 + exposure / 100);

        // 5. Odstín (převod RGB -> HSV, úprava H, převod HSV -> RGB)
        const hsv = rgbToHsv(r, g, b);
        hsv[0] = (hsv[0] + hue / 100) % 1; // Zajištění, že odstín zůstane v rozsahu 0-1
        const rgb = hsvToRgb(hsv[0], hsv[1], hsv[2]);

        // Debug log pouze pro první pixel
        if (i === 0) {
            //console.log('%c🔍 První pixel - finální hodnoty RGB:', 'color: #673AB7;', `[${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}]`);
        }

        // Uložení upravených hodnot zpět do dat pixelů
        data[i] = clamp(rgb[0], 0, 255);
        data[i + 1] = clamp(rgb[1], 0, 255);
        data[i + 2] = clamp(rgb[2], 0, 255);
        data[i + 3] = data[i + 3]; // Alfa kanál (průhlednost) se nemění
    }
    
    const filterTime = performance.now() - startTime;
    //console.log('%c⚡ Základní filtry aplikovány za:', 'color: #4CAF50; font-weight: bold;', filterTime.toFixed(2) + 'ms');

    // Aplikace ostrosti/rozostření jako poslední krok, pokud je hodnota nenulová
    if (sharpness !== 0) {
        //console.log('%c🔍 Aplikuji ostrost/rozostření...', 'color: #FF5722; font-weight: bold;');
        const sharpnessStart = performance.now();
        currentImageData = applySharpness(currentImageData, sharpness);
        const sharpnessTime = performance.now() - sharpnessStart;
        //console.log('%c✅ Ostrost/rozostření aplikováno za:', 'color: #FF5722; font-weight: bold;', sharpnessTime.toFixed(2) + 'ms');
    } else {
        //console.log('%c⏭️ Ostrost/rozostření přeskočeno (hodnota = 0)', 'color: #FFC107;');
    }

    // Vykreslení finálních upravených dat na canvas
    ctx.putImageData(currentImageData, 0, 0);
    //console.log('%c🎨 Finální obrázek vykreslen na canvas', 'color: #8BC34A; font-weight: bold;');
    //console.log('%c🎛️ === APLIKACE FILTRŮ DOKONČENA ===', 'color: #E67E22; font-weight: bold; font-size: 16px; background: #E8F5E8; padding: 4px;');
}

// Pomocná funkce pro oříznutí hodnoty do daného rozsahu (min-max)
function clamp(value, min, max) {
    const result = Math.min(Math.max(value, min), max);
    // Debug log pouze při hodnotách mimo rozsah
    if (value < min || value > max) {
        //console.log('%c✂️ Clamp: Hodnota', 'color: #FF9800; font-size: 10px;', value, '→', result);
    }
    return result;
}

// Funkce pro převod RGB barevného modelu na HSV (Odstín, Sytost, Světlost/Jas)
// Potřebné pro úpravu odstínu (Hue)
function rgbToHsv(r, g, b) {
    //console.log('%c🌈 RGB→HSV převod pro:', 'color: #E91E63; font-size: 10px;', `[${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}]`);
    
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, v = max;

    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min) {
        h = 0; // Bez odstínu
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    const result = [h, s, v];
    //console.log('%c🌈 HSV výsledek:', 'color: #E91E63; font-size: 10px;', `[${h.toFixed(3)}, ${s.toFixed(3)}, ${v.toFixed(3)}]`);
    return result;
}

// Funkce pro převod HSV barevného modelu zpět na RGB
function hsvToRgb(h, s, v) {
    //console.log('%c🌈 HSV→RGB převod pro:', 'color: #9C27B0; font-size: 10px;', `[${h.toFixed(3)}, ${s.toFixed(3)}, ${v.toFixed(3)}]`);
    
    let r, g, b;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    const result = [r * 255, g * 255, b * 255];
    //console.log('%c🌈 RGB výsledek:', 'color: #9C27B0; font-size: 10px;', `[${Math.round(result[0])}, ${Math.round(result[1])}, ${Math.round(result[2])}]`);
    return result;
}

// HLAVNÍ FUNKCE PRO APLIKACI OSTROSTI/ROZOSTŘENÍ POMOCÍ KONVOLUCE
function applySharpness(imgData, sharpnessAmount) {
    //console.log('%c🔍 === APLIKACE OSTROSTI/ROZOSTŘENÍ ===', 'color: #FF5722; font-weight: bold; font-size: 14px; background: #FFF3E0; padding: 4px;');
    //console.log('%c🔢 Hodnota ostrosti:', 'color: #FF5722; font-weight: bold;', sharpnessAmount);
    
    const width = imgData.width;
    const height = imgData.data.length / 4 / width; // Správný výpočet výšky z délky dat
    //console.log('%c📐 Rozměry pro konvoluci:', 'color: #FF5722;', `${width}x${height}`);
    
    const src = imgData.data;
    const dest = new Uint8ClampedArray(src.length); // Cílové pole pro upravené pixely
    //console.log('%c💾 Cílové pole vytvořeno, velikost:', 'color: #FF5722;', dest.length);

    let kernel;
    let kernelWeight = 1;

    // Definuje konvoluční kernely pro ostření a rozostření (Box Blur)
    // Ostření: Zvýrazňuje hrany (součet kernelu je 1)
    // Rozostření (Box Blur): Průměruje okolní pixely (součet kernelu je 9, proto dělení 9)
    if (sharpnessAmount > 0) { // Ostření
        kernel = [
            0, -1, 0,
            -1, 5, -1,
            0, -1, 0
        ];
        kernelWeight = 1;
        //console.log('%c🔪 Použit kernel pro OSTŘENÍ:', 'color: #D32F2F; font-weight: bold;', kernel);
    } else if (sharpnessAmount < 0) { // Rozostření (Box Blur)
        kernel = [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1
        ];
        kernelWeight = 9;
        //console.log('%c🌫️ Použit kernel pro ROZOSTŘENÍ:', 'color: #1976D2; font-weight: bold;', kernel);
    } else { // sharpnessAmount je 0, žádná změna, vrátíme původní data
        //console.log('%c⏭️ Ostrost je 0 - vrácena původní data', 'color: #FFC107; font-weight: bold;');
        return imgData;
    }

    //console.log('%c⚖️ Váha kernelu:', 'color: #FF5722;', kernelWeight);

    const kernelSize = 3; // Velikost kernelu (3x3)
    const kernelOffset = Math.floor(kernelSize / 2); // Střed kernelu pro offset (zde 1 pro 3x3)
    //console.log('%c📏 Velikost kernelu:', 'color: #FF5722;', kernelSize, 'Offset:', kernelOffset);

    const totalPixels = width * height;
    let processedPixels = 0;
    const startTime = performance.now();

    // Iterace přes každý pixel obrázku
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4; // Index R kanálu aktuálního pixelu
            processedPixels++;

            let r = 0, g = 0, b = 0;

            // Aplikace kernelu: procházení okolních pixelů
            for (let ky = 0; ky < kernelSize; ky++) {
                for (let kx = 0; kx < kernelSize; kx++) {
                    const pixelX = x + kx - kernelOffset;
                    const pixelY = y + ky - kernelOffset;

                    // Kontrola, zda sousední pixel je v rámci obrázku
                    if (pixelX >= 0 && pixelX < width && pixelY >= 0 && pixelY < height) {
                        const neighborIndex = (pixelY * width + pixelX) * 4;
                        const kernelValue = kernel[ky * kernelSize + kx];

                        r += src[neighborIndex] * kernelValue;
                        g += src[neighborIndex + 1] * kernelValue;
                        b += src[neighborIndex + 2] * kernelValue;
                    } else {
                        // Pokud je sousední pixel mimo hranice, použij hodnotu aktuálního pixelu
                        // Tím se zabrání černým okrajům a vytvoří se "rozšíření okraje"
                        r += src[i] * kernel[ky * kernelSize + kx];
                        g += src[i + 1] * kernel[ky * kernelSize + kx];
                        b += src[i + 2] * kernel[ky * kernelSize + kx];
                    }
                }
            }

            // Uložení vypočítaných a oříznutých (clamp) hodnot do cílového pole
            dest[i] = clamp(r / kernelWeight, 0, 255);
            dest[i + 1] = clamp(g / kernelWeight, 0, 255);
            dest[i + 2] = clamp(b / kernelWeight, 0, 255);
            dest[i + 3] = src[i + 3]; // Alfa kanál (průhlednost) se vždy zachovává

            // Progress log každých 10% pixelů
            if (processedPixels % Math.floor(totalPixels / 10) === 0) {
                const progress = Math.round((processedPixels / totalPixels) * 100);
               //console.log('%c📊 Konvoluce pokrok:', 'color: #FF5722; font-style: italic;', progress + '%');
            }
        }
    }

    const convolutionTime = performance.now() - startTime;
    //console.log('%c⚡ Konvoluce dokončena za:', 'color: #FF5722; font-weight: bold;', convolutionTime.toFixed(2) + 'ms');
    //console.log('%c✅ Zpracováno pixelů:', 'color: #FF5722; font-weight: bold;', processedPixels);

    // Vytvoříme nový ImageData objekt z upravených pixelů a vrátíme ho
    const newImageData = ctx.createImageData(width, height);
    newImageData.data.set(dest);
    console.log('%c📦 Nový ImageData objekt vytvořen a vrácen', 'color: #FF5722; font-weight: bold;');
    console.log('%c🔍 === OSTROST/ROZOSTŘENÍ DOKONČENO ===', 'color: #FF5722; font-weight: bold; font-size: 14px; background: #E8F5E8; padding: 4px;');
    return newImageData;
}


// Event Listenery pro aktualizaci hodnot a volání applyFilters
brightnessSlider.addEventListener('input', () => {
    //console.log('%c💡 Slider JAS změněn na:', 'color: #F1C40F; font-weight: bold;', brightnessSlider.value);
    document.getElementById('brightnessValue').textContent = brightnessSlider.value;
    debouncedApplyFilters();
});
contrastSlider.addEventListener('input', () => {
    //console.log('%c🔲 Slider KONTRAST změněn na:', 'color: #95A5A6; font-weight: bold;', contrastSlider.value);
    document.getElementById('contrastValue').textContent = contrastSlider.value;
    debouncedApplyFilters();
});
saturationSlider.addEventListener('input', () => {
    //console.log('%c🌈 Slider SATURACE změněn na:', 'color: #E91E63; font-weight: bold;', saturationSlider.value);
    document.getElementById('saturationValue').textContent = saturationSlider.value;
    debouncedApplyFilters();
});
exposureSlider.addEventListener('input', () => {
    //console.log('%c📸 Slider EXPOZICE změněn na:', 'color: #FF9800; font-weight: bold;', exposureSlider.value);
    document.getElementById('exposureValue').textContent = exposureSlider.value;
    debouncedApplyFilters();
});
hueSlider.addEventListener('input', () => {
   // console.log('%c🎨 Slider ODSTÍN změněn na:', 'color: #9C27B0; font-weight: bold;', hueSlider.value);
    document.getElementById('hueValue').textContent = hueSlider.value;
    debouncedApplyFilters();
});
// NOVÝ EVENT LISTENER pro ostrost/rozostření
sharpnessSlider.addEventListener('input', () => {
   // console.log('%c🔍 Slider OSTROST změněn na:', 'color: #607D8B; font-weight: bold;', sharpnessSlider.value);
    document.getElementById('sharpnessValue').textContent = sharpnessSlider.value;
    debouncedApplyFilters();
});


// Funkce pro ukládání obrázku v různých rozlišeních (kompletně zachováno z tvého kódu)
document.getElementById('saveFullHD').addEventListener('click', function() {
    console.log('%c💾 Uložení Full HD (1920x1080)', 'color: #2ECC71; font-weight: bold;');
    saveImage(1920, 1080);
});
document.getElementById('savepn').addEventListener('click', function() {
    console.log('%c💾 Uložení panorama (7632x1936)', 'color: #2ECC71; font-weight: bold;');
    saveImage(7632, 1936);
});

document.getElementById('save4K').addEventListener('click', function() {
    console.log('%c💾 Uložení 4K (3840x2160)', 'color: #2ECC71; font-weight: bold;');
    saveImage(3840, 2160);
});
document.getElementById('save8K').addEventListener('click', function() {
    console.log('%c💾 Uložení 8K (7680x4320)', 'color: #2ECC71; font-weight: bold;');
    saveImage(7680, 4320);
});

document.getElementById('savehd').addEventListener('click', function() {
    console.log('%c💾 Uložení HD (800x600)', 'color: #2ECC71; font-weight: bold;');
    saveImage(800, 600);
});
document.getElementById('savelod').addEventListener('click', function() {
    console.log('%c💾 Uložení low detail (486x253)', 'color: #2ECC71; font-weight: bold;');
    saveImage(486, 253);
});

document.getElementById('savepostavy').addEventListener('click', function() {
    console.log('%c💾 Uložení postavy (174x225)', 'color: #2ECC71; font-weight: bold;');
    saveImage(174, 225);
});
document.getElementById('16x16').addEventListener('click', function() {
    console.log('%c💾 Uložení 16x16', 'color: #2ECC71; font-weight: bold;');
    saveImage(16, 16);
});

document.getElementById('32x32').addEventListener('click', function() {
    console.log('%c💾 Uložení 32x32', 'color: #2ECC71; font-weight: bold;');
    saveImage(32, 32);
});
document.getElementById('64x64').addEventListener('click', function() {
    console.log('%c💾 Uložení 64x64', 'color: #2ECC71; font-weight: bold;');
    saveImage(64, 64);
});

document.getElementById('82x82').addEventListener('click', function() {
    console.log('%c💾 Uložení 82x82', 'color: #2ECC71; font-weight: bold;');
    saveImage(82, 82);
});
document.getElementById('100x100').addEventListener('click', function() {
    console.log('%c💾 Uložení 100x100', 'color: #2ECC71; font-weight: bold;');
    saveImage(100, 100);
});

document.getElementById('192x192').addEventListener('click', function() {
    console.log('%c💾 Uložení 192x192', 'color: #2ECC71; font-weight: bold;');
    saveImage(192, 192);
});

document.getElementById('512x512').addEventListener('click', function() {
    console.log('%c💾 Uložení 512x512', 'color: #2ECC71; font-weight: bold;');
    saveImage(512, 512);
});

document.getElementById('768x1280').addEventListener('click', function() {
    console.log('%c💾 Uložení 768x1280', 'color: #2ECC71; font-weight: bold;');
    saveImage(768, 1280);
});

document.getElementById('infinix').addEventListener('click', function() {
    console.log('%c💾 Uložení 4592x2016', 'color: #2ECC71; font-weight: bold;');
    saveImage(4592, 2016);
});

// Funkce pro stažení upraveného obrázku
function saveImage(width, height) {
    console.log('%c💾 === UKLÁDÁNÍ OBRÁZKU ===', 'color: #27AE60; font-weight: bold; font-size: 14px; background: #E8F5E8; padding: 4px;');
    console.log('%c📐 Požadované rozměry:', 'color: #27AE60; font-weight: bold;', `${width}x${height}`);
    
    if (!isImageLoaded) {
        console.log('%c❌ Chyba: Obrázek není načten!', 'color: #E74C3C; font-weight: bold;');
        alert("Nejprve načti obrázek!");
        return;
    }

    console.log('%c🎨 Vytváření dočasného canvasu...', 'color: #27AE60;');
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = width;
    tempCanvas.height = height;
    console.log('%c📏 Dočasný canvas nastaven na:', 'color: #27AE60;', `${width}x${height}`);

    console.log('%c🖼️ Kreslení upraveného obrázku na dočasný canvas...', 'color: #27AE60;');
    console.log('%c📊 Zdrojové rozměry:', 'color: #27AE60;', `${editedCanvas.width}x${editedCanvas.height}`);
    tempCtx.drawImage(editedCanvas, 0, 0, editedCanvas.width, editedCanvas.height, 0, 0, width, height);
    console.log('%c✅ Obrázek překreslen na cílové rozměry', 'color: #27AE60; font-weight: bold;');

    console.log('%c🔗 Vytváření download linku...', 'color: #27AE60;');
    const link = document.createElement('a');
    const filename = `image_${width}x${height}.png`;
    link.download = filename;
    link.href = tempCanvas.toDataURL('image/png');
    console.log('%c📁 Název souboru:', 'color: #27AE60; font-weight: bold;', filename);
    
    console.log('%c⬇️ Spouštění stahování...', 'color: #27AE60; font-weight: bold;');
    link.click();
    console.log('%c✅ Stahování zahájeno úspěšně!', 'color: #27AE60; font-weight: bold;');
    console.log('%c💾 === UKLÁDÁNÍ DOKONČENO ===', 'color: #27AE60; font-weight: bold; font-size: 14px; background: #E8F5E8; padding: 4px;');
}
