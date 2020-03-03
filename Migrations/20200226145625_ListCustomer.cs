using Microsoft.EntityFrameworkCore.Migrations;

namespace ChildCarePlatform.Migrations
{
    public partial class ListCustomer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BabySitterId",
                table: "Customer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Customer_BabySitterId",
                table: "Customer",
                column: "BabySitterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Customer_BabySitter_BabySitterId",
                table: "Customer",
                column: "BabySitterId",
                principalTable: "BabySitter",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customer_BabySitter_BabySitterId",
                table: "Customer");

            migrationBuilder.DropIndex(
                name: "IX_Customer_BabySitterId",
                table: "Customer");

            migrationBuilder.DropColumn(
                name: "BabySitterId",
                table: "Customer");
        }
    }
}
