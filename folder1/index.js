let Global = {};
Global.navstate = {};
Global.navstate["t1"] = 
{
	o: ["$s", "id", "name"],
	c: 
	{
		"id":
		{
			o:0
		},
		"name":
		{
			o:0
		}
	}
};
Global.navstate["t2"] = 
{
	o: ["id"],
	c: 
	{
		"id":
		{
			o:0
		},
		"name":
		{
			o:0
		}
	}
};


history.replaceState(null, null, document.location.pathname + Nav.href(Global.navstate, null));


Global.t1 = 
{
	scope: "t1",
	components: Global.navstate["t1"].o,
	html: 
	{
		target: document.getElementById("t1")
	},
	backend:
	{
		fetcher_get: Backend.fetcher_get,
		fetcher_set: Backend.fetcher_set
	},
	meta: null,
};




Global.t2 = 
{
	scope: "t2",
	components: Global.navstate["t2"].o,
	html: 
	{
		target: document.getElementById("t2")
	},
	backend:
	{
		fetcher_get: Backend.fetcher_get,
		fetcher_set: Backend.fetcher_set
	},
	meta: null,
};





Promise.all([Backend.fetch_meta]).then((x) =>
{
	// Value type information is used to represent data in correct graphics:
	Global.t1.meta = x[0];
	Global.t2.meta = x[0];
	Global.hashchange();
});


Events.cmdqueue.push({path:"t1"});
Events.cmdqueue.push({path:"t2"});
Events.cmdqueue.push({path:"fetch"});

// The navstate is stored in the URL-hash.
// Update the GUI accordingly when URL-hash has been changed:
Global.hashchange = () =>
{
	// Everytime the URL-hash has changed we need to parse the URL-hash and update the Global navstate:
	let h = window.location.hash.substring(1);
	Global.navstate = JSURL.parse(h);

	// Whenever navstate has changed we need to update all other href:
	//Tinatable.update(Global.t1);
	//Tinatable.update(Global.t2);


	let fm = {};
	fm["t1"] = (cmd) => {console.log(cmd);Tinatable.update(Global.t1);}
	fm["t2"] = (cmd) => {console.log(cmd);Tinatable.update(Global.t2);}
	fm["fetch"] = (cmd) => 
	{
		Promise.all([Global.t1.prom, Global.t2.prom]).then(x => {
			Nav.update(Global.navstate);
			history.replaceState(null, null, document.location.pathname + Nav.href(Global.navstate, null));
		});
	}

	while(1)
	{
		let cmd = Events.cmdqueue.shift();
		if (cmd == undefined) {break;}
		
		for(path in fm)
		{
			if(path == cmd.path.substr(0, path.length))
			{
				fm[path](cmd);
			}
		}
	}

}

window.addEventListener('hashchange', Global.hashchange, false);


