using App.PageModels;
using App.PageModels.Details;
using App.PageModels.MasterDetails;
using App.PageModels.Masters;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Reflection;
using System.Text;
using Xamarin.Forms;

namespace App.Services
{
    public class NavigationService
    {
        private readonly Action<Page> _SetPage;
        private readonly Func<Page> _GetPage;

        public NavigationService(Action<Page> setCall, Func<Page> getPage)
        {
            this._SetPage = setCall;
            this._GetPage = getPage;
        }

        public void ChangeToPage(PageModelBase pageModel)
        {
            try
            {
                //Create pages and model
                Page tempPage = CreatePage(pageModel.GetType());
                tempPage.BindingContext = pageModel;

                //Assign page via callback
                _SetPage.Invoke(tempPage);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }

        }

        public void ChangeNavigationPageRoot(PageModelBase pageModel)
        {
            try
            {
                //Create pages and model
                Page tempPage = CreatePage(pageModel.GetType());
                tempPage.BindingContext = pageModel;

                //Assign page via callback
                NavigationPage navigationPage = new NavigationPage(tempPage);
                _SetPage.Invoke(navigationPage);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
        }

        public void Push(PageModelBase pageModel)
        {
            try
            {
                //Create pages and model
                Page newPage = CreatePage(pageModel.GetType());
                newPage.BindingContext = pageModel;

                //Assign Via Callback 
                _GetPage.Invoke().Navigation.PushAsync(newPage);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
        }

        public void Pop()
        {
            try
            {
                NavigationPage navPage = _GetPage.Invoke() as NavigationPage;
                navPage.CurrentPage.Navigation.PopAsync();
                //mainPage.Navigation.PopAsync();  
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
        }

        public void PushMasterDetail(MasterDetailBase masterDetailPageModel, MasterBase masterPageModel, DetailBase detailPageModel)
        {
            try
            {
                //init Master Detail
                MasterDetailPage masterDetailPage = (MasterDetailPage)CreatePage(masterDetailPageModel.GetType());
                masterDetailPage.BindingContext = masterDetailPageModel;

                //Bind Master Details
                //TODO: I would like to bind in code behinde so that future implemntation will not need explecit binding in view

                //Assign startup Master
                AssignMasterToMD(masterDetailPage, masterPageModel);

                //Assing startup Detail
                AssignDetailToMD(masterDetailPage, detailPageModel);

                //Assign to view
                _GetPage.Invoke().Navigation.PushAsync(masterDetailPage);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
        }

        public void ChangeDetailPage(DetailBase detailPageModel)
        {
            try
            {
                MasterDetailPage mainPage = (_GetPage.Invoke() as NavigationPage).CurrentPage as MasterDetailPage;
                AssignDetailToMD(mainPage, detailPageModel);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
        }

        private void AssignDetailToMD(MasterDetailPage masterDetailPage, DetailBase detailPageModel)
        {
            //Init the Detail page
            Page detailPage = CreatePage(detailPageModel.GetType());
            detailPage.BindingContext = detailPageModel;

            //Get PageModel of MD
            MasterDetailBase masterDetailModel = masterDetailPage.BindingContext as MasterDetailBase;

            //Create relation in Page models
            masterDetailModel.DetailPageModel = detailPageModel; //MD knows of the MasterPageModel

            //Set the page in MD Page
            masterDetailPage.Detail = new NavigationPage(detailPage);
        }

        public void ChangeMasterPage(MasterBase masterPageModel)
        {
            try
            {
                MasterDetailPage mainPage = (_GetPage.Invoke() as NavigationPage).CurrentPage as MasterDetailPage;
                AssignMasterToMD(mainPage, masterPageModel);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
        }

        private void AssignMasterToMD(MasterDetailPage masterDetailPage, MasterBase masterPageModel)
        {
            //Init the Detail page
            Page masterPage = CreatePage(masterPageModel.GetType());
            masterPage.BindingContext = masterPageModel;

            //Get PageModel of MD
            MasterDetailBase masterDetailModel = masterDetailPage.BindingContext as MasterDetailBase;

            //Create relation in Page models
            masterDetailModel.MasterPageModel = masterPageModel; //MD knows of the MasterPageModel

            //Set the page in MD Page
            masterDetailPage.Master = masterPage;
        }

        private Page CreatePage(Type pageModelType) //Can i genneralize the return type?
        {
            Type pageType = GetPageTypeForPageModel(pageModelType); //Formats the name
            if (pageType == null)
            {
                throw new Exception($"Cannot locate page type for {pageModelType}");
            }
            Page page = Activator.CreateInstance(pageType) as Page; //Creates the instance

            return page;
        }

        private Type GetPageTypeForPageModel(Type pageModelType) //Format the type get fetch the type of the PageModel
        {
            var viewName = pageModelType.FullName.Replace("Model", string.Empty);
            var viewModelAssemblyName = pageModelType.GetTypeInfo().Assembly.FullName;
            var viewAssemblyName = string.Format(CultureInfo.InvariantCulture, "{0}, {1}", viewName, viewModelAssemblyName);
            var viewType = Type.GetType(viewAssemblyName);
            return viewType;
        }
    }
}
