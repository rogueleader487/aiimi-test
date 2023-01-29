using AiimiTest.Entities;

namespace AiimiTest.Repositories
{
    public interface IUserRepository
    {
        List<User> GetByName(string name);

        SaveResult Create(User user);

        void CreateDummyData();
    }
}
