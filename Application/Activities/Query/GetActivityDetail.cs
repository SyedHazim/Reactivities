using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Query
{
    public class GetActivityDetail
    {
        public class Query:IRequest<Activity>
        {
            public required string Id;
        }

        public class Handler(DataContext context) : IRequestHandler<Query, Activity>
        {
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Activities.FindAsync([request.Id],cancellationToken);

                if(activity == null) throw new Exception("Activity not found");

                return activity;
            }
        }
    }
}