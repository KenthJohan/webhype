let Global = {};
Global.nav = {};
Global.nav_href = (scope) =>
{

	return "#" + JSURL.stringify(a);
}

Global.table1 = 
{
	name: "table1",
	html: {target: document.body},
	// Callback for fetching new data from backend
	API_requestor_fetch: Backend.API_requestor_fetch,
	// Callback for updating data in backend
	API_requestor_update: Backend.API_requestor_update,

	nav: Global.nav
};

Promise.all([Backend.API_meta1]).then((x) =>
{
	console.log(x[0]);
	// Value type information is used to present data in correct graphics:
	Global.table1.meta = x[0];
	Tinatable.init(Global.table1);
});

