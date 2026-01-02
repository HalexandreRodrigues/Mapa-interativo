// centro do mapa está definido para Pelotas.
const map = L.map('map', {
    minZoom: 13 // essa linha impede que o utilizador diminua o zoom para além deste nível
}).setView([-31.765, -52.341], 14);
// 2. camada de mapa do OpenStreetMap, essa linha é responsável por carregar o mapa de verdade.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// 3. limites da área do mapa (Bounding Box) usuário não conseguirá arrastar o mapa para fora desta área
const southWest = L.latLng(-31.81, -52.40);
const northEast = L.latLng(-31.72, -52.28);
const bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});


// DOM para o Slideshow
const slideshowModal = document.getElementById('slideshowModal');
const slamTitle = document.getElementById('slamTitle');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const imageCounter = document.getElementById('imageCounter');
const currentImage = document.getElementById('currentImage');

// estado do Slideshow
let currentImages = [];
let currentIndex = 0;

// funções do Slideshow
function openSlideshowModal(slamName, images) {
  slamTitle.textContent = slamName;
  currentImages = images;
  currentIndex = 0;
  showImage();
  slideshowModal.classList.add('active');
}

function closeSlideshowModal() {
  slideshowModal.classList.remove('active');
}

function showImage() {
  if (currentImages.length === 0) return;
  currentImage.src = currentImages[currentIndex];
  imageCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
}

function showNextImage() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage();
}

function showPrevImage() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage();
}

function createLabelMarker(lat, lng, labelText) {
	const icon = L.divIcon({
		className: '',
		html: `
			<div class="map-label-marker">
				<div class="label">${labelText}</div>
				<div class="pin"></div>
			</div>
		`,
		iconSize: [40, 40],
		iconAnchor: [20, 40]
	});

	return L.marker([lat, lng], { icon });
}


// --- Event Listeners para o Modal
closeBtn.addEventListener('click', closeSlideshowModal);
nextBtn.addEventListener('click', showNextImage);
prevBtn.addEventListener('click', showPrevImage);


// dados dos locais
const locais = [
  {
    name: "Dunas",
    coords: [-31.742351756284666, -52.31344161750255], // [Latitude, Longitude] - Exemplo
    line1: "REGISTROS FEITOS EM DUNAS – DATA (FOTÓGRAFO, ANO)",
    line2: "COM A PRESENÇA DE ARTISTA 1 E ARTISTA 2",
    images: ["fotos/dunas (1).jpg", "fotos/dunas (2).jpg", "fotos/dunas (3).jpg", "fotos/dunas (4).jpg", "fotos/dunas (5).jpg", "fotos/dunas (6).jpg", "fotos/dunas (7).jpg", "fotos/dunas (8).jpg", "fotos/dunas (9).jpg", "fotos/dunas (10).jpg", "fotos/dunas (11).jpg", "fotos/dunas (12).jpg", "fotos/dunas (13).jpg", "fotos/dunas (14).jpg", "fotos/dunas (15).jpg", "fotos/dunas (16).jpg", "fotos/dunas (17).jpg", "fotos/dunas (18).jpg", "fotos/dunas (19).jpg", "fotos/dunas (20).jpg", "fotos/dunas (21).jpg", "fotos/dunas (22).jpg", "fotos/dunas (23).jpg", "fotos/dunas (24).jpg", "fotos/dunas (25).jpg", "fotos/dunas (26).jpg", "fotos/dunas (27).jpg", "fotos/dunas (28).jpg", "fotos/dunas (29).jpg", "fotos/dunas (30).jpg", "fotos/dunas (31).jpg", "fotos/dunas (32).jpg", "fotos/dunas (33).jpg", "fotos/dunas (34).jpg", "fotos/dunas (35).jpg"]
  },
  {
    name: "PPP",
    coords: [-31.760513614630007, -52.3379252133571], // [Latitude, Longitude] - Exemplo
    line1: "REGISTROS FEITOS NO PPP – DATA (FOTÓGRAFO, ANO)",
    line2: "COM A PRESENÇA DE ARTISTA 3 E ARTISTA 4",
    images: ["fotos/PPP (1).jpg", "fotos/PPP (2).jpg", "fotos/PPP (3).jpg", "fotos/PPP (4).jpg", "fotos/PPP (5).jpg", "fotos/PPP (6).jpg", "fotos/PPP (7).jpg", "fotos/PPP (8).jpg", "fotos/PPP (9).jpg", "fotos/PPP (10).jpg", "fotos/PPP (11).jpg", "fotos/PPP (12).jpg", "fotos/PPP (13).jpg", "fotos/PPP (14).jpg", "fotos/PPP (15).jpg", "fotos/PPP (16).jpg", "fotos/PPP (17).jpg", "fotos/PPP (18).jpg", "fotos/PPP (19).jpg", "fotos/PPP (20).jpg", "fotos/PPP (21).jpg", "fotos/PPP (22).jpg", "fotos/PPP (23).jpg", "fotos/PPP (24).jpg", "fotos/PPP (25).jpg", "fotos/PPP (26).jpg", "fotos/PPP (27).jpg", "fotos/PPP (28).jpg", "fotos/PPP (29).jpg", "fotos/PPP (30).jpg", "fotos/PPP (31).jpg", "fotos/PPP (32).jpg", "fotos/PPP (33).jpg", "fotos/PPP (34).jpg", "fotos/PPP (35).jpg", "fotos/PPP (36).jpg", "fotos/PPP (37).jpg", "fotos/PPP (38).jpg", "fotos/PPP (39).jpg", "fotos/PPP (40).jpg", "fotos/PPP (41).jpg", "fotos/PPP (42).jpg", "fotos/PPP (43).jpg", "fotos/PPP (44).jpg", "fotos/PPP (45).jpg", "fotos/PPP (46).jpg", "fotos/PPP (47).jpg", "fotos/PPP (48).jpg", "fotos/PPP (49).jpg", "fotos/PPP (50).jpg", "fotos/PPP (51).jpg", "fotos/PPP (52).jpg", "fotos/PPP (53).jpg", "fotos/PPP (54).jpg", "fotos/PPP (55).jpg"]
  },
  {
    name: "SIMÕES LOPES",
    coords: [-31.774882705779714, -52.35321136486051], // [Latitude, Longitude] - Exemplo
    line1: "Registros feitos na Av. Brasil – Simões Lopes – Março,2025 (Pedro Bosquetti, 2025)",
    line2: "Com a presença de DMIXCHARMERAPPERS e DJ Renatinho.",
    images: ["fotos/sl1.jpg", "fotos/sl2.jpg", "fotos/sl3.jpg", "fotos/sl4.jpg", "fotos/sl5.jpg", "fotos/sl6.jpg", "fotos/sl7.jpg", "fotos/sl8.jpg", "fotos/sl9.jpg", "fotos/sl10.jpg", "fotos/sl11.jpg", "fotos/sl12.jpg", "fotos/sl13.jpg", "fotos/sl14.jpg", "fotos/sl15.jpg", "fotos/sl16.jpg", "fotos/sl17.jpg", "fotos/sl18.jpg", "fotos/sl19.jpg", "fotos/sl20.jpg", "fotos/sl21.jpg", "fotos/sl22.jpg", "fotos/sl23.jpg", "fotos/sl24.jpg", "fotos/sl25.jpg", "fotos/sl26.jpg"]
  },
   {
    name: "KILOMBO",
    coords: [-31.780023582189248, -52.3392844285183], // [Latitude, Longitude] - Exemplo
    line1: "REGISTROS FEITOS NO KILOMBO – DATA (FOTÓGRAFO, ANO)",
    line2: "COM A PRESENÇA DE ARTISTA 5 E ARTISTA 6",
    images: ["fotos/Kilombo (1).jpg", "fotos/Kilombo (2).jpg", "fotos/Kilombo (3).jpg", "fotos/Kilombo (4).jpg", "fotos/Kilombo (5).jpg", "fotos/Kilombo (6).jpg", "fotos/Kilombo (7).jpg", "fotos/Kilombo (8).jpg", "fotos/Kilombo (9).jpg", "fotos/Kilombo (10).jpg", "fotos/Kilombo (11).jpg", "fotos/Kilombo (12).jpg", "fotos/Kilombo (13).jpg", "fotos/Kilombo (14).jpg", "fotos/Kilombo (15).jpg"]
  },
  {
    name: "SLAM",
    coords: [-31.781497047514314, -52.336428674209884], // [Latitude, Longitude] - Exemplo
    line1: "REGISTROS FEITOS NO SLAM – DATA (FOTÓGRAFO, ANO)",
    line2: "COM A PRESENÇA DE ARTISTA 7 E ARTISTA 8",
    images: ["fotos/slam (1).jpg", "fotos/slam (2).jpg", "fotos/slam (3).jpg", "fotos/slam (4).jpg", "fotos/slam (5).jpg", "fotos/slam (6).jpg", "fotos/slam (7).jpg", "fotos/slam (8).jpg", "fotos/slam (9).jpg", "fotos/slam (10).jpg", "fotos/slam (11).jpg", "fotos/slam (12).jpg", "fotos/slam (13).jpg", "fotos/slam (14).jpg", "fotos/slam (15).jpg", "fotos/slam (16).jpg", "fotos/slam (17).jpg", "fotos/slam (18).jpg", "fotos/slam (19).jpg", "fotos/slam (20).jpg", "fotos/slam (21).jpg", "fotos/slam (22).jpg", "fotos/slam (23).jpg", "fotos/slam (24).jpg", "fotos/slam (25).jpg"]
  },
  {
    name: "NAVEGANTES",
    coords: [-31.768902443117835, -52.31916388267788], // [Latitude, Longitude] - Exemplo
    line1: "REGISTROS FEITOS EM NAVEGANTES – DATA (FOTÓGRAFO, ANO)",
    line2: "COM A PRESENÇA DE ARTISTA 9 E ARTISTA 10",
    images: ["fotos/navegantes1 (1).jpg", "fotos/navegantes1 (2).jpg", "fotos/navegantes1 (3).jpg", "fotos/navegantes1 (4).jpg", "fotos/navegantes1 (5).jpg", "fotos/navegantes1 (6).jpg", "fotos/navegantes1 (7).jpg", "fotos/navegantes1 (8).jpg", "fotos/navegantes1 (9).jpg", "fotos/navegantes1 (10).jpg", "fotos/navegantes1 (11).jpg", "fotos/navegantes1 (12).jpg", "fotos/navegantes1 (13).jpg", "fotos/navegantes1 (14).jpg", "fotos/navegantes1 (15).jpg", "fotos/navegantes1 (16).jpg", "fotos/navegantes1 (17).jpg", "fotos/navegantes1 (18).jpg", "fotos/navegantes1 (19).jpg", "fotos/navegantes1 (20).jpg", "fotos/navegantes1 (21).jpg", "fotos/navegantes1 (22).jpg", "fotos/navegantes1 (23).jpg", "fotos/navegantes1 (24).jpg", "fotos/navegantes1 (25).jpg", "fotos/navegantes1 (26).jpg", "fotos/navegantes1 (27).jpg", "fotos/navegantes1 (28).jpg", "fotos/navegantes1 (29).jpg", "fotos/navegantes1 (30).jpg"]
  },
];


const customIcon = L.icon({
  iconUrl: 'https://placehold.co/32x32/000000/FFFFFF?text=+',
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

// pins
locais.forEach(local => {
    const marker = createLabelMarker(local.coords[0], local.coords[1], local.name);

    // conteúdo HTML para o pop-up
    const popupContent = `
      <div class="custom-popup">
        <h3 class="popup-title">${local.name}</h3>
        <p class="popup-line1">${local.line1}</p>
        <p class="popup-line2">${local.line2}</p>
        <img src="${local.images[0]}" alt="Foto de destaque de ${local.name}" class="popup-image" style="cursor:pointer; width:100%;">
        <br><small>Clique na imagem para ver a galeria</small>
      </div>
    `;

    marker.bindPopup(popupContent);

    marker.on('popupopen', () => {
      const popupImage = document.querySelector('.popup-image');
      if (popupImage) {
        popupImage.addEventListener('click', () => {
          openSlideshowModal(local.name, local.images);
        });
      }
    });

    marker.addTo(map);
});