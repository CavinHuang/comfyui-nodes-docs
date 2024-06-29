---
tags:
- Mask
- MaskList
---

# ToMaskList
## Documentation
- Class name: `ToMaskList`
- Category: `Bmad/Lists/Make or Intercalate`
- Output node: `False`

The ToMaskList node is designed to convert a collection of inputs into a list of masks. This node plays a crucial role in organizing and preparing mask data for further processing or manipulation within a pipeline, ensuring that data is in the correct format for subsequent nodes that require mask inputs.
## Input types
### Required
- **`inputs_len`**
    - The 'inputs_len' parameter represents the collection of inputs that are to be converted into a list of masks. This parameter is essential for the node's operation as it directly influences the composition of the output mask list, determining the data that will be available for further processing.
    - Comfy dtype: `INT`
    - Python dtype: `List[torch.Tensor]`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The output is a list of masks, structured to facilitate further operations that involve mask data within the pipeline.
    - Python dtype: `List[torch.Tensor]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToMaskList(metaclass=MakeListMeta): TYPE = "MASK"

```
