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
import TestimonialsPage from '../pages/testimonials/TestimonialsPage.jsx';
import TestiFormContextProvider from '../context/testimonials/TestiFormContext.jsx';
import FormTestimonials from '../blocks/form/testimonials/Testimonials.jsx';
import QRCodeTab from '../pages/properties/create/qr-code/QRCode.jsx';
import ProjectQRCodeTab from '../pages/projects/create/qr-code/QRCode.jsx';

const authRoutes = [
  {
    path: 'signin',
    element: <SignInPage />,
  },
  {
    path: 'signup',
    element: <Index />,
  },
  {
    path: 'verify',
    element: <Index />,
  },
  {
    path: 'forgot',
    element: <ForgotPage />,
  },
];

export const routes = [
  {
    path: '/',
    element: (
      // All children's are wrapped by PrivateRoute
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    // All children's are wrapped by PrivateRoute
    children: [
      {
        path: '',
        element: <Index />,
        index: true,
      },
      {
        path: 'agents',
        element: <AgentLayout />,
        children: [
          {
            path: '',
            element: <Agents />,
            index: true,
          },
          {
            path: 'create',
            element: <CreateAgent />,
          },
          {
            path: ':id',
            children: [
              {
                path: '',
                element: <Agents />,
                index: true,
              },
              {
                path: 'edit',
                element: <EditAgent />,
              },
            ],
          },
        ],
      },
      {
        path: 'properties',
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
        path: 'amenities',
        element: <AmenitiesLayout />,
        children: [
          {
            path: '',
            element: <CreateAmenities />,
            index: true,
          },
          {
            path: ':id/edit',
            element: <EditAmenities />,
            index: true,
          },
        ],
      },
      {
        path: 'locations',
        element: <LocationsLayout />,
        children: [
          {
            path: '',
            element: <CreateLocations />,
            index: true,
          },
          {
            path: ':id/edit',
            element: <EditLocations />,
            index: true,
          },
        ],
      },
      {
        path: 'features',
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
        path: 'enquiries',
        element: <EnquiriesLayout />,
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
        path: 'projects',
        element: (
          <ProjectFormProvider>
            <ProjectLayout />
          </ProjectFormProvider>
        ),
        children: [
          {
            path: '',
            element: <ProjectPage />,
            index: true,
          },
          {
            path: 'create',
            element: <CreateProjectsLayout />,
            children: [
              {
                path: 'description',
                element: <ProjectDesc />,
              },
              {
                path: 'details',
                element: <ProjectDetails />,
              },
              {
                path: 'location',
                element: <ProjectLocation />,
              },
              {
                path: 'media',
                element: <ProjectMedia />,
              },
              {
                path: 'qr-code',
                element: <QRCodeTab />,
              },
              {
                path: 'amenities',
                element: <ProjectAmenities />,
              },
            ],
          },
          {
            path: ':id/edit',
            element: <CreateProjectsLayout />,
            children: [
              {
                path: 'description',
                element: <ProjectDesc />,
              },
              {
                path: 'details',
                element: <ProjectDetails />,
              },
              {
                path: 'location',
                element: <ProjectLocation />,
              },
              {
                path: 'media',
                element: <ProjectMedia />,
              },
              {
                path: 'qr-code',
                element: <ProjectQRCodeTab />,
              },
              {
                path: 'amenities',
                element: <ProjectAmenities type="edit" />,
              },
            ],
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
        path: 'testimonials',
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
    // All children's are wrapped by PrivateRoute
  },
  ...authRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
