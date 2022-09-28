let Tinatable = {};




Tinatable.init = (config) =>
{
	// Preconditions:
	console.assert(config.backend.fetcher_get instanceof Function);
	console.assert(config.backend.fetcher_get.length == 2);
	console.assert(config.backend.fetcher_set instanceof Function);
	console.assert(config.backend.fetcher_set.length == 3);

	config.html.table = document.createElement("table");

	let cols = config.meta.collections["KEYWORDS"];
	config.html.thead = thead_fill(config.scope, cols, Nav.cb_search);
	config.html.table.appendChild(config.html.thead);


	let count = 0;
	let cursor = 0;
	let f = config.backend.fetcher_get(count, cursor);
	Promise.all([f]).then((responses) =>
	{
		let rows = responses[0];
		//console.log(rows);
		config.html.tbody = tbody_fill(rows);
		config.html.table.appendChild(config.html.tbody);
		config.html.target.appendChild(config.html.table);
	});
}

