# Prompts Everywhere
## Documentation
- Class name: `Prompts Everywhere`
- Category: `everywhere`
- Output node: `True`

This node allows for the flexible integration of positive and negative prompts in a variety of contexts, supporting a wide range of input types without strict requirements on their format or content.
## Input types
### Required
### Optional
- **`+ve`**
    - Represents positive prompts that can be of any type and quantity, allowing for a broad and flexible specification of inputs that contribute positively to the operation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
- **`-ve`**
    - Represents negative prompts that can be of any type and quantity, providing a means to specify inputs that should be considered negatively or excluded from the operation.
    - Comfy dtype: `*`
    - Python dtype: `Any`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AnythingEverywherePrompts(Base):
    @classmethod
    def INPUT_TYPES(s):
        return {"required":{}, 
                "optional": { "+ve" : ("*", {}), "-ve" : ("*", {}), } }
    
    def func(self, **kwargs):
        return ()

```
