import './App.css'
import {
  selectCounter,
  useAppDispatch,
  useAppSelector,
  type CounterId,
  type DecrementAction,
  type IncrementAction,
} from './store'

function App() {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <Counter counterId='counter-1' />
        <Counter counterId='counter-2' />
      </div>
    </>
  )
}

export const Counter = ({ counterId }: { counterId: CounterId }) => {
  const dispatch = useAppDispatch()
  const counterState = useAppSelector(state => selectCounter(state, counterId))

  console.log('Render counter:', counterId)

  return (
    <>
      counter: {counterState?.counter}
      <button
        onClick={() =>
          dispatch({ type: 'increment', payload: { counterId } } as IncrementAction)
        }
      >
        increment
      </button>
      <button
        onClick={() =>
          dispatch({ type: 'decrement', payload: { counterId } } as DecrementAction)
        }
      >
        decrement
      </button>
    </>
  )
}

export default App
