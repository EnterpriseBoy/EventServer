using System.Collections.Generic;
using EventServerApi.Models;

namespace EventServerApi.Respository
{
    public class EventRepository : IEventRepository
    {
        public IEnumerable<Event> GetAllEvents()
        {
            var events = new List<Event>
            {
                new Event{Id=1,Name="Dublin Marathon",OrganizerId=1,StartDate=new System.DateTime(10/22/21),EndDate=new System.DateTime(10/22/21)},
                new Event{Id=2,Name="London Marathon",OrganizerId=2,StartDate=new System.DateTime(10/22/21),EndDate=new System.DateTime(10/22/21)}
            };
            return events;
        }

        public Event GetEventById(int id)
        {
            return new Event
            {
                Id=1,
                Name="Dubln Marathon",
                OrganizerId=1,
                StartDate=new System.DateTime(10/22/21),
                EndDate=new System.DateTime(10/22/21)
            };
        }
    }
}