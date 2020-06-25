using App.PageModels.Details;
using App.PageModels.Masters;
using System;
using System.Collections.Generic;
using System.Text;

namespace App.PageModels.MasterDetails
{
    public abstract class MasterDetailBase : PageModelBase

    {

        private MasterBase _MasterPageModel;
        private DetailBase _DetailPageModel;
        private bool _IsPresented;

        public MasterBase MasterPageModel
        {
            get
            {
                return _MasterPageModel;
            }
            set
            {
                _MasterPageModel = value;
                _MasterPageModel.MasterDetail = this;
            }
        }

        public DetailBase DetailPageModel
        {
            get
            {
                return _DetailPageModel;
            }
            set
            {
                _DetailPageModel = value;
                _DetailPageModel.MasterDetail = this;
            }
        }

        public bool IsPresented
        {
            get
            {
                return _IsPresented;
            }
            set
            {
                _IsPresented = value;
                NotifyPropertyChanged();
            }
        }

        public void ChangeMasterPage(MasterBase masterPageModel) //I tkin i would prefer setup here instead of in the navigation service.
        {
            //((App)App.Current).NavigationService.ChangeMasterPage(this.GetType(), masterModelType, out MasterBase masterPageModel); //This might be iffy
            ((App)App.Current).NavigationService.ChangeMasterPage(masterPageModel);

        }

        public void ChangeDetailPage(DetailBase detailPageModel)
        {
            //((App)App.Current).NavigationService.ChangeDetailPage(this.GetType(), detailModelType, out DetailBase detailPageModel);
            ((App)App.Current).NavigationService.ChangeDetailPage(detailPageModel);

        }
    }
}
