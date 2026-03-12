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

		document.getElementById('buscar').addEventListener('click', this.handleSearch.bind(this));		
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
		const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
		if(!match) return '00:00:00';

		const h = parseInt(match[1]) || 0;
		const m = parseInt(match[2]) || 0;
		const s = parseInt(match[3]) || 0;

		return {
			text: `${h}:${m}:${s}`,
			totalSeconds: h * 3600 + m * 60 + s
		};
	}

	async handleSearch() {
		const palavraChave = document.getElementById('palavra_chave').value;
		const data = await youtubeService.getVideos(palavraChave);
		const durationItems = await youtubeService.getDurationsVideo(data.items.map(e => e.id.videoId));

		data.items = this.processDuration(data.items, durationItems);

		const rankingWords = new RankingWords(this.parent, data.items);
		await rankingWords.render();

		const listVideos = new ListVideos(this.parent, data.items);
		await listVideos.render();

	}		
}

export default Header;