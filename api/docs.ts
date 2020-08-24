import { findAllFoldersPathsIn, getAbsPath, getIsIndexIn } from 'utils'

export const getAllPaths = async (): Promise<string[]> => {
  
  const paths = await findAllFoldersPathsIn()

  return paths
}

export const getAbsUrl = (path: string): string => `/${getAbsPath(path)}`

export const getAllEntriesIn = async (paths: string[]): Promise<string[]> => {
 
  const entries = []

  for (const path of paths) {
    if (await getIsIndexIn(path)) {
      entries.push(path)
    }
  }

  return entries
}