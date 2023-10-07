import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')
  const fieldProps = { type, value, onChange }

  return {
    fieldProps,
    reset,
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios.get(baseUrl).then((res) => setResources(res.data))
  }, [baseUrl])

  const create = (resource) => {
    axios
      .post(baseUrl, resource)
      .then((res) => setResources((prev) => [...prev, res.data]))
  }

  const service = {
    create,
  }

  return [resources, service]
}
