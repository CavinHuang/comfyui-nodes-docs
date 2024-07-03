
# Documentation
- Class name: Anything Everywhere3
- Category: everywhere
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Anything Everywhere3节点设计为可接受广泛的输入，对数据类型没有严格限制，有助于处理各种数据类型。它强调了数据处理的灵活性和包容性，允许同时处理多个输入。

# Input types
## Optional
- anything
    - 这个参数可以接受任何数据类型，使节点能够处理各种输入。它是节点设计的一部分，用于同时处理不同的数据类型。
    - Comfy dtype: *
    - Python dtype: Any
- anything2
    - 类似于'anything'，这个参数可以接受任何数据类型，有助于节点同时处理多个不同的输入。
    - Comfy dtype: *
    - Python dtype: Any
- anything3
    - 这个参数也接受任何数据类型，进一步强调了节点的灵活性和同时处理多种输入的能力。
    - Comfy dtype: *
    - Python dtype: Any

# Output types
该节点没有输出类型。


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
