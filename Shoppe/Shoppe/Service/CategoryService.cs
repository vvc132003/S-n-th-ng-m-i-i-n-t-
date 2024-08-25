using Microsoft.EntityFrameworkCore;
using Shoppe.Data;
using Shoppe.Model.EF;

namespace Shoppe.Service
{
    public class CategoryService
    {
        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<List<Category>> GetCategorysAsync()
        {
            return await _context.Categories
                .OrderByDescending(s => s.Id).ToListAsync();
        }

        public async Task AddCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

        }
        public async Task<Category> GetCategoryByIdAsync(int? id)
        {
            Category category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return null;
            }
            return category;
        }

        public async Task UpdateCategoryAsync(Category category)
        {
           _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                throw new ArgumentException("User not found.");
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
        }
    }
}
