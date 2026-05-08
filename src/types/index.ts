import type { Channel, Message, Profile } from '@/generated/prisma/client'

export type { Channel, Message, Profile }

export type MessageWithUser = Message & {
  user: Pick<Profile, 'username'>
}

export type ChannelWithCreator = Channel & {
  creator: Pick<Profile, 'username'> | null
}
