let Tinatable = {};

Tinatable.update = (config, navstate) =>
{
	// Preconditions:
	// navstate is readonly
	console.assert(config.backend.fetcher_get instanceof Function);
	console.assert(config.backend.fetcher_get.length == 1);
	console.assert(config.backend.fetcher_set instanceof Function);
	console.assert(config.backend.fetcher_set.length == 3);

	if (config.html.table)
	{
		config.html.table.remove();
	}

	if (!navstate)
	{
		return;
	}


	config.html.table = document.createElement("table");
	let cols = navstate.o;
	config.html.thead = thead_fill(config.scope, cols, Nav.cb_search, Global.navstate);
	config.html.table.appendChild(config.html.thead);


	
	let f = config.backend.fetcher_get(navstate);
	Promise.all([f]).then((responses) =>
	{
		let rows = responses[0];
		//console.log(rows);
		config.html.tbody = tbody_fill(rows);
		config.html.table.appendChild(config.html.tbody);
		config.html.target.appendChild(config.html.table);
	});
}

