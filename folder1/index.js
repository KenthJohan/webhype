function tablemon_add_column(config, name, data)
{
	let th = document.createElement("th");
	th.innerText = name;
	config.thead.children[0].appendChild(th);
	for(let tr of config.tbody.children)
	{
		let td = document.createElement("td");
		td.innerText = "a";
		config.html_mat.push(td);
		tr.appendChild(td);
	}
}

function tablemon(config)
{
	let table = document.createElement("table");
	config.thead = document.createElement("thead");
	config.tbody = document.createElement("tbody");
	{
		let tr = document.createElement("tr");
		config.thead.appendChild(tr);
	}
	for(let r = 0; r < config.size[0]; ++r)
	{
		let tr = document.createElement("tr");
		config.tbody.appendChild(tr);
	}
	for(let c = 0; c < config.size[1]; ++c)
	{
		tablemon_add_column(config, config.columns[c], config.datac[c]);
	}
	console.log(config.html_mat);
	table.appendChild(config.thead);
	table.appendChild(config.tbody);
	return table;
}






let config = 
{
	columns: ["column1", "column2", "column3"],
	html_rows: [], // Contains body <tr> rows
	html_mat: [], // Contains body <td> cells in column major
	size: [2, 3], // 2 rows and 3 columns
	datac: 
	[
		["c1", "c1"],  // Column 1
		["c2", "c2"],  // Column 2
		["c3", "c3"],  // Column 3
	]
};


let t = tablemon(config);
tablemon_add_column(config, "a", null);
tablemon_add_column(config, "b", null);

document.body.appendChild(t);