using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Shoppe.Model.DTO;
using Shoppe.Model.EF;
using Shoppe.Service;
using System.Collections.Generic;

namespace Shoppe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly CartService cartService;
        private readonly CartDetailsService cartDetailsService;
        private readonly ShopService shopService;
        private readonly ProductService productService;
        private readonly OrderService orderService;
        private readonly OrderDetailService orderDetailService;
        public OrderController(CartService cartService, CartDetailsService cartDetailsService, ShopService shopService,
            ProductService productService, OrderService orderService, OrderDetailService orderDetailService)
        {
            this.cartService = cartService;
            this.cartDetailsService = cartDetailsService;
            this.shopService = shopService;
            this.productService = productService;
            this.orderService = orderService;
            this.orderDetailService = orderDetailService;
        }

        [HttpGet("AddOrder")]
        public async Task<IActionResult> AddOrder(int UserId)
        {
            CartDTO cart = await cartService.CartDTOByUserIdAsync(UserId);
            List<CartDetailDTO> cartDetail = await cartDetailsService.GetCartDTODetailByIdCartsAsync(cart.Id);
            var groupedByShop = cartDetail.GroupBy(cd => cd.ShopId);
            foreach (var shopGroup in groupedByShop)
            {
                var shopId = shopGroup.Key;
                var shopCartDetails = shopGroup.ToList();
                OrderDTO orderDTO = new OrderDTO
                {
                    UserId = UserId,
                    ShopId = shopId,
                    Status = "đã đặt",
                    TotalAmount = 0
                };
                int idorder = await orderService.CreateOrderAsync(orderDTO);
                foreach (var cartDetailDTO in shopCartDetails)
                {
                    ProductDto productDto = await productService.GetProductDTOByIdAsync(cartDetailDTO.ProductId);
                    OrderDetailDTO orderDetailDTO = new OrderDetailDTO
                    {
                        ProductId = cartDetailDTO.ProductId,
                        OrderId = idorder,
                        Quantity = cartDetailDTO.Quantity,
                        Price = cartDetailDTO.TotalPrice
                    };
                    await orderDetailService.CreateOrderDetailAsync(orderDetailDTO);
                    orderDTO.TotalAmount += cartDetailDTO.TotalPrice.GetValueOrDefault();
                    await cartDetailsService.DeleteCart(cartDetailDTO.Id);
                }
                await orderService.UpdateOrderAsync(idorder, orderDTO);
            }

            return Ok();
        }
        [HttpGet("ListOrder")]
        public async Task<IActionResult> ListOrder(int UserId, int type)
        {
            List<OrderDTO> orderDTOlist;
            if (type == 9)
            {
                orderDTOlist = await orderService.GetOrdersByUserIdAndStatusAsync(UserId, "Chờ lấy hàng");
            }
            else if (type == 7)
            {
                orderDTOlist = await orderService.GetOrdersByUserIdAndStatusAsync(UserId, "Đang vận chuyển");
            }
            else if (type == 8)
            {
                orderDTOlist = await orderService.GetOrdersByUserIdAndStatusAsync(UserId, "Chờ giao hàng");
            }
            else if (type == 3)
            {
                orderDTOlist = await orderService.GetOrdersByUserIdAndStatusAsync(UserId, "Hoàn thành");
            }
            else if (type == 4)
            {
                orderDTOlist = await orderService.GetOrdersByUserIdAndStatusAsync(UserId, "Đã huỷ");
            }
            else if (type == 12)
            {
                orderDTOlist = await orderService.GetOrdersByUserIdAndStatusAsync(UserId, "Hoàn tiền");
            }
            else
            {
                orderDTOlist = await orderService.GetOrdersByUserIdAsync(UserId);
            }

            if(orderDTOlist ==null)
            {
                return Ok();
            }
            List <Modeldata> modeldatass = new List<Modeldata>();
            foreach (var orderDTO in orderDTOlist)
            {
                ShopDto shopDto = await shopService.GetShopDTOByIdAsync(orderDTO.ShopId);
                List<OrderDetailDTO> orderDetailDTOList = await orderDetailService.GetOrderDetailsByOrderIdAsync(orderDTO.Id);
                foreach (var orderDetailDTO in orderDetailDTOList)
                {
                    ProductDto productDto = await productService.GetProductDTOByIdAsync(orderDetailDTO.ProductId);
                    Modeldata modeldata = new Modeldata()
                    {
                        OrderDTO = orderDTO,
                        orderDetailDTO = orderDetailDTO,
                        ProductDto = productDto,
                        ShopDto = shopDto,
                    };
                    modeldatass.Add(modeldata);
                }
            }
            return Ok(modeldatass);
        }
    }
}