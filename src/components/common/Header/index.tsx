import { Box, Button, Flex, HStack, Icon, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FiShoppingBag, FiTruck, FiSearch } from 'react-icons/fi'

import Logo from 'src/components/ui/Logo'

export function Header() {
  return (
    <Box as="header">
      <Flex align="center" justify="space-between" maxW={1224} mx="auto" h={75}>
        <Logo />

        <HStack gap={6}>
          <Link href="#">Collections</Link>
          <Link href="#">Brands</Link>
          <Link href="#">News</Link>
          <Link href="#">Sales</Link>
        </HStack>

        <Stack direction="row">
          <Button>
            <Icon as={FiShoppingBag} />
          </Button>
          <Button>
            <Icon as={FiTruck} />
          </Button>
          <Button>
            <Icon as={FiSearch} />
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}
