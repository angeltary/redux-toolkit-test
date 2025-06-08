import z from 'zod'

const API_URL = 'http://localhost:3000'

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
})

export const api = {
  getUsers: () => {
    return fetch(`${API_URL}/users`)
      .then(response => response.json())
      .then(res => {
        return UserSchema.array().parse(res)
      })
  },

  getUser: (userId: string) => {
    return fetch(`${API_URL}/users/${userId}`)
      .then(response => response.json())
      .then(res => {
        return UserSchema.parse(res)
      })
  },

  deleteUser: (userId: string) => {
    return fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
    }).then(response => response.json())
  },
}
