

function thead_fill(scope, result, cols)
{
	result.thead = document.createElement("thead");
	let a = [document.createElement("a"),document.createElement("a"),document.createElement("a")];
	let tr = document.createElement("tr");
	result.thead.appendChild(tr);
	for(c in cols)
	{
		let th = document.createElement("th");
		tr.appendChild(th);
		{
			a[c].dec = document.createElement("a");
			a[c].ign = document.createElement("a");
			a[c].asc = document.createElement("a");
			a[c].dec.setAttribute("col", cols[c]);
			a[c].ign.setAttribute("col", cols[c]);
			a[c].asc.setAttribute("col", cols[c]);
			a[c].dec.setAttribute("order", -1);
			a[c].ign.setAttribute("order", 0);
			a[c].asc.setAttribute("order", 1);
			a[c].dec.setAttribute("scope", scope);
			a[c].ign.setAttribute("scope", scope);
			a[c].asc.setAttribute("scope", scope);
			let div1 = document.createElement("div");
			let input = document.createElement("input");
			let div2 = document.createElement("div");
			th.appendChild(div1);
			th.appendChild(input);
			th.appendChild(div2);
			div2.appendChild(a[c].dec);
			div2.appendChild(a[c].ign);
			div2.appendChild(a[c].asc);
			div1.innerText = cols[c];
			a[c].dec.innerText = "DESC";
			a[c].ign.innerText = "Neutral";
			a[c].asc.innerText = "ASC";
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



