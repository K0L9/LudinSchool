using LudinSchool.Models.DTO.Images;
using LudinSchool.Models.DTO.News;
using LudinSchool.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LudinSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ImageService _imageService;

        public ImageController(ImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("add-image")]
        public IActionResult LoadImage([FromBody] AddImageDTO imageDTO)
        {
            try
            {
                string fileName = _imageService.SaveImage(imageDTO);
                return Ok(fileName);
            }
            catch (System.Exception)
            {
                return BadRequest("Errors");
            }
        }
        [HttpPost("connect-image-news")]
        public IActionResult ConnectImage([FromBody] ConnectImageToNewsDTO dto)
        {
            try
            {
                _imageService.ConnectImageToNews(dto);
                return Ok();
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex.Message);
                throw;
            }
        }
    }
}

