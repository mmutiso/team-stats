using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityServer.Migrations
{
    public partial class UniqueIndexForEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "ix_application_user_registrations_email",
                table: "application_user_registrations",
                column: "email");

            migrationBuilder.CreateIndex(
                name: "ix_application_user_registrations_phone_number",
                table: "application_user_registrations",
                column: "phone_number");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_application_user_registrations_email",
                table: "application_user_registrations");

            migrationBuilder.DropIndex(
                name: "ix_application_user_registrations_phone_number",
                table: "application_user_registrations");
        }
    }
}
