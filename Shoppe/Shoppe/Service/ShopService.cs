using Microsoft.EntityFrameworkCore;
using Shoppe.Data;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;

namespace Shoppe.Service
{
    public class ShopService
    {
        private readonly ApplicationDbContext _context;

        public ShopService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Shop>> GetShopsAsync()
        {
            return await _context.Shops
                .OrderByDescending(s => s.Id)
                .Select(s => new Shop
                {
                    Id = s.Id,
                    ShopName = s.ShopName,
                    Description = s.Description,
                    Phonenumber = s.Phonenumber,
                    Addresses = s.Addresses,
                    Avatar = s.Avatar,
                    User = new User
                    {
                        Id = s.User.Id,
                        UserName = s.User.UserName
                    }
                })
                .ToListAsync();
        }

        public async Task<Shop> GetShopsByIdUserAsync(int UserId)
        {
            Shop shop = await _context.Shops.FirstOrDefaultAsync(s => s.UserId == UserId);
            if (shop == null)
            {
                return null;
            }
            return shop;
        }
      

        public async Task AddShop(Shop shop)
        {
            _context.Shops.Add(shop);
            await _context.SaveChangesAsync();

        }
        public async Task<Shop> GetShopByIdAsync(int? id)
        {
            Shop shop = await _context.Shops.FindAsync(id);
            if (shop == null)
            {
                return null;
            }
            return shop;
        }

        public async Task<ShopDto> GetShopDTOByIdAsync(int? id)
        {
            // Fetch the shop entity from the database
            var shop = await _context.Shops.FindAsync(id);

            // Check if the shop exists
            if (shop == null)
            {
                return null;
            }

            // Map the Shop entity to ShopDto
            var shopDto = new ShopDto
            {
                Id = shop.Id,
                ShopName = shop.ShopName,
                Description = shop.Description,
                Addresses = shop.Addresses,
                Avatar = shop.Avatar,
                Phonenumber = shop.Phonenumber,
                UserId = shop.UserId
            };

            return shopDto;
        }


        public async Task UpdateShopAsync(Shop shop)
        {
            _context.Shops.Update(shop);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteShop(int id)
        {
            var shop = await _context.Shops.FindAsync(id);
            if (shop == null)
            {
                throw new ArgumentException("User not found.");
            }

            _context.Shops.Remove(shop);
            await _context.SaveChangesAsync();
        }
    }
}
