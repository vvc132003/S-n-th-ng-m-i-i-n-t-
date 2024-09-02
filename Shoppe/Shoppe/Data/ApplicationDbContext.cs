using Microsoft.EntityFrameworkCore;
using Shoppe.Model.EF;

namespace Shoppe.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<CartDetail> CartDetails { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<ShippingAddresses> ShippingAddresses { get; set; }



        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.HasMany(u => u.Shops)
                      .WithOne(s => s.User)
                      .HasForeignKey(s => s.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(u => u.Carts)
                      .WithOne(c => c.User)
                      .HasForeignKey(c => c.UserId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(u => u.Orders)
                     .WithOne(o => o.User)
                     .HasForeignKey(o => o.UserId)
                     .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(u => u.ShippingAddresses)
                     .WithOne(o => o.User)
                     .HasForeignKey(o => o.UserId)
                     .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Shop>(entity =>
            {
                entity.HasKey(s => s.Id);

                entity.HasMany(s => s.Products)
                      .WithOne(p => p.Shop)
                      .HasForeignKey(p => p.ShopId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(s => s.Orders)
                     .WithOne(so => so.Shop)
                     .HasForeignKey(so => so.ShopId)
                     .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(s => s.CartDetails)
                     .WithOne(so => so.Shop)
                     .HasForeignKey(so => so.ShopId)
                     .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(c => c.Id);

                entity.HasMany(c => c.Products)
                      .WithOne(p => p.Category)
                      .HasForeignKey(p => p.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.HasMany(p => p.CartDetails)
                      .WithOne(cd => cd.Product)
                      .HasForeignKey(cd => cd.ProductId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(p => p.OrderDetails)
                    .WithOne(od => od.Product)
                    .HasForeignKey(od => od.ProductId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.HasKey(c => c.Id);

                entity.HasMany(c => c.CartDetails)
                      .WithOne(cd => cd.Cart)
                      .HasForeignKey(cd => cd.CartId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<CartDetail>(entity =>
            {
                entity.HasKey(cd => cd.Id);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(o => o.Id);

                entity.HasMany(o => o.OrderDetails)
                      .WithOne(so => so.Order)
                      .HasForeignKey(so => so.OrderId)
                      .OnDelete(DeleteBehavior.Restrict);

            });

         
            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(od => od.Id);
            });
            modelBuilder.Entity<ShippingAddresses>(entity =>
            {
                entity.HasKey(sh => sh.Id);
            });
        }
    }
}
