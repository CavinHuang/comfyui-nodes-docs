---
tags:
- Conditioning
---

# ToCondList
## Documentation
- Class name: `ToCondList`
- Category: `Bmad/Lists/Make or Intercalate`
- Output node: `False`

The ToCondList node is designed for creating lists of conditioning data from individual conditioning inputs. It streamlines the process of aggregating multiple conditioning elements into a single, organized list, facilitating easier manipulation and application in subsequent processes.
## Input types
### Required
- **`inputs_len`**
    - The 'inputs_len' parameter specifies the number of individual conditioning elements to be aggregated into a list. This parameter is essential for determining the size of the resulting list, thereby influencing the node's execution and the characteristics of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The output is a list of conditioning data, aggregated from the individual conditioning inputs provided to the node. This list is ready for use in processes that require conditioning data in a collective format.
    - Python dtype: `List[CONDITIONING]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ToCondList(metaclass=MakeListMeta): TYPE = "CONDITIONING"

```
