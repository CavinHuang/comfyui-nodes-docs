---
tags:
- DataTypeAgnostic
- Debugging
---

# Anything Everywhere
## Documentation
- Class name: `Anything Everywhere`
- Category: `everywhere`
- Output node: `True`

This node is designed to process and forward any type of input to a specified message handler, making it highly versatile for various data types and structures. It can handle multiple optional inputs simultaneously, allowing for flexible data processing and communication within the system.
## Input types
### Required
### Optional
- **`anything`**
    - Represents any optional input that the node can process. This flexibility allows the node to handle a wide variety of data types and structures, making it adaptable to different use cases.
    - Comfy dtype: `*`
    - Python dtype: `object`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnythingEverywhere(Base):
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{}, 
                "optional": { "anything" : ("*", {}), },
                 "hidden": {"id":"UNIQUE_ID"} }

    def func(self, id, **kwargs):
        for key in kwargs:
            message(id, kwargs[key],)
        return ()

```
