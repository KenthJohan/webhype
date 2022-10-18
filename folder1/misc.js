

function thead_fill(scope, cols, search_cb, search_arg)
{
	console.assert(Array.isArray(cols));

	let thead = document.createElement("thead");
	let tr = [document.createElement("tr"),document.createElement("tr"),document.createElement("tr")];
	thead.appendChild(tr[0]);
	thead.appendChild(tr[1]);
	thead.appendChild(tr[2]);
	
	for(c in cols)
	{
		let th = document.createElement("th");
		th.innerText = cols[c];
		tr[0].appendChild(th);
	}

	for(c in cols)
	{
		let th = document.createElement("th");
		let a = [document.createElement("a"),document.createElement("a"),document.createElement("a")];
		a[0].setAttribute("col", cols[c]);
		a[1].setAttribute("col", cols[c]);
		a[2].setAttribute("col", cols[c]);
		a[0].setAttribute("order", -1);
		a[1].setAttribute("order", 0);
		a[2].setAttribute("order", 1);
		a[0].setAttribute("scope", scope);
		a[1].setAttribute("scope", scope);
		a[2].setAttribute("scope", scope);
		a[0].innerText = "Descending";
		a[1].innerText = "Order";
		a[2].innerText = "Ascending";
		th.appendChild(a[0]);
		th.appendChild(a[1]);
		th.appendChild(a[2]);
		tr[1].appendChild(th);
	}
	
	for(c in cols)
	{
		let th = document.createElement("th");
		let input = document.createElement("input");
		input.setAttribute("col", cols[c]);
		input.setAttribute("scope", scope);
		//input.addEventListener('change', cb_search);
		input.addEventListener("keypress", (event) => {
			if (event.key === "Enter")
			{
				search_cb(event, search_arg);
			}
		});


		th.appendChild(input);
		tr[2].appendChild(th);
	}

	return thead;
}


function default_checkbox(value)
{
	let e = document.createElement("td");
	e.innerText = value;
	return e;
}


function special_checkbox(value)
{
	let e = document.createElement("input");
	e.type = "checkbox";
	return e;
}


function tbody_fill(rows, cols)
{
	console.assert(Array.isArray(rows));
	console.assert(Array.isArray(cols));
	
	let g = 
	{
		"$checkbox" : special_checkbox
	};

	let tbody = document.createElement("tbody");
	for(r in rows)
	{
		let row = rows[r];
		let tr = document.createElement("tr");
		for(c of cols)
		{
			let e = null;
			if (g[c] instanceof Function)
			{
				e = g[c](row[c]);
			}
			else
			{
				e = document.createElement("td");
				e.innerText = row[c];
			}
			tr.appendChild(e);
		}
		tbody.appendChild(tr);
	}
	return tbody;
}


function input_search(html_input)
{
	console.assert(html_input instanceof HTMLInputElement);
	html_input.addEventListener('change', (e) =>{
		console.log(e.currentTarget.value);
	});
}


