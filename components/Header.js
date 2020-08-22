import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Header() {
  const { pathname } = useRouter()

  return (
    <header className="Navbar">
      <Link href="/">
        <a style={{textDecoration: 'none'}} className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
    </header>
  )
}