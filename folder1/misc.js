function thead_fill(cols, nav, hrefcb)
{
	let na = structuredClone(nav);
	na.c ??= {};
	let thead = document.createElement("thead");
	let tr = document.createElement("tr");
	thead.appendChild(tr);
	for(c in cols)
	{
		let th = document.createElement("th");
		tr.appendChild(th);
		{
			let div1 = document.createElement("div");
			let input = document.createElement("input");
			let div2 = document.createElement("div");
			let a0 = document.createElement("a");
			let a1 = document.createElement("a");
			let a2 = document.createElement("a");
			th.appendChild(div1);
			th.appendChild(input);
			th.appendChild(div2);
			div2.appendChild(a0);
			div2.appendChild(a1);
			div2.appendChild(a2);
			div1.innerText = cols[c];
			a0.innerText = "DESC";
			a1.innerText = "Neutral";
			a2.innerText = "ASC";
			let c = {};
			na.c[cols[c]].o = 0;
			a0.href = "#"+JSURL.stringify(na);
			na.c[cols[c]].o = 1;
			a1.href = "#"+JSURL.stringify(na);
			na.c[cols[c]].o = 2;
			a2.href = hrefcb(`${cols[c]}.o:0`);
			delete na.c[cols[c]];
		}
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