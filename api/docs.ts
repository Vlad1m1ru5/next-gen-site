import { findAllFoldersPathsFor, getAbsPath, getIsIndexFor } from 'utils'

export const getAllPaths = async (): Promise<string[]> => {
  
  const paths = await findAllFoldersPathsFor()

  return paths
}

export const getAbsUrl = (path: string): string => `/${getAbsPath({ path })}`

export const getAllEntriesIn = async (paths: string[]): Promise<string[]> => {
 
  const entries = []

  for (const path of paths) {
    if (await getIsIndexFor(path)) {
      entries.push(path)
    }
  }

  return entries
}

export const getAllTomesIn = async (paths: string[]): Promise<string[]> => {
  
  const tomes = []

  for (const path of paths) {
    const folders = await findAllFoldersPathsFor(path)

    if (folders.length) {
      tomes.push(path)
    }
  }

  return tomes
}
