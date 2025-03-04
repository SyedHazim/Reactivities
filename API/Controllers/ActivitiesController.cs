using Application.Activities.Commands;
using Application.Activities.Query;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new GetActivityList.Query());//await context.Activities.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(string id)
        {
            return await Mediator.Send(new GetActivityDetail.Query{Id = id});
            
        }

        [HttpPost]
        public async Task<ActionResult<string>> CreateActivity(Activity activity)
        {
            return await Mediator.Send(new CreateActivity.Command{Activity=activity});
        }

        [HttpPut]
        public async Task<ActionResult> EditActivity(Activity activity)
        {
             await Mediator.Send(new EditActivity.Command{Activity = activity});

             return NoContent();
        }

        [HttpDelete("{Id}")]

        public async Task<ActionResult> DeleteActivity(string Id)
        {
            await Mediator.Send(new DeleteActivity.Command{Id=Id});

            return Ok();
        }
    }
}