using Microsoft.EntityFrameworkCore;
using Shoppe.Data;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;

namespace Shoppe.Service
{
    public class CartDetailsService
    {
        private readonly ApplicationDbContext _context;

        public CartDetailsService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<CartDetail>> GetCartDetailByIdCartsAsync(int CartId)
        {
            return await _context.CartDetails
                .Where(c => c.CartId == CartId)
                .OrderByDescending(s => s.Id)
                .ToListAsync();
        }


        public async Task<List<CartDetailDTO>> GetCartDTODetailByIdCartsAsync(int cartId)
        {
            return await _context.CartDetails
                .Where(c => c.CartId == cartId)
                .OrderByDescending(s => s.Id)
                .Select(c => new CartDetailDTO
                {
                    Id = c.Id,
                    CartId = c.CartId,
                    ProductId = c.ProductId,
                    ShopId = c.ShopId,
                    Quantity = c.Quantity,
                    TotalPrice = c.TotalPrice
                })
                .ToListAsync();
        }

        public async Task<List<CartDetailDTO>> GetCartDTODetailByShopidCartsAsync(int? ShopId)
        {
            return await _context.CartDetails
                .Where(c => c.ShopId == ShopId)
                .OrderByDescending(s => s.Id)
                .Select(c => new CartDetailDTO
                {
                    Id = c.Id,
                    CartId = c.CartId,
                    ProductId = c.ProductId,
                    ShopId = c.ShopId,
                    Quantity = c.Quantity,
                    TotalPrice = c.TotalPrice
                })
                .ToListAsync();
        }




        public async Task AddcartDetail(CartDetail cartDetail)
        {
            _context.CartDetails.Add(cartDetail);
            await _context.SaveChangesAsync();

        }
        public async Task<CartDetail> GetcartDetailByIdAsync(int id)
        {
            CartDetail cart = await _context.CartDetails.FindAsync(id);
            if (cart == null)
            {
                return null;
            }
            return cart;
        }
        public async Task<CartDetail> GetcartDetailBycartIdAsync(int CartId)
        {
            return await _context.CartDetails
                                 .Where(s => s.CartId == CartId)
                                 .FirstOrDefaultAsync();
        }

        public async Task<CartDetail> GetCartDetailByCartIdAndProductIdAsync(int cartId, int productId)
        {
            return await _context.CartDetails
                                 .FirstOrDefaultAsync(c => c.CartId == cartId && c.ProductId == productId);
        }

        public async Task UpdateCartAsync(CartDetail cart)
        {
            var carts = await _context.CartDetails.FindAsync(cart.Id);
            _context.CartDetails.Update(carts);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteCart(int id)
        {
            var category = await _context.CartDetails.FindAsync(id);
            if (category == null)
            {
                throw new ArgumentException("User not found.");
            }

            _context.CartDetails.Remove(category);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteCartByProductId(int productId)
        {
            // Find the CartDetail that matches the given ProductId
            var cartDetails = await _context.CartDetails
                .Where(cd => cd.ProductId == productId)
                .ToListAsync();

            if (cartDetails.Count == 0)
            {
                throw new ArgumentException("No cart details found for the given product ID.");
            }

            // Remove the cart details from the context
            _context.CartDetails.RemoveRange(cartDetails);
            await _context.SaveChangesAsync();
        }



        public async Task<int> GetTotalQuantityByCartIdAsync(int cartId)
        {
            var cartDetails = await _context.CartDetails
                .Where(cd => cd.CartId == cartId)
                .ToListAsync();

            return cartDetails.Sum(cd => cd.Quantity ?? 0);
        }
    }
}
