import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../shared/redux'
import { usersSlice, type UserId } from './users-slice'

export function UsersList() {
  const [sortType, setSortType] = useState<'asc' | 'desc'>('asc')

  const isLoading = useAppSelector(usersSlice.selectors.selectIsFetchUsersLoading)

  const sortedUsers = useAppSelector(state =>
    usersSlice.selectors.selectSortedUsers(state, sortType),
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col items-center justify-between'>
        <div className='flex flex-row items-center'>
          <button
            onClick={() => setSortType('asc')}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Asc
          </button>
          <button
            onClick={() => setSortType('desc')}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'
          >
            Desc
          </button>
        </div>
        <ul className='list-none'>
          {sortedUsers.map(user => (
            <UserListItem userId={user.id} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  )
}

const UserListItem = memo(function UserListItem({ userId }: { userId: UserId }) {
  const navigate = useNavigate()
  const user = useAppSelector(state => state.users.entities[userId])
  const handleUserClick = () => {
    navigate(userId, { relative: 'path' })
  }

  if (!user) {
    return null
  }

  return (
    <li key={user.id} className='py-2' onClick={handleUserClick}>
      <span className='hover:underline cursor-pointer'>{user.name}</span>
    </li>
  )
})
