export default function access(initialState: any) {
  const role = initialState?.currentUser?.role;

  return {
    canAdmin: role === 'admin',
    canVetOrAdmin: role === 'vet' || role === 'admin',
    canAssistantOrAbove: role === 'assistant' || role === 'vet' || role === 'admin',
  };
}
