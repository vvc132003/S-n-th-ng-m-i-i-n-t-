using System.ComponentModel.DataAnnotations;

namespace Shoppe.Model.DTO
{
    public class ShopDto
    {
        public int Id { get; set; }
        public string ShopName { get; set; }
        public string Description { get; set; }
        public string Addresses { get; set; }
        public string Phonenumber { get; set; }
        public string Avatar { get; set; }

        public int UserId { get; set; }
        public string? UserName { get; set; }


    }
}