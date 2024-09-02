namespace Shoppe.Model.DTO
{
    public class CartDetailDTO
    {
        public int Id { get; set; }
        public int? CartId { get; set; }
        public int ProductId { get; set; }
        public int? ShopId { get; set; }
        public int? Quantity { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}