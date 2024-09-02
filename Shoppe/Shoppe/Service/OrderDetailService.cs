using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shoppe.Data;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;

namespace Shoppe.Service
{
    public class OrderDetailService 
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> CreateOrderDetailAsync(OrderDetailDTO orderDetailDto)
        {
            var orderDetail = new OrderDetail
            {
                OrderId = orderDetailDto.OrderId,
                ProductId = orderDetailDto.ProductId,
                Quantity = orderDetailDto.Quantity,
                Price = orderDetailDto.Price
            };

            _context.OrderDetails.Add(orderDetail);
            await _context.SaveChangesAsync();

            return orderDetail.Id;
        }

        public async Task<OrderDetailDTO> GetOrderDetailByIdAsync(int id)
        {
            var orderDetail = await _context.OrderDetails
                .Where(od => od.Id == id)
                .Select(od => new OrderDetailDTO
                {
                    Id = od.Id,
                    OrderId = od.OrderId,
                    ProductId = od.ProductId,
                    Quantity = od.Quantity,
                    Price = od.Price
                })
                .FirstOrDefaultAsync();

            return orderDetail;
        }

        public async Task<List<OrderDetailDTO>> GetOrderDetailsByOrderIdAsync(int orderId)
        {
            return await _context.OrderDetails
                .Where(od => od.OrderId == orderId)
                .Select(od => new OrderDetailDTO
                {
                    Id = od.Id,
                    OrderId = od.OrderId,
                    ProductId = od.ProductId,
                    Quantity = od.Quantity,
                    Price = od.Price
                })
                .ToListAsync();
        }

        public async Task<bool> UpdateOrderDetailAsync(OrderDetailDTO orderDetailDto)
        {
            var orderDetail = await _context.OrderDetails.FindAsync(orderDetailDto.Id);

            if (orderDetail == null)
            {
                return false;
            }

            orderDetail.OrderId = orderDetailDto.OrderId;
            orderDetail.ProductId = orderDetailDto.ProductId;
            orderDetail.Quantity = orderDetailDto.Quantity;
            orderDetail.Price = orderDetailDto.Price;

            _context.OrderDetails.Update(orderDetail);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteOrderDetailAsync(int id)
        {
            var orderDetail = await _context.OrderDetails.FindAsync(id);

            if (orderDetail == null)
            {
                return false;
            }

            _context.OrderDetails.Remove(orderDetail);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
