import { promises, Dirent } from 'fs'

type Chapter = {
  name: string
  path: string
}

const findAllEntriesIn = async (path: string): Promise<Dirent[]> => (
  await promises.readdir(path, { withFileTypes: true })
)

const getIsChapterIn = (base: string) => (
  async (folder: Dirent) => {
    const path = `${base}${folder.name}`

    const entries = await findAllEntriesIn(path)

    return entries.some(({ name }) => name === 'index.md')
  }
)

const getChapterIn = (path: string) => (
  async ({ name }: Dirent) => {

    const chapter = {
      path: `${path}${name}`,
      name
    }

    return chapter
  }
)

export const findAllChaptersIn = async (path = './_docs/'): Promise<Chapter[]> => {
  const entries = await findAllEntriesIn(path)

  const chapters = Promise
    .all(entries
      .filter((entire) => entire.isDirectory())
      .filter(getIsChapterIn(path))
      .map(getChapterIn(path))
    )
    .then(chapters => chapters)

  return chapters
}