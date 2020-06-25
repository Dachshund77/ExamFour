using App.PageModels.MasterDetails;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace App.PageModels.Masters
{
    public abstract class MasterBase : PageModelBase
    {
        private MasterMenuItem _Selecteditem;

        public MasterDetailBase MasterDetail { get; set; }

        public MasterMenuItem SelectedItem
        {
            get
            {
                return _Selecteditem;
            }
            set
            {
                _Selecteditem = value;
                if (value != null)
                {
                    MasterDetail.IsPresented = false;
                    SelectMenuItem(value);
                }
                NotifyPropertyChanged();
            }
        }

        public ObservableCollection<MasterMenuItem> MenuItems { get; set; }


        public MasterBase()
        {
            this.MenuItems = new ObservableCollection<MasterMenuItem>();
        }

        private async void SelectMenuItem(MasterMenuItem menuItem)
        {
            try
            {
                if (!IsBusy)
                {
                    IsBusy = true;
                    Action OnClickAction = menuItem?.OnClickAction;
                    OnClickAction?.Invoke();

                }
            }
            catch (Exception e)
            {
                await ((App)App.Current).MainPage.DisplayAlert("Error", e.Message, "Ok");
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
            finally
            {
                IsBusy = false;
            }
        }

    }
}
