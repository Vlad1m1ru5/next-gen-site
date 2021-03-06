import { findAllChaptersIn } from 'utils'

export const findAllPaths = async (): Promise<string[]> => {
  
  const chapters = await findAllChaptersIn()
  const paths = chapters.map(({ path }) => path)

  return paths
}

export const findAllTitles = async (): Promise<string[]> => {
  
  const titles = [
    'First Page',
    'Second Page',
    'Third Page'
  ]

  return titles
}

export const findAllByTitleIn = async (titles: string[] = []): Promise<string[]> => {

  const paths = titles
    .map(title => title.toLocaleLowerCase())
    .map(title => title.trim().replace(' ', '-'))

  return paths
}