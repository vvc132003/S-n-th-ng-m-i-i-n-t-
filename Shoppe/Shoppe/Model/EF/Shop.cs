using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Shoppe.Model.EF
{
    public class Shop
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? ShopName { get; set; }

        public string? Description { get; set; }

        public string? Addresses { get; set; }

        public string? Avatar { get; set; }

        public string? Phonenumber { get; set; }

        [Required]
        public int? UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }
        public ICollection<Product>? Products { get; set; }
        public ICollection<Order>? Orders { get; set; }

        public ICollection<CartDetail>? CartDetails { get; set; }

    }
}
