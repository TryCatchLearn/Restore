using API.Entities;
using Microsoft.AspNetCore.Identity;
using System.Text.Json;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    UserName = "bob",
                    Email = "bob@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
            }
            

            if (context.Products.Any()) return;

            var products = RetreiveProductData();
            
            foreach (var product in products)
            {
                context.Products.Add(product);
            }

            context.SaveChanges();
        }

        public static List<Product> RetreiveProductData()
        {
            var sepChar = Path.DirectorySeparatorChar;
            string path = $"wwwwroot{sepChar}dev-data{sepChar}products.json";

            List<Product> source = new List<Product>();

            using (StreamReader r = new StreamReader(path))
            {
                string json = r.ReadToEnd();

                source = JsonSerializer.Deserialize<List<Product>>(json);
            }

            return source.Select(el => new Product
            {
                Name = el.Name,
                Description = el.Description,
                Price = el.Price,
                PictureUrl = el.PictureUrl,
                Brand = el.Brand,
                Type = el.Type,
                QuantityInStock = el.QuantityInStock,
            }).ToList();
        }
    }
}
