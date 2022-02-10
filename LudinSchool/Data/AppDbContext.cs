using LudinSchool.Models;
using Microsoft.EntityFrameworkCore;

namespace LudinSchool.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<NewsCategory> NewsCategories { get; set; }
        public virtual DbSet<Image> Images { get; set; }
    }
}
