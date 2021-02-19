using System.Collections.Generic;
using EventServerApi.Models;

namespace EventServerApi.Respository
{
    public interface IEventRepository
    {
        IEnumerable<Event> GetAllEvents();
        Event GetEventById(int id);
    }
}