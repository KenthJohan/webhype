let Tinatable = {};



Tinatable.update = (config, navstate) =>
{
	// Preconditions:
	console.assert(config.backend.fetcher_get instanceof Function);
	console.assert(config.backend.fetcher_get.length == 1);
	console.assert(config.backend.fetcher_set instanceof Function);
	console.assert(config.backend.fetcher_set.length == 3);
	
	let f = config.backend.fetcher_get(navstate[config.scope]);


	config.html.table = document.createElement("table");
	config.html.thead = thead_fill(config.scope, config.cols, Nav.cb_search);
	config.html.table.appendChild(config.html.thead);
	
	Promise.all([f]).then((responses) =>
	{
		let rows = responses[0];
		//console.log(rows);
		config.html.tbody = tbody_fill(rows);
		config.html.table.appendChild(config.html.tbody);
		config.html.target.appendChild(config.html.table);
	});
}

