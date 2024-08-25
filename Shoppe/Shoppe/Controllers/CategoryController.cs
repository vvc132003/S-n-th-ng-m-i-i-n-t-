using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;
using Shoppe.Service;

namespace Shoppe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService categoryService;
        public CategoryController(CategoryService categoryService)
        {
            this.categoryService = categoryService;
        }
        [HttpGet("listCategory")]
        public async Task<IActionResult> ListCategory()
        {
            List<Category> listcategory = await categoryService.GetCategorysAsync();
            return Ok(listcategory);
        }
        [HttpPost("addcategory")]
        public async Task<IActionResult> Addcategory([FromForm] Category category)
        {
            await categoryService.AddCategory(category);
            return Ok("User added successfully.");
        }
        [HttpGet("getbyid/{id}")]
        public async Task<IActionResult> GetCategroryByIdAsync(int id)
        {
            var category = await categoryService.GetCategoryByIdAsync(id);

            if (category == null)
            {
                return NotFound("User not found.");
            }
            return Ok(category);
        }
        [HttpPut("updateCategory")]
        public async Task<IActionResult> UpdateCategoryAsync([FromForm] Category existingcategory)
        {
         
            await categoryService.UpdateCategoryAsync(existingcategory);
            return Ok("User updated successfully.");
        }
    }
}