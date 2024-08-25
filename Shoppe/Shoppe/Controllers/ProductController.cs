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
    public class ProductController : ControllerBase
    {
        private readonly ProductService productService;
        private readonly CategoryService categoryService;
        private readonly ShopService shopService;
        public ProductController(ProductService productService, CategoryService categoryService, ShopService shopService)
        {
            this.productService = productService;
            this.categoryService = categoryService;
            this.shopService = shopService;
        }

        [HttpGet("getAllProduct")]
        public async Task<IActionResult> GetAllProduct()
        {
            List<Product> products = await productService.GetProductsAsync();
            return Ok(products);
        }

        [HttpGet("getAllProductByIdUser")]
        public async Task<IActionResult> GetAllProductByIdUser(int UserId)
        {
            Shop shop = await shopService.GetShopsByIdUserAsync(UserId);
            List<Product> products = await productService.GetProductsByIdShopAsync(shop.Id);
            var productsData = new List<object>();
            foreach (Product product in products)
            {
                Category category = await categoryService.GetCategoryByIdAsync(product.CategoryId);
                category.Products = null;
                shop.User = null;
                shop.Products = null;
                product.Shop = null;
                var data = new
                {
                    Product = product,
                    Shop = shop
                };
                productsData.Add(data);
            }
            return Ok(productsData);
        }


        [HttpPost("addProduct")]
        public async Task<IActionResult> AddProduct([FromForm] ProductDto productDto, IFormFile avatarFile, int userId)
        {
            if (productDto == null)
            {
                return BadRequest("Product data is null.");
            }
            Shop shop = await shopService.GetShopsByIdUserAsync(userId);

            try
            {
                var product = new Product
                {
                    ProductName = productDto.ProductName,
                    Description = productDto.Description,
                    Price = productDto.Price,
                    Size = productDto.Size,
                    Color = productDto.Color,
                    Quantity = productDto.Quantity,
                    ShopId = shop != null ? shop.Id : productDto.ShopId,
                    CategoryId = productDto.CategoryId,
                    CreatedAt = DateTime.UtcNow
                };
                if (avatarFile != null)
                {
                    var fileExtension = Path.GetExtension(avatarFile.FileName).ToLowerInvariant();
                    var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                    if (!allowedExtensions.Contains(fileExtension))
                    {
                        return Ok();
                    }
                    var base64String = await ConvertToBase64StringAsync(avatarFile);
                    product.Avatar = base64String;
                }
                else
                {
                    product.Avatar = "";
                }
                await productService.AddProduct(product);
                return Ok(new { message = "Product added successfully." });
            }
            catch (Exception ex)
            {
                // Log the error (not shown in this example)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpPost("addProducts")]
        public async Task<IActionResult> AddProducts([FromForm] ProductDto productDto, IFormFile avatarFile, [FromForm] int UserId)
        {
            if (productDto == null)
            {
                return BadRequest("Product data is null.");
            }
            Shop shop = await shopService.GetShopsByIdUserAsync(UserId);
            shop.User = null;
            shop.Products = null;
            Console.WriteLine(shop.UserId);
            try
            {
                var product = new Product
                {
                    ProductName = productDto.ProductName,
                    Description = productDto.Description,
                    Price = productDto.Price,
                    Size = productDto.Size,
                    Color = productDto.Color,
                    Quantity = productDto.Quantity,
                    ShopId = shop.Id,
                    CategoryId = productDto.CategoryId,
                    CreatedAt = DateTime.UtcNow
                };
                if (avatarFile != null)
                {
                    var fileExtension = Path.GetExtension(avatarFile.FileName).ToLowerInvariant();
                    var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                    if (!allowedExtensions.Contains(fileExtension))
                    {
                        return Ok();
                    }
                    var base64String = await ConvertToBase64StringAsync(avatarFile);
                    product.Avatar = base64String;
                }
                else
                {
                    product.Avatar = "";
                }
                await productService.AddProduct(product);
                return Ok(new { message = "Product added successfully." });
            }
            catch (Exception ex)
            {
                // Log the error (not shown in this example)
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        private async Task<string> ConvertToBase64StringAsync(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            var fileBytes = memoryStream.ToArray();
            var base64String = Convert.ToBase64String(fileBytes);
            return $"data:{file.ContentType};base64,{base64String}";
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductAsync(int id)
        {
            await productService.DeleteProduct(id);
            return Ok("User deleted successfully.");

        }
        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetProductByIdAsync(int id)
        {
            var product = await productService.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound("User not found.");
            }
            return Ok(product);
        }
        [HttpGet("checksoluongproduct")]
        public async Task<IActionResult> Checksoluongproduct(int ProductId)
        {
            var product = await productService.GetProductByIdAsync(ProductId);
            return Ok(product);
        }




    }
}
