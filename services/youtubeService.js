
class YoutubeService {
	constructor() {
		this.cache = new Map();
		this._API_KEY = null;
		this.init()
	}

	async init(){
		this._API_KEY = await this._getApiKey()
	}

	async _getApiKey() {
		const response = await fetch("environment.json")
		const data = await response.json()

		return data.GOOGLE_API_KEY
	}

	_getCache(key){
		return this.cache.get(key)
	}

	_setCache(key,value){
		this.cache.set(key,value)
	}

	async getVideos(search, page = null) {
		const keyCache = "getVideos"+search+page
		const cache = this._getCache(keyCache);
		if(cache) return cache;
		
		const url = new URL("https://www.googleapis.com/youtube/v3/search")
		const queryParams = new URLSearchParams();

		queryParams.append("part","snippet")
		queryParams.append("type","video")
		queryParams.append("maxResults","50")
		queryParams.append("key",this._API_KEY)
		queryParams.append("q",search)
		page && queryParams.append("pageToken",page)

		url.search = queryParams.toString();

		const response = await fetch(url.toString())

		const data = await response.json();

		if (data.error) throw new Error(data.error.message);

		this._setCache(keyCache,data)

		return data
	}

	async getDurationsVideo(idVideos) {

		const keyCache = "getDurationsVideo" + idVideos.join(',');
		const cache = this._getCache(keyCache);
		if (cache) return cache;

		const url = new URL("https://www.googleapis.com/youtube/v3/videos")
		const queryParams = new URLSearchParams();

		const idsStr = idVideos.join(',');

		queryParams.append("id",idsStr)
		queryParams.append("part","contentDetails")
		queryParams.append("key",this._API_KEY)

		url.search = queryParams.toString();

		const response = await fetch(url.toString())

		const data = await response.json();

		if (data.error) throw new Error(data.error.message);

		const result = (data.items || []).map(e => {
			return {
				idVideo: e.id,
				duration: e.contentDetails.duration
			}
		})

		this._setCache(keyCache,result)

		return result
	}
}

export default new YoutubeService()