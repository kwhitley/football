import { useEffect } from 'react'

export function useDocumentTitle(title, alternate = 'Supergeneric') {
  useEffect(() => {
    document.title = [title, alternate].filter(n => !!n).join(' - ')
  }, [title])
}
