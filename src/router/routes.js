import Home from '@/views/Home'
import Center from '@/views/Center'

const routes = [
	{
		name: "index",
		path: "/",
		redirect: { name: 'home' }
	},
	{
		name: 'home',
		path: '/home',
		component: Home,
		redirect: { name: 'center' },
		children: [
			{
				name: 'center',
				path: '/home/center',
				component: Center,
			}
		]
	},


];

export default routes