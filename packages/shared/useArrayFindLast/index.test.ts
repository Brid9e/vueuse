import { describe, expect, it } from 'vitest'
import { reactive, shallowRef } from 'vue'
import { useSetup } from '../../.test'
import { useArrayFindLast } from './index'

describe('useArrayFindLast', () => {
  it('should be defined', () => {
    expect(useArrayFindLast).toBeDefined()
  })

  it('should find positive', () => {
    useSetup(() => {
      const item1 = shallowRef(1)
      const item2 = shallowRef(2)
      const item3 = shallowRef(3)
      const positive = useArrayFindLast([item1, item2, item3], val => val > 0)
      expect(positive.value).toBe(3)
      item3.value = -1
      expect(positive.value).toBe(2)
      item2.value = -1
      expect(positive.value).toBe(1)
      item1.value = -1
      expect(positive.value).toBe(undefined)
    })
  })

  it('should work with reactive array', () => {
    useSetup(() => {
      const list = reactive([-1, -2])
      const positive = useArrayFindLast(list, val => val > 0)
      expect(positive.value).toBe(undefined)
      list.push(10)
      expect(positive.value).toBe(10)
      list.push(5)
      expect(positive.value).toBe(5)
    })
  })
})
