using System;
using System.Collections.Generic;

namespace LudinSchool.Models.VM
{
    public class ShortNewsVM
    {
        public string Slug { get; set; }
        public string Title { get; set; }
        public string SmallContent { get; set; }
        public string ImagePath { get; set; }
        public string CategoryName { get; set; }
        public DateTime Date { get; set; }
    }
}
