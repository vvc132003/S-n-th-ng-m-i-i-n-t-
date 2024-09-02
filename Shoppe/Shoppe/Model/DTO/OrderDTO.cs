namespace Shoppe.Model.DTO
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? ShopId { get; set; }
        public DateTime? OrderDate { get; set; } = DateTime.Now;
        public string? Status { get; set; }
        public decimal? TotalAmount { get; set; }
    }
}
