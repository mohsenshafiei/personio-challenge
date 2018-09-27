## How Component Hierarchy List Rendering Works

### Addressing nodes in a tree

I really didn't want to change the structure of our JSON file and,
 also I have needed to find a way for addressing our tree nodes and at the
 same time don't use our names for id.
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
I just traverse recursively on our JSON file and add the address to our employees list in our store.


### Tree Rendering

For a better performance on dragging and dropping our list items,
 the list of employees on the DOM is flat and employees are rendering
  like a flat list and everything is smooth. We need to traverse the
   tree of employees recursively and, render items like a normal list.
 
 
### Change Hierarchy Algorithm

In each dragging and dropping of items we need to do a couple of things:

- If our leader and person items have the same (address) => we don't have any change in our hierachy
- If our person that we are moving is the parent of our goal leader => we don't have any change in our hierachy
because this move will create a loop and this is not valid and we get error notification.
- If we are moving a person and this is a valid move :
    - First we save the person that we are moving
    - We find the person in our hierarchy tree and delete it from our hierarchy tree
    - We find the leader in our hierarchy tree
    - We add the person to employees of our leader


### Collapsible Items

First, I wanted to handle this feature like Bootstrap and
 to don't move the data to the store,  I have developed this
  feature with refs but after researching on the internet I
   found it using refs for list is a big mistake, because the
    size of DOM Object is big and it is completely out of react
     thinking. Finally, I just added collapse attribute to our
      hierarchy tree and, when the user clicks on our items I
       toggle the collapse attribute of the item and children of it.
        If the collapse attribute is set to true we don't render 
        children anymore and we return null.


### Finding Multiple Boss Feature

To find multiple bosses we just needed to count times that 
a person just appeared in the hierarchy tree. We can do this 
simply with a traversing on the hierarchy tree.

