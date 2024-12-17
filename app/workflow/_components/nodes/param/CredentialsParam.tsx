'use client'

import {GetCredentialsForUser} from '@/actions/credentials/getUserCredentials'
import {Label} from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {ParamProps} from '@/types/appNode'
import {useQuery} from '@tanstack/react-query'
import {useId} from 'react'

export default function CredentialsParam({param, updateNodeParamValue, value}: ParamProps) {
  const id = useId()
  const query = useQuery({
    queryKey: ['credentials-for-user'],
    queryFn: () => GetCredentialsForUser(),
    refetchInterval: 10000
  })
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label htmlFor={id} className="text-xs  flex">
        {param.name}
        {param.required && <p className="text-red-400 px-2">*</p>}
      </Label>
      <Select
        onValueChange={(value) => {
          updateNodeParamValue(value)
        }}
        defaultValue={value}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Credentials</SelectLabel>
            {query.data?.map((item) => {
              return (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
