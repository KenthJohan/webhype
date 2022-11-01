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
		// Removes the element from the DOM.
		config.html.table.remove();
	}

	if (!navstate)
	{
		return;
	}


	config.html.table = document.createElement("table");
	let components = navstate.o; // Get sequence of components
	config.html.thead = thead_fill(config.scope, components, Nav.cb_search, Global.navstate);
	config.html.table.appendChild(config.html.thead);


	

	config.prom = config.backend.fetcher_get(navstate).then((r) =>
	{
		//console.log("Fetched: ", r);
		navstate.p = r.cursor;
		Global.setnav(navstate, false);
		config.html.tbody = tbody_fill(config.scope, r.rows, components);
		config.html.table.appendChild(config.html.tbody);
	});

	// Add element to the DOM
	config.html.target.appendChild(config.html.table);
}

