using LudinSchool.Data;
using LudinSchool.Models.VM;
using System.Collections.Generic;
using System.Linq;

namespace LudinSchool.Services
{
    public class NewsCategoryService
    {
        private readonly AppDbContext _db;

        public NewsCategoryService(AppDbContext db)
        {
            _db = db;
        }

        public IEnumerable<NewsCategoriesVM> GetAllNewsCategories()
        {
            try
            {
                return _db.NewsCategories.Select(x => new NewsCategoriesVM() { Id = x.Id, Name = x.Name });
            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}
