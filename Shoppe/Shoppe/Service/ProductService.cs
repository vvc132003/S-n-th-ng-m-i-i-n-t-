using Microsoft.EntityFrameworkCore;
using Shoppe.Data;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;

namespace Shoppe.Service
{
    public class ProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Product>> GetProductsAsync()
        {
            return await _context.Products
                .OrderByDescending(p => p.Id)
                .Include(p => p.Category)
                .Select(p => new Product
                {
                    Id = p.Id,
                    ProductName = p.ProductName,
                    Description = p.Description,
                    Price = p.Price,
                    Avatar = p.Avatar,
                    Size = p.Size,
                    Color = p.Color,
                    Quantity = p.Quantity,
                    Category = new Category
                    {
                        Id = p.Category.Id,
                        CategoryName = p.Category.CategoryName,
                    },
                    Shop = new Shop
                    {
                        Id = p.Shop.Id,
                        ShopName = p.Shop.ShopName,
                    },
                })
                .ToListAsync();
        }

        public async Task<List<Product>> GetProductsByIdShopAsync(int ShopId)
        {
            return await _context.Products.OrderByDescending(p => p.Id).Where(p =>p.ShopId == ShopId).ToListAsync();
        }

        public async Task AddProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

        }
        public async Task<Product> GetProductByIdAsync(int id)
        {
            Product product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return null;
            }
            return product;
        }
        public async Task UpdateCProductAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                throw new ArgumentException("User not found.");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }
    }

}
