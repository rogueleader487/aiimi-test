using AiimiTest.Entities;
using CsvHelper;
using System.Globalization;

namespace AiimiTest.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public void CreateDummyData()
        {
            using (var reader = new StreamReader("InterviewTestData.csv"))
            {
                using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                {
                    csv.Context.RegisterClassMap<UserMap>();
                    var records = csv.GetRecords<User>();

                    foreach (var record in records)
                    {
                        _context.Users.Add(record);
                    }

                    _context.SaveChanges();
                }
            }
        }

        public SaveResult Create(User user)
        {
            if (GetByName($"{user.FirstName} {user.LastName}").Any()) 
            {
                return SaveResult.DuplicateExists;
            }

            _context.Users.Add(user);
            _context.SaveChanges();

            return SaveResult.Success;
        }

        public List<User> GetByName(string name)
        {
            return _context.Users.Where(x => x.FirstName.ToLower().Contains(name.ToLower())
            || x.LastName.ToLower().Contains(name.ToLower())
            || string.Concat(x.FirstName.ToLower(), " ", x.LastName.ToLower()).Contains(name.ToLower())).ToList();
        }
    }
}
