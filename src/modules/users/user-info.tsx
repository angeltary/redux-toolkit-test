import { useNavigate, useParams } from 'react-router-dom'
import { deleteUser } from './model/delete-user'
import { usersSlice, type UserId } from './users-slice'
import { useAppDispatch, useAppSelector } from '../shared/redux'

export function UserInfo() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state =>
    usersSlice.selectors.selectIsFetchUserLoading(state),
  )

  const { id = '1' } = useParams<{ id: UserId }>()

  const isDeleting = useAppSelector(state =>
    usersSlice.selectors.selectIsDeleteUserLoading(state),
  )

  const user = useAppSelector(state => usersSlice.selectors.selectUserById(state, id))

  const handleBackButtonClick = () => {
    navigate('..', { relative: 'path' })
  }

  const handleDeleteButtonClick = () => {
    dispatch(deleteUser(id)).then(() => {
      navigate('..', { relative: 'path' })
    })
  }

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col items-center'>
      <button
        onClick={handleBackButtonClick}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md'
      >
        Back
      </button>
      <h2 className='text-3xl'>{user.name}</h2>
      <p className='text-xl'>{user.description}</p>
      <button
        onClick={handleDeleteButtonClick}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        disabled={isDeleting}
      >
        Delete
      </button>
    </div>
  )
}
