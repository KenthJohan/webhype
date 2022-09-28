let Nav = {};
Nav.state = {};

Nav.href = (obj) =>
{
	// Deep merge from loadash, vanilla javascript does not have that:
	// Destination object, result of deep merging:
	let result = {};
	_.merge(result, Nav.state, obj);
	return "#" + JSURL.stringify(result);
}


Nav.update_orderby_href = (state) =>
{
	//console.log("update_orderby_href", Global.nav);
	const e = document.querySelectorAll("a[col][order]");
	for(let i = 0; i < e.length; i++)
	{
		let col = e[i].getAttribute("col");
		let order = e[i].getAttribute("order");
		let scope = e[i].getAttribute("scope");
		let o = state?.[scope]?.c?.[col]?.o;
		if(o == order)
		{
			e[i].classList.add("selected");
			continue;
		}
		if((order == "0") && (o == undefined))
		{
			e[i].classList.add("selected");
			continue;
		}
		e[i].classList.remove("selected");
		let part = {};
		part[scope] = {c:{}};
		part[scope].c[col] = {o:order};
		e[i].href = Nav.href(part);
		//console.log("update_orderby_href", scope, nav);
	}
}


Nav.update_input = (state) =>
{
	//console.log("update_orderby_href", Global.nav);
	const e = document.querySelectorAll("input[col][scope]");
	for(let i = 0; i < e.length; i++)
	{
		let col = e[i].getAttribute("col");
		let scope = e[i].getAttribute("scope");
		let f = state?.[scope]?.c?.[col]?.f;
		//if (!f) {continue;}
		e[i].value = f ?? "";
		//console.log(e[i], scope, col, state, f);
	}
}


Nav.cb_search = (e) =>
{
	let value = e.currentTarget.value;
	let col = e.currentTarget.getAttribute("col");
	let scope = e.currentTarget.getAttribute("scope");
	Nav.state[scope] ??= {};
	Nav.state[scope].c ??= {};
	Nav.state[scope].c[col] ??= {};
	Nav.state[scope].c[col].f = value;
	window.location.hash = JSURL.stringify(Nav.state);
	//console.log(scope, col, value);
}



Nav.update = (state) =>
{
	console.log("Nav.update", state);
	Nav.update_orderby_href(state);
	Nav.update_input(state);
}





Nav.hashchange = () =>
{
	//console.log("Global.hashchange", Global.nav);
	let h = window.location.hash.substring(1);
	Nav.state = JSURL.parse(h);
	//console.log(Nav.state);
	// Whenever navigation URL has changed we need to update all other href:
	Nav.update(Nav.state);
}

window.addEventListener('hashchange', Nav.hashchange, false);