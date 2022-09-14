function thead_fill(cols)
{
	let thead = document.createElement("thead");
	let tr = document.createElement("tr");
	thead.appendChild(tr);
	for(c in cols)
	{
		let th = document.createElement("th");
		th.innerText = cols[c];
		tr.appendChild(th);

	}
	return thead;
}

function tbody_fill(rows)
{
	let tbody = document.createElement("tbody");
	for(r in rows)
	{
		let row = rows[r];
		let tr = document.createElement("tr");
		for(c in row)
		{
			let td = document.createElement("td");
			td.innerText = row[c];
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	return tbody;
}


function Tinatable_init(config)
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
		config.html.thead = thead_fill(Object.keys(rows[0]));
		config.html.tbody = tbody_fill(rows);
		config.html.table.appendChild(config.html.tbody);
		config.html.table.appendChild(config.html.thead);
		config.html.target.appendChild(config.html.table);
	});
}













let Global = {};
Global.API_meta1 = fetch('meta1.json').then(r => r.json());
Global.API_requestor_fetch = async (count, cursor) =>
{
	return fetch('/api1/baja').then(r => r.json());
}
Global.API_requestor_update = (ids, count, cursor) =>
{

}





Global.table1 = 
{
	html: {target: document.body},
	// Callback for fetching new data from backend
	API_requestor_fetch: Global.API_requestor_fetch,
	// Callback for updating data in backend
	API_requestor_update: Global.API_requestor_update,
};

Promise.all([Global.API_meta1]).then((x) =>
{
	console.log(x[0]);
	// Value type information is used to present data in correct graphics:
	Global.table1.meta = x[0];
	Tinatable_init(Global.table1);
});

