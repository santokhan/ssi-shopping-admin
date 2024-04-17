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
            path: ':id/edit',
            element: <EditAgent />,
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
                path: '',
                element: <PDescription />,
                index: true,
              },
              {
                path: 'details',
                element: <PDetails />,
              },
              {
                path: 'amenities',
                element: <PAmenities />,
              },
              {
                path: 'location',
                element: <PLocation />,
              },
              {
                path: 'media',
                element: <PMedia />,
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
    ],
  },
  ...authRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
