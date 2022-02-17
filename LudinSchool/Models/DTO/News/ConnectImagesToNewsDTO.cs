using System.Collections.Generic;

namespace LudinSchool.Models.DTO.News
{
    public class ConnectImagesToNewsDTO
    {
        public int NewsId { get; set; }
        public IEnumerable<string> FileNames { get; set; }
    }
}
