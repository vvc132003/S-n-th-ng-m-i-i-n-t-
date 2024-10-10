using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;
using Shoppe.Service;
using System.Collections.Generic;

namespace Shoppe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopController : ControllerBase
    {
        private readonly ShopService shopService;
        private readonly UserService userService;
        private readonly IHubContext<ShopHub> _hubContext; 

        public ShopController(ShopService shopService, UserService userService, IHubContext<ShopHub> hubContext)
        {
            this.shopService = shopService;
            this.userService = userService;
            _hubContext = hubContext;
        }
        [HttpGet("listShop")]
        public async Task<IActionResult> ListShop()
        {
            List<Shop> listShop = await shopService.GetShopsAsync();

            /*List<Modeldata> modeldatas = new List<Modeldata>();
            foreach (var shop in listShop)
            {
                User user = await userService.GetUserByIdAsync(shop.UserId);
                Modeldata modeldata = new Modeldata()
                {
                    Shop = shop,
                    User = user,
                };
                modeldatas.Add(modeldata);
            }*/
            return Ok(listShop);
        }
        [HttpPost("addShop")]
        public async Task<IActionResult> AddShopAsync([FromForm] Shop shop, IFormFile avatarFile)
        {
            if (avatarFile != null)
            {
                var fileExtension = Path.GetExtension(avatarFile.FileName).ToLowerInvariant();
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return Ok();
                }
                var base64String = await ConvertToBase64StringAsync(avatarFile);
                shop.Avatar = base64String;
            }
            else
            {
                shop.Avatar = "";
            }
            await shopService.AddShop(shop);
            await _hubContext.Clients.All.SendAsync("ReceiveShopAdded", shop.ShopName);
            return Ok("User added successfully.");
        }


        [HttpPut("updateShop")]
        public async Task<IActionResult> UpdateShoprAsync([FromForm] Shop existingShop, IFormFile avatarFile)
        {
            if (avatarFile != null)
            {
                var fileExtension = Path.GetExtension(avatarFile.FileName).ToLowerInvariant();
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest("Invalid file type.");
                }
                var base64String = await ConvertToBase64StringAsync(avatarFile);
                existingShop.Avatar = base64String;
            }

            await shopService.UpdateShopAsync(existingShop);
            return Ok("User updated successfully.");
        }




        private async Task<string> ConvertToBase64StringAsync(IFormFile file)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);
            var fileBytes = memoryStream.ToArray();
            var base64String = Convert.ToBase64String(fileBytes);
            return $"data:{file.ContentType};base64,{base64String}";
        }


        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetShopByIdAsync(int id)
        {
            var shop = await shopService.GetShopByIdAsync(id);

            if (shop == null)
            {
                return NotFound("User not found.");
            }
            return Ok(shop);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShopAsync(int id)
        {
            await shopService.DeleteShop(id);
            return Ok("User deleted successfully.");

        }

    }
}