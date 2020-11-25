export default function ({ store, redirect }) {
  // If the user does not have a config in progress, redirect to create page
  if (!store.state.currentConfig.reserveCategories.length) {
    return redirect('/')
  }
}
