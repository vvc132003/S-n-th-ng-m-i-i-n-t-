using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shoppe.Data;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;

namespace Shoppe.Service
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> Login(string email, string password)
        {
            // Tìm người dùng có email và mật khẩu khớp
            User user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email && u.Password == password);

            // Trả về null nếu không tìm thấy người dùng
            if (user == null)
            {
                return null;
            }

            return user;
        }


        public async Task<List<User>> GetUsersDtoAsync()
        {
            return await _context.Users
                .OrderByDescending(u => u.Id).ToListAsync();
        }

        public async Task AddUser(User user)
        {
            _context.Users.Add(user); // Add the user to the context
            await _context.SaveChangesAsync(); // Save changes to the database        }
        }
        public async Task DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                throw new ArgumentException("User not found.");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateUserAsync(User user)
        {
            var users = await _context.Users.FindAsync(user.Id);
            users.UserName= user.UserName;
            users.Email= user.Email;
            users.Role = user.Role;
            users.Avatar = user.Avatar;
            users.Phonenumber = user.Phonenumber;
            users.CreatedAt = DateTime.Now;
            _context.Users.Update(users);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            User user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return null;
            }
            return user;
        }

    }
}
