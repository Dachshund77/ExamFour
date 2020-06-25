using System;
using System.Collections.Generic;
using System.Text;

namespace App
{
    public class Credentials
    {
        string UserName;
        string Password;

        public Credentials(string userName, string password)
        {
            this.UserName = userName;
            this.Password = password;
        }
    }
}
