using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Shoppe.Model.EF
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public decimal? TotalPrice { get; set; }
        public User? User { get; set; }
        public ICollection<CartDetail>? CartDetails { get; set; } 

    }
}
