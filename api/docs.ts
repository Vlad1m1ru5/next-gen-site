export const findAllTitles = async (): Promise<string[]> => {
  
  return [
    'First Page',
    'Second Page',
    'Third Page'
  ]
}

export const findAllByTitleIn = async (titles: string[] = []): Promise<string[]> => {

  const paths = titles
    .map(title => title.toLocaleLowerCase())
    .map(title => title.trim().replace(' ', '-'))

  return paths
}