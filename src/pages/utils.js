export const getScoreLevel = ({ level }) => {
  const titleLevel = level[0].toUpperCase() + level.slice(1)
  const finalLevel = titleLevel.replace(/One/g, " Level 1")
    .replace(/Two/g, " Level 2")
    .replace(/Three/g, " Level 3")
    .replace(/All/g, " Level All")

  return finalLevel
}
