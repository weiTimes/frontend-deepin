const root = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D',
    },
    right: {
      val: 'E',
    },
  },
  right: {
    val: 'C',
    right: {
      val: 'F',
    },
  },
};

// 先序遍历
const preOrder = (node) => {
  if (!node) return;

  console.log('当前节点' + node.val);

  preOrder(node.left);
  preOrder(node.right);
};

// preOrder(root);

// 中序遍历
const inorder = (node) => {
  if (!node) return;

  inorder(node.left);

  console.log('当前节点', node.val);

  inorder(node.right);
};

// inorder(root);

const afterOrder = (node) => {
  if (!node) return;

  afterOrder(node.left);

  afterOrder(node.right);

  console.log('当前节点', node.val);
};

afterOrder(root);
