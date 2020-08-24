import { promises, Dirent } from 'fs'

const defaultPath = './_docs/'

export const findAllEntriesFor = async (path: string): Promise<Dirent[]> => (
  await promises.readdir(path, { withFileTypes: true })
)

export const getIsIndexFor = async (path: string): Promise<boolean> => {
  const entries = await findAllEntriesFor(path)
  const isEntry = entries.some(({ name }) => name === 'index.md')

  return isEntry
}

export const findAllFoldersPathsFor = async (base = defaultPath): Promise<string[]> => {
  try {
    const entries = await findAllEntriesFor(base)

    const folders = entries.filter((entry) => entry.isDirectory())
    const paths = folders.map(({ name }) => `${base}${name}/`)

    for (const path of paths) {
      paths.push(...await findAllFoldersPathsFor(path))
    }

    return paths
  } catch (error) {
    return []
  }
}

export const getAbsPath = ({
  path,
  base = defaultPath
}: {
  path: string,
  base?: string
}): string => path.replace(base, '')
