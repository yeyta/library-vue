import Home from '@/views/Home'
import Center from '@/views/Center' // 首页
import Student from '@/views/Student' // 学生管理
import Book from '@/views/Book' // 图书管理
import Borrow from '@/views/Borrow' // 借阅管理
import Notice from '@/views/Notice' // 公告管理

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
			},
			{
				name: 'student',
				path: '/home/student',
				component: Student,
			},
			{
				name: 'book',
				path: '/home/book',
				component: Book,
			},
			{
				name: 'borrow',
				path: '/home/borrow',
				component: Borrow,
			},
			{
				name: 'notice',
				path: '/home/notice',
				component: Notice,
			},

			
		]
	},


];

export default routes