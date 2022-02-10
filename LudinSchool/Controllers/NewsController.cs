using LudinSchool.Models.DTO.News;
using LudinSchool.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LudinSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly NewsService _newsService;

        public NewsController(NewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpPost("add-news")]
        public IActionResult AddNews(AddNewsDTO newsDTO)
        {
            try
            {
                _newsService.AddNews(newsDTO);
                return Ok();
            }
            catch (System.Exception)
            {
                return BadRequest("Some error");
            }
        }
    }
}
