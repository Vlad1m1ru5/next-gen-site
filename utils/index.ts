import { promises, Dirent } from 'fs'

export const findAllEntries = async (path: string): Promise<Dirent[]> => (
  await promises.readdir(path, { withFileTypes: true })
)

export const getIsIndexIn = async (path: string): Promise<boolean> => {
  const entries = await findAllEntries(path)
  const isEntry = entries.some(({ name }) => name === 'index.md')

  return isEntry
}

const defaultPath = './_docs/'

export const findAllFoldersPathsIn = async (base = defaultPath): Promise<string[]> => {
  try {
    const entries = await findAllEntries(base)

    const folders = entries.filter((entry) => entry.isDirectory())
    const paths = folders.map(({ name }) => `${base}${name}/`)

    for (const path of paths) {
      paths.push(...await findAllFoldersPathsIn(path))
    }

    return paths
  } catch (error) {
    return []
  }
}

export const getAbsPath = (path: string, base = defaultPath): string => path.replace(base, '')
