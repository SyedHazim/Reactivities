using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands
{
    public class CreateActivity
    {
        public class Command: IRequest<string>
        {
            public required Activity Activity {get;set;}
        }

        public class Handler(DataContext appContext) : IRequestHandler<Command, string>
        {
            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                appContext.Activities.Add(request.Activity);

                await appContext.SaveChangesAsync(cancellationToken);

                return request.Activity.Id;
            }
        }
    }
}