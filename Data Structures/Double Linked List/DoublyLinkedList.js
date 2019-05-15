import DoublyLinkedListNode from './DoublyLinkedListNode.js'

'use strict'

export default class DoublyLinkedList {
    constructor () {
        this.head = null
        this.tail = null
    }

    prepend(value) {
        const newNode = new DoublyLinkedListNode(value, this.head)
        this.head = newNode

        if (!this.tail) {
            this.tail = newNode

            return this
        }

        return this
    }

    append(value) {
        const newNode = new DoublyLinkedListNode(value)

        if (!this.tail) {
            this.head = newNode
            this.tail = newNode

            return this
        }
        
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode

        return this
    }


}

const list = new DoublyLinkedList()
list.prepend('Hello').append('END').prepend('my').prepend('friend!')
console.log(list.head)