const API_KEY = '';

const button = document.getElementById('buscar');

button.addEventListener('click', () => getData());

async function getData(listaDeVideos = [], pagina = null) {
	const palavraChave = document.getElementById('palavra_chave').value;

	const response = await fetch(
		`https://www.googleapis.com/youtube/v3/search?` +
		`part=snippet` +
		`&q=${encodeURIComponent(palavraChave)}` +
		`&type=video` +
		`&maxResults=50` +
		(pagina ?`&pageToken=${pagina}`: '') +
		`&key=${API_KEY}`
	);

	const data = await response.json()

	if (data.error) {
		console.error('Erro da API:', data.error);
		alert('Erro: ' + (data.error.message || 'Verifique sua API key'));
		return;
	}

	listaDeVideos.push(...data.items);

	if (listaDeVideos.length < 25 && data.nextPageToken)
		return getData(listaDeVideos, data.nextPageToken);

	const videosFinais = listaDeVideos.slice(0, 25);

	populateVideos(videosFinais);
}

function extrairTop5Palavras(videos) {
	const contagem = new Map();

	const texto = videos
		.map(v => `${v.snippet?.title || ''} ${v.snippet?.description || ''}`)
		.join(' ')
		.toLowerCase()
		.split(" ")
		.filter(p => p.length > 2 && !p.startsWith("#"));

	texto.forEach(palavra => {
		contagem.set(palavra, (contagem.get(palavra) || 0) + 1);
	});

	return [...contagem.entries()]
		.sort((a, b) => b[1] - a[1])
		.slice(0, 5)
		.map(([palavra, count]) => ({ palavra, count }));
}

function populateVideos(videos) {
	const top5 = extrairTop5Palavras(videos);
	const top5El = document.getElementById('top5-palavras');
	if (top5El) {
		top5El.innerHTML = `
			<h3>Top 5 palavras</h3>
			<ul>${top5.map(({ palavra, count }) => `<li><strong>${palavra}</strong>: ${count}x</li>`).join('')}</ul>
		`;
	}

	const videosContainer = document.querySelector('#videos ul');
	videosContainer.innerHTML = '';
	videos.forEach(video => {
		const videoElement = document.createElement('li');
		const duracao = video.durationMinutes != null ? `${video.durationMinutes} min` : '—';
		videoElement.innerHTML = `
			<h3>${video.snippet.title}</h3>
			<p><strong>Duração:</strong> ${duracao}</p>
			<p>${video.snippet.description}</p>
			<img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
		`;
		videosContainer.appendChild(videoElement);
	});
}