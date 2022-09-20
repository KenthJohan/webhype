

function thead_fill(scope, result, cols)
{
	result.thead = document.createElement("thead");
	result.a = [document.createElement("a"),document.createElement("a"),document.createElement("a")];
	let tr = document.createElement("tr");
	result.thead.appendChild(tr);
	for(c in cols)
	{
		let th = document.createElement("th");
		tr.appendChild(th);
		{
			result.a[c].dec = document.createElement("a");
			result.a[c].ign = document.createElement("a");
			result.a[c].asc = document.createElement("a");
			result.a[c].dec.setAttribute("col", cols[c]);
			result.a[c].ign.setAttribute("col", cols[c]);
			result.a[c].asc.setAttribute("col", cols[c]);
			result.a[c].dec.setAttribute("order", -1);
			result.a[c].ign.setAttribute("order", 0);
			result.a[c].asc.setAttribute("order", 1);
			result.a[c].dec.setAttribute("scope", scope);
			result.a[c].ign.setAttribute("scope", scope);
			result.a[c].asc.setAttribute("scope", scope);
			let div1 = document.createElement("div");
			let input = document.createElement("input");
			let div2 = document.createElement("div");
			th.appendChild(div1);
			th.appendChild(input);
			th.appendChild(div2);
			div2.appendChild(result.a[c].dec);
			div2.appendChild(result.a[c].ign);
			div2.appendChild(result.a[c].asc);
			div1.innerText = cols[c];
			result.a[c].dec.innerText = "DESC";
			result.a[c].ign.innerText = "Neutral";
			result.a[c].asc.innerText = "ASC";
		}
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



