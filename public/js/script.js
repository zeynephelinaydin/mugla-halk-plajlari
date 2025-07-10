document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([37.0, 28.0], 8);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap katkıcıları",
  }).addTo(map);

  const markers = L.markerClusterGroup();
  let allPlajlar = [];
  let filteredPlajlar = [];

  function normalize(str) {
    return str
      .toLowerCase()
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ş/g, "s")
      .replace(/ü/g, "u");
  }

  function isAnyFilterActive() {
    const ilce = document.getElementById("ilceSelect").value.trim();
    const search = document.getElementById("plajSearch").value.trim();
    const selectedFeatures = document.querySelectorAll(".checkbox-group input[type='checkbox']:checked");
    return ilce || search || selectedFeatures.length > 0;
  }

  loadPlajData();

  document.getElementById("ilceSelect").addEventListener("change", applyFilters);
  document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", applyFilters);
  });

  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("ilceSelect").value = "";
    document.getElementById("plajSearch").value = "";
    document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach(cb => cb.checked = false);
    applyFilters();
  });

  document.getElementById("plajSearchBtn").addEventListener("click", applyFilters);
  document.getElementById("plajSearch").addEventListener("keydown", (e) => {
    if (e.key === "Enter") applyFilters();
  });

  map.on("moveend", () => {
    if (!isAnyFilterActive()) {
      const bounds = map.getBounds();
      filteredPlajlar = allPlajlar.filter(plaj => bounds.contains([plaj.lat, plaj.lon]));
      updateDisplay();
    }
  });

  async function loadIlceler() {
    try {
      const response = await fetch("http://localhost:3000/api/plajlar/ilceler");
      const ilceler = await response.json();
      const ilceSelect = document.getElementById("ilceSelect");
      ilceSelect.innerHTML = '<option value="">Tümü</option>';
      ilceler.sort((a, b) => a.localeCompare(b, "tr")).forEach(ilce => {
        const option = new Option(ilce.trim(), ilce.trim());
        ilceSelect.add(option);
      });
    } catch (err) {
      console.error("İlçeler yüklenemedi:", err);
    }
  }

  async function loadPlajData() {
    try {
      await loadIlceler();
      const response = await fetch("http://localhost:3000/api/plajlar");
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Veri formatı hatalı");
      allPlajlar = data.sort((a, b) => a.ilce.localeCompare(b.ilce, "tr"));
      filteredPlajlar = [...allPlajlar];
      updateDisplay();
    } catch (err) {
      console.error("Plaj verisi alınamadı:", err);
      document.getElementById("plajListesi").innerHTML = `<div class="error">Veri yüklenemedi: ${err.message}</div>`;
    }
  }

  function applyFilters() {
    const searchQuery = normalize(document.getElementById("plajSearch").value.trim());
    const selectedIlce = document.getElementById("ilceSelect").value.trim();
    const selectedFeatures = Array.from(
      document.querySelectorAll(".checkbox-group input[type='checkbox']:checked")
    ).map(cb => cb.name);

    filteredPlajlar = allPlajlar.filter(plaj => {
      if (selectedIlce && normalize(plaj.ilce.trim()) !== normalize(selectedIlce)) return false;
      for (const feature of selectedFeatures) {
        if (!plaj[feature]) return false;
      }
      if (searchQuery && !normalize(plaj.isim).includes(searchQuery)) return false;
      return true;
    });

    const noResultsDiv = document.getElementById("noResultsMessage");
    noResultsDiv.style.display = filteredPlajlar.length === 0 ? "block" : "none";
    updateDisplay();
  }

  function updateDisplay() {
    addAllMarkersToMap(filteredPlajlar);
    renderList(filteredPlajlar);
  }

  function addAllMarkersToMap(plajlar) {
    markers.clearLayers();
    plajlar.forEach(plaj => {
      const marker = L.marker([plaj.lat, plaj.lon]);
      const popupContent = `
        <b>${plaj.isim}</b><br>İlçe: ${plaj.ilce}<br><br>
        <ul style="line-height:1.8; padding-left:0; list-style:none;">
          <li>Mavi Bayrak: ${plaj.mavi_bayrak ? "Var" : "Yok"}</li>
          <li>Engelsiz Erişim: ${plaj.engelsiz ? "Var" : "Yok"}</li>
          <li>Tuvalet: ${plaj.tuvalet ? "Var" : "Yok"}</li>
          <li>Duş: ${plaj.dus ? "Var" : "Yok"}</li>
          <li>Giyinme Kabini: ${plaj.giyinme ? "Var" : "Yok"}</li>
          <li>Cankurtaran: ${plaj.cankurtaran ? "Var" : "Yok"}</li>
        </ul>`;
      marker.bindPopup(popupContent);
      markers.addLayer(marker);
    });
    map.addLayer(markers);
  }

  function renderList(plajlar) {
    const plajListesi = document.getElementById("plajListesi");
    plajListesi.innerHTML = "";

    plajlar.forEach(plaj => {
      const div = document.createElement("div");
      div.className = "plaj-kart";
      div.innerHTML = `
        <h3>${plaj.isim}</h3>
        <p>İlçe: ${plaj.ilce}</p>
        <div class="ikonlar">
          ${getIconHTML("mavi_bayrak", plaj.mavi_bayrak)}
          ${getIconHTML("engelsiz", plaj.engelsiz)}
          ${getIconHTML("tuvalet", plaj.tuvalet)}
          ${getIconHTML("dus", plaj.dus)}
          ${getIconHTML("giyinme", plaj.giyinme)}
          ${getIconHTML("cankurtaran", plaj.cankurtaran)}
        </div>`;
      div.onclick = () => {
        map.setView([plaj.lat, plaj.lon], 15);
        markers.eachLayer(marker => {
          const mLatLng = marker.getLatLng();
          if (mLatLng.lat === plaj.lat && mLatLng.lng === plaj.lon) {
            marker.openPopup();
          }
        });
      };
      plajListesi.appendChild(div);
    });
  }

  function getIconHTML(key, value) {
    if (!value) return "";
    const icons = {
      mavi_bayrak: "assets/blue-flag.png",
      engelsiz: "assets/wheelchair.png",
      tuvalet: "assets/restrooms.png",
      dus: "assets/shower.png",
      giyinme: "assets/changing-room.png",
      cankurtaran: "assets/lifeguard.png",
    };
    return `<img src="${icons[key]}" class="ikon" title="${key}" alt="${key}">`;
  }
});
