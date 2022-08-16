using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MG.WebHost.Migrations
{
    public partial class Added_TimetableRecord_Group : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Group",
                table: "TimetableRecords",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Group",
                table: "TimetableRecords");
        }
    }
}
