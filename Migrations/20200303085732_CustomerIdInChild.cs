using Microsoft.EntityFrameworkCore.Migrations;

namespace ChildCarePlatform.Migrations
{
    public partial class CustomerIdInChild : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Child_Customer_CustomerId",
                table: "Child");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerId",
                table: "Child",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Child_Customer_CustomerId",
                table: "Child",
                column: "CustomerId",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Child_Customer_CustomerId",
                table: "Child");

            migrationBuilder.AlterColumn<int>(
                name: "CustomerId",
                table: "Child",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Child_Customer_CustomerId",
                table: "Child",
                column: "CustomerId",
                principalTable: "Customer",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
