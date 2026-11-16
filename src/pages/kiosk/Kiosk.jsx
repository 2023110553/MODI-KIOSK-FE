import { useEffect, useRef, useState } from 'react'
import { accessibilityOptions, defaultProfile } from '../../features/personalization/profile.js'
import { catalog } from './catalog.js'
import { categories, kioskImage, menuProduct, won } from './menu.js'
import ProductOptions from './ProductOptions.jsx'
import CartRows from './CartRows.jsx'
import Checkout from './Checkout.jsx'
import { KioskFrame } from './styles.js'
import { useNfcInput } from '../../hooks/useNfcInput.js' // NFC 훅 임포트

const START_PHOTO_MS = 5_000
const startPhotos = ['hero', 'hero-mango', 'hero-matcha', 'hero-coffee']

function StartPhotos() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % startPhotos.length)
    }, START_PHOTO_MS)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="hero" aria-hidden="true">
      {startPhotos.map((name, index) => (
        <img key={name} src={kioskImage(name)} alt="" data-photo={name} data-current={index === current} />
      ))}
    </div>
  )
}

function KioskToolbar({ onHome, startScreen = false, detail = false, helpOnly = false }) {
  return (
    <header className="toolbar">
      {onHome && <button onClick={onHome}><img src={kioskImage('home')} alt="" />처음으로</button>}
      {!helpOnly && <div className="flags" aria-label="언어 선택">
        {(detail ? ['ko'] : ['ko', 'en', 'ja', 'zh']).map((language) => (
          <img key={language} src={kioskImage(`flag-${language}`)} alt={language.toUpperCase()} />
        ))}
      </div>}
      <div className="toolbar-end">
        {startScreen && <span><img src={kioskImage('voucher')} alt="" />모바일상품권 조회</span>}
        <span><img src={kioskImage('help')} alt="" />직원도움요청</span>
      </div>
    </header>
  )
}

function PreviewSettings({ profile, onChange }) {
  return (
    <details className="preview">
      <summary>접근성 프로필 테스트</summary>
      <p>설정 조합을 확인하는 개발용 패널입니다.</p>
      {accessibilityOptions.map(([key, label]) => (
        <label key={key}>
          <input type="checkbox" checked={profile[key]} onChange={(event) => onChange(key, event.target.checked)} />
          {label}
        </label>
      ))}
    </details>
  )
}

const figmaUnit = (pixels) => `${pixels / 10.8}cqw`
const LARGE_TEXT_PAGE_SIZE = 9

/* 큰 글씨: 한 페이지 16개로 나뉜 메뉴를 9개(3 x 3)씩 다시 나눔 */
function paginate(pages, large) {
  if (!large) return pages
  const items = pages.flat()
  return Array.from({ length: Math.ceil(items.length / LARGE_TEXT_PAGE_SIZE) }, (_, index) => (
    items.slice(index * LARGE_TEXT_PAGE_SIZE, (index + 1) * LARGE_TEXT_PAGE_SIZE)
  ))
}

/* 큰 글씨: 한 줄을 넘는 카테고리를 오른쪽으로 넘겨 보는 버튼 */
function MoreButton({ label }) {
  return (
    <button className="row-more" aria-label={`${label} 더 보기`}
      onClick={(event) => event.currentTarget.parentElement.scrollBy({ left: event.currentTarget.parentElement.clientWidth * .7, behavior: 'smooth' })}>
      &gt;
    </button>
  )
}
const compactLabels = new Set([
  '솔티드 카라멜 라떼',
  '부드러운 고구마 생크림 케이크(쁘띠)',
  'P.바스트 치즈 케이크(고르곤졸라)',
  '[세트]부드러운 에그 잉글리쉬 머핀',
  '[세트]스크램블 에그 샌드위치',
  '[세트]크랜베리 치킨 샌드위치',
])

function ProductCard({ item, onSelect }) {
  const [label, titleTop, crop] = item.layer
  const compact = compactLabels.has(item.name)
  const [left, top, width, height, maskWidth, maskHeight] = crop ?? [0, 0, 97, 97, 97, 97]

  return (
    <button className="product" disabled={Boolean(item.availability)} onClick={onSelect}>
      {item.badge && <span className="badge" data-badge={item.badge}>{item.badge}</span>}
      <span className="product-image" style={{ width: figmaUnit(maskWidth), height: figmaUnit(maskHeight) }}>
        <img src={kioskImage(item.image)} alt="" style={{
          left: figmaUnit(left), top: figmaUnit(top), width: figmaUnit(width), height: figmaUnit(height),
        }} />
      </span>
      <strong data-lines={compact || /[\n\u2028]/.test(label) ? 'fixed' : undefined} data-compact={compact} style={{ top: figmaUnit(titleTop) }}>
        {label.replaceAll('\u2028', '\n')}
      </strong>
      <span className="product-price">{item.availability ?? won(item.price)}</span>
    </button>
  )
}

export default function Kiosk() {
  const [profile, setProfile] = useState(defaultProfile)
  const [screen, setScreen] = useState('start')
  const [service, setService] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [section, setSection] = useState(categories[0])
  const [page, setPage] = useState(0)
  const [product, setProduct] = useState(null)
  const [cart, setCart] = useState([])
  const cartScroll = useRef(null)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const sections = Object.keys(catalog[category])
  const pages = paginate(catalog[category][section] ?? [], profile.large)
  const currentPage = Math.min(page, Math.max(pages.length - 1, 0))
  const products = pages[currentPage] ?? []
  const step = screen === 'complete' ? 2 : screen === 'payment' ? 1 : 0
  const showSteps = ['menu', 'review', 'payment', 'complete'].includes(screen)

  // 2. NFC 태그 감지 시 실행될 비동기 핸들러 (백엔드 API 연동)
  const onTagScanned = async (uid) => {
    console.log('NFC UID 감지됨:', uid)

    try {
      // 백엔드 API 호출 (실제 백엔드 엔드포인트 주소에 맞게 조정)
      const KIOSK_CODE = 'KIOSK-001';
      const response = await fetch(
  `/api/kiosks/${KIOSK_CODE}/nfc`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ uid }),
  }
);

console.log('[NFC] HTTP 상태:', response.status);
console.log('[NFC] 요청 URL:', response.url);

const responseText = await response.text();

console.log('[NFC] 서버 응답 원문:', responseText);

if (!response.ok) {
  throw new Error(
    `NFC API 실패 (HTTP ${response.status}): ${responseText}`
  );
}

const responseData = JSON.parse(responseText);
console.log('[NFC] 응답 데이터:', responseData);
      // 백엔드에서 반환된 접근성 프로필을 프론트엔드 상태에 반영
      setProfile({
        simple: profileData.lowerScreen ?? defaultProfile.simple,
        contrast: profileData.highContrast ?? defaultProfile.contrast,
        guidance: profileData.touchGuide ?? defaultProfile.guidance,
        reach: profileData.lowerScreen ?? defaultProfile.reach,
      })

      console.log('접근성 프로필 적용 완료:', profileData)
    } catch (error) {
  console.error('NFC 연동 에러:', error);
  console.error('에러 이름:', error?.name);
  console.error('에러 메시지:', error?.message);
  console.error('에러 스택:', error?.stack);

  alert(`NFC 연동 실패: ${error?.message ?? '알 수 없는 오류'}`);
}
  }

  //커스텀 훅 바인딩 (키오스크 모든 페이지에서 키보드 입력 형태의 NFC 감지 가능하게
  useNfcInput({ onTagScanned })


  function selectCategory(label) {
    setCategory(label)
    setSection(Object.keys(catalog[label])[0])
    setPage(0)
  }

  function reset() {
    setScreen('start')
    setService('')
    selectCategory(categories[0])
    setProduct(null)
    setCart([])
    setProfile(defaultProfile)
  }

  function start(label) {
    setService(label)
    setScreen('menu')
  }

  function addToCart(item) {
    setCart((items) => {
      if (!items.some(({ key }) => key === item.key)) return [...items, item]
      return items.map((entry) => entry.key === item.key
        ? { ...entry, quantity: entry.quantity + item.quantity }
        : entry)
    })
    setProduct(null)
  }

  function changeQuantity(key, delta) {
    setCart((items) => items.map((item) => item.key === key
      ? { ...item, quantity: Math.max(1, item.quantity + delta) }
      : item))
  }

  function removeItem(key) {
    setCart((items) => items.filter((item) => item.key !== key))
  }

  return (
    <KioskFrame
      data-screen={screen}
      data-simple={profile.simple}
      data-contrast={profile.contrast}
      data-guidance={profile.guidance}
      data-reach={profile.reach}
      data-large={profile.large}
    >
      {import.meta.env.DEV && new URLSearchParams(globalThis.location?.search).has('preview') && (
        <PreviewSettings profile={profile} onChange={(key, value) => setProfile((current) => ({ ...current, [key]: value }))} />
      )}
      {screen === 'start' ? (
        <>
          <StartPhotos />
          <KioskToolbar startScreen />
          <div className="start-actions">
            <button data-guide data-guide-label="매장 이용 시 눌러 주세요" onClick={() => start('매장')}><img src={kioskImage('dine-in')} alt="" />매장</button>
            <button data-guide data-guide-label="포장하실 때 눌러 주세요" onClick={() => start('포장')}><img src={kioskImage('takeout')} alt="" />포장</button>
          </div>
        </>
      ) : (
        <>
          {screen === 'complete' ? <KioskToolbar helpOnly /> : (
            <KioskToolbar
              onHome={['card', 'remove-card'].includes(screen) ? undefined : reset}
              detail={screen !== 'menu'}
              helpOnly={['card', 'remove-card'].includes(screen)}
            />
          )}
          {showSteps && <ol className="steps" aria-label="주문 단계">
            {['메뉴선택', '결제하기', '주문완료'].map((label, index) => (
              <li key={label} data-complete={index <= step} aria-current={index === step ? 'step' : undefined}>
                {label}
                <span className="step-dot">{index <= step && <img src={kioskImage('step-completed', 'svg')} alt="" />}</span>
              </li>
            ))}
          </ol>}
          {screen === 'menu' ? (
            <>
              <nav className="categories" aria-label="메뉴 카테고리">
                {categories.map((label) => (
                  <button key={label} aria-pressed={label === category} onClick={() => selectCategory(label)}>{label}</button>
                ))}
                {profile.large && <MoreButton label="메뉴 카테고리" />}
              </nav>
              <section className="catalog" aria-label="메뉴 목록">
                <nav className="subcategories" aria-label={`${category} 세부 메뉴`}>
                  {sections.map((label) => (
                    <button key={label} aria-pressed={label === section} onClick={() => {
                      setSection(label)
                      setPage(0)
                    }}>{label}</button>
                  ))}
                  {profile.large && sections.length > 3 && <MoreButton label="세부 메뉴" />}
                </nav>
                <div className="product-grid">
                  {products.map((entry) => {
                    const item = menuProduct(entry, category, section)
                    return <ProductCard key={item.id} item={item} onSelect={() => setProduct(item)} />
                  })}
                </div>
                {pages.length > 0 && (
                  <nav className="pagination" aria-label="메뉴 페이지">
                    <button disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>&lt; 이전</button>
                    <span>{currentPage + 1} / {pages.length}</span>
                    <button disabled={currentPage + 1 === pages.length} onClick={() => setPage(currentPage + 1)}>다음 &gt;</button>
                  </nav>
                )}
              </section>
              <section className="cart-preview" aria-label="담은 메뉴">
                <div className="cart-scroll" ref={cartScroll}>
                  <CartRows items={cart} onQuantity={changeQuantity} onRemove={removeItem} />
                </div>
                {count > 0 && <div className="cart-scroll-buttons">
                  <button aria-label="장바구니 위로" onClick={() => cartScroll.current.scrollBy({ top: -cartScroll.current.clientHeight })}>⌃</button>
                  <button aria-label="장바구니 아래로" onClick={() => cartScroll.current.scrollBy({ top: cartScroll.current.clientHeight })}>⌄</button>
                </div>}
              </section>
              <footer className="order-bar">
                <div><span>총 수량</span><strong>{count}<small>개</small></strong></div>
                <div><span>합계</span><strong>{total.toLocaleString('ko-KR')}<small>원</small></strong></div>
                <button disabled={!count} data-guide={count > 0 || undefined} data-guide-label="다 고르셨으면 눌러 주세요" onClick={() => setScreen('desserts')}>주문하기</button>
              </footer>
            </>
          ) : (
            <Checkout screen={screen} navigate={setScreen} reset={reset} service={service} cart={cart}
              count={count} total={total} onAdd={addToCart} onQuantity={changeQuantity} onRemove={removeItem}
              onDessertMenu={() => { selectCategory('디저트'); setScreen('menu') }} />
          )}
        </>
      )}
      {product && (
        <ProductOptions key={product.id} product={product} service={service} onClose={() => setProduct(null)} onAdd={addToCart}>
          <KioskToolbar detail onHome={reset} />
        </ProductOptions>
      )}
    </KioskFrame>
  )
}
