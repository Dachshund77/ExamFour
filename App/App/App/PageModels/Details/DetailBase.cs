using App.PageModels.MasterDetails;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.PageModels.Details
{
    public abstract class DetailBase : PageModelBase
    {
        public MasterDetailBase MasterDetail { get; set; }
    }
}
