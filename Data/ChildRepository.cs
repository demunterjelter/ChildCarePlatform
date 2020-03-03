using ChildCarePlatform.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChildCarePlatform.Data
{
    public class ChildRepository<T> : IDataRepository<T> where T : class
    {
        private readonly BabySittersContext _context;

        public ChildRepository(BabySittersContext context)
        {
            _context = context;
        }
        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public async Task<T> SaveAsync(T entity)
        {
            await _context.SaveChangesAsync();
            return entity;
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }
    }
}
