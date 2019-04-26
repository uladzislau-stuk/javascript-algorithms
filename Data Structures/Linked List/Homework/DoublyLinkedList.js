import DoublyLinkedListNode from '../DoublyLinkedListNode.js'
import Comparator from '../../utils/comparator/Comparator.js'

'use strict'

export default class DoublyLinkedList {
    constructor (comparatorFunction) {
        this.head = null
        this.tail = null
        this.compare = new Comparator(comparatorFunction)
    }

    prepend(value) {
        const newNode = new DoublyLinkedListNode(value, this.head)
        this.head = newNode

        if (!this.tail) {
            this.tail = newNode

            return this
        }

        // Attach to previous
        return this
    }

    append(value) {
        const newNode = new DoublyLinkedListNode(value)

        if (!this.tail) {
            this.head = newNode
            this.tail = newNode

            return this
        }

        // Attach new node to the linked tail
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode

        return this
    }


}

const list = new DoublyLinkedList(Comparator)
list.prepend('Hello').append('END').prepend('my').prepend('friend!')
console.log(list.head)
// .deleteTile()