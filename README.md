# 🎨 Moderní Fotoeditor

**Profesionální webový foto editor s pokročilými funkcemi pro úpravu obrázků a export do různých rozlišení.**

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen)](https://jirka22med.github.io/Moerni-foto-editor/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/jirka22med/Moerni-foto-editor)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📋 Obsah

- [O projektu](#-o-projektu)
- [Funkce](#-funkce)
- [Live Demo](#-live-demo)
- [Instalace](#-instalace)
- [Použití](#-použití)
- [Podporovaná rozlišení](#-podporovaná-rozlišení)
- [Technologie](#-technologie)
- [Struktura projektu](#-struktura-projektu)
- [Autoři](#-autoři)
- [License](#-license)

---

## 🖼️ O projektu

**Moderní Fotoeditor** je webová aplikace navržená pro rychlou a efektivní úpravu fotografií přímo v prohlížeči. Editor nabízí širokou škálu filtrů, úprav a možností exportu do více než 20 různých rozlišení.

### Klíčové vlastnosti:

- ✅ **Bez instalace** - Funguje přímo v prohlížeči
- ✅ **Offline ready** - Po načtení lze používat offline
- ✅ **Rychlé zpracování** - Real-time náhled změn
- ✅ **Flexibilní export** - 20+ přednastavených rozlišení
- ✅ **Responsivní design** - Funguje na PC i mobilních zařízeních
- ✅ **Star Trek theme** - Unikátní vizuální styl

---

## 🚀 Funkce

### Základní úpravy:

- **Jas** - Nastavení světlosti obrázku (-100 až +100)
- **Kontrast** - Úprava kontrastu (-100 až +100)
- **Sytost** - Intenzita barev (-100 až +300)
- **Expozice** - Celková expozice snímku (-100 až +100)
- **Odstín** - Posun barevného odstínu (0 až 100)
- **Ostrost/Rozostření** - Doostření nebo rozmazání (-10 až +10)

### Export & Rozlišení:


 
        
        
           
#### 📺 Standardní rozlišení:
                     <button id="1918x917">HD</button>
                     <button id="saveFullHD">Uložit FullHD</button>
                     <button id="save4K">Uložit 4K</button>
                     <button id="save8K">Uložit 8K</button>
                     <button id="4592x2016">infinix</button>
 #### 🎮 Herní formáty:        
                     <button id="savepn">Uložit PN</button>
                     <button id="savehd">Uložit Hra</button>
                     <button id="savelod">Uložit lod</button>
                     <button id="savepostavy">Uložit postavy</button>
 #### 🎨 Herní textury:       
                     <button id="16x16">16x16</button>     
                     <button id="32x32">32x32</button>            
                     <button id="64x64">64x64</button>
                     <button id="72x72">72x72</button>
                     <button id="82x82">82x82</button>
                     <button id="100x100">100x100</button>
                     <button id="192x192">192x192</button>
                     <button id="512x512">512x512</button> 
                     <button id="768x1280">768x1280</button>
 #### 🎨 Herní textury: 
                     <option value="1918x917">HD</option>
                     <option value="1920x1080">Uložit FullHD</option>
                     <option value="3840x2160">Uložit 4K</option>
                     <option value="7680x4320">Uložit 8K</option>
                     <option value="7632x1936">Uložit PN</option>
                     <option value="800x600">Uložit Hra</option>
                     <option value="486x253">Uložit lod</option>
                     <option value="174x225">Uložit postavy</option>
#### 🎨 Herní textury:             
                     <option value="16x16">16x16</option>      
                     <option value="32x32">32x32</option>            
                     <option value="64x64">64x64</option>
                     <option value="72x72">72x72</option>
                     <option value="82x82">82x82</option>
                     <option value="100x100">100x100</option>
                     <option value="192x192">192x192</option>
                     <option value="512x512">512x512</option> 
                     <option value="768x1280">768x1280</option>
           


- **Panel 1** (📋) - Klasická tlačítka pro rychlý přístup
- **Panel 2** (📑) - Dropdown menu pro úsporu místa
- **Oba panely** (📑) - Zobrazení obou režimů najednou

---

## 🌐 Live Demo

**Vyzkoušejte editor online:**  
👉 [https://jirka22med.github.io/Moerni-foto-editor/](https://jirka22med.github.io/Moerni-foto-editor/)

---

## 📦 Instalace

### Metoda 1: Přímé použití (Doporučeno)

```bash
# Klonování repositáře
git clone https://github.com/jirka22med/Moerni-foto-editor.git

# Přechod do složky
cd Moerni-foto-editor

# Otevření v prohlížeči
# Stačí otevřít index.html v libovolném moderním prohlížeči
```

### Metoda 2: Lokální server

```bash
# Python 3
python -m http.server 8000

# Nebo Python 2
python -m SimpleHTTPServer 8000

# Poté otevřete: http://localhost:8000
```

### Metoda 3: Live Server (VS Code)

1. Nainstalujte rozšíření "Live Server" ve VS Code
2. Klikněte pravým tlačítkem na `index.html`
3. Vyberte "Open with Live Server"

---

## 💡 Použití

### Základní workflow:

1. **Nahrání obrázku**
   - Klikněte na "Vybrat soubor"
   - Vyberte obrázek (.jpg, .png, .gif, .bmp, .webp)

2. **Úprava parametrů**
   - Použijte slidery pro nastavení jasu, kontrastu, atd.
   - Změny se aplikují v reálném čase

3. **Export**
   - Otevřete panel exportu (📋 nebo 📑)
   - Vyberte požadované rozlišení
   - Obrázek se automaticky stáhne

### Tipy pro nejlepší výsledky:

- 🎯 Pro webové použití: Full HD (1920×1080)
- 🖥️ Pro desktop tapety: HD (1918×917) nebo 4K
- 🎮 Pro herní textury: Použijte kategorie "Herní textury"
- 📱 Pro mobilní zařízení: 768×1280

---

## 📐 Podporovaná rozlišení

### Kompletní seznam:

| Kategorie | Rozlišení | Poznámka |
|-----------|-----------|----------|
| **Desktop** | 1918×917 | Custom pro Lenovo IdeaPad Gaming 3 |
| **Full HD** | 1920×1080 | Standard HD |
| **4K UHD** | 3840×2160 | Ultra HD |
| **8K UHD** | 7680×4320 | Profesionální kvalita |
| **Infinix** | 4592×2016 | Ultra-wide formát |
| **Panorama** | 7632×1936 | Širokoúhlý formát |
| **Hra HD** | 800×600 | Klasické herní rozlišení |
| **Low Detail** | 486×253 | Pro optimalizaci výkonu |
| **Postavy** | 174×225 | Portrétní formát pro hry |
| **Ikony/Textury** | 16×16 až 768×1280 | Různé velikosti pro vývoj her |

---

## 🛠️ Technologie

### Frontend:

- **HTML5** - Struktura aplikace
- **CSS3** - Styling a responsivní design
- **JavaScript (ES6+)** - Logika aplikace

### Klíčové API:

- **Canvas API** - Manipulace s obrázky
- **FileReader API** - Načítání souborů
- **Blob API** - Export upravených obrázků

### Prohlížeče:

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

---

## 📁 Struktura projektu

```
Moerni-foto-editor/
│
├── index.html          # Hlavní HTML soubor
├── style.css           # Styling aplikace
├── script.js           # Hlavní JavaScript logika
├── README.md           # Projektová dokumentace
└── LICENSE             # Licenční soubor
```

### Popis souborů:

- **`index.html`** - Obsahuje strukturu aplikace, formuláře, panely a dropdown menu
- **`style.css`** - Star Trek themed design, responsivní layout, červeno-černá barevná schémata
- **`script.js`** - Logika pro úpravu obrázků, export, filtry a UI interakce

---

## 👨‍💻 Autoři

### Hlavní vývojář:
**Více Admirál Jiřík** - Koncept, design a vedení projektu

### Technická realizace:
**Admirál Claude.AI** - Vývoj core funkcí, HTML/CSS/JS implementace

### Speciální poděkování:
- **GitHub Community** - Za hosting a nástroje
- **Lenovo IdeaPad Gaming 3** - Vývojové prostředí

---

## 📊 Statistiky projektu

- **Verze:** 1.0.0
- **Počet řádků kódu:** ~800
- **Velikost projektu:** < 50 KB
- **Podporovaných formátů:** 6 (JPG, PNG, GIF, BMP, WEBP)
- **Dostupných rozlišení:** 20+
- **Parametrů úprav:** 6

---

## 🔧 Vývoj

### Spuštění vývojového prostředí:

```bash
# Klonování
git clone https://github.com/jirka22med/Moerni-foto-editor.git
cd Moerni-foto-editor

# Otevření v editoru (např. VS Code)
code .

# Spuštění lokálního serveru
python -m http.server 8000
```

### Debugging:

- Otevřete Developer Tools (F12)
- V konzoli uvidíte detailní logy všech operací
- Console obsahuje barevně zvýrazněné zprávy pro snadné debugování

---

## 🚀 Roadmap (Budoucí funkce)

- [ ] Podpora pro Drag & Drop nahrávání
- [ ] Batch processing (hromadné zpracování)
- [ ] Vlastní rozlišení (manual input)
- [ ] Filtry (černobílá, sepia, vintage)
- [ ] Rotace a ořez
- [ ] Uložení do cloudu
- [ ] PWA podpora (offline režim)
- [ ] Dark/Light mode přepínač

---

## 📄 License

Tento projekt je licencován pod **MIT License**.

```
MIT License

Copyright (c) 2026 Více Admirál Jiřík & Admirál Claude.AI

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🤝 Přispívání

Příspěvky jsou vítány! Pokud chcete přispět:

1. Forkněte projekt
2. Vytvořte feature branch (`git checkout -b feature/AmazingFeature`)
3. Commitněte změny (`git commit -m 'Add some AmazingFeature'`)
4. Pushněte do branch (`git push origin feature/AmazingFeature`)
5. Otevřete Pull Request

---

## 📞 Kontakt

**Více Admirál Jiřík**
- GitHub: [@jirka22med](https://github.com/jirka22med)
- Projekt: [Moderní Fotoeditor](https://github.com/jirka22med/Moerni-foto-editor)

---

## 🌟 Hvězdičky

Pokud se vám projekt líbí, dejte mu hvězdičku ⭐ na GitHubu!

---

**🖖 Live long and prosper!**

*Vytvořeno s láskou ke Star Treku a moderním webovým technologiím.*

---

*Poslední aktualizace: 02. 02. 2026* 
