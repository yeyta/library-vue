import axios from "./request";

// 获取学生all
export const studentGet = () => {
	return axios({
		url: '/api/students',
		method: 'get'
	})
}

// 添加学生
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

// 编辑学生
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

// 删除学生
export const studentDel = (id) => {
	return axios({
		url: `/api/students/${id}`,
		method: 'delete',
	})
}
