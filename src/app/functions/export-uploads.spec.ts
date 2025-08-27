import { randomUUID } from 'node:crypto'
import { Readable } from 'node:stream'
import { db } from '@/infra/db/migrations'
import { schema } from '@/infra/db/schemas'
import { isRight, unwrapEither } from '@/shared/either'
import { makeUpload } from '@/test/factories/make-upload'
import dayjs from 'dayjs'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { exportUploads } from './export-uploads'
import { getUploads } from './get-uploads'
import { uploadImage } from './upload-images'

describe('export uploads', () => {
  it('should be able to export the uploads', async () => {
    const namePattern = randomUUID()

    const upload1 = await makeUpload({ name: `${namePattern}.webp` })
    const upload2 = await makeUpload({ name: `${namePattern}.webp` })
    const upload3 = await makeUpload({ name: `${namePattern}.webp` })
    const upload4 = await makeUpload({ name: `${namePattern}.webp` })
    const upload5 = await makeUpload({ name: `${namePattern}.webp` })

    // system under test (SUT)
    const sut = await exportUploads({
      searchQuery: namePattern,
    })
  })
})
