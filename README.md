# 🏖️ Muğla Büyükşehir Belediyesi - Halk Plajları

Bu proje, Muğla genelindeki halk plajlarının konumlarını ve özelliklerini harita üzerinde görselleştirmek amacıyla geliştirilmiştir. Amaç; vatandaşların erişilebilir, güvenli ve donanımlı plajlara kolayca ulaşabilmesini sağlamaktır.

## 🔍 Proje Özellikleri

- 📍 **Leaflet.js** tabanlı etkileşimli harita
- 🏷️ **Plaj Özellikleri:**
  - Mavi Bayrak durumu
  - Tuvalet, duş, soyunma kabini varlığı
  - Engelli erişimi
  - Cankurtaran hizmeti
- 🗺️ **İlçelere göre filtreleme** desteği
- 🎯 **Kullanıcı dostu** arayüz

## 📁 Klasör Yapısı

```
📂 proje-klasoru/
├── 📂 public/
│   ├── blue-flag.png
│   ├── restrooms.png
│   ├── shower.png...
├── 📂 js/
│   └── script.js
├── 📂 css/
│   └── style.css
├── 📄 index.html
└── 📄 README.md
```

## ⚙️ Kullanılan Teknolojiler

- **HTML5** - Sayfa yapısı
- **CSS3** - Stil ve tasarım
- **JavaScript (ES6+)** - Dinamik işlevsellik
- **Leaflet.js** - Harita kütüphanesi
- **Leaflet.markercluster** - Marker gruplama
- **JSON** - Veri sunumu ve yönetimi
- **OpenStreetMap** - Harita altyapısı
- **PostgreSQL** Veri sunumu

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Modern web tarayıcısı (Chrome, Firefox, Safari, Edge)
- İnternet bağlantısı (harita görüntüleri için)

### Adımlar
1. **Projeyi klonlayın:**
   ```bash
   git clone https://github.com/kullaniciadi/mugla-halk-plajlari.git
   cd mugla-halk-plajlari
   ```

2. **Dosyaları bir web sunucusunda çalıştırın:**
   ```bash
   # Python ile basit sunucu
   python -m http.server 8000
   
   # Node.js ile
   npx http-server
   
   # Live Server (VS Code eklentisi) kullanabilirsiniz
   ```

3. **Tarayıcıda açın:**
   ```
   http://localhost:8000
   ```

## 🎯 Özellik Açıklamaları

### 📍 Harita Özellikleri
- **Zoom seviyesi:** 7-18 arası
- **Merkez konum:** Muğla ili
- **Harita sağlayıcısı:** OpenStreetMap
- **Marker gruplama:** Yakın plajlar otomatik gruplanır

### 🏖️ Plaj Filtreleme
- İlçe bazında filtreleme
- Özellik bazında filtreleme (Mavi Bayrak, Engelli Erişimi vb.)
- Arama kutusu ile plaj adı arama

### 📱 Responsive Tasarım
- Mobil cihazlar için optimize edilmiş
- Tablet ve desktop uyumlu
- Touch-friendly kontroller

## 👩🏻‍💻 Zeynep Helin AYDIN

---

## 📱 Ekran Görüntüleri

<img width="1470" height="796" alt="image" src="https://github.com/user-attachments/assets/315c9ffb-3031-4b76-84e6-ebffd18a094d" />
<img width="1459" height="787" alt="image" src="https://github.com/user-attachments/assets/0695046b-d139-40e0-ae6a-72853798421a" />
<img width="1468" height="797" alt="image" src="https://github.com/user-attachments/assets/fc10e0b4-146d-4610-a959-5ca391cf72dc" />
<img width="1470" height="799" alt="image" src="https://github.com/user-attachments/assets/c4a4469f-5c1d-4ef2-a2e7-73167beca53c" />
<img width="1470" height="365" alt="image" src="https://github.com/user-attachments/assets/bad84e76-2c0d-4afe-ab90-5736ca2ae4be" />






