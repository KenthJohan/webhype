let Tinatable = {};

Tinatable.init = (config) =>
{
	// Preconditions:
	console.assert(config.API_requestor_fetch instanceof Function);
	console.assert(config.API_requestor_fetch.length == 2);
	console.assert(config.API_requestor_update instanceof Function);
	console.assert(config.API_requestor_update.length == 3);
	// Store all HTML elements here:
	config.html.table = document.createElement("table");
	// Request data from backend:
	Promise.all([config.API_requestor_fetch(null,null)]).then((responses) =>
	{
		let rows = responses[0];
		//console.log(rows);
		config.html.thead = thead_fill(Object.keys(rows[0]), config.nav);
		config.html.tbody = tbody_fill(rows);
		config.html.table.appendChild(config.html.tbody);
		config.html.table.appendChild(config.html.thead);
		config.html.target.appendChild(config.html.table);
	});
}
