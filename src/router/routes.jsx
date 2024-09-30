import Index from '../pages/Index.jsx';
import NotFoundPage from '../pages/404.jsx';
import SignInPage from '../pages/auth/SignIn.jsx';
import ForgotPage from '../pages/auth/Forgot.jsx';
import Agents from '../pages/agents/Agents.jsx';
import Properties from '../pages/properties/Properties.jsx';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import AgentLayout from '../pages/agents/AgentsLayout.jsx';
import PropertiesLayout from '../pages/properties/PropertiesLayout.jsx';
import CreatePropertiesLayout from '../pages/properties/create/CreatePropertiesLayout.jsx';
import PDescription from '../pages/properties/create/description/Description.jsx';
import PLocation from '../pages/properties/create/location/Location.jsx';
import PMedia from '../pages/properties/create/media/Media.jsx';
import PAmenities from '../pages/properties/create/amenities/Amenities.jsx';
import PDetails from '../pages/properties/create/details/Details.jsx';
import CreateAgent from '../pages/agents/create/CreateAgent.jsx';
import EditAgent from '../pages/agents/edit/EditAgent.jsx';
import PrivateRoute from './private.jsx';
import AmenitiesLayout from '../pages/amenities/Amenities.jsx';
import {
  CreateAmenities,
  EditAmenities,
} from '../blocks/form/amenities/Amenities.jsx';
import LocationsLayout from '../pages/locations/Locations.jsx';
import {
  CreateLocations,
  EditLocations,
} from '../blocks/form/locations/Locations.jsx';
import FeaturesLayout from '../pages/features/FeaturesLayout.jsx';
import {
  CreateFeatures,
  EditFeatures,
} from '../blocks/form/features/Features.jsx';
import EnquiriesLayout from '../pages/inquiries/EnquiriesLayout.jsx';
import DevelopersLayout from '../pages/developers/DevelopersLayout.jsx';
import {
  CreateDevelopers,
  EditDevelopers,
} from '../blocks/form/developers/Developers.jsx';
import UsersLayout from '../pages/users/UsersPage.jsx';
import UserForm from '../blocks/form/users/UsersForm.jsx';
import ProjectLayout from '../pages/projects/Layout.jsx';
import ProjectPage from '../pages/projects/ProjectPage.jsx';
import CreateProjectsLayout from '../pages/projects/create/CreatePropertiesLayout.jsx';
import ProjectDesc from '../pages/projects/create/description/Description.jsx';
import ProjectDetails from '../pages/projects/create/details/Details.jsx';
import ProjectLocation from '../pages/projects/create/location/Location.jsx';
import ProjectAmenities from '../pages/projects/create/amenities/Amenities.jsx';
import ProjectMedia from '../pages/projects/create/media/Media.jsx';
import ProjectFormProvider from '../context/project-form/ProjectFormContext.jsx';
import LayoutTestimonials from '../layout/Testimonials.jsx';
import BlogsLayout from '../pages/blogs/BlogsLayout.jsx';
import TestimonialsPage from '../pages/testimonials/TestimonialsPage.jsx';
import TestiFormContextProvider from '../context/testimonials/TestiFormContext.jsx';
import FormTestimonials from '../blocks/form/testimonials/Testimonials.jsx';
import QRCodeTab from '../pages/properties/create/qr-code/QRCode.jsx';
import ProjectQRCodeTab from '../pages/projects/create/qr-code/QRCode.jsx';
import BlogsPage from '../pages/blogs/BlogsPage.jsx';
import BlogFormProvider from '../context/BlogsFormContext.jsx';
import BlogForm from '../blocks/form/blog/BlogForm.jsx';
import EnquiriesProvider from '../context/enquiries/enquiries-context.jsx';
import PasswordReset from '../blocks/PasswordReset.jsx';
import AuthLayout from '../pages/auth/AuthLayout.jsx';

const authRoutes = [
  {
    path: 'signin',
    element: <SignInPage />,
  },
  {
    path: 'forgot',
    element: <ForgotPage />,
  },
  {
    path: 'reset-password',

    element: (
      <AuthLayout>
        <PasswordReset />
      </AuthLayout>
    ),
  },
];

export const routes = [
  {
    path: '/',
    element: (
      // All children's are wrapped by PrivateRoute
      // <PrivateRoute>
      //   <DashboardLayout />
      // </PrivateRoute>
      <DashboardLayout />
    ),
    children: [
      {
        path: '',
        element: <Index />,
        index: true,
      },
      {
        path: 'products',
        element: <PropertiesLayout />,
        children: [
          {
            path: '',
            element: <Properties />,
            index: true,
          },
          {
            path: 'create',
            element: <CreatePropertiesLayout />,
            children: [
              {
                path: 'description',
                element: <PDescription />,
              },
              {
                path: 'media',
                element: <PMedia />,
              },
              {
                path: 'location',
                element: <PLocation />,
              },
              {
                path: 'details',
                element: <PDetails />,
              },
              {
                path: 'qr-code',
                element: <QRCodeTab />,
              },
              {
                path: 'amenities',
                element: <PAmenities />,
              },
            ],
          },
          {
            path: ':id',
            element: <Properties />,
          },
          {
            path: ':id/edit',
            element: <CreatePropertiesLayout />,
            children: [
              {
                path: 'description',
                element: <PDescription />,
              },
              {
                path: 'media',
                element: <PMedia />,
              },
              {
                path: 'location',
                element: <PLocation />,
              },
              {
                path: 'details',
                element: <PDetails />,
              },
              {
                path: 'qr-code',
                element: <QRCodeTab />,
              },
              {
                path: 'amenities',
                element: <PAmenities type="edit" />,
              },
            ],
          },
        ],
      },
      {
        path: 'categories',
        element: <FeaturesLayout />,
        children: [
          {
            path: '',
            element: <CreateFeatures />,
            index: true,
          },
          {
            path: ':id/edit',
            element: <EditFeatures />,
            index: true,
          },
        ],
      },
      {
        path: 'orders',
        element: (
          <EnquiriesProvider>
            <EnquiriesLayout />
          </EnquiriesProvider>
        ),
      },
      {
        path: 'developers',
        element: <DevelopersLayout />,
        children: [
          {
            path: '',
            element: <CreateDevelopers />,
            index: true,
          },
          {
            path: ':id/edit',
            element: <EditDevelopers />,
          },
        ],
      },
      {
        path: 'users',
        element: <UsersLayout />,
        children: [
          {
            path: '',
            element: <UserForm />,
          },
          {
            path: ':id/edit',
            element: <UserForm />,
          },
        ],
      },
      {
        path: 'blogs',
        element: <BlogsLayout />,
        children: [
          {
            path: '',
            element: <BlogsPage />,
            index: true,
          },
          {
            path: 'create',
            element: (
              <BlogFormProvider>
                <BlogForm />
              </BlogFormProvider>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <BlogFormProvider>
                <BlogForm />
              </BlogFormProvider>
            ),
          },
        ],
      },
      {
        path: 'reviews',
        element: <LayoutTestimonials />,
        children: [
          {
            path: '',
            element: <TestimonialsPage />,
            index: true,
          },
          {
            path: 'create',
            element: (
              <TestiFormContextProvider>
                <FormTestimonials />
              </TestiFormContextProvider>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <TestiFormContextProvider>
                <FormTestimonials />
              </TestiFormContextProvider>
            ),
          },
        ],
      },
      {
        path: 'gifts',
        element: <LayoutTestimonials />,
        children: [
          {
            path: '',
            element: <TestimonialsPage />,
            index: true,
          },
          {
            path: 'create',
            element: (
              <TestiFormContextProvider>
                <FormTestimonials />
              </TestiFormContextProvider>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <TestiFormContextProvider>
                <FormTestimonials />
              </TestiFormContextProvider>
            ),
          },
        ],
      },
      {
        path: 'points',
        element: <LayoutTestimonials />,
        children: [
          {
            path: '',
            element: <TestimonialsPage />,
            index: true,
          },
          {
            path: 'create',
            element: (
              <TestiFormContextProvider>
                <FormTestimonials />
              </TestiFormContextProvider>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <TestiFormContextProvider>
                <FormTestimonials />
              </TestiFormContextProvider>
            ),
          },
        ],
      },
    ],
  },
  ...authRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
