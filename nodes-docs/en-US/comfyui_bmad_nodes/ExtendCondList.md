---
tags:
- Conditioning
---

# ExtendCondList
## Documentation
- Class name: `ExtendCondList`
- Category: `Bmad/Lists/Extend`
- Output node: `False`

The ExtendCondList node is designed to extend a list of conditioning elements. It allows for the addition of new conditioning elements to an existing list, facilitating the dynamic expansion of conditioning data used in various computational models or processes.
## Input types
### Required
- **`inputs_len`**
    - The 'inputs_len' parameter represents the number of conditioning elements to be added to the existing list. It plays a crucial role in expanding the list's capacity and incorporating new conditioning data, which can significantly influence the execution and outcomes of the node.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - This node outputs an extended list of conditioning elements, incorporating the newly added samples into the existing list.
    - Python dtype: `List[Conditioning]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendCondList(metaclass=ExtendListMeta): TYPE = "CONDITIONING"

```
