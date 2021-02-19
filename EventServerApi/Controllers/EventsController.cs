using System;
using System.Collections.Generic;
using EventServerApi.Models;
using EventServerApi.Respository;
using Microsoft.AspNetCore.Mvc;

namespace EventServerApi.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private IAuthRepository authRepository { get; }
        public IEventRepository eventRepo { get; }

        public EventsController(IAuthRepository AuthRepository,IEventRepository EventRepository)
        {
            authRepository = AuthRepository;
            eventRepo = EventRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Event>> GetAllEvent()
        {
            var events = eventRepo.GetAllEvents();

            return Ok(events);
        }
        
        [HttpGet("{id}")]
        public ActionResult<Event> GetEventById(int id)
        {
            var eventItem = eventRepo.GetEventById(id);

            return Ok(eventItem);
        }

        [HttpPost]
        [Route("Login")]
        public string login(string username,string password)
        {
            return authRepository.Login(username, password);
        }

        [HttpPost]
        [Route("Register")]
        public string Register(string username, string password)
        {
            return authRepository.Register(username, password);
        }

        [HttpPost]
        [Route("ConfirmAccount")]
        public string ConfirmAccount(Guid accountId)
        {
            return authRepository.ConfirmAccount(accountId);
        }
    }
}