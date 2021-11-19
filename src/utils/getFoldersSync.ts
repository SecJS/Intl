import { resolve, basename } from 'path'
import { readdirSync, readFileSync } from 'fs'
import { DirectoryContract } from '@secjs/contracts'

/**
 * Return all folders of a directory and files inside
 *
 * @param dir The directory
 * @param withFiles If need to get files inside folders by default false
 * @param buffer Return the buffer of the file by default false
 * @param fullPath Return the full path of folder or archive by default false
 * @return The directory root with sub folders and files when withFiles true
 */
export function getFoldersSync(
  dir: string,
  withFiles = false,
  buffer = false,
  fullPath = false,
): DirectoryContract {
  const dirents = readdirSync(dir, { withFileTypes: true })

  const directory = {
    path: fullPath ? resolve(dir) : basename(resolve(dir)),
    files: [],
    folders: [],
  }

  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name)

    if (dirent.isDirectory()) {
      directory.folders.push(getFoldersSync(res, withFiles, buffer, fullPath))

      continue
    }

    if (dirent.isFile() && withFiles) {
      directory.files.push({
        name: fullPath ? res : basename(res),
        value: buffer ? Buffer.from(res) : readFileSync(res, 'utf-8'),
      })
    }
  }

  return directory
}
