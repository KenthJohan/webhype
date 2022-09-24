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
	const e = document.querySelectorAll("[col][order]");
	for(let i = 0; i < e.length; i++)
	{
		let col = e[i].getAttribute("col");
		let order = e[i].getAttribute("order");
		let scope = e[i].getAttribute("scope");
		if(state?.[scope]?.c?.[col]?.o == order)
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

Nav.update = (state) =>
{
	Nav.update_orderby_href(state);
}





Nav.hashchange = () =>
{
	//console.log("Global.hashchange", Global.nav);
	let h = window.location.hash.substring(1);
	Nav.state = JSURL.parse(h);
	// Whenever navigation URL has changed we need to update all other href:
	Nav.update(Nav.state);
}

window.addEventListener('hashchange', Nav.hashchange, false);