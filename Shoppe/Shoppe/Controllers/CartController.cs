using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;
using Shoppe.Service;
using System.Collections.Generic;

namespace Shoppe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly CartService cartService;
        private readonly CartDetailsService cartDetailsService;
        private readonly ProductService productService;
        private readonly ShopService shopService;
        public CartController(CartService cartService,
            CartDetailsService cartDetailsService,
            ProductService productService, ShopService shopService)
        {
            this.cartService = cartService;
            this.cartDetailsService = cartDetailsService;
            this.productService = productService;
            this.shopService = shopService;
        }



        [HttpGet("listCart")]
        public async Task<IActionResult> ListCart(int UserId)
        {
            Cart cart = await cartService.CartByUserIdAsync(UserId);
            if (cart == null)
            {
                cart = new Cart
                {
                    CreatedAt = DateTime.Now,
                    UserId = UserId,
                };
                int cartId = await cartService.AddCart(cart);
                cart.Id = cartId;
            }
            List<CartDetail> cartDetails = await cartDetailsService.GetCartDetailByIdCartsAsync(cart.Id);
            List<Modeldata> modeldatas = new List<Modeldata>();
            foreach (var detail in cartDetails)
            {
                Product product = await productService.GetProductByIdAsync(detail.ProductId);
                product.Shop = null;
                Shop shop = await shopService.GetShopByIdAsync(product.ShopId);
                shop.Products = null;
                Modeldata modeldata = new Modeldata()
                {
                    CartDetail = detail,
                    Product = product,
                    Shop = shop,
                };
                detail.Shop = null;
                detail.Cart = null;
                detail.Product = null;
                modeldatas.Add(modeldata);
            }
            return Ok(modeldatas);
        }




        [HttpGet("addccart")]
        public async Task<IActionResult> Addccart(int UserId, int ProductId, int Quantity)
        {
            Cart cart = new Cart();
            Cart cart1 = await cartService.GetCartByUserIdAsync(UserId);
            cart.CreatedAt = DateTime.Now;
            cart.UserId = UserId;
            int cartId = cart1?.Id ?? await cartService.AddCart(cart);
            Product product = await productService.GetProductByIdAsync(ProductId);
            Console.WriteLine(product);
            CartDetail cartDetail1 = await cartDetailsService.GetCartDetailByCartIdAndProductIdAsync(cartId, ProductId);
            CartDetail cartDetail = new CartDetail();
            if (cartDetail1 == null)
            {
                cartDetail.ProductId = ProductId;
                cartDetail.Quantity = Quantity;
                cartDetail.TotalPrice = product.Price * cartDetail.Quantity;
                cartDetail.CartId = cartId;
                cartDetail.ShopId = product.ShopId;
                await cartDetailsService.AddcartDetail(cartDetail);
                product.Quantity = product.Quantity - Quantity;
                await productService.UpdateCProductAsync(product);
            }
            else
            {
                cartDetail1.ProductId = ProductId;
                cartDetail1.Quantity += Quantity;
                cartDetail1.TotalPrice = product.Price * cartDetail1.Quantity;
                cartDetail1.CartId = cartId;
                cartDetail1.ShopId = product.ShopId;
                await cartDetailsService.UpdateCartAsync(cartDetail1);
                product.Quantity = product.Quantity - Quantity;
                await productService.UpdateCProductAsync(product);
            }

            return Ok("User added successfully.");
        }
        [HttpGet("quantity")]
        public async Task<IActionResult> GetCartQuantity(int userId)
        {
            var cart = await cartService.GetCartByUserIdAsync(userId);
            if (cart == null)
            {
                return Ok(new { quantity = 0 });
            }
            int totalQuantity = await cartDetailsService.GetTotalQuantityByCartIdAsync(cart.Id);
            return Ok(new { quantity = totalQuantity });
        }


        [HttpGet("deleteQuantityccart")]
        public async Task<IActionResult> DeleteQuantityccart(int UserId, int ProductId)
        {
            Cart cart = await cartService.GetCartByUserIdAsync(UserId);
            CartDetail cartDetail = await cartDetailsService.GetCartDetailByCartIdAndProductIdAsync(cart.Id, ProductId);
            if (cartDetail != null)
            {
                Product product = await productService.GetProductByIdAsync(ProductId);
                if (cartDetail.Quantity > 1)
                {
                    cartDetail.Quantity -= 1;
                    cartDetail.TotalPrice = cartDetail.Quantity * product.Price;
                    await cartDetailsService.UpdateCartAsync(cartDetail);
                    product.Quantity += 1;
                    await productService.UpdateCProductAsync(product);
                }
                else if (cartDetail.Quantity == 1)
                {
                    await cartDetailsService.DeleteCart(cartDetail.Id);
                    product.Quantity += 1;
                    await productService.UpdateCProductAsync(product);
                }
            }
            return Ok("User added successfully.");
        }

        [HttpGet("AddQuantityccart")]
        public async Task<IActionResult> AddQuantityccart(int UserId, int ProductId)
        {
            Cart cart = await cartService.GetCartByUserIdAsync(UserId);
            CartDetail cartDetail = await cartDetailsService.GetCartDetailByCartIdAndProductIdAsync(cart.Id, ProductId);
            if (cartDetail != null)
            {
                Product product = await productService.GetProductByIdAsync(ProductId);
                cartDetail.Quantity += 1;
                cartDetail.TotalPrice = cartDetail.Quantity * product.Price;
                await cartDetailsService.UpdateCartAsync(cartDetail);
                product.Quantity -= 1;
                await productService.UpdateCProductAsync(product);
            }
            return Ok("User added successfully.");
        }

        [HttpGet("Deletecarrtdeltal")]
        public async Task<IActionResult> Deletecarrtdeltal(int UserId, int ProductId)
        {
            Cart cart = await cartService.GetCartByUserIdAsync(UserId);
            CartDetail cartDetail = await cartDetailsService.GetCartDetailByCartIdAndProductIdAsync(cart.Id, ProductId);
            if (cartDetail != null)
            {
                Product product = await productService.GetProductByIdAsync(cartDetail.ProductId);
                product.Quantity += cartDetail.Quantity;
                await productService.UpdateCProductAsync(product);
                await cartDetailsService.DeleteCart(cartDetail.Id);
            }
            return Ok("User added successfully.");
        }

    }
}