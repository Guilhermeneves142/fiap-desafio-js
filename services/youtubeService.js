
class YoutubeService {
	constructor() {
		this.cache = new Set();
		this._API_KEY = "AIzaSyCbMuUH_-RKLJdNFY_m6DGYWCNFnPp6t_s"
	}

	getVideos() {
		const url = new URL("https://www.googleapis.com/youtube/v3/search")
		const queryParams = new URLSearchParams();

		queryParams.append("part","snippet")
		queryParams.append("type","video")
		queryParams.append("maxResults","50")

		
	}
}