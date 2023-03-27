import axios from "./request";

// 学生
export const studentGet = () => {
	return axios({
		url: '/api/students',
		method: 'get'
	})
}

export const studentAdd = (params) => {
	return axios({
		url: '/api/students',
		method: 'post',
		data: {
			data: {
				stu_num: params.stu_num,
				stu_name: params.stu_name,
				phone: params.phone,
				identity: params.identity,
				class: params.class,
				borrows: null,
			}
		}
	})
}

export const studentEdit = (id, params) => {
	return axios({
		url: `/api/students/${id}`,
		method: 'put',
		data: {
			data: {
				stu_num: params.stu_num,
				stu_name: params.stu_name,
				phone: params.phone,
				identity: params.identity,
				class: params.class,
			}
		}
	})
}

export const studentDel = (id) => {
	return axios({
		url: `/api/students/${id}`,
		method: 'delete',
	})
}

// 图书
export const bookGet = () => {
	return axios({
		url: '/api/books/?populate=type',
		method: 'get'
	})
}

export const bookAdd = (params) => {
	return axios({
		url: '/api/books/?populate=type',
		method: 'post',
		data: {
			data: {
				book_name: params.book_name,
				bookshelf: params.bookshelf,
				press: params.press,
				author: params.author,
				price: params.price,
				stock: params.stock,
				type: {
					id: params.type,
				}
			}
		}
	})
}

export const bookEdit = (id, params) => {
	return axios({
		url: `/api/books/${id}`,
		method: 'put',
		data: {
			data: {
				book_name: params.book_name,
				bookshelf: params.bookshelf,
				press: params.press,
				author: params.author,
				price: params.price,
				stock: params.stock,
				type: {
					id: params.type,
				}
			}
		}
	})
}

export const bookDel = (id) => {
	return axios({
		url: `/api/books/${id}`,
		method: 'delete',
	})
}


// 获取type
export const typeGet = () => {
	return axios({
		url: '/api/types',
		method: 'get'
	})
}
// 获取type one
export const typeGetOne = (id) => {
	return axios({
		url: `/api/types/${id}`,
		method: 'get'
	})
}


// 借阅信息
export const borrowGet = () => {
	return axios({
		url: '/api/borrows/?populate=student,book',
		method: 'get'
	})
}

export const borrowAdd = (params) => {
	return axios({
		url: '/api/borrows/?populate=student,book',
		method: 'post',
		data: {
			data: {
				borrow_date: params.borrow_date,
				back_date: params.back_date,
				isback: params.isback,
				student: {
					id: params.student,
				},
				book: {
					id: params.book,
				}
			}
		}
	})
}

export const borrowEdit = (id, params) => {
	return axios({
		url: `/api/borrows/${id}`,
		method: 'put',
		data: {
			data: {
				borrow_date: params.borrow_date,
				back_date: params.back_date,
				isback: params.isback,
			}
		}
	})
}

export const borrowDel = (id) => {
	return axios({
		url: `/api/borrows/${id}`,
		method: 'delete',
	})
}

// 公告
export const bulletinGet = () => {
	return axios({
		url: '/api/bulletins',
		method: 'get'
	})
}

export const bulletinAdd = (params) => {
	return axios({
		url: '/api/bulletins',
		method: 'post',
		data: {
			data: {
				title: params.title,
				bull_date: params.bull_date,
				content: params.content,
				publisher: params.publisher,
			}
		}
	})
}

export const bulletinEdit = (id, params) => {
	return axios({
		url: `/api/bulletins/${id}`,
		method: 'put',
		data: {
			data: {
				title: params.title,
				bull_date: params.bull_date,
				content: params.content,
				publisher: params.publisher,
			}
		}
	})
}

export const bulletinDel = (id) => {
	return axios({
		url: `/api/bulletins/${id}`,
		method: 'delete',
	})
}