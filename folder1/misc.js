function html_selection(scope)
{
	let e = [document.createElement("th"),document.createElement("th"),document.createElement("th")];
	let box = document.createElement("input");
	box.type = "checkbox";
	box.onchange = event =>
	{
		const q = document.querySelectorAll(`input[scope="${scope}"][col="$s"][type="checkbox"]`);
		q.forEach((item) => {
			item.checked = event.target.checked;
			console.log(item);
		});
	};
	e[2].appendChild(box);
	return e;
}

function html_order(scope, c)
{
	let th = document.createElement("th");
	let a = [document.createElement("a"),document.createElement("a"),document.createElement("a")];
	a[0].setAttribute("col", c);
	a[1].setAttribute("col", c);
	a[2].setAttribute("col", c);
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
	return th;
}


function html_filter(scope, c, search_cb, search_arg)
{
	let th = document.createElement("th");
	let input = document.createElement("input");
	input.setAttribute("col", c);
	input.setAttribute("scope", scope);
	//input.addEventListener('change', cb_search);
	input.addEventListener("keypress", (event) => {
		if (event.key === "Enter")
		{
			search_cb(event, search_arg);
		}
	});
	th.appendChild(input);
	return th;
}

function html_name(c)
{
	let th = document.createElement("th");
	th.innerText = c;
	return th;
}


function thead_fill(scope, components, search_cb, search_arg)
{
	console.assert(Array.isArray(components));
	let thead = document.createElement("thead");
	let tr = [document.createElement("tr"),document.createElement("tr"),document.createElement("tr")];
	thead.appendChild(tr[0]);
	thead.appendChild(tr[1]);
	thead.appendChild(tr[2]);

	// Callback for HTML column header:
	let g = 
	{
		"$s" : html_selection
	};

	for(c of components)
	{
		let thv = null;
		if (g[c] instanceof Function)
		{
			thv = html_selection(scope);
		}
		else
		{
			thv = [html_name(c), html_order(scope, c), html_filter(scope, c, search_cb, search_arg)];
		}
		//console.log(thv);
		thv[0].setAttribute("col", c);
		tr[0].appendChild(thv[0]);
		tr[1].appendChild(thv[1]);
		tr[2].appendChild(thv[2]);
	}
	return thead;
}


function default_checkbox(value)
{
	let e = document.createElement("td");
	e.innerText = value;
	return e;
}


function special_checkbox(scope, component)
{
	console.log(component);
	let td = document.createElement("td");
	let e = document.createElement("input");
	e.setAttribute("scope", scope);
	e.setAttribute("col", component);
	e.type = "checkbox";
	td.appendChild(e);
	return td;
}


function tbody_fill(scope, rows, cols)
{
	console.assert(Array.isArray(rows));
	console.assert(Array.isArray(cols));
	
	let g = 
	{
		"$s" : special_checkbox
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
				e = g[c](scope, c);
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


