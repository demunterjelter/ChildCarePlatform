using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChildCarePlatform.Data;
using ChildCarePlatform.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace ChildCarePlatform.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class BabySittersController : ControllerBase
    {
        private readonly BabySittersContext _context;
        private readonly IDataRepository<BabySitter> _repo;

        public BabySittersController(BabySittersContext context, IDataRepository<BabySitter> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/BabySitters
        [HttpGet]
        public IEnumerable<BabySitter> GetBabySitters()
        {
            return _context.BabySitter.Include(x => x.Customers).ToList();
        }

        // GET: api/BabySitters/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBabySitter([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var babySitter = await _context.BabySitter.Include(x => x.Customers).FirstOrDefaultAsync(i => i.Id == id);
            

            if (babySitter == null)
            {
                return NotFound();
            }

            return Ok(babySitter);
        }

        // PUT: api/BabySitters/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBabySitter([FromRoute]int id, [FromBody] BabySitter babySitter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != babySitter.Id)
            {
                return BadRequest();
            }

            _context.Entry(babySitter).State = EntityState.Modified;

            try
            {
                _repo.Update(babySitter);
                var save = await _repo.SaveAsync(babySitter);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BabySitterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BabySitters
        [HttpPost]
        public async Task<IActionResult> PostBabySitter([FromBody]BabySitter babySitter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(babySitter);
            var save = await _repo.SaveAsync(babySitter);

            return CreatedAtAction("GetBabySitters", new { id = babySitter.Id }, babySitter);
        }

        // DELETE: api/BabySitters/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBabySitter([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var babySitter = await _context.BabySitter.FindAsync(id);
            if (babySitter == null)
            {
                return NotFound();
            }

            _repo.Delete(babySitter);
            var save = _repo.SaveAsync(babySitter);

            return Ok(babySitter);
        }

        private bool BabySitterExists(int id)
        {
            return _context.BabySitter.Any(e => e.Id == id);
        }
    }
}
