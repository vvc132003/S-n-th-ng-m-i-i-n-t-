using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Shoppe.Migrations
{
    /// <inheritdoc />
    public partial class initials : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShopId",
                table: "CartDetails",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CartDetails_ShopId",
                table: "CartDetails",
                column: "ShopId");

            migrationBuilder.AddForeignKey(
                name: "FK_CartDetails_Shops_ShopId",
                table: "CartDetails",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CartDetails_Shops_ShopId",
                table: "CartDetails");

            migrationBuilder.DropIndex(
                name: "IX_CartDetails_ShopId",
                table: "CartDetails");

            migrationBuilder.DropColumn(
                name: "ShopId",
                table: "CartDetails");
        }
    }
}
