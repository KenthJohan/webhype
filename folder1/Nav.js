let Nav = {};
Nav.state = {};

Nav.href = (state, obj) =>
{
	// Deep merge from loadash, vanilla javascript does not have that:
	// Destination object, result of deep merging:
	let result = {};
	_.merge(result, state, obj);
	return "#" + JSURL.stringify(result);
}


Nav.update_orderby_href = (state) =>
{
	//console.log("update_orderby_href", Global.nav);
	const q = document.querySelectorAll("a[col][order][scope]");
	q.forEach((e) => {
		let col = e.getAttribute("col");
		let order = e.getAttribute("order");
		let scope = e.getAttribute("scope");
		let o = state?.[scope]?.c?.[col]?.o;
		if((o == order) || ((order == "0") && (o == undefined)))
		{
			e.classList.add("selected");
		}
		else
		{
			e.classList.remove("selected");
		}
		let part = {};
		part[scope] = {c:{}};
		part[scope].c[col] = {o:order};
		e.href = Nav.href(state, part);
		//console.log("update_orderby_href", scope, nav);
	});
}


Nav.update_input = (state) =>
{
	const q = document.querySelectorAll("input[col][scope]");
	q.forEach((e) => {
		let col = e.getAttribute("col");
		let scope = e.getAttribute("scope");
		let f = state?.[scope]?.c?.[col]?.f;
		//if (!f) {continue;}
		e.value = f ?? "";
		//console.log(e, scope, col, state, f);
	});
}


Nav.cb_search = (e, arg) =>
{
	let value = e.currentTarget.value;
	let col = e.currentTarget.getAttribute("col");
	let scope = e.currentTarget.getAttribute("scope");
	let navstate = {};
	navstate[scope] = {c:{}};
	navstate[scope].c[col] = {f:value};
	window.location.hash = Nav.href(arg, navstate);
	//console.log(scope, col, value);
}

Nav.update_cursor = (state) =>
{
	{
		const q = document.querySelectorAll("[cursor-prev]");
		q.forEach((e) => {
			let scope = e.getAttribute("scope");
			let part = {};
			part[scope] = {n:1};
			//console.log(state[scope]);
			e.href = Nav.href(state, part);
		});
	}
	{
		const q = document.querySelectorAll("[cursor-next]");
		q.forEach((e) => {
			let scope = e.getAttribute("scope");
			let part = {};
			part[scope] = {n:1};
			//console.log(state[scope]);
			e.href = Nav.href(state, part);
		});
	}
	{
		const q = document.querySelectorAll("[cursor-home]");
		q.forEach((e) => {
			let scope = e.getAttribute("scope");
			let part = {};
			part[scope] = {n:1};
			//console.log(state[scope]);
			e.href = Nav.href(state, part);
		});
	}
}


Nav.update_selection = (state) =>
{
	//console.log("update_orderby_href", Global.nav);
	const q = document.querySelectorAll('input[scope][col="$s"][row][type="checkbox"]');
	q.forEach((e) => {
		let col = e.getAttribute("col");
		let scope = e.getAttribute("scope");
		let row = e.getAttribute("row");
		e.checked = state?.[scope]?.r?.[row]?.[col] ?? false;
		console.log(state, scope, row, col);
		//console.log("s", e, s);
		e.onchange = (event) =>
		{
			console.log(event.target, event.target.checked);
			let navstate = {};
			navstate[scope] = {r:{}};
			navstate[scope].r[row] = {};
			navstate[scope].r[row][col] = event.target.checked;
			window.location.hash = Nav.href(state, navstate);
		}
	});
}


Nav.update = (state) =>
{
	Nav.update_selection(state);
	Nav.update_orderby_href(state);
	Nav.update_input(state);
	Nav.update_cursor(state);
}





