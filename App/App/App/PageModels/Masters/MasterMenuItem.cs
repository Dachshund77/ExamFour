using System;
using System.Collections.Generic;
using System.Text;

namespace App.PageModels.Masters
{
    public class MasterMenuItem
    {

        public string Title { get; set; }

        public Action OnClickAction { get; set; }

        public MasterMenuItem(string title, Action action)
        {
            this.Title = title;
            this.OnClickAction = action;
        }


    }
}
