## How Component Hierarchy List Rendering Works

### Addressing nodes in a tree

I really didn't want to change the structure of our JSON file and,
 also I have needed to find a way for addressing our tree nodes.
  The idea is that an address of a tree node is a list of indexes 
  where each is a 0-based index into a node's children array at each level.
   So for example, given this more general tree:

```bash
       0
    /  |  \
   1   2   3
  / \    / | \
 4   5  6  7  8

address(0) = []      // root is [] by definition
address(1) = [0]     // root.children[0]
address(2) = [1]     // etc
address(3) = [2]
address(4) = [0,0]   // root.children[0].children[0]
address(5) = [0,1]   // etc
address(6) = [2,0]
address(7) = [2,1]
address(8) = [2,2]   // root.children[2].children[2]
```
I just traverse recursively on our JSON file and add the address to each list element in our DOM.
