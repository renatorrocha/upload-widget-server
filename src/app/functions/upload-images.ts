import { Readable } from 'node:stream'
import { db } from '@/infra/db/migrations'
import { schema } from '@/infra/db/schemas'
import { z } from 'zod'

const uploadImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadImageInput = z.input<typeof uploadImageInput>

const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function uploadImage(input: UploadImageInput) {
  const { contentStream, contentType, fileName } = uploadImageInput.parse(input)

  if (!allowedMimeTypes.includes(contentType)) {
    throw new Error('Invalid file format.')
  }

  // todo: carregar a imagem p Cloudflare R2

  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: fileName,
    remoteUrl: fileName,
  })
}
