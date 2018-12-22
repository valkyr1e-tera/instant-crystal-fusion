module.exports = function InstantCrystalFusion(mod) {
  const crystalCombineSlot = new Array(4).fill(false)
  mod.hook('C_ADD_CRYSTAL_COMBINE_MATERIAL', 1, event => {
    crystalCombineSlot[event.slot] = true

    if (!crystalCombineSlot.includes(false))
      mod.setTimeout(() => {
        mod.send('C_CRYSTAL_COMBINE_EXECUTE', 1, {})
      }, 300)
  })

  mod.hook('C_DEL_CRYSTAL_COMBINE_MATERIAL', 1, event => {
    crystalCombineSlot[event.slot] = false
  })

  const resetCrystalSlot = () => { crystalCombineSlot.fill(false) }
  mod.hook('S_REQUEST_CONTRACT', 1, resetCrystalSlot)
  mod.hook('C_CANCEL_CONTRACT', 1, resetCrystalSlot)
  mod.hook('S_CRYSTAL_COMBINE_RESULT', 1, resetCrystalSlot)
}