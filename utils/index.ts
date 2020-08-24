import { promises, Dirent } from 'fs'
import matter from 'gray-matter'

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

export const getServiceBy = async (slug: string, fields: string[]): Promise<Service> => {
  const path = `${defaultPath}${slug}/index.md`
  const file = await promises.readFile(path)
  const { data, content } = matter(file)

  const service = fields.reduce((service, field) => {
    switch (field) {
      case 'content':
        service['content'] = content
        return service
      default:
        if (data[field]) {
          service[field] = data[field]
        }
        return service
    }
  }, {} as Service)

  return service
}