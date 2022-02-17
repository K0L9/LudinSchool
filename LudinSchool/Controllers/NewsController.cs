using LudinSchool.Models.DTO.News;
using LudinSchool.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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

        [HttpGet("get-all-news")]
        public async Task<IActionResult> GetAllNews()
        {
            try
            {
                var news = await _newsService.GetAllNews();
                return Ok(news);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-news")]
        public async Task<IActionResult> GetPaginatedNews(int pageSize, int pageCount)
        {
            try
            {
                var news = await _newsService.GetPaginatedNews(pageSize, pageCount);
                return Ok(news);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-news-detail")]
        public async Task<IActionResult> GetNewsDetail(int id)
        {
            try
            {
                var news = await _newsService.GetNewsDetail(id);
                return Ok(news);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("add-news")]
        public async Task<IActionResult> AddNews(AddNewsDTO newsDTO)
        {
            try
            {
                int result = await _newsService.AddNews(newsDTO);
                return Ok(result);
            }
            catch (System.Exception)
            {
                return BadRequest("Some error");
            }
        }

        [HttpDelete("delete-news/{id}")]
        public IActionResult DeleteNews(int id)
        {
            try
            {
                _newsService.DeleteNews(id);
                return Ok();
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("edit-news")]
        public IActionResult EditNews([FromBody] EditNewsDTO newsDTO)
        {
            try
            {
                _newsService.EditNews(newsDTO);
                return Ok();
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
