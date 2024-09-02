namespace Shoppe.Model.DTO
{
    public class CartDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime? CreatedAt { get; set; } = DateTime.Now;
        public decimal? TotalPrice { get; set; }
    }
}