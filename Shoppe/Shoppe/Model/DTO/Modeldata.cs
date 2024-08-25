using Shoppe.Model.EF;

namespace Shoppe.Model.DTO
{
    public class Modeldata
    {
        public User User { get; set; }
        public Shop Shop { get; set; }
        public CartDetail CartDetail { get; set; }
        public Category Category { get; set; }
        public Product Product { get; set; }
        public List<Shop> Shoplst { get; set; }
    }
}
