

function tablemon(config)
{
	let table = document.createElement("table");
	let thead = document.createElement("thead");
	config.tbody = document.createElement("tbody");



	{
		let tr = document.createElement("tr");
		for(let c = 0; c < config.size[1]; ++c)
		{
			let th = document.createElement("th");
			th.innerText = config.thead[c];
			tr.appendChild(th);
		}
		thead.appendChild(tr);
	}


	for(let r = 0; r < config.size[0]; ++r)
	{
		let tr = document.createElement("tr");
		config.tbody.appendChild(tr);
	}

	for(let i = 0; i < config.size[0]*config.size[1]; ++i)
	{
		let td = document.createElement("td");
		td.innerText = i;
		config.html_mat.push(td);
	}

	for(let c = 0; c < config.size[1]; ++c)
	{
		for(let r = 0; r < config.size[0]; ++r)
		{
			// Standard column major, rows * cols.
			let td = config.html_mat[c*config.size[0] + r];
			config.tbody.children[r].appendChild(td);
		}
	}

	console.log(config.html_mat);
	table.appendChild(thead);
	table.appendChild(config.tbody);
	return table;
}


function tablemon_add_column(config)
{
	for(let tr of config.tbody.children)
	{
		let td = document.createElement("td");
		td.innerText = "a";
		config.html_mat.push(td);
		tr.appendChild(td);
	}
}



let config = 
{
	thead: ["column1", "column2", "column3"],
	html_rows: [],
	html_mat: [],
	size: [2, 3], // 2 rows and 3 columns
	datac: 
	[
		["c1", "c1"],  // Column 1
		["c2", "c2"],  // Column 2
		["c3", "c3"],  // Column 3
	]
};
let t = tablemon(config);
tablemon_add_column(config);

document.body.appendChild(t);