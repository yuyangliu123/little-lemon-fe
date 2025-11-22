import { useEffect, useState } from 'react';

const FloatingNav = ({ children }) => {
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [navBarTop, setNavBarTop] = useState('0');
  useEffect(() => {
    const handleScroll = () => {
      let st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        // 向下滚动时隐藏
        if (navBarTop !== '-100px') {
          setNavBarTop('-100px');
        }
      } else {
        // 向上滚动时显示
        if (navBarTop !== '0') {
          setNavBarTop('0');
        }
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <Box
      position="fixed"
      width="100%"
      zIndex="1000"
      backgroundColor="#FFFFFF"
      height="auto"
      transition="top 0.3s"
      top={navBarTop}
    >
      {children}
    </Box>
  );
}

export default FloatingNav;

