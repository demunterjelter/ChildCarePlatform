﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChildCarePlatform.Models;
using ChildCarePlatform.Data;

namespace ChildCarePlatform.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly BabySittersContext _context;
        private readonly IDataRepository<Customer> _repo;

        public CustomersController(BabySittersContext context, IDataRepository<Customer> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Customers
        [HttpGet]
        public IEnumerable<Customer> GetCustomers()
        {
            return _context.Customer.Include(x => x.Children).ToList();
        }
            
        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var customer = await _context.Customer.Include(x => x.Children).FirstOrDefaultAsync(i => i.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // PUT: api/Customers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer([FromRoute] int id, [FromBody] Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                _repo.Update(customer);
                var save = await _repo.SaveAsync(customer);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

        // POST: api/Customers
        [HttpPost]
        public async Task<IActionResult> PostCustomer([FromBody] Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(customer);
            var save = await _repo.SaveAsync(customer);
            // _context.Customer.Add(customer);
            // await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
        }

        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var customer = await _context.Customer.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _repo.Delete(customer);
            var save = await _repo.SaveAsync(customer);
            // _context.Customer.Remove(customer);
            // await _context.SaveChangesAsync();

            return Ok(customer);
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }
    }
}
