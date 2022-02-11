using Microsoft.EntityFrameworkCore.Migrations;

namespace TeamStats.Web.Migrations
{
    public partial class UniqueTeams : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_teams_club_id",
                table: "teams");

            migrationBuilder.CreateIndex(
                name: "ix_teams_club_id_name",
                table: "teams",
                columns: new[] { "club_id", "name" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_teams_club_id_name",
                table: "teams");

            migrationBuilder.CreateIndex(
                name: "ix_teams_club_id",
                table: "teams",
                column: "club_id");
        }
    }
}
