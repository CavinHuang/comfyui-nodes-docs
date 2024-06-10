---
tags:
- Mask
- MaskList
---

# ExtendMaskList
## Documentation
- Class name: `ExtendMaskList`
- Category: `Bmad/Lists/Extend`
- Output node: `False`

The ExtendMaskList node is designed to extend a list of masks, allowing for the aggregation of multiple mask elements into a single, comprehensive list. This functionality is crucial for operations that require the manipulation or analysis of multiple masks simultaneously, providing a streamlined approach to handling mask data in bulk.
## Input types
### Required
- **`inputs_len`**
    - The 'inputs_len' parameter represents the collection of mask elements to be extended. It plays a pivotal role in the node's operation by serving as the primary data input, which the node then processes to produce an extended list of masks.
    - Comfy dtype: `INT`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is an extended list of mask elements, consolidated into a single entity for ease of further processing or analysis.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ExtendMaskList(metaclass=ExtendListMeta): TYPE = "MASK"

```
