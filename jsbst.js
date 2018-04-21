var BST = (function () {

	/**
	 * Initializes a Node object with its parent, left, and right Node references set to null.
	 * @param {*} data - The Node's data
	 */
	var Node = function (data) {
		this.parent = null;
		this.left = null;
		this.right = null;
		this.data = data;

		/**
		 * Returns whether or not the Node is a leaf (no child nodes).
		 * @returns {boolean} Whether or not the Node is a leaf.
		 */
		this.isLeaf = function () {
			if (this.left == null && this.right == null) {
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Returns whether or not the Node is full (both child nodes).
		 * @returns {boolean} Whether or not the Node is a full Node.
		 */
		this.isFull = function () {
			if (this.left != null && this.right != null) {
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Returns an Array of all of the children of this Node.
		 * @returns {Array} Array of children.
		 */
		this.getChildren = function() {
			var self = this;
			function getChildrenRecursive(node, list) {
				if (node == null) return;
				if (node !== self) list.push(node);
				getChildrenRecursive(node.left, list);
				getChildrenRecursive(node.right, list);
				return list;
			}
			return getChildrenRecursive(this, []);
		}

		/**
		 * Returns the length of the Array returned by {@link getChildren}
		 * @returns {number} Length of Array returned by {@link getChildren}
		 */
		this.countChildren = function () {
			return this.getChildren().length;
		}
	}

	/**
	 * Default constructor. Simply initializes the tree's root node and its type to null.
	 */
	var Tree = function () {
		this.root = null;
		this.treeType = null;

		/**
		 * Performs a comparison of the typeof data with the type of the tree. 
		 * @param {*} data - The variable to type-check against the current tree type.
		 */
		this.checkType = function(data) {
			if (this.treeType != typeof data) {
				throw new Error("Type mismatch");
			} else {
				return true;
			}
		}

		/**
		 * console.log all of the nodes of the tree inorder.
		 */
		this.log = function() {
			function logRecursive(node) {
				if (node != null) {
					logRecursive(node.left);
					console.log(node.data);
					logRecursive(node.right);
				}
			}
			logRecursive(this.root);
		}

		/**
		 * Returns a node whose data matches the data paramter.
		 * @param {*} data - The data with which to find a matching node.
		 */
		this.search = function(data) {
			this.checkType(data);
			function searchRecursive(node, data) {
				if (node == null || node.data === data) {
					return node;
				}
				if (node.data < data) {
					return searchRecursive(node.right, data);
				} else {
					return searchRecursive(node.left, data);
				}
			}
			return searchRecursive(this.root, data);
		}

		/**
		 * Alias for search
		 * @see {@link search}
		 */
		this.find = function(data) {
			return this.search(data);
		}

		/**
		 * Attempts to search for the given data, and if a node is found then return true, otherwise return false.
		 * @param {*} data - The data with which to determine whether a matching node exists or not.
		 * @returns {boolean} Return true if a node is found with the given data.
		 */
		this.contains = function(data) {
			if (this.search(data) == null) {
				return false;
			} else {
				return true;
			}
		}

		/**
		 * Alias for contains
		 * @see {@link contains}
		 */
		this.has = function(data) {
			return this.contains(data);
		}

		/**
		 * Creates a new Node with data, and appends it to the tree.
		 * @param {*} data - The new Node's data.
		 */
		this.insert = function(data) {
			if (this.root == null) {
				var newNode = new Node(data);
				this.root = newNode;
				this.treeType = typeof data;
				return;
			}
			this.checkType(data);
			function insertRecursive(node, data, parent) {
				if (node == null) {
					var newNode = new Node(data);
					newNode.parent = parent;
					return newNode;
				}
				if (node.data < data) {
					node.right = insertRecursive(node.right, data, node);
				} else if (node.data > data) {
					node.left = insertRecursive(node.left, data, node);
				}
				return node;
			}
			insertRecursive(this.root, data);
		}

		this.delete = function(data) {
			this.checkType(data);
			function deleteRecursive(node, data) {
				if (node == null) return;
				if (node.data == data) {

				}
				if (node.data < data) {
					node.right = deleteRecursive(node.right, data);
				} else if (node.data > data) {
					node.left = deleteRecursive(node.left, data);
				}
			}
			deleteRecursive(this.root, data);
		}

		/**
		 * Traverse the tree to the left until it cannot be traversed to the left any more.
		 * Then return the previous left-most node.
		 * @returns {Node} Node object representing the node with the smallest data in the tree.
		 */
		this.min = function(root) {
			function minRecursive(node) {
				if (node.left) {
					return minRecursive(node.left);
				}
				return node;
			}
			if (root === undefined) {
				return minRecursive(this.root);
			} else {
				return minRecursive(root);
			}
		}

		/**
		 * Traverse the tree to the right until it cannot be traversed to the right any more.
		 * Then return the previous right-most node.
		 * @returns {Node} Node object representing the node with the largest data in the tree.
		 */
		this.max = function(root) {
			function maxRecursive(node) {
				if (node.right) {
					return maxRecursive(node.right);
				}
				return node;
			}
			if (root === undefined) {
				return maxRecursive(this.root);
			} else {
				return maxRecursive(root);
			}
		}

		/**
		 * Return an Array of all of the nodes that are full nodes.
		 * @returns {Array} Array of full nodes in the tree.
		 */
		this.getFullNodes = function() {
			function getFullNodesRecursive(node, list) {
				if (node == null) return;
				if (node.isFull()) list.push(node);
				getFullNodesRecursive(node.left, list);
				getFullNodesRecursive(node.right, list);
				return list;
			}
			return getFullNodesRecursive(this.root, []);
		}

		/**
		 * Returns the length of the Array returned by {@link getFullNodes}
		 * @returns {number} Length of Array returned by {@link getFullNodes}
		 */
		this.countFullNodes = function() {
			return this.getFullNodes().length;
		}

		/**
		 * Returns an Array of all of the nodes that are full nodes.
		 * @returns {Array} Array of leaf nodes in the tree.
		 */
		this.getLeafNodes = function() {
			function getLeafNodesRecursive(node, list) {
				if (node == null) return;
				if (node.isLeaf()) list.push(node);
				getLeafNodesRecursive(node.left, list);
				getLeafNodesRecursive(node.right, list);
				return list;
			}
			return getLeafNodesRecursive(this.root, []);
		}

		/**
		 * Returns the length of the Array returned by {@link getLeafNodes}
		 * @returns {number} Length of Array returned by {@link getLeafNodes}
		 */
		this.countLeafNodes = function() {
			return this.getLeafNodes().length;
		}

		/**
		 * Returns the height of the tree.
		 * @returns {number} Height of the tree.
		 */
		this.height = function() {
			function heightRecursive(node, depth) {
				if (node == null) return 0;
				var leftDepth = heightRecursive(node.left);
				var rightDepth = heightRecursive(node.right);
				if (leftDepth > rightDepth) {
					return leftDepth + 1;
				} else {
					return rightDepth + 1;
				}
			}
			return heightRecursive(this.root);
		}

		/**
		 * Resets the tree, setting the root Node equal to null as well as its type to null.
		 */
		this.reset = function() {
			this.root = null;
			this.treeType = null;
		}
	}

	return {
		Node: Node,
		Tree: Tree
	}
	
})();