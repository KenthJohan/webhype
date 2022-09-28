let Tinatable = {};




Tinatable.init = (config) =>
{
	// Preconditions:
	console.assert(config.backend.get instanceof Function);
	console.assert(config.backend.get.length == 2);
	console.assert(config.backend.set instanceof Function);
	console.assert(config.backend.set.length == 3);
	// Store all HTML elements here:
	config.html.table = document.createElement("table");
	// Request data from backend:
	let count = 0;
	let cursor = 0;
	let f = config.backend.get(count,cursor);
	Promise.all([f]).then((responses) =>
	{
		let rows = responses[0];
		//console.log(rows);
		config.html.thead = {};
		thead_fill(config.scope, config.html.thead, Object.keys(rows[0]), Nav.cb_search);
		config.html.tbody = tbody_fill(rows);
		config.html.table.appendChild(config.html.thead.thead);
		config.html.table.appendChild(config.html.tbody);
		config.html.target.appendChild(config.html.table);
	});
}

