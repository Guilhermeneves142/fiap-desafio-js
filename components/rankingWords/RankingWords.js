class RankingWords {
  constructor(parent, data) {
    this.data = data;
    this.parent = parent;
  }

  async render() {
    const response = await fetch("./components/rankingWords/RankingWords.html");
    const html = await response.text();
    this.parent.insertAdjacentHTML("beforeend", html);
    this.populateTop5Palavras(this.data);
  }

  extrairTop5Palavras(videos) {
		const contagem = new Map();

		const texto = videos
			.map(v => `${v.snippet?.title || ''} ${v.snippet?.description || ''}`)
			.join(' ')
			.toLowerCase()
			.split(" ")
			.filter(p => p.length > 2 && !p.startsWith("#") && !p.includes('...'));

		texto.forEach(palavra => {
			contagem.set(palavra, (contagem.get(palavra) || 0) + 1);
		});

		return [...contagem.entries()]
			.sort((a, b) => b[1] - a[1])
			.slice(0, 5)
			.map(([palavra, count]) => ({ palavra, count }));	
	}

	populateTop5Palavras(videos) {
		const top5 = this.extrairTop5Palavras(videos);
		const top5El = document.getElementById('top5-palavras');
		if (top5El) {
			top5El.innerHTML = `
				<h3>Top 5 palavras</h3>
				<ul>${top5.map(({ palavra, count }) => `<li><strong>${palavra}</strong>: ${count}x</li>`).join('')}</ul>
			`;
		}
	}
}

export default RankingWords;
