using LudinSchool.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LudinSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsCategoryController : ControllerBase
    {

        private readonly NewsCategoryService _service;

        public NewsCategoryController(NewsCategoryService service)
        {
            _service = service;
        }

        [HttpGet("get-all-news-categories")]
        public IActionResult GetAllNewsCategories()
        {
            try
            {
                return Ok(_service.GetAllNewsCategories());
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
