using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class DeleteActivity
    {
        public class Command : IRequest
        {
            public required string Id {get;set;}
        }

        public class Handler(DataContext dataContext) : IRequestHandler<Command>
        {
            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await dataContext.Activities.FindAsync([request.Id],cancellationToken)?? throw new Exception("Activity Not Found");

                dataContext.Activities.Remove(activity);

                await dataContext.SaveChangesAsync(cancellationToken);
            }
        }
    }
}