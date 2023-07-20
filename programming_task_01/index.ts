import fs from 'fs';

interface OperationNode {
  action?: string;
  left?: OperationNode;
  right?: OperationNode;
  value?: number;
}

function evaluateExpressionTree(tree: OperationNode): number {
  const stack: OperationNode[] = [tree];

  while (stack.length > 0) {
    const node = stack[stack.length - 1];

    if (node.value !== undefined) {
      // Node already evaluated, remove it from the stack
      stack.pop();
    } else if (node.action) {
      if (!node.left?.value) {
        // Left child does not have value property, push it into stack
        stack.push(node.left!);
      } else if (!node.right?.value) {
        // Right child does not have value property, push it into stack
        stack.push(node.right!);
      } else {
        // Left and Right children have value property, evaluate the value with action and set value into node.
        const leftValue = node.left.value!;
        const rightValue = node.right.value!;
        let result: number;

        switch (node.action) {
          case '+':
            result = leftValue + rightValue;
            break;
          case '-':
            result = leftValue - rightValue;
            break;
          case '*':
            result = leftValue * rightValue;
            break;
          case '/':
            result = leftValue / rightValue;
            break;
          case '^':
            result = Math.pow(leftValue, rightValue);
            break;
          default:
            throw new Error(`Invalid action: ${node.action}`);
        }

        node.value = result;
      }
    } else {
      throw new Error('Invalid expression tree.');
    }
  }

  return tree.value!;
}

// Read file from CLI argument
const fileName = process.argv[2];

if (!fileName) {
  console.error('Please provide a JSON file name as a CLI argument.');
  process.exit(1);
}

try {
  const fileContent = fs.readFileSync(fileName, 'utf-8');
  const tree = JSON.parse(fileContent) as OperationNode;

  const result = evaluateExpressionTree(tree);
  console.log('Result:', result);
} catch (error) {
  console.error('An error occurred:', error);
}