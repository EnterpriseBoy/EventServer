using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventServerApi.Respository
{
    public interface IAuthRepository
    {
        string Login(string Email, string Password);
        string Register(string Email, string Password);
        string ConfirmAccount(Guid AccountId);
    }
}
