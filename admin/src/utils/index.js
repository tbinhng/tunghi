export const onValidationState = (input) => {
  if (input.hasError) return 'error'
  return ''
}