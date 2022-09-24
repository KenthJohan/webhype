let Global = {};

Global.config_tinatable1 = 
{
	scope: "tinatable1",
	html: 
	{
		// Append target of generated html:
		target: document.body
	},
	// Callback for fetching new data from backend
	API_requestor_fetch: Backend.API_requestor_fetch,
	// Callback for updating data in backend
	API_requestor_update: Backend.API_requestor_update,
	API_requestor_update_cb: () => {Nav.update(Nav.state);},
	// Type information
	// Get this later on
	meta: null,
};


Global.config_tinatable2 = 
{
	scope: "tinatable2",
	html: 
	{
		// Append target of generated html:
		target: document.body
	},
	// Callback for fetching new data from backend
	API_requestor_fetch: Backend.API_requestor_fetch,
	// Callback for updating data in backend
	API_requestor_update: Backend.API_requestor_update,
	API_requestor_update_cb: () => {Nav.update(Nav.state);},
	// Type information
	// Get this later on
	meta: null,
};





Promise.all([Backend.API_meta1]).then((x) =>
{
	// console.log(x[0]);
	// Value type information is used to present data in correct graphics:
	Global.config_tinatable1.meta = x[0];
	Global.config_tinatable2.meta = x[0];
	Tinatable.init(Global.config_tinatable1);
	Tinatable.init(Global.config_tinatable2);
});








