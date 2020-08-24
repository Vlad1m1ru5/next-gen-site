import { promises, Dirent } from 'fs'

export const defaultPath = './_docs/'

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

export const findAllFolders = async (base = defaultPath): Promise<string[]> => {
  try {
    const entries = await findAllEntriesFor(base)

    const folders = entries
      .filter((entry) => entry.isDirectory())
      .map(({ name }) => name)

    return folders
  } catch (error) {
    return []
  }
}

export const findAllServicesIn = async (folders: string[]): Promise<string[]> => {
  const services: string[] = []
  
  try {
    for (const folder of folders) {
      if(await getIsIndexFor(`${defaultPath}${folder}`)) {
        services.push(folder)
      }
    }
  
    return services
  } catch (error) {
    return services
  }
}