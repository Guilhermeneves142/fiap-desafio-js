class ListVideos {
  constructor(parent, data) {
    this.data = data;
    this.parent = parent;
  }

  async render() {
    const response = await fetch("./components/listVideos/listVideos.html");
    const html = await response.text();
    this.parent.insertAdjacentHTML("beforeend", html);
    await this.populateVideos();
  }

  async populateVideos() {
    const videosContainer = document.querySelector('#videos ul');
    videosContainer.innerHTML = '';
    this.data.forEach(video => {
      const videoElement = document.createElement('li');
      videoElement.innerHTML = `
        <h3>${video.snippet.title}</h3>
        <p>${video.snippet.description}</p>
        <p>${video.duration.text}</p>
        <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.title}">
      `;
      videosContainer.appendChild(videoElement);
    });
  }
}

export default ListVideos;