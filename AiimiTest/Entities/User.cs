using CsvHelper.Configuration;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace AiimiTest.Entities
{    
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string JobTitle { get; set; }

        public string Phone { get; set; }

        public string Email { get; set; }
    }

    public class UserMap : ClassMap<User>
    {
        public UserMap() 
        {
            AutoMap(CultureInfo.InvariantCulture);
            Map(u => u.Id).Ignore();
        }
    }
}
