using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class EditActivity
    {
        public class Command: IRequest
        {
            public required Activity Activity {get; set;}
        }

        public class Handler(DataContext dataContext,IMapper mapper) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await dataContext.Activities.FindAsync([request.Activity.Id], cancellationToken)??
                throw new Exception("Cannot find activity");

                //activity.Title = request.Activity.Title;
                mapper.Map(request.Activity,activity);

                await dataContext.SaveChangesAsync(cancellationToken);
            }
        }
    }
}