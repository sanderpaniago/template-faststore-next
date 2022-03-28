import Link from 'next/link'
import { Box, Button, Text } from '@chakra-ui/react'

type BannerTextProps = {
  title: string
  caption: string
  actionPath: string
  actionLabel: string
}

export default function BannerText({
  title,
  caption,
  actionPath,
  actionLabel,
}: BannerTextProps) {
  return (
    <Box background="#001947" py={10} d="flex">
      <Box mx="auto">
        <Text color="white" fontSize="3xl" fontWeight={600}>
          {title}
        </Text>
        <Text color="white" fontSize="3xl" fontWeight={600}>
          {caption}
        </Text>
        <Link href={actionPath}>
          <Button background="white" color="#001947" mx="auto" d="flex" mt={8}>
            {actionLabel}
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
