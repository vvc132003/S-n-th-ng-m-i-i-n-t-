using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Shoppe.Data;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;

namespace Shoppe.Service
{
    public class OrderService
    {
        private readonly ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Create
        public async Task<int> CreateOrderAsync(OrderDTO orderDto)
        {
            var order = new Order
            {
                UserId = orderDto.UserId,
                ShopId = orderDto.ShopId,
                OrderDate = DateTime.Now,
                Status = orderDto.Status,
                TotalAmount = orderDto.TotalAmount ?? 0
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            orderDto.Id = order.Id;
            return orderDto.Id;
        }

        // Read
        public async Task<OrderDTO> GetOrderByIdAsync(int id)
        {
            var order = await _context.Orders
                .Where(o => o.Id == id)
                .Select(o => new OrderDTO
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    ShopId = o.ShopId,
                    OrderDate = o.OrderDate,
                    Status = o.Status,
                    TotalAmount = o.TotalAmount
                })
                .FirstOrDefaultAsync();

            return order;
        }




        public async Task<List<OrderDTO>> GetOrdersByUserIdAsync(int userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.Id) 
                .Select(o => new OrderDTO
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    ShopId = o.ShopId,
                    OrderDate = o.OrderDate,
                    Status = o.Status,
                    TotalAmount = o.TotalAmount
                })
                .ToListAsync();

            return orders;
        }

        public async Task<List<OrderDTO>> GetOrdersByUserIdAndStatusAsync(int userId, string status)
        {
            var orders = await _context.Orders
                                       .Where(o => o.UserId == userId && o.Status == status)
                                       .Select(o => new OrderDTO
                                       {
                                           Id = o.Id,
                                           UserId = o.UserId,
                                           ShopId = o.ShopId,
                                           OrderDate = o.OrderDate,
                                           Status = o.Status,
                                           TotalAmount = o.TotalAmount
                                       })
                                       .ToListAsync();

            return orders;
        }


        public async Task<List<OrderDTO>> GetAllOrdersAsync()
        {
            return await _context.Orders
                .Select(o => new OrderDTO
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    ShopId = o.ShopId,
                    OrderDate = o.OrderDate,
                    Status = o.Status,
                    TotalAmount = o.TotalAmount
                })
                .ToListAsync();
        }

        // Update
        public async Task<OrderDTO> UpdateOrderAsync(int id, OrderDTO orderDto)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return null;
            }

            order.UserId = orderDto.UserId;
            order.ShopId = orderDto.ShopId;
            order.OrderDate = orderDto.OrderDate;
            order.Status = orderDto.Status;
            order.TotalAmount = orderDto.TotalAmount;

            _context.Orders.Update(order);
            await _context.SaveChangesAsync();

            return orderDto;
        }

        // Delete
        public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return false;
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
