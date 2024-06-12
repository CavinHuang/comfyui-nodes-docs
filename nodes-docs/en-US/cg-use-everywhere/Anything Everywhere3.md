---
tags:
- DataTypeAgnostic
- Debugging
---

# Anything Everywhere3
## Documentation
- Class name: `Anything Everywhere3`
- Category: `everywhere`
- Output node: `True`

The Anything Everywhere3 node is designed to accept a wide range of inputs without strict type requirements, facilitating the processing of diverse data types. It emphasizes flexibility and inclusivity in data handling, allowing for the simultaneous processing of multiple inputs.
## Input types
### Required
### Optional
- **`anything`**
    - This parameter can accept any data type, enabling the node to handle a variety of inputs. It's part of the node's design to process diverse data types simultaneously.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`anything2`**
    - Similar to 'anything', this parameter can accept any data type, contributing to the node's capability to process multiple diverse inputs at once.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`anything3`**
    - This parameter also accepts any data type, further emphasizing the node's flexibility and capacity to handle a wide range of inputs simultaneously.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnythingEverywhereTriplet(Base):
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{}, 
                "optional": { "anything" : ("*", {}), "anything2" : ("*", {}), "anything3" : ("*", {}),} }
    
    def func(self, **kwargs):
        return ()

```
