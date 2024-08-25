using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Shoppe.Model.EF
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string? UserName { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? Role { get; set; }
        public DateTime? CreatedAt { get; set; }
        public string? Avatar { get; set; }
        public string? Phonenumber { get; set; }
        public string IdGoogle { get; set; } = string.Empty;
        public ICollection<Shop>? Shops { get; set; }
        public ICollection<Cart>? Carts { get; set; }
        public ICollection<Order>? Orders { get; set; }

    }
}
