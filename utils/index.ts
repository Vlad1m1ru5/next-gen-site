import { promises, Dirent } from 'fs'
import path from 'path'

export const defaultPath = './_docs/'

export const findAllEntriesFor = async (path: string): Promise<Dirent[]> => (
  await promises.readdir(path, { withFileTypes: true })
)

export const getIsIndexFor = async (path: string): Promise<boolean> => {
  const entries = await findAllEntriesFor(path)
  const isEntry = entries.some(({ name }) => name === 'index.md')

  return isEntry
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

export const getTopicBySlug = (slug: string, fields: string[]): Items => {
  const topicPath = topicsDirectory, `index.md`
  const topicFile = fs.readFileSync(topicPath, "utf-8")
  const { data, content } = matter(topicFile)

  const fieldsItems = fields
    .reduce((items, field) => {
 
      if (field === 'slug') {
        items[field] = slug
      }

      if (field === 'content') {
        items[field] = content
      }
        
      const dataByField = data[field]
          
      if (dataByField){
        items[field] = dataByField
      }

      return items

  }, defaultItems)
  
  return fieldsItems
}