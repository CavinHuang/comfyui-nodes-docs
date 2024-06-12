---
tags:
- List
---

# FromListGetStrings
## Documentation
- Class name: `FromListGetStrings`
- Category: `Bmad/Lists/GetAll`
- Output node: `False`

This node is designed to retrieve a specific string from a list of strings based on a given index. It abstracts the process of accessing list elements, allowing for both direct and reverse indexing, thereby enhancing the flexibility and ease of manipulating lists of strings within a workflow.
## Input types
### Required
- **`list`**
    - The list of strings from which a specific string is to be retrieved. It is essential for the operation of the node as it provides the data source.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The string retrieved from the specified index within the list. This output is crucial for further processing or utilization within the workflow.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class FromListGetStrings(metaclass=UnMakeListMeta): TYPE = "STRING"

```
