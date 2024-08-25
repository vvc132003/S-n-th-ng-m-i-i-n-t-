using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;
using Shoppe.Service;
using static System.Net.Mime.MediaTypeNames;
using System.Linq;

namespace Shoppe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }
        [HttpPost("logout")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Session.Clear();
            return Ok(new { message = "Logged out successfully" });
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Users userrequest)
        {

            Model.EF.User user = await _userService.Login(userrequest.email, userrequest.password);
            if (user == null)
            {
                return Unauthorized(new { message = "Không có tài khoản" });
            }
            return Ok(user);
        }
        [HttpGet("listUser")]
        public async Task<IActionResult> ListUser()
        {
            List<User> listUser = await _userService.GetUsersDtoAsync();
            return Ok(listUser);
        }
        [HttpPost("addUser")]
        public async Task<IActionResult> AddUserAsync([FromForm] User user, IFormFile avatarFile)
        {
            /* var user = new User
             {
                 UserName = userDto.UserName,
                 Email = userDto.Email,
                 Password = userDto.Password,
                 Role = userDto.Role,
                 CreatedAt = DateTime.Now,
                 Phonenumber = userDto.Phonenumber,
                 IdGoogle = "",
             };*/

            if (avatarFile != null)
            {
                var fileExtension = Path.GetExtension(avatarFile.FileName).ToLowerInvariant();
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return Redirect("~/admin/sanpham/");
                }
                var base64String = await ConvertToBase64StringAsync(avatarFile);
                user.Avatar = base64String;
            }
            else
            {
                user.Avatar = "";
            }
            user.CreatedAt = DateTime.Now;
            await _userService.AddUser(user);

            return Ok("User added successfully.");
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAsync(int id)
        {

            await _userService.DeleteUser(id);
            return Ok("User deleted successfully.");

        }
        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetUserByIdAsync(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }

        [HttpPut("updateUser")]
        public async Task<IActionResult> UpdateUserAsync([FromForm] User userDto, IFormFile avatarFile)
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
                userDto.Avatar = base64String;
            }
            userDto.CreatedAt = DateTime.Now;
            await _userService.UpdateUserAsync(userDto);
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

    }
}