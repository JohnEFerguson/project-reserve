export default function ({ store, redirect }) {
  // If the user does not have a config in progress, redirect to create page
  console.log(store.state.currentConfig)
  if (!store.state.currentConfig.reserveCategories.length) {
    return redirect('/create')
  }
}
