import LinkedListNode from '../LinkedListNode.js'
import Comparator from '../../utils/comparator/Comparator.js'

'use strict'

export default class LinkedList {
    constructor (comparatorFunction) {
        this.head = null
        this.tail = null
        this.compare = new Comparator(comparatorFunction)
    }

    prepend(value) {
        const newNode = new LinkedListNode(value, this.head)
        this.head = newNode

        if (!this.tail) {
            this.tail = newNode
        }

        return this
    }

    append(value) {
        const newNode = new LinkedListNode(value)

        if (!this.tail) {
            this.head = newNode
            this.tail = newNode

            return this;
        }

        // Attach new node to the end of the list
        this.tail.next = newNode
        // Replace old node new
        this.tail = newNode

        return this;
    }

    deleteHead() {
        if (!this.head) {
            return null
        }

        const deletedHead = this.head

        if (deletedHead.next) {
            this.head = deletedHead.next
        } else {
            this.tail = null
            this.tail = null
        }

        return this
    }

    deleteTile() {
        const deletedTail = this.tail

        // There is only one node in linked list
        if (this.head === this.tail) {
            this.head = null
            this.tail = null

            return deletedTail
        }

        let currentNode = this.head

        while (currentNode.next) {
            if (currentNode.next.next) {
                currentNode = currentNode.next;
            } else {
                currentNode.next = null
            }
        }

        this.tail = currentNode

        return deletedTail
    }

    find(index) {
        let startIndex = 0

        if (!this.head) {
            return null
        }

        let currentNode = this.head

        while (currentNode) {
            if (startIndex === index) {
                return currentNode
            } else if (currentNode.next) {
                startIndex++
                currentNode = currentNode.next
            } else {
                return null;
            }
        }
    }
}

const list = new LinkedList(Comparator)
list.append('Im Vlad').append('my').append('dog').append('blue').append('color')

console.log(list.find(0))
    // .deleteTile()