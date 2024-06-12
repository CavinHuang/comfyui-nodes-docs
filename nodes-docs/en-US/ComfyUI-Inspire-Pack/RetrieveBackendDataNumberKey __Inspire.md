---
tags:
- BackendCache
- Cache
---

# Retrieve Backend Data [NumberKey] (Inspire)
## Documentation
- Class name: `RetrieveBackendDataNumberKey __Inspire`
- Category: `InspirePack/Backend`
- Output node: `False`

The RetrieveBackendDataNumberKey node is designed to fetch and return data associated with a numerical key from a backend cache. It abstracts the complexity of data retrieval processes, enabling efficient access to cached data by key, and supports handling of data as lists based on the cache's content structure.
## Input types
### Required
- **`key`**
    - The 'key' parameter is a numerical identifier used to retrieve specific data from the backend cache. It plays a crucial role in accessing the desired data efficiently.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`data`**
    - Comfy dtype: `*`
    - The 'data' output represents the data retrieved from the backend cache using the numerical key. It may be returned as a single item or a list, depending on the cached content's structure.
    - Python dtype: `Tuple[Any, ...]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class RetrieveBackendDataNumberKey(RetrieveBackendData):
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "key": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

```
