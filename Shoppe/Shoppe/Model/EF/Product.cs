using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shoppe.Model.EF
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? ProductName { get; set; }

        public string? Description { get; set; }

        [Required]
        [Column(TypeName = "decimal(10, 2)")]
        public decimal? Price { get; set; }

        public string? Avatar { get; set; }

        public string? Size { get; set; }

        public string? Color { get; set; }

        public int? Quantity { get; set; }

        public DateTime? CreatedAt { get; set; }

        [Required]
        public int? ShopId { get; set; }

        [ForeignKey("ShopId")]
        public Shop? Shop { get; set; }

        [Required]
        public int? CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
        public ICollection<CartDetail>? CartDetails { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }


    }
}
