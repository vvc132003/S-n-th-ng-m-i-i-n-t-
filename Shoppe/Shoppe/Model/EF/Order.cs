﻿using System.ComponentModel.DataAnnotations;

namespace Shoppe.Model.EF
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? ShopId { get; set; }
        public DateTime? OrderDate { get; set; } = DateTime.Now;
        public string? Status { get; set; }
        public decimal? TotalAmount { get; set; }
        public User? User { get; set; }
        public Shop? Shop { get; set; }
        public List<OrderDetail> OrderDetails { get; set; }

    }
}