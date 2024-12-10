import {AppNodeMissingInputs} from '@/types/appNode'
import {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from 'react'

type FlowValidationContextType = {
  invalidInputs: AppNodeMissingInputs[]
  setInvalidInputs: Dispatch<SetStateAction<AppNodeMissingInputs[]>>
  clearErrors: () => void
}
export const FlowValidationContext = createContext<FlowValidationContextType | null>(null)

export function FlowValidationContextProvider({children}: PropsWithChildren) {
  const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>([])
  const clearErrors = () => {
    setInvalidInputs([])
  }
  return (
    <FlowValidationContext.Provider
      value={{
        invalidInputs,
        setInvalidInputs,
        clearErrors
      }}
    >
      {children}
    </FlowValidationContext.Provider>
  )
}
