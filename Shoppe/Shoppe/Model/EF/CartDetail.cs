using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Shoppe.Model.EF
{
    public class CartDetail
    {
        [Key]
        public int Id { get; set; }
        public int? CartId { get; set; }
        public int ProductId { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }
        public int? ShopId { get; set; }

        [ForeignKey("ShopId")]
        public Shop? Shop { get; set; }
        public Cart? Cart { get; set; }
        public Product? Product { get; set; }
    }
}
