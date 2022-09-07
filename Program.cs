using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!123");



{
	FileServerOptions a = new FileServerOptions  
	{
	FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "folder2")),  
	RequestPath = "/a2",  
	EnableDefaultFiles = true,
	};
	a.StaticFileOptions.OnPrepareResponse = (context) =>
	{
	    // Disable caching of all static files.
	    context.Context.Response.Headers["Cache-Control"] = "no-cache, no-store";
	    context.Context.Response.Headers["Pragma"] = "no-cache";
	    context.Context.Response.Headers["Expires"] = "-1";
	};
	app.UseFileServer(a);
}


{
	FileServerOptions a = new FileServerOptions  
	{
	FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "folder1")),  
	RequestPath = "/a3",  
	EnableDefaultFiles = true,
	};
	a.StaticFileOptions.OnPrepareResponse = (context) =>
	{
	    // Disable caching of all static files.
	    context.Context.Response.Headers["Cache-Control"] = "no-cache, no-store";
	    context.Context.Response.Headers["Pragma"] = "no-cache";
	    context.Context.Response.Headers["Expires"] = "-1";
	};
	app.UseFileServer(a);
}



app.Run();
