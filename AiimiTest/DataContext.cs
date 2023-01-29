using AiimiTest.Entities;
using Microsoft.EntityFrameworkCore;

namespace AiimiTest
{
    public class DataContext : DbContext
    {
        protected override void OnConfiguring (DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "AiimiTest");
        }

        public DbSet<User> Users { get; set; }
    }
}
