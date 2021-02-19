using System;

namespace EventServerApi.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OrganizerId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}