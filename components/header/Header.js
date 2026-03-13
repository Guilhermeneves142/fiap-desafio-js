import youtubeService from "../../services/youtubeService.js";
import ListVideos from "../listVideos/listVideos.js";
import RankingWords from "../rankingWords/RankingWords.js";

class Header {
  constructor(parent) {
    this.parent = parent;
  }

  async render() {
    const response = await fetch("./components/header/Header.html");
    const html = await response.text();
    this.parent.insertAdjacentHTML("beforeend", html);

		document.getElementById('busca-form').addEventListener('submit', (event) => {
			this.handleSearch()
			event.preventDefault()
	});		
  }

	processDuration(data, durationItems) {
		return data.map(e => {
			return {
				...e,
				duration: this.formatDuration(durationItems.find(item => item.idVideo === e.id.videoId)?.duration)
			}
		})
	}	

	formatDuration(duration) {
		if (!duration || typeof duration !== 'string') return { text: '0:00', totalSeconds: 0, minutes: 0 };
		const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
		if (!match) return { text: '0:00', totalSeconds: 0, minutes: 0 };

		const h = parseInt(match[1]) || 0;
		const m = parseInt(match[2]) || 0;
		const s = parseInt(match[3]) || 0;
		const totalSeconds = h * 3600 + m * 60 + s;

		return {
			text: `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
			totalSeconds,
			minutes: Math.ceil(totalSeconds / 60)
		};
	}


	async handleSearch() {
		const palavraChave = document.getElementById('palavra_chave').value;
		const data = await youtubeService.getVideos(palavraChave);
		const durationItems = await youtubeService.getDurationsVideo(data.items.map(e => e.id.videoId));

		data.items = this.processDuration(data.items, durationItems);

		['#top5-palavras', '#videos', '#videos-por-dia'].forEach(sel => {
			this.parent.querySelector(sel)?.remove();
		});

		const rankingWords = new RankingWords(this.parent, data.items);
		await rankingWords.render();

		const listVideos = new ListVideos(this.parent, data.items);
		await listVideos.render();
	}		
}

export default Header;