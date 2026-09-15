export interface RouteConfig {
  path: string;
  title: string;
  description: string;
  component: string;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    title: 'Home | Your Company',
    description: 'Welcome to Your Company. We deliver innovative solutions that drive success.',
    component: 'HomePage'
  },
  {
    path: '/about',
    title: 'About Us | Your Company',
    description: 'Learn about Our Company, our mission, vision, and why we are the best choice for your needs.',
    component: 'AboutPage'
  },
  {
    path: '/contact',
    title: 'Contact Us | Your Company',
    description: 'Get in touch with Our Company. We are here to help you succeed.',
    component: 'ContactPage'
  },
  {
    path: '/services',
    title: 'Services | Your Company',
    description: 'Explore our range of professional services designed to meet your business goals.',
    component: 'ServicesPage'
  },
  {
    path: '/blog',
    title: 'Blog | Your Company',
    description: 'Stay updated with the latest news, insights, and trends from Our Company.',
    component: 'BlogPage'
  }
];

export default routes;