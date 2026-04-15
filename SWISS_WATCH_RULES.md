# 🇨🇭 Swiss Watch Rules — WDA Project

Обязательные правила для ВСЕХ моделей (Gemini, Opus и любых других),
работающих над проектом Welone Digital Atelier.

Нарушение любого из этих правил = дефект «швейцарских часов».

---

## Правило 1: Scroll Lock для модалов (Lenis)

**Проблема:** Lenis перехватывает `wheel`-события на уровне JS.  
CSS `overflow: hidden` на body **НЕ останавливает** Lenis.  
Любой `position: fixed` overlay, портал или модал будет прокручивать фон.

**Закон:**  
При **открытии** любого модала/overlay — **обязательно** вызывать:
```js
window.__lenis?.stop();
document.body.style.overflow = 'hidden';
```
При **закрытии** — **обязательно** вызывать:
```js
document.body.style.overflow = '';
window.__lenis?.start();
```

---

## Правило 2: Модалы — только через React Portal

**Проблема:** Если родитель имеет `transform` (а SmoothScrollProvider — имеет),  
`position: fixed` перестаёт быть фиксированным относительно viewport.  
Модал окажется **ПОД** соседними блоками.

**Закон:**  
Любой полноэкранный overlay — **ТОЛЬКО** через:
```jsx
import { createPortal } from 'react-dom';
// ...
{isOpen && createPortal(<Modal />, document.body)}
```

---

## Правило 3: Прокрутка внутри модала (Scrollable Overlay Pattern)

**Проблема:** Пользователь ожидает прокрутку колёсиком мыши внутри модала.  
Если контент не помещается — пользователь **ДОЛЖЕН** иметь возможность  
скроллить его колёсиком, тачпадом и свайпом. Заставлять человека  
перетаскивать скроллбар мышкой — НЕДОПУСТИМО.

**Закон:**  
Overlay-контейнер САМ должен быть прокручиваемым. Контент внутри — обычный блок.  
**НЕ** помещайте `overflow-y: auto` на внутренний элемент внутри `fixed`-контейнера.  
Вместо этого:
```jsx
<div className="fixed inset-0 overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
  <div className="flex justify-center py-[8vh] min-h-full">
    <div className="w-[94vw] max-w-[960px] self-start">
      {/* контент модала — без max-height, без overflow */}
    </div>
  </div>
</div>
```
Ключевые CSS-свойства:
- `overflow-y: auto` — на OVERLAY, не на контенте
- `overscroll-behavior: contain` — предотвращает утечку скролла на страницу
- НЕ использовать `document.body.style.overflow = 'hidden'` (конфликтует с Lenis)
- Вместо этого только `window.__lenis?.stop()` / `.start()`

---

## Правило 4: Нет агрессивных CSS-анимаций на корневом контейнере

**Проблема:** Применение `transform: scale()` к корню страницы  
вызывает Layout Shift всех дочерних элементов (особенно крупной типографики).  
Это создаёт визуальные «прыжки».

**Закон:**  
При появлении сайта после прелоадера использовать **ТОЛЬКО**:
- `opacity` transitions
- `filter` transitions (blur)
- Не применять `transform` к корневому `<div>` контейнеру.

---

## Правило 5: Закон Фиттса — огромные зоны закрытия

**Проблема:** Маленький крестик 16x16px невозможно быстро нажать.

**Закон:**  
Кнопка закрытия модала — минимум `44x44px` зона нажатия.  
Дополнительно: закрытие по `Escape` и по клику на backdrop.

---

## Правило 6: Quiet Luxury — копирайтинг без давления

**Проблема:** Агрессивные CTA («Купи сейчас!», «Осталось 2 места!»)  
противоречат позиционированию Digital Atelier.

**Закон:**  
Тексты должны звучать как приглашение, а не как продажа.  
Примеры: «Let's converse», «Unfold the story», «Selected Commissions».
