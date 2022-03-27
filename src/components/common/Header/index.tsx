import { Box, Button, Container, HStack, Icon, Stack } from '@chakra-ui/react'
import Link from 'next/link'
import { FiShoppingBag, FiTruck, FiSearch } from 'react-icons/fi'

import Logo from 'src/components/ui/Logo'

export function Header() {
  return (
    <Box as="header">
      <Container
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        maxW={1240}
        mx="auto"
        h={75}
      >
        <Logo />

        <HStack gap={6}>
          <Link href="#">Collections</Link>
          <Link href="#">Brands</Link>
          <Link href="#">News</Link>
          <Link href="#">Sales</Link>
        </HStack>

        <Stack direction="row">
          <Button aria-label="sacola de compras">
            <Icon as={FiShoppingBag} />
          </Button>
          <Button aria-label="delivery">
            <Icon as={FiTruck} />
          </Button>
          <Button aria-label="search">
            <Icon as={FiSearch} />
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}
