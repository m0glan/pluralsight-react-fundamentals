using HousesApi;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddSingleton<HouseRepository>();
builder.Services.AddSingleton<BidRepository>();

var app = builder.Build();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapGet("/house", async (HouseRepository repo) =>
{
    await Task.Delay(2000);
    return repo.GetAll();
});

app.MapPost("/house", async (HouseRepository repo, House house) =>
{
    await Task.Delay(2000);
    return repo.Add(house);
});

app.MapGet("/house/{id:int}", async (HouseRepository repo, int id) =>
{
    await Task.Delay(2000);
    return repo.GetAll().SingleOrDefault(h => h.Id == id);
});

app.MapGet("/house/{houseId:int}/bids", async (BidRepository repo, int houseId) =>
{
    await Task.Delay(2000);
    return repo.GetBids(houseId);
});

app.MapPost("/house/{houseId:int}/bid", async (BidRepository repo, int houseId, Bid bid) =>
{
    await Task.Delay(2000);
    repo.Add(houseId, bid);
    return bid;
});
app.Run();
