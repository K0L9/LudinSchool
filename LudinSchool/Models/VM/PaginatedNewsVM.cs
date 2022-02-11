using System.Collections.Generic;

namespace LudinSchool.Models.VM
{
    public class PaginatedNewsVM
    {
        public bool IsLast { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public IEnumerable<ShortNewsVM> News { get; set; }
    }
}
