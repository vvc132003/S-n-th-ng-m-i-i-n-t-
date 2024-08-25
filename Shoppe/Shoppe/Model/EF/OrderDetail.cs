namespace Shoppe.Model.EF
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int? SubOrderId { get; set; }
        public int? ProductId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }
        public SubOrder? SubOrder { get; set; } 
        public Product? Product { get; set; } 
    }
}
