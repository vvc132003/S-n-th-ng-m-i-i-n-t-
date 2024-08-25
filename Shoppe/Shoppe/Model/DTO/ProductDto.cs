using System.ComponentModel.DataAnnotations;

namespace Shoppe.Model.DTO
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string Size { get; set; }
        public string Color { get; set; }
        public int Quantity { get; set; }
        public int? ShopId { get; set; }
        public int CategoryId { get; set; }

    }
}
