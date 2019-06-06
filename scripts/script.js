function createCard(title, image, description, url, date) {
	return `<div class="card">
		<a href="${url}">
        <img src="${image}">
        <div class="card-content">
		<h4>${title}</h4>
		<p class="description">${description}</p>
		<p class="date">${date}</p>
        </div></a></div>`;
}

window.addEventListener('DOMContentLoaded', (event) => {
	fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@brillydev')
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				return Promise.reject(res);
			}
		})
		.then((data) => {
			const posts = data.items.filter(
				item => item.categories.length > 0
			);

			// parse JSON's HTML tag-filled description into raw text
			let toText = (node) => {
				let tag = document.createElement('div');
				tag.innerHTML = node;
				node = tag.innerText;
				return node;
			}

			// shorten title or description texts
			let shorten = (text, maxLength) => {
				return text.length > maxLength ? 
					text.slice(0, maxLength) + '...': 
					text;
			};
			
			// all the card stuff
			let cards = '';

			posts.forEach((item) => {
				let pubDate = new Date(Date.parse(item.pubDate.replace(/ /g, 'T')));
				let dateString = pubDate.toLocaleDateString(
					'default',
					{ year: 'numeric', month: 'long', day: 'numeric' }
				);
				
				// check for invalid dates
				dateString = dateString ? dateString : '';

				let card = createCard(
					shorten(item.title, 50),
					item.thumbnail,
					shorten(toText(item.description), 50),
					item.link,
					dateString
				);
				
				cards += card;
			});

			document.getElementById('scrolling-wrapper').innerHTML = cards;
		})
		.catch((err) => {
			console.log(err);
		});
});