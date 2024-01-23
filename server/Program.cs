using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MealPlanBackend.Models;
using MealPlanBackend.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MealPlannerDatabaseSettings>(builder.Configuration.GetSection(nameof(MealPlannerDatabaseSettings)));
builder.Services.AddSingleton<IMealPlannerDatabaseSettings>(sp => sp.GetRequiredService<IOptions
    <MealPlannerDatabaseSettings>>().Value);
builder.Services.AddSingleton<IMongoClient>(s => new MongoClient
(builder.Configuration.GetValue<string>("MealPlannerDatabaseSettings:ConnectionURI")));
builder.Services.AddScoped<IMealService, MealService>();
// Inside ConfigureServices method in Startup.cs
builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<IMealRequestService, MealRequestService>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
builder.Services.AddAuthentication().AddJwtBearer();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Needed since we aren't using minimal api. Not necessary using minimal apis.
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
