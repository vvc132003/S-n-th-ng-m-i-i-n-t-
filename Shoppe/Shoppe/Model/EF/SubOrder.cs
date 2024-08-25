namespace Shoppe.Model.EF
{
    public class SubOrder
    {
        public int Id { get; set; }
        public int? OrderId { get; set; }
        public int? ShopId { get; set; }
        public string? Status { get; set; }
        public decimal? SubTotal { get; set; }

        public Order? Order { get; set; } 
        public Shop? Shop { get; set; } 
        public List<OrderDetail> OrderDetails { get; set; }
    }
}
