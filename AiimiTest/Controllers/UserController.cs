using AiimiTest.Entities;
using AiimiTest.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace AiimiTest.Controllers
{
    [ApiController]
    [Route("[controller]")]    
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("{name}")]
        public IActionResult Get(string name)
        {
            return Ok(_userRepository.GetByName(name));
        }

        [HttpGet("getsuggestions/{name}")]
        public IActionResult GetSuggestions(string name)
        {
            var result = new List<string>();

            var users = _userRepository.GetByName(name);

            foreach(var user in users)
            {
                result.Add($"{user.FirstName} {user.LastName}");
            }

            return Ok(result);
        }

        [HttpPost]
        public IActionResult Post([FromBody] User value)
        {
            return Ok(_userRepository.Create(value));
        }
    }
}
