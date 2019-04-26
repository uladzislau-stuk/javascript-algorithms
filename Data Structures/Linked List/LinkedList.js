import LinkedListNode from './LinkedListNode.js'
import Comparator from '../utils/comparator/Comparator.js'

'use strict'

export default class LinkedList {
	/**
	 * @param {Function} [comparatorFunction]
	 */
	constructor(comparatorFunction) {
		/** @var LinkedListNode */
		this.head = null

		/** @var LinkedListNode */
		this.tail = null

		this.compare = new Comparator(comparatorFunction)
	}

	/**
	 * @param {*} value
	 * @return {LinkedList}
	 */
	prepend(value) {
		const newNode = new LinkedListNode(value, this.head)
		this.head = newNode;

		// If there is no tail yet let's make new node a tail.
		if (!this.tail) {
			this.tail = newNode
		}

		return this;
	}

	/**
	 * @param {*} value
	 * @returns {LinkedList}
	 */
	append(value) {
		const newNode = new LinkedListNode(value)

		// If there is no head yet let's make new node a head.
		if(!this.head) {
			this.head = newNode
			this.tail = newNode

			return this
		}

		// Attach new node to the end of linked list.
		this.tail.next = newNode
		// Replace old node new
		this.tail = newNode

		return this;
	}

	// delete
	deleteHead() {
		if (!this.head) {
			return null
		}

		const deletedHead = this.head

		if(this.head.next) {
			this.head = this.head.next
		} else {
			this.head = null
			this.tail = null
		}

		return deletedHead
	}
}

const list = new LinkedList(Comparator)
list.append('Hello').append('my').append('friend').append('how').append('are you').prepend('!')
console.log(list)
	// .append('My').append('Best').append('Friend')
