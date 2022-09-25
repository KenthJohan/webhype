

function thead_fill(scope, result, cols, cb_search)
{
	result.thead = document.createElement("thead");
	let tr = document.createElement("tr");
	result.thead.appendChild(tr);
	for(c in cols)
	{
		let th = document.createElement("th");
		let div = document.createElement("div");
		let a = [document.createElement("a"),document.createElement("a"),document.createElement("a")];
		let div1 = document.createElement("div");
		let input = document.createElement("input");
		let div2 = document.createElement("div");
		input.setAttribute("col", cols[c]);
		input.setAttribute("scope", scope);
		input.addEventListener('change', cb_search);
		a[0].setAttribute("col", cols[c]);
		a[1].setAttribute("col", cols[c]);
		a[2].setAttribute("col", cols[c]);
		a[0].setAttribute("order", -1);
		a[1].setAttribute("order", 0);
		a[2].setAttribute("order", 1);
		a[0].setAttribute("scope", scope);
		a[1].setAttribute("scope", scope);
		a[2].setAttribute("scope", scope);
		div1.innerText = cols[c];
		a[0].innerText = "DESC";
		a[1].innerText = "Neutral";
		a[2].innerText = "ASC";
		div.appendChild(div1);
		div.appendChild(input);
		div.appendChild(div2);
		div2.appendChild(a[0]);
		div2.appendChild(a[1]);
		div2.appendChild(a[2]);
		th.appendChild(div);
		tr.appendChild(th);
	}
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


function input_search(html_input)
{
	console.assert(html_input instanceof HTMLInputElement);
	html_input.addEventListener('change', (e) =>{
		console.log(e.currentTarget.value);
	});
}


