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
		console.assert(config.html.table instanceof HTMLTableElement);
		// Removes the element from the DOM.
		config.html.table.remove();
	}

	if (!navstate)
	{
		return;
	}

	config.html.table = document.createElement("table");
	config.prom = config.backend.fetcher_get(navstate).then((r) =>
	{
		navstate.p = r.cursor;
		let components = navstate.o; // Get sequence of components
		config.html.thead = thead_fill(config.scope, components, Nav.cb_search, Global.navstate);
		config.html.tbody = tbody_fill(config.scope, r.rows, components);
		config.html.table.appendChild(config.html.thead);
		config.html.table.appendChild(config.html.tbody);
	});

	// Add element to the DOM
	config.html.target.appendChild(config.html.table);
}

